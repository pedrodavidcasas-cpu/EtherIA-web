import { SITE, wa, h, icon } from './config.mjs';
import { SOLUTIONS } from './solutions.mjs';
import { FOUNDER } from './founder.mjs';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

// /assets se guarda 7 días en caché (vercel.json): añade un ?v= con el hash del archivo
// para que el navegador descargue la versión nueva en cuanto cambia.
const ROOT = new URL('../', import.meta.url);
const versioned = (path) =>
  `${path}?v=${createHash('sha256').update(readFileSync(new URL('.' + path, ROOT))).digest('hex').slice(0, 10)}`;

const NAV = [
  ['Soluciones', '/#soluciones'],
  ['Demos', '/#demos'],
  ['Proyectos', '/proyectos'],
  ['Precios', '/precios'],
  ['Fundador', '/#fundador'],
  ['Cómo trabajamos', '/#como-trabajamos'],
  ['Preguntas', '/#preguntas'],
];

export const logo = () =>
  `<a href="/" class="brand" aria-label="EtherIA, ir al inicio"><img src="/assets/img/etheria-simbolo-128.png" alt="" width="36" height="36" class="brand-mark"><span class="brand-word">Ether<span>IA</span></span></a>`;

export const btn = (label, href, { variant = 'primary', ico = '', ext = false, cls = '' } = {}) =>
  `<a class="btn btn-${variant}${cls ? ' ' + cls : ''}" href="${h(href)}"${ext ? ' target="_blank" rel="noopener"' : ''}>${ico ? icon(ico, 18) : ''}<span>${label}</span></a>`;

const header = () => `
<a class="skip-link" href="#contenido">Saltar al contenido</a>
<header class="site-header" data-header>
  <div class="container header-inner">
    ${logo()}
    <nav class="main-nav" id="menu" aria-label="Principal" data-menu>
      <ul>${NAV.map(([t, u]) => `<li><a href="${u}">${t}</a></li>`).join('')}</ul>
      <a class="btn btn-primary btn-sm nav-cta-mobile" href="/#diagnostico">Cuéntanos qué necesitas</a>
    </nav>
    <div class="header-actions">
      <a class="btn btn-primary btn-sm" href="${wa()}" target="_blank" rel="noopener">Hablemos</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu" data-menu-toggle>
        <span class="sr-only">Abrir menú</span>${icon('menu', 22, 'i-open')}${icon('close', 22, 'i-close')}
      </button>
    </div>
  </div>
</header>`;

const footer = () => `
<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      ${logo()}
      <p>Soluciones inteligentes para empresas y emprendedores. Automatización, inteligencia artificial y desarrollo web desde Costa Rica.</p>
      <p class="footer-quote">“La tecnología está al servicio de las personas y los negocios, nunca al revés.”</p>
    </div>
    <div>
      <h2 class="footer-title">Soluciones</h2>
      <ul class="footer-links">${SOLUTIONS.map((s) => `<li><a href="/soluciones/${s.slug}">${h(s.short)}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h2 class="footer-title">EtherIA</h2>
      <ul class="footer-links">
        <li><a href="/proyectos">Proyectos</a></li>
        <li><a href="/precios">Precios</a></li>
        <li><a href="/#fundador">Fundador</a></li>
        <li><a href="/#como-trabajamos">Cómo trabajamos</a></li>
        <li><a href="/#diagnostico">Diagnóstico</a></li>
        <li><a href="/#preguntas">Preguntas frecuentes</a></li>
        <li><a href="/privacidad">Política de privacidad</a></li>
      </ul>
    </div>
    <div>
      <h2 class="footer-title">Contacto</h2>
      <ul class="footer-links">
        <li><a href="${wa()}" target="_blank" rel="noopener">${icon('message', 16)} WhatsApp ${SITE.phoneDisplay}</a></li>
        <li><a href="mailto:${SITE.email}">${icon('mail', 16)} ${SITE.email}</a></li>
      </ul>
      <p class="footer-note">Costa Rica · Atención personalizada</p>
    </div>
  </div>
  <div class="container footer-bottom">
    <p>© <span data-year>2026</span> EtherIA. Todos los derechos reservados.</p>
    <p>Las marcas de terceros mencionadas pertenecen a sus respectivos dueños y se citan solo como herramientas que utilizamos.</p>
  </div>
</footer>
<a class="wa-float" href="${wa()}" target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp">${icon('message', 26)}</a>`;

const BASE_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE.url}/#empresa`,
      name: 'EtherIA',
      description:
        'Empresa tecnológica de Costa Rica que resuelve problemas empresariales con automatización, inteligencia artificial y desarrollo web.',
      url: `${SITE.url}/`,
      telephone: `+${SITE.phone}`,
      email: SITE.email,
      image: `${SITE.url}${SITE.ogImage}`,
      logo: `${SITE.url}/assets/img/logo-etheria-512.png`,
      address: { '@type': 'PostalAddress', addressLocality: 'San José', addressRegion: 'San José', addressCountry: 'CR' },
      areaServed: { '@type': 'Country', name: 'Costa Rica' },
      founder: { '@id': `${SITE.url}/#fundador` },
      knowsAbout: ['Automatización de procesos', 'Inteligencia artificial', 'n8n', 'Chatbots de WhatsApp', 'Desarrollo web', 'Gestión de redes sociales'],
    },
    {
      '@type': 'Person',
      '@id': `${SITE.url}/#fundador`,
      name: FOUNDER.name,
      jobTitle: 'Fundador y CEO',
      worksFor: { '@id': `${SITE.url}/#empresa` },
      image: SITE.url + FOUNDER.photo.large,
      url: `${SITE.url}/#fundador`,
      knowsLanguage: ['es', 'en', 'fr'],
      homeLocation: { '@type': 'Place', name: 'Rohrmoser, San José, Costa Rica' },
    },
    { '@type': 'WebSite', '@id': `${SITE.url}/#sitio`, url: `${SITE.url}/`, name: 'EtherIA', inLanguage: 'es-CR', publisher: { '@id': `${SITE.url}/#empresa` } },
  ],
};

// Envuelve el contenido de una página con <head>, cabecera y pie.
export const page = ({ path, title, description, body, schema = [], scripts = [], noindex = false }) => {
  const url = SITE.url + (path === '/' ? '/' : path);
  const graph = { ...BASE_SCHEMA, '@graph': [...BASE_SCHEMA['@graph'], ...schema] };
  return `<!doctype html>
<html lang="es-CR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${h(title)}</title>
<meta name="description" content="${h(description)}">
<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">
${noindex ? '' : `<link rel="canonical" href="${url}">`}
<meta name="author" content="EtherIA">
<meta name="theme-color" content="#05070a">
<meta name="color-scheme" content="dark">
<meta property="og:type" content="website">
<meta property="og:site_name" content="EtherIA">
<meta property="og:locale" content="es_CR">
<meta property="og:title" content="${h(title)}">
<meta property="og:description" content="${h(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE.url}${SITE.ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Logotipo de EtherIA sobre un fondo espacial">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${h(title)}">
<meta name="twitter:description" content="${h(description)}">
<meta name="twitter:image" content="${SITE.url}${SITE.ogImage}">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32.png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="stylesheet" href="${versioned('/assets/css/site.css')}">
<script src="${versioned('/assets/js/site.js')}" defer></script>
${scripts.map((s) => `<script src="${versioned(s)}" defer></script>`).join('\n')}
<script type="application/ld+json">${JSON.stringify(graph)}</script>
</head>
<body>
${header()}
<main id="contenido">
${body}
</main>
${footer()}
</body>
</html>
`;
};

// Encabezado estándar de sección.
export const sectionHead = (eyebrow, title, text = '', { align = 'center', id = '' } = {}) => `
<div class="section-head${align === 'left' ? ' is-left' : ''}">
  ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
  <h2${id ? ` id="${id}"` : ''}>${title}</h2>
  ${text ? `<p class="section-lead">${text}</p>` : ''}
</div>`;

export const breadcrumb = (items) => `
<nav class="breadcrumb" aria-label="Ruta de navegación"><ol>${items
  .map(([t, u], i) => (i === items.length - 1 ? `<li aria-current="page">${h(t)}</li>` : `<li><a href="${u}">${h(t)}</a></li>`))
  .join('')}</ol></nav>`;

export const breadcrumbSchema = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, u], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE.url + (u === '/' ? '/' : u) })),
});

export const faqBlock = (items) => `
<div class="faq-list">${items
  .map(([q, a]) => `<details class="faq-item"><summary>${h(q)}<span class="faq-icon" aria-hidden="true"></span></summary><div class="faq-body"><p>${h(a)}</p></div></details>`)
  .join('')}</div>`;

export const faqSchema = (items) => ({
  '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

// Diagrama de un flujo real en n8n, enlazado a la imagen completa para verlo ampliado.
export const diagramFigure = (d, caption = d.caption || 'Diagrama del flujo real en n8n.') => `
<figure class="diagram reveal">
  <a href="${d.src}" target="_blank" rel="noopener" class="diagram-link" aria-label="Ver el diagrama ampliado en una pestaña nueva">
    <img src="${d.src}" alt="${h(d.alt)}" width="${d.w}" height="${d.h}" loading="lazy" decoding="async">
    <span class="diagram-zoom">${icon('search', 16)} Ampliar</span>
  </a>
  <figcaption>${h(caption)}${d.note ? ' ' + h(d.note) : ''}</figcaption>
</figure>`;

export const ctaBand =(title, text, waText, { secondary = ['Hacer el diagnóstico', '/#diagnostico'] } = {}) => `
<section class="section">
  <div class="container">
    <div class="cta-band reveal">
      <div>
        <h2>${title}</h2>
        <p>${text}</p>
      </div>
      <div class="cta-actions">
        ${btn('Hablemos por WhatsApp', wa(waText), { ico: 'message', ext: true })}
        ${secondary ? btn(secondary[0], secondary[1], { variant: 'ghost' }) : ''}
      </div>
    </div>
  </div>
</section>`;
