/** Inline SVG icons (no image requests = fast pages). */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const base = (paths, size = 24) =>
  `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths}</svg>`;

module.exports = {
  phone: (s) => base('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>', s),
  calendar: (s) => base('<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>', s),
  star: (s) => `<svg class="icon star" width="${s || 18}" height="${s || 18}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9L12 2.6z"/></svg>`,
  check: (s) => base('<path d="M20 6 9 17l-5-5"/>', s),
  chevron: (s) => base('<path d="m6 9 6 6 6-6"/>', s),
  shield: (s) => base('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>', s),
  clock: (s) => base('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', s),
  pin: (s) => base('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="3"/>', s),
  tooth: (s) => base('<path d="M12 5.5C10.5 4 9 3.5 7.5 4 5.5 4.6 4.5 6.7 5 9.4c.4 2 .9 3.3 1.3 5.2.4 1.8.5 3.4 1.4 4.4.8.9 2 .6 2.5-.5.4-.9.6-2 .8-3 .2-1 .5-1.5 1-1.5s.8.5 1 1.5c.2 1 .4 2.1.8 3 .5 1.1 1.7 1.4 2.5.5.9-1 1-2.6 1.4-4.4.4-1.9.9-3.2 1.3-5.2.5-2.7-.5-4.8-2.5-5.4-1.5-.5-3 0-4.5 1.5z"/>', s),
  wrench: (s) => base('<path d="M14.7 6.3a4 4 0 0 0 5 5l-9.4 9.4a2.8 2.8 0 0 1-4-4l9.4-9.4a4 4 0 0 0-1-1z" transform="rotate(45 12 12)"/><path d="M14.5 6.5 17 4l3 3-2.5 2.5"/><path d="m6.5 14.5-3 3a2.1 2.1 0 0 0 3 3l3-3"/>', s),
  scales: (s) => base('<path d="M12 3v18M7 21h10M6 7l-3 7h6L6 7zm12 0-3 7h6l-3-7z"/><path d="M3 14a3 3 0 0 0 6 0M15 14a3 3 0 0 0 6 0M6 7l6-2 6 2"/>', s),
  arrow: (s) => base('<path d="M5 12h14M13 6l6 6-6 6"/>', s),
  mail: (s) => base('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>', s),
  close: (s) => base('<path d="M18 6 6 18M6 6l12 12"/>', s),
  menu: (s) => base('<path d="M4 7h16M4 12h16M4 17h16"/>', s),
  quote: (s) => base('<path d="M8 11H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6a4 4 0 0 1-4 4M19 11h-3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6a4 4 0 0 1-4 4"/>', s),
  badge: (s) => base('<path d="M12 2 4 6v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V6l-8-4z"/>', s),
  /** Category logo mark (used in header/footer). */
  logo: () =>
    '<svg class="logo-mark" width="34" height="34" viewBox="0 0 40 40" aria-hidden="true" focusable="false"><rect width="40" height="40" rx="10" fill="#1554c0"/><path d="M11 26l6-12 4 7 3-5 5 10" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="28.5" cy="12.5" r="3" fill="#f59e0b"/></svg>',
};
