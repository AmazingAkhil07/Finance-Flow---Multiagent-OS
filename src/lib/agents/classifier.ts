import { RawArticle } from './fetcher';

const KEYWORDS: Record<string, string[]> = {
  'RBI': ['rbi', 'reserve bank', 'repo rate', 'shaktikanta das', 'monetary policy'],
  'NIFTY': ['nifty', 'nifty50', 'nifty 50', 'nse'],
  'SENSEX': ['sensex', 'bse'],
  'BANKING': ['bank', 'hdfc', 'sbi', 'icici', 'kotak', 'axis', 'banking'],
  'CRYPTO': ['bitcoin', 'btc', 'ethereum', 'eth', 'crypto', 'blockchain', 'binance', 'coinbase'],
  'TECH': ['tech', 'tcs', 'infosys', 'wipro', 'hcl', 'apple', 'microsoft', 'google', 'meta', 'nvidia'],
  'MACRO': ['inflation', 'cpi', 'gdp', 'fed', 'powell', 'interest rate', 'economy'],
  'EARNINGS': ['q1', 'q2', 'q3', 'q4', 'earnings', 'profit', 'revenue', 'pat', 'ebitda'],
  'COMMODITIES': ['gold', 'silver', 'oil', 'crude', 'brent', 'commodity'],
  'AUTO': ['auto', 'tata motors', 'mahindra', 'maruti', 'bajaj', 'ev', 'tesla']
};

export interface ClassifiedArticle extends RawArticle {
  tags: string[];
  readTime: number;
  difficulty?: string;
  learningPath?: string;
  pdfURL?: string;
  views?: number;
  saves?: number;
}

export function classifyArticles(articles: RawArticle[]): ClassifiedArticle[] {
  return articles.map(article => {
    // If tags are already provided, use them; otherwise, auto-classify.
    let tagsList = article.tags;
    if (!tagsList) {
      const textToAnalyze = `${article.title} ${article.summary || ''}`.toLowerCase();
      const tags = new Set<string>();

      for (const [tag, keywords] of Object.entries(KEYWORDS)) {
        for (const keyword of keywords) {
          const regex = new RegExp(`\\b${keyword}\\b`, 'i');
          if (regex.test(textToAnalyze)) {
            tags.add(tag);
            break;
          }
        }
      }
      tagsList = Array.from(tags);
    }

    // Preserve or calculate reading time
    let readTime = article.readTime;
    if (!readTime) {
      readTime = 3; 
      if (article.category === 'deep-dive') {
        readTime = Math.floor(Math.random() * (15 - 5 + 1) + 5); 
      } else if (article.category === 'daily') {
        readTime = Math.floor(Math.random() * (5 - 2 + 1) + 2); 
      }
    }

    return {
      ...article,
      tags: tagsList,
      readTime,
      difficulty: article.difficulty || undefined,
      learningPath: article.learningPath || undefined,
      pdfURL: article.pdfURL || undefined,
      views: article.views || 0,
      saves: article.saves || 0
    };
  });
}
