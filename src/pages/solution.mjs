import { SITE, wa, h, icon } from '../config.mjs';
import { SOLUTIONS, STATUS } from '../solutions.mjs';
import { caseBySlug } from '../cases.mjs';
import { page, btn, sectionHead, breadcrumb, breadcrumbSchema, faqBlock, faqSchema, ctaBand, diagramFigure } from '../layout.mjs';

const capabilities = (s) => {
  if (s.capabilities) {
    const used = [...new Set(s.capabilities.map(([, st]) => st))];
    return `
    <ul class="cap-list">${s.capabilities.map(([t, st]) => `<li><span>${h(t)}</span><span class="status status-${st}">${STATUS[st].label}</span></li>`).join('')}</ul>
    <dl class="status-legend">${used.map((st) => `<div><dt><span class="status status-${st}">${STATUS[st].label}</span></dt><dd>${STATUS[st].hint}</dd></div>`).join('')}</dl>`;
  }
  if (s.examples) return `<ul class="example-grid">${s.examples.map(([t, ic]) => `<li>${icon(ic, 20)}<span>${h(t)}</span></li>`).join('')}</ul>`;
  return `<ul class="example-grid">${s.services.map((t) => `<li>${icon('check', 20)}<span>${h(t)}</span></li>`).join('')}</ul>`;
};

export const solutionPage = (s) => {
  const path = `/soluciones/${s.slug}`;
  const crumbs = [['Inicio', '/'], ['Soluciones', '/#soluciones'], [s.short, path]];
  const rel = caseBySlug(s.caseSlug);
  const others = SOLUTIONS.filter((o) => o.slug !== s.slug);
  return page({
    path,
    title: s.seoTitle,
    description: s.seoDescription,
    schema: [
      {
        '@type': 'Service',
        name: s.name,
        description: s.seoDescription,
        url: SITE.url + path,
        provider: { '@id': `${SITE.url}/#empresa` },
        areaServed: { '@type': 'Country', name: 'Costa Rica' },
        serviceType: s.short,
      },
      breadcrumbSchema(crumbs),
      faqSchema(s.faq),
    ],
    body: `
<section class="page-hero">
  <div class="container">
    ${breadcrumb(crumbs)}
    <div class="page-hero-grid">
      <div>
        <p class="eyebrow">${icon(s.icon, 16)} ${h(s.name)}</p>
        <h1>${h(s.h1)}</h1>
        <p class="hero-lead">${h(s.lead)}</p>
        <div class="hero-actions">
          ${btn('Conversemos sobre tu caso', wa(s.wa), { ico: 'message', ext: true })}
          ${btn('Hacer el diagnóstico', '/#diagnostico', { variant: 'ghost' })}
        </div>
      </div>
      <aside class="for-who" aria-labelledby="forwho">
        <h2 id="forwho">Pensado para</h2>
        <ul class="tag-list">${s.forWho.map((t) => `<li>${h(t)}</li>`).join('')}</ul>
      </aside>
    </div>
  </div>
</section>

<section class="section">
  <div class="container two-col">
    <div>
      ${sectionHead('El problema', '¿Te pasa algo de esto?', '', { align: 'left' })}
      <ul class="problem-list">${s.problems.map((p) => `<li class="reveal">${icon('zap', 18)}<span>${h(p)}</span></li>`).join('')}</ul>
    </div>
    <div>
      ${sectionHead('Lo que ganas', 'Beneficios', '', { align: 'left' })}
      <ul class="check-list big">${s.benefits.map((b) => `<li class="reveal">${icon('check', 18)}<span>${h(b)}</span></li>`).join('')}</ul>
    </div>
  </div>
</section>

<section class="section section-alt">
  <div class="container">
    ${sectionHead('Cómo funciona', 'Paso a paso', 'Un ejemplo de arquitectura. En cada proyecto adaptamos las etapas a tus procesos y herramientas.')}
    <ol class="flow-steps-big">${s.steps.map(([t, d], i) => `<li class="reveal"><span class="step-n">${i + 1}</span><div><h3>${h(t)}</h3><p>${h(d)}</p></div></li>`).join('')}</ol>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead(s.capabilities ? 'Capacidades' : 'Qué incluye', s.capabilities ? 'Qué puede hacer, con total transparencia' : s.examples ? 'Ejemplos de lo que podemos automatizar' : 'Lo que podemos construir para ti', s.capabilities ? 'Distinguimos lo que ya hemos desarrollado de lo que se diseña a medida para cada proyecto.' : '')}
    <div class="reveal">${capabilities(s)}</div>
    ${s.tools ? `<div class="tools reveal"><p>Herramientas y tecnologías que utilizamos en distintas etapas:</p><ul class="tag-list">${s.tools.map((t) => `<li>${h(t)}</li>`).join('')}</ul></div>` : ''}
  </div>
</section>

<section class="section">
  <div class="container container-narrow">
    <div class="honesty reveal">
      <h2>${icon('eye', 22)} Con transparencia</h2>
      <ul>${s.honesty.map((t) => `<li>${h(t)}</li>`).join('')}</ul>
    </div>
  </div>
</section>

${rel?.diagram ? `
<section class="section">
  <div class="container">
    ${sectionHead('Experiencia real', 'Así se ve por dentro', `Este es el flujo que construimos para «${h(rel.title)}». Cada proyecto se adapta a las herramientas y procesos de cada negocio.`)}
    ${diagramFigure(rel.diagram)}
  </div>
</section>` : ''}

${rel ? `
<section class="section section-alt">
  <div class="container">
    <article class="related-case reveal">
      <div>
        <p class="case-kind">Proyecto relacionado</p>
        <h2>${h(rel.title)}</h2>
        <p>${h(rel.summary)}</p>
      </div>
      ${btn('Ver el caso', `/proyectos#${rel.slug}`, { variant: 'ghost', ico: 'arrow' })}
    </article>
  </div>
</section>` : ''}

<section class="section">
  <div class="container container-narrow">
    ${sectionHead('Preguntas frecuentes', 'Dudas habituales', '')}
    ${faqBlock(s.faq)}
  </div>
</section>

${ctaBand('Cuéntanos qué necesitas resolver', 'Te escuchamos, analizamos tu caso y te decimos con honestidad si esta solución tiene sentido para tu negocio.', s.wa)}

<section class="section section-tight">
  <div class="container">
    <h2 class="small-title">Otras soluciones</h2>
    <ul class="other-sol">${others.map((o) => `<li><a href="/soluciones/${o.slug}">${icon(o.icon, 18)}<span>${h(o.short)}</span></a></li>`).join('')}</ul>
  </div>
</section>`,
  });
};
