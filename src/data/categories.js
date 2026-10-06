/** Merges site config categories with their copy blocks. */
const { categories } = require('../../config');
const { categoryContent, home, hubFaqs } = require('./content');

const merged = categories.map((c) => ({ ...c, ...categoryContent[c.id] }));

module.exports = { categories: merged, home, hubFaqs };
