# Local Business Lead Sites — Dentist · Plumber · Lawyer

A fast, mobile-first **lead-generation website system** that generates 37 static pages from
templates: a home page, 3 category landing pages, 30 city service-area pages, plus FAQ,
Testimonials and Contact pages — with sticky Call/Book CTAs, a validated lead form and full
Schema.org SEO on every page.

Built with **plain Node.js (zero dependencies)** — a tiny static-site generator. Output is pure
HTML/CSS/JS: no framework runtime, no client-side routing, loads instantly, and deploys anywhere.

## Quick start

```bash
npm run build      # render all 37 pages into ./dist
npm run serve      # preview at http://localhost:8080
npm run validate   # build + SEO/schema/link integrity checks
npm run start      # build + serve
```

## What's in the box

| Page | URL | Notes |
|---|---|---|
| Home | `/` | Hero with Call Now + Request, trust stats, service cards, service-area grid, reviews, FAQ preview, lead form |
| Category landing | `/dentist/` `/plumber/` `/lawyer/` | About the provider, services, city links, 4 reviews, 7 FAQs, lead form |
| Service-area pages | `/{category}/{city}/` ×30 | City-specific hero, local intro, services, "Serving {city} and nearby areas", local FAQs + reviews, CTA form |
| FAQ | `/faq/` | Reusable accordion: general + per-category sections, `FAQPage` schema |
| Testimonials | `/testimonials/` | 18 reviews (6 per category) with stars + `ItemList`/`Review` schema |
| Contact | `/contact/` | Full lead form, direct lines, "what happens next" steps |

**Every page includes:** one H1 with proper heading order · unique title (≤75 chars) · unique
meta description with city + CTA · canonical URL · OpenGraph/Twitter tags · JSON-LD
(`LocalBusiness`/`Dentist`/`Plumber`/`LegalService`, `Service`, `FAQPage`, `Review`,
`Organization`, `BreadcrumbList`) · sticky **Call Now** (`tel:+1…`) and **Book/Request**
(opens modal) buttons · sitemap.xml + robots.txt.

## Site configuration — `config.js`

Everything site-wide lives here; edit and re-run `npm run build`:

```js
site: {
  name, tagline,
  url: 'https://www.trustedlocalpros.com',  // ← set your real domain (canonicals, sitemap, OG)
  phone, phoneDisplay, email, address, hours,
  metro: { name: 'Austin', state: 'Texas', stateShort: 'TX' },
  formEndpoint: '',   // ← paste a POST endpoint (Formspree/Basin/your API) to receive leads as JSON
  gaMeasurementId: '',// optional GA4
},
categories: [ /* per business: name, phone, email, address, hours, CTA wording ("Book Appointment" vs "Request Consultation"), Schema.org types */ ],
cities: [ /* slug list used for URLs, footer and sitemap */ ]
```

## Content

- **`src/data/content.js`** — all category copy: hero lines, about, services, FAQs, testimonials,
  CTA and meta templates. Placeholders like `{city}`, `{businessName}`, `{phoneDisplay}`,
  `{bookLabel}` are interpolated per page.
- **`src/data/cities.js`** — local data per city (county, nearby areas, neighborhoods, landmarks,
  local tips, resident names). This is what makes every service-area page unique — add a city here
  + a slug in `config.js` and a fully-populated page is generated.
- **`src/lib/copy.js`** — composes city intros, rotated hero variants, local FAQs and local
  testimonials (guarantees each city page's text differs from every other).

## Lead capture & CTAs

- **Sticky bar** (bottom on mobile, floating pill on desktop): *Call Now* → `href="tel:+1…"`
  (per-category number), *Book / Request* → opens the modal form.
- **Form fields:** name*, phone*, email, service, city dropdown, preferred contact time, notes.
  Validation: name + phone required, basic phone-format check, optional email format check,
  inline errors, then success state — *"Thanks! We'll contact you shortly."* + tap-to-call link.
- With `site.formEndpoint` set, submissions POST as JSON `{name, phone, email, service, city,
  preferredContactTime, notes, page}`. Left empty, the form shows the success state only.

## SEO / content rules applied

- Semantic HTML5 (`header/nav/main/section/footer`, `details` accordions, breadcrumbs).
- Titles follow `[Service] in [City] | Book Appointment & Call Now`; meta descriptions include
  the city and primary CTA.
- City pages mention the city naturally in hero, intro, services note, nearby-areas paragraph,
  every FAQ answer, testimonials and CTA. `npm run validate` + `node report.js` verify
  uniqueness (37 unique H1s/titles/descriptions, 0 duplicated long paragraphs).

## Deploying

`dist/` is fully static. Upload it to Netlify, Vercel, GitHub Pages, S3/Cloudflare or any web
host. Set `site.url` first so canonicals, OG URLs and the sitemap point at your domain.
For local preview use `npm run serve` (directory URLs like `/dentist/round-rock/` need a server —
opening `index.html` directly via `file://` won't resolve root-relative links).

## Project layout

```
config.js            site-wide config (brand, phone, email, address, cities, categories)
build.js             renders dist/ + sitemap.xml + robots.txt
validate.js          post-build SEO/schema/link/CTA checks
serve.js             zero-dep static preview server
report.js            content-uniqueness report
src/
  data/content.js    category copy        data/cities.js   local data per city
  lib/               util (escape/fill), html layout, schema.org builders, copy composer
  partials/          header, footer, sticky CTAs, modal, lead form, sections, icons
  templates/         home, category, city, faq, testimonials, contact
  assets/            styles.css (mobile-first theme), main.js (~6 KB vanilla JS), favicon.svg
dist/                generated site (37 pages) ← deploy this
```

## Customizing the look

Colors, radii and shadows are CSS variables at the top of `src/assets/styles.css`
(`--navy`, `--blue`, `--green` for Call buttons, `--amber`). Rebuild after editing.

> Note: businesses, phone numbers (555-01xx), addresses and reviews are **demo placeholders** —
> replace them in `config.js` / `src/data/*` before going live.
