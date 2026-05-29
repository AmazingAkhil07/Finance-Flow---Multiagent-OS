import { NextResponse } from 'next/server';
import { fetchAllFeeds } from '@/lib/agents/fetcher';
import { dedupArticles } from '@/lib/agents/dedup';
import { classifyArticles } from '@/lib/agents/classifier';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const globalForFetch = global as unknown as { isFetching: boolean };

export async function GET() {
  if (globalForFetch.isFetching) {
    return NextResponse.json({ success: true, message: 'Fetch already in progress', added: 0 });
  }
  globalForFetch.isFetching = true;

  try {
    console.log('[Pipeline] Starting fetch pipeline...');
    
    // 1. Fetcher Agent
    const rawArticles = await fetchAllFeeds();
    console.log(`[Pipeline] Fetcher retrieved ${rawArticles.length} raw articles.`);

    // 2. Dedup Agent
    const uniqueArticles = await dedupArticles(rawArticles);
    console.log(`[Pipeline] Dedup filtered out duplicates. ${uniqueArticles.length} new articles remaining.`);

    // To ensure the "daily" feed always feels live (updating every 5 mins),
    // we update the publishedAt time for existing daily articles we just fetched.
    const existingDaily = rawArticles.filter(a => a.category === 'daily' && !uniqueArticles.find(u => u.sourceURL === a.sourceURL));
    
    // Deduplicate existing daily URLs so we don't update the same URL multiple times
    const uniqueExistingDaily = Array.from(new Map(existingDaily.map(item => [item.sourceURL, item])).values());
    
    // Limit to 50 to prevent SQLite database locks (P1008) from massive sequential updates
    const articlesToUpdate = uniqueExistingDaily.slice(0, 50);
    for (const article of articlesToUpdate) {
      await prisma.article.updateMany({
        where: { sourceURL: article.sourceURL },
        data: { publishedAt: article.publishedAt }
      });
    }

    if (uniqueArticles.length === 0) {
      return NextResponse.json({ success: true, message: 'No new articles, updated timestamps for daily feed.', added: 0 });
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
  } finally {
    globalForFetch.isFetching = false;
  }
}
