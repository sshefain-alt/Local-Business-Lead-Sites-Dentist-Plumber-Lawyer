/**
 * Page layout (full HTML document) + re-exported helpers.
 */
const { esc, attr, fill, jsonLd, absoluteUrl, breadcrumbSchema } = require('./util');
const header = require('../partials/header');
const footer = require('../partials/footer');
const sticky = require('../partials/sticky');
const modal = require('../partials/modal');
const { site } = require('../../config');

/**
 * Render a full HTML document.
 * ctx: { path, title, description, content, schema: [], bodyClass, ogType }
 */
function layout(ctx) {
  const canonical = absoluteUrl(ctx.path);
  const schemaTags = (ctx.schema || []).map(jsonLd).join('\n');
  const gaTag = site.gaMeasurementId
    ? `<script defer src="https://www.googletagmanager.com/gtag/js?id=${attr(site.gaMeasurementId)}"></script>` +
      `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${attr(site.gaMeasurementId)}');</script>`
    : '';

  const pageCtx = { ...ctx, canonical };

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(ctx.title)}</title>
<meta name="description" content="${attr(ctx.description)}">
<link rel="canonical" href="${attr(canonical)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#0b1b33">
<meta property="og:site_name" content="${attr(site.name)}">
<meta property="og:type" content="${attr(ctx.ogType || 'website')}">
<meta property="og:locale" content="en_US">
<meta property="og:title" content="${attr(ctx.title)}">
<meta property="og:description" content="${attr(ctx.description)}">
<meta property="og:url" content="${attr(canonical)}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${attr(ctx.title)}">
<meta name="twitter:description" content="${attr(ctx.description)}">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/styles.css">
<script defer src="/assets/main.js"></script>
${gaTag}
${schemaTags}
</head>
<body${ctx.bodyClass ? ` class="${attr(ctx.bodyClass)}"` : ''}>
<a class="skip-link" href="#main">Skip to main content</a>
${header(pageCtx)}
<main id="main">
${ctx.content}
</main>
${footer(pageCtx)}
${sticky(pageCtx)}
${modal(pageCtx)}
</body>
</html>
`;
}

module.exports = { esc, attr, fill, jsonLd, absoluteUrl, breadcrumbSchema, layout };
