"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LivePipeline } from '@/components/pipeline/LivePipeline';
import { useBookmarks } from '@/providers/BookmarkProvider';
import { Compass, BookmarkCheck, Bookmark, Clock, ExternalLink, Eye, ArrowRight, X, Brain } from 'lucide-react';

// We will fetch these dynamically in the component now instead of using mock data.

// Upcoming articles to simulate multi-agent live generation or fallback if DB is empty
const upcomingArticles = [
  {
    id: 101,
    title: "Understanding P/E Ratios: The Complete Guide",
    summary: "A comprehensive deep dive into Price-to-Earnings ratios, how to interpret them across different sectors, and when they might be misleading for value investors.",
    source: "Zerodha Varsity",
    url: "https://zerodha.com/varsity/chapter/price-to-earnings-ratio/",
    publishedAt: new Date().toISOString(),
    readTime: "25 min read",
    author: "Nithin Kamath",
    tags: ["Fundamental Analysis", "Valuation", "Beginner"],
    saves: 342,
    views: "2.3K",
    related: ["PEG Ratios Explained", "Value Trap Analysis"]
  },
  {
    id: 102,
    title: "Tech Sector Analysis: FY2026 Outlook",
    summary: "As AI integration matures, which tech giants are positioned for the next leg of growth? An institutional perspective on earnings projections and market psychology.",
    source: "Seeking Alpha",
    url: "https://seekingalpha.com/",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    readTime: "45 min read",
    author: "Rajeev Ravi",
    tags: ["Technical Analysis", "Tech Stocks", "Growth"],
    saves: 189,
    views: "1.1K",
    related: ["AI CapEx Trends", "Semiconductor Cycle"]
  },
  {
    id: 103,
    title: "The Psychology of Market Cycles",
    summary: "Understanding fear, greed, and the behavioral economics driving current market volatility. How retail sentiment diverges from institutional positioning.",
    source: "MarketWatch",
    url: "https://www.marketwatch.com/",
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    readTime: "15 min read",
    author: "Sarah Jenkins",
    tags: ["Market Psychology", "Behavioral Finance"],
    saves: 521,
    views: "4.5K",
    related: ["VIX Analysis", "Sentiment Indicators"]
  },
  {
    id: 104,
    title: "DeFi Protocols: Risk Assessment Framework",
    summary: "An analytical approach to evaluating smart contract risks, tokenomics, and liquidity depth in emerging decentralized finance primitives.",
    source: "The Block",
    url: "https://www.theblock.co/",
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    readTime: "35 min read",
    author: "Alex Thompson",
    tags: ["Crypto", "DeFi", "Risk Management"],
    saves: 276,
    views: "1.8K",
    related: ["L2 Solutions", "Yield Farming Mechanics"]
  },
  {
    id: 105,
    title: "Mutual Fund vs Direct Equity: A 10-Year Review",
    summary: "A data-driven comparison of returns, tax implications, and expense ratios between top-performing mutual funds and direct stock picking.",
    source: "Value Research Online",
    url: "https://www.valueresearchonline.com/",
    publishedAt: new Date(Date.now() - 345600000).toISOString(),
    readTime: "20 min read",
    author: "Dhirendra Kumar",
    tags: ["Fundamental", "Mutual Funds", "Investing"],
    saves: 412,
    views: "3.2K",
    related: ["Index Funds Strategy", "Tax Harvesting"]
  }
];

import { TypewriterText, MotionWords, ThreeDSticks } from '@/components/ui/Animations';

export default function DeepDive() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'live' | 'vault'>('live');
  
  // State for article reading modal
  const [activeArticle, setActiveArticle] = useState<any>(null);

  // Extract all unique tags dynamically, or use some standard ones for the vault
  const allTags = Array.from(new Set(articles.flatMap(a => {
    try {
      const t = typeof a.tags === 'string' ? JSON.parse(a.tags) : a.tags;
      return Array.isArray(t) ? t : [];
    } catch {
      return [];
    }
  })));

  useEffect(() => {
    const fetchDeepDives = async () => {
      try {
        const res = await fetch('/api/feed?category=deep-dive');
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          // Parse tags string back to array if it comes from SQLite
          const parsedArticles = data.data.map((a: any) => ({
            ...a,
            tags: typeof a.tags === 'string' ? JSON.parse(a.tags) : (a.tags || []),
            related: ["Further Analysis Available", "Historical Context"] // mock related for now
          }));
          setArticles(parsedArticles);
        } else {
          // If no articles yet, use upcoming as a fallback for UI demonstration
          setArticles(upcomingArticles);
        }
      } catch (err) {
        console.error(err);
        setArticles(upcomingArticles);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDeepDives();

    // Simulate Agent Auto-Update Live Feed
    let queue = [...upcomingArticles];
    const liveUpdateInterval = setInterval(() => {
      if (queue.length > 0) {
        const nextArticle = queue.shift();
        if (nextArticle) {
          setArticles(prev => [nextArticle, ...prev]);
        }
      } else {
        clearInterval(liveUpdateInterval);
      }
    }, 600000); // 10 minutes per auto-update

    return () => {
      clearInterval(liveUpdateInterval);
    };
  }, []);

  const toggleSave = (e: React.MouseEvent, article: any) => {
    e.stopPropagation();
    toggleBookmark(article);
  };

  const filteredArticles = activeTag 
    ? articles.filter(a => a.tags.includes(activeTag))
    : articles;

  return (
    <>
      <main className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col relative">
        
        {/* 3D Background Elements */}
        <ThreeDSticks />
        
        {/* Header */}
        <header className="mb-10 pt-4 relative z-10">
          <div className="flex items-start justify-between">
            <div className="max-w-3xl">
              <TypewriterText text="Deep Dive Intelligence" />
              <MotionWords text="Long-form market analysis, institutional research, and comprehensive educational guides autonomously updated by agents." delay={1.5} />
            </div>
            
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", delay: 0.5, duration: 1.5 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500/20 to-teal-900/40 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-[0_0_30px_rgba(45,212,191,0.15)] backdrop-blur-md shrink-0 hidden sm:flex"
            >
              <Compass size={32} />
            </motion.div>
          </div>
          
          {/* Tabs for Live Feed vs Knowledge Vault */}
          <div className="mt-8 flex items-center gap-4 border-b border-white/10 pb-4">
            <button 
              onClick={() => setActiveTab('live')}
              className={`text-lg font-outfit font-bold transition-all ${activeTab === 'live' ? 'text-teal-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Live Synthesis Feed
            </button>
            <button 
              onClick={() => setActiveTab('vault')}
              className={`text-lg font-outfit font-bold transition-all ${activeTab === 'vault' ? 'text-teal-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Knowledge Vault
            </button>
          </div>

          {/* Dynamic Tag Filter (Only show in Vault for organizing old content) */}
          {activeTab === 'vault' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              <button 
                onClick={() => setActiveTag(null)}
                className={`px-4 py-1.5 rounded-full text-sm font-space-grotesk transition-all duration-300 ${activeTag === null ? 'bg-teal-500 text-white shadow-[0_0_15px_rgba(45,212,191,0.4)]' : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700 border border-white/5'}`}
              >
                All Paths
              </button>
              {allTags.slice(0, 8).map(tag => (
                <button 
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-4 py-1.5 rounded-full text-sm font-space-grotesk transition-all duration-300 ${activeTag === tag ? 'bg-teal-500 text-white shadow-[0_0_15px_rgba(45,212,191,0.4)]' : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700 border border-white/5'}`}
                >
                  {tag}
                </button>
              ))}
            </motion.div>
          )}
        </header>

        {/* Content Area */}
        {loading ? (
          <div className="flex-1 flex items-center justify-center z-10">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-t-2 border-teal-400 animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-r-2 border-blue-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              <div className="absolute inset-4 rounded-full border-b-2 border-purple-400 animate-spin" style={{ animationDuration: '2s' }}></div>
            </div>
          </div>
        ) : activeTab === 'live' ? (
          // LIVE SYNTHESIS FEED
          <motion.div 
            layout
            className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-12 z-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredArticles.slice(0, 4).map((article: any, index: number) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={article.id} 
                  className="group relative glass-panel rounded-3xl p-1 bg-gradient-to-br from-slate-800/50 to-slate-900/50 hover:from-teal-900/30 hover:to-slate-900/80 transition-all duration-500 cursor-pointer"
                  onClick={() => setActiveArticle(article)}
                >
                  <div className="bg-[#0f1423]/90 backdrop-blur-xl rounded-[22px] p-6 h-full flex flex-col border border-white/5 group-hover:border-teal-500/20 transition-colors relative overflow-hidden">
                    
                    {/* Glowing hover orb */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/0 group-hover:bg-teal-500/20 rounded-full blur-3xl transition-all duration-700 ease-out z-0 pointer-events-none"></div>

                    {/* Header Row */}
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-teal-400 font-bold text-xs shadow-inner">
                          {article.source.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-space-grotesk text-slate-300 font-medium">{article.source}</div>
                          <div className="text-xs font-inter text-slate-500">{new Date(article.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={(e) => toggleSave(e, article)}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-teal-400 hover:bg-teal-400/10 transition-colors z-20"
                      >
                        {isBookmarked(article.id) ? (
                          <BookmarkCheck size={20} className="text-teal-400" />
                        ) : (
                          <Bookmark size={20} />
                        )}
                      </button>
                    </div>

                    {/* Tags & Meta */}
                    <div className="flex items-center gap-2 mb-4 flex-wrap relative z-10">
                      {article.tags.map((tag: string) => (
                        <span key={tag} className="text-[11px] font-space-grotesk tracking-wide text-teal-300 bg-teal-500/10 border border-teal-500/20 px-2.5 py-1 rounded-md">
                          {tag}
                        </span>
                      ))}
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs font-inter ml-auto bg-slate-800/50 px-2.5 py-1 rounded-md border border-white/5">
                        <Clock size={12} className="text-teal-500" /> {article.readTime}
                      </div>
                    </div>

                    {/* Title & Summary */}
                    <div className="relative z-10 flex-1">
                      <h3 className="font-outfit text-2xl font-bold text-white mb-3 leading-tight group-hover:text-teal-300 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-slate-400 text-sm font-inter leading-relaxed mb-6">
                        {article.summary}
                      </p>
                    </div>
                    
                    {/* Related Articles */}
                    <div className="mt-auto mb-6 bg-slate-900/50 rounded-xl p-3 border border-white/5 relative z-10">
                      <div className="text-xs text-slate-500 font-space-grotesk uppercase tracking-wider mb-2">Related Content</div>
                      <ul className="space-y-1.5">
                        {article.related.map((rel: string, idx: number) => (
                          <li key={idx} className="text-sm text-slate-300 hover:text-teal-400 flex items-center gap-2 cursor-pointer transition-colors">
                            <ExternalLink size={12} className="text-teal-500/50" />
                            <span className="truncate">{rel}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Footer Row */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-10">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-teal-600 to-blue-600 flex items-center justify-center text-[10px] text-white font-bold">
                            {article.author.charAt(0)}
                          </div>
                          <span className="text-xs font-inter text-slate-300 font-medium">By {article.author}</span>
                        </div>
                        <div className="h-4 w-px bg-white/10"></div>
                        <div className="flex items-center gap-1.5 text-slate-500 text-xs font-space-grotesk">
                          <Eye size={14} />
                          {article.views} views
                        </div>
                      </div>
                      
                      <button className="flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-900 text-sm font-bold font-space-grotesk px-5 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(45,212,191,0.3)] hover:shadow-[0_0_25px_rgba(45,212,191,0.5)] group-hover/btn">
                        Read Now 
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          // KNOWLEDGE VAULT
          <div className="flex flex-col gap-8 pb-12 z-10">
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-700">
              <h3 className="text-xl font-outfit font-bold text-white mb-2">Your Curated Library</h3>
              <p className="text-sm text-slate-400 font-inter mb-6">Historical deep dives organized by learning paths. Content here is preserved forever (last 100 items or your saved bookmarks).</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredArticles.slice(4).filter((a, idx) => idx < 100 || isBookmarked(a.id)).map((article: any, index: number) => (
                   <div 
                    key={article.id}
                    onClick={() => setActiveArticle(article)}
                    className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-white/5 cursor-pointer transition-colors flex flex-col h-full"
                   >
                     <div className="flex items-center gap-2 mb-2 flex-wrap">
                       <span className="text-[10px] font-space-grotesk tracking-wide text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                         {article.source}
                       </span>
                       <span className="text-[10px] font-space-grotesk tracking-wide text-teal-300 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded-md">
                         {article.tags[0] || "Research"}
                       </span>
                     </div>
                     <h4 className="font-outfit font-bold text-slate-200 leading-tight mb-2 flex-1">{article.title}</h4>
                     <div className="text-xs text-slate-500 font-inter flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                        <span>{article.readTime}</span>
                     </div>
                   </div>
                ))}
                {filteredArticles.length <= 4 && (
                  <div className="col-span-3 text-center py-10 text-slate-500 font-inter">
                    Not enough historical articles yet to populate the vault. Wait for agents to gather more!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ARTICLE READING MODAL */}
        <AnimatePresence>
          {activeArticle && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ y: "100%", opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: "100%", opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="bg-[#0B0F19] w-full max-w-4xl h-full sm:h-[90vh] rounded-3xl border border-slate-700 flex flex-col overflow-hidden shadow-[0_0_50px_rgba(45,212,191,0.1)] relative"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#0f1423] sticky top-0 z-20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-teal-400 font-bold text-xs">
                      {activeArticle.source.substring(0,2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-space-grotesk text-slate-300 font-medium">{activeArticle.source}</div>
                      <div className="text-xs font-inter text-slate-500">{activeArticle.readTime}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <a 
                      href={activeArticle.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-sm font-space-grotesk transition-colors border border-white/5"
                    >
                      <ExternalLink size={16} />
                      View Original
                    </a>
                    <button 
                      onClick={() => setActiveArticle(null)} 
                      className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors border border-white/5"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
                
                {/* Content Scroll Area */}
                <div className="flex-1 overflow-y-auto p-8 sm:p-12 custom-scrollbar">
                  <h1 className="text-3xl sm:text-5xl font-outfit font-bold text-white mb-6 leading-tight">
                    {activeArticle.title}
                  </h1>
                  
                  <div className="flex items-center gap-4 mb-10 pb-10 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-600 to-blue-600 flex items-center justify-center text-xs text-white font-bold">
                        {activeArticle.author.charAt(0)}
                      </div>
                      <span className="text-sm font-inter text-slate-300 font-medium">By {activeArticle.author}</span>
                    </div>
                    <div className="h-4 w-px bg-white/10"></div>
                    <span className="text-sm font-inter text-slate-500">
                      Published {new Date(activeArticle.publishedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="prose prose-invert max-w-none font-inter text-slate-300 leading-relaxed space-y-6 text-lg">
                    <p className="text-xl text-teal-100 font-medium leading-relaxed">
                      {activeArticle.summary}
                    </p>
                    
                    <div className="mt-8 p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-start gap-4">
                      <Brain className="text-teal-400 shrink-0 mt-1" />
                      <div>
                        <h4 className="text-teal-400 font-space-grotesk font-bold mb-1">AI Synthesis Report</h4>
                        <p className="text-sm text-slate-400">This intelligence brief was autonomously synthesized by the FinanceFlow Multi-Agent System scanning 40+ institutional sources, cross-referencing data points, and formatting for readability.</p>
                      </div>
                    </div>

                    <p className="mt-8">
                      Institutional sentiment is shifting rapidly according to multi-agent sentiment analysis. While the broader market focuses on surface-level indicators, underlying metrics suggest a deeper rotation is underway. Valuation models, particularly those adjusted for current liquidity conditions, suggest a 15% discrepancy between price action and fundamental value in key sectors.
                    </p>
                    
                    <h3 className="text-2xl font-outfit font-bold text-white mt-10 mb-4">Key Analytical Takeaways</h3>
                    <ul className="list-disc pl-6 space-y-3 text-slate-300">
                      <li>Derivatives market positioning indicates aggressive hedging against short-term volatility spikes.</li>
                      <li>CapEx in next-generation infrastructure is masking near-term margin compression.</li>
                      <li>Retail flows have completely diverged from institutional accumulation patterns over the last 72 hours.</li>
                    </ul>
                    
                    <p className="mt-8">
                      Moving forward, the primary catalyst remains the divergence between monetary policy expectations and actual fiscal liquidity injections. Agents tracking these specific cross-asset correlations have flagged an elevated probability of a regime shift if key support levels in treasury yields are breached.
                    </p>
                    
                    <div className="mt-12 pt-8 border-t border-white/5 flex justify-center">
                      <a 
                        href={activeArticle.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-900 rounded-xl font-space-grotesk font-bold transition-colors"
                      >
                        Read Full Article on {activeArticle.source}
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Renders the actual agent pipeline side-panel with deep-dive variant */}
      <LivePipeline variant="deep-dive" />
    </>
  );
}
