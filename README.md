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

The FinanceFlow architecture utilizes a coordinated, sequential multi-agent pipeline designed to extract, normalize, classify, and persist data without user intervention. The entire pipeline is designed for serverless environments (handling execution limits, database connections, and race conditions).

### 📍 Pipeline Flowchart

Below is the execution flow of the background cron task (`/api/cron/fetch`) orchestrating the multi-agent pipeline:

```mermaid
flowchart TD
    %% Styling Classes
    classDef trigger fill:#ffe5e5,stroke:#ff5555,stroke-width:2px,color:#800000;
    classDef agent fill:#fff3e6,stroke:#ffb86c,stroke-width:2px,color:#663300;
    classDef process fill:#e6f9ff,stroke:#8be9fd,stroke-width:1.5px,color:#004d61;
    classDef db fill:#e8ffe8,stroke:#50fa7b,stroke-width:2px,color:#004d00;
    classDef decision fill:#f3e6ff,stroke:#bd93f9,stroke-width:2px,color:#330066;

    %% Trigger & Lock Check
    CronRoute["Next.js Serverless Cron Route<br/><code>/api/cron/fetch</code>"]:::trigger
    LockCheck{"Concurrency Lock?"}:::decision
    ExitPipeline["Exit Pipeline<br/>(Prevent overlap)"]:::process
    
    %% Fetcher Agent Stage
    subgraph FetcherSub ["1. Fetcher Agent (fetcher.ts)"]
        FetcherAgent["Parallel RSS Fetcher"]:::agent
        RSSParse["Parse RSS & Google News XML<br/>(Parallel Requests)"]:::process
        NormalizeSchema["Normalize Schema into<br/>RawArticle JSON"]:::process
        FreshnessBias["Apply Dynamic Freshness Bias<br/>to Daily Feed"]:::process
    end
    
    %% Dedup Agent Stage
    subgraph DedupSub ["2. Dedup Agent (dedup.ts)"]
        DedupAgent["Duplicate Detection Engine"]:::agent
        BatchDedup["Deduplicate Batch In-Memory"]:::process
        DbUrlCheck["Validate URL Hashes against DB"]:::process
        FilterExisting["Filter Out Existing Articles"]:::process
    end

    %% Classifier Agent Stage
    subgraph ClassifierSub ["3. Classifier Agent (classifier.ts)"]
        ClassifierAgent["Taxonomy & Classification Engine"]:::agent
        RegexMatch["RegEx Keyword Match<br/>(RBI, NIFTY, TECH, MACRO, etc.)"]:::process
        TagAssign["Assign Category Tags"]:::process
        ReadTime["Estimate Read Time<br/>by Category/Length"]:::process
    end

    %% Database & Feed Updates
    UpdateDaily["Update Daily Feed Timestamps<br/>(Capped at 50 sequential updates)"]:::process
    NeonDB[("Neon PostgreSQL Database<br/>(Prisma ORM Upsert)")]:::db

    %% Pipeline Flow
    CronRoute --> LockCheck
    LockCheck -- "Yes (Active)" --> ExitPipeline
    LockCheck -- "No (Acquired Lock)" --> FetcherAgent
    
    FetcherAgent --> RSSParse
    RSSParse --> NormalizeSchema
    NormalizeSchema --> FreshnessBias
    
    FreshnessBias --> BatchDedup
    BatchDedup --> DbUrlCheck
    DbUrlCheck --> FilterExisting
    
    FilterExisting -- "New Articles" --> ClassifierAgent
    FilterExisting -- "No New Articles" --> UpdateDaily
    
    ClassifierAgent --> RegexMatch
    RegexMatch --> TagAssign
    TagAssign --> ReadTime
    
    ReadTime --> NeonDB
    UpdateDaily --> NeonDB
```

### 👥 Agent Roles & Responsibilities

| Agent | Location | Main Responsibility | Input Schema | Output Schema |
| :--- | :--- | :--- | :--- | :--- |
| **🕷️ Fetcher Agent** | `src/lib/agents/fetcher.ts` | Resolves XML RSS and custom Google News proxy requests in parallel. Normalizes feeds. | None (Uses predefined list of 15+ feeds) | `RawArticle[]` |
| **🧹 Dedup Agent** | `src/lib/agents/dedup.ts` | Filters duplicates across the incoming memory batch and the target database via URL mapping. | `RawArticle[]` | `RawArticle[]` (Unsaved only) |
| **🏷️ Classifier Agent** | `src/lib/agents/classifier.ts` | Scans title & snippet text using RegExp to assign tags and dynamic reading time estimations. | `RawArticle[]` | `ClassifiedArticle[]` (Enriched) |

---

### ⚙️ Core Orchestration Mechanisms

> [!NOTE]
> **Concurrency Locking (`globalForFetch.isFetching`)**
> To avoid database deadlocks and double-processing overhead in serverless edge environments, a global execution lock is checked at the entry of the route. If an ingestion instance is already running, subsequent cron requests instantly exit without blocking.

> [!TIP]
> **Database Transaction Serialization**
> While SQLite is prone to locking, Neon PostgreSQL handles concurrency gracefully. However, to prevent transactional query spikes and keep API response times stable, the route executes its Prisma ORM upserts sequentially rather than in uncontrolled parallel `Promise.all` groups.

> [!IMPORTANT]
> **Daily Feed Freshness Loop**
> Stock traders need real-time vibes. If a duplicate article is fetched under the `daily` category, rather than throwing it away, the scheduler updates its `publishedAt` timestamp to the current fetch time (capped at 50 sequential updates per cycle). This ensures active market news stays fresh on the user's dashboard without cluttering the DB with duplicate records.

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
