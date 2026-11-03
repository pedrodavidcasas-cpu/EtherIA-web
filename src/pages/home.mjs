import { SITE, wa, h, icon } from '../config.mjs';
import { bySlug } from '../solutions.mjs';
import { caseBySlug } from '../cases.mjs';
import { FOUNDER } from '../founder.mjs';
import { PLANS, QUOTE_ONLY, crc, priceNote } from '../pricing.mjs';
import { page, btn, sectionHead, faqBlock, faqSchema } from '../layout.mjs';

// Orden de la portada: hero → soluciones → proyectos → demos → precios → por qué → fundador → cómo trabajamos → preguntas → contacto.
// El diagnóstico vive en /diagnostico (src/pages/diagnostico.mjs).

const DIAG = '/diagnostico';
const DIAG_LABEL = 'Cuéntame qué necesitas';

// Soluciones: problema reconocible, solución concreta, beneficio y enlace descriptivo a su página.
const SOLUTION_CARDS = [
  ['recepcionista-ia', '¿Respondes los mismos mensajes todo el día?', 'Atiende consultas por WhatsApp con el contexto de cada conversación y pide ayuda a una persona cuando hace falta.', 'Respuestas rápidas sin perder el trato humano.', 'Ver la recepcionista con IA'],
  ['redes-sociales-ia', '¿Tus redes se quedan sin publicar?', 'Prepara, organiza y publica contenido para mantener activa tu presencia digital, con tu aprobación antes de publicar.', 'Constancia en redes sin dedicarle horas cada semana.', 'Ver redes sociales con IA'],
  ['contenido-productos', '¿Tus productos no lucen como merecen?', 'Convierte las fotografías de tus productos en contenido preparado para promocionarlos en redes sociales.', 'Una presentación más profesional de tu catálogo.', 'Ver contenido para productos'],
  ['gestion-oportunidades', '¿Tus clientes interesados se enfrían?', 'Organiza contactos, oportunidades y seguimientos para que cada interesado tenga una respuesta.', 'Menos oportunidades perdidas por falta de seguimiento.', 'Ver gestión de oportunidades'],
  ['desarrollo-web', '¿Tu página no refleja el valor de tu negocio?', 'Creamos sitios web profesionales, rápidos, adaptados al celular y preparados para el posicionamiento SEO.', 'Una web que facilita que te encuentren y te contacten.', 'Ver desarrollo web'],
  ['automatizacion-procesos', '¿Tu equipo pierde tiempo copiando información?', 'Conectamos tus herramientas, hojas de cálculo y sistemas para automatizar las tareas repetitivas.', 'Más tiempo para el trabajo que sí necesita personas.', 'Ver automatización de procesos'],
];

// "Por qué EtherIA": fusiona las antiguas secciones Por qué, Compromiso y Promesa, sin repetir conceptos.
const REASONS = [
  ['ear', 'Escuchamos antes de proponer', 'Entendemos cómo funciona tu negocio antes de recomendar cualquier tecnología.'],
  ['layers', 'Soluciones a la medida de tu negocio', 'No imponemos un sistema estándar: lo adaptamos a tus procesos y a las herramientas que ya usas.'],
  ['message', 'Comunicación cercana', 'Hablas directamente con una persona de EtherIA, en lenguaje claro y sin tecnicismos innecesarios.'],
  ['eye', 'Te explicamos lo que construimos', 'Alcance, limitaciones, requisitos y costos por escrito antes de empezar. Sin sorpresas.'],
  ['target', 'Soluciones prácticas', 'Cada automatización debe resolver una necesidad concreta. Si algo no conviene automatizarse, te lo decimos.'],
  ['users', 'Te acompañamos después de la entrega', 'Te enseñamos a usar lo que construimos y seguimos disponibles según el soporte que contrates.'],
];

const STEPS = [
  ['Entendemos tu negocio', 'Escuchamos tus necesidades, identificamos los problemas y evaluamos las oportunidades de mejora.'],
  ['Construimos y probamos', 'Desarrollamos la solución, la integramos con tus herramientas y verificamos que funcione antes de entregarla.'],
  ['Te acompañamos', 'Te explicamos cómo usarla y te damos el acompañamiento que corresponde al servicio contratado.'],
];

export const FAQ = [
  ['¿Necesito saber de tecnología para trabajar con EtherIA?', 'No. Tú conoces tu negocio; nosotros nos encargamos de la parte técnica y te la explicamos en lenguaje claro. No necesitas saber qué tecnología contratar: cuéntanos qué necesitas resolver.'],
  ['¿Cuánto cuesta automatizar mi negocio con IA?', 'Depende del alcance, de las herramientas involucradas y del nivel de acompañamiento. En la página de precios encontrarás precios orientativos y una calculadora. Antes de empezar recibes una propuesta clara con alcance, costos y tiempos, y la primera conversación no tiene costo.'],
  ['¿Cuánto tiempo toma implementar una automatización?', 'Varía según la complejidad. Una automatización sencilla puede estar lista en poco tiempo, mientras que un sistema con varias integraciones requiere más etapas. El plazo se define en la propuesta.'],
  ['¿Funciona con las herramientas que ya uso?', 'En muchos casos, sí. Trabajamos con WhatsApp, Google Sheets, Google Drive, Telegram, redes sociales y sistemas con acceso por API. Lo evaluamos en el análisis inicial.'],
  ['¿Un asistente de WhatsApp con IA reemplaza a mi equipo?', 'No es el objetivo. Se encarga de las consultas repetitivas para que las personas se concentren en lo que requiere criterio humano, y deriva a tu equipo las conversaciones que necesitan atención personal.'],
  ['¿Qué pasa con los datos de mi negocio y de mis clientes?', 'Accedemos solo a la información necesaria para el proyecto, preferimos que las cuentas y credenciales estén a nombre de tu negocio y no compartimos tus datos con terceros con fines comerciales.'],
  ['¿Ofrecen soporte después de la entrega?', 'Sí, según las condiciones que contrates: mantenimiento, ajustes y evolución del sistema. Lo dejamos definido por escrito para que sepas qué incluye.'],
  ['¿El contenido generado con IA se publica sin revisión?', 'Recomendamos siempre un paso de revisión y aprobación. La IA es una gran ayuda, pero una persona debe confirmar que el contenido es correcto antes de publicarlo.'],
  ['¿Trabajan solo con negocios de Costa Rica?', 'Estamos en San José, Costa Rica, y gran parte del trabajo se coordina de forma remota. Si tu negocio está en otro lugar, conversemos y vemos si podemos ayudarte.'],
];

const solutionCard = ([slug, question, text, benefit, link]) => {
  const s = bySlug(slug);
  return `
<article class="sol-card reveal">
  <div class="sol-top"><span class="sol-icon">${icon(s.icon, 22)}</span><p class="sol-problem">${h(question)}</p></div>
  <h3><a href="/soluciones/${slug}" class="stretched">${h(s.short)}</a></h3>
  <p>${h(text)}</p>
  <p class="sol-benefit">${icon('check', 16)}<span>${h(benefit)}</span></p>
  <span class="card-link">${h(link)} ${icon('arrow', 16)}</span>
</article>`;
};

const caseCard = (c) => `
<article class="case-card reveal">
  ${c.diagram ? `<div class="case-thumb"><img src="${c.diagram.src}" alt="" width="${c.diagram.w}" height="${c.diagram.h}" loading="lazy" decoding="async"></div>` : ''}
  <p class="case-kind">${h(c.kind)} · ${h(c.client)}</p>
  <h3><a href="/proyectos#${c.slug}" class="stretched">${h(c.title)}</a></h3>
  <p>${h(c.summary)}</p>
  <span class="card-link">Ver cómo funciona ${icon('arrow', 16)}</span>
</article>`;

const demos = () => `
<section class="section" id="demos" aria-labelledby="demos-title">
  <div class="container">
    ${sectionHead('Demostraciones interactivas', 'Prueba cómo responde un asistente de WhatsApp con IA', 'Descubre cómo un asistente inteligente puede atender consultas, comprender necesidades y ayudarte a gestionar conversaciones. También puedes probar ejemplos de redes sociales y de contenido para productos.', { id: 'demos-title' })}
    <div class="demo-shell reveal">
      <div class="demo-tabs" role="tablist" aria-label="Demostraciones">
        <button role="tab" id="tab-chat" aria-controls="panel-chat" aria-selected="true">${icon('message', 18)}<span>Asistente de WhatsApp</span></button>
        <button role="tab" id="tab-social" aria-controls="panel-social" aria-selected="false" tabindex="-1">${icon('sparkles', 18)}<span>Gestor de redes</span></button>
        <button role="tab" id="tab-product" aria-controls="panel-product" aria-selected="false" tabindex="-1">${icon('camera', 18)}<span>Contenido de productos</span></button>
      </div>

      <div class="demo-panel" role="tabpanel" id="panel-chat" aria-labelledby="tab-chat">
        <p class="demo-badge">${icon('flask', 14)} Demostración simulada · negocio y datos ficticios</p>
        <div class="chat-demo" data-chat>
          <div class="chat-window">
            <div class="chat-head">
              <span class="chat-avatar">${icon('bot', 20)}</span>
              <div><p class="chat-name">Asistente de Clínica Dental Aurora</p><p class="chat-sub">Negocio ficticio · respuestas automáticas</p></div>
            </div>
            <div class="chat-log" data-chat-log role="log" aria-live="polite" aria-label="Conversación de la demostración"></div>
            <p class="chat-hint">Toca una pregunta sugerida o escribe la tuya:</p>
            <div class="chat-suggest" data-chat-suggest aria-label="Preguntas sugeridas"></div>
            <form class="chat-input" data-chat-form>
              <label for="chat-msg" class="sr-only">Escribe un mensaje para el asistente de la demostración</label>
              <input id="chat-msg" type="text" maxlength="200" autocomplete="off" placeholder="Escribe una pregunta…">
              <button type="submit" aria-label="Enviar">${icon('send', 18)}</button>
            </form>
          </div>
          <details class="chat-behind" data-chat-behind open>
            <summary><h3 id="behind-title">Lo que pasa detrás</h3><span class="behind-toggle" aria-hidden="true"></span></summary>
            <ol class="trace" data-chat-trace><li class="trace-empty">Envía un mensaje para ver cómo el asistente interpreta la consulta y decide qué hacer.</li></ol>
            <div class="notify-card" data-chat-notify hidden>
              <p class="notify-app">${icon('send', 14)} Aviso por Telegram al responsable</p>
              <p data-chat-notify-text></p>
            </div>
            <p class="demo-note">En un proyecto real, el asistente se conecta a tu WhatsApp y responde con la información que tu negocio autoriza. Esta demo usa respuestas preparadas y no envía tus mensajes a ningún servidor.</p>
          </details>
        </div>
      </div>

      <div class="demo-panel" role="tabpanel" id="panel-social" aria-labelledby="tab-social" hidden>
        <p class="demo-badge">${icon('flask', 14)} Ejemplos preparados · no son campañas reales de clientes</p>
        <div class="social-demo" data-social>
          <div class="social-controls">
            <p class="field-label" id="l-biz">Selecciona un tipo de negocio</p>
            <div class="chips" role="radiogroup" aria-labelledby="l-biz" data-social-biz></div>
            <ol class="pipeline" data-social-steps aria-label="Etapas del proceso"></ol>
            <p class="demo-note">Ejemplo de arquitectura. Cada ejecución real es distinta y se adapta a tu negocio, tus servicios y tus fechas importantes.</p>
          </div>
          <div class="social-output" data-social-output aria-live="polite"></div>
        </div>
      </div>

      <div class="demo-panel" role="tabpanel" id="panel-product" aria-labelledby="tab-product" hidden>
        <p class="demo-badge">${icon('flask', 14)} Ejemplos preparados con ilustraciones · no es una herramienta de generación en vivo</p>
        <div class="product-demo" data-product>
          <div class="chips" role="radiogroup" aria-label="Producto de ejemplo" data-product-pick></div>
          <ol class="pipeline pipeline-row" aria-label="Etapas del proceso">${['Fotografía', 'Procesamiento con IA', 'Creatividad', 'Texto', 'Revisión', 'Publicación'].map((s) => `<li>${s}</li>`).join('')}</ol>
          <div class="product-stage" data-product-stage></div>
        </div>
      </div>
    </div>
  </div>
</section>`;

const founder = () => `
<section class="section founder" id="fundador" aria-labelledby="fundador-title">
  <div class="container founder-grid">
    <figure class="founder-photo reveal">
      <img src="${FOUNDER.photo.large}" srcset="${FOUNDER.photo.small} 480w, ${FOUNDER.photo.large} 900w" sizes="(max-width: 960px) 92vw, 540px" alt="${h(FOUNDER.photo.alt)}" width="${FOUNDER.photo.w}" height="${FOUNDER.photo.h}" loading="lazy" decoding="async">
      <figcaption class="founder-badge"><strong>${h(FOUNDER.name)}</strong><span>${h(FOUNDER.role)}</span></figcaption>
    </figure>
    <div class="founder-copy reveal">
      <p class="eyebrow">El rostro detrás de EtherIA</p>
      <h2 id="fundador-title">Conoce a la persona detrás de EtherIA</h2>
      <p class="founder-intro">${h(FOUNDER.summary)}</p>
      <ul class="founder-facts">${FOUNDER.facts.map(([ic, t]) => `<li>${icon(ic, 18)}<span>${h(t)}</span></li>`).join('')}</ul>
      <blockquote class="founder-quote"><p>“${h(FOUNDER.commitment)}”</p><footer>— ${h(FOUNDER.name)}</footer></blockquote>
      <details class="founder-more">
        <summary>Leer mi historia completa<span class="faq-icon" aria-hidden="true"></span></summary>
        <div class="founder-bio">${FOUNDER.bio.map((p) => `<p>${h(p)}</p>`).join('')}</div>
      </details>
      <div class="hero-actions">
        ${btn('Conversemos directamente', wa(FOUNDER.wa), { ico: 'message', ext: true })}
      </div>
    </div>
  </div>
</section>`;

const spa = caseBySlug('spa-web');
// Hasta tres proyectos en portada: el sitio del spa (destacado) y dos sistemas. El resto, en /proyectos.
const HOME_CASES = ['spa-contenido', 'kael'].map(caseBySlug);

export const home = () =>
  page({
    path: '/',
    title: 'Automatización con IA y páginas web en Costa Rica | EtherIA',
    description:
      'Automatización con IA para negocios en Costa Rica: asistentes de WhatsApp, redes sociales, procesos y páginas web profesionales. Prueba nuestras demos.',
    scripts: ['/assets/js/demos.js'],
    schema: [faqSchema(FAQ)],
    body: `
<section class="hero" aria-labelledby="hero-title">
  <picture class="hero-bg">
    <source type="image/webp" media="(max-width: 700px)" srcset="/assets/img/portada-oficina-movil.webp">
    <source type="image/webp" srcset="/assets/img/portada-oficina-900.webp 900w, /assets/img/portada-oficina-1600.webp 1600w" sizes="100vw">
    <img src="/assets/img/portada-oficina-1600.webp" alt="" width="1600" height="900" fetchpriority="high">
  </picture>
  <div class="container hero-grid">
    <div class="hero-copy">
      <p class="hero-motto">Tu competencia ya está en Fórmula 1. <span class="grad">No sigas montado en un burro.</span></p>
      <h1 id="hero-title">Automatización con IA y páginas web <span class="grad">para negocios en Costa Rica</span></h1>
      <p class="hero-lead">Automatizamos la atención por WhatsApp, tus redes sociales y las tareas repetitivas de tu negocio, y creamos páginas web profesionales que te ayudan a crecer. Primero entendemos lo que necesitas; después diseñamos la solución adecuada.</p>
      <div class="hero-actions">
        ${btn(DIAG_LABEL, DIAG, { ico: 'message' })}
        ${btn('Explorar soluciones', '#soluciones', { variant: 'ghost' })}
      </div>
      <a class="text-link hero-wa" href="${wa()}" target="_blank" rel="noopener">${icon('message', 16)} O escríbenos por WhatsApp: ${SITE.phoneDisplay}</a>
    </div>
    <div class="hero-visual" aria-hidden="true">
      <div class="flow-card">
        <div class="flow-card-head"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span>Flujo de atención</span></div>
        <div class="bubble">Hola, ¿tienen espacio mañana en la tarde?</div>
        <ol class="flow-steps">
          <li><span class="fs-ico">${icon('search', 16)}</span>Entiende la consulta<span class="fs-ok">${icon('check', 14)}</span></li>
          <li><span class="fs-ico">${icon('calendar', 16)}</span>Consulta la información autorizada<span class="fs-ok">${icon('check', 14)}</span></li>
          <li><span class="fs-ico">${icon('message', 16)}</span>Responde y registra la conversación<span class="fs-ok">${icon('check', 14)}</span></li>
          <li><span class="fs-ico">${icon('user', 16)}</span>Avisa a una persona si hace falta<span class="fs-ok">${icon('check', 14)}</span></li>
        </ol>
        <p class="flow-caption">Ilustración del funcionamiento de un asistente</p>
      </div>
    </div>
  </div>
</section>

<section class="section section-alt" id="soluciones" aria-labelledby="soluciones-title">
  <div class="container">
    ${sectionHead('Soluciones', 'Soluciones de automatización e IA para tu negocio', 'Elige lo que hoy te quita más tiempo. Nosotros te ayudamos a resolverlo.', { id: 'soluciones-title' })}
    <div class="sol-grid">${SOLUTION_CARDS.map(solutionCard).join('')}</div>
  </div>
</section>

<section class="section" id="proyectos" aria-labelledby="proyectos-title">
  <div class="container">
    ${sectionHead('Proyectos reales', 'Soluciones reales, proyectos que puedes explorar', 'Sitios y sistemas que hemos construido. Sin métricas infladas ni testimonios inventados: lo que hicimos y cómo funciona.', { id: 'proyectos-title' })}
    <article class="case-feature reveal">
      <div class="case-feature-media">
        <figure class="frame-desktop"><div class="frame-bar"><span></span><span></span><span></span><p>handsandparadisespa.com</p></div><img src="${spa.media[0].src}" alt="${h(spa.media[0].alt)}" width="1200" height="750" loading="lazy"></figure>
        <figure class="frame-phone"><img src="${spa.media[1].src}" alt="${h(spa.media[1].alt)}" width="390" height="844" loading="lazy"></figure>
      </div>
      <div class="case-feature-copy">
        <p class="case-kind">${h(spa.kind)} · Proyecto publicado</p>
        <h3>${h(spa.client)}</h3>
        <p>${h(spa.summary)}</p>
        <ul class="mini-list">${spa.built.slice(1, 5).map((b) => `<li>${icon('check', 16)}${h(b)}</li>`).join('')}</ul>
        <div class="case-actions">
          ${btn('Visitar handsandparadisespa.com', spa.url, { ico: 'external', ext: true })}
          ${btn('Ver el caso completo', '/proyectos#spa-web', { variant: 'link' })}
        </div>
      </div>
    </article>
    <div class="case-grid case-grid-2">${HOME_CASES.map(caseCard).join('')}</div>
    <p class="section-more">${btn('Ver todos los proyectos', '/proyectos', { variant: 'ghost', ico: 'folder' })}</p>
  </div>
</section>

${demos()}

<section class="section section-alt" id="precios" aria-labelledby="precios-title">
  <div class="container">
    ${sectionHead('Precios orientativos', 'Precios de automatización con IA en Costa Rica', 'Precios iniciales de referencia, de la solución más accesible a la más completa. El precio final depende del alcance y la complejidad de tu proyecto.', { id: 'precios-title' })}
    <ul class="price-strip">${PLANS.map((p) => `
      <li class="price-tile reveal">
        <span class="sol-icon">${icon(p.icon, 22)}</span>
        <h3><a href="/precios#plan-${p.id}" class="stretched">${h(p.name)}</a></h3>
        <p class="price-tile-main"><span>Desde</span> <strong>${crc(p.impl[0])}</strong> <span>de implementación</span></p>
        <p class="price-tile-monthly">+ ${crc(p.monthly[0])} al mes <span>de soporte y mantenimiento</span></p>
      </li>`).join('')}
    </ul>
    <p class="price-quote-only">${icon('pen', 16)}<span>${QUOTE_ONLY.map((s) => h(bySlug(s).short)).join(' y ')}: cotización a medida según el proyecto.</span></p>
    ${priceNote()}
    <div class="price-strip-foot reveal">
      <div class="cta-actions">
        ${btn('Ver precios y calcular mi inversión', '/precios#calculadora', { ico: 'arrow' })}
        ${btn(DIAG_LABEL, DIAG, { variant: 'ghost', ico: 'message' })}
      </div>
    </div>
  </div>
</section>

<section class="section" id="por-que" aria-labelledby="porque-title">
  <div class="container">
    ${sectionHead('Por qué EtherIA', 'Tecnología inteligente, atención verdaderamente humana', 'La automatización no reemplaza a las personas: las potencia. En EtherIA, la tecnología está al servicio de las personas y los negocios, nunca al revés.', { id: 'porque-title' })}
    <div class="reason-grid reason-grid-3">
      ${REASONS.map(([ic, t, d]) => `<article class="reason reveal"><span class="reason-ico">${icon(ic, 22)}</span><h3>${t}</h3><p>${d}</p></article>`).join('')}
    </div>
  </div>
</section>

${founder()}

<section class="section" id="como-trabajamos" aria-labelledby="como-title">
  <div class="container">
    ${sectionHead('Cómo trabajamos', 'Un proceso claro, en tres etapas', 'Primero entendemos. Después construimos. Y nos quedamos para acompañarte.', { id: 'como-title' })}
    <ol class="steps">
      ${STEPS.map(([t, d], i) => `<li class="step reveal"><span class="step-n">${String(i + 1).padStart(2, '0')}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="section section-alt" id="preguntas" aria-labelledby="faq-title">
  <div class="container container-narrow">
    ${sectionHead('Preguntas frecuentes', 'Preguntas frecuentes sobre automatización con IA', '', { id: 'faq-title' })}
    ${faqBlock(FAQ)}
  </div>
</section>

<section class="section" id="contacto" aria-labelledby="contacto-title">
  <div class="container">
    <div class="final-cta reveal">
      <img src="/assets/img/etheria-simbolo-256.png" alt="" width="120" height="120" loading="lazy" class="final-mark">
      <h2 id="contacto-title">Hablemos de tu negocio</h2>
      <p>Cuéntanos qué te gustaría mejorar. Te escuchamos, te orientamos y, si tiene sentido, te proponemos una solución clara. Sin presión y sin compromiso.</p>
      <div class="cta-actions">
        ${btn('Escríbenos por WhatsApp', wa('Hola, estoy interesado en automatizar algunos procesos de mi negocio y quisiera recibir orientación.'), { ico: 'message', ext: true })}
        ${btn(DIAG_LABEL, DIAG, { variant: 'ghost' })}
      </div>
      <p class="contact-line"><a href="mailto:${SITE.email}">${icon('mail', 16)} ${SITE.email}</a><span>·</span><a href="${wa()}" target="_blank" rel="noopener">${icon('message', 16)} ${SITE.phoneDisplay}</a></p>
    </div>
  </div>
</section>`,
  });
