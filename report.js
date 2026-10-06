/** Content uniqueness report (development helper). */
const fs = require('fs');
const path = require('path');

function walk(p, out = []) {
  const st = fs.statSync(p);
  if (st.isDirectory()) for (const e of fs.readdirSync(p)) walk(path.join(p, e), out);
  else if (p.endsWith('.html')) out.push(p);
  return out;
}

const files = walk(path.join(__dirname, 'dist'));
const h1s = [];
const descs = [];
const titles = [];
const paras = {};

for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  h1s.push((s.match(/<h1[^>]*>(.*?)<\/h1>/s) || [])[1]);
  descs.push((s.match(/<meta name="description" content="(.*?)">/) || [])[1]);
  titles.push((s.match(/<title>(.*?)<\/title>/) || [])[1]);
  const isCityPage = /dist[/\\][a-z-]+[/\\][a-z-]+[/\\]index\.html$/.test(f);
  if (isCityPage) {
    for (const m of s.matchAll(/<p>([^<]{120,})<\/p>/g)) {
      (paras[m[1]] = paras[m[1]] || []).push(f);
    }
  }
}

console.log('pages:', files.length);
console.log('unique h1:', new Set(h1s).size, '| unique titles:', new Set(titles).size, '| unique descriptions:', new Set(descs).size);

const dupes = Object.entries(paras).filter(([, v]) => new Set(v).size > 1);
console.log('duplicate long paragraphs across city pages:', dupes.length);
for (const [k, v] of dupes.slice(0, 6)) {
  console.log(' -', v.map((x) => x.replace(/^.*dist./, '').replace('/index.html', '')).join(' , '), '::', k.slice(0, 70));
}
