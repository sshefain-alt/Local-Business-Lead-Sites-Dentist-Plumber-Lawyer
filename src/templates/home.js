/** Home page template. */
const { layout, fill, esc, attr } = require('../lib/html');
const { categories, home, hubFaqs } = require('../data/categories');
const s = require('../partials/sections');
const { leadForm } = require('../partials/form');
const schema = require('../lib/schema');
const { vars } = require('../lib/copy');
const { site } = require('../../config');
const icons = require('../partials/icons');

const categoryIcons = { dentist: 'tooth', plumber: 'wrench', lawyer: 'scales' };

function render() {
  const v = vars(null, null);
  const path = '/';

  const serviceOptions = { dentist: 'Dental care', plumber: 'Plumbing', lawyer: 'Legal help' };
  const serviceCards = categories.map((c) => ({
    name: c.label === 'Dentist' ? `${c.businessName}` : c.businessName,
    desc: fill(c.homeBlurb, { ...v, city: site.metro.name }),
    href: `/${c.slug}/`,
    icon: categoryIcons[c.id],
    accent: c.accent,
    dataService: serviceOptions[c.id],
    tag: `Call ${c.phoneDisplay} · ${c.bookLabel}`,
  }));

  const homeStats = [
    { value: '4.9★', label: '1,800+ verified reviews' },
    { value: '24/7', label: 'Live phone intake' },
    { value: '10 cities', label: `across the ${site.metro.name} metro` },
    { value: '< 60 min', label: 'emergency response average' },
  ];

  const homeReviews = categories.map((c) => ({ ...c.testimonials[0], service: `${c.label} · ${c.businessName}` }));

  const faqsShown = hubFaqs.slice(0, 5).map((f) => ({ q: fill(f.q, v), a: fill(f.a, v) }));

  const content = `
${s.hero(
  { path, category: null, city: null },
  {
    eyebrow: home.hero.eyebrow,
    h1: home.hero.h1,
    sub: home.hero.sub,
    vars: v,
    showNumber: true,
    chips: home.hero.trustChips,
    className: 'hero--home',
  }
)}
${s.trustBar(homeStats)}
${s.serviceCards(
  { path, category: null },
  {
    items: serviceCards,
    eyebrow: 'Three services, one trusted network',
    heading: home.servicesIntro,
    sub: 'Each service is a dedicated local business with its own phone line, booking form and reviews.',
    anchor: 'services',
    vars: { ...v, city: site.metro.name },
  }
)}
${s.cityGrid({ path, category: null })}
${s.testimonialsSection(
  { path, category: null },
  { reviews: homeReviews, heading: 'Recent reviews from across the metro', anchor: 'reviews', showCta: false }
)}
${s.faqSection(
  { path, category: null },
  {
    items: faqsShown,
    heading: home.faqsHeading,
    sub: 'Quick answers — the full list lives on our FAQ page.',
    anchor: 'faq',
    vars: v,
    openFirst: true,
    alt: true,
  }
)}
${s.ctaSection(
  { path, category: null },
  {
    eyebrow: '24/7 intake',
    heading: home.cta.h,
    sub: home.cta.sub,
    vars: v,
    form: leadForm(
      { path, category: null },
      { id: 'home-lead', heading: 'Request service — it takes 60 seconds', sub: 'Tell us what you need and where. We call back fast; emergencies go straight to the on-call pro.' }
    ),
  }
)}`;

  return layout({
    path,
    title: `Emergency Dentist, Plumber & Lawyer in ${site.metro.name}, TX | ${site.name}`,
    description: `Need a dentist, plumber or lawyer in ${site.metro.name}, TX? ${site.name} connects you with 4.9★ local pros 24/7. Call ${site.phoneDisplay} now or book online in 60 seconds.`,
    content,
    schema: [schema.organization(categories), schema.website(), s.faqSchema(faqsShown)],
    bodyClass: 'page-home',
  });
}

module.exports = { render };
