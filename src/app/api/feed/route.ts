import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { fetchFeeds } from '@/lib/agents/fetcher';
import { deduplicateArticles } from '@/lib/agents/dedup';
import { classifyArticles } from '@/lib/agents/classifier';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'all';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const search = searchParams.get('search') || '';
  const sourcesParam = searchParams.get('sources'); // comma separated sources
  
  const skip = (page - 1) * limit;

  try {
    let whereClause: any = category === 'all' ? {} : { category: category };

    if (search) {
      whereClause.OR = [
        { title: { contains: search } },
        { summary: { contains: search } },
        { tags: { contains: search } },
        { source: { contains: search } }
      ];
    }

    if (sourcesParam) {
      const sources = sourcesParam.split(',');
      whereClause.source = { in: sources };
    }

    const articles = await prisma.article.findMany({
      where: whereClause,
      orderBy: {
        publishedAt: 'desc'
      },
      skip,
      take: limit,
    });

    const total = await prisma.article.count({ where: whereClause });

    // Parse JSON tags
    const parsedArticles = articles.map((article: any) => ({
      ...article,
      tags: JSON.parse(article.tags)
    }));

    return NextResponse.json({
      success: true,
      data: parsedArticles,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.warn('[Feed API DB Error] Falling back to Live Memory Agent Execution...', error);
    
    try {
      // 1. Scout Agent: Fetch fresh data on-the-fly
      const rawData = await fetchFeeds();
      
      // 2. Editor Agent: Clean up duplicates
      const uniqueData = deduplicateArticles(rawData, []);
      
      // 3. Analyst Agent: Tag and categorize
      const classifiedData = classifyArticles(uniqueData);
      
      // Filter based on requested category
      const filtered = category === 'all' 
        ? classifiedData 
        : classifiedData.filter(a => a.category === category);
        
      return NextResponse.json({
        success: true,
        data: filtered.slice(0, limit),
        pagination: {
          total: filtered.length,
          page,
          limit,
          totalPages: Math.ceil(filtered.length / limit)
        },
        source: 'live-agent-fallback'
      });
      
    } catch (fallbackError) {
      console.error('[Live Agent Fallback Error]', fallbackError);
      return NextResponse.json({ success: false, error: 'Failed to fetch live feed' }, { status: 500 });
    }
  }
}
