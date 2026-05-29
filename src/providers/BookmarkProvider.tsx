"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface SavedArticle {
  id: number;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string;
  readTime?: string;
  author?: string;
  tags?: string[];
  pages?: number;
  isRead?: boolean;
  folder?: string;
}

interface BookmarkContextType {
  bookmarks: SavedArticle[];
  isLoaded: boolean;
  toggleBookmark: (article: any) => void;
  isBookmarked: (id: number) => boolean;
  markAsRead: (id: number, read: boolean) => void;
  moveToFolder: (id: number, folder: string) => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<SavedArticle[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('financeflow_bookmarks');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Migrate legacy 'Uncategorized' to source
        const migrated = parsed.map((b: SavedArticle) => 
          b.folder === 'Uncategorized' ? { ...b, folder: b.source || 'Unknown' } : b
        );
        setBookmarks(migrated);
      }
    } catch (e) {
      console.error("Failed to load bookmarks", e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('financeflow_bookmarks', JSON.stringify(bookmarks));
    }
  }, [bookmarks, isLoaded]);

  const toggleBookmark = (article: any) => {
    setBookmarks(prev => {
      const exists = prev.some(a => a.id === article.id);
      if (exists) {
        return prev.filter(a => a.id !== article.id);
      } else {
        const newArticle: SavedArticle = {
          id: article.id,
          title: article.title,
          summary: article.summary,
          source: article.source,
          url: article.url,
          publishedAt: article.publishedAt,
          readTime: article.readTime,
          author: article.author,
          tags: article.tags,
          pages: article.pages,
          isRead: false,
          folder: article.source || 'General'
        };
        return [newArticle, ...prev];
      }
    });
  };

  const isBookmarked = (id: number) => {
    return bookmarks.some(a => a.id === id);
  };

  const markAsRead = (id: number, read: boolean) => {
    setBookmarks(prev => prev.map(a => a.id === id ? { ...a, isRead: read } : a));
  };

  const moveToFolder = (id: number, folder: string) => {
    setBookmarks(prev => prev.map(a => a.id === id ? { ...a, folder } : a));
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, isLoaded, toggleBookmark, isBookmarked, markAsRead, moveToFolder }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
}
