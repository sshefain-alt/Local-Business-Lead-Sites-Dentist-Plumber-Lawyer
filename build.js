/**
 * Static site build.
 * Reads config + content, renders every page into /dist, copies assets
 * and emits sitemap.xml + robots.txt.
 *
 *   npm run build
 */
const fs = require('fs');
const path = require('path');

const { site, categories: cfgCategories, cities } = require('./config');
const { categories } = require('./src/data/categories');
const allCities = require('./src/data/cities');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');

const built = [];

function writeFile(relPath, contents) {
  const full = path.join(DIST, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, contents, 'utf8');
  built.push(relPath);
}

function copyAssets() {
  const assetsSrc = path.join(ROOT, 'src', 'assets');
  fs.mkdirSync(path.join(DIST, 'assets'), { recursive: true });
  for (const file of fs.readdirSync(assetsSrc)) {
    fs.copyFileSync(path.join(assetsSrc, file), path.join(DIST, 'assets', file));
  }
  built.push('assets/*');
}

function buildSitemap() {
  const urls = ['/'];
  categories.forEach((c) => {
    urls.push(`/${c.slug}/`);
    allCities.forEach((city) => urls.push(`/${c.slug}/${city.slug}/`));
  });
  urls.push('/faq/', '/testimonials/', '/contact/');

  const today = new Date().toISOString().slice(0, 10);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${site.url}${u}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${u === '/' ? '1.0' : u.split('/').length > 2 ? '0.8' : '0.9'}</priority></url>`
  )
  .join('\n')}
</urlset>
`;
  writeFile('sitemap.xml', xml);
  writeFile(
    'robots.txt',
    `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`
  );
}

function main() {
  console.log('Building local lead sites → dist/\n');

  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });
  copyAssets();

  // Home
  writeFile('index.html', require('./src/templates/home').render());

  // Category landing pages
  for (const category of categories) {
    writeFile(`${category.slug}/index.html`, require('./src/templates/category').render(category));

    // Service-area pages
    for (const city of allCities) {
      writeFile(`${category.slug}/${city.slug}/index.html`, require('./src/templates/city').render(category, city));
    }
  }

  // Shared pages
  writeFile('faq/index.html', require('./src/templates/faqPage').render());
  writeFile('testimonials/index.html', require('./src/templates/testimonialsPage').render());
  writeFile('contact/index.html', require('./src/templates/contactPage').render());

  buildSitemap();

  const pages = built.filter((f) => f.endsWith('.html'));
  console.log(`Done. ${pages.length} pages + sitemap/robots + assets.`);
  console.log('Preview:  npm run serve   → http://localhost:8080');
}

main();
