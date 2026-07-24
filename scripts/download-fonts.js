import https from 'https';
import fs from 'fs';

const options = {
  hostname: 'fonts.googleapis.com',
  path: '/css2?family=Inter:wght@400;500;700&family=Playfair+Display:ital,wght@0,700;1,700&family=JetBrains+Mono:wght@400;700&display=swap',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    fs.writeFileSync('src/fonts.css', data);
    console.log('Fonts CSS downloaded!');
  });
}).on('error', (err) => {
  console.error(err);
});
