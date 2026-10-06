/** Site-wide modal that hosts the lead form (opened by "Book / Request" buttons). */
const { esc } = require('../lib/util');
const { leadForm } = require('./form');
const icons = require('./icons');

module.exports = function modal(ctx) {
  const cat = ctx.category;
  const bookLabel = cat ? cat.bookLabel : 'Request Service';

  return `
<div class="modal" id="lead-modal" hidden>
  <div class="modal__backdrop" data-close-modal></div>
  <div class="modal__dialog" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title">
    <button class="modal__close" type="button" data-close-modal aria-label="Close dialog">${icons.close(20)}</button>
    <div class="modal__head">
      <span class="modal__badge">${icons.calendar(16)}</span>
      <h2 id="lead-modal-title">${esc(bookLabel)}</h2>
      <p>60-second form. We call back fast—no obligation.</p>
    </div>
    ${leadForm(ctx, { id: 'modal-lead', showHeading: false })}
  </div>
</div>`;
};
