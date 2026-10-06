/**
 * Tiny static file server for previewing dist/ locally (clean URLs supported).
 *   npm run serve   →  http://localhost:8080
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, 'dist');
const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};

function resolvePath(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  let candidate = path.join(DIST, clean);
  if (!candidate.startsWith(DIST)) return null; // path traversal guard
  if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
    candidate = path.join(candidate, 'index.html');
  } else if (!fs.existsSync(candidate) && fs.existsSync(candidate + '.html')) {
    candidate = candidate + '.html';
  } else if (!fs.existsSync(candidate) && fs.existsSync(path.join(candidate, 'index.html'))) {
    candidate = path.join(candidate, 'index.html');
  }
  return fs.existsSync(candidate) ? candidate : null;
}

const server = http.createServer((req, res) => {
  const file = resolvePath(req.url || '/');
  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>404 — Not found</h1><p><a href="/">Back to home</a></p>');
    return;
  }
  const type = TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
  fs.createReadStream(file).pipe(res);
});

server.listen(PORT, () => {
  console.log(`Serving dist/ at http://localhost:${PORT}`);
});
