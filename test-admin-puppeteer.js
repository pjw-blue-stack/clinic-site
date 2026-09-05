import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  
  await page.goto('http://localhost:5174'); // I started it on 5174 previously
  await page.waitForSelector('.logo');
  
  console.log("Setting Admin Mode...");
  await page.evaluate(() => {
    // We can't directly call setIsAdminPage, but we can trigger it.
    // Or we can just check if there is an error on the page.
    window.location.hash = '#home';
  });
  
  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
  process.exit(0);
})();
