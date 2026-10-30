import { h, icon } from '../config.mjs';
import { CASES } from '../cases.mjs';
import { bySlug } from '../solutions.mjs';
import { page, btn, breadcrumb, breadcrumbSchema, ctaBand, diagramFigure } from '../layout.mjs';

const media = (c) => {
  if (c.media?.length) {
    const desk = c.media.filter((m) => m.kind === 'desktop');
    const mob = c.media.filter((m) => m.kind === 'mobile');
    return `<div class="gallery">
      ${desk.map((m) => `<figure class="frame-desktop"><div class="frame-bar"><span></span><span></span><span></span><p>${c.url ? h(new URL(c.url).host) : ''}</p></div><img src="${m.src}" alt="${h(m.alt)}" width="${m.w}" height="${m.h}" loading="lazy"></figure>`).join('')}
      <div class="gallery-phones">${mob.map((m) => `<figure class="frame-phone"><img src="${m.src}" alt="${h(m.alt)}" width="${m.w}" height="${m.h}" loading="lazy"></figure>`).join('')}</div>
      <p class="fine-print">Capturas reales del sitio publicado.</p>
    </div>`;
  }
  return `<figure class="arch">
    <ol class="arch-flow">${c.flow.map((f, i) => `<li><span class="arch-n">${i + 1}</span>${h(f)}</li>`).join('')}</ol>
    <figcaption>Diagrama simplificado de la arquitectura. Por confidencialidad, no mostramos datos internos del sistema.</figcaption>
  </figure>`;
};

export const proyectos = () => {
  const crumbs = [['Inicio', '/'], ['Proyectos', '/proyectos']];
  return page({
    path: '/proyectos',
    title: 'Proyectos y casos reales de automatización e IA | EtherIA',
    description:
      'Proyectos reales de EtherIA: web y automatización de contenido de Hands & Paradise Spa, el asistente Kael, contenido para productos y gestión de oportunidades.',
    schema: [breadcrumbSchema(crumbs)],
    body: `
<section class="page-hero">
  <div class="container">
    ${breadcrumb(crumbs)}
    <p class="eyebrow">Proyectos reales</p>
    <h1>Lo que hemos construido y cómo funciona</h1>
    <p class="hero-lead">Preferimos mostrar trabajo real antes que hacer promesas. Aquí explicamos el problema, lo que construimos y el estado actual de cada proyecto, sin métricas infladas ni testimonios inventados.</p>
    <nav class="case-index" aria-label="Proyectos en esta página"><ul>${CASES.map((c) => `<li><a href="#${c.slug}">${h(c.title)}</a></li>`).join('')}</ul></nav>
  </div>
</section>
${CASES.map((c, i) => `
<section class="section${i % 2 ? ' section-alt' : ''} case-detail" id="${c.slug}" aria-labelledby="t-${c.slug}">
  <div class="container case-detail-grid">
    <div class="case-copy reveal">
      <p class="case-kind">${h(c.kind)} · ${h(c.client)}</p>
      <h2 id="t-${c.slug}">${h(c.title)}</h2>
      <p class="case-summary">${h(c.summary)}</p>
      <h3>El desafío</h3>
      <p>${h(c.challenge)}</p>
      <h3>Qué construimos</h3>
      <ul class="check-list">${c.built.map((b) => `<li>${icon('check', 18)}<span>${h(b)}</span></li>`).join('')}</ul>
      ${c.testing ? `<h3>En evolución</h3><ul class="check-list muted">${c.testing.map((b) => `<li>${icon('flask', 18)}<span>${h(b)}</span></li>`).join('')}</ul>` : ''}
      <h3>Tecnologías</h3>
      <ul class="tag-list">${c.stack.map((t) => `<li>${h(t)}</li>`).join('')}</ul>
      <p class="case-status"><strong>Estado:</strong> ${h(c.status)}</p>
      <div class="case-actions">
        ${c.url ? btn('Visitar el sitio', c.url, { variant: 'ghost', ico: 'external', ext: true }) : ''}
        ${btn(`Ver solución: ${h(bySlug(c.solution).short)}`, `/soluciones/${c.solution}`, { variant: 'link' })}
      </div>
    </div>
    <div class="case-media reveal">${media(c)}</div>
  </div>
  ${c.diagram ? `<div class="container case-diagram"><h3 class="small-title">Así se ve por dentro</h3>${diagramFigure(c.diagram)}</div>` : ''}
</section>`).join('')}
${ctaBand('¿Tienes un desafío parecido?', 'Cuéntanos cómo funciona tu negocio y vemos juntos qué solución puede aportarte más valor.', 'Hola, vi sus proyectos y me gustaría conversar sobre una solución para mi negocio.')}`,
  });
};
