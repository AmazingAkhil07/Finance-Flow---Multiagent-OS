import Parser from 'rss-parser';

type CustomItem = {
  creator?: string;
  author?: string;
};

const parser = new Parser<any, CustomItem>({
  customFields: {
    item: ['creator', 'author'] as any,
  },
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'Accept': 'application/rss+xml, application/xml, text/xml, */*'
  }
});

export interface RawArticle {
  title: string;
  sourceURL: string;
  source: string;
  summary: string | null;
  author: string | null;
  publishedAt: Date;
  category: string;
  
  // Optional metadata for advanced screens
  tags?: string[];
  readTime?: number;
  difficulty?: string;
  learningPath?: string;
  pdfURL?: string;
  views?: number;
  saves?: number;
}

export const SOURCES = [
  // Daily Feed - Core User Requested Sources
  { name: 'LiveMint', url: 'https://www.livemint.com/rss/markets', category: 'daily' },
  { name: 'Economic Times', url: 'https://economictimes.indiatimes.com/rssfeeds/2146842.cms', category: 'daily' },
  { name: 'ET Markets', url: 'https://economictimes.indiatimes.com/markets/rssfeeds/2146842.cms', category: 'daily' },
  { name: 'TradingView', url: 'https://www.tradingview.com/feed/', category: 'daily' },
  { name: 'Bloomberg', url: 'https://finance.yahoo.com/news/rss', category: 'daily' }, // Proxy for Bloomberg
  { name: 'Reuters Markets', url: 'https://www.reutersagency.com/feed/?best-topics=business-finance&type=rx', category: 'daily' },
  { name: 'CoinDesk', url: 'https://www.coindesk.com/arc/outboundfeeds/rss/', category: 'daily' },
  
  // Deep Dive & Monthly
  { name: 'Seeking Alpha', url: 'https://feeds.seekingalpha.com/feed.xml', category: 'deep-dive' },
  { name: 'MarketWatch', url: 'https://feeds.marketwatch.com/marketwatch/topstories/', category: 'deep-dive' },
  { name: 'The Block', url: 'https://www.theblock.co/rss', category: 'deep-dive' },
  { name: 'Bitcoin Magazine', url: 'https://bitcoinmagazine.com/.rss/full/', category: 'monthly' },
  { name: 'Ethereum.org', url: 'https://blog.ethereum.org/feed.xml', category: 'monthly' },
  { name: 'Investopedia', url: 'https://www.investopedia.com/feedbuilder/feed/getfeed/?feedName=rss_headline', category: 'learning' }
];

// Mock data completely removed. Real live fetch only.

export async function fetchAllFeeds(): Promise<RawArticle[]> {
  const allArticles: RawArticle[] = [];

  // Fetch all feeds in parallel to prevent Vercel Serverless timeouts (10s max)
  const fetchPromises = SOURCES.map(async (source) => {
    try {
      const feed = await parser.parseURL(source.url);
      const sourceArticles: RawArticle[] = [];
      
      for (const item of feed.items) {
        if (!item.title || !item.link) continue;
        
        let cleanSummary = item.contentSnippet || item.content || '';
        cleanSummary = cleanSummary.replace(/<[^>]*>?/gm, '');
        
        if (cleanSummary.length > 250) {
          cleanSummary = cleanSummary.substring(0, 247) + '...';
        }

        sourceArticles.push({
          title: item.title,
          sourceURL: item.link,
          source: source.name,
          summary: cleanSummary,
          author: item.creator || item.author || source.name,
          publishedAt: item.isoDate ? new Date(item.isoDate) : (item.pubDate ? new Date(item.pubDate) : new Date()),
          category: source.category
        });
      }
      return sourceArticles;
    } catch (error) {
      console.error(`Failed to fetch feed: ${source.name}`, error);
      return []; // Return empty array on failure so Promise.all doesn't crash
    }
  });

  const results = await Promise.all(fetchPromises);
  results.forEach(articles => allArticles.push(...articles));

  return allArticles;
}
