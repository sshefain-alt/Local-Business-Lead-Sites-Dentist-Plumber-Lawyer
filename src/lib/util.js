/**
 * Pure HTML/text helpers — no partial imports, so they are safe to require
 * from anywhere (avoids circular dependencies with the layout).
 */
const { site } = require('../../config');

/** Escape text for safe HTML output. */
function esc(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Escape text for use inside an HTML attribute. */
function attr(value) {
  return esc(value);
}

/** Interpolate {placeholders} in a string. */
function fill(str, vars = {}) {
  return String(str).replace(/\{(\w+)\}/g, (match, key) => {
    if (Object.prototype.hasOwnProperty.call(vars, key)) {
      const val = vars[key];
      return val == null ? '' : String(val);
    }
    return match;
  });
}

/** Serialize a schema object to a JSON-LD script tag. */
function jsonLd(obj) {
  const json = JSON.stringify(obj, null, 0).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">${json}</script>`;
}

/** Absolute URL for a site path. */
function absoluteUrl(path) {
  const p = String(path || '/');
  return site.url.replace(/\/$/, '') + (p === '/' ? '/' : p.replace(/\/$/, '') + '/');
}

/** BreadcrumbList schema builder. items: [{name, path}] */
function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

module.exports = { esc, attr, fill, jsonLd, absoluteUrl, breadcrumbSchema };
