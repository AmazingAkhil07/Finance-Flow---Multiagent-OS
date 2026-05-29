"use client";

import React, { useState, useMemo } from 'react';
import { Bookmark, Folder, Search, CheckCircle2, Circle, Clock, ExternalLink, MoreVertical, Trash2 } from 'lucide-react';
import { useBookmarks } from '@/providers/BookmarkProvider';
import { TypewriterText, MotionWords } from '@/components/ui/Animations';

export default function SavedArticles() {
  const { bookmarks, isLoaded, toggleBookmark, markAsRead, moveToFolder } = useBookmarks();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFolder, setActiveFolder] = useState<string | 'All'>('All');
  
  // Dynamically derive categories from the sources of saved articles
  const dynamicFolders = useMemo(() => {
    return Array.from(new Set(bookmarks.map(b => b.folder || b.source))).filter(Boolean) as string[];
  }, [bookmarks]);

  const filteredBookmarks = useMemo(() => {
    return bookmarks.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (article.summary && article.summary.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesFolder = activeFolder === 'All' || article.folder === activeFolder;
      return matchesSearch && matchesFolder;
    });
  }, [bookmarks, searchQuery, activeFolder]);

  // Aggregate reading time
  const totalReadTimeStr = useMemo(() => {
    let totalMins = 0;
    bookmarks.filter(b => !b.isRead).forEach(b => {
      const match = String(b.readTime || '').match(/(\d+)/);
      if (match) totalMins += parseInt(match[1]);
    });
    if (totalMins > 60) return `${Math.floor(totalMins / 60)}h ${totalMins % 60}m remaining`;
    return `${totalMins}m remaining`;
  }, [bookmarks]);

  if (!isLoaded) {
    return <main className="flex-1 overflow-y-auto pr-2 flex items-center justify-center"><div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div></main>;
  }

  return (
    <main className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col relative" suppressHydrationWarning>
      <header className="mb-10 pt-4 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-3xl">
          <TypewriterText text="Personal Reading List" />
          <MotionWords text="Manage your saved intelligence, organize by custom folders, and track your reading backlog." delay={1} />
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <div className="glass-panel px-4 py-2 rounded-xl border-amber-500/20 bg-amber-500/5 flex items-center gap-3">
            <Clock size={16} className="text-amber-400" />
            <span className="font-space-grotesk font-bold text-slate-300 text-sm">
              <span className="text-amber-400">{totalReadTimeStr}</span>
            </span>
          </div>
          <div className="text-xs font-inter text-slate-500">
            {bookmarks.filter(b => b.isRead).length} articles completed
          </div>
        </div>
      </header>

      {/* Controls Bar */}
      <div className="glass-panel p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between relative z-20">
        
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto custom-scrollbar pb-2 md:pb-0">
          <button 
            suppressHydrationWarning
            onClick={() => setActiveFolder('All')}
            className={`px-4 py-2 rounded-xl text-sm font-space-grotesk whitespace-nowrap transition-colors border flex items-center gap-2 ${
              activeFolder === 'All' ? 'bg-amber-500 text-black border-amber-400 font-bold' : 'bg-slate-800 text-slate-400 border-white/10 hover:bg-slate-700'
            }`}
          >
            All Saved
          </button>
          {dynamicFolders.map(folder => (
            <button 
              suppressHydrationWarning
              key={folder}
              onClick={() => setActiveFolder(folder)}
              className={`px-4 py-2 rounded-xl text-sm font-space-grotesk whitespace-nowrap transition-colors border flex items-center gap-2 ${
                activeFolder === folder ? 'bg-amber-500 text-black border-amber-400 font-bold' : 'bg-slate-800 text-slate-400 border-white/10 hover:bg-slate-700'
              }`}
            >
              <Folder size={14} />
              {folder}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64 shrink-0">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            suppressHydrationWarning
            type="text" 
            placeholder="Search saved articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/50 transition-colors"
          />
        </div>
      </div>

      {/* Bookmarks Grid */}
      {bookmarks.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20 text-slate-500">
          <Bookmark size={48} className="mb-4 opacity-20" />
          <h3 className="text-xl font-outfit font-bold text-slate-400 mb-2">Your reading list is empty</h3>
          <p className="font-inter text-sm max-w-md text-center">Click the bookmark icon on any article in the Daily Feed, Deep Dive, or Monthly Research tabs to save it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 pb-12">
          {filteredBookmarks.map(article => (
            <div 
              key={article.id} 
              className={`glass-panel p-5 rounded-2xl border transition-all flex flex-col sm:flex-row gap-5 ${
                article.isRead ? 'border-white/5 opacity-60' : 'border-white/10 hover:border-amber-500/30'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-space-grotesk tracking-wider uppercase border bg-white/5 text-slate-400 border-white/10">
                    {article.source}
                  </span>
                  <span className="text-xs font-inter text-slate-500">{new Date(article.publishedAt).toLocaleDateString()}</span>
                  
                  <span className="flex items-center gap-1 text-[10px] font-space-grotesk text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20 ml-auto">
                    <Folder size={10} /> {article.folder}
                  </span>
                </div>
                
                <h3 className={`font-outfit text-xl font-bold mb-2 transition-colors ${article.isRead ? 'text-slate-400' : 'text-slate-100 hover:text-amber-400'}`}>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
                </h3>
                
                <p className="text-sm font-inter text-slate-400 line-clamp-2 max-w-4xl">
                  {article.summary}
                </p>
              </div>

              <div className="flex sm:flex-col items-center justify-between sm:items-end sm:border-l sm:border-white/10 sm:pl-5 shrink-0 gap-3">
                <div className="flex items-center gap-2 text-xs font-space-grotesk text-slate-400 mb-auto">
                  <Clock size={14} className="text-amber-400/70" />
                  {article.readTime || '10 min read'}
                </div>
                
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => markAsRead(article.id, !article.isRead)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-space-grotesk font-bold transition-colors ${
                      article.isRead ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-white/5'
                    }`}
                  >
                    {article.isRead ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                    {article.isRead ? 'READ' : 'MARK READ'}
                  </button>

                  <button 
                    onClick={() => toggleBookmark(article)}
                    title="Remove Bookmark"
                    className="p-2 rounded-lg bg-slate-800 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredBookmarks.length === 0 && bookmarks.length > 0 && (
            <div className="text-center py-10 text-slate-500 font-inter">
              No saved articles match your search or folder criteria.
            </div>
          )}
        </div>
      )}
    </main>
  );
}
