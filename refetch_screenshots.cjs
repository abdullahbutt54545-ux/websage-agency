const https = require('https');
const fs = require('fs');

// Sites that had bad/blank screenshots
const sites = [
  { name: 'ellazeen', url: 'https://ellazeen.com/' },
  // Re-fetch any others that looked wrong based on visual review
  { name: 'amaautomation', url: 'https://amaautomation.com/' },
  { name: 'toppxcessoriez', url: 'https://toppxcessoriez.co.uk/' },
];

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        // Handle redirect
        https.get(response.headers.location, (res2) => {
          res2.pipe(file);
          file.on('finish', () => { file.close(); resolve(filepath); });
        }).on('error', reject);
      } else {
        response.pipe(file);
        file.on('finish', () => { file.close(); resolve(filepath); });
      }
    }).on('error', reject);
  });
}

async function fetchScreenshot(site) {
  return new Promise((resolve, reject) => {
    // Add extra waitFor time and use fullPage for better captures
    const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(site.url)}&screenshot=true&meta=false&waitFor=10000&viewport.width=1280&viewport.height=800`;
    
    console.log(`Requesting ${site.name} from Microlink...`);
    https.get(apiUrl, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', async () => {
        try {
          const json = JSON.parse(data);
          if (json.status === 'success' && json.data && json.data.screenshot) {
            console.log(`  -> Image URL: ${json.data.screenshot.url}`);
            console.log(`Downloading ${site.name} image...`);
            await downloadImage(json.data.screenshot.url, `public/portfolio/${site.name}.png`);
            const stat = fs.statSync(`public/portfolio/${site.name}.png`);
            console.log(`Successfully saved public/portfolio/${site.name}.png (${stat.size} bytes)`);
            resolve();
          } else {
            console.error(`API response for ${site.name}:`, data.substring(0, 500));
            reject(new Error(`API Error for ${site.name}`));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

(async () => {
  for (const site of sites) {
    try {
      await fetchScreenshot(site);
    } catch (err) {
      console.error(`Failed for ${site.name}:`, err.message);
    }
    // Wait 2 seconds between requests
    await new Promise(r => setTimeout(r, 2000));
  }
  console.log('Done!');
})();
