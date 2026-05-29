"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { TickerBar } from '@/components/layout/TickerBar';
import { Sidebar } from '@/components/layout/Sidebar';
import { LivePipeline } from '@/components/pipeline/LivePipeline';
import { MorningBrief } from '@/components/feed/MorningBrief';
import { ArticleCard } from '@/components/feed/ArticleCard';
import { Search, Filter as FilterIcon, Bell, X, Brain, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { TypewriterText, MotionWords, ThreeDSticks } from '@/components/ui/Animations';

const SOURCES_LIST = [
  'LiveMint', 'Economic Times', 'ET Markets', 
  'TradingView', 'Bloomberg', 'Reuters Markets', 'CoinDesk'
];

export default function Dashboard() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeArticle, setActiveArticle] = useState<any>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [detailedSummary, setDetailedSummary] = useState<string>('');

  const fetchFeed = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      params.append('category', 'all');
      params.append('limit', '30');
      
      if (search) params.append('search', search);
      if (selectedTag) params.append('search', selectedTag);
      if (selectedSources.length > 0) {
        params.append('sources', selectedSources.join(','));
      }

      const res = await fetch(`/api/feed?${params.toString()}`);
      const data = await res.json();
      if (data.success && data.data) {
        setArticles(data.data);
      }
    } catch (err) {
      console.error("Feed error:", err);
    } finally {
      setLoading(false);
    }
  }, [search, selectedTag, selectedSources]);

  // Dynamic tags extraction
  const TRENDING_TAGS = Array.from(new Set(articles.flatMap((a: any) => {
    try {
      const t = typeof a.tags === 'string' ? JSON.parse(a.tags) : a.tags;
      return Array.isArray(t) ? t : [];
    } catch {
      return [];
    }
  }))).slice(0, 7);

  // 1. Reactive UI Updates (Instant filtering)
  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  // 2. Background Cron Polling (Every 5 mins)
  useEffect(() => {
    const runPipeline = async () => {
      try {
        // Trigger cron to attempt DB populate (will fail gracefully on Vercel)
        fetch('/api/cron/fetch').catch(e => console.error(e));
        
        // Force the UI to pull fresh data from the API
        await fetchFeed();
      } catch (e) {
        console.error("Pipeline error", e);
      }
    };

    // We don't runPipeline immediately here because fetchFeed is already called by the dependency array below.
    // We just set up the 5 minute interval.
    const interval = setInterval(runPipeline, 300000);
    return () => clearInterval(interval);
  }, [fetchFeed]);

  const toggleSource = (source: string) => {
    setSelectedSources(prev => 
      prev.includes(source) ? prev.filter(s => s !== source) : [...prev, source]
    );
  };

  const toggleTag = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
      setSearch(''); // clear text search when using tags
    }
  };

  const handleArticleClick = async (article: any) => {
    setActiveArticle(article);
    setIsSummarizing(true);
    setDetailedSummary(''); // reset
    
    try {
      const targetUrl = article.sourceURL || article.url;
      const res = await fetch(`/api/summarize?url=${encodeURIComponent(targetUrl)}`);
      const data = await res.json();
      if (data.success && data.summary) {
        setDetailedSummary(data.summary);
      } else {
        setDetailedSummary(article.summary || "Unable to extract full text at this time. Please read the original article.");
      }
    } catch (e) {
      console.error(e);
      setDetailedSummary(article.summary || "Extraction failed. Please read the full source article for context.");
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <>
      <main className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col relative">
          
          {/* 3D Background Elements - Amber theme for Daily Feed */}
          <ThreeDSticks theme="amber" />
          
          <header className="mb-6 relative z-10 pt-4 max-w-3xl">
            <TypewriterText text="Daily Market Intelligence" />
            <MotionWords text={`Curated insights and breaking news for ${new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}`} delay={1.5} />
          </header>

          <MorningBrief />

          {/* Search & Filter Bar */}
          <div className="glass-panel p-4 mb-6 flex flex-col gap-4 overflow-visible z-20 shrink-0">
            <div className="flex items-center gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  suppressHydrationWarning
                  placeholder="Search (Nifty, RBI, Banks...)"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    if (e.target.value) setSelectedTag(null);
                  }}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50 transition-colors"
                />
              </div>
              
              {/* Filter Button */}
              <button 
                onClick={() => setShowFilters(!showFilters)}
                suppressHydrationWarning
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all text-sm font-space-grotesk ${
                  showFilters || selectedSources.length > 0 
                    ? 'bg-amber-400/10 border-amber-400/30 text-amber-400' 
                    : 'bg-slate-900/50 border-white/10 text-slate-300 hover:bg-white/5'
                }`}
              >
                <FilterIcon size={16} />
                Sources {selectedSources.length > 0 && `(${selectedSources.length})`}
              </button>
            </div>

            {/* Expandable Source Filters */}
            {showFilters && (
              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5 animate-in slide-in-from-top-2">
                {SOURCES_LIST.map(source => (
                  <button
                    key={source}
                    suppressHydrationWarning
                    onClick={() => toggleSource(source)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-inter transition-colors border ${
                      selectedSources.includes(source)
                        ? 'bg-amber-400 text-black border-amber-400'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {source}
                  </button>
                ))}
              </div>
            )}

            {/* Trending Tags */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 text-amber-400 shrink-0">
                <Bell size={14} className="animate-pulse" />
                <span className="text-xs font-space-grotesk tracking-wider">TRENDING:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {TRENDING_TAGS.map(tag => (
                  <button
                    key={tag}
                    suppressHydrationWarning
                    onClick={() => toggleTag(tag)}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-space-grotesk tracking-wider uppercase transition-colors border ${
                      selectedTag === tag 
                        ? 'bg-teal-500/20 text-teal-300 border-teal-500/30' 
                        : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/20'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <h2 className="font-space-grotesk font-bold text-slate-300 tracking-wider text-sm">LATEST INTELLIGENCE</h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="font-space-grotesk text-amber-400 text-xs tracking-wider uppercase">Live Sync</span>
            </div>
          </div>

          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-8 perspective-1000 relative z-10">
              {articles.map((article: any) => (
                <ArticleCard key={article.id} article={article} onClick={handleArticleClick} />
              ))}
              {articles.length === 0 && (
                <div className="col-span-2 text-center py-10 text-slate-500 font-inter">
                  No articles found matching your filters.
                </div>
              )}
            </div>
          )}
        </main>

      <LivePipeline />

      {/* Summarizer Modal */}
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
              className="bg-[#0B0F19] w-full max-w-2xl max-h-[85vh] rounded-3xl border border-amber-500/30 flex flex-col overflow-hidden shadow-[0_0_50px_rgba(251,191,36,0.15)] relative"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#0f1423] sticky top-0 z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Brain size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-space-grotesk text-slate-300 font-medium">AGENT SUMMARISER</div>
                    <div className="text-xs font-inter text-slate-500">Autonomous extraction</div>
                  </div>
                </div>
                
                <button 
                  onClick={() => setActiveArticle(null)} 
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors border border-white/5"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-10 custom-scrollbar flex flex-col">
                {isSummarizing ? (
                  <div className="flex-1 flex flex-col items-center justify-center py-20">
                    <div className="relative w-20 h-20 mb-6">
                      <div className="absolute inset-0 border-2 border-amber-400/20 rounded-full"></div>
                      <div className="absolute inset-0 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                      <Brain size={24} className="absolute inset-0 m-auto text-amber-400 animate-pulse" />
                    </div>
                    <h3 className="font-space-grotesk font-bold text-amber-400 text-lg mb-2">Analyzing Intelligence</h3>
                    <p className="text-slate-500 font-inter text-sm text-center max-w-xs">Our multi-agent system is reading the full article from {activeArticle.source} and generating a structured brief...</p>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-6"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-space-grotesk tracking-wider uppercase border bg-amber-400/10 text-amber-400 border-amber-400/20">
                        {activeArticle.source}
                      </span>
                      <span className="text-xs font-inter text-slate-500">{new Date(activeArticle.publishedAt).toLocaleDateString()}</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-outfit font-bold text-white leading-tight">
                      {activeArticle.title}
                    </h1>

                    <div className="p-6 rounded-2xl bg-slate-800/50 border border-amber-500/20 relative mt-4">
                      <div className="absolute -top-3 left-6 px-2 bg-[#0B0F19] text-xs font-space-grotesk text-amber-400 tracking-wider">EXECUTIVE SUMMARY</div>
                      <div className="font-inter text-slate-300 leading-relaxed text-[15px] sm:text-base flex flex-col gap-4">
                        {(detailedSummary || activeArticle.summary || "This article contains fast-moving market updates. Market participants are advised to read the full source for complete context.")
                          .split('\n\n')
                          .map((para: string, i: number) => (
                            <p key={i}>{para}</p>
                          ))
                        }
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5 flex justify-center">
                      <a 
                        href={activeArticle.sourceURL || activeArticle.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-space-grotesk font-bold transition-all border bg-amber-400 text-black hover:bg-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                      >
                        <ExternalLink size={16} /> Read Full Source Article
                      </a>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
