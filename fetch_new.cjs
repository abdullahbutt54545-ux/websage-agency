const https = require('https');
const fs = require('fs');

const sites = [
  { name: 'corkcicle', url: 'https://corkcicle.com/' },
  { name: 'nomadgoods', url: 'https://nomadgoods.com/' },
  { name: 'chubbiesshorts', url: 'https://www.chubbiesshorts.com/' },
];

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    const get = (u) => {
      https.get(u, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          get(response.headers.location);
        } else {
          response.pipe(file);
          file.on('finish', () => { file.close(); resolve(filepath); });
          file.on('error', reject);
        }
      }).on('error', reject);
    };
    get(url);
  });
}

async function fetchScreenshot(site) {
  return new Promise((resolve, reject) => {
    const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(site.url)}&screenshot=true&meta=false&waitFor=6000&viewport.width=1280&viewport.height=800`;
    console.log(`Requesting ${site.name}...`);
    https.get(apiUrl, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', async () => {
        try {
          const json = JSON.parse(data);
          if (json.status === 'success' && json.data && json.data.screenshot) {
            await downloadImage(json.data.screenshot.url, `public/portfolio/${site.name}.png`);
            const stat = fs.statSync(`public/portfolio/${site.name}.png`);
            console.log(`✓ ${site.name}.png saved (${(stat.size / 1024).toFixed(0)}KB)`);
            resolve();
          } else {
            console.error(`✗ API Error for ${site.name}:`, data.substring(0, 300));
            reject(new Error(`API Error`));
          }
        } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

(async () => {
  for (const site of sites) {
    try {
      await fetchScreenshot(site);
    } catch (err) {
      console.error(`Failed ${site.name}:`, err.message);
    }
    await new Promise(r => setTimeout(r, 1500));
  }
  console.log('\nAll done!');
})();
