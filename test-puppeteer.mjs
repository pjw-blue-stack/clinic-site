import puppeteer from 'puppeteer';

(async () => {
  console.log("Launching puppeteer...");
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  console.log("Navigating to localhost:5173...");
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  
  console.log('Clicking Clinic link...');
  await page.evaluate(() => {
    const links = document.querySelectorAll('.nav-link');
    for (const link of links) {
      if (link.textContent.includes('한의원')) {
        link.click();
        break;
      }
    }
  });

  await page.waitForTimeout(2000); // wait for render
  
  console.log('Done.');
  await browser.close();
})();
