const https = require('https');
const fs = require('fs');

const sites = [
  { name: 'aftechskincare', url: 'https://aftechskincare.com/' },
  { name: 'herbinest', url: 'https://herbinest.com/' },
  { name: 'coffeecrest', url: 'https://coffeecrest.pk/' },
  { name: 'zubaaish', url: 'https://zubaaish.com/' },
  { name: 'inayatbb', url: 'https://inayatbb.com/' },
  { name: 'sweetenvy', url: 'https://sweetenvy.com.au/' },
  { name: 'brisbanevape', url: 'https://brisbanevape.com/' },
  { name: 'calderixtech', url: 'https://calderixtech.com/' },
  { name: 'ellazeen', url: 'https://ellazeen.com/' },
  { name: 'amaautomation', url: 'https://amaautomation.com/' },
  { name: 'toppxcessoriez', url: 'https://toppxcessoriez.co.uk/' },
  { name: 'atozhoneydoguy', url: 'https://atozhoneydoguy.com/' }
];

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function fetchScreenshot(site) {
  return new Promise((resolve, reject) => {
    // We add waitFor=8000 to wait 8 seconds for loaders to disappear
    const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(site.url)}&screenshot=true&meta=false&waitFor=8000`;
    
    console.log(`Requesting ${site.name} from Microlink...`);
    https.get(apiUrl, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', async () => {
        try {
          const json = JSON.parse(data);
          if (json.status === 'success' && json.data && json.data.screenshot) {
            console.log(`Downloading ${site.name} image...`);
            await downloadImage(json.data.screenshot.url, `public/portfolio/${site.name}.png`);
            console.log(`Successfully saved public/portfolio/${site.name}.png`);
            resolve();
          } else {
            reject(new Error(`API Error: ${data}`));
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
  }
})();
