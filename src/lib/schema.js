/** Schema.org structured data builders. */
const { site, cities } = require('../../config');
const { reviewSchemaParts } = require('../partials/sections');
const { absoluteUrl } = require('./util');

function postalAddress(addr) {
  return {
    '@type': 'PostalAddress',
    streetAddress: addr.street,
    addressLocality: addr.city,
    addressRegion: addr.state,
    postalCode: addr.zip,
    addressCountry: 'US',
  };
}

/** LocalBusiness (with reviews) for a category — optionally scoped to a city. */
function localBusiness(category, reviews, city) {
  return {
    '@context': 'https://schema.org',
    '@type': category.schemaTypes,
    '@id': absoluteUrl(`/${category.slug}/`) + '#business',
    name: category.businessName,
    url: absoluteUrl(`/${category.slug}/`),
    telephone: category.phone,
    email: category.email,
    image: '/assets/favicon.svg',
    priceRange: site.priceRange,
    address: postalAddress(category.address),
    openingHours: category.hours,
    areaServed: (city ? [city, ...cities.filter((c) => c.slug !== city.slug)] : cities).map((c) => ({
      '@type': 'City',
      name: c.name,
      containedInPlace: { '@type': 'State', name: site.metro.state },
    })),
    ...reviewSchemaParts(reviews, category.businessName),
  };
}

/** Organization (hub) with each category business as a subOrganization. */
function organization(categories) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': absoluteUrl('/') + '#organization',
    name: site.name,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/assets/favicon.svg'),
    telephone: site.phone,
    email: site.email,
    address: postalAddress(site.address),
    foundingDate: site.founded,
    sameAs: site.sameAs,
    areaServed: cities.map((c) => ({ '@type': 'City', name: c.name })),
    subOrganization: categories.map((c) => ({
      '@type': c.schemaTypes,
      name: c.businessName,
      url: absoluteUrl(`/${c.slug}/`),
      telephone: c.phone,
      email: c.email,
      address: postalAddress(c.address),
    })),
  };
}

function website() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: absoluteUrl('/'),
    publisher: { '@id': absoluteUrl('/') + '#organization' },
  };
}

module.exports = { localBusiness, organization, website, postalAddress };
