"use client";

import React from 'react';

const TickerData = [
  { symbol: "NIFTY", value: "24,832", change: "+0.68%", isUp: true },
  { symbol: "SENSEX", value: "81,234", change: "+0.72%", isUp: true },
  { symbol: "BANKNIFTY", value: "52,104", change: "-0.23%", isUp: false },
  { symbol: "RELIANCE", value: "2,945", change: "+1.12%", isUp: true },
  { symbol: "INFY", value: "1,823", change: "-0.41%", isUp: false },
  { symbol: "BTC", value: "$72,415", change: "+2.3%", isUp: true },
  { symbol: "GOLD", value: "₹73,240", change: "+0.45%", isUp: true },
];

export function TickerBar() {
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
        <div className="flex animate-[marquee_30s_linear_infinite] items-center gap-8 px-8 w-max">
          {[...TickerData, ...TickerData].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 font-space-grotesk text-sm">
              <span className="text-slate-300 font-medium">{item.symbol}</span>
              <span className="text-white">{item.value}</span>
              <span className={`font-medium ${item.isUp ? 'text-teal-400' : 'text-rose-500'}`}>
                {item.isUp ? '▲' : '▼'} {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
