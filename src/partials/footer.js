/** Site footer: contact block, service links, city list, legal. */
const { esc, attr } = require('../lib/util');
const { site, cities } = require('../../config');
const icons = require('./icons');

module.exports = function footer(ctx) {
  const cat = ctx.category;
  const year = new Date().getFullYear();
  // Context-aware city links: inside a category, link that category's city page.
  const cityHref = (c) => (cat ? `/${cat.slug}/${c.slug}/` : '/#service-areas');

  const cityLinks = cities
    .map(
      (c) =>
        `<li><a href="${attr(cityHref(c))}">${esc(c.name)}${cat ? ` ${esc(cat.label.toLowerCase())}` : ''}</a></li>`
    )
    .join('');

  return `
<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-col footer-col--brand">
      <a class="brand brand--footer" href="/">${icons.logo()}<span class="brand__text"><strong>${esc(site.name)}</strong></span></a>
      <p class="footer-about">Fast, friendly local pros for ${esc(site.metro.name)} and surrounding communities. Live phone intake 24/7.</p>
      <p class="footer-contact">
        ${icons.phone(16)} <a href="tel:${attr(cat ? cat.phone : site.phone)}">${esc(cat ? cat.phoneDisplay : site.phoneDisplay)}</a><br>
        ${icons.mail(16)} <a href="mailto:${attr(cat ? cat.email : site.email)}">${esc(cat ? cat.email : site.email)}</a><br>
        ${icons.pin(16)} <span>${esc((cat ? cat.address : site.address).street)}, ${esc((cat ? cat.address : site.address).city)}, ${esc((cat ? cat.address : site.address).state)} ${esc((cat ? cat.address : site.address).zip)}</span>
      </p>
    </div>
    <div class="footer-col">
      <h3 class="footer-heading">Services</h3>
      <ul class="footer-list">
        <li><a href="/dentist/">Dentist — emergency &amp; family care</a></li>
        <li><a href="/plumber/">Plumber — 24/7 repairs</a></li>
        <li><a href="/lawyer/">Lawyer — free consultation</a></li>
        <li><a href="/testimonials/">Client reviews</a></li>
        <li><a href="/faq/">FAQ</a></li>
        <li><a href="/contact/">Contact &amp; booking</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h3 class="footer-heading">Service Areas</h3>
      <ul class="footer-list footer-list--cities">${cityLinks}</ul>
    </div>
    <div class="footer-col">
      <h3 class="footer-heading">Hours</h3>
      <ul class="footer-list">
        <li>${esc(cat ? cat.hours : site.hours)}</li>
        <li>Phone answered 7 days a week</li>
        <li>Emergencies routed immediately</li>
      </ul>
      <a class="btn btn--book btn--sm" href="/contact/" data-track="book">${icons.calendar(16)} <span>${esc(cat ? cat.bookLabel : 'Request Service')}</span></a>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="container footer-bottom-inner">
      <p>&copy; ${year} ${esc(site.name)}. All rights reserved.</p>
      <p>Serving ${esc(site.metro.name)} metro · ${esc(cities.length)} cities and growing</p>
    </div>
  </div>
</footer>`;
};
