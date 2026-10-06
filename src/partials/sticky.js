/** Always-visible sticky CTAs: Call Now (tel:) + Book/Request (opens modal). */
const { esc, attr } = require('../lib/util');
const { site } = require('../../config');
const icons = require('./icons');

module.exports = function sticky(ctx) {
  const cat = ctx.category;
  const phone = cat ? cat.phone : site.phone;
  const phoneDisplay = cat ? cat.phoneDisplay : site.phoneDisplay;
  const bookLabel = cat ? cat.bookLabel : 'Request Service';
  const bookShort = cat ? cat.bookLabelShort : 'Request';

  return `
<div class="sticky-cta" role="region" aria-label="Quick contact">
  <a class="sticky-cta__call" href="tel:${attr(phone)}" data-track="call">
    ${icons.phone(20)}<span class="sticky-cta__label">Call Now</span><span class="sticky-cta__num">${esc(phoneDisplay)}</span>
  </a>
  <button class="sticky-cta__book" type="button" data-open-modal data-track="book">
    ${icons.calendar(20)}<span class="sticky-cta__label">${esc(bookShort)}</span><span class="sticky-cta__num">${esc(bookLabel)}</span>
  </button>
</div>`;
};
