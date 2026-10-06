/**
 * Category content: copy blocks used across category pages, city pages,
 * FAQ pages and testimonial pages.
 *
 * Placeholders supported in strings:
 *   {city} {state} {stateShort} {nearby} {neighborhoods} {landmark}
 *   {businessName} {label} {bookLabel} {phone} {hours}
 * City pages interpolate real city data, category pages use metro defaults.
 */

const home = {
  hero: {
    eyebrow: 'Austin · Round Rock · Cedar Park · San Marcos & beyond',
    h1: 'Emergency Dentist, Plumber & Lawyer Help in {city}—Fast Help Today',
    sub: 'One trusted network, three critical services. Tap to call now or request an appointment in under a minute—real local teams answer 24/7.',
    primary: { label: 'Call Now — (512) 555-0100', href: 'tel:+15125550100' },
    secondary: { label: 'Request Service', href: '/contact/' },
    trustChips: ['24/7 live phone intake', '4.9★ across 1,800+ local reviews', 'Licensed & insured pros', 'Same-day availability'],
  },
  servicesIntro: 'Pick the help you need. Every service books by phone or online form.',
  areasHeading: 'Service Areas We Cover',
  areasIntro:
    'Dedicated local pages for every city we serve—each with its own team, response times and neighborhood knowledge.',
  cta: {
    h: 'Not sure which service you need?',
    sub: 'Call the intake line and we will route you to the right local pro in under a minute.',
  },
  faqsHeading: 'Common Questions',
};

/** Shared (category-level) FAQs used on the reusable FAQ page. */
const hubFaqs = [
  {
    q: 'Which services can I book through this site?',
    a: 'We work with three vetted local partners: Brightline Dental Studio for dental care, Lone Star Plumbing Co. for plumbing, and Hartwell & Grant Law Group for legal help. Each has its own booking form and direct phone line on this site.',
  },
  {
    q: 'Do you serve my city?',
    a: 'We cover {city} plus Round Rock, Cedar Park, Pflugerville, Georgetown, San Marcos, Kyle, Buda, Leander and Manor. If your city is not listed, call the intake line anyway—we often can help or refer you.',
  },
  {
    q: 'How fast is the response?',
    a: 'Phone calls are answered live 24/7. Form requests get a callback during business hours, typically within 30 minutes, and emergencies are triaged immediately.',
  },
  {
    q: 'Are the businesses licensed and insured?',
    a: 'Yes. Every partner holds current Texas licensing where required (board of dentistry, TSBPE plumbing, State Bar of Texas) and carries active general liability coverage.',
  },
  {
    q: 'Is the estimate or consultation free?',
    a: 'Plumbing diagnostics quotes and legal consultations are free. Dental exams for emergencies include a clear written treatment plan and cost before anything begins.',
  },
  {
    q: 'What if I need help outside business hours?',
    a: 'Call the 24/7 intake line at {phone}. Dental emergencies, burst pipes and urgent legal situations are routed to the on-call professional for your city immediately.',
  },
];

const categoryContent = {
  dentist: {
    hero: {
      h1: 'Emergency Dentist in {city}—Fast Help Today',
      sub: 'Severe tooth pain, a broken tooth or a lost filling? {businessName} keeps same-day emergency slots open across {city}, with clear pricing before treatment starts.',
      badge: 'Same-day emergency visits · 4.9★ local rating',
    },
    meta: {
      categoryTitle: '{label} in {city}, {stateShort} | {bookLabel} & Call Now',
      cityTitle: 'Top Rated {label} in {city}, {stateShort} | {bookLabel} & Call Now',
      categoryDesc:
        'Looking for a dentist in {city}, {stateShort}? {businessName} offers emergency visits, same-day crowns and gentle family care. {bookLabel} online or call {phoneDisplay}.',
      cityDesc:
        'Top-rated dentist in {city}, {stateShort}: emergency visits, implants and Invisalign. {bookLabel} online or call {phoneDisplay} for same-day help.',
    },
    about: {
      h: 'About {businessName}',
      p1: '{businessName} has cared for {city} families since 2011. Our dentists combine digital X-rays, intraoral cameras and same-day milling so most treatments—crowns, onlays, emergencies—are finished in a single visit instead of two.',
      p2: 'We keep a block of emergency appointments open every morning, accept most PPO plans, and walk through costs in writing before we begin. Nervous patients get sedation options and a dentist who explains every step first.',
    },
    stats: [
      { value: '4.9★', label: '612 Google reviews' },
      { value: 'Same day', label: 'emergency slots held daily' },
      { value: '15 yrs', label: 'serving {city} families' },
      { value: 'PPO', label: 'insurance accepted' },
    ],
    services: [
      { name: 'Emergency Toothache Relief', desc: 'Same-day pain relief, extractions and temporary fillings for broken teeth or lost crowns.' },
      { name: 'Same-Day Crowns & Fillings', desc: 'Digital scanning and in-office milling—no goopy impressions, no second visit.' },
      { name: 'Dental Implants', desc: 'Single-tooth to full-arch implants planned with 3D imaging and placed in one practice.' },
      { name: 'Invisalign & Braces', desc: 'Clear aligners and traditional orthodontics for teens and adults, with flexible payment plans.' },
      { name: 'Whitening & Veneers', desc: 'Professional whitening, bonding and porcelain veneers for a natural, bright smile.' },
      { name: "Kids' Dentistry", desc: 'Gentle cleanings, sealants and fluoride care—first visits are free under age 6.' },
    ],
    cityServiceNote:
      'All services are available in {city}—including mobile triage for patients {nearby} who cannot wait for the next open slot.',
    faqs: [
      { q: 'Do you keep emergency slots open same day?', a: 'Yes. {businessName} reserves morning emergency openings across {city} every weekday. Call before 10 a.m. and we will almost always see you the same day; after-hours calls are triaged by our on-call dentist.' },
      { q: 'How much does an emergency dental visit cost?', a: 'Emergency exams start at $89 in {city}, including X-rays and a written treatment plan. Most PPO insurance applies, and we confirm your estimated cost before any treatment begins.' },
      { q: 'Are you accepting new patients in {city}?', a: 'Yes—new patients are welcome at {businessName}. {city} online requests are confirmed by phone, and first visits usually schedule within 48 hours, sooner for pain cases.' },
      { q: 'Do you take my dental insurance?', a: 'We accept most major PPO plans and file claims for you. Bring your card to your {city} appointment and our front desk verifies benefits before you are seen.' },
      { q: 'What happens during a first appointment?', a: 'Your first {city} visit takes about 45 minutes: digital X-rays, a full exam, cleaning if time allows, and a same-day plan with exact pricing. Emergencies skip straight to treatment planning.' },
      { q: 'Do you offer payment plans?', a: 'Yes. {city} patients get interest-free plans for treatment over $600, plus CareCredit. Ask when you {bookLabelLower}—we will build the plan around your budget.' },
      { q: 'Can you fix a tooth the same day?', a: 'In most cases, yes. {city} patients receive same-day crowns, onlays and bonded repairs thanks to our in-office milling—walk in with a broken tooth and leave with a finished one.' },
    ],
    testimonials: [
      { name: 'Rachel Whitcomb', area: 'North Austin', rating: 5, service: 'Emergency visit', text: 'Woke up with a cracked molar and called at 7:40 a.m. They saw me before lunch, fixed it in one visit, and the price matched the estimate exactly.' },
      { name: 'Marcus Bell', area: 'Cedar Park', rating: 5, service: 'Dental implant', text: 'The implant process took three visits total and I never once felt rushed. The 3D imaging showed me exactly what to expect up front.' },
      { name: 'Sofia Ramirez', area: 'Round Rock', rating: 5, service: 'Invisalign', text: 'My aligners were ready in five days and check-ins took ten minutes. Ten months later my teeth are perfectly straight.' },
      { name: 'Dan McAllister', area: 'Georgetown', rating: 4, service: 'Same-day crown', text: 'Crown was milled while I waited—no temporary, no second appointment. The only reason for 4 stars is parking downtown.' },
      { name: 'Priya Shah', area: 'Pflugerville', rating: 5, service: "Kids' dentistry", text: 'My son actually asks when his next cleaning is. The team explains everything to kids in a way that keeps them calm.' },
      { name: 'Tom Reyes', area: 'Kyle', rating: 5, service: 'Whitening', text: 'Professional whitening, zero sensitivity, and they did not upsell me on anything. My results lasted well past a year.' },
    ],
    cta: {
      h: 'Tooth pain won’t wait—neither should you',
      sub: 'Call for a same-day emergency slot in {city}, or {bookLabelLower} online in under a minute.',
    },
    faqPageIntro: 'Straight answers about appointments, insurance and emergency dental care in the Austin area.',
    homeBlurb: 'Emergency visits, same-day crowns, implants and gentle family dentistry across {city}.',
  },

  plumber: {
    hero: {
      h1: 'Emergency Plumber in {city}—Fast Help Today',
      sub: 'Burst pipe, dead water heater or a drain that will not clear? {businessName} dispatches licensed plumbers across {city}—often within 60 minutes.',
      badge: '24/7 dispatch · Upfront pricing before work starts',
    },
    meta: {
      categoryTitle: '{label} in {city}, {stateShort} | {bookLabel} & Call Now',
      cityTitle: 'Top Rated {label} in {city}, {stateShort} | {bookLabel} & Call Now',
      categoryDesc:
        'Need a plumber in {city}, {stateShort}? {businessName} covers 24/7 emergencies, water heaters and drains with upfront pricing. {bookLabel} online or call {phoneDisplay}.',
      cityDesc:
        'Top-rated plumber in {city}, {stateShort}: 24/7 emergencies, water heaters, drains and leak detection. {bookLabel} online or call {phoneDisplay} now.',
    },
    about: {
      h: 'About {businessName}',
      p1: '{businessName} has been the call {city} residents make since 2009—burst pipes in January, water heaters out on Sunday, slow drains nobody else would touch. Every technician is background-checked, TSBPE-licensed and drives a fully stocked truck.',
      p2: 'We quote before we touch anything: flat diagnostic fee, written options, and no "while we’re here" surprises. 93% of jobs are finished on the first visit because the parts ride along in the truck.',
    },
    stats: [
      { value: '< 60 min', label: 'average emergency arrival' },
      { value: '4.9★', label: '740 local reviews' },
      { value: '24/7', label: 'live dispatch line' },
      { value: '$0', label: 'extra charge for nights' },
    ],
    services: [
      { name: 'Emergency Plumbing Repairs', desc: 'Burst pipes, sewer backups and no-water calls—dispatched 24/7 across the metro.' },
      { name: 'Water Heater Repair & Install', desc: 'Tank and tankless service, same-day replacement, gas or electric.' },
      { name: 'Drain Cleaning & Sewer Lines', desc: 'Camera inspection, hydro-jetting and root removal for recurring clogs.' },
      { name: 'Leak Detection & Repair', desc: 'Acoustic and slab leak detection that finds water without tearing up walls.' },
      { name: 'Fixture Installation', desc: 'Faucets, toilets, disposals and hose bibs installed cleanly and to code.' },
      { name: 'Repiping & Remodel Plumbing', desc: 'Whole-home repipes and rough-in work for kitchens, baths and additions.' },
    ],
    cityServiceNote:
      'Every service is available in {city}, from {n0} to the edges of town—plus {nearby} on the same dispatch board.',
    faqs: [
      { q: 'How fast can you get to {city}?', a: 'Average arrival for emergencies is under 60 minutes, and most {city} calls are scheduled the same day. Call the 24/7 line and dispatch will give you an arrival window before you hang up.' },
      { q: 'Do you charge extra for nights or weekends?', a: 'No after-hours surcharge. You pay the flat diagnostic fee, we present a written price, and you approve the work before it starts—any hour of the day. {businessName} answers emergency calls across {city} around the clock.' },
      { q: 'How much does a plumber cost in {city}?', a: 'The flat diagnostic fee for {city} is $59, credited toward the repair. Common jobs are quoted as flat rates—a toilet install is $185+, drain clearing $149+, so there are no hourly surprises.' },
      { q: 'Do you guarantee your work?', a: 'Yes. Repairs carry a 1-year labor warranty and installed parts keep the manufacturer warranty. If a {city} repair fails inside the warranty, we return at no charge.' },
      { q: 'Can you handle slab leaks in {city} homes?', a: 'Yes. We locate slab and hidden leaks with acoustic and thermal equipment, then repair or reroute with minimal concrete cutting—common in homes across {city}.' },
      { q: 'Should I repair or replace my water heater?', a: 'If the tank is over 10 years old and leaking, replacement is usually the smarter call. We show you both numbers for {city} homes and never push the expensive option.' },
      { q: 'Do I need to be home for the appointment?', a: 'For estimates and repairs, yes—someone 18+ should be present. For scheduled maintenance in {city}, a gated entry note or lockbox code works fine.' },
    ],
    testimonials: [
      { name: 'Kevin Harlow', area: 'Austin', rating: 5, service: 'Emergency repair', text: 'A pipe burst behind the fridge at 11 p.m. They had a tech here in 40 minutes, shut it down, and fixed it before midnight. Fair price too.' },
      { name: 'Denise Okafor', area: 'Round Rock', rating: 5, service: 'Water heater', text: 'Old heater died on a Saturday. Replacement was installed by 2 p.m. with the old hauled away and permits pulled.' },
      { name: 'Bill Sanders', area: 'Leander', rating: 5, service: 'Drain cleaning', text: 'Two other companies jetted the line and the clog came back. They camera’d it, found root intrusion, and it has been clear for a year.' },
      { name: 'Angela Pruitt', area: 'Buda', rating: 5, service: 'Leak detection', text: 'Found a slab leak in twenty minutes without jackhammering the whole floor. The quote they gave was exactly the final bill.' },
      { name: 'Hector Villanueva', area: 'Pflugerville', rating: 4, service: 'Fixture install', text: 'Great work replacing every faucet in the house. Only hiccup was arriving at the late end of the window, but they called ahead.' },
      { name: 'Jenna Kowalski', area: 'Cedar Park', rating: 5, service: 'Repiping', text: 'Whole-house repipe in four days, drywall patched, house cleaner than they found it. Crew was respectful of our kids and pets.' },
    ],
    cta: {
      h: 'Water doesn’t wait—neither do we',
      sub: 'Call 24/7 for an emergency plumber in {city}, or {bookLabelLower} a scheduled visit online.',
    },
    faqPageIntro: 'Pricing, response times and warranty details for plumbing service across the Austin area.',
    homeBlurb: '24/7 leak, water heater, drain and repipe service with flat-rate pricing across {city}.',
  },

  lawyer: {
    hero: {
      h1: 'Need a Lawyer in {city}? Request a Free Consultation Today',
      sub: 'Injured, in a dispute or facing charges in {city}? {businessName} offers free consultations, no upfront fees, and a real attorney—not a call center—on your case.',
      badge: 'Free case review · No fee unless we win · 24/7 intake',
    },
    meta: {
      categoryTitle: '{label} in {city}, {stateShort} | {bookLabel} & Call Now',
      cityTitle: 'Top Rated {label} in {city}, {stateShort} | {bookLabel} & Call Now',
      categoryDesc:
        'Need a lawyer in {city}, {stateShort}? {businessName} offers free consultations for injury, family and criminal cases. {bookLabel} or call {phoneDisplay} now.',
      cityDesc:
        'Top-rated lawyers in {city}, {stateShort}: free consultations, no fee unless we win. {bookLabel} online or call {phoneDisplay} today.',
    },
    about: {
      h: 'About {businessName}',
      p1: '{businessName} represents clients in {city} and across Central Texas. Our attorneys have tried cases to verdict, negotiated settlements totaling more than $120 million, and answered the phone from the first call—not an intake clerk reading a script.',
      p2: 'Personal injury and wrongful death matters are taken on contingency: no fee unless we recover money. Family, criminal and estate matters start with a flat, clearly quoted consultation so you know the plan and the price before deciding.',
    },
    stats: [
      { value: '$120M+', label: 'recovered for clients' },
      { value: 'No fee', label: 'unless we win' },
      { value: '24/7', label: 'attorney intake line' },
      { value: '4.9★', label: '520 client reviews' },
    ],
    services: [
      { name: 'Personal Injury Claims', desc: 'Car, truck and motorcycle crashes, slip-and-falls, and wrongful death cases on contingency.' },
      { name: 'Car & Truck Accidents', desc: 'Dealing with insurers, medical liens and lost wages so you can focus on recovery.' },
      { name: 'Family Law', desc: 'Divorce, custody, child support and modifications handled with discretion and a plan.' },
      { name: 'Criminal Defense', desc: 'DWI, drug and assault charges defended aggressively from arrest through trial.' },
      { name: 'Workplace Injuries', desc: 'Workers’ compensation denials, third-party claims and workplace accident cases.' },
      { name: 'Estate Planning & Probate', desc: 'Wills, trusts, probate and guardianship—handled promptly and in plain English.' },
    ],
    cityServiceNote:
      'We represent clients throughout {city} and {nearby}, with meetings at our office, your home or by video.',
    faqs: [
      { q: 'Is the consultation really free?', a: 'Yes. Your first consultation with {businessName} is free—no card, no obligation. We review the facts of your {city} matter, explain your options, and you decide whether to hire us.' },
      { q: 'How much does a lawyer cost?', a: 'For {city} clients, injury and wrongful death cases are contingency fee—typically 33% of recovery, and nothing at all if we do not win. Family, criminal and estate matters get a flat fee quoted in writing before any work begins.' },
      { q: 'How fast can I talk to an attorney in {city}?', a: 'Call the 24/7 intake line and an attorney usually calls back within one hour for urgent matters. Regular consultations in {city} are typically scheduled within 1–2 business days, often same day.' },
      { q: 'Do you handle cases in {city} courts?', a: 'Yes. Our attorneys regularly appear in courts serving {city} and the surrounding counties, and we handle filings, hearings and deadlines so you never miss a date.' },
      { q: 'What should I bring to my first meeting?', a: 'Bring any police or incident reports, medical records, insurance letters, court papers and a short timeline of events. Do not worry if something is missing—we can obtain records for your {city} case.' },
      { q: 'Will my case have to go to trial?', a: 'Most cases settle, but we prepare every {city} case as if it is going to trial. That preparation is exactly what pushes insurers to offer fair numbers without a courtroom.' },
      { q: 'How long do I have to file?', a: 'Texas deadlines vary by case type and can be as short as two years for injury claims. Because the clock may already be running, call {phone} today for a free review of your {city} matter.' },
    ],
    testimonials: [
      { name: 'Sandra Mireles', area: 'Austin', rating: 5, service: 'Car accident', text: 'The insurer’s first offer was $9,000. They rebuilt the case with records and got me $96,000—and they called me back every single time.' },
      { name: 'Robert Tillman', area: 'Round Rock', rating: 5, service: 'Criminal defense', text: 'DWI charge dismissed before trial. They found problems in the stop that I never would have noticed myself.' },
      { name: 'Kimberly Vaughn', area: 'Cedar Park', rating: 5, service: 'Family law', text: 'Custody was terrifying until this team laid out a real strategy in the first meeting. Firm in court, kind in the office.' },
      { name: 'Anthony Gross', area: 'San Marcos', rating: 5, service: 'Workplace injury', text: 'My workers’ comp claim was denied. They appealed, won, and negotiated a separate settlement with the contractor.' },
      { name: 'Laura Benitez', area: 'Georgetown', rating: 4, service: 'Probate', text: 'Probate moved faster than I expected and the fees were exactly what was quoted. Only wait was the first callback.' },
      { name: 'Curtis Holloway', area: 'Kyle', rating: 5, service: 'Personal injury', text: 'No fee until they won, and they treated me like a person instead of a file number. Entire process took five months.' },
    ],
    cta: {
      h: 'Your consultation is free—your questions deserve answers',
      sub: 'Talk to a {label} serving {city} today. No fee unless we win your injury case.',
    },
    faqPageIntro: 'Fees, timelines and case details for clients across the Austin area.',
    homeBlurb: 'Free consultations for injury, family, criminal and probate matters across {city}.',
  },
};

module.exports = { home, hubFaqs, categoryContent };
