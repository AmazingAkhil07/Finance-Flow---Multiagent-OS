import Parser from 'rss-parser';

const parser = new Parser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'Accept': 'application/rss+xml, application/xml, text/xml, */*'
  }
});

async function test() {
  try {
    const et = await parser.parseURL('https://economictimes.indiatimes.com/markets/rssfeeds/2146842.cms');
    console.log('ET Success:', et.items.length);
  } catch(e) {
    console.error('ET Error:', e.message);
  }
  
  try {
    const mc = await parser.parseURL('https://feeds.moneycontrol.com/rss/markets.xml');
    console.log('MC Success:', mc.items.length);
  } catch(e) {
    console.error('MC Error:', e.message);
  }
}

test();
