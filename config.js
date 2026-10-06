/**
 * Site-wide configuration.
 * Everything the site needs lives here: brand, phone, email, address,
 * cities/areas and service categories. Edit this file, then re-run `npm run build`.
 */

const site = {
  name: 'TrustedLocal Pros',
  tagline: 'Local pros you can call today',
  // Change this to your real production domain (no trailing slash).
  url: 'https://www.trustedlocalpros.com',
  // Main intake line (used on shared pages: home, FAQ, contact).
  phone: '+15125550100',
  phoneDisplay: '(512) 555-0100',
  email: 'hello@trustedlocalpros.example',
  address: {
    street: '500 W 2nd St, Suite 100',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
  },
  hours: 'Live phone intake 24/7 · Office hours Mon–Fri 8am–6pm',
  metro: { name: 'Austin', state: 'Texas', stateShort: 'TX' },
  // Optional: a form endpoint (Formspree, Basin, Netlify Forms, your API...).
  // Leave '' to use the built-in client-side success state only.
  formEndpoint: '',
  // Optional Google Analytics 4 id, e.g. 'G-XXXXXXX'. Leave '' to skip.
  gaMeasurementId: '',
  founded: '2009',
  priceRange: '$$',
  sameAs: [],
};

/**
 * Service categories. Each category is a distinct local business with its
 * own phone number, CTA wording and Schema.org type.
 */
const categories = [
  {
    id: 'dentist',
    slug: 'dentist',
    label: 'Dentist',
    labelPlural: 'Dentists',
    emergencyWord: 'Emergency Dentist',
    serviceNoun: 'dental care',
    businessName: 'Brightline Dental Studio',
    phone: '+15125550142',
    phoneDisplay: '(512) 555-0142',
    email: 'appointments@brightlinedental.example',
    address: { street: '1200 Congress Ave, Suite 210', city: 'Austin', state: 'TX', zip: '78701' },
    hours: 'Mon–Fri 7am–6pm · Sat 8am–2pm · 24/7 emergency line',
    bookLabel: 'Book Appointment',
    bookLabelShort: 'Book',
    formSuccess: "Thanks! We'll call you back shortly to confirm your appointment.",
    schemaTypes: ['LocalBusiness', 'Dentist'],
    profession: 'Dentist',
    accent: 'dentist',
  },
  {
    id: 'plumber',
    slug: 'plumber',
    label: 'Plumber',
    labelPlural: 'Plumbers',
    emergencyWord: 'Emergency Plumber',
    serviceNoun: 'plumbing service',
    businessName: 'Lone Star Plumbing Co.',
    phone: '+15125550187',
    phoneDisplay: '(512) 555-0187',
    email: 'dispatch@lonestarplumbing.example',
    address: { street: '8500 Burnet Rd, Suite 120', city: 'Austin', state: 'TX', zip: '78757' },
    hours: '24/7 emergency dispatch · Office Mon–Sat 7am–7pm',
    bookLabel: 'Book Appointment',
    bookLabelShort: 'Book',
    formSuccess: "Thanks! We'll contact you shortly to lock in your appointment window.",
    schemaTypes: ['LocalBusiness', 'Plumber'],
    profession: 'Plumber',
    accent: 'plumber',
  },
  {
    id: 'lawyer',
    slug: 'lawyer',
    label: 'Lawyer',
    labelPlural: 'Lawyers',
    emergencyWord: 'Experienced Lawyer',
    serviceNoun: 'legal help',
    businessName: 'Hartwell & Grant Law Group',
    phone: '+15125550119',
    phoneDisplay: '(512) 555-0119',
    email: 'intake@hartwellgrant.example',
    address: { street: '301 Congress Ave, Floor 14', city: 'Austin', state: 'TX', zip: '78701' },
    hours: 'Free consultations 24/7 · Office Mon–Fri 8:30am–6pm',
    bookLabel: 'Request Consultation',
    bookLabelShort: 'Consult',
    formSuccess: "Thanks! An attorney on our team will contact you shortly to review your case.",
    schemaTypes: ['LocalBusiness', 'LegalService', 'Attorney'],
    profession: 'Legal services',
    accent: 'lawyer',
  },
];

const cities = [
  { name: 'Austin', slug: 'austin' },
  { name: 'Round Rock', slug: 'round-rock' },
  { name: 'Cedar Park', slug: 'cedar-park' },
  { name: 'Pflugerville', slug: 'pflugerville' },
  { name: 'Georgetown', slug: 'georgetown' },
  { name: 'San Marcos', slug: 'san-marcos' },
  { name: 'Kyle', slug: 'kyle' },
  { name: 'Buda', slug: 'buda' },
  { name: 'Leander', slug: 'leander' },
  { name: 'Manor', slug: 'manor' },
];

module.exports = { site, categories, cities };
