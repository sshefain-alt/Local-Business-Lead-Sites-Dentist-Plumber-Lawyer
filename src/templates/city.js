/** Service-area page template (/{category}/{city}/). */
const { layout, fill, esc, attr } = require('../lib/html');
const s = require('../partials/sections');
const { leadForm } = require('../partials/form');
const schema = require('../lib/schema');
const { vars, cityIntro, cityTestimonials, cityFaq, cityHero, servingLine, cityIndexFor } = require('../lib/copy');
const allCities = require('../data/cities');
const { cities } = require('../../config');
const icons = require('../partials/icons');

const categoryIcons = { dentist: 'tooth', plumber: 'wrench', lawyer: 'scales' };

function render(category, city) {
  const v = vars(category, city);
  const path = `/${category.slug}/${city.slug}/`;
  const ctx = { path, category, city };
  const idx = cityIndexFor(city);
  const heroCopy = cityHero(category, city);
  const intro = cityIntro(category, city, idx);
  const reviews = cityTestimonials(category, city, idx);
  const faqs = cityFaq(category, city);

  const serviceItems = category.services.map((item) => ({
    name: item.name,
    desc: item.desc,
    icon: categoryIcons[category.id],
    accent: category.accent,
    tag: `Booked in ${city.name} daily`,
  }));

  const content = `
${s.breadcrumbs([
  { name: 'Home', path: '/' },
  { name: category.label, path: `/${category.slug}/` },
  { name: `${category.label} in ${city.name}`, path },
])}
${s.hero(ctx, {
  eyebrow: `${category.businessName} · ${city.county}`,
  h1: heroCopy.h1,
  sub: heroCopy.sub,
  badge: heroCopy.badge,
  vars: v,
  showNumber: true,
  chips: [
    `Serving all of ${city.name}`,
    'Same-week availability',
    'Free estimate / consultation',
  ],
})}
<section class="serving" aria-labelledby="serving-h">
  <div class="container serving__inner">
    <div>
      <p class="eyebrow eyebrow--light">Local coverage</p>
      <h2 id="serving-h">Serving ${esc(city.name)} and nearby areas</h2>
      <p>${esc(servingLine(category, city))}</p>
      <ul class="chip-row">
        ${[city.name, ...city.nearby].map((n) => `<li>${icons.pin(14)} ${esc(n)}</li>`).join('')}
      </ul>
      <ul class="chip-row chip-row--soft">
        ${city.neighborhoods.map((n) => `<li>${esc(n)}</li>`).join('')}
      </ul>
    </div>
    <div class="serving__cta">
      <a class="btn btn--call btn--lg btn--block" href="tel:${attr(category.phone)}" data-track="call">${icons.phone(18)} <span>Call Now — ${esc(category.phoneDisplay)}</span></a>
      <button class="btn btn--book btn--lg btn--block" type="button" data-open-modal data-track="book">${icons.calendar(18)} <span>${esc(category.bookLabel)}</span></button>
      <p>${icons.clock(15)} ${esc(category.hours)}</p>
    </div>
  </div>
</section>
<section class="section about" aria-labelledby="local-h">
  <div class="container about__grid">
    <div class="about__copy">
      ${s.sectionHead('Local team, local knowledge', `${category.label} in ${city.name} — what to expect`, '', { id: 'local-h' })}
      <p>${esc(intro[0])}</p>
      <p>${esc(intro[1])}</p>
      <ul class="check-list">
        <li>${icons.check(17)} <span>${esc(city.driveNote)}</span></li>
        <li>${icons.check(17)} <span>Appointments built around ${esc(city.name)} schedules</span></li>
        <li>${icons.check(17)} <span>Upfront pricing before any work begins</span></li>
        <li>${icons.check(17)} <span>${esc(category.hours)}</span></li>
      </ul>
    </div>
    <div class="about__aside">
      <div class="info-card">
        <h3>${esc(category.businessName)}</h3>
        <p class="info-card__kicker">Serving ${esc(city.name)} (${esc(city.zipHint)})</p>
        <ul class="info-card__list">
          <li>${icons.phone(17)} <a href="tel:${attr(category.phone)}">${esc(category.phoneDisplay)}</a></li>
          <li>${icons.mail(17)} <a href="mailto:${attr(category.email)}">${esc(category.email)}</a></li>
          <li>${icons.clock(17)} <span>${esc(category.hours)}</span></li>
          <li>${icons.shield(17)} <span>Licensed &amp; insured · ${esc(city.county)}</span></li>
        </ul>
        <a class="btn btn--call btn--block" href="tel:${attr(category.phone)}" data-track="call">${icons.phone(17)} <span>Call Now</span></a>
      </div>
    </div>
  </div>
</section>
${s.serviceCards(ctx, {
  items: serviceItems,
  eyebrow: `Services in ${city.name}`,
  heading: `${category.label} services we provide in ${city.name}`,
  sub: fill(category.cityServiceNote, v),
  anchor: 'services',
  vars: v,
  alt: true,
})}
${s.testimonialsSection(ctx, {
  reviews,
  heading: `What ${city.name} clients say`,
  sub: `Recent ${category.label.toLowerCase()} reviews from ${city.name} and nearby neighborhoods.`,
  anchor: 'reviews',
  showCta: false,
})}
${s.faqSection(ctx, {
  items: faqs,
  heading: `${category.label} FAQ — ${city.name}`,
  sub: `Common questions from ${city.name} clients, answered locally.`,
  anchor: 'faq',
  openFirst: true,
  alt: true,
})}
${s.ctaSection(ctx, {
  eyebrow: `${city.name} clients`,
  heading: fill(category.cta.h, { ...v, city: city.name }),
  sub: fill(category.cta.sub, { ...v, city: city.name }),
  vars: v,
  form: leadForm(ctx, { id: `${category.slug}-${city.slug}-lead` }),
})}
${s.cityGrid(ctx)}`;

  return layout({
    path,
    title: fill(category.meta.cityTitle, v),
    description: fill(category.meta.cityDesc, v),
    content,
    schema: [
      schema.localBusiness(category, reviews, city),
      s.serviceSchema({ category, citiesList: [city, ...cities.filter((c) => c.slug !== city.slug)] }),
      s.faqSchema(faqs),
      s.breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: category.label, path: `/${category.slug}/` },
        { name: `${category.label} in ${city.name}`, path },
      ]),
    ],
    bodyClass: `page-city page-city--${category.accent}`,
  });
}

module.exports = { render };
