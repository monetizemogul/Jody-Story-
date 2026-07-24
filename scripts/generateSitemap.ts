import { counties } from '../src/pages/counties';
import { cities } from '../src/pages/cities';
import fs from 'fs';

const baseUrl = 'https://jstorybailbonds.com';
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

const addUrl = (path: string, priority: string) => {
  xml += '  <url>\n';
  xml += `    <loc>${baseUrl}${path}</loc>\n`;
  xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
  xml += '    <changefreq>weekly</changefreq>\n';
  xml += `    <priority>${priority}</priority>\n`;
  xml += '  </url>\n';
};

addUrl('/', '1.0');
addUrl('/bonne-terre-mo-bail-bonds--24/7-jail-release-services', '0.8');
addUrl('/ironton-bail-bonds-247-jail-release', '0.8');

counties.forEach(county => {
  addUrl(`/service-area/${county.id}`, '0.8');
});

cities.forEach(city => {
  if (city.id !== 'bonne-terre' && city.id !== 'ironton') {
    addUrl(`/service-area/city/${city.id}`, '0.7');
  }
});

xml += '</urlset>\n';
fs.writeFileSync('public/sitemap.xml', xml);
console.log('Sitemap generated successfully!');
