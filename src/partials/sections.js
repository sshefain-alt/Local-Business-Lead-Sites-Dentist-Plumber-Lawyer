/** Reusable page sections: hero, trust stats, services, testimonials, FAQ, CTA. */
const { esc, attr, fill, absoluteUrl, breadcrumbSchema } = require('../lib/util');
const { site, cities } = require('../../config');
const icons = require('./icons');

/* ---------- stars & schema helpers ---------- */

function stars(rating = 5) {
  const full = Math.round(rating);
  return `<span class="stars" role="img" aria-label="${rating} out of 5 stars">${Array.from({ length: 5 }, (_, i) =>
    `<svg class="star${i < full ? '' : ' star--empty'}" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9L12 2.6z"/></svg>`
  ).join('')}</span>`;
}

/** Review/aggregateRating schema fragments attached to LocalBusiness nodes. */
function reviewSchemaParts(reviews, businessName) {
  if (!reviews || !reviews.length) return {};
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  return {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avg,
      reviewCount: reviews.length,
      bestRating: 5,
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.text,
      name: `${r.service || 'Service'} review`,
      itemReviewed: { '@type': 'LocalBusiness', name: businessName },
    })),
  };
}

function faqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

function serviceSchema({ category, citiesList }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: category.profession,
    name: `${category.label} services — ${category.businessName}`,
    provider: { '@type': 'LocalBusiness', name: category.businessName },
    areaServed: (citiesList || cities).map((c) => ({ '@type': 'City', name: c.name })),
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: { '@type': 'ContactPoint', telephone: category.phone, contactType: 'reservations' },
    },
  };
}

/* ---------- sections ---------- */

function sectionHead(eyebrow, heading, sub, opts = {}) {
  return `<div class="section-head${opts.center ? ' section-head--center' : ''}">
    ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
    <h2${opts.id ? ` id="${attr(opts.id)}"` : ''}>${esc(heading)}</h2>
    ${sub ? `<p class="section-sub">${esc(sub)}</p>` : ''}
  </div>`;
}

function ctaButtonRow(ctx, opts = {}) {
  const cat = ctx.category;
  const phone = cat ? cat.phone : site.phone;
  const bookLabel = cat ? cat.bookLabel : 'Request Service';
  return `<div class="btn-row">
    <a class="btn btn--call btn--lg" href="tel:${attr(phone)}" data-track="call">${icons.phone(18)} <span>Call Now${opts.showNumber && cat ? ` — ${esc(cat.phoneDisplay)}` : ''}</span></a>
    <button class="btn btn--book btn--lg" type="button" data-open-modal data-track="book">${icons.calendar(18)} <span>${esc(bookLabel)}</span></button>
  </div>`;
}

function hero(ctx, opts) {
  const cat = ctx.category;
  const city = ctx.city;
  const chips = opts.chips || [];
  return `
<section class="hero${opts.className ? ' ' + opts.className : ''}">
  <div class="container hero__grid">
    <div class="hero__copy">
      ${opts.eyebrow ? `<p class="hero__eyebrow">${esc(fill(opts.eyebrow, opts.vars || {}))}</p>` : ''}
      ${opts.badge ? `<p class="pill">${icons.badge(15)} ${esc(fill(opts.badge, opts.vars || {}))}</p>` : ''}
      <h1>${esc(fill(opts.h1, opts.vars || {}))}</h1>
      <p class="hero__sub">${esc(fill(opts.sub, opts.vars || {}))}</p>
      ${ctaButtonRow(ctx, { showNumber: opts.showNumber })}
      ${chips.length ? `<ul class="hero__chips">${chips.map((c) => `<li>${icons.check(15)} ${esc(fill(c, opts.vars || {}))}</li>`).join('')}</ul>` : ''}
    </div>
    <aside class="hero__card" aria-label="Quick info">
      <div class="hero__card-head">
        ${cat ? `<span class="hero__card-badge hero__card-badge--${attr(cat.accent)}">${icons[cat.id === 'dentist' ? 'tooth' : cat.id === 'plumber' ? 'wrench' : 'scales'](22)}</span>` : icons.phone(22)}
        <div>
          <strong>${esc(cat ? cat.businessName : site.name)}</strong>
          <span>${esc(city ? `Serving ${city.name} & nearby` : site.metro.name + ' metro')}</span>
        </div>
      </div>
      <ul class="hero__card-list">
        <li>${icons.clock(17)} <span><strong>${esc(cat ? cat.hours : site.hours)}</strong></span></li>
        <li>${icons.star(17)} <span><strong>4.9★</strong> from ${esc(cat ? '600+ local' : '1,800+')} reviews</span></li>
        <li>${icons.shield(17)} <span><strong>Licensed &amp; insured</strong> — Texas certified</span></li>
        <li>${icons.pin(17)} <span><strong>${esc(cities.length)} cities</strong> covered across ${esc(site.metro.name)}</span></li>
      </ul>
      <a class="btn btn--call btn--block" href="tel:${attr(cat ? cat.phone : site.phone)}" data-track="call">${icons.phone(18)} <span>Call Now — ${esc(cat ? cat.phoneDisplay : site.phoneDisplay)}</span></a>
      <button class="btn btn--book btn--block" type="button" data-open-modal data-track="book">${icons.calendar(18)} <span>${esc(cat ? cat.bookLabel : 'Request Service')}</span></button>
    </aside>
  </div>
  <div class="hero__glow" aria-hidden="true"></div>
</section>`;
}

function trustBar(stats) {
  return `
<section class="trust" aria-label="Trust indicators">
  <div class="container">
    <ul class="trust__grid">
      ${stats
        .map(
          (s) => `<li class="trust__item"><strong>${esc(fill(s.value, s.vars || {}))}</strong><span>${esc(fill(s.label, s.vars || {}))}</span></li>`
        )
        .join('')}
    </ul>
  </div>
</section>`;
}

function serviceCards(ctx, opts = {}) {
  const cat = ctx.category;
  const items = opts.items || [];
  return `
<section class="section services${opts.alt ? ' section--alt' : ''}" ${opts.anchor ? `id="${attr(opts.anchor)}"` : ''} aria-labelledby="${attr(opts.anchor ? opts.anchor + '-h' : 'services-h')}">
  <div class="container">
    ${sectionHead(opts.eyebrow || 'What we do', opts.heading, opts.sub, { id: opts.anchor ? opts.anchor + '-h' : 'services-h', center: true })}
    <div class="card-grid card-grid--${Math.min(items.length, 3)}">
      ${items
        .map((item) => {
          const icon = item.icon || (cat ? (cat.id === 'dentist' ? 'tooth' : cat.id === 'plumber' ? 'wrench' : 'scales') : 'badge');
          const href = item.href || '#lead-form';
          const isLink = href.startsWith('/');
          return `<article class="card">
            <span class="card__icon card__icon--${attr(item.accent || (cat ? cat.accent : 'default'))}">${icons[icon] ? icons[icon](24) : icons.badge(24)}</span>
            <h3>${esc(item.name)}</h3>
            <p>${esc(fill(item.desc, opts.vars || {}))}</p>
            ${item.tag ? `<p class="card__tag">${esc(fill(item.tag, opts.vars || {}))}</p>` : ''}
            <div class="card__actions">
              <button class="btn btn--book btn--sm" type="button" data-open-modal data-track="book" data-service="${attr(item.dataService || item.name || '')}">${icons.calendar(15)} <span>${esc(cat ? cat.bookLabelShort : 'Book')}</span></button>
              <a class="link-arrow" href="${attr(href)}">${isLink ? 'View details' : 'Get help now'} ${icons.arrow(15)}</a>
            </div>
          </article>`;
        })
        .join('')}
    </div>
  </div>
</section>`;
}

function testimonialsSection(ctx, opts = {}) {
  const cat = ctx.category;
  const reviews = opts.reviews || [];
  const id = opts.anchor || 'reviews';
  return `
<section class="section testimonials${opts.alt ? ' section--alt' : ''}" id="${attr(id)}" aria-labelledby="${attr(id)}-h">
  <div class="container">
    ${sectionHead(opts.eyebrow || 'Real local reviews', opts.heading || 'What neighbors say', opts.sub, { id: id + '-h', center: true })}
    <div class="card-grid card-grid--3 testimonial-grid">
      ${reviews
        .map(
          (r) => `<figure class="testimonial">
        <div class="testimonial__top">${stars(r.rating)}<span class="testimonial__service">${esc(r.service || (cat ? cat.label : 'Service'))}</span></div>
        <blockquote><p>${esc(r.text)}</p></blockquote>
        <figcaption><strong>${esc(r.name)}</strong><span>${icons.pin(14)} ${esc(r.area)}</span></figcaption>
      </figure>`
        )
        .join('')}
    </div>
    <div class="section-foot">
      <a class="btn btn--ghost" href="/testimonials/">Read all reviews ${icons.arrow(15)}</a>
      ${opts.showCta === false ? '' : ctaButtonRow(ctx)}
    </div>
  </div>
</section>`;
}

function faqSection(ctx, opts = {}) {
  const items = opts.items || [];
  const id = opts.anchor || 'faq';
  return `
<section class="section faq${opts.alt ? ' section--alt' : ''}" id="${attr(id)}" aria-labelledby="${attr(id)}-h">
  <div class="container faq__inner">
    ${sectionHead(opts.eyebrow || 'FAQ', opts.heading || 'Frequently asked questions', opts.sub, { id: id + '-h', center: true })}
    <div class="faq-list">
      ${items
        .map(
          (item, i) => `<details class="faq-item"${i === 0 && opts.openFirst ? ' open' : ''}>
        <summary><span>${esc(item.q)}</span><span class="faq-item__icon" aria-hidden="true">${icons.chevron(18)}</span></summary>
        <div class="faq-item__body"><p>${esc(fill(item.a, opts.vars || {}))}</p></div>
      </details>`
        )
        .join('')}
    </div>
    <div class="section-foot">
      ${ctaButtonRow(ctx)}
      ${opts.hideMore ? '' : `<a class="btn btn--ghost" href="/faq/">See all FAQs ${icons.arrow(15)}</a>`}
    </div>
  </div>
</section>`;
}

function ctaSection(ctx, opts = {}) {
  const cat = ctx.category;
  return `
<section class="cta-band" aria-labelledby="cta-band-h">
  <div class="container cta-band__inner">
    <div class="cta-band__copy">
      <p class="eyebrow eyebrow--light">${esc(opts.eyebrow || 'Ready when you are')}</p>
      <h2 id="cta-band-h">${esc(fill(opts.heading, opts.vars || {}))}</h2>
      <p>${esc(fill(opts.sub, opts.vars || {}))}</p>
      ${ctaButtonRow(ctx, { showNumber: true })}
    </div>
    <div class="cta-band__form" id="lead-form">
      ${opts.form || ''}
    </div>
  </div>
</section>`;
}

function breadcrumbs(items) {
  return `
<nav class="breadcrumbs" aria-label="Breadcrumb">
  <div class="container">
    <ol>
      ${items
        .map((item, i) =>
          i === items.length - 1
            ? `<li aria-current="page">${esc(item.name)}</li>`
            : `<li><a href="${attr(item.path)}">${esc(item.name)}</a></li>`
        )
        .join('<li class="sep" aria-hidden="true">/</li>')}
    </ol>
  </div>
</nav>`;
}

function cityGrid(ctx) {
  const cat = ctx.category;
  const currentSlug = ctx.city ? ctx.city.slug : null;
  return `
<section class="section areas section--alt" id="service-areas" aria-labelledby="service-areas-h">
  <div class="container">
    ${sectionHead('Service areas', `Proudly serving ${site.metro.name} and beyond`, 'Every city below has a dedicated local page with its own team, response times and FAQs.', { id: 'service-areas-h', center: true })}
    <ul class="city-grid">
      ${cities
        .map((c) => {
          const active = cat && c.slug === currentSlug;
          if (cat) {
            const href = `/${cat.slug}/${c.slug}/`;
            return `<li><a${active ? ' aria-current="page"' : ''} href="${attr(href)}">${icons.pin(15)} ${esc(c.name)} <span>${esc(cat.label)}</span></a></li>`;
          }
          return `<li class="city-grid__multi"><span class="city-grid__name">${icons.pin(15)} ${esc(c.name)}</span>
            <span class="city-grid__links"><a href="/dentist/${attr(c.slug)}/">Dentist</a><a href="/plumber/${attr(c.slug)}/">Plumber</a><a href="/lawyer/${attr(c.slug)}/">Lawyer</a></span></li>`;
        })
        .join('')}
    </ul>
  </div>
</section>`;
}

module.exports = {
  stars,
  reviewSchemaParts,
  faqSchema,
  serviceSchema,
  sectionHead,
  ctaButtonRow,
  hero,
  trustBar,
  serviceCards,
  testimonialsSection,
  faqSection,
  ctaSection,
  breadcrumbs,
  cityGrid,
  absoluteUrl,
  breadcrumbSchema,
};
