/**
 * EdgeOne Makers Cloud Function — serves everything under /api/*
 *
 * The checks live in /api as platform-agnostic handlers (Netlify / Vercel /
 * Express). This file mounts them on a single Express app, which EdgeOne
 * Makers accepts as a function entry (`export default app`).
 *
 * Handlers are mirrored from /api into ./_handlers by scripts/sync-eo-handlers.mjs.
 * They must live inside cloud-functions/: the platform copies this directory to
 * an isolated location before bundling, so imports pointing outside it stay
 * unresolved and fail at runtime on their npm dependencies.
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
  'archives': () => import('./_handlers/archives.js'),
  'block-lists': () => import('./_handlers/block-lists.js'),
  'breaches': () => import('./_handlers/breaches.js'),
  'caa-records': () => import('./_handlers/caa-records.js'),
  'carbon': () => import('./_handlers/carbon.js'),
  'dns-server': () => import('./_handlers/dns-server.js'),
  'dns': () => import('./_handlers/dns.js'),
  'dnssec': () => import('./_handlers/dnssec.js'),
  'firewall': () => import('./_handlers/firewall.js'),
  'get-ip': () => import('./_handlers/get-ip.js'),
  'headers': () => import('./_handlers/headers.js'),
  'hsts': () => import('./_handlers/hsts.js'),
  'http-security': () => import('./_handlers/http-security.js'),
  'linked-pages': () => import('./_handlers/linked-pages.js'),
  'location': () => import('./_handlers/location.js'),
  'mail-config': () => import('./_handlers/mail-config.js'),
  'mixed-content': () => import('./_handlers/mixed-content.js'),
  'ports': () => import('./_handlers/ports.js'),
  'quality': () => import('./_handlers/quality.js'),
  'rank': () => import('./_handlers/rank.js'),
  'redirects': () => import('./_handlers/redirects.js'),
  'robots-txt': () => import('./_handlers/robots-txt.js'),
  'security-txt': () => import('./_handlers/security-txt.js'),
  'shodan': () => import('./_handlers/shodan.js'),
  'sitemap': () => import('./_handlers/sitemap.js'),
  'social-presence': () => import('./_handlers/social-presence.js'),
  'social-tags': () => import('./_handlers/social-tags.js'),
  'ssl': () => import('./_handlers/ssl.js'),
  'status': () => import('./_handlers/status.js'),
  'subdomains': () => import('./_handlers/subdomains.js'),
  'threats': () => import('./_handlers/threats.js'),
  'tls-connection': () => import('./_handlers/tls-connection.js'),
  'tls-labs': () => import('./_handlers/tls-labs.js'),
  'trace-route': () => import('./_handlers/trace-route.js'),
  'txt-records': () => import('./_handlers/txt-records.js'),
  'whois': () => import('./_handlers/whois.js'),
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
