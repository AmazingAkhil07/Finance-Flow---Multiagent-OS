"use client";

import { ExternalLink, Bookmark, Share2 } from 'lucide-react';
import { useBookmarks } from '@/providers/BookmarkProvider';
import { formatDistanceToNow } from 'date-fns';

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    source: string;
    sourceURL: string;
    summary: string | null;
    tags: string[];
    readTime: number | null;
    publishedAt: string | Date;
    url?: string;
  };
  onClick?: (article: any) => void;
}

export function ArticleCard({ article, onClick }: ArticleCardProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(article.id as any);
  const publishedDate = new Date(article.publishedAt);
  const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true });

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({
        title: article.title,
        url: article.sourceURL || article.url
      }).catch(console.error);
    }
  };

  return (
    <div 
      onClick={() => onClick && onClick(article)}
      className="glass-panel group flex flex-col p-5 text-left transition-all duration-300 transform hover:-translate-y-1.5 hover:rotate-x-2 hover:rotate-y-1 hover:shadow-[0_15px_40px_-10px_rgba(251,191,36,0.3)] hover:border-amber-400/30 will-change-transform cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="flex items-center justify-between mb-3 transform-gpu translate-z-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.6)]"></div>
          <span className="font-space-grotesk text-xs uppercase tracking-wider text-slate-300 font-medium">
            {article.source}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-space-grotesk text-xs text-slate-400">
            {timeAgo}
          </span>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleBookmark({
                ...article,
                url: article.sourceURL || article.url // Map for the provider
              });
            }}
            className={`transition-colors ${bookmarked ? 'text-amber-400' : 'text-slate-500 hover:text-amber-400'}`}
          >
            <Bookmark size={16} fill={bookmarked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
      
      <h3 className="font-inter font-semibold text-white text-lg leading-snug mb-3 group-hover:text-amber-400 transition-colors line-clamp-2 transform-gpu translate-z-8 drop-shadow-md">
        {article.title}
      </h3>
      
      {article.summary && (
        <p className="font-inter text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed transform-gpu translate-z-2">
          {article.summary}
        </p>
      )}

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5 transform-gpu translate-z-4">
        <div className="flex items-center gap-2 flex-wrap">
          {article.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="px-2 py-1 rounded bg-white/5 text-[10px] uppercase font-space-grotesk text-teal-300 border border-white/10 shadow-sm">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-4 text-slate-500">
          <span className="text-xs font-space-grotesk group-hover:text-amber-400/80 transition-colors">{article.readTime}m read</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleShare(e);
            }}
            className="hover:text-teal-400 transition-colors"
            title="Share Article"
          >
            <Share2 size={14} />
          </button>
          <a 
            href={article.sourceURL || article.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={(e) => e.stopPropagation()}
            className="group-hover:text-amber-400 transition-colors"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
