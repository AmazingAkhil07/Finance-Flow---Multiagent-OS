import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ success: false, error: 'URL is required' }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove scripts, styles, and nav elements to clean up text
    $('script, style, nav, header, footer, iframe, aside').remove();

    // Extract all paragraph text
    const paragraphs: string[] = [];
    $('p').each((_, el) => {
      const text = $(el).text().trim();
      // Only keep substantial paragraphs
      if (text.length > 60) {
        paragraphs.push(text);
      }
    });

    if (paragraphs.length === 0) {
      return NextResponse.json({ 
        success: true, 
        summary: "Could not extract full text from this source due to site protection. Please read the original article for the complete details." 
      });
    }

    // Take the first 3-4 substantial paragraphs as the detailed executive summary
    const summaryCount = Math.min(4, paragraphs.length);
    const detailedSummary = paragraphs.slice(0, summaryCount).join('\n\n');

    return NextResponse.json({ success: true, summary: detailedSummary });

  } catch (error) {
    console.error("Summarizer Error:", error);
    return NextResponse.json({ 
      success: true, // Still return success to prevent UI crash, but with fallback
      summary: "This article is behind a paywall or has bot-protection enabled. Please click the button below to read it directly on the source website." 
    });
  }
}
