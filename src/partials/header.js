/** Site header: sticky bar, nav, phone CTA, mobile menu. */
const { esc, attr } = require('../lib/util');
const { site } = require('../../config');
const icons = require('./icons');

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Dentist', path: '/dentist/' },
  { label: 'Plumber', path: '/plumber/' },
  { label: 'Lawyer', path: '/lawyer/' },
  { label: 'Reviews', path: '/testimonials/' },
  { label: 'FAQ', path: '/faq/' },
  { label: 'Contact', path: '/contact/' },
];

module.exports = function header(ctx) {
  const cat = ctx.category;
  const phone = cat ? cat.phone : site.phone;
  const phoneDisplay = cat ? cat.phoneDisplay : site.phoneDisplay;
  const current = ctx.path;

  const links = navLinks
    .map((l) => {
      const active = l.path === current || (l.path !== '/' && current.startsWith(l.path));
      return `<li><a href="${attr(l.path)}"${active ? ' aria-current="page"' : ''}>${esc(l.label)}</a></li>`;
    })
    .join('');

  return `
<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="/" aria-label="${attr(site.name)} — home">
      ${icons.logo()}
      <span class="brand__text"><strong>${esc(site.name)}</strong><small>${esc(site.tagline)}</small></span>
    </a>
    <nav class="nav" aria-label="Main">
      <ul class="nav__list" id="nav-list">${links}</ul>
    </nav>
    <div class="header-cta">
      <a class="btn btn--call btn--sm" href="tel:${attr(phone)}" data-track="call">
        ${icons.phone(16)} <span>${esc(phoneDisplay)}</span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-list" aria-label="Open menu">
        ${icons.menu(22)}
      </button>
    </div>
  </div>
</header>`;
};
