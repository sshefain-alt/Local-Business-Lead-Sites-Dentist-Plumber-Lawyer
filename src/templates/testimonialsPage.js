/** Testimonials page (/testimonials/). */
const { layout, fill, esc, attr, absoluteUrl } = require('../lib/html');
const { categories } = require('../data/categories');
const s = require('../partials/sections');
const { leadForm } = require('../partials/form');
const schema = require('../lib/schema');
const { vars } = require('../lib/copy');
const { site } = require('../../config');

function render() {
  const v = vars(null, null);
  const path = '/testimonials/';
  const ctx = { path, category: null, city: null };

  const blocks = categories.map((cat) => {
    const cv = vars(cat, null);
    return `
<section class="section testimonials" id="${attr(cat.slug)}" aria-labelledby="${attr(cat.slug)}-h">
  <div class="container">
    <div class="section-head section-head--left">
      <p class="eyebrow">${esc(cat.label)} reviews</p>
      <h2 id="${attr(cat.slug)}-h">${esc(cat.businessName)}</h2>
      <p class="section-sub">4.9★ average · ${esc(cat.testimonials.length)} recent clients from the ${esc(site.metro.name)} area</p>
      <p class="section-sub"><a class="link-arrow" href="/${attr(cat.slug)}/">Visit the ${esc(cat.label)} page →</a></p>
    </div>
    <div class="card-grid card-grid--3 testimonial-grid">
      ${cat.testimonials
        .map(
          (r) => `<figure class="testimonial">
        <div class="testimonial__top">${s.stars(r.rating)}<span class="testimonial__service">${esc(r.service)}</span></div>
        <blockquote><p>${esc(r.text)}</p></blockquote>
        <figcaption><strong>${esc(r.name)}</strong><span>${esc(r.area)}</span></figcaption>
      </figure>`
        )
        .join('')}
    </div>
    <div class="section-foot">
      <a class="btn btn--book" href="/${attr(cat.slug)}/" data-track="book">${esc(cat.bookLabel)} with ${esc(cat.label)}</a>
      <a class="btn btn--call" href="tel:${attr(cat.phone)}" data-track="call">Call ${esc(cat.phoneDisplay)}</a>
    </div>
  </div>
</section>`;
  }).join('\n');

  const content = `
${s.hero(ctx, {
  eyebrow: 'Verified client stories',
  h1: `What ${site.metro.name} Clients Say About Our Local Pros`,
  sub: 'Real reviews from dental, plumbing and legal clients across the metro — and a look at how we handle every call.',
  vars: v,
  showNumber: true,
  chips: ['4.9★ average rating', '1,800+ reviews', 'Responds within 30 minutes'],
})}
${blocks}
${s.ctaSection(ctx, {
  eyebrow: 'Your turn',
  heading: 'Ready to see why the reviews are so strong?',
  sub: 'Call now or send a request — most callbacks happen within 30 minutes.',
  vars: v,
  form: leadForm(ctx, { id: 'reviews-lead' }),
})}`;

  const allReviews = categories.flatMap((cat) =>
    cat.testimonials.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.text,
      name: `${r.service} — ${cat.label}`,
      itemReviewed: { '@type': 'LocalBusiness', name: cat.businessName },
      url: absoluteUrl(`/${cat.slug}/`),
    }))
  );

  return layout({
    path,
    title: `Client Reviews | Dentist, Plumber & Lawyer Testimonials in ${site.metro.name}, TX`,
    description: `Read 4.9★ reviews from ${site.metro.name} clients of our dentist, plumber and lawyer partners. Call ${site.phoneDisplay} now or request service online.`,
    content,
    schema: [
      { '@context': 'https://schema.org', '@type': 'ItemList', numberOfItems: allReviews.length, itemListElement: allReviews.map((r, i) => ({ '@type': 'ListItem', position: i + 1, item: r })) },
      s.breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Reviews', path }]),
    ],
    bodyClass: 'page-reviews',
  });
}

module.exports = { render };
