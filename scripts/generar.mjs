// Genera las páginas HTML estáticas del sitio a partir de /src.
// Uso: npm run generar   (luego: npm run verificar)
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE } from '../src/config.mjs';
import { SOLUTIONS } from '../src/solutions.mjs';
import { home } from '../src/pages/home.mjs';
import { solutionPage } from '../src/pages/solution.mjs';
import { proyectos } from '../src/pages/proyectos.mjs';
import { privacidad, notFound } from '../src/pages/legal.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const write = (rel, content) => {
  const file = join(root, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
  console.log('  ✓', rel);
};

const pages = [
  ['/', 'index.html', home(), '1.0', 'monthly'],
  ...SOLUTIONS.map((s) => [`/soluciones/${s.slug}`, `soluciones/${s.slug}/index.html`, solutionPage(s), '0.8', 'monthly']),
  ['/proyectos', 'proyectos/index.html', proyectos(), '0.7', 'monthly'],
  ['/privacidad', 'privacidad/index.html', privacidad(), '0.2', 'yearly'],
];

console.log('Generando páginas…');
for (const [, file, html] of pages) write(file, html);
write('404.html', notFound());

write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(([path, , , prio, freq]) => `  <url>
    <loc>${SITE.url}${path}</loc>
    <lastmod>${SITE.updated}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${prio}</priority>
  </url>`).join('\n')}
</urlset>
`,
);

write('robots.txt', `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE.url}/sitemap.xml\n`);

write(
  'site.webmanifest',
  JSON.stringify(
    {
      name: 'EtherIA',
      short_name: 'EtherIA',
      lang: 'es-CR',
      start_url: '/',
      display: 'browser',
      background_color: '#05070a',
      theme_color: '#05070a',
      icons: [
        { src: '/assets/img/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        { src: '/assets/img/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2,
  ) + '\n',
);
console.log(`Listo: ${pages.length + 1} páginas.`);
