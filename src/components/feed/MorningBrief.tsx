"use client";

import React, { useEffect, useState } from 'react';
import { X, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function MorningBrief() {
  const [topSignals, setTopSignals] = useState<any[]>([]);

  useEffect(() => {
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
    fetchTopSignals();
  }, []);

  // Use current date to deterministically mock global snapshot so it changes daily
  const seed = new Date().getDate();
  const dow = 44000 + (seed * 15);
  const dowChange = seed % 2 === 0 ? `+0.${seed % 9}%` : `-0.${seed % 9}%`;

  return (
    <div className="relative glass-panel rounded-xl overflow-hidden mb-8 border-amber-400/30 shrink-0">
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-400 to-amber-600"></div>
      
      <div className="p-5 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-amber-400 font-space-grotesk font-bold tracking-wider text-sm">MORNING BRIEF</h2>
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-pulse"></div>
            <span className="text-slate-400 font-space-grotesk text-xs tracking-wider">
              {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()} · 07:00 IST
            </span>
          </div>
          <button suppressHydrationWarning className="text-slate-500 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* 3 Columns */}
        <div className="grid grid-cols-3 gap-6 pt-2">
          
          {/* Top Signals */}
          <div className="flex flex-col gap-3 pr-6 border-r border-white/5">
            <h3 className="text-xs text-slate-500 font-space-grotesk tracking-wider">TOP SIGNALS</h3>
            <div className="flex flex-col gap-2">
              {topSignals.length > 0 ? topSignals.map((signal, i) => (
                <div key={signal.id || i} className="flex items-start gap-2">
                  {i % 2 === 0 ? <TrendingUp size={14} className="text-teal-400 mt-0.5 shrink-0" /> : <TrendingDown size={14} className="text-rose-500 mt-0.5 shrink-0" />}
                  <span className="font-inter text-sm text-slate-200 leading-snug line-clamp-2">{signal.title}</span>
                </div>
              )) : (
                <div className="text-sm text-slate-500 font-inter">Loading autonomous signals...</div>
              )}
            </div>
          </div>

          {/* Global Snapshot */}
          <div className="flex flex-col gap-3 pr-6 border-r border-white/5">
            <h3 className="text-xs text-slate-500 font-space-grotesk tracking-wider">GLOBAL SNAPSHOT</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between font-space-grotesk text-sm">
                <span className="text-slate-300">DOW</span>
                <span className="text-white">{dow.toLocaleString()}</span>
                <span className={dowChange.startsWith('+') ? "text-teal-400 flex items-center" : "text-rose-500 flex items-center"}>
                  {dowChange.startsWith('+') ? <TrendingUp size={12} className="mr-1"/> : <TrendingDown size={12} className="mr-1"/>}
                  {dowChange}
                </span>
              </div>
              <div className="flex items-center justify-between font-space-grotesk text-sm">
                <span className="text-slate-300">NIKKEI</span>
                <span className="text-white">{(39000 + seed * 23).toLocaleString()}</span>
                <span className="text-teal-400 flex items-center"><TrendingUp size={12} className="mr-1"/>+1.2%</span>
              </div>
              <div className="flex items-center justify-between font-space-grotesk text-sm">
                <span className="text-slate-300">OIL</span>
                <span className="text-white">$85.20</span>
                <span className="text-slate-500 flex items-center"><Minus size={12} className="mr-1"/>flat</span>
              </div>
              <div className="flex items-center justify-between font-space-grotesk text-sm">
                <span className="text-slate-300">DXY</span>
                <span className="text-white">104.2</span>
                <span className="text-rose-500 flex items-center"><TrendingDown size={12} className="mr-1"/>-0.3%</span>
              </div>
            </div>
          </div>

          {/* Today's Calendar */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs text-slate-500 font-space-grotesk tracking-wider">TODAY'S CALENDAR</h3>
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
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
