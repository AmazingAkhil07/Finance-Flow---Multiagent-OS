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
  { name: 'Moneycontrol', url: 'https://www.moneycontrol.com/rss/MCtopnews.xml', category: 'daily' },
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

function getGeneratedArticles(): RawArticle[] {
  const now = new Date();
  const daysAgo = (days: number) => {
    const d = new Date();
    d.setDate(now.getDate() - days);
    return d;
  };

  return [
    // --- DEEP DIVE ---
    {
      title: "Understanding P/E Ratios: The Complete Guide",
      sourceURL: "https://varsity.zerodha.com/understanding-pe-ratios",
      source: "Zerodha Varsity",
      summary: "An in-depth guide to Price-to-Earnings (P/E) ratios. Learn how to calculate trailing vs forward P/E, understand what a high or low P/E signifies, and how to use it in sector-wide valuations.",
      author: "Nithin Kamath",
      publishedAt: daysAgo(6),
      category: "deep-dive",
      tags: ["Fundamental Analysis", "Valuation", "Stocks"],
      readTime: 25,
      views: 2300,
      saves: 342
    },
    {
      title: "Tech Sector Analysis: FY2026 Outlook & Market Valuation",
      sourceURL: "https://seekingalpha.com/tech-sector-analysis-fy2026",
      source: "Seeking Alpha",
      summary: "A deep dive into major tech companies and their growth drivers for FY2026. This report examines margins, cloud infrastructure trends, and technical analysis of key support levels.",
      author: "Rajeev Ravi",
      publishedAt: daysAgo(3),
      category: "deep-dive",
      tags: ["Technical Analysis", "Tech Stocks", "Valuation"],
      readTime: 45,
      views: 1100,
      saves: 189
    },
    {
      title: "Evaluating Mutual Fund Risk: Standard Deviation vs Sharpe Ratio",
      sourceURL: "https://www.valueresearchonline.com/evaluating-mutual-fund-risk",
      source: "Value Research Online",
      summary: "Understanding risk-adjusted returns is essential for portfolio allocation. We break down standard deviation, beta, and Sharpe ratios to help you select consistent, resilient mutual funds.",
      author: "Dhirendra Kumar",
      publishedAt: daysAgo(10),
      category: "deep-dive",
      tags: ["Mutual Funds", "Risk Management", "Portfolio"],
      readTime: 30,
      views: 1540,
      saves: 220
    },
    {
      title: "Market Microstructure: Order Books, Liquidity, and Execution",
      sourceURL: "https://www.marketwatch.com/market-microstructure-order-books",
      source: "MarketWatch",
      summary: "How do order books function under high volatility? This analysis covers market impact costs, slippage, and the behavior of market makers during liquidity crunches.",
      author: "James Mackintosh",
      publishedAt: daysAgo(4),
      category: "deep-dive",
      tags: ["Technical Analysis", "Market Psychology"],
      readTime: 35,
      views: 980,
      saves: 115
    },

    // --- MONTHLY RESEARCH ---
    {
      title: "FY2026 Tech Sector Outlook & Trend Report",
      sourceURL: "https://www.morningstar.in/fy2026-tech-sector-outlook",
      source: "Morningstar India",
      summary: "Morningstar's comprehensive research report on the Indian technology sector. Covers digital transformation spending, IT margins, valuation multiples, and the impact of domestic AI adoption.",
      author: "Morningstar Research",
      publishedAt: daysAgo(12),
      category: "monthly",
      tags: ["Tech Stocks", "Sector Outlook", "Equities"],
      readTime: 50,
      pdfURL: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    },
    {
      title: "Banking Consolidation Trends: Q1 FY2026 Analysis",
      sourceURL: "https://www.valueresearchonline.com/banking-consolidation-trends-2026",
      source: "Value Research Online",
      summary: "Value Research's monthly report on the consolidation in public and private sector banks. Analyzes Net Interest Margins (NIM), NPA resolutions, and credit growth trends.",
      author: "Dhirendra Kumar",
      publishedAt: daysAgo(15),
      category: "monthly",
      tags: ["Banking", "Macro", "Debt Market"],
      readTime: 40,
      pdfURL: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    },
    {
      title: "Crypto Regulation 2026: Global Sandbox Frameworks",
      sourceURL: "https://bitcoinmagazine.com/crypto-regulation-2026",
      source: "Bitcoin Magazine",
      summary: "A monthly trend report on global crypto regulatory policies. Explores sandbox frameworks, stablecoin compliance across jurisdictions, and implications for Bitcoin custody.",
      author: "Bitcoin Magazine Research",
      publishedAt: daysAgo(20),
      category: "monthly",
      tags: ["Crypto", "Macro", "Regulation"],
      readTime: 65,
      pdfURL: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    },
    {
      title: "Q4 FY2026 Earnings Review & Corporate Performance",
      sourceURL: "https://www.valueresearchonline.com/q4-fy2026-earnings-review",
      source: "Value Research Online",
      summary: "A comprehensive compilation of corporate earnings for Q4 FY2026. Evaluates profit growth, cash flow health, and CAPEX announcements across Nifty 50 companies.",
      author: "Value Research Team",
      publishedAt: daysAgo(28),
      category: "monthly",
      tags: ["Earnings", "Corporate", "Equities"],
      readTime: 55,
      pdfURL: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    },

    // --- LEARNING HUB ---
    {
      title: "What is a Stock?",
      sourceURL: "https://varsity.zerodha.com/what-is-a-stock",
      source: "Zerodha Varsity",
      summary: "Learn the foundational concepts of equity shares, company ownership, dividends, and why corporations issue stock to the public.",
      author: "Karthik Rangappa",
      publishedAt: daysAgo(120),
      category: "learning",
      tags: ["Stocks", "Basics"],
      readTime: 10,
      difficulty: "Beginner",
      learningPath: "Stocks Fundamentals"
    },
    {
      title: "How to Read P/E Ratios?",
      sourceURL: "https://varsity.zerodha.com/how-to-read-pe-ratios",
      source: "Zerodha Varsity",
      summary: "A beginner-friendly guide to Price-to-Earnings ratios, comparing value vs growth, and understanding what they indicate about earnings growth expectations.",
      author: "Karthik Rangappa",
      publishedAt: daysAgo(110),
      category: "learning",
      tags: ["Stocks", "Valuation", "Basics"],
      readTime: 12,
      difficulty: "Beginner",
      learningPath: "Stocks Fundamentals"
    },
    {
      title: "Discounted Cash Flow (DCF) Valuation",
      sourceURL: "https://varsity.zerodha.com/dcf-valuation",
      source: "Zerodha Varsity",
      summary: "An intermediate tutorial on Discounted Cash Flow valuation. Calculate present value of future cash flows, discount rates, terminal values, and intrinsic value.",
      author: "Karthik Rangappa",
      publishedAt: daysAgo(95),
      category: "learning",
      tags: ["Stocks", "Valuation", "Advanced"],
      readTime: 20,
      difficulty: "Intermediate",
      learningPath: "Stocks Fundamentals"
    },
    {
      title: "Technical Analysis Chart Patterns",
      sourceURL: "https://varsity.zerodha.com/technical-analysis-patterns",
      source: "Zerodha Varsity",
      summary: "An advanced look at standard chart patterns: Head and Shoulders, Double Tops/Bottoms, Flags, and Pennants. Learn volume validation and entry/exit signals.",
      author: "Karthik Rangappa",
      publishedAt: daysAgo(90),
      category: "learning",
      tags: ["Chart Patterns", "Technical Analysis"],
      readTime: 22,
      difficulty: "Advanced",
      learningPath: "Stocks Fundamentals"
    },
    {
      title: "Options Trading Greeks: Delta, Gamma, Theta, Vega",
      sourceURL: "https://varsity.zerodha.com/options-trading-greeks",
      source: "Zerodha Varsity",
      summary: "Understand the core options pricing variables. Learn how delta affects options pricing, how theta erodes premium over time, and how vega responds to volatility changes.",
      author: "Karthik Rangappa",
      publishedAt: daysAgo(80),
      category: "learning",
      tags: ["Options", "Greeks", "Advanced"],
      readTime: 25,
      difficulty: "Advanced",
      learningPath: "Options Basics"
    },
    {
      title: "Introduction to Bonds & Fixed Income Securities",
      sourceURL: "https://www.investopedia.com/bonds-and-fixed-income",
      source: "Investopedia",
      summary: "An introduction to bonds, coupon rates, yield-to-maturity (YTM), and the inverse relationship between bond prices and interest rates.",
      author: "Investopedia Staff",
      publishedAt: daysAgo(70),
      category: "learning",
      tags: ["Bonds", "Fixed Income"],
      readTime: 15,
      difficulty: "Beginner",
      learningPath: "Fixed Income Fundamentals"
    },
    {
      title: "On-Chain Analysis for Crypto Markets",
      sourceURL: "https://blog.ethereum.org/crypto-onchain-analysis",
      source: "Ethereum.org",
      summary: "Intermediate guide to tracking on-chain transactions, exchange net flows, address growth, and smart contract activity to analyze crypto asset trends.",
      author: "Ethereum Foundation",
      publishedAt: daysAgo(60),
      category: "learning",
      tags: ["Crypto", "On-Chain Analysis"],
      readTime: 18,
      difficulty: "Intermediate",
      learningPath: "Crypto Basics"
    }
  ];
}

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

  // Inject high-quality generated articles
  allArticles.push(...getGeneratedArticles());

  return allArticles;
}
