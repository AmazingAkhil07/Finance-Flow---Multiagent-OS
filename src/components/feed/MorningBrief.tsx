"use client";

import React, { useEffect, useState } from 'react';
import { X, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

const FALLBACK_TICKERS = [
  { symbol: "NIFTY", value: 24805, change: 0.57, isDollar: false },
  { symbol: "AAPL", value: 215.00, change: 1.2, isDollar: true },
  { symbol: "BTC", value: 70243, change: -0.74, isDollar: true },
  { symbol: "GOLD", value: 73613, change: 0.96, isDollar: true }
];

export function MorningBrief() {
  const [topSignals, setTopSignals] = useState<any[]>([]);
  const [tickerData, setTickerData] = useState<any[]>(FALLBACK_TICKERS);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if already dismissed today
    const todayDateStr = new Date().toDateString();
    if (localStorage.getItem('morningBriefDismissed') !== todayDateStr) {
      setIsVisible(true);
    }

    const fetchTopSignals = async () => {
      try {
        const res = await fetch('/api/feed?limit=3');
        const data = await res.json();
        if (data.success) {
          setTopSignals(data.data);
        }
      } catch (err) {
        console.error("Failed to load signals", err);
      }
    };

    const fetchTickerData = async () => {
      try {
        const res = await fetch('/api/ticker');
        const data = await res.json();
        if (data.success && data.data) {
          setTickerData(data.data);
        }
      } catch (err) {
        console.error("Failed to load ticker", err);
      }
    };

    fetchTopSignals();
    fetchTickerData();
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('morningBriefDismissed', new Date().toDateString());
    setIsVisible(false);
  };

  const getTicker = (symbol: string) => {
    return tickerData.find(t => t.symbol === symbol) || { value: 0, change: 0, isDollar: false };
  };

  const formatPrice = (value: number, isDollar: boolean) => {
    if (value === 0) return '---';
    return isDollar 
      ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
      : new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value);
  };

  const formatChange = (change: number) => {
    if (change === 0) return '0.00%';
    const prefix = change > 0 ? '+' : '';
    return `${prefix}${change.toFixed(2)}%`;
  };

  if (!isVisible) {
    return (
      <button 
        onClick={() => {
          localStorage.removeItem('morningBriefDismissed');
          setIsVisible(true);
        }}
        className="mb-8 flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-space-grotesk hover:bg-amber-400/20 transition-colors shrink-0 w-fit"
      >
        <span>☀️</span> Show Morning Brief
      </button>
    );
  }

  const btc = getTicker('BTC');
  const aapl = getTicker('AAPL');
  const nifty = getTicker('NIFTY');
  const gold = getTicker('GOLD');

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative glass-panel rounded-xl overflow-hidden mb-8 border-amber-400/30 shrink-0"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-400 to-amber-600"></div>
      
      <div className="p-5 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-amber-400 font-space-grotesk font-bold tracking-wider text-sm">MORNING BRIEF</h2>
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-pulse"></div>
            <span className="text-slate-400 font-space-grotesk text-xs tracking-wider hidden md:block">
              {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()} · {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <button 
            suppressHydrationWarning 
            onClick={handleDismiss}
            className="text-slate-500 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          {/* Top Headlines */}
          <div className="flex flex-col gap-3 pb-6 border-b md:pb-0 md:border-b-0 md:pr-6 md:border-r border-white/5">
            <h3 className="text-xs text-slate-400 font-space-grotesk tracking-wider flex items-center gap-1.5">
              <span className="text-sm">🇮🇳</span> TOP HEADLINES TODAY
            </h3>
            <div className="flex flex-col gap-2.5">
              {topSignals.length > 0 ? topSignals.map((signal, i) => (
                <div key={signal.id || i} className="flex flex-col gap-0.5">
                  <div className="flex items-start gap-1.5">
                    <span className="font-space-grotesk text-xs text-amber-500 mt-0.5">{i + 1}.</span>
                    <span className="font-inter text-sm text-slate-200 leading-snug line-clamp-2">"{signal.title}"</span>
                  </div>
                  <span className="text-[10px] font-space-grotesk text-slate-500 pl-4">— {signal.source}</span>
                </div>
              )) : (
                <div className="text-sm text-slate-500 font-inter">Loading autonomous signals...</div>
              )}
            </div>
          </div>

          {/* Global Snapshot */}
          <div className="flex flex-col gap-3 pb-6 border-b md:pb-0 md:border-b-0 md:pr-6 md:border-r border-white/5">
            <h3 className="text-xs text-slate-400 font-space-grotesk tracking-wider flex items-center gap-1.5">
              <span className="text-sm">🌍</span> GLOBAL MARKET SUMMARY
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between font-space-grotesk text-sm">
                <span className="text-slate-300">NIFTY</span>
                <span className="text-white">{formatPrice(nifty.value, false)}</span>
                <span className={nifty.change > 0 ? "text-teal-400 flex items-center" : nifty.change < 0 ? "text-rose-500 flex items-center" : "text-slate-500 flex items-center"}>
                  {nifty.change > 0 ? <TrendingUp size={12} className="mr-1"/> : nifty.change < 0 ? <TrendingDown size={12} className="mr-1"/> : <Minus size={12} className="mr-1" />}
                  {formatChange(nifty.change)}
                </span>
              </div>
              <div className="flex items-center justify-between font-space-grotesk text-sm">
                <span className="text-slate-300">AAPL</span>
                <span className="text-white">{formatPrice(aapl.value, true)}</span>
                <span className={aapl.change > 0 ? "text-teal-400 flex items-center" : aapl.change < 0 ? "text-rose-500 flex items-center" : "text-slate-500 flex items-center"}>
                  {aapl.change > 0 ? <TrendingUp size={12} className="mr-1"/> : aapl.change < 0 ? <TrendingDown size={12} className="mr-1"/> : <Minus size={12} className="mr-1" />}
                  {formatChange(aapl.change)}
                </span>
              </div>
              <div className="flex items-center justify-between font-space-grotesk text-sm">
                <span className="text-slate-300">GOLD</span>
                <span className="text-white">{formatPrice(gold.value, true)}</span>
                <span className={gold.change > 0 ? "text-teal-400 flex items-center" : gold.change < 0 ? "text-rose-500 flex items-center" : "text-slate-500 flex items-center"}>
                  {gold.change > 0 ? <TrendingUp size={12} className="mr-1"/> : gold.change < 0 ? <TrendingDown size={12} className="mr-1"/> : <Minus size={12} className="mr-1" />}
                  {formatChange(gold.change)}
                </span>
              </div>
              <div className="flex items-center justify-between font-space-grotesk text-sm">
                <span className="text-slate-300">BTC</span>
                <span className="text-white">{formatPrice(btc.value, true)}</span>
                <span className={btc.change > 0 ? "text-teal-400 flex items-center" : btc.change < 0 ? "text-rose-500 flex items-center" : "text-slate-500 flex items-center"}>
                  {btc.change > 0 ? <TrendingUp size={12} className="mr-1"/> : btc.change < 0 ? <TrendingDown size={12} className="mr-1"/> : <Minus size={12} className="mr-1" />}
                  {formatChange(btc.change)}
                </span>
              </div>
            </div>
          </div>

          {/* Today's Calendar */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs text-slate-400 font-space-grotesk tracking-wider flex items-center gap-1.5">
              <span className="text-sm">📅</span> TODAY'S EVENTS
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="font-space-grotesk text-teal-400 text-sm shrink-0">10:00</span>
                <span className="font-inter text-sm text-slate-300 truncate">RBI Policy Statement</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-space-grotesk text-amber-400 text-sm shrink-0">14:00</span>
                <span className="font-inter text-sm text-slate-300 truncate">TCS Q4 Earnings Call</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-space-grotesk text-slate-500 text-sm shrink-0">15:30</span>
                <span className="font-inter text-sm text-slate-300 truncate">Market Close NSE/BSE</span>
              </div>
              <p className="text-[10px] text-slate-500 italic mt-1 font-inter">
                * Real-time economic calendar API integration planned for v1.1.
              </p>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
