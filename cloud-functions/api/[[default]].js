/**
 * EdgeOne Makers Cloud Function — serves everything under /api/*
 *
 * The checks live in /api as platform-agnostic handlers (Netlify / Vercel /
 * Express). This file mounts them on a single Express app, which EdgeOne
 * Makers accepts as a function entry (`export default app`).
 *
 * Two things to keep in mind when editing:
 *
 * 1. `api/_common/middleware.js` reads `process.env.PLATFORM` at module
 *    evaluation time, and its NETLIFY branch calls `module.exports`, which
 *    throws in ESM. So PLATFORM has to be set before any handler is imported.
 *    ESM imports are hoisted, hence the lazy `import()` table below.
 *
 * 2. `cookies`, `screenshot`, `tech-stack` and `trackers` need a headless
 *    Chromium binary, which Makers functions don't ship. They answer with
 *    `{ skipped }` so the UI shows a clear message instead of a network error.
 */

process.env.PLATFORM = process.env.PLATFORM || 'node';
process.env.WC_SERVER = process.env.WC_SERVER || 'true';

import express from 'express';

/** Checks that need a browser we can't run here */
const NEEDS_BROWSER = {
  cookies: 'Cookies',
  screenshot: 'Screenshot',
  'tech-stack': 'Tech stack',
  trackers: 'Trackers',
};

/** Lazy loaders — static specifiers so the bundler can follow them */
const loaders = {
  'archives': () => import('../../api/archives.js'),
  'block-lists': () => import('../../api/block-lists.js'),
  'breaches': () => import('../../api/breaches.js'),
  'caa-records': () => import('../../api/caa-records.js'),
  'carbon': () => import('../../api/carbon.js'),
  'dns-server': () => import('../../api/dns-server.js'),
  'dns': () => import('../../api/dns.js'),
  'dnssec': () => import('../../api/dnssec.js'),
  'firewall': () => import('../../api/firewall.js'),
  'get-ip': () => import('../../api/get-ip.js'),
  'headers': () => import('../../api/headers.js'),
  'hsts': () => import('../../api/hsts.js'),
  'http-security': () => import('../../api/http-security.js'),
  'linked-pages': () => import('../../api/linked-pages.js'),
  'location': () => import('../../api/location.js'),
  'mail-config': () => import('../../api/mail-config.js'),
  'mixed-content': () => import('../../api/mixed-content.js'),
  'ports': () => import('../../api/ports.js'),
  'quality': () => import('../../api/quality.js'),
  'rank': () => import('../../api/rank.js'),
  'redirects': () => import('../../api/redirects.js'),
  'robots-txt': () => import('../../api/robots-txt.js'),
  'security-txt': () => import('../../api/security-txt.js'),
  'shodan': () => import('../../api/shodan.js'),
  'sitemap': () => import('../../api/sitemap.js'),
  'social-presence': () => import('../../api/social-presence.js'),
  'social-tags': () => import('../../api/social-tags.js'),
  'ssl': () => import('../../api/ssl.js'),
  'status': () => import('../../api/status.js'),
  'subdomains': () => import('../../api/subdomains.js'),
  'threats': () => import('../../api/threats.js'),
  'tls-connection': () => import('../../api/tls-connection.js'),
  'tls-labs': () => import('../../api/tls-labs.js'),
  'trace-route': () => import('../../api/trace-route.js'),
  'txt-records': () => import('../../api/txt-records.js'),
  'whois': () => import('../../api/whois.js'),
};

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', true);

// Makers may hand us either `/api/dns` or `/dns`, depending on how the
// catch-all is mounted — normalise both to `/dns`.
app.use((req, _res, next) => {
  if (req.url === '/api' || req.url.startsWith('/api/') || req.url.startsWith('/api?')) {
    req.url = req.url.slice(4) || '/';
  }
  next();
});

// The handlers already send JSON; this only covers preflight and CORS
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', process.env.API_CORS_ORIGIN || '*');
  res.set('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  next();
});

app.get('/', (_req, res) => {
  res.json({ status: 'ok', checks: Object.keys(loaders).sort() });
});

app.get('/:name', async (req, res) => {
  const name = String(req.params.name || '').toLowerCase();

  if (NEEDS_BROWSER[name]) {
    return res.status(200).json({
      skipped: `${NEEDS_BROWSER[name]} check needs headless Chromium, which EdgeOne Makers functions don't provide. Self-host with Docker if you need it.`,
    });
  }

  const load = loaders[name];
  if (!load) {
    return res.status(404).json({ error: `Unknown check: ${name}` });
  }

  try {
    const mod = await load();
    const handler = mod.default || mod;
    await handler(req, res);
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ error: err?.message || String(err) });
    }
  }
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

export default app;
