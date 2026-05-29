import { NextResponse } from 'next/server';
import { fetchAllFeeds } from '@/lib/agents/fetcher';
import { dedupArticles } from '@/lib/agents/dedup';
import { classifyArticles } from '@/lib/agents/classifier';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    console.log('[Pipeline] Starting fetch pipeline...');
    
    // 1. Fetcher Agent
    const rawArticles = await fetchAllFeeds();
    console.log(`[Pipeline] Fetcher retrieved ${rawArticles.length} raw articles.`);

    // 2. Dedup Agent
    const uniqueArticles = await dedupArticles(rawArticles);
    console.log(`[Pipeline] Dedup filtered out duplicates. ${uniqueArticles.length} new articles remaining.`);

    if (uniqueArticles.length === 0) {
      return NextResponse.json({ success: true, message: 'No new articles.', added: 0 });
    }

    // 3. Classifier Agent
    const classifiedArticles = classifyArticles(uniqueArticles);
    console.log(`[Pipeline] Classifier assigned tags and metadata.`);

    // 4. Save to Database sequentially to avoid SQLite locking
    const saved = [];
    for (const article of classifiedArticles) {
      try {
        const savedArticle = await prisma.article.upsert({
          where: { sourceURL: article.sourceURL },
          update: {},
          create: {
            title: article.title,
            sourceURL: article.sourceURL,
            source: article.source,
            summary: article.summary,
            author: article.author || 'Unknown',
            publishedAt: article.publishedAt,
            category: article.category,
            tags: JSON.stringify(article.tags),
            readTime: article.readTime,
            difficulty: article.difficulty || null,
            learningPath: article.learningPath || null,
            pdfURL: article.pdfURL || null,
            views: article.views || 0,
            saves: article.saves || 0
          }
        });
        saved.push(savedArticle);
      } catch (err) {
        console.error(`Failed to upsert article: ${article.title}`, err);
      }
    }

    console.log(`[Pipeline] Successfully saved ${saved.length} articles to the database.`);
    return NextResponse.json({ success: true, message: 'Pipeline completed', added: saved.length });
    
  } catch (error) {
    console.error('[Pipeline Error]', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
