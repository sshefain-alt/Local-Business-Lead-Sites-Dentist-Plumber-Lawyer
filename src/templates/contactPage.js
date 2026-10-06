/** Contact / lead form page (/contact/). */
const { layout, fill, esc, attr } = require('../lib/html');
const { categories } = require('../data/categories');
const s = require('../partials/sections');
const { leadForm } = require('../partials/form');
const schema = require('../lib/schema');
const { vars } = require('../lib/copy');
const { site, cities } = require('../../config');
const icons = require('../partials/icons');

const steps = [
  { t: 'Send your request', d: 'The 60-second form goes straight to the local dispatch queue—or just call; a real person answers 24/7.' },
  { t: 'Get a fast callback', d: 'Most callbacks land within 30 minutes during business hours. Emergencies are routed to the on-call pro immediately.' },
  { t: 'Confirm your appointment', d: 'We confirm time, price and address up front—no surprises, no obligation to proceed.' },
];

function render() {
  const v = vars(null, null);
  const path = '/contact/';
  const ctx = { path, category: null, city: null };

  const businessCards = categories
    .map(
      (cat) => `<div class="contact-biz">
        <span class="contact-biz__icon">${icons[cat.id === 'dentist' ? 'tooth' : cat.id === 'plumber' ? 'wrench' : 'scales'](20)}</span>
        <div>
          <h3>${esc(cat.label)} — ${esc(cat.businessName)}</h3>
          <p><a href="tel:${attr(cat.phone)}">${esc(cat.phoneDisplay)}</a> · <a href="mailto:${attr(cat.email)}">${esc(cat.email)}</a></p>
          <p class="muted">${esc(cat.hours)}</p>
          <a class="btn btn--book btn--sm" href="/${attr(cat.slug)}/">${icons.arrow(14)} <span>${esc(cat.bookLabel)} page</span></a>
        </div>
      </div>`
    )
    .join('');

  const content = `
${s.hero(ctx, {
  eyebrow: 'Contact & booking',
  h1: `Contact Us — Book or Call Now in ${site.metro.name}`,
  sub: 'Fill in the form and we call you back fast. Prefer to talk? Every number below reaches a live person, 24/7.',
  vars: v,
  showNumber: true,
  chips: ['Reply within 30 minutes', 'No spam, ever', 'Free estimates & consultations'],
})}
<section class="section contact" aria-labelledby="contact-h">
  <div class="container contact__grid">
    <div class="contact__form" id="lead-form">
      ${s.sectionHead('Send a request', 'Tell us what you need', 'Required fields: name and phone. Everything else helps us route you faster.', { id: 'contact-h' })}
      ${leadForm(ctx, { id: 'contact-lead' })}
    </div>
    <aside class="contact__info">
      <div class="info-card">
        <h3>${esc(site.name)} intake</h3>
        <ul class="info-card__list">
          <li>${icons.phone(17)} <a href="tel:${attr(site.phone)}">${esc(site.phoneDisplay)}</a></li>
          <li>${icons.mail(17)} <a href="mailto:${attr(site.email)}">${esc(site.email)}</a></li>
          <li>${icons.pin(17)} <span>${esc(site.address.street)}<br>${esc(site.address.city)}, ${esc(site.address.state)} ${esc(site.address.zip)}</span></li>
          <li>${icons.clock(17)} <span>${esc(site.hours)}</span></li>
        </ul>
      </div>
      <div class="info-card">
        <h3>Direct lines</h3>
        ${businessCards}
      </div>
    </aside>
  </div>
</section>
<section class="section section--alt" aria-labelledby="next-h">
  <div class="container">
    ${s.sectionHead('What happens next', 'Three simple steps to booked', '', { id: 'next-h', center: true })}
    <div class="card-grid card-grid--3">
      ${steps
        .map(
          (st, i) => `<article class="card card--step">
            <span class="step-num">${i + 1}</span>
            <h3>${esc(st.t)}</h3>
            <p>${esc(st.d)}</p>
          </article>`
        )
        .join('')}
    </div>
  </div>
</section>
${s.cityGrid(ctx)}`;

  return layout({
    path,
    title: `Contact & Book | ${site.name} — ${site.metro.name}, TX | Call ${site.phoneDisplay}`,
    description: `Request service with ${site.name} in ${site.metro.name}, TX. Send the 60-second lead form or call ${site.phoneDisplay} now — a real person answers 24/7.`,
    content,
    schema: [
      schema.organization(categories),
      s.breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path }]),
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: `Contact ${site.name}`,
        url: s.absoluteUrl(path),
        telephone: site.phone,
        email: site.email,
      },
    ],
    bodyClass: 'page-contact',
  });
}

module.exports = { render };
