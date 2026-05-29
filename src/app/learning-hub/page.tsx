"use client";

import React, { useState } from 'react';
import { BookOpen, PlayCircle, Award, BookText, ExternalLink, ChevronRight, CheckCircle2, Circle, TrendingUp, ShieldAlert, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypewriterText, MotionWords, ThreeDSticks } from '@/components/ui/Animations';

// PRD Defined Learning Paths
const LEARNING_PATHS = [
  {
    id: 'stocks-101',
    category: 'Stocks Fundamentals',
    title: 'Equities Market Mastery',
    icon: TrendingUp,
    color: 'amber',
    bgClass: 'bg-amber-400/10 border-amber-400/20 text-amber-400',
    description: 'Master the foundational mechanics of the stock market, valuation models, and structural analysis from top institutional sources.',
    modules: [
      { id: 'm1', title: 'What is a Stock & Market Structure?', difficulty: 'Beginner', source: 'Zerodha Varsity', readTime: '15m' },
      { id: 'm2', title: 'How to Read P/E Ratios & Valuations', difficulty: 'Beginner', source: 'Investopedia', readTime: '20m' },
      { id: 'm3', title: 'Discounted Cash Flow (DCF) Modeling', difficulty: 'Intermediate', source: 'Value Research', readTime: '45m' },
      { id: 'm4', title: 'Institutional Technical Analysis Patterns', difficulty: 'Advanced', source: 'Seeking Alpha', readTime: '60m' },
    ]
  },
  {
    id: 'crypto-101',
    category: 'Crypto Fundamentals',
    title: 'On-Chain Analytics & DeFi',
    icon: Cpu,
    color: 'teal',
    bgClass: 'bg-teal-400/10 border-teal-400/20 text-teal-400',
    description: 'Deep dive into layer-1 tokenomics, smart contract risk assessment, and decentralized liquidity pools.',
    modules: [
      { id: 'c1', title: 'Layer 1 vs Layer 2 Scaling', difficulty: 'Beginner', source: 'Ethereum.org', readTime: '25m' },
      { id: 'c2', title: 'Automated Market Makers (AMMs)', difficulty: 'Intermediate', source: 'Bitcoin Magazine', readTime: '30m' },
      { id: 'c3', title: 'MEV Extraction & Slashing Risks', difficulty: 'Advanced', source: 'The Block', readTime: '55m' },
    ]
  },
  {
    id: 'macro-101',
    category: 'Macro Economics',
    title: 'Central Bank Policy & Yield Curves',
    icon: ShieldAlert,
    color: 'purple',
    bgClass: 'bg-purple-400/10 border-purple-400/20 text-purple-400',
    description: 'Understand the plumbing of the global financial system, repo markets, and liquidity cycles.',
    modules: [
      { id: 'ma1', title: 'Interest Rates & The Federal Reserve', difficulty: 'Beginner', source: 'Investopedia', readTime: '20m' },
      { id: 'ma2', title: 'Interpreting the Yield Curve', difficulty: 'Intermediate', source: 'Zerodha Varsity', readTime: '35m' },
      { id: 'ma3', title: 'Repo Market Mechanics & Basel III', difficulty: 'Advanced', source: 'Value Research', readTime: '50m' },
    ]
  }
];

const QUICK_LINKS = [
  { title: 'NSE Corporate Filings', desc: 'Latest disclosures and board meetings', url: 'https://www.nseindia.com/companies-listing/corporate-filings' },
  { title: 'BSE Announcements', desc: 'Real-time corporate action alerts', url: 'https://www.bseindia.com/corporates/ann.html' },
  { title: 'Annual Reports Archive', desc: 'Consolidated historical reports', url: 'https://www.bseindia.com/corporates/annualreports.html' },
  { title: 'Investor Relations Hub', desc: 'Direct links to major cap IR pages', url: '#' },
];

export default function LearningHub() {
  const [activePath, setActivePath] = useState<any>(null);
  
  // Local state for tracking module read progress (UI demo)
  const [completedModules, setCompletedModules] = useState<string[]>(['m1']);

  const toggleModuleCompletion = (e: React.MouseEvent, moduleId: string) => {
    e.stopPropagation();
    setCompletedModules(prev => 
      prev.includes(moduleId) ? prev.filter(id => id !== moduleId) : [...prev, moduleId]
    );
  };

  const getDifficultyColor = (diff: string) => {
    switch(diff) {
      case 'Beginner': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Intermediate': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'Advanced': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  return (
    <main className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col relative">
      
      {/* 3D Visualizer Background */}
      <ThreeDSticks theme="teal" />

      <header className="mb-8 pt-4 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div className="max-w-3xl">
          <TypewriterText text="Financial Learning Hub" />
          <MotionWords text="Master market mechanics, structural analysis, and economic principles sourced directly from top institutional educational platforms." delay={1} />
        </div>
        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-teal-500/20 to-blue-500/20 border border-teal-500/30 shadow-[0_0_20px_rgba(45,212,191,0.15)] backdrop-blur-md shrink-0">
          <Award size={24} className="text-teal-400 drop-shadow-md" />
          <div>
            <div className="text-[10px] font-space-grotesk text-slate-400 uppercase tracking-widest">Current Rank</div>
            <div className="font-space-grotesk font-bold text-white text-lg tracking-wide leading-tight">Analyst Level 4</div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 pb-12 relative z-10">
        
        {/* Main Learning Paths */}
        <div className="flex-1 flex flex-col gap-6">
          <h2 className="font-space-grotesk font-bold text-slate-300 tracking-wider text-sm flex items-center gap-2">
            <BookOpen size={16} className="text-teal-400" /> STRUCTURED LEARNING PATHS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
            {LEARNING_PATHS.map((path) => {
              const progress = Math.round((path.modules.filter(m => completedModules.includes(m.id)).length / path.modules.length) * 100);
              
              return (
                <div 
                  key={path.id}
                  onClick={() => setActivePath(path)}
                  className="glass-panel p-6 rounded-3xl border border-white/5 hover:border-teal-500/30 transition-all cursor-pointer group flex flex-col h-full bg-gradient-to-br from-slate-900/80 to-slate-800/50 hover:to-slate-800/80"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${path.bgClass} shadow-inner`}>
                      <path.icon size={20} />
                    </div>
                    <span className="text-[10px] font-space-grotesk tracking-widest text-slate-500 uppercase">
                      {path.category}
                    </span>
                  </div>
                  
                  <h3 className="font-outfit text-2xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                    {path.title}
                  </h3>
                  <p className="text-sm font-inter text-slate-400 line-clamp-2 mb-6 flex-1">
                    {path.description}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-space-grotesk text-slate-400">{path.modules.length} Modules</span>
                      <span className="text-xs font-space-grotesk text-teal-400 font-bold">{progress}% Completed</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(45,212,191,0.5)]" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Links Sidebar */}
        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-700/50 bg-slate-900/60 h-full">
            <h2 className="font-space-grotesk font-bold text-white tracking-wider text-sm flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
              <ExternalLink size={16} className="text-amber-400" /> 
              QUICK REFERENCE LINKS
            </h2>
            
            <div className="flex flex-col gap-4">
              {QUICK_LINKS.map((link, idx) => (
                <a 
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col p-4 rounded-2xl bg-slate-800/50 border border-white/5 hover:border-amber-400/30 hover:bg-slate-800 transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-outfit font-bold text-slate-200 group-hover:text-amber-400 transition-colors">
                      {link.title}
                    </h3>
                    <ExternalLink size={14} className="text-slate-500 group-hover:text-amber-400 transition-colors" />
                  </div>
                  <p className="text-xs font-inter text-slate-400 line-clamp-2">
                    {link.desc}
                  </p>
                </a>
              ))}
            </div>
            
            <div className="mt-8 p-5 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-center">
              <BookText size={24} className="text-teal-400 mx-auto mb-2" />
              <h4 className="font-space-grotesk font-bold text-teal-300 text-sm mb-1">Company Filings Note</h4>
              <p className="text-xs font-inter text-slate-400">Annual reports and NSE filings are pulled directly from exchange endpoints for pure fundamental analysis.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Path Reading Modal */}
      <AnimatePresence>
        {activePath && (
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
              className="bg-[#0B0F19] w-full max-w-3xl h-full sm:h-[85vh] rounded-3xl border border-slate-700 flex flex-col overflow-hidden shadow-[0_0_50px_rgba(45,212,191,0.1)] relative"
            >
              <div className={`h-2 w-full ${activePath.color === 'amber' ? 'bg-amber-500' : activePath.color === 'teal' ? 'bg-teal-500' : 'bg-purple-500'}`}></div>
              
              <div className="p-6 border-b border-white/5 bg-[#0f1423] sticky top-0 z-20 flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-space-grotesk tracking-widest text-slate-500 uppercase mb-1 block">
                    Learning Path Module
                  </span>
                  <h2 className="text-2xl font-outfit font-bold text-white">
                    {activePath.title}
                  </h2>
                </div>
                <button 
                  onClick={() => setActivePath(null)}
                  className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <ExternalLink size={20} className="rotate-45" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 sm:p-10 custom-scrollbar">
                <p className="text-slate-300 font-inter text-lg leading-relaxed mb-10">
                  {activePath.description}
                </p>
                
                <h3 className="font-space-grotesk font-bold text-white tracking-wider text-sm mb-6 flex items-center gap-2">
                  <PlayCircle size={16} className={`${activePath.color === 'amber' ? 'text-amber-400' : activePath.color === 'teal' ? 'text-teal-400' : 'text-purple-400'}`} /> 
                  COURSE CURRICULUM
                </h3>
                
                <div className="flex flex-col relative before:absolute before:inset-y-0 before:left-5 before:w-px before:bg-white/10 before:z-0">
                  {activePath.modules.map((mod: any, idx: number) => {
                    const isCompleted = completedModules.includes(mod.id);
                    return (
                      <div key={mod.id} className="relative z-10 flex gap-6 mb-8 group">
                        {/* Timeline Node */}
                        <div className={`w-10 h-10 rounded-full flex flex-col items-center justify-center shrink-0 border-2 transition-colors cursor-pointer ${
                          isCompleted 
                            ? activePath.color === 'amber' ? 'bg-amber-500/20 border-amber-500 text-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]' :
                              activePath.color === 'teal' ? 'bg-teal-500/20 border-teal-500 text-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.3)]' :
                              'bg-purple-500/20 border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                            : 'bg-[#0B0F19] border-slate-700 text-slate-500 group-hover:border-slate-500'
                        }`}
                        onClick={(e) => toggleModuleCompletion(e, mod.id)}
                        >
                          {isCompleted ? <CheckCircle2 size={18} /> : <span className="font-space-grotesk font-bold text-xs">{idx + 1}</span>}
                        </div>
                        
                        {/* Module Content */}
                        <div className={`flex-1 glass-panel p-5 rounded-2xl border transition-all ${isCompleted ? 'border-white/5 opacity-60' : 'border-white/10 hover:border-slate-500/50 cursor-pointer'}`}>
                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-space-grotesk tracking-wider uppercase border ${getDifficultyColor(mod.difficulty)}`}>
                              {mod.difficulty}
                            </span>
                            <span className="text-[10px] font-space-grotesk tracking-wide text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                              {mod.source}
                            </span>
                            <span className="text-xs font-inter text-slate-500 ml-auto flex items-center gap-1">
                              <BookOpen size={12} /> {mod.readTime}
                            </span>
                          </div>
                          
                          <h4 className={`font-outfit text-lg font-bold mb-1 transition-colors ${isCompleted ? 'text-slate-400' : 'text-slate-200 group-hover:text-white'}`}>
                            {mod.title}
                          </h4>
                          
                          <div className="mt-4 flex justify-between items-center">
                            <button 
                              onClick={(e) => toggleModuleCompletion(e, mod.id)}
                              className={`text-xs font-space-grotesk font-bold transition-colors flex items-center gap-1.5 ${
                                isCompleted 
                                  ? activePath.color === 'amber' ? 'text-amber-400' : activePath.color === 'teal' ? 'text-teal-400' : 'text-purple-400'
                                  : 'text-slate-500 hover:text-white'
                              }`}
                            >
                              {isCompleted ? (
                                <>COMPLETED <CheckCircle2 size={14} /></>
                              ) : (
                                <>MARK AS READ <Circle size={14} /></>
                              )}
                            </button>
                            
                            {!isCompleted && (
                              <button className={`px-4 py-1.5 rounded-lg text-xs font-space-grotesk font-bold transition-colors ${
                                activePath.color === 'amber' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500 hover:text-slate-900' :
                                activePath.color === 'teal' ? 'bg-teal-500/10 text-teal-400 border border-teal-500/30 hover:bg-teal-500 hover:text-slate-900' :
                                'bg-purple-500/10 text-purple-400 border border-purple-500/30 hover:bg-purple-500 hover:text-slate-900'
                              }`}>
                                START MODULE
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
