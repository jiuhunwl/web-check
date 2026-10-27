/**
 * Translation coverage check.
 *
 * Bundles the i18n runtime, then looks for every English string the UI asks to
 * translate (t('...') calls and data-i18n attributes) and reports the ones that
 * have no Chinese entry. Run with: node scripts/i18n-audit.mjs
 */
import { build } from 'esbuild';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const src = join(root, 'src');
const outfile = join(root, 'node_modules', '.i18n-audit.mjs');

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

await build({
  entryPoints: [join(src, 'i18n', 'index.ts')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile,
  define: { 'import.meta.env': '{}' },
  logLevel: 'silent',
});

const { hasTranslation } = await import(`${pathToFileURL(outfile).href}?v=${Date.now()}`);

const files = walk(src).filter(
  (file) => /\.(tsx?|astro)$/.test(file) && !file.replace(/\\/g, '/').includes('/i18n/'),
);

const missing = new Map();
const add = (key, file) => {
  if (!key || key.length < 3) return;
  if (key.startsWith('check:') || key.startsWith('category:') || key.startsWith('term:')) return;
  if (key.includes('${')) return;
  if (hasTranslation(key, 'zh-CN')) return;
  if (!missing.has(key)) missing.set(key, new Set());
  missing.get(key).add(relative(root, file));
};

for (const file of files) {
  const text = readFileSync(file, 'utf8');
  const isAstro = file.endsWith('.astro');

  const callPattern = /\bt\(\s*(['"])((?:\\.|(?!\1)[^\\])*)\1/g;
  for (const match of text.matchAll(callPattern)) add(match[2], file);

  if (!isAstro) continue;
  const attrPattern = /data-i18n(?:-[a-z-]+)?=(?:"([^"]+)"|'([^']+)')/g;
  for (const match of text.matchAll(attrPattern)) add(match[1] ?? match[2], file);
}

// The handlers word their own skip reasons, which the client translates by
// matching the finished sentence back to its key (see localizeReason)
const handlerDirs = [join(root, 'api'), join(root, 'cloud-functions', 'api', '_handlers')];
for (const dir of handlerDirs) {
  if (!existsSync(dir)) continue;
  for (const file of walk(dir).filter((f) => f.endsWith('.js'))) {
    const text = readFileSync(file, 'utf8');
    for (const match of text.matchAll(/skipped:\s*(['"`])((?:\\[\s\S]|(?!\1)[^\\])*?)\1/g))
      add(match[2].trim(), file);
  }
}

const rows = [...missing.entries()].sort((a, b) => a[0].localeCompare(b[0]));
if (!rows.length) {
  console.log('All translated strings have a Chinese entry.');
} else {
  console.log(`${rows.length} strings still fall back to English:\n`);
  for (const [key, where] of rows) {
    console.log(`- ${key}\n    ${[...where].join(', ')}`);
  }
}
