import prisma from '../db';
import { RawArticle } from './fetcher';

export async function dedupArticles(articles: RawArticle[]): Promise<RawArticle[]> {
  if (articles.length === 0) return [];

  // Deduplicate within the incoming batch first to prevent unique constraint errors
  const uniqueBatch = [];
  const seenUrls = new Set();
  for (const a of articles) {
    if (!seenUrls.has(a.sourceURL)) {
      seenUrls.add(a.sourceURL);
      uniqueBatch.push(a);
    }
  }

  // Extract all URLs from the fetched unique batch
  const urls = uniqueBatch.map(a => a.sourceURL);

  // Find which of these URLs already exist in the database
  const existingArticles = await prisma.article.findMany({
    where: {
      sourceURL: {
        in: urls
      }
    },
    select: {
      sourceURL: true
    }
  });

  const existingUrls = new Set(existingArticles.map((a: any) => a.sourceURL));

  // Filter out the articles that already exist
  const newArticles = uniqueBatch.filter(a => !existingUrls.has(a.sourceURL));

  return newArticles;
}
