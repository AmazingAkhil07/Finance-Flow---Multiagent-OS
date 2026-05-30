# FinanceFlow 📈 

FinanceFlow is a premium, high-end, multi-source financial intelligence reader designed for traders, investors, and stock learners. It aggregates breaking news, deep-dive macro analyses, and institutional learning resources, turning fragmented market noise into structured, actionable intelligence.

---

## ⚡ Problems Solved by FinanceFlow

In modern retail trading, information is either fragmented, paywalled, or biased. FinanceFlow addresses these exact limitations:

1. **Information Overload & Fragmentation**: Eliminates the need to jump between 10+ tabs (Moneycontrol, Reuters, Seeking Alpha, Bloomberg, exchange filings, etc.) by unifying them into a single, beautiful dashboard.
2. **Strict Publisher Bot-Protections**: Bypasses heavy scraper blocking and IP bans on strict publishers (e.g. Seeking Alpha, Morningstar, Bloomberg) by utilizing custom Google News RSS aggregators as high-reputation proxies.
3. **Ephemeral Feed Decay**: Unlike standard RSS feeds that expire after a few hours, FinanceFlow automatically pipes fetched articles into a **Neon PostgreSQL database**, archiving them permanently so historical intelligence is never lost.
4. **Context Switching (Learning vs. Action)**: Unifies foundational learning resources (Zerodha Varsity, Investopedia) with active market news, allowing users to instantly connect core theories (like P/E ratios or yield curves) to real-time breaking market developments.
5. **Algorithmic Bias and Misinformation**: Replaces speculative "Fin-Twitter" or Reddit advice with curated feeds from institutional-grade, highly-reputed publications.

---

## 🚀 Core Features & Tab Overview

### 1. 🔴 Daily Feed (Real-Time Market News)
*   **Purpose**: Provides fast-moving breaking news with zero delay.
*   **Features**:
    *   **Interactive Search & Filter**: Instant client-side text filtering and clickable source filters to hide or display specific feeds.
    *   **Trending Tags**: One-click tags targeting high-volume market events (e.g., `#RBI`, `#Nifty`, `#Banking`, `#Crypto`, `#IPO`).
    *   **Freshness Engine**: Artificially updates article timestamps dynamically to reflect live, active ticker-floor activity.
    *   **One-Click Source Access**: Redirects to the original publisher with standard external links.

### 2. 🟠 Deep Dive (Long-Form Analysis)
*   **Purpose**: Provides detailed macro analysis and equity research.
*   **Features**:
    *   **Live Synthesis Feed**: Curates the latest long-form articles alongside read-time estimations, view counts, and custom tags.
    *   **Knowledge Vault**: A long-term library repository designed to organize older deep-dives by learning paths and tags.
    *   **AI Synthesis Briefs**: An overlay modal showing synthesized briefs of complex articles.

### 3. 🟡 Monthly Research (Macro & Fund Insights)
*   **Purpose**: Tracks institutional-grade investment reports and sector-focused papers.
*   **Features**:
    *   **Chronological Grouping**: Groups research reports strictly by month and year.
    *   **Advanced Filtering**: Multi-select filters for **Asset Class** (Equities, Crypto, Macro, Fixed Income) and **Sector Focus** (Tech, Banking, Energy, Consumer, Regulation).
    *   **Structural Analysis Breakdown**: Synthesizes multi-page reports to show page counts and analytical takeaways.

### 4. 🟢 Learning Hub (Structured Paths)
*   **Purpose**: Foundational concepts and reference resources.
*   **Features**:
    *   **Structured Paths**: Interactive courses categorized by theme:
        *   *Equities Market Mastery* (Stocks Fundamentals)
        *   *On-Chain Analytics & DeFi* (Crypto Fundamentals)
        *   *Central Bank Policy & Yield Curves* (Macro Economics)
    *   **Progress Tracking**: Tracks read-progress by allowing users to check/uncheck modules.
    *   **Quick Reference Exchange Links**: Seamless links to official market exchange portals (NSE Corporate Filings, BSE Announcements, Annual Reports, IR Hubs).

### 5. ⭐ Saved Documents (Reading List)
*   **Purpose**: Persistent bookmarking to read items later.
*   **Features**:
    *   **Omnipresent Save**: Allows pinning articles from any tab (Daily, Deep Dive, Monthly) directly into local memory.
    *   **Count Badge**: Dynamic counter in the sidebar navigation reflecting unread bookmarks.

### 6. 📰 Morning Briefing (The 5-Min Summary)
*   **Purpose**: A high-impact summary pinned at the top of the Daily Feed before market open.
*   **Features**:
    *   Synthesizes the top 3 Indian market headlines, global market indicators, overnight crypto movements, and scheduled macroeconomic events.

### 7. 📈 Live Market Ticker & Pipeline Monitor
*   **Features**:
    *   **Yahoo Finance Ticker**: A seamless, infinite scrolling CSS marquee banner fetching live indices and equities prices.
    *   **Live Pipeline Status Panel**: Side-drawer rendering real-time statistics of background agent executions and database sizes.

---

## 📊 Data Source Mapping & Extraction Strategy

| Tab | Source Name | Content Type | Extraction / Scraping Method | Update Frequency |
| :--- | :--- | :--- | :--- | :--- |
| **Daily Feed** | Moneycontrol | News & Indian Markets | Custom Google News RSS query (`site:moneycontrol.com+markets`) | Every 30 mins |
| **Daily Feed** | Economic Times | Indian Market News | Direct RSS Feed (`economictimes.indiatimes.com/...`) | Every 15 mins |
| **Daily Feed** | TradingView | Chart ideas & News | Custom Google News RSS query (`site:tradingview.com+news`) | Every 1 hour |
| **Daily Feed** | Bloomberg | Global Finance | Proxied via Yahoo Finance RSS (`finance.yahoo.com/news/rss`) | Every 4 hours |
| **Daily Feed** | Reuters | Global Markets | Custom Google News RSS query (`site:reuters.com+finance`) | Every 1 hour |
| **Daily Feed** | CoinDesk | Crypto News | Official RSS Feed (`coindesk.com/arc/outboundfeeds/rss/`) | Every 30 mins |
| **Deep Dive** | Seeking Alpha | Equity Research | Custom Google News RSS query (`site:seekingalpha.com+analysis`) | Every 2 hours |
| **Deep Dive** | MarketWatch | Market Psychology | Official RSS Feed (`feeds.marketwatch.com/...`) | Every 2 hours |
| **Deep Dive** | CoinTelegraph | Crypto Deep Dives | Official RSS Feed (`cointelegraph.com/rss`) | Every 30 mins |
| **Deep Dive** | Livemint Premium| Premium Market Views | Official RSS Feed (`livemint.com/rss/markets`) | Every 1 hour |
| **Deep Dive** | WSJ Markets | Wall Street Analysis | Official RSS Feed (`feeds.a.dj.com/rss/RSSMarketsMain.xml`) | Every 2 hours |
| **Monthly** | Morningstar | Fund Research | Custom Google News RSS query (`site:morningstar.com+outlook`) | Monthly |
| **Monthly** | Value Research | Fund & Macro Outlook | Custom Google News RSS query (`site:valueresearchonline.com+funds`) | Monthly |
| **Monthly** | Seeking Alpha Macro| Macroeconomics | Custom Google News RSS query (`site:seekingalpha.com+macro`) | Monthly |
| **Monthly** | Bitcoin Magazine | Crypto Fundamentals | Custom Google News RSS query (`site:bitcoinmagazine.com`) | Monthly |
| **Monthly** | CNBC Investing | Market Trends | Official RSS Feed (`search.cnbc.com/...`) | Weekly |
| **Learning Hub**| Zerodha Varsity | Stocks Fundamentals | Core content mapping (Reference manual curation) | Static |
| **Learning Hub**| Investopedia | General Finance | Core content mapping (Reference manual curation) | Static |
| **Learning Hub**| Ethereum.org | On-Chain Mechanics | Core content mapping (Reference manual curation) | Static |
| **Learning Hub**| The Block | DeFi Concepts | Core content mapping (Reference manual curation) | Static |
| **Learning Hub**| NSE & BSE | Exchange Filings | Direct URL redirection targeting exchange filing portals | Live / Dynamic |

---

## 🧠 Multi-Agent Orchestration Architecture

The system utilizes a coordinated, sequential multi-agent pipeline designed to extract, normalize, tag, and persist data without user intervention.

```mermaid
flowchart TD
    cron[Next.js Serverless Cron Route /api/cron/fetch] --> lock{Concurrency Lock?}
    lock -- Yes, fetching active --> skip[Exit Pipeline]
    lock -- No, acquired lock --> fetcher[1. Fetcher Agent]
    
    subgraph Fetcher Pipeline
        fetcher --> xml_parse[Parse XML & Google RSS Feeds in Parallel]
        xml_parse --> normalize[Normalize Schema into RawArticle JSON]
        normalize --> freshness[Apply Freshness Bias to Daily Feed]
    end
    
    Fetcher Pipeline --> dedup[2. Dedup Agent]
    
    subgraph Deduplication Engine
        dedup --> batch_check[Deduplicate Incoming Batch In-Memory]
        batch_check --> db_check[Validate URL Hashes against PostgreSQL]
        db_check --> filter[Filter out Existing Articles]
    end
    
    Deduplication Engine -- New Articles Found --> classifier[3. Classifier Agent]
    Deduplication Engine -- No New Articles --> update_daily[Update Daily Feed timestamps in bulk]
    
    subgraph Classification Engine
        classifier --> regex[RegEx-based Keyword Matching]
        regex --> tag_assign[Assign tags: RBI, NIFTY, SENSEX, TECH, etc.]
        tag_assign --> read_time[Estimate Read Time by Category]
    end
    
    Classification Engine --> db[(4. Neon PostgreSQL DB)]
    update_daily --> db
```

### Agent Roles

1.  🕷️ **Fetcher Agent (`src/lib/agents/fetcher.ts`)**:
    *   Fires off parallel network requests to all defined RSS feeds to prevent serverless execution timeouts (10-second limit).
    *   Filters out invalid items and normalizes varying RSS metadata tags (e.g. `creator` vs `author`) into a unified schema.
    *   Implements an artificial freshness delay subtraction to maintain the feel of a live, trading-floor feed.
2.  🧹 **Dedup Agent (`src/lib/agents/dedup.ts`)**:
    *   Performs in-memory deduplication on incoming batches.
    *   Executes database-level queries using unique URL indexes to prevent duplicate constraint violations.
3.  🏷️ **Classifier Agent (`src/lib/agents/classifier.ts`)**:
    *   Analyzes the title and summary of newly fetched items.
    *   Uses RegExp-based mapping to search for specific financial keywords (e.g. `repo rate` -> `RBI`, `gdp` -> `MACRO`).
    *   Calculates expected read times based on text length and classification category (e.g., 2–5 minutes for Daily news, 15–30 minutes for Deep Dives).

### Orchestration & Concurrency Engine (`src/app/api/cron/fetch/route.ts`)
*   **Concurrency Locking**: Employs a global `isFetching` lock to prevent overlapping cron triggers from executing simultaneous database sessions.
*   **Staging / Persistence Operations**: Saves articles to Neon PostgreSQL sequentially using Prisma ORM to avoid SQLite-heritage transactional locking issues.
*   **Daily Freshness Update**: If articles in the incoming batch are duplicates but fall under the `daily` category, the scheduler bumps their `publishedAt` timestamp (capped at 50 sequential updates per cycle) to guarantee the frontend shows real-time market updates.

---

## 🛠️ Technology Stack

*   **Frontend**: Next.js 14 (App Router), Tailwind CSS, Framer Motion, Lucide Icons, `next-themes` (Dark/Light mode)
*   **Database & ORM**: Neon PostgreSQL (fully serverless-compatible), Prisma ORM
*   **Feed Processing**: `rss-parser`, Axios
*   **Hosting**: Vercel Serverless Architecture

---

## 💻 Local Setup & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Connection
Ensure you create a `.env` file in the root directory and add your PostgreSQL connection string:
```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
```

### 3. Sync Database Schema
Sync the Prisma schema directly to your PostgreSQL database:
```bash
npx prisma db push
npx prisma generate
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The background pipeline will execute on layout load and populate your local view with live market news.
