import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  
  await page.goto('http://localhost:5174');
  await page.waitForSelector('.logo');
  
  console.log("Navigating to 한의원...");
  const navLinks = await page.$$('.nav-link');
  for (const link of navLinks) {
    const text = await page.evaluate(el => el.textContent, link);
    if (text.trim() === '한의원') {
      await page.evaluate(el => el.click(), link);
      break;
    }
  }
  
  await new Promise(r => setTimeout(r, 2000));
  
  const clinicWrapper = await page.$('.clinic-page-wrapper');
  if (clinicWrapper) {
    console.log("ClinicPage rendered successfully!");
    const display = await page.evaluate(el => window.getComputedStyle(el).display, clinicWrapper);
    console.log("ClinicPage display:", display);
  } else {
    console.log("ClinicPage not found!");
  }
  
  await browser.close();
  process.exit(0);
})();
