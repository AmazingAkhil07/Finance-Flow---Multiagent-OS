# FinanceFlow - Multi-Source Finance Intelligence Reader

FinanceFlow is a curated, multi-source finance intelligence reader designed for traders and investors to stay updated with real-time market news, deep-dive analysis, and financial education—all in one place.

## Features

- 📰 **Real-Time Market News**: Aggregates breaking news from Bloomberg, Reuters, ET Markets, Moneycontrol, and more.
- 📈 **Live Market Ticker**: Seamless, infinite scrolling ticker powered by Yahoo Finance API proxy.
- 🧠 **Autonomous Pipeline Agents**: Background cron agents automatically fetch, deduplicate, and securely store articles into a cloud Postgres database.
- 📚 **Deep Dive & Monthly Research**: Long-form, institutional-grade market analysis pulled via custom Google News RSS aggregators to bypass strict publisher bot-protections.
- 🔖 **Vault & Bookmarks**: Read later and permanently save critical market intelligence without losing it to ephemeral feed algorithms.

## Tech Stack

- **Frontend:** Next.js 14, Tailwind CSS, Framer Motion, shadcn/ui
- **Backend/API:** Next.js Serverless Functions, Prisma ORM
- **Database:** Neon PostgreSQL
- **Data Scraping:** `rss-parser`, Custom Google News RSS Aggregators, Yahoo Finance API Proxy

## Getting Started Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure your environment:
   Ensure you have a `.env` file in the root directory with your PostgreSQL connection string:
   ```env
   DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
   ```

3. Sync the Prisma Schema:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the live app.

## Vercel Deployment

This app is fully compatible with Vercel's serverless architecture.
1. Connect your GitHub repository to Vercel.
2. In the Vercel project settings, add the `DATABASE_URL` environment variable.
3. Deploy! The `/api/cron/fetch` endpoint acts as the autonomous agent to keep your database populated with the latest market news.
