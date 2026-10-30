// Verificaciones del sitio estático (sin dependencias):
// sintaxis JS, enlaces e imágenes internas, un <h1> por página, metadatos SEO,
// JSON-LD válido, ids duplicados, atributos alt, estilos en línea (bloqueados por la CSP) y posibles secretos.
// Uso: npm run verificar
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKIP = new Set(['.git', 'node_modules', '.vercel']);
const walk = (dir) =>
  readdirSync(dir).flatMap((n) => {
    if (SKIP.has(n)) return [];
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
const files = walk(root);
const rel = (p) => relative(root, p).replaceAll('\\', '/');
const errors = [];
const warn = [];
const fail = (f, msg) => errors.push(`${rel(f)}: ${msg}`);

// 1. Sintaxis de JavaScript
for (const f of files.filter((f) => /\.(m?js)$/.test(f))) {
  try {
    execFileSync(process.execPath, ['--check', f], { stdio: 'pipe' });
  } catch (e) {
    fail(f, 'error de sintaxis\n' + e.stderr.toString());
  }
}

// 2. Páginas HTML
const html = files.filter((f) => f.endsWith('.html'));
const routeExists = (url) => {
  const clean = url.split(/[?#]/)[0].replace(/\/$/, '');
  if (clean === '') return existsSync(join(root, 'index.html'));
  const p = join(root, clean);
  return existsSync(p) || existsSync(p + '.html') || existsSync(join(p, 'index.html'));
};
const idsByPage = new Map();
for (const f of html) {
  const src = readFileSync(f, 'utf8');
  idsByPage.set(rel(f), new Set([...src.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}
const pageFor = (url) => {
  const clean = url.split('#')[0].replace(/\/$/, '');
  return clean === '' ? 'index.html' : `${clean.slice(1)}/index.html`;
};

for (const f of html) {
  const src = readFileSync(f, 'utf8');
  const name = rel(f);
  const h1 = (src.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) fail(f, `debe tener exactamente un <h1> (tiene ${h1})`);
  if (!/<title>[^<]{10,70}<\/title>/.test(src)) fail(f, '<title> ausente o fuera de 10–70 caracteres');
  const desc = src.match(/<meta name="description" content="([^"]*)"/);
  if (!desc) fail(f, 'falta meta description');
  else if (desc[1].length < 70 || desc[1].length > 175) warn.push(`${name}: meta description de ${desc[1].length} caracteres`);
  if (name !== '404.html' && !/<link rel="canonical" href="https:\/\/www\.etheriatech\.com/.test(src)) fail(f, 'falta canonical');
  if (/\sstyle="/.test(src)) fail(f, 'contiene atributos style="" (bloqueados por la CSP)');
  if (/<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>/.test(src)) fail(f, 'contiene <script> en línea (bloqueado por la CSP)');

  for (const m of src.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { fail(f, 'JSON-LD inválido'); }
  }
  const ids = [...src.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dup.length) fail(f, `ids duplicados: ${[...new Set(dup)].join(', ')}`);
  for (const m of src.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="/.test(m[0])) fail(f, `imagen sin alt: ${m[0].slice(0, 80)}`);
    if (!/\swidth="\d+"/.test(m[0]) || !/\sheight="\d+"/.test(m[0])) fail(f, `imagen sin width/height: ${m[0].slice(0, 80)}`);
  }
  for (const m of src.matchAll(/\s(?:href|src|srcset)="([^"]+)"/g)) {
    for (const raw of m[1].split(',').map((s) => s.trim().split(' ')[0])) {
      if (raw.startsWith('#')) {
        if (raw.length > 1 && !idsByPage.get(name).has(raw.slice(1))) fail(f, `ancla inexistente ${raw}`);
      } else if (raw.startsWith('/')) {
        if (!routeExists(raw)) fail(f, `enlace interno roto ${raw}`);
        const hash = raw.split('#')[1];
        if (hash && !idsByPage.get(pageFor(raw))?.has(hash)) fail(f, `ancla inexistente ${raw}`);
      }
    }
  }
}

// 3. Archivos referenciados desde CSS
for (const f of files.filter((f) => f.endsWith('.css'))) {
  for (const m of readFileSync(f, 'utf8').matchAll(/url\(["']?(\/[^"')]+)/g)) if (!existsSync(join(root, m[1]))) fail(f, `recurso inexistente ${m[1]}`);
}

// 4. XML y JSON
const sm = readFileSync(join(root, 'sitemap.xml'), 'utf8');
if (!sm.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) fail(join(root, 'sitemap.xml'), 'namespace incorrecto');
for (const loc of sm.matchAll(/<loc>https:\/\/www\.etheriatech\.com([^<]*)<\/loc>/g)) if (!routeExists(loc[1] || '/')) fail(join(root, 'sitemap.xml'), `URL sin página: ${loc[1]}`);
for (const f of files.filter((f) => f.endsWith('.json') || f.endsWith('.webmanifest'))) {
  try { JSON.parse(readFileSync(f, 'utf8')); } catch { fail(f, 'JSON inválido'); }
}

// 5. Posibles secretos expuestos
const SECRET = [/sk-[A-Za-z0-9_-]{20,}/, /AIza[0-9A-Za-z_-]{30,}/, /ghp_[A-Za-z0-9]{30,}/, /xox[bp]-[A-Za-z0-9-]{20,}/, /\b\d{8,10}:[A-Za-z0-9_-]{35}\b/, /https?:\/\/[^\s"'`]*\/webhook\/[A-Za-z0-9-]{8,}/];
for (const f of files.filter((f) => /\.(html|js|mjs|css|json|md|txt|xml)$/.test(f))) {
  const src = readFileSync(f, 'utf8');
  for (const re of SECRET) if (re.test(src)) fail(f, `posible secreto expuesto (${re.source.slice(0, 20)}…)`);
}

for (const w of warn) console.log('  aviso:', w);
if (errors.length) {
  console.error(`\n✗ ${errors.length} problema(s):\n` + errors.map((e) => '  - ' + e).join('\n'));
  process.exit(1);
}
console.log(`✓ Verificación correcta: ${html.length} páginas HTML, ${files.filter((f) => /\.(m?js)$/.test(f)).length} archivos JS.`);
