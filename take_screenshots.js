const puppeteer = require('puppeteer');

const sites = [
  { name: 'aftechskincare', url: 'https://aftechskincare.com/' },
  { name: 'herbinest', url: 'https://herbinest.com/' },
  { name: 'coffeecrest', url: 'https://coffeecrest.pk/' },
  { name: 'zubaaish', url: 'https://zubaaish.com/' },
  { name: 'inayatbb', url: 'https://inayatbb.com/' },
  { name: 'sweetenvy', url: 'https://sweetenvy.com.au/' },
  { name: 'brisbanevape', url: 'https://brisbanevape.com/' },
  { name: 'calderixtech', url: 'https://calderixtech.com' },
  { name: 'ellazeen', url: 'https://ellazeen.com' },
  { name: 'amaautomation', url: 'https://amaautomation.com/' },
  { name: 'toppxcessoriez', url: 'https://toppxcessoriez.co.uk' },
  { name: 'atozhoneydoguy', url: 'https://atozhoneydoguy.com/' }
];

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  for (const site of sites) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    console.log(`Capturing ${site.name}...`);
    try {
      // Wait until network is fully idle (no more than 0 connections for at least 500ms)
      // This is crucial to wait out any loading screens
      await page.goto(site.url, { waitUntil: 'networkidle0', timeout: 30000 });
      // Add an extra hard wait of 3 seconds for animations/preloaders to fade out
      await new Promise(resolve => setTimeout(resolve, 3000));
      await page.screenshot({ path: `public/portfolio/${site.name}.png` });
      console.log(`Successfully saved public/portfolio/${site.name}.png`);
    } catch (err) {
      console.error(`Failed to capture ${site.name}:`, err.message);
    }
    await page.close();
  }
  
  await browser.close();
})();
