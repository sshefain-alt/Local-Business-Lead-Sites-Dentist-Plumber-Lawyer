/**
 * Post-build validation: SEO essentials, schema validity, link integrity.
 *   npm run validate
 */
const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, 'dist');
const problems = [];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const pages = walk(DIST).filter((f) => f.endsWith('.html'));
const rel = (f) => path.relative(DIST, f).replace(/\\/g, '/');

function fail(file, msg) {
  problems.push(`${rel(file)}: ${msg}`);
}

for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');

  // 1. One H1 per page, heading order sanity
  const h1s = html.match(/<h1[\s>]/g) || [];
  if (h1s.length !== 1) fail(file, `expected exactly 1 <h1>, found ${h1s.length}`);

  // 2. Title & meta
  const title = html.match(/<title>(.*?)<\/title>/);
  if (!title || title[1].length < 20 || title[1].length > 75) fail(file, `title length issue (${title ? title[1].length : 0})`);
  const desc = html.match(/<meta name="description" content="(.*?)">/);
  if (!desc || desc[1].length < 70 || desc[1].length > 175) fail(file, `meta description length issue (${desc ? desc[1].length : 0})`);

  // 3. Canonical + OpenGraph
  if (!/<link rel="canonical" href="https?:\/\//.test(html)) fail(file, 'missing canonical');
  if (!html.includes('property="og:title"')) fail(file, 'missing og:title');
  if (!html.includes('property="og:url"')) fail(file, 'missing og:url');

  // 4. JSON-LD parses
  const ldBlocks = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/gs) || [];
  if (!ldBlocks.length) fail(file, 'no JSON-LD schema');
  for (const block of ldBlocks) {
    const json = block.replace(/^<script type="application\/ld\+json">/, '').replace(/<\/script>$/, '');
    try {
      const parsed = JSON.parse(json);
      if (JSON.stringify(parsed).includes('{city}')) fail(file, 'JSON-LD contains unfilled placeholder');
    } catch (e) {
      fail(file, `invalid JSON-LD: ${e.message}`);
    }
  }

  // 5. Unfilled placeholders (incl. dotted calls like {bookLabel.toLowerCase()})
  const leftover = html.match(/\{[a-zA-Z_][\w]*(?:[.\[][^\}]*)?\}/g) || [];
  if (leftover.length) fail(file, `unfilled placeholders: ${[...new Set(leftover)].slice(0, 6).join(', ')}`);

  // 6. Duplicate ids
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupes.length) fail(file, `duplicate ids: ${[...new Set(dupes)].join(', ')}`);

  // 7. Sticky CTAs + tap-to-call + site JS
  if (!/href="tel:\+1\d{10}"/.test(html)) fail(file, 'no valid tel: link');
  if (!html.includes('class="sticky-cta"')) fail(file, 'missing sticky CTA');
  if (!html.includes('data-open-modal')) fail(file, 'missing Book/Request modal trigger');
  if (!html.includes('src="/assets/main.js"')) fail(file, 'missing main.js script');

  // 8. Internal links resolve
  const links = [...html.matchAll(/(?:href|src)="(\/[^"]*)"/g)].map((m) => m[1]);
  for (const link of links) {
    const clean = link.split('#')[0].split('?')[0];
    if (!clean) continue;
    const target = path.join(DIST, clean);
    const ok =
      fs.existsSync(target) ||
      fs.existsSync(path.join(target, 'index.html')) ||
      fs.existsSync(target + '.html');
    if (!ok) fail(file, `broken internal link: ${link}`);
  }
}

// 9. Sitemap covers every page
const sitemap = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
for (const file of pages) {
  const urlPath = '/' + rel(file).replace(/index\.html$/, '');
  if (!sitemap.includes(urlPath)) fail(file, 'missing from sitemap.xml');
}

if (problems.length) {
  console.error(`✗ ${problems.length} problem(s):\n`);
  problems.forEach((p) => console.error('  - ' + p));
  process.exit(1);
} else {
  console.log(`✓ ${pages.length} pages validated — titles, meta, canonical, JSON-LD, ids, tel:/sticky CTAs, links and sitemap all OK.`);
}
