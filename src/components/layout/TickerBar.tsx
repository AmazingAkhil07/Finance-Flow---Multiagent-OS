"use client";

import React, { useState, useEffect } from 'react';

const InitialTickerData = [
  { symbol: "NIFTY", value: 24832, change: 0.68, isIndex: true },
  { symbol: "SENSEX", value: 81234, change: 0.72, isIndex: true },
  { symbol: "BANKNIFTY", value: 52104, change: -0.23, isIndex: true },
  { symbol: "RELIANCE", value: 2945, change: 1.12, isIndex: false },
  { symbol: "INFY", value: 1823, change: -0.41, isIndex: false },
  { symbol: "BTC", value: 72415, change: 2.3, isDollar: true },
  { symbol: "GOLD", value: 73240, change: 0.45, isRupee: true },
];

export function TickerBar() {
  const [tickerData, setTickerData] = useState(InitialTickerData);

  useEffect(() => {
    let isSubscribed = true;

    const fetchRealTickerData = async () => {
      try {
        const res = await fetch('/api/ticker');
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          if (isSubscribed) {
            // Keep any missing fields from InitialTickerData if necessary, but API provides everything
            setTickerData(data.data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch live ticker data", err);
      }
    };

    // Fetch immediately on mount
    fetchRealTickerData();

    // Poll Yahoo Finance proxy every 15 seconds for real-time market updates
    const interval = setInterval(fetchRealTickerData, 15000);
    return () => {
      isSubscribed = false;
      clearInterval(interval);
    };
  }, []);

  const formatValue = (item: any) => {
    const val = item.value.toLocaleString('en-IN', { maximumFractionDigits: item.value < 10000 ? 1 : 0 });
    if (item.isDollar) return `$${val}`;
    if (item.isRupee) return `₹${val}`;
    return val;
  };

  return (
    <div className="glass-panel w-full h-12 flex items-center px-4 shrink-0 rounded-full">
      {/* Brand */}
      <div className="flex items-center gap-2 pr-6 border-r border-white/10 shrink-0">
        <div className="w-5 h-5 rounded bg-amber-400 flex items-center justify-center text-black font-bold text-xs font-outfit">
          FF
        </div>
        <span className="font-outfit font-bold text-amber-400 tracking-wider text-sm">
          FINANCEFLOW
        </span>
      </div>

      {/* Marquee Container */}
      <div className="flex-1 overflow-hidden whitespace-nowrap flex items-center h-full relative">
        <div className="flex animate-[marquee_30s_linear_infinite] w-max">
          
          {/* First Scrolling Group */}
          <div className="flex items-center gap-8 pr-8 w-max">
            {tickerData.map((item, idx) => {
              const isUp = item.change >= 0;
              return (
                <div key={`group1-${idx}`} className="flex items-center gap-2 font-space-grotesk text-sm">
                  <span className="text-slate-300 font-medium">{item.symbol}</span>
                  <span className="text-white transition-all duration-300">{formatValue(item)}</span>
                  <span className={`font-medium transition-colors duration-300 ${isUp ? 'text-teal-400' : 'text-rose-500'}`}>
                    {isUp ? '▲' : '▼'} {isUp ? '+' : ''}{item.change.toFixed(2)}%
                  </span>
                </div>
              );
            })}
          </div>

          {/* Second identical scrolling group for seamless looping */}
          <div className="flex items-center gap-8 pr-8 w-max">
            {tickerData.map((item, idx) => {
              const isUp = item.change >= 0;
              return (
                <div key={`group2-${idx}`} className="flex items-center gap-2 font-space-grotesk text-sm">
                  <span className="text-slate-300 font-medium">{item.symbol}</span>
                  <span className="text-white transition-all duration-300">{formatValue(item)}</span>
                  <span className={`font-medium transition-colors duration-300 ${isUp ? 'text-teal-400' : 'text-rose-500'}`}>
                    {isUp ? '▲' : '▼'} {isUp ? '+' : ''}{item.change.toFixed(2)}%
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
