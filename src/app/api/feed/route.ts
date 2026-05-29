import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

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
    console.error('[Feed API Error]', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch feed' }, { status: 500 });
  }
}
