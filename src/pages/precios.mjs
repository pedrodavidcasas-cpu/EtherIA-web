import { SITE, wa, h, icon } from '../config.mjs';
import { PLANS, LEVELS, QUOTE_ONLY, crc, priceNote } from '../pricing.mjs';
import { bySlug } from '../solutions.mjs';
import { page, btn, sectionHead, breadcrumb, breadcrumbSchema } from '../layout.mjs';

const INCLUDES = [
  ['search', 'Análisis personalizado', 'Estudiamos las necesidades de tu negocio antes de diseñar la solución.'],
  ['wrench', 'Implementación profesional', 'Configuramos, conectamos y probamos las automatizaciones contratadas.'],
  ['life', 'Soporte continuo', 'Ofrecemos mantenimiento y asistencia según el plan contratado.'],
  ['rocket', 'Evolución de tu sistema', 'Tu automatización puede ampliarse y adaptarse conforme crece tu negocio, según el alcance acordado.'],
];

const quoteText = (p) => `Hola, vi los precios en su web y me interesa "${p.name}" (desde ${crc(p.impl[0])}). Quisiera solicitar una cotización.`;
const calcText = (p, level, impl, monthly) =>
  `Hola, usé la calculadora de precios de su web. Me interesa "${p.name}" con complejidad ${level.toLowerCase()}. Estimación: implementación ${crc(impl)} y ${crc(monthly)}/mes. Quisiera una cotización personalizada.`;

const priceCard = (p) => `
<article class="price-card${p.featured ? ' is-featured' : ''} reveal" aria-labelledby="plan-${p.id}">
  ${p.featured ? `<p class="price-flag">${icon('sparkles', 14)} Solución destacada</p>` : ''}
  <span class="sol-icon">${icon(p.icon, 24)}</span>
  <h3 id="plan-${p.id}">${h(p.name)}</h3>
  <p class="price-text">${h(p.text)}</p>
  <div class="price-box">
    <p class="price-main"><span class="price-from">Desde</span> <strong>${crc(p.impl[0])}</strong></p>
    <p class="price-note">Implementación única</p>
    <p class="price-monthly"><strong>+ ${crc(p.monthly[0])}</strong> / mes</p>
    <p class="price-note">Soporte y mantenimiento</p>
  </div>
  <ul class="mini-list">${p.benefits.map((b) => `<li>${icon('check', 18)}<span>${h(b)}</span></li>`).join('')}</ul>
  <a class="btn ${p.featured ? 'btn-primary' : 'btn-ghost'} price-cta" href="${h(wa(quoteText(p)))}" target="_blank" rel="noopener" aria-label="Solicitar cotización: ${h(p.name)}">${icon('message', 18)}<span>Solicitar cotización</span></a>
</article>`;

const chip = (name, value, label, checked, data = '') =>
  `<label class="chip"><input type="radio" name="${name}" value="${value}"${checked ? ' checked' : ''}${data}><span>${h(label)}</span></label>`;

const calculator = () => {
  const p = PLANS[0];
  return `
<div class="calc-card reveal" data-calc>
  <div class="calc-controls">
    <fieldset class="calc-group">
      <legend class="field-label">1. Tipo de solución</legend>
      <div class="chips">${PLANS.map((x, i) => chip('calc-plan', x.id, x.calcName, i === 0, ` data-name="${h(x.name)}" data-impl="${x.impl.join('-')}" data-monthly="${x.monthly.join('-')}"`)).join('')}</div>
    </fieldset>
    <fieldset class="calc-group">
      <legend class="field-label">2. Complejidad</legend>
      <div class="chips">${LEVELS.map(([v, t], i) => chip('calc-level', v, t, i === 0, ` data-label="${t}"`)).join('')}</div>
      <p class="calc-hint">Básica: una configuración inicial sencilla. Intermedia: más integraciones o volumen. Avanzada: varios procesos, integraciones y reglas a medida.</p>
    </fieldset>
  </div>
  <div class="calc-result">
    <p class="calc-summary" data-calc-summary>${h(p.name)} · Básica</p>
    <div class="calc-figures" aria-hidden="true">
      <div class="calc-figure is-main">
        <p class="calc-label">Implementación estimada</p>
        <p class="calc-value" data-calc-impl>${crc(p.impl[0])}</p>
        <p class="calc-sub">Pago único</p>
      </div>
      <div class="calc-figure">
        <p class="calc-label">Mensualidad estimada</p>
        <p class="calc-value"><span data-calc-monthly>${crc(p.monthly[0])}</span><small> / mes</small></p>
        <p class="calc-sub">Soporte y mantenimiento</p>
      </div>
    </div>
    <p class="sr-only" aria-live="polite" data-calc-live>Estimación para ${h(p.name)}, complejidad básica: implementación ${crc(p.impl[0])} y mensualidad ${crc(p.monthly[0])}.</p>
    ${btn('Solicitar esta cotización', wa(calcText(p, 'Básica', p.impl[0], p.monthly[0])), { ico: 'message', ext: true, cls: 'calc-cta' }).replace('<a ', '<a data-calc-cta ')}
    <p class="calc-disclaimer">${icon('shield', 16)}<span>Estimación para que tengas una idea, no vinculante. Cada automatización es distinta, así que el precio final puede variar y se confirma tras analizar tu caso.</span></p>
  </div>
</div>`;
};

export const precios = () => {
  const crumbs = [['Inicio', '/'], ['Precios', '/precios']];
  const offers = {
    '@type': 'OfferCatalog',
    '@id': `${SITE.url}/precios#catalogo`,
    name: 'Precios orientativos de EtherIA',
    itemListElement: PLANS.map((p) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: p.name, description: p.text, provider: { '@id': `${SITE.url}/#empresa` }, areaServed: { '@type': 'Country', name: 'Costa Rica' } },
      priceSpecification: { '@type': 'PriceSpecification', minPrice: p.impl[0], priceCurrency: 'CRC', description: 'Precio inicial orientativo de implementación; la inversión final depende del alcance del proyecto.' },
    })),
  };
  return page({
    path: '/precios',
    title: 'Precios de automatización e IA en Costa Rica | EtherIA',
    description:
      'Precios orientativos de automatización, asistentes con IA y redes sociales para negocios en Costa Rica. Calcula tu inversión y pide cotización sin compromiso.',
    schema: [breadcrumbSchema(crumbs), offers],
    scripts: ['/assets/js/precios.js'],
    body: `
<section class="page-hero price-hero">
  <div class="container">
    ${breadcrumb(crumbs)}
    <p class="eyebrow">Tecnología inteligente · Inversiones a tu medida</p>
    <h1>Precios orientativos de automatización con IA <span class="grad">en Costa Rica</span></h1>
    <p class="hero-lead">En EtherIA creemos que automatizar tu negocio no debería ser un lujo. Descubre nuestras soluciones y conoce cuánto podrías invertir para ahorrar tiempo, mejorar tu atención y hacer crecer tu empresa.</p>
    <p class="price-badge">${icon('check', 16)}<span>Precios orientativos · Soluciones personalizadas · Sin compromiso</span></p>
  </div>
</section>

<section class="section" id="planes" aria-labelledby="planes-title">
  <div class="container">
    ${sectionHead('Soluciones', 'Automatización e inteligencia artificial a tu alcance', 'Precios iniciales para que tengas una referencia clara. Cada propuesta se ajusta a tus procesos, tus objetivos y tu presupuesto.', { id: 'planes-title' })}
    <div class="price-grid">${PLANS.map(priceCard).join('')}</div>
    <p class="price-quote-only">${icon('pen', 16)}<span>${QUOTE_ONLY.map((x) => `<a href="/soluciones/${x}">${h(bySlug(x).short)}</a>`).join(' y ')}: cotización a medida según el proyecto.</span></p>
    ${priceNote('Los precios mostrados son orientativos y corresponden a configuraciones iniciales. La inversión final dependerá de las funcionalidades, integraciones, complejidad y volumen de uso de cada proyecto.')}
  </div>
</section>

<section class="section section-alt" id="calculadora" aria-labelledby="calc-title">
  <div class="container">
    ${sectionHead('Calculadora', '¿Cuánto podría costar automatizar tu negocio?', 'Selecciona el tipo de solución y descubre una estimación inicial de inversión.', { id: 'calc-title' })}
    ${calculator()}
  </div>
</section>

<section class="section" id="incluye" aria-labelledby="incluye-title">
  <div class="container">
    ${sectionHead('Transparencia', '¿Qué incluye tu inversión?', '', { id: 'incluye-title' })}
    <div class="reason-grid">${INCLUDES.map(([ic, t, d]) => `
      <div class="reason reveal"><span class="reason-ico">${icon(ic, 22)}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="section" id="cotizar" aria-labelledby="cotizar-title">
  <div class="container">
    <div class="final-cta reveal">
      <img src="/assets/img/etheria-simbolo-256.png" alt="" width="120" height="120" loading="lazy" class="final-mark">
      <h2 id="cotizar-title">Tu negocio puede trabajar de forma más inteligente.</h2>
      <p>No necesitas saber de tecnología para empezar. Cuéntanos qué quieres mejorar y diseñaremos una solución adaptada a tus necesidades.</p>
      <div class="cta-actions">
        ${btn('Cuéntame qué necesitas', '/diagnostico', { ico: 'send' })}
      </div>
      <p class="contact-line"><a href="mailto:${SITE.email}">${icon('mail', 16)} ${SITE.email}</a><span>·</span><a href="${wa()}" target="_blank" rel="noopener">${icon('message', 16)} ${SITE.phoneDisplay}</a></p>
    </div>
  </div>
</section>`,
  });
};
