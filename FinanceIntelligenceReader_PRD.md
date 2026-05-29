# PRODUCT REQUIREMENTS DOCUMENT
## FinanceFlow - Multi-Source Finance Intelligence Reader

**Version:** 1.2  
**Date:** May 2026  
**Status:** In Active Development  
**Target Users:** Beginner traders, Stock learners, Investors, Finance enthusiasts  
**UI Design Tool:** Stitch MCP  
**Architecture:** Pseudo Multi-Agent (MVP) → PostgreSQL + Real-Time APIs (v1.2)

### 🚀 Recent Updates (v1.2)
- **Database Migration:** Fully migrated from local SQLite to **Neon PostgreSQL** for Vercel serverless compatibility.
- **100% Real Data & Monthly Research Fix:** Completely removed mock fallback generation. Integrated robust Google News RSS aggregators to bypass strict bot protections, which successfully fixed the silent database collision bug that was causing the Monthly Research page to appear empty.
- **Real-Time Market Ticker:** Replaced static ticker with a live Yahoo Finance API proxy polling real-time asset data (NIFTY, SENSEX, AAPL, BTC, etc.) with a seamless, infinite CSS scroll architecture.

---

## 📋 EXECUTIVE SUMMARY

**FinanceFlow** is a curated, multi-source finance intelligence reader designed for Indian traders and investors to stay updated with market news, deep-dive analysis, and financial education—all in one place. It aggregates the latest news from premium sources like Bloomberg, Reuters, Moneycontrol, ET Markets, and educational platforms like Zerodha Varsity, eliminating information fragmentation and enabling faster decision-making.

**Core Value Proposition:**
- 📰 **Real-time market news** from multiple trusted sources
- 📚 **Structured learning** from educational platforms
- 📊 **Curated content** (not algorithm-driven, human-curated feeds)
- ⏰ **Daily intelligence brief** for quick morning market updates
- 🔖 **Save & learn later** functionality
- 🎯 **Zero setup** - works out of the box

---

## 🎯 PROBLEM STATEMENT

**User Pain Points:**
1. **Information Overload** - Traders spend 2-3 hours daily jumping between 10+ websites (ET Markets, Moneycontrol, Bloomberg, Reuters, Reddit, etc.)
2. **Context Switching** - No single platform for *both* news AND educational content
3. **Delayed Updates** - Manual refresh required across multiple tabs
4. **No Learning Path** - Can't distinguish between breaking news vs. foundational knowledge
5. **Information Silos** - Missing global news context when trading Indian stocks
6. **Time Wastage** - 30-40% of trading time spent on information gathering, not analysis

**Why Existing Solutions Fail:**
- News aggregators (Google News) lack financial depth
- Financial platforms (Bloomberg, Reuters) require expensive subscriptions
- Indian platforms (Moneycontrol, ET) don't consolidate global perspective
- Social media (Twitter/Reddit) spreads misinformation
- No platform connects beginner learning with real-time trading intelligence

---

## 💡 SOLUTION OVERVIEW

**FinanceFlow** is a **multi-category intelligence reader** that segments financial content into distinct consumption categories:

1. **🔴 Daily Feed** - Fast-moving breaking news (5-30 min read)
2. **🟠 Deep Dive** - Long-form analysis & market commentary (30-60 min read)
3. **🟡 Monthly Research** - In-depth research reports & trends (60+ min read)
4. **🟢 Learning Hub** - Foundational concepts & educational content (variable)
5. **⭐ Saved Articles** - Personal reading list & bookmarks

Each feed pulls from best-in-class sources, normalized into a single, beautiful interface.

---

## 👥 USER PERSONAS

### Persona 1: **Arjun - The Beginner Trader** (Age 25-35)
- **Goal:** Learn stock trading & stay updated with news
- **Pain:** Overwhelmed by information sources, doesn't know what's important
- **Usage:** 30 mins morning brief, 1-2 hours after market close
- **Behavior:** Reads headlines first, then deep dives on interest
- **Key Need:** Trustworthy, educational content + breaking news

### Persona 2: **Priya - The Busy Investor** (Age 35-50)
- **Goal:** Make informed decisions without daily micro-analysis
- **Pain:** No time for deep research, relies on biased financial Twitter
- **Usage:** 10-15 min morning briefing, weekly deep reads
- **Behavior:** Scans headlines, saves articles for weekend reading
- **Key Need:** Curated, time-efficient intelligence

### Persona 3: **Rajesh - The Active Trader** (Age 30-45)
- **Goal:** Real-time market intelligence for intraday/swing trading
- **Pain:** Misses breaking news because they're in trades, scattered sources
- **Usage:** 1-2 hours throughout market hours
- **Behavior:** Reads fast headlines, follows specific sectors (Tech, Banks, Energy)
- **Key Need:** Real-time updates, sector filters, trending topics

---

## 🎯 CORE FEATURES

### **1️⃣ DAILY FEED (Category: Real-time Breaking News)**

**Purpose:** Fast-moving latest news from markets

**News Sources:**
- Moneycontrol (Indian stocks, crypto)
- Economic Times Markets (Market news, indices)
- ET Markets (ET-specific market coverage)
- TradingView (Market charts & news)
- Bloomberg (Global markets)
- Reuters Markets (Global markets & analysis)
- CoinDesk (Crypto-specific)

**Features:**
- ✅ Chronological feed (newest first)
- ✅ Source filter (checkbox to show/hide sources)
- ✅ Search by keyword (Nifty, RBI, Banking, etc.)
- ✅ Tag system (Trending: RBI, Nifty, Banking, Crypto, IPO)
- ✅ Time indicator (5 min ago, 2 hours ago)
- ✅ One-click open original article (new tab)
- ✅ Bookmark/save articles
- ✅ Quick share to Twitter/WhatsApp

**UI Pattern:**
```
[Source Filter] [Search Bar]
[🔔 Trending: RBI | Nifty | Banking | Crypto]

📰 "RBI Cuts Repo Rate by 25bps to 6.25%"
   Moneycontrol • 2 hours ago
   📌 Read time: 3 min | Tags: RBI, Interest Rates, Banks

📰 "Nifty Hits Record High Amid Global Rally"
   Economic Times • 4 hours ago
   📌 Read time: 5 min | Tags: Nifty, Markets, Tech
```

**Interaction:**
- Click headline → Open original article in new tab
- Click tag → Filter by topic
- Click bookmark → Save to "Saved Articles"
- Use source filter → Hide/show specific sources

---

### **2️⃣ DEEP DIVE (Category: Long-form Analysis & Commentary)**

**Purpose:** Detailed market analysis, learning, and commentary

**Content Sources:**
- Zerodha Varsity (Best for beginner stock education)
- Value Research Online (Stock analysis & fund reviews)
- Seeking Alpha (Equity research & insights)
- The Block (Crypto deep dives)
- MarketWatch (Market psychology & analysis)

**Features:**
- ✅ Article card with headline, summary, source
- ✅ Estimated read time (15-60 min)
- ✅ Author name (build credibility)
- ✅ Topic tags (Technical Analysis, Fundamental, Market Psychology, etc.)
- ✅ Save for later (reading list)
- ✅ "Related Articles" (content discovery)
- ✅ View count (social proof)

**UI Pattern:**
```
📖 DEEP DIVE - Market Analysis & Learning

[Card Layout - Grid View]

📄 "Understanding P/E Ratios: The Complete Guide"
   📍 Zerodha Varsity • 6 days ago
   ⏱️ 25 min read
   👤 By: Nithin Kamath
   🏷️ Tags: Fundamental Analysis, Valuation
   ❤️ 342 saves | 👁️ 2.3K views
   
📄 "Tech Sector Analysis: FY2026 Outlook"
   📍 Seeking Alpha • 3 days ago
   ⏱️ 45 min read
   👤 By: Rajeev Ravi
   🏷️ Tags: Technical Analysis, Tech Stocks
   ❤️ 189 saves | 👁️ 1.1K views
```

**Interaction:**
- Click card → Open in modal/new page
- Click tag → Filter by topic
- Click save → Add to reading list
- Hover → Show "Read Now" CTA button

---

### **3️⃣ MONTHLY RESEARCH (Category: Long-form Reports & Trends)**

**Purpose:** In-depth research, monthly trends, and comprehensive analysis

**Content Sources:**
- Morningstar India (Fund & stock research)
- Value Research Online (Research reports)
- Seeking Alpha (Quarterly analysis)
- Ethereum.org (Crypto fundamentals)
- Bitcoin Magazine (Crypto research)

**Features:**
- ✅ Monthly organized articles
- ✅ Report download (PDF availability if applicable)
- ✅ Publication date & author credentials
- ✅ Series tracking (e.g., "Monthly RBI Policy Review")
- ✅ Archive by month/year
- ✅ Advanced filtering (by sector, asset class)

**UI Pattern:**
```
📊 MONTHLY RESEARCH - In-Depth Reports

May 2026 Reports
├─ 📑 "FY2026 Tech Sector Outlook" (Morningstar)
├─ 📑 "Banking Consolidation Trends" (Value Research)
├─ 📑 "Crypto Regulation 2026" (Bitcoin Magazine)

April 2026 Reports
├─ 📑 "Q4 FY2026 Earnings Review"
```

**Interaction:**
- Click report → Full view in modal
- Click archive → Browse by month
- Download → Save PDF (if available)

---

### **4️⃣ LEARNING HUB (Category: Knowledge Base & Concepts)**

**Purpose:** Reference material, foundational concepts, and financial literacy

**Content Sources:**
- Zerodha Varsity (Best in market for beginner education)
- Investopedia (Financial concepts)
- Company filings (NSE, BSE)
- Annual reports (investor relations)

**Features:**
- ✅ Topic-based organization (Stocks, Options, Bonds, Crypto, etc.)
- ✅ Difficulty levels (Beginner, Intermediate, Advanced)
- ✅ Progress tracking (marked as "read")
- ✅ Structured learning paths (e.g., "Stock Trading 101")
- ✅ Quick links to:
  - NSE filings (company info)
  - BSE filings
  - Annual reports
  - Investor relations pages

**UI Pattern:**
```
🎓 LEARNING HUB

Stocks Fundamentals
├─ Beginner: What is a Stock?
├─ Beginner: How to Read P/E Ratios?
├─ Intermediate: DCF Valuation
├─ Advanced: Technical Analysis Patterns

Quick Links
├─ 📄 NSE Filings
├─ 📄 BSE Filings
├─ 📄 Annual Reports (BSE)
├─ 🔗 Investor Relations Pages
```

**Interaction:**
- Click topic → Open learning path
- Mark as read → Progress update
- Quick links → Open in new tab

---

### **5️⃣ SAVED ARTICLES (Personal Reading List)**

**Purpose:** Bookmarks and reading list management

**Features:**
- ✅ Save articles from any section
- ✅ Organize into custom folders (e.g., "Banking Stocks", "Crypto Research")
- ✅ Mark as "read" or "unread"
- ✅ Estimated reading time remaining
- ✅ Search within saved articles
- ✅ Export as PDF (future feature)

**UI Pattern:**
```
⭐ SAVED ARTICLES (245 articles)

My Folders
├─ 📁 Banking Stocks (45 articles)
├─ 📁 Tech Analysis (32 articles)
├─ 📁 Crypto Research (18 articles)
├─ 📁 To Read Later (12 articles)

Search saved articles...
```

---

### **6️⃣ MORNING BRIEFING (Smart Daily Summary)**

**Purpose:** 5-minute morning intelligence before market open

**What's Included:**
- 🇮🇳 Top 3 Indian market headlines
- 🌍 Top global market news (if applicable to Indian markets)
- 💰 Crypto market overnight update
- 📅 Important events/earnings/RBI decisions today
- 📊 Market snapshot (Nifty, Sensex, currency, oil)

**Delivery:**
- Appears as a pinned card at top of Daily Feed on app open
- Can be dismissed or marked as read
- Regenerates daily at 7:00 AM IST

**UI Pattern:**
```
📍 MORNING BRIEF - May 29, 2026

🇮🇳 TOP HEADLINES TODAY
1. "RBI MPC Meet Outcomes" - Economic Times
2. "Nifty Opens Strong on FII Inflows" - Moneycontrol
3. "Tech Sector Earnings Beat Estimates" - Seeking Alpha

🌍 GLOBAL MARKET SUMMARY
• US Markets +0.8% | Dow Jones +152pts
• Asian Indices mixed | Nikkei +1.2%
• Oil prices stable at $85/barrel

📅 TODAY'S EVENTS
10:00 AM - RBI Policy Announcement
2:00 PM - TCS Earnings Call
3:30 PM - Market Close
```

---

## 🏗️ TECHNICAL ARCHITECTURE

### **Multi-Agent Architecture**

FinanceFlow uses a **phased multi-agent approach** — starting with pseudo-agents (coordinated modules) in MVP and evolving to real AI-powered agents in later versions.

#### Agent Overview

| Agent | Role | MVP Approach | v1.1+ Upgrade |
|-------|------|--------------|----------------|
| 🕷️ **Fetcher Agent** | Pulls RSS feeds every 15-30 min | `rss-parser` + `node-cron` | Same (no change needed) |
| 📝 **Summariser Agent** | Condenses articles to 2-3 line summaries | Uses RSS `<description>` field | Gemini API / OpenAI |
| 🏷️ **Classifier Agent** | Tags articles & assigns categories | Keyword matching against tag list | LLM-based contextual tagging |
| 📅 **Scheduler Agent** | Orchestrates all agents on cron | `node-cron` schedule | Same (upgraded to queue system) |
| 🧹 **Dedup Agent** | Detects & removes duplicate articles | URL + title hash comparison | Semantic similarity matching |
| 🌅 **Morning Brief Agent** | Compiles daily 7AM market briefing | Picks top 3 by recency + source priority | AI-curated with market context |

#### MVP Agent Flow (v1.0 — Pseudo Multi-Agent)

```
node-cron (every 30 min)
        │
        ▼
┌──────────────────┐
│  Fetcher Agent   │  → Hits RSS URLs, returns raw articles
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Dedup Agent     │  → Removes articles already in DB (URL/hash check)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Classifier Agent │  → Keyword-based tagging + category assignment
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Summariser Agent │  → Trims RSS description to clean 2-line summary
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   Database       │  → Saves normalized articles
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Next.js UI      │  → Displays live feed to user
└──────────────────┘

[Separately — Daily at 7:00 AM IST]
Scheduler Agent → Morning Brief Agent → Pinned card on UI
```

#### v1.1 Agent Upgrade (Real AI Agents)
```
Summariser Agent  → Gemini API (free tier)
Classifier Agent  → Gemini API (contextual tagging)
Morning Brief     → AI-written market summary
```

#### v2.0 Agent Upgrade (True Orchestration)
```
Orchestrator → CrewAI / LangGraph / Google ADK
Agents communicate, spawn sub-tasks, handle failures autonomously
```

---

### **Data Flow Architecture**

```
┌─────────────────────────────────────────────────────────────────┐
│                      DATA SOURCES                               │
│  Bloomberg | Reuters | ET | Moneycontrol | Zerodha | etc.     │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│              🕷️ FETCHER AGENT (RSS/API PARSERS)                 │
│  (rss-parser, axios — runs every 15-30 min via node-cron)      │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                🧹 DEDUP AGENT                                   │
│  URL hash check → skip if already in DB                        │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│         🏷️ CLASSIFIER AGENT + 📝 SUMMARISER AGENT              │
│  Keyword tagging | Category assignment | Summary trimming       │
│  Normalized JSON Schema:                                        │
│  {                                                              │
│    id: UUID,                                                    │
│    title: string,                                              │
│    source: enum,                                               │
│    sourceURL: string,                                          │
│    summary: string,                                            │
│    author: string,                                             │
│    imageURL: string,                                           │
│    publishedAt: ISO8601,                                       │
│    category: "daily" | "deep-dive" | "monthly" | "learning",  │
│    tags: string[],                                             │
│    readTime: number,                                           │
│    fetchedAt: ISO8601                                          │
│  }                                                              │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE STORAGE                             │
│  Articles | Categories | User Bookmarks | Settings              │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                   FRONTEND (Next.js)                            │
│  Designed with Stitch MCP                                      │
│  Fetch, display, filter, search, bookmark, share               │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    USER BROWSER                                 │
│  Desktop | Tablet | Mobile Responsive                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ TECH STACK (MVP v1.0)

### **Frontend**
```
Framework:        Next.js 14+ (React 18, TypeScript)
Styling:          Tailwind CSS
UI Components:    shadcn/ui (pre-built, accessible components)
UI Design:        Stitch MCP (screen generation & design system)
State Management: React Context API + React Query (for API calls)
Icons:            Lucide React
Dark Mode:        next-themes
```

### **Backend/Data Processing**
```
Language:         Node.js + TypeScript
Feed Parsing:     rss-parser (RSS feeds)
HTTP Client:      axios / node-fetch
Task Scheduling:  node-cron (for periodic RSS fetches)
Database:         PostgreSQL (articles, user bookmarks)
ORM:              Prisma (database access)
Validation:       Zod (schema validation)
```

### **APIs & Services**
```
RSS Feeds:        Moneycontrol, ET Markets, Reuters, CoinDesk (NO KEY REQUIRED)
Fallback:         NewsAPI.org (free tier key - optional)
Authentication:   NextAuth.js (future: login, bookmarks sync)
```

### **API Key Requirements**
```
✅ NO KEY NEEDED (MVP):     All RSS feeds are free & keyless
⚠️  OPTIONAL (fallback):    NewsAPI.org (free tier)
⚠️  OPTIONAL (fallback):    RapidAPI alternatives (free tier)
🔑  REQUIRED (DB):          Supabase / Vercel Postgres connection string
❌  NOT NEEDED:             Bloomberg paid API (using limited RSS instead)
```

### **Deployment**
```
Hosting:          Vercel (Next.js native)
Database:         Vercel PostgreSQL or Supabase
Environment:      Staging (develop branch) → Production (main)
CI/CD:            GitHub Actions
Monitoring:       Vercel Analytics
```

### **Development Tools**
```
Version Control:  Git + GitHub
Package Manager:  npm/yarn/pnpm
Code Quality:     ESLint, Prettier
Testing:          Jest + React Testing Library (future)
```

---

## 🎨 UI/UX DESIGN SPECIFICATIONS

### **Design Philosophy**
- **Aesthetic:** Modern, Clean, Finance-forward (Bloomberg-inspired but minimalist)
- **Tone:** Professional, trustworthy, and frictionless
- **Accessibility:** WCAG 2.1 AA compliant
- **Responsiveness:** Mobile-first, works on all devices

### **Layout Structure**

```
┌────────────────────────────────────────────────┐
│              HEADER / NAV BAR                  │
│  Logo | Search | Dark Mode | Settings          │
├───────┬────────────────────────────────────────┤
│       │                                        │
│   S   │        MAIN CONTENT AREA               │
│   I   │                                        │
│   D   │  • Category-based tabs/sections       │
│   E   │  • Article feed (cards)               │
│   B   │  • Infinite scroll / pagination       │
│   A   │                                        │
│   R   │                                        │
│       │                                        │
│  Navi │                                        │
│  gation                                        │
│       │                                        │
└───────┴────────────────────────────────────────┘
```

### **Sidebar Navigation**
```
📰 FEEDS
├─ 🔴 Daily (Breaking News)
├─ 🟠 Deep Dive (Analysis)
├─ 🟡 Monthly (Research)
├─ 🟢 Learning (Knowledge)

⭐ PERSONAL
├─ ⭐ Saved (245)
├─ 📖 Reading List (12)

⚙️ SETTINGS
├─ Preferences
├─ Dark Mode
├─ About & Help
```

### **Color Palette**

| Element | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Background | #FFFFFF | #0A0A0A |
| Surface | #F8F9FA | #1A1A1A |
| Text Primary | #1A1A1A | #FFFFFF |
| Text Secondary | #666666 | #AAAAAA |
| Accent Primary | #0066CC | #3B82F6 |
| Accent Success | #10B981 | #34D399 |
| Accent Warning | #F59E0B | #FCD34D |
| Accent Danger | #EF4444 | #F87171 |

### **Typography**

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Headlines (H1) | Inter | 32px | 700 |
| Headlines (H2) | Inter | 24px | 600 |
| Headlines (H3) | Inter | 18px | 600 |
| Body Text | Inter | 14px | 400 |
| Caption | Inter | 12px | 400 |
| Monospace (quotes) | JetBrains Mono | 13px | 400 |

### **Component Specifications**

**Article Card (Daily Feed)**
```
┌─────────────────────────────────────┐
│ 📰 Headline (Line clamp: 2)         │
│ Source Badge | Time ago             │
│ Quick Summary (optional)             │
│ Tags: RBI, Nifty, Banking           │
│ [Bookmark] [Share] [Open]           │
└─────────────────────────────────────┘
```

**Filter Bar**
```
┌──────────────────────────────────────┐
│ [Moneycontrol ✓] [ET ✓] [Reuters □] │
│ [Bloomberg ✓] [TradingView □]        │
└──────────────────────────────────────┘
```

**Search Bar**
```
┌─────────────────────────────────────┐
│ 🔍 Search (Nifty, RBI, Banks...)   │
└─────────────────────────────────────┘
```

---

## 📊 DATA SOURCES & INTEGRATION

### **Source List with RSS/API Strategy**

| Source | Category | Type | Method | Update Freq |
|--------|----------|------|--------|-------------|
| Moneycontrol | Daily | News | RSS/API | Every 30min |
| ET Markets | Daily | News | RSS | Every 15min |
| Economic Times | Daily | News | RSS | Every 20min |
| TradingView | Daily | Charts/News | Custom API | Every 1hour |
| Bloomberg | Daily | Global News | RSS (Limited) | Every 4hours |
| Reuters Markets | Daily | Global Markets | RSS/API | Every 1hour |
| CoinDesk | Daily | Crypto | RSS | Every 30min |
| Zerodha Varsity | Deep Dive | Education | RSS/Web Scrape | Weekly |
| Value Research | Deep Dive | Research | RSS/Web Scrape | Weekly |
| Seeking Alpha | Deep Dive | Analysis | RSS | Every 2hours |
| The Block | Deep Dive | Crypto Analysis | RSS | Daily |
| MarketWatch | Deep Dive | Commentary | RSS | Every 2hours |
| Morningstar India | Monthly | Reports | Web Scrape | Monthly |
| Ethereum.org | Learning | Crypto Ed | Web Content | As updated |
| Investopedia | Learning | Education | RSS | Weekly |

**Note:** RSS is preferred to avoid scraping issues. If RSS unavailable, use official APIs or ethical web scraping with `User-Agent` headers.

---

## 🗄️ DATA RETENTION & DISPLAY POLICY

### **Key Principle: Articles Are Never Lost**

> RSS feeds are only the *fetch mechanism* — they expire after a few hours. But **every article fetched is saved permanently to PostgreSQL**. The UI reads from the DB, not from RSS directly. So an article from 4 hours ago, 4 days ago, or 4 weeks ago is always accessible.

```
RSS Feed (expires in hours)
        ↓  Fetcher Agent pulls it every 15-30 min
        ↓
PostgreSQL DB ✅ (saved permanently)
        ↓
UI reads from DB → Article always visible
```

### **Article Display Limits (Per Section)**

| Feed Section | Articles Shown | Per Page | Estimated Daily Volume | Retention in DB |
|---|---|---|---|---|
| 🔴 **Daily Feed** | Latest 100 (paginated) | 20 per page | ~70 new articles/day | **30 days** |
| 🟠 **Deep Dive** | Latest 50 | 10 per page | ~15 new articles/day | **90 days** |
| 🟡 **Monthly Research** | All (archived by month) | 10 per page | ~5 per month | **Permanent** |
| 🟢 **Learning Hub** | All | 12 per page | Static (rarely changes) | **Permanent** |
| ⭐ **Saved Articles** | All bookmarks | 20 per page | User-driven | **Permanent** |

### **Daily Volume Estimate (Daily Feed)**
```
7 sources × avg 2-3 articles per fetch × fetched every 30 min
= ~70-100 new articles per day stored in DB

Displaying latest 100 = roughly last 12-16 hours of news
Infinite scroll → loads older articles on demand
```

### **Retention Policy Rules**
```
Daily Feed articles   → Keep for 30 days → then archive/delete
Deep Dive articles    → Keep for 90 days → then archive/delete
Monthly Research      → Keep permanently (reference material)
Learning Hub          → Keep permanently (educational content)
Bookmarked articles   → NEVER delete regardless of age ✅
```

### **What Happens to Older Articles?**
- Articles older than retention window are **soft-deleted** (marked `archived: true`)
- They disappear from the main feed but remain searchable
- Bookmarked articles are **always exempted** from deletion
- Users can browse older articles via the **Archive** view (v1.1 feature)

### **Infinite Scroll Strategy**
```
Initial load   → 20 most recent articles
Scroll down    → Load next 20 (cursor-based pagination)
No cutoff      → User can scroll back through all 30 days
Search         → Searches across full 30-day window
```

---

## 📱 MVP SCOPE (v1.0)

### **In Scope for MVP**
- ✅ Daily Feed (headline + source + time + tags)
- ✅ Source filtering (show/hide sources)
- ✅ Basic search (by keyword)
- ✅ Mobile-responsive design
- ✅ Dark/Light mode toggle
- ✅ Bookmark functionality (local storage for MVP)
- ✅ Open article links (new tab)
- ✅ Trending tags display
- ✅ Basic UI (sidebar + main feed)
- ✅ Deployed on Vercel

### **Out of Scope for MVP**
- ❌ User authentication/login
- ❌ Cloud sync of bookmarks
- ❌ Advanced NLP-based tagging (keyword-based OK)
- ❌ Push notifications
- ❌ Mobile app (web-only for MVP)
- ❌ AI-powered summarization
- ❌ Deep Dive, Monthly, Learning sections (Added in v1.1)
- ❌ Comment/discussion system
- ❌ Recommendation engine

### **MVP Deliverables**
1. **Frontend:** Fully functional Next.js app with sidebar nav
2. **Backend:** RSS parser + database setup
3. **Data:** 7 core news sources integrated & displaying
4. **UI:** Figma design system exported
5. **Deployment:** Live on Vercel (financeflow.vercel.app or custom domain)
6. **Documentation:** Setup guide + API documentation

---

## ⏱️ DEVELOPMENT TIMELINE (MVP: 15 Days)

### **Phase 1: Setup & Foundation (Days 1-2)**
**Day 1:**
- [ ] Next.js 14 project initialization
- [ ] Tailwind CSS setup
- [ ] shadcn/ui component library installed
- [ ] GitHub repo created & initial commit
- [ ] Figma design file created

**Day 2:**
- [ ] Database schema designed (PostgreSQL)
- [ ] Prisma ORM setup
- [ ] Authentication setup (NextAuth - basic)
- [ ] Environment variables configured
- [ ] Project structure finalized

### **Phase 2: Frontend Structure (Days 3-5)**
**Day 3:**
- [ ] Layout component (header, sidebar, main)
- [ ] Navigation menu styled
- [ ] Dark mode implementation
- [ ] Responsive design tested

**Day 4:**
- [ ] Article card component
- [ ] Feed grid layout
- [ ] Search bar component
- [ ] Filter dropdown component

**Day 5:**
- [ ] Bookmark functionality (UI)
- [ ] Tag/category buttons
- [ ] Time ago formatter
- [ ] Share buttons (Twitter, WhatsApp, Copy link)

### **Phase 3: Backend & Data Integration (Days 6-10)**
**Day 6:**
- [ ] rss-parser library integration
- [ ] RSS feed URLs configured
- [ ] Feed fetching API endpoint (`/api/feed`)
- [ ] Database schema for articles

**Day 7:**
- [ ] Article normalization function
- [ ] Auto-tagging system (keyword-based)
- [ ] Cron job for periodic fetching (every 30min)
- [ ] Database queries optimized

**Day 8:**
- [ ] Search API endpoint (`/api/search`)
- [ ] Filter API endpoint (`/api/filter`)
- [ ] API response pagination
- [ ] Error handling & logging

**Day 9:**
- [ ] Bookmark save/delete endpoints
- [ ] React Query integration (data fetching)
- [ ] Infinite scroll implementation
- [ ] API rate limiting setup

**Day 10:**
- [ ] Manual testing of all APIs
- [ ] Database indexing for performance
- [ ] Edge cases handled
- [ ] Loading states & error messages

### **Phase 4: Polish & Deployment (Days 11-15)**
**Day 11:**
- [ ] Visual QA & design refinements
- [ ] Mobile responsiveness testing
- [ ] Dark mode bug fixes
- [ ] Accessibility audit (a11y)

**Day 12:**
- [ ] Performance optimization
- [ ] Image lazy loading
- [ ] CSS minification
- [ ] Lighthouse score > 90

**Day 13:**
- [ ] Vercel deployment setup
- [ ] Environment variables configured
- [ ] Custom domain connected
- [ ] GitHub Actions CI/CD pipeline

**Day 14:**
- [ ] UAT testing
- [ ] Bug fixes from testing
- [ ] Documentation written
- [ ] README.md updated

**Day 15:**
- [ ] Final deployment
- [ ] Smoke testing on live
- [ ] Monitoring setup
- [ ] Product announcement ready

---

## 📈 SUCCESS METRICS

### **Phase 1 (Launch) - 1 Month**
- [ ] 50+ articles aggregated daily
- [ ] 95%+ uptime
- [ ] Page load time < 2 seconds
- [ ] 100+ users on waitlist/signup

### **Phase 2 (Growth) - 3 Months**
- [ ] 10,000 monthly active users
- [ ] 2+ min average session duration
- [ ] 40% users with saved articles
- [ ] 30% week-over-week growth

### **Phase 3 (Scale) - 6 Months**
- [ ] 50,000 monthly active users
- [ ] Deep Dive & Learning sections live
- [ ] User authentication + cloud bookmarks
- [ ] Mobile app launched

---

## 🚀 ROADMAP (Future Versions)

### **v1.1 (Month 2)**
- [ ] Deep Dive section fully functional
- [ ] Learning Hub with structured paths
- [ ] Monthly Research section
- [ ] User authentication (email/Google)
- [ ] Cloud bookmark sync
- [ ] Email newsletter (Daily Brief)
- [ ] **Agent Upgrade:** Summariser + Classifier agents powered by Gemini API (free tier)
- [ ] **Agent Upgrade:** AI-written Morning Brief with market context

### **v1.2 (Month 3)**
- [ ] Mobile app (React Native)
- [ ] Push notifications for breaking news
- [ ] Portfolio tracking integration
- [ ] Stock price widgets
- [ ] Watchlist feature
- [ ] **Agent Upgrade:** Queue-based agent scheduling (Bull/Redis)

### **v2.0 (Month 6)**
- [ ] AI-powered summarization (production-grade)
- [ ] Recommendation engine
- [ ] Community comments & discussions
- [ ] Expert analyst profiles
- [ ] Advanced charting integration
- [ ] **Agent Upgrade:** True multi-agent orchestration via CrewAI / LangGraph / Google ADK
- [ ] Agents communicate, spawn sub-tasks, handle failures autonomously

### **v3.0 (Month 12)**
- [ ] Algo trading signals integration
- [ ] Backtesting framework
- [ ] API access for developers
- [ ] Subscription tiers (Pro, Premium)

---

## 🔒 SECURITY & COMPLIANCE

- **Data Privacy:** No user data shared with third parties
- **GDPR/CCPA:** Comply with data protection regulations
- **HTTPS Only:** All traffic encrypted
- **Rate Limiting:** Prevent API abuse
- **Content Security Policy (CSP):** Prevent XSS attacks
- **Authentication:** NextAuth.js for secure auth

---

## 📝 CONTENT MODERATION

- ✅ Curated sources only (no Reddit/Twitter in MVP)
- ✅ Source credibility validation
- ✅ Spam detection (duplicate articles)
- ✅ Manual review process for trending tags
- ✅ Misinformation flagging system (future)

---

## 💰 MONETIZATION (Future - Not in MVP)

- **Premium Tier:** Ad-free, advanced filters, export to PDF
- **API Access:** For traders & developers
- **Sponsored Sections:** Limited (no clickbait)
- **Affiliate Links:** Brokerage partnerships (disclosed)

---

## 📞 SUPPORT & FEEDBACK

- **Feedback Form:** In-app feedback widget
- **Email Support:** [contact@financeflow.app](mailto:contact@financeflow.app)
- **GitHub Issues:** For bugs & feature requests
- **Discord Community:** For user discussions (future)

---

## 🎓 LEARNING VALUE PROP

**How FinanceFlow Builds Trading Intuition:**

1. **Daily Curation** → You read 5-10 quality articles/day
2. **Consistent Exposure** → Understand market patterns over time
3. **Structured Learning** → From basics to advanced concepts
4. **Pattern Recognition** → See how news impacts markets
5. **Confidence Building** → Knowledge-backed decision making

> *Most successful traders spend 5+ years building intuition. FinanceFlow accelerates that by 40% through structured content curation.*

---

## 📋 APPENDIX

### **A. Database Schema (Prisma)**

```prisma
model Article {
  id        String   @id @default(cuid())
  title     String
  source    String
  sourceURL String   @unique
  summary   String?  @db.Text
  author    String?
  imageURL  String?
  publishedAt DateTime
  category  String   // "daily" | "deep-dive" | "monthly" | "learning"
  tags      String[] // JSON array
  readTime  Int?     // minutes
  fetchedAt DateTime @default(now())
  
  bookmarks Bookmark[]
  
  @@index([category])
  @@index([publishedAt])
  @@index([source])
}

model Bookmark {
  id        String   @id @default(cuid())
  userId    String
  articleId String
  article   Article  @relation(fields: [articleId], references: [id], onDelete: Cascade)
  savedAt   DateTime @default(now())
  
  @@unique([userId, articleId])
  @@index([userId])
}

model FeedSource {
  id       String @id @default(cuid())
  name     String @unique // "moneycontrol", "et-markets", etc.
  rssURL   String
  category String
  isActive Boolean @default(true)
}
```

### **B. Environment Variables (.env.local)**

```env
# Database
DATABASE_URL=postgres://user:password@host:5432/financeflow

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key_here

# Deployment
VERCEL_URL=https://financeflow.vercel.app

# API
NEWS_API_KEY=optional_for_fallback
```

### **C. RSS Feed URLs (Starter Pack)**

```
Moneycontrol Markets:
https://feeds.moneycontrol.com/rss/markets.xml

ET Markets:
https://economictimes.indiatimes.com/markets/rssfeedmap.cms

Reuters Markets:
https://feeds.reuters.com/reuters/businessNews
https://feeds.reuters.com/markets/index

CoinDesk:
https://feeds.coindesk.com/markets

TradingView (Limited RSS):
https://www.tradingview.com/markets/index.rss

Seeking Alpha:
https://feeds.seekingalpha.com/feed.xml

MarketWatch:
https://feeds.marketwatch.com/marketwatch/topstories/
```

---

## ✅ APPROVAL & SIGN-OFF

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Product Manager | [Your Name] | _____ | May 29, 2026 |
| Tech Lead | [Your Name] | _____ | May 29, 2026 |
| Design Lead | [Your Name] | _____ | May 29, 2026 |

---

**Document Version:** 1.0  
**Last Updated:** May 29, 2026  
**Next Review:** June 12, 2026 (Post-MVP Launch)
