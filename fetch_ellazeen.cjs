const https = require('https');
const fs = require('fs');

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

async function fetchScreenshot(name, url) {
  return new Promise((resolve, reject) => {
    const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&waitFor=8000&viewport.width=1280&viewport.height=800`;
    console.log(`Requesting ${name}...`);
    https.get(apiUrl, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', async () => {
        try {
          const json = JSON.parse(data);
          console.log("Microlink Response:", JSON.stringify(json, null, 2));
          if (json.status === 'success' && json.data && json.data.screenshot) {
            await downloadImage(json.data.screenshot.url, `public/portfolio/${name}.png`);
            const stat = fs.statSync(`public/portfolio/${name}.png`);
            console.log(`✓ ${name}.png saved (${(stat.size / 1024).toFixed(0)}KB)`);
            resolve();
          } else {
            console.error(`✗ API Error for ${name}:`, JSON.stringify(json).substring(0, 300));
            reject(new Error(`API Error`));
          }
        } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

(async () => {
  try {
    await fetchScreenshot('ellazeen', 'https://ellazeen.com/');
    console.log('Done!');
  } catch (e) {
    console.error('Failed:', e.message);
  }
})();
