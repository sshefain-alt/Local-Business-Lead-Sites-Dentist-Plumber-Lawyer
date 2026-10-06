/**
 * Lead capture form (client-side validated) used on every page, the modal
 * and the contact page. Field ids are suffixed so a page can host two forms.
 */
const { esc, attr } = require('../lib/util');
const { site, cities } = require('../../config');
const icons = require('./icons');

/**
 * @param {object} ctx   page context ({ category, city, ... })
 * @param {object} opts  { id, heading, sub, showHeading, size }
 */
function leadForm(ctx, opts = {}) {
  const category = ctx.category;
  const id = opts.id || 'lead';
  const successMsg = category
    ? category.formSuccess
    : "Thanks! We'll contact you shortly.";
  const bookLabel = category ? category.bookLabel : 'Request Service';

  const serviceOptions = category
    ? category.services.map((s) => `<option value="${attr(s.name)}">${esc(s.name)}</option>`).join('')
    : ['Dental care', 'Plumbing', 'Legal help', 'Not sure — please advise'].map(
        (s) => `<option value="${attr(s)}">${esc(s)}</option>`
      ).join('');

  const cityOptions = cities
    .map((c) => `<option value="${attr(c.name)}">${esc(c.name)}</option>`)
    .join('');

  const heading = opts.heading || `${bookLabel} — It takes 60 seconds`;
  const sub =
    opts.sub ||
    'Tell us what you need and the best time to reach you. No obligation, no spam—ever.';

  return `
<div class="lead-form-wrap${opts.size === 'compact' ? ' lead-form-wrap--compact' : ''}" data-form-wrap="${attr(id)}">
  ${opts.showHeading === false ? '' : `<h2 class="lead-form__heading">${esc(heading)}</h2><p class="lead-form__sub">${esc(sub)}</p>`}
  <form class="lead-form" id="${attr(id)}" novalidate data-endpoint="${attr(site.formEndpoint)}" data-success="${attr(successMsg)}">
    <div class="form-grid">
      <div class="field">
        <label for="${attr(id)}-name">Full name <span class="req" aria-hidden="true">*</span></label>
        <input type="text" id="${attr(id)}-name" name="name" autocomplete="name" placeholder="Jane Smith" required aria-describedby="${attr(id)}-name-err">
        <p class="field-error" id="${attr(id)}-name-err" data-error-for="${attr(id)}-name" hidden></p>
      </div>
      <div class="field">
        <label for="${attr(id)}-phone">Phone number <span class="req" aria-hidden="true">*</span></label>
        <input type="tel" id="${attr(id)}-phone" name="phone" autocomplete="tel" inputmode="tel" placeholder="(512) 555-0123" required aria-describedby="${attr(id)}-phone-err">
        <p class="field-error" id="${attr(id)}-phone-err" data-error-for="${attr(id)}-phone" hidden></p>
      </div>
      <div class="field">
        <label for="${attr(id)}-email">Email <span class="optional">(optional)</span></label>
        <input type="email" id="${attr(id)}-email" name="email" autocomplete="email" placeholder="jane@example.com" aria-describedby="${attr(id)}-email-err">
        <p class="field-error" id="${attr(id)}-email-err" data-error-for="${attr(id)}-email" hidden></p>
      </div>
      <div class="field">
        <label for="${attr(id)}-service">Service needed</label>
        <select id="${attr(id)}-service" name="service">
          <option value="">Select a service</option>
          ${serviceOptions}
        </select>
      </div>
      <div class="field">
        <label for="${attr(id)}-city">City / area</label>
        <select id="${attr(id)}-city" name="city">
          <option value="">Select your city</option>
          ${cityOptions}
          <option value="Other / nearby area">Other / nearby area</option>
        </select>
      </div>
      <div class="field">
        <label for="${attr(id)}-time">Preferred contact time <span class="optional">(optional)</span></label>
        <select id="${attr(id)}-time" name="preferredTime">
          <option value="">No preference</option>
          <option>Morning (8am–11am)</option>
          <option>Midday (11am–2pm)</option>
          <option>Afternoon (2pm–5pm)</option>
          <option>Evening (5pm–8pm)</option>
        </select>
      </div>
      <div class="field field--full">
        <label for="${attr(id)}-notes">Notes <span class="optional">(optional)</span></label>
        <textarea id="${attr(id)}-notes" name="notes" rows="3" placeholder="Describe your situation, gate codes, best number to reach…"></textarea>
      </div>
    </div>
    <div class="form-actions">
      <button type="submit" class="btn btn--primary btn--lg">
        ${icons.calendar(18)} <span>${esc(bookLabel)}</span>
      </button>
      <a class="btn btn--call btn--lg" href="tel:${attr(category ? category.phone : site.phone)}" data-track="call">
        ${icons.phone(18)} <span>Call Now</span>
      </a>
    </div>
    <p class="form-note">${icons.shield(15)} Your details are encrypted and never sold. We reply within 30 minutes during business hours.</p>
    <p class="form-status" role="status" aria-live="polite" data-status></p>
  </form>
  <div class="form-success" data-form-success hidden tabindex="-1">
    <span class="form-success__icon">${icons.check(28)}</span>
    <h3>${esc(successMsg)}</h3>
    <p>Need us sooner? Call now at <a href="tel:${attr(category ? category.phone : site.phone)}">${esc(category ? category.phoneDisplay : site.phoneDisplay)}</a>.</p>
    <div class="form-success__actions">
      <button type="button" class="btn btn--ghost" data-form-reset>Send another request</button>
    </div>
  </div>
</div>`;
}

module.exports = { leadForm };
