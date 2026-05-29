"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Layers, Bookmark, Settings } from 'lucide-react';
import { useBookmarks } from '@/providers/BookmarkProvider';

const navItems = [
  { name: 'Daily Feed', icon: Home, href: '/' },
  { name: 'Deep Dive', icon: Compass, href: '/deep-dive' },
  { name: 'Monthly Research', icon: Layers, href: '/monthly-research' },
  { name: 'Saved Documents', icon: Bookmark, href: '/saved' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { bookmarks } = useBookmarks();

  return (
    <aside className="glass-panel w-[260px] h-full flex flex-col p-4 shrink-0">
      
      {/* Feeds Section */}
      <div className="mb-8 mt-2">
        <h3 className="text-xs font-space-grotesk text-slate-400 mb-4 px-3 tracking-wider">FEEDS</h3>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const isSaved = item.name === 'Saved Documents';
            return (
              <Link 
                href={item.href}
                key={item.name}
                suppressHydrationWarning
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 font-inter text-sm ${
                  isActive 
                    ? 'bg-amber-400/15 text-amber-400 font-medium' 
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} className={isActive ? "text-amber-400" : "text-slate-400"} />
                  {item.name}
                </div>
                {isSaved && bookmarks.length > 0 && (
                  <span className="text-[10px] font-space-grotesk font-bold bg-amber-400 text-black px-1.5 py-0.5 rounded-md">
                    {bookmarks.length}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mb-auto"></div>

      {/* Footer / Settings */}
      <div className="border-t border-white/10 pt-4">
        <button suppressHydrationWarning className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-slate-300 hover:bg-white/5 hover:text-white transition-all duration-300 font-inter text-sm">
          <Settings size={18} className="text-slate-400" />
          Settings
        </button>
      </div>

    </aside>
  );
}
