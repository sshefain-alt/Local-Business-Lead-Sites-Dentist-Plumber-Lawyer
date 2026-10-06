/** Reusable FAQ page (/faq/) with accordion sections per category. */
const { layout, fill, esc } = require('../lib/html');
const { categories, hubFaqs } = require('../data/categories');
const s = require('../partials/sections');
const { leadForm } = require('../partials/form');
const schema = require('../lib/schema');
const { vars } = require('../lib/copy');
const { site } = require('../../config');

function render() {
  const v = vars(null, null);
  const path = '/faq/';
  const ctx = { path, category: null, city: null };

  const general = hubFaqs.map((f) => ({ q: fill(f.q, v), a: fill(f.a, v) }));

  const categoryBlocks = categories.map((cat) => {
    const cv = vars(cat, null);
    const items = cat.faqs.map((f) => ({ q: fill(f.q, cv), a: fill(f.a, cv) }));
    return `
<section class="section faq" id="${attrSlug(cat.slug)}" aria-labelledby="${attrSlug(cat.slug)}-h">
  <div class="container faq__inner">
    <div class="section-head section-head--left">
      <p class="eyebrow">${esc(cat.label)} questions</p>
      <h2 id="${attrSlug(cat.slug)}-h">${esc(cat.businessName)} — FAQ</h2>
      <p class="section-sub">${esc(fill(cat.faqPageIntro, cv))}</p>
      <p class="section-sub"><a class="link-arrow" href="/${attrSlug(cat.slug)}/">Visit the ${esc(cat.label)} page ${esc('→')}</a></p>
    </div>
    <div class="faq-list">
      ${items
        .map(
          (item, i) => `<details class="faq-item"${i === 0 ? ' open' : ''}>
        <summary><span>${esc(item.q)}</span><span class="faq-item__icon" aria-hidden="true">+</span></summary>
        <div class="faq-item__body"><p>${esc(item.a)}</p></div>
      </details>`
        )
        .join('')}
    </div>
  </div>
</section>`;
  }).join('\n');

  const content = `
${s.hero(ctx, {
  eyebrow: 'Help center',
  h1: `Frequently Asked Questions for ${site.metro.name} Clients`,
  sub: 'Straight answers about booking, pricing, response times and service areas for every service we offer.',
  vars: v,
  showNumber: true,
  chips: ['Answered by real staff', 'Updated for 2026', 'No jargon'],
})}
<section class="section faq section--alt" aria-labelledby="general-h">
  <div class="container faq__inner">
    <div class="section-head section-head--left">
      <p class="eyebrow">General</p>
      <h2 id="general-h">Working with ${esc(site.name)}</h2>
    </div>
    <div class="faq-list">
      ${general
        .map(
          (item, i) => `<details class="faq-item"${i === 0 ? ' open' : ''}>
        <summary><span>${esc(item.q)}</span><span class="faq-item__icon" aria-hidden="true">+</span></summary>
        <div class="faq-item__body"><p>${esc(item.a)}</p></div>
      </details>`
        )
        .join('')}
    </div>
  </div>
</section>
${categoryBlocks}
${s.ctaSection(ctx, {
  eyebrow: 'Still have a question?',
  heading: 'Ask us directly — a real person answers',
  sub: `Call the 24/7 intake line or send a message and we will reply within 30 minutes during business hours.`,
  vars: v,
  form: leadForm(ctx, { id: 'faq-lead' }),
})}`;

  const allItems = [
    ...general,
    ...categories.flatMap((cat) => {
      const cv = vars(cat, null);
      return cat.faqs.map((f) => ({ q: fill(f.q, cv), a: fill(f.a, cv) }));
    }),
  ];

  return layout({
    path,
    title: `FAQ | Dentist, Plumber & Lawyer Answers in ${site.metro.name}, TX`,
    description: `Answers to common questions about dentist, plumber and lawyer services in ${site.metro.name}, TX — pricing, response times and booking. Call ${site.phoneDisplay} or request service online.`,
    content,
    schema: [s.faqSchema(allItems), schema.organization(categories), s.breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'FAQ', path }])],
    bodyClass: 'page-faq',
  });
}

function attrSlug(slug) {
  return String(slug);
}

module.exports = { render };
