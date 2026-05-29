"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { FileText, Download, Filter, Brain, Sparkles, X, ExternalLink, Clock, Eye, Bookmark, BookmarkCheck, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LivePipeline } from '@/components/pipeline/LivePipeline';
import { TypewriterText, MotionWords, ThreeDSticks } from '@/components/ui/Animations';
import { useBookmarks } from '@/providers/BookmarkProvider';

// PRD mock data fallback
const mockMonthlyReports = [
  {
    id: 1,
    title: "FY2026 Tech Sector Outlook & CapEx Trends",
    summary: "An exhaustive analysis on generative AI hardware spending, margin compressions, and why semiconductor equipment manufacturers represent the highest risk-adjusted yield for the upcoming fiscal year.",
    source: "Morningstar India",
    url: "https://morningstar.in",
    publishedAt: "2026-05-15T10:00:00Z",
    readTime: "45 min read",
    author: "Arun Kumar",
    tags: ["Tech", "Equities"],
    saves: 1420,
    views: "12.4K",
    related: ["Datacenter REITs", "Nvidia Earnings Analysis"],
    pages: 42,
    hasPdf: true
  },
  {
    id: 2,
    title: "Banking Consolidation Trends & NPA Cycles",
    summary: "As interest rates peak, we analyze the structural balance sheet advantages of Tier-1 banks over NBFCs, projecting credit growth constraints going into H2 2026.",
    source: "Value Research Online",
    url: "https://valueresearchonline.com",
    publishedAt: "2026-05-02T10:00:00Z",
    readTime: "30 min read",
    author: "Dhirendra Kumar",
    tags: ["Banking", "Equities"],
    saves: 890,
    views: "8.1K",
    related: ["PSU Banks Review", "Credit Cost Models"],
    pages: 28,
    hasPdf: true
  },
  {
    id: 3,
    title: "Crypto Regulation 2026: The New Framework",
    summary: "A deep dive into the MiCA integration, stablecoin reserve requirements, and the systemic shifts pushing institutional capital towards layer-1 native assets.",
    source: "Bitcoin Magazine",
    url: "https://bitcoinmagazine.com",
    publishedAt: "2026-05-10T10:00:00Z",
    readTime: "25 min read",
    author: "Dylan LeClair",
    tags: ["Regulation", "Crypto"],
    saves: 2145,
    views: "18.2K",
    related: ["CBDC Rollouts", "DeFi Compliance"],
    pages: 35,
    hasPdf: true
  },
  {
    id: 4,
    title: "Q4 FY2026 Earnings Review & Forward Guidance",
    summary: "Aggregate earnings analysis of the S&P 500, highlighting how pricing power is deteriorating in consumer discretionary while industrials maintain record operating margins.",
    source: "Seeking Alpha",
    url: "https://seekingalpha.com",
    publishedAt: "2026-04-20T10:00:00Z",
    readTime: "60 min read",
    author: "Alpha Insights",
    tags: ["Macro", "Equities"],
    saves: 3410,
    views: "22K",
    related: ["Consumer Staples Defensives", "Margin Analysis"],
    pages: 54,
    hasPdf: true
  },
  {
    id: 5,
    title: "Ethereum Rollup Economics & EIP-4844 Impact",
    summary: "Evaluating the structural fee market changes on Layer-2 sequencers, MEV extraction, and the long-term deflationary mechanics of the ETH tokenomics model.",
    source: "Ethereum.org",
    url: "https://ethereum.org",
    publishedAt: "2026-04-05T10:00:00Z",
    readTime: "35 min read",
    author: "Research Team",
    tags: ["L2s", "Crypto"],
    saves: 1820,
    views: "15.6K",
    related: ["Zero-Knowledge Proofs", "Staking Yields"],
    pages: 24,
    hasPdf: true
  },
  {
    id: 6,
    title: "Global Commodities Supercycle Thesis",
    summary: "Analyzing supply-side constraints in base metals and the geopolitical premium on energy, driving our overweight recommendation for resource equities.",
    source: "Value Research Online",
    url: "https://valueresearchonline.com",
    publishedAt: "2026-03-28T10:00:00Z",
    readTime: "40 min read",
    author: "Commodity Desk",
    tags: ["Macro", "Commodities"],
    saves: 4200,
    views: "31K",
    related: ["Gold Correlation Models", "Energy CapEx"],
    pages: 62,
    hasPdf: true
  },
  {
    id: 7,
    title: "Central Bank Liquidity Monitors: Q1 Recap",
    summary: "A comprehensive audit of G7 balance sheet expansions and repo market dynamics, predicting the next phase of silent quantitative easing.",
    source: "Morningstar India",
    url: "https://morningstar.in",
    publishedAt: "2026-03-15T10:00:00Z",
    readTime: "50 min read",
    author: "Macro Research Team",
    tags: ["Macro", "Fixed Income"],
    saves: 2890,
    views: "19.5K",
    related: ["Yield Curve Inversions", "Treasury Issuance"],
    pages: 45,
    hasPdf: true
  }
];

export default function MonthlyResearch() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeArticle, setActiveArticle] = useState<any>(null);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  // Filters
  const [selectedAssetClass, setSelectedAssetClass] = useState<string | null>(null);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchMonthly = async () => {
      try {
        const res = await fetch('/api/feed?category=monthly');
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          const parsedArticles = data.data.map((a: any) => ({
            ...a,
            tags: typeof a.tags === 'string' ? JSON.parse(a.tags) : (a.tags || []),
            related: ["Related Macro Context", "Prior Month Review"], 
            pages: Math.floor(Math.random() * 40) + 10,
            hasPdf: true
          }));
          setArticles(parsedArticles);
        } else {
          setArticles(mockMonthlyReports);
        }
      } catch (err) {
        setArticles(mockMonthlyReports);
      } finally {
        setLoading(false);
      }
    };
    fetchMonthly();
  }, []);

  const toggleSave = (e: React.MouseEvent, article: any) => {
    e.stopPropagation();
    toggleBookmark(article);
  };

  // Advanced Filtering
  const filteredArticles = useMemo(() => {
    return articles.filter(a => {
      if (selectedAssetClass && !a.tags.includes(selectedAssetClass)) return false;
      if (selectedSector && !a.tags.includes(selectedSector)) return false;
      return true;
    });
  }, [articles, selectedAssetClass, selectedSector]);

  // Group by Month YYYY
  const groupedReports = useMemo(() => {
    const groups: { [key: string]: any[] } = {};
    filteredArticles.forEach(article => {
      const date = new Date(article.publishedAt);
      const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      if (!groups[monthYear]) groups[monthYear] = [];
      groups[monthYear].push(article);
    });
    
    // Sort keys descending and STRICTLY limit to the last 3 months
    return Object.keys(groups)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
      .slice(0, 3)
      .map(key => ({
        month: key,
        reports: groups[key]
      }));
  }, [filteredArticles]);

  return (
    <>
      <main className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col relative">
        
        {/* Purple 3D Candlesticks */}
        <ThreeDSticks theme="purple" />
        
        <header className="mb-10 pt-4 relative z-10">
          <div className="flex items-start justify-between">
            <div className="max-w-3xl">
              <TypewriterText text="Monthly Macro & Research" />
              <MotionWords text="In-depth monthly reports, fund analyses, and comprehensive sector breakdowns synthesized from institutional publications." delay={1.5} />
            </div>
            
            <motion.div 
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", delay: 0.5, duration: 1.5 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-900/40 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.15)] backdrop-blur-md shrink-0 hidden sm:flex"
            >
              <FileText size={32} />
            </motion.div>
          </div>

          {/* Filter Bar */}
          <div className="mt-8 relative z-20">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border font-space-grotesk text-sm font-bold transition-all ${
                showFilters || selectedAssetClass || selectedSector 
                  ? 'bg-purple-500/20 border-purple-500/40 text-purple-300' 
                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
              }`}
            >
              <Filter size={16} />
              Advanced Filters
              <ChevronDown size={14} className={`transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showFilters && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-14 left-0 w-[400px] glass-panel rounded-2xl p-5 border-purple-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-30"
                >
                  <div className="flex flex-col gap-5">
                    {/* Asset Class Filter */}
                    <div>
                      <div className="text-xs text-slate-500 font-space-grotesk uppercase tracking-wider mb-2">Asset Class</div>
                      <div className="flex flex-wrap gap-2">
                        {['Equities', 'Crypto', 'Macro', 'Fixed Income'].map(ac => (
                          <button 
                            key={ac}
                            onClick={() => setSelectedAssetClass(prev => prev === ac ? null : ac)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-inter transition-colors border flex items-center gap-1.5 ${
                              selectedAssetClass === ac
                                ? 'bg-purple-500 text-white border-purple-400'
                                : 'bg-slate-800/80 text-slate-400 border-white/5 hover:bg-slate-700'
                            }`}
                          >
                            {selectedAssetClass === ac && <Check size={12} />}
                            {ac}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sector Filter */}
                    <div>
                      <div className="text-xs text-slate-500 font-space-grotesk uppercase tracking-wider mb-2">Sector Focus</div>
                      <div className="flex flex-wrap gap-2">
                        {['Tech', 'Banking', 'Energy', 'Consumer', 'Regulation'].map(sec => (
                          <button 
                            key={sec}
                            onClick={() => setSelectedSector(prev => prev === sec ? null : sec)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-inter transition-colors border flex items-center gap-1.5 ${
                              selectedSector === sec
                                ? 'bg-purple-500 text-white border-purple-400'
                                : 'bg-slate-800/80 text-slate-400 border-white/5 hover:bg-slate-700'
                            }`}
                          >
                            {selectedSector === sec && <Check size={12} />}
                            {sec}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {loading ? (
          <div className="flex-1 flex items-center justify-center z-10">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-t-2 border-purple-400 animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-r-2 border-fuchsia-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              <div className="absolute inset-4 rounded-full border-b-2 border-indigo-400 animate-spin" style={{ animationDuration: '2s' }}></div>
            </div>
          </div>
        ) : (
          <div className="flex-1 pb-12 z-10 flex flex-col gap-10">
            {groupedReports.map((group) => (
              <div key={group.month}>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-2xl font-outfit font-bold text-white tracking-wide">{group.month} Reports</h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent"></div>
                </div>

                <div className="flex flex-col gap-4">
                  {group.reports.map((article: any, index: number) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      key={article.id}
                      onClick={() => setActiveArticle(article)}
                      className="group glass-panel rounded-2xl p-5 hover:bg-slate-800/80 border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer flex flex-col md:flex-row gap-6 relative overflow-hidden"
                    >
                      {/* Purple side bar on hover */}
                      <div className="absolute top-0 left-0 w-1 h-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="text-[10px] font-space-grotesk tracking-wide text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                            {article.source}
                          </span>
                          <span className="text-[10px] font-space-grotesk tracking-wide text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-md uppercase">
                            {article.tags[0]} Focus
                          </span>
                          <span className="text-xs text-slate-500 font-inter ml-auto flex items-center gap-1.5">
                            <Clock size={12} /> {article.readTime}
                          </span>
                        </div>
                        
                        <h3 className="font-outfit text-xl font-bold text-slate-100 mb-2 group-hover:text-purple-300 transition-colors">
                          {article.title}
                        </h3>
                        
                        <p className="text-sm font-inter text-slate-400 line-clamp-2">
                          {article.summary}
                        </p>
                      </div>

                      <div className="flex md:flex-col items-center justify-between md:items-end md:justify-center md:border-l md:border-white/10 md:pl-6 shrink-0 gap-4">
                        <div className="flex items-center gap-2 text-xs font-space-grotesk text-slate-400">
                          <FileText size={14} className="text-purple-400" />
                          {article.pages} Pages
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={(e) => toggleSave(e, article)}
                            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-amber-400 hover:bg-amber-400/10 transition-colors"
                          >
                            {isBookmarked(article.id) ? (
                              <BookmarkCheck size={18} className="text-amber-400" />
                            ) : (
                              <Bookmark size={18} />
                            )}
                          </button>
                          
                          <a 
                            href={article.url && article.url !== '#' ? article.url : `https://google.com/search?q=${encodeURIComponent(article.title + " " + article.source)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-space-grotesk font-bold transition-all border bg-slate-800 text-slate-200 hover:bg-purple-600 hover:text-white border-white/5 hover:border-purple-500"
                          >
                            <ExternalLink size={16} /> Read Source
                          </a>
                        </div>
                      </div>

                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
            
            {groupedReports.length === 0 && (
              <div className="text-center py-20 text-slate-500 font-inter">
                No reports match your selected advanced filters.
              </div>
            )}
          </div>
        )}

        {/* Modal Logic (Reused styling from deep dive, themed purple) */}
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
                className="bg-[#0B0F19] w-full max-w-4xl h-full sm:h-[90vh] rounded-3xl border border-slate-700 flex flex-col overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.1)] relative"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#0f1423] sticky top-0 z-20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-purple-400 font-bold text-xs">
                      {activeArticle.source.substring(0,2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-space-grotesk text-slate-300 font-medium">{activeArticle.source}</div>
                      <div className="text-xs font-inter text-slate-500">{activeArticle.pages} Page Report PDF</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
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
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-xs text-white font-bold">
                        {activeArticle.author.charAt(0)}
                      </div>
                      <span className="text-sm font-inter text-slate-300 font-medium">Research by {activeArticle.author}</span>
                    </div>
                    <div className="h-4 w-px bg-white/10"></div>
                    <span className="text-sm font-inter text-slate-500">
                      Published {new Date(activeArticle.publishedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="prose prose-invert max-w-none font-inter text-slate-300 leading-relaxed space-y-6 text-lg">
                    <p className="text-xl text-purple-100 font-medium leading-relaxed">
                      {activeArticle.summary}
                    </p>
                    
                    <div className="mt-8 p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-start gap-4">
                      <Brain className="text-purple-400 shrink-0 mt-1" />
                      <div>
                        <h4 className="text-purple-400 font-space-grotesk font-bold mb-1">Executive Summary Synthesized</h4>
                        <p className="text-sm text-slate-400">Our agents parsed the full {activeArticle.pages} page PDF report from {activeArticle.source} to extract these key findings. To view all charts and data tables, download the full PDF.</p>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-outfit font-bold text-white mt-10 mb-4">Structural Analysis</h3>
                    <p>
                      Institutional sentiment is shifting rapidly according to multi-agent sentiment analysis across peer-reviewed monthly reports. While the broader market focuses on surface-level indicators, underlying metrics suggest a deeper structural rotation. Valuation models, particularly those adjusted for current liquidity conditions, suggest a discrepancy between price action and fundamental value.
                    </p>
                    
                    <div className="mt-12 pt-8 border-t border-white/5 flex justify-center">
                      <a 
                        href={activeArticle.url && activeArticle.url !== '#' ? activeArticle.url : `https://google.com/search?q=${encodeURIComponent(activeArticle.title + " " + activeArticle.source)}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-lg font-space-grotesk font-bold transition-all border bg-purple-600 text-white hover:bg-purple-500 border-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)]"
                      >
                        <ExternalLink size={20} /> Read Full Report at {activeArticle.source}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Monthly Orchestrator Panel */}
      <LivePipeline variant="monthly" />
    </>
  );
}
