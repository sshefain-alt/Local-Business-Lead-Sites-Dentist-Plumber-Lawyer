/**
 * Local copy composer.
 * Combines category copy with per-city data so every /{category}/{city}/ page
 * gets unique hero, intro, services note, FAQ answers and testimonials.
 */
const { site } = require('../../config');
const { categories } = require('../data/categories');
const allCities = require('../data/cities');

const pick = (arr, i) => arr[((i % arr.length) + arr.length) % arr.length];
const joinList = (arr) => {
  const list = [...arr];
  const last = list.pop();
  return list.length ? `${list.join(', ')} and ${last}` : String(last || '');
};
const cap = (s) => String(s).charAt(0).toUpperCase() + String(s).slice(1);

/** Placeholder variables for fill(). */
function vars(category, city) {
  const metro = site.metro;
  const nearby = city ? city.nearby : allCities.map((c) => c.name).filter((n) => n !== metro.name);
  const neighborhoods = city ? city.neighborhoods : ['downtown', 'the north side', 'the south side', 'the east side'];
  return {
    city: city ? city.name : metro.name,
    state: city ? metro.state : metro.state,
    stateShort: metro.stateShort,
    county: city ? city.county : `${metro.name} County`,
    nearby: joinList(nearby),
    nearbyList: nearby.join(', '),
    neighborhoods: joinList(neighborhoods),
    n0: neighborhoods[0],
    landmark: city ? city.landmark : `downtown ${metro.name}`,
    terrain: city ? city.terrain : `the ${metro.name} metro area`,
    driveNote: city ? city.driveNote : 'Average travel is under 30 minutes metro-wide',
    localTip: city ? city.localTip : 'Appointments are staggered so nobody waits past their window.',
    businessName: category ? category.businessName : site.name,
    label: category ? category.label : 'local pro',
    labelLower: category ? category.label.toLowerCase() : 'local pro',
    bookLabel: category ? category.bookLabel : 'Request Service',
    bookLabelLower: (category ? category.bookLabel : 'Request Service').toLowerCase(),
    phone: category ? category.phone : site.phone,
    phoneDisplay: category ? category.phoneDisplay : site.phoneDisplay,
    hours: category ? category.hours : site.hours,
    serviceNoun: category ? category.serviceNoun : 'help',
    founded: site.founded,
    metro: metro.name,
    places: city ? city.places : `around ${metro.name}`,
  };
}

/* ---------- city page intro paragraphs (rotated for uniqueness) ---------- */

const introA = {
  dentist: [
    '{businessName} has cared for {city} smiles from {n0} to {landmark}—{terrain}. Same-day emergency slots, digital X-rays and a team that explains the plan before touching a tooth.',
    'Families across {city} choose {businessName} for gentle, unhurried visits. We keep morning emergency openings every weekday so {nearby} patients in pain are never told "next month."',
    'A {city} dental office built around one promise: no surprises. Written prices before treatment, most PPO plans accepted, and appointments that start on time.',
    'From first baby teeth to implants, {businessName} looks after {city} households across {neighborhoods}—with sedation options for anxious patients and a 24/7 line for emergencies.',
  ],
  plumber: [
    '{businessName} has been the number {city} saves when water goes where it should not—{terrain}. Licensed technicians, fully stocked trucks, flat rates quoted before work starts.',
    'Burst pipes do not wait for business hours, and neither do we. {businessName} dispatches across {city} around the clock, from {n0} to the {nearby} corridor.',
    '{city} homeowners call us for the jobs others avoid: slab leaks, sewer roots, and water heaters that quit on the coldest night of the year.',
    'One call reaches live dispatch, a real arrival window and upfront pricing. That is how {businessName} earned 4.9★ across {city} and {nearby}.',
  ],
  lawyer: [
    '{businessName} represents {city} clients where it counts—{terrain}. Free consultations, direct attorney access, and no fee unless we win your injury case.',
    'After an accident or arrest in {city}, you need answers, not hold music. Our attorneys answer from the first call and explain your options in plain English.',
    'From the courtroom near {landmark} to settlement negotiations, {businessName} prepares every {city} case as if it will be tried—and that is what drives fair offers.',
    '{city} residents trust {businessName} for family, injury and criminal matters: clear fees in writing, a strategy on day one, and calls returned the same day.',
  ],
};

const introB = {
  dentist: [
    'We serve all of {city} and {nearby}. {driveNote}—and {localTip}',
    'Need a {labelLower} close to home in {city}? {bookLabel} online or call {phoneDisplay}; most first visits schedule within 48 hours. {driveNote}.',
    'New and returning patients are welcome at {businessName}, with early-morning and Saturday hours designed around {city} work schedules.',
  ],
  plumber: [
    'We cover every {city} neighborhood plus {nearby}. {driveNote}. {localTip}',
    'Need a {labelLower} today? Call {phoneDisplay} or {bookLabelLower} online—most {city} jobs are scheduled the same day.',
    'Every technician arriving in {city} is background-checked, TSBPE-licensed and stocked for the common fixes, so most jobs finish on visit one.',
  ],
  lawyer: [
    'We meet {city} clients at our office, by video or in your home—covering {nearby} on the same team. {driveNote}. {localTip}',
    'Not sure whether you have a case in {city}? {bookLabel} now for a free review or call {phoneDisplay}. There is no fee unless we win an injury claim.',
    'Deadlines move fast. Our {city} attorneys handle filings, court dates and insurer calls so you can focus on recovery or family.',
  ],
};

function cityIntro(category, city, cityIndex) {
  const v = vars(category, city);
  const a = pick(introA[category.id], cityIndex);
  const b = pick(introB[category.id], cityIndex + (cityIndex % 2));
  const fill = require('../lib/util').fill;
  return [fill(a, v), fill(b, v)];
}

/* ---------- city testimonials ---------- */

const cityTestimonialTemplates = {
  dentist: [
    '{storyCapital} after chipping a tooth {places}. They fit me in the same day and the crown still looks perfect.',
    'Took both kids in for cleanings before school—{city} parents know a zero-waiting-room office is rare, and the hygienist had my son laughing.',
    'I say out loud that I hate drills. They talked me through every step, numbed properly, and I felt nothing. Wish I had come {places} sooner.',
    'Called with unbearable pain at 7:40 a.m. and was seen before lunch. The bill matched the estimate to the dollar—{city} neighbors sent me here and they were right.',
    'My old {city} office always tried to sell me extras. Here I got photos of the actual problem, three options, and no pressure at all.',
    'Saturday emergency for a lost filling—handled in 30 minutes so I could still make my kid’s game that afternoon. That is real {city} service.',
  ],
  plumber: [
    'Water heater died mid-shower on a Saturday. A tech was in my {city} driveway in 45 minutes and hot water was back by lunch.',
    'They camera’d the drain instead of guessing, showed me the roots on screen, and quoted a flat price before touching anything. Wish I had called first in {city}.',
    'Found the slab leak under my hallway without ripping up half the house. The final bill was exactly the quote—for {city} work, that kind of honesty is rare.',
    'Called at 6 a.m. before work from {city}—they arrived in the promised window and fixed the running toilet for the quoted rate.',
    'Third company was the charm in {city}, but they were the only ones who showed up on time and cleaned up after themselves.',
    'Burst line behind the fridge at 11 p.m. in {city}. Shut it down, repaired it, and had the floor dry before midnight.',
  ],
  lawyer: [
    'After my accident {places}, the insurer’s first offer was $9,000. They took the case on contingency and won $96,000.',
    'I had court in {city} and no idea what to expect. My attorney arrived early, walked me through every question, and the charge was dismissed.',
    'The free consultation became a real strategy within a day. Every call—even my nervous 9 p.m. ones—got returned. I never felt like just another {city} file.',
    'Divorce felt impossible until this team laid out a step-by-step plan. Firm in mediation, kind in the office, outcome was fair for our {city} family.',
    'They explained contingency fees twice without making me feel silly, then delivered exactly what they promised—for a {city} case, communication that good is rare.',
    'Denied workers’ comp looked like the end of the road. They appealed, won, and also settled with the contractor. I send every {city} coworker their way.',
  ],
};

function cityTestimonials(category, city, cityIndex) {
  const templates = cityTestimonialTemplates[category.id];
  const start = (cityIndex * 2 + categories.findIndex((c) => c.id === category.id)) % templates.length;
  const people = city.locals;
  const areas = city.neighborhoods;
  const services = category.testimonials.map((t) => t.service);
  const startAlt = start + 1;

  return [0, 1, 2, 3].map((i) => {
    const text = pick(templates, start + i)
      .replace(/\{storyCapital\}/g, cap(city.story))
      .replace(/\{city\}/g, city.name)
      .replace(/\{places\}/g, city.places);
    return {
      name: pick(people, i),
      area: `${pick(areas, startAlt + i)}, ${city.name}`,
      rating: i === 3 ? 4 : 5,
      service: pick(services, start + i),
      text,
    };
  });
}

/* ---------- city FAQ (category questions + local answer detail) ---------- */

function cityFaq(category, city) {
  const fill = require('../lib/util').fill;
  return category.faqs.map((item, i) => {
    const v = vars(category, city);
    let a = fill(item.a, v);
    if (i === 0) a += ` ${city.localTip}`;
    if (i === 1) a += ` ${city.driveNote}.`;
    // Safety net: every city-page answer must mention the city (unique local content).
    if (!a.includes(city.name)) {
      const tails = [
        `In ${city.name}, that means every neighborhood from ${city.neighborhoods[0]} to ${city.nearby[0]}.`,
        `All of ${city.name} — including ${city.neighborhoods[0]}, ${city.neighborhoods[1]} and ${city.neighborhoods[2]} — is covered.`,
        `${city.name} clients get the same promise: no surprises, no hidden fees.`,
      ];
      a += ` ${tails[i % tails.length]}`;
    }
    return { q: fill(item.q, v), a };
  });
}

/* ---------- hero / meta copy for city pages ---------- */

function cityHero(category, city) {
  const fill = require('../lib/util').fill;
  const v = vars(category, city);
  const h1Templates = {
    dentist: ['Top Rated Dentist in {city}', 'Emergency Dentist in {city}—Seen Same Day', 'Gentle Dentistry in {city}, Open 6 Days a Week'],
    plumber: ['Top Rated Plumber in {city}', 'Emergency Plumber in {city}—Under 60 Minutes', 'Upfront-Pricing Plumbers Serving {city}'],
    lawyer: ['Top Rated Lawyers in {city}', 'Free Consultation with a {city} Lawyer', 'Fighting for {city} Clients—No Fee Unless We Win'],
  };
  const subTemplates = {
    dentist: '{businessName} treats {city} patients {places}—emergency pain relief, same-day crowns and family care. {bookLabel} online or call {phoneDisplay} now.',
    plumber: '{businessName} dispatches licensed plumbers across {city} day and night—leaks, water heaters, drains and repipes with flat-rate pricing. Call {phoneDisplay} or {bookLabelLower} online.',
    lawyer: '{businessName} offers {city} clients free consultations, direct attorney access and no fee unless we win. {bookLabel} online or call {phoneDisplay} today.',
  };
  return {
    h1: fill(pick(h1Templates[category.id], cityIndexFor(city)), v),
    sub: fill(subTemplates[category.id], v),
    badge: fill('Top Rated {label} · Serving {city} & nearby areas', v),
  };
}

function cityIndexFor(city) {
  return allCities.findIndex((c) => c.slug === city.slug);
}

/** "Serving {city} and nearby areas…" block. */
function servingLine(category, city) {
  const fill = require('../lib/util').fill;
  const v = vars(category, city);
  return fill(
    '{businessName} serves {city} and nearby areas: {nearby}. {driveNote}, and appointments are scheduled around {local}',
    { ...v, local: city.weatherNote }
  );
}

module.exports = { vars, cityIntro, cityTestimonials, cityFaq, cityHero, servingLine, cityIndexFor, pick, joinList };
