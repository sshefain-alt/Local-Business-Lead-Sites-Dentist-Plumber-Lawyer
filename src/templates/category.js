/** Category landing page template (/dentist/, /plumber/, /lawyer/). */
const { layout, fill, esc, attr } = require('../lib/html');
const s = require('../partials/sections');
const { leadForm } = require('../partials/form');
const schema = require('../lib/schema');
const { vars } = require('../lib/copy');
const { cities } = require('../../config');
const icons = require('../partials/icons');

const categoryIcons = { dentist: 'tooth', plumber: 'wrench', lawyer: 'scales' };

const whyPoints = [
  'Licensed & insured Texas professionals',
  'Upfront written pricing — approve before work starts',
  'Same-day and after-hours availability',
  'A real person answers the phone, 24/7',
];

function render(category) {
  const v = vars(category, null);
  const path = `/${category.slug}/`;
  const ctx = { path, category, city: null };
  const reviews = category.testimonials.slice(0, 4);

  const items = category.services.map((item) => ({
    name: item.name,
    desc: item.desc,
    icon: categoryIcons[category.id],
    accent: category.accent,
    tag: `Available in ${v.city} today`,
  }));

  const content = `
${s.breadcrumbs([{ name: 'Home', path: '/' }, { name: `${category.label} — ${category.businessName}`, path }])}
${s.hero(ctx, {
  eyebrow: `Serving the ${v.city} metro since ${v.founded}`,
  h1: fill(category.hero.h1, v),
  sub: fill(category.hero.sub, v),
  badge: category.hero.badge,
  vars: v,
  showNumber: true,
  chips: ['No obligation — free quote', '4.9★ local rating', '24/7 phone support'],
})}
${s.trustBar(
  category.stats.map((st) => ({ value: fill(st.value, v), label: fill(st.label, v) }))
)}
<section class="section about" aria-labelledby="about-h">
  <div class="container about__grid">
    <div class="about__copy">
      ${s.sectionHead('Who you are calling', fill(category.about.h, v), '', { id: 'about-h' })}
      <p>${esc(fill(category.about.p1, v))}</p>
      <p>${esc(fill(category.about.p2, v))}</p>
      <ul class="check-list">
        ${whyPoints.map((p) => `<li>${icons.check(17)} <span>${esc(p)}</span></li>`).join('')}
      </ul>
      <div class="btn-row">
        <a class="btn btn--call" href="tel:${attr(category.phone)}" data-track="call">${icons.phone(17)} <span>Call ${esc(category.phoneDisplay)}</span></a>
        <button class="btn btn--book" type="button" data-open-modal data-track="book">${icons.calendar(17)} <span>${esc(category.bookLabel)}</span></button>
      </div>
    </div>
    <div class="about__aside">
      <div class="info-card">
        <h3>${esc(category.businessName)}</h3>
        <ul class="info-card__list">
          <li>${icons.pin(17)} <span>${esc(category.address.street)}<br>${esc(category.address.city)}, ${esc(category.address.state)} ${esc(category.address.zip)}</span></li>
          <li>${icons.clock(17)} <span>${esc(category.hours)}</span></li>
          <li>${icons.mail(17)} <a href="mailto:${attr(category.email)}">${esc(category.email)}</a></li>
          <li>${icons.phone(17)} <a href="tel:${attr(category.phone)}">${esc(category.phoneDisplay)}</a></li>
        </ul>
      </div>
    </div>
  </div>
</section>
${s.serviceCards(ctx, {
  items,
  eyebrow: 'Our services',
  heading: `${category.label} services in ${v.city}`,
  sub: fill(category.cityServiceNote, v),
  anchor: 'services',
  vars: v,
  alt: true,
})}
${s.cityGrid(ctx)}
${s.testimonialsSection(ctx, {
  reviews,
  heading: `${category.label} reviews from ${v.city} neighbors`,
  sub: 'Verified clients, real results — read more on our reviews page.',
  anchor: 'reviews',
  alt: true,
})}
${s.faqSection(ctx, {
  items: category.faqs.map((f) => ({ q: fill(f.q, v), a: fill(f.a, v) })),
  heading: `${category.label} FAQ`,
  sub: fill(category.faqPageIntro, v),
  anchor: 'faq',
  openFirst: true,
})}
${s.ctaSection(ctx, {
  eyebrow: 'Ready when you are',
  heading: fill(category.cta.h, v),
  sub: fill(category.cta.sub, v),
  vars: v,
  form: leadForm(ctx, { id: `${category.slug}-lead` }),
})}`;

  return layout({
    path,
    title: fill(category.meta.categoryTitle, v),
    description: fill(category.meta.categoryDesc, v),
    content,
    schema: [
      schema.localBusiness(category, category.testimonials),
      s.serviceSchema({ category, citiesList: cities }),
      s.faqSchema(category.faqs.map((f) => ({ q: fill(f.q, v), a: fill(f.a, v) }))),
      s.breadcrumbSchema([{ name: 'Home', path: '/' }, { name: category.label, path }]),
    ],
    bodyClass: `page-category page-category--${category.accent}`,
  });
}

module.exports = { render };
