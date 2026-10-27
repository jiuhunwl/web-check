/**
 * Mirrors the check handlers from /api into the EdgeOne function directory.
 *
 * Why: `edgeone makers build` copies `cloud-functions/` into an isolated
 * directory *before* bundling, so a relative import that escapes that directory
 * (`../../api/dns.js`) cannot be resolved. esbuild leaves it as a runtime
 * import, the file is read back from `included_files/`, and every bare
 * specifier inside it (`psl`, `cheerio`, …) fails — each check then returns
 * 500 "Cannot find package 'psl'".
 *
 * Keeping the handlers *inside* `cloud-functions/` lets the platform bundle
 * them — together with their npm dependencies — into the function, which is
 * also what makes it detect the entry as an Express framework function.
 *
 * The copies are committed because the platform scans `cloud-functions/` before
 * running the build command, so they have to exist in the repo already.
 * Re-run this after touching anything in `api/`:
 *
 *   yarn eo:sync
 */
import { cpSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = resolve(root, 'api');
const dest = resolve(root, 'cloud-functions/api/_handlers');

// CJS build helper for the AWS deployment, not a handler
const IGNORED = new Set(['aws-webpack.config.js']);

rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });

let count = 0;
for (const entry of readdirSync(src, { withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith('.js') || IGNORED.has(entry.name)) continue;
  cpSync(join(src, entry.name), join(dest, entry.name));
  count += 1;
}

cpSync(join(src, '_common'), join(dest, '_common'), { recursive: true });

console.log(`[eo] synced ${count} handlers + _common -> cloud-functions/api/_handlers`);
