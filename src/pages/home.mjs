import { SITE, wa, h, icon } from '../config.mjs';
import { SOLUTIONS, bySlug } from '../solutions.mjs';
import { CASES, caseBySlug } from '../cases.mjs';
import { FOUNDER } from '../founder.mjs';
import { PLANS, crc, priceNote } from '../pricing.mjs';
import { page, btn, sectionHead, faqBlock, faqSchema } from '../layout.mjs';

const PROBLEMS = [
  ['Respondes los mismos mensajes todo el día', 'Horarios, precios, ubicación… y mientras tanto, otros clientes esperan.', 'recepcionista-ia'],
  ['Tus redes se quedan sin publicar', 'Sabes que debes ser constante, pero el día a día no deja tiempo para diseñar y escribir.', 'redes-sociales-ia'],
  ['Tus productos no lucen como merecen', 'Buenos productos con fotos y textos que no los venden.', 'contenido-productos'],
  ['Clientes interesados que se enfrían', 'Contactos dispersos y sin seguimiento: oportunidades que se pierden en silencio.', 'gestion-oportunidades'],
  ['Tu web no refleja lo que vale tu negocio', 'O no tienes una, o no se ve bien en el celular, o nadie la encuentra.', 'desarrollo-web'],
  ['Tu equipo copia y pega datos sin parar', 'Hojas, correos y sistemas que no se hablan entre sí.', 'automatizacion-procesos'],
];

const REASONS = [
  ['ear', 'Escuchamos antes de proponer', 'Analizamos cómo funciona tu negocio antes de recomendar cualquier tecnología.'],
  ['layers', 'Soluciones adaptadas a tu empresa', 'No imponemos un sistema estándar cuando tu problema necesita algo a medida.'],
  ['target', 'Tecnología con propósito', 'Cada automatización debe resolver una necesidad concreta. Si no aporta, no la recomendamos.'],
  ['heart', 'Atención humana de excelencia', 'Explicamos en lenguaje claro, te acompañamos y respondemos con cercanía y profesionalismo.'],
  ['eye', 'Transparencia desde el principio', 'Te explicamos el alcance, las limitaciones, los requisitos y los costos antes de empezar.'],
  ['compass', 'Pensamos a largo plazo', 'Diseñamos sistemas mantenibles que puedan evolucionar junto con tu negocio.'],
  ['wrench', 'Experiencia práctica', 'Tenemos desarrollos y flujos reales que podemos mostrarte, no solo conceptos teóricos.'],
];

const STEPS = [
  ['Escuchamos', 'Comprendemos tu negocio, tus objetivos y tus dificultades.'],
  ['Analizamos', 'Identificamos oportunidades de mejora y evaluamos las herramientas que ya usas.'],
  ['Proponemos', 'Te presentamos una solución clara, con alcance, costos y expectativas.'],
  ['Desarrollamos', 'Construimos e integramos la solución con tus herramientas.'],
  ['Probamos', 'Validamos el funcionamiento y corregimos problemas antes de la entrega.'],
  ['Acompañamos', 'Ofrecemos soporte y evolución según las condiciones que contrates.'],
];

const COMMITMENTS = [
  ['message', 'Comunicación clara', 'Sin tecnicismos innecesarios. Si algo no se entiende, lo explicamos de otra forma.'],
  ['eye', 'Propuestas transparentes', 'Alcance, costos y tiempos por escrito antes de empezar. Sin sorpresas.'],
  ['shield', 'Cuidado de tu información', 'Accedemos solo a lo necesario y tratamos tus datos y los de tus clientes con responsabilidad.'],
  ['search', 'Honestidad técnica', 'Si algo no conviene automatizarse o no va a funcionar bien, te lo decimos.'],
  ['users', 'Acompañamiento', 'Te enseñamos a usar lo que construimos y seguimos disponibles según lo acordado.'],
  ['life', 'Mejora continua', 'Tu negocio cambia y tus sistemas también pueden hacerlo.'],
];

export const FAQ = [
  ['¿Necesito saber de tecnología para trabajar con EtherIA?', 'No. Tú conoces tu negocio; nosotros nos encargamos de la parte técnica y te la explicamos en lenguaje claro. No necesitas saber qué tecnología contratar: cuéntanos qué necesitas resolver.'],
  ['¿Cuánto cuesta una solución?', 'Depende del alcance, de las herramientas involucradas y del nivel de acompañamiento. Antes de empezar recibes una propuesta clara con alcance, costos y tiempos. La primera conversación no tiene costo.'],
  ['¿Cuánto tiempo toma implementar una automatización?', 'Varía según la complejidad. Una automatización sencilla puede estar lista en poco tiempo, mientras que un sistema con varias integraciones requiere más etapas. El plazo se define en la propuesta.'],
  ['¿Funciona con las herramientas que ya uso?', 'En muchos casos, sí. Trabajamos con WhatsApp, Google Sheets, Google Drive, Telegram, redes sociales y sistemas con acceso por API. Lo evaluamos en el análisis inicial.'],
  ['¿Un asistente con IA reemplaza a mi equipo?', 'No es el objetivo. Se encarga de las tareas repetitivas para que las personas se concentren en lo que requiere criterio humano, y deriva las conversaciones que necesitan atención personal.'],
  ['¿Qué pasa con los datos de mi negocio y de mis clientes?', 'Accedemos solo a la información necesaria para el proyecto, preferimos que las cuentas y credenciales estén a nombre de tu negocio y no compartimos tus datos con terceros con fines comerciales.'],
  ['¿Ofrecen soporte después de la entrega?', 'Sí, según las condiciones que contrates: mantenimiento, ajustes y evolución del sistema. Lo dejamos definido por escrito para que sepas qué incluye.'],
  ['¿El contenido generado con IA se publica sin revisión?', 'Recomendamos siempre un paso de revisión y aprobación. La IA es una gran ayuda, pero una persona debe confirmar que el contenido es correcto antes de publicarlo.'],
  ['¿Trabajan solo con negocios de Costa Rica?', 'Estamos en Costa Rica y gran parte del trabajo se coordina de forma remota. Si tu negocio está en otro lugar, conversemos y vemos si podemos ayudarte.'],
];

const solutionCard = (s) => `
<article class="sol-card reveal${s.featured ? ' is-featured' : ''}">
  <div class="sol-icon">${icon(s.icon, 22)}</div>
  ${s.featured ? '<p class="sol-flag">Servicio destacado</p>' : ''}
  <h3><a href="/soluciones/${s.slug}" class="stretched">${h(s.name)}</a></h3>
  <p>${h(s.tagline)}</p>
  ${s.featured ? `<ul class="mini-list">${['Planifica según fechas y campañas', 'Usa fotos reales de tu negocio', 'Textos adaptados a cada red', 'Revisión antes de publicar'].map((t) => `<li>${icon('check', 16)}${t}</li>`).join('')}</ul>
  <ol class="feat-flow" aria-label="Cómo trabaja el sistema">${caseBySlug('spa-contenido').flow.map((f, i) => `<li><span>${i + 1}</span>${h(f)}</li>`).join('')}</ol>` : ''}
  <span class="card-link">Conocer la solución ${icon('arrow', 16)}</span>
</article>`;

const caseCard = (c) => `
<article class="case-card reveal">
  ${c.diagram ? `<div class="case-thumb"><img src="${c.diagram.src}" alt="" width="${c.diagram.w}" height="${c.diagram.h}" loading="lazy" decoding="async"></div>` : ''}
  <p class="case-kind">${h(c.kind)}</p>
  <h3><a href="/proyectos#${c.slug}" class="stretched">${h(c.title)}</a></h3>
  <p>${h(c.summary)}</p>
  <div class="flow-mini" aria-label="Etapas del flujo">${(c.flow || []).map((f) => `<span>${h(f)}</span>`).join('')}</div>
  <span class="card-link">Ver el caso ${icon('arrow', 16)}</span>
</article>`;

const chip = (name, value, label, type = 'checkbox') =>
  `<label class="chip"><input type="${type}" name="${name}" value="${h(value)}"><span>${h(label)}</span></label>`;

const DIFFICULTIES = [
  ['mensajes', 'Respondo muchos mensajes repetidos'],
  ['redes', 'No tengo tiempo para las redes sociales'],
  ['productos', 'Mis productos no se ven profesionales en internet'],
  ['seguimiento', 'Pierdo clientes por falta de seguimiento'],
  ['web', 'Mi negocio no tiene web o no me representa'],
  ['repetitivas', 'Mi equipo pierde tiempo en tareas repetitivas'],
  ['otra', 'Otra / no estoy seguro'],
];
const TASKS = [
  ['responder', 'Responder WhatsApp y mensajes'],
  ['citas', 'Agendar citas o reservas'],
  ['publicar', 'Crear publicaciones'],
  ['fotos', 'Fotografiar y describir productos'],
  ['seguimiento', 'Dar seguimiento a clientes'],
  ['datos', 'Pasar datos entre hojas o sistemas'],
  ['reportes', 'Preparar reportes'],
];
const TOOLS = ['WhatsApp', 'Instagram / Facebook', 'Excel / Google Sheets', 'Google Drive', 'Correo electrónico', 'Un CRM', 'Sistema de facturación', 'Página web', 'Ninguna en especial'];

const diagnostic = () => `
<section class="section section-diag" id="diagnostico" aria-labelledby="diag-title">
  <div class="container diag-grid">
    <div class="diag-intro reveal">
      <p class="eyebrow">Diagnóstico inicial</p>
      <h2 id="diag-title">Cuéntanos tu problema. Busquemos juntos la solución.</h2>
      <p class="section-lead">No necesitas saber qué tecnología contratar. Cuéntanos qué necesitas resolver y te ayudaremos a encontrar el camino.</p>
      <ul class="check-list">
        <li>${icon('check', 18)}Toma unos dos minutos.</li>
        <li>${icon('check', 18)}Al final verás una primera orientación.</li>
        <li>${icon('check', 18)}Una persona del equipo revisa cada solicitud.</li>
      </ul>
      <p class="fine-print">La orientación se calcula con reglas sencillas a partir de tus respuestas. No es un diagnóstico experto: es un punto de partida para conversar.</p>
    </div>
    <div class="diag-card reveal">
      <noscript><p class="notice">Para usar el diagnóstico interactivo activa JavaScript, o <a href="${wa()}">escríbenos por WhatsApp</a>.</p></noscript>
      <form class="diag-form" data-diag novalidate>
        <div class="diag-progress" aria-hidden="true"><span data-diag-bar></span></div>
        <p class="diag-step-label" data-diag-label aria-live="polite">Paso 1 de 3</p>

        <fieldset class="diag-step is-active" data-step="1">
          <legend class="sr-only">Tu negocio</legend>
          <div class="field">
            <label for="d-negocio">1. ¿A qué se dedica tu negocio?</label>
            <input id="d-negocio" name="negocio" type="text" maxlength="120" required placeholder="Ej.: spa, ferretería, consultorio dental…" autocomplete="organization">
          </div>
          <div class="field">
            <p class="field-label" id="l-dificultad">2. ¿Cuál es tu principal dificultad? <span class="opt">Puedes elegir varias</span></p>
            <div class="chips" role="group" aria-labelledby="l-dificultad">${DIFFICULTIES.map(([v, l]) => chip('dificultad', v, l)).join('')}</div>
          </div>
          <div class="field">
            <label for="d-detalle">Si quieres, cuéntanos un poco más <span class="opt">Opcional</span></label>
            <textarea id="d-detalle" name="detalle" rows="3" maxlength="800" placeholder="Ej.: recibimos muchas consultas por WhatsApp y no damos abasto…"></textarea>
          </div>
        </fieldset>

        <fieldset class="diag-step" data-step="2">
          <legend class="sr-only">Tu día a día</legend>
          <div class="field">
            <p class="field-label" id="l-tareas">3. ¿Qué tareas te consumen más tiempo?</p>
            <div class="chips" role="group" aria-labelledby="l-tareas">${TASKS.map(([v, l]) => chip('tareas', v, l)).join('')}</div>
          </div>
          <div class="field">
            <p class="field-label" id="l-herramientas">4. ¿Qué herramientas utilizas actualmente?</p>
            <div class="chips" role="group" aria-labelledby="l-herramientas">${TOOLS.map((t) => chip('herramientas', t, t)).join('')}</div>
          </div>
          <div class="field">
            <label for="d-mejorar">5. ¿Qué te gustaría mejorar?</label>
            <textarea id="d-mejorar" name="mejorar" rows="3" maxlength="800" placeholder="Ej.: responder más rápido y tener todo más organizado."></textarea>
          </div>
        </fieldset>

        <fieldset class="diag-step" data-step="3">
          <legend class="sr-only">Contacto</legend>
          <div class="field">
            <p class="field-label" id="l-pref">6. ¿Cómo prefieres que te contactemos?</p>
            <div class="chips" role="radiogroup" aria-labelledby="l-pref">${['WhatsApp', 'Correo', 'Llamada'].map((v, i) => chip('preferencia', v, v, 'radio').replace('type="radio"', i === 0 ? 'type="radio" checked' : 'type="radio"')).join('')}</div>
          </div>
          <div class="field-row">
            <div class="field">
              <label for="d-nombre">Tu nombre</label>
              <input id="d-nombre" name="nombre" type="text" maxlength="80" required autocomplete="name">
            </div>
            <div class="field">
              <label for="d-contacto" data-contact-label>Tu número de WhatsApp</label>
              <input id="d-contacto" name="contacto" type="text" maxlength="120" required autocomplete="tel" inputmode="tel" placeholder="+506 …">
            </div>
          </div>
          <div class="hp" aria-hidden="true"><label for="d-web">No llenes este campo</label><input id="d-web" name="sitio_web" type="text" tabindex="-1" autocomplete="off"></div>
          <label class="consent"><input type="checkbox" name="consentimiento" required> <span>Acepto que EtherIA use estos datos para responder a mi solicitud, según la <a href="/privacidad">política de privacidad</a>.</span></label>
        </fieldset>

        <p class="form-error" data-diag-error role="alert"></p>
        <div class="diag-nav">
          <button type="button" class="btn btn-ghost" data-diag-prev hidden>Atrás</button>
          <button type="button" class="btn btn-primary" data-diag-next>Continuar ${icon('arrow', 18)}</button>
          <button type="submit" class="btn btn-primary" data-diag-submit hidden>Ver mi orientación ${icon('arrow', 18)}</button>
        </div>
      </form>

      <div class="diag-result" data-diag-result hidden tabindex="-1">
        <p class="eyebrow">Tu orientación inicial</p>
        <h3 data-diag-result-title>Esto es lo que podríamos explorar juntos</h3>
        <div class="diag-recs" data-diag-recs></div>
        <p class="fine-print">Orientación automática basada en reglas sencillas. Una persona del equipo revisará tu caso para confirmar qué tiene sentido para tu negocio.</p>
        <div class="diag-send">
          <button type="button" class="btn btn-primary" data-diag-send>${icon('send', 18)} Enviar mi solicitud a EtherIA</button>
          <a class="btn btn-ghost" data-diag-wa href="${wa()}" target="_blank" rel="noopener">${icon('message', 18)} Enviarla por WhatsApp</a>
        </div>
        <p class="diag-status" data-diag-status role="status"></p>
        <button type="button" class="link-btn" data-diag-restart>Empezar de nuevo</button>
      </div>
    </div>
  </div>
</section>`;

const demos = () => `
<section class="section" id="demos" aria-labelledby="demos-title">
  <div class="container">
    ${sectionHead('Experimenta', 'Prueba cómo funciona nuestra tecnología', 'Tres demostraciones interactivas con datos ficticios. Te muestran la lógica de nuestras soluciones sin conectarse a ningún sistema real.', { id: 'demos-title' })}
    <div class="demo-shell reveal">
      <div class="demo-tabs" role="tablist" aria-label="Demostraciones">
        <button role="tab" id="tab-chat" aria-controls="panel-chat" aria-selected="true">${icon('message', 18)}<span>Asistente inteligente</span></button>
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
            <div class="chat-suggest" data-chat-suggest aria-label="Preguntas sugeridas"></div>
            <form class="chat-input" data-chat-form>
              <label for="chat-msg" class="sr-only">Escribe un mensaje para el asistente de la demostración</label>
              <input id="chat-msg" type="text" maxlength="200" autocomplete="off" placeholder="Escribe una pregunta…">
              <button type="submit" aria-label="Enviar">${icon('send', 18)}</button>
            </form>
          </div>
          <aside class="chat-behind" aria-labelledby="behind-title">
            <h3 id="behind-title">Lo que pasa detrás</h3>
            <ol class="trace" data-chat-trace><li class="trace-empty">Envía un mensaje para ver cómo el asistente interpreta la consulta y decide qué hacer.</li></ol>
            <div class="notify-card" data-chat-notify hidden>
              <p class="notify-app">${icon('send', 14)} Aviso por Telegram al responsable</p>
              <p data-chat-notify-text></p>
            </div>
            <p class="demo-note">En un proyecto real, el asistente se conecta a tu WhatsApp y responde con la información que tu negocio autoriza. Esta demo usa respuestas preparadas y no envía tus mensajes a ningún servidor.</p>
          </aside>
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
      <p class="founder-intro">Detrás de cada solución hay una persona que escucha, responde y se compromete con tu proyecto. Cuando trabajas con EtherIA, sabes con quién hablas.</p>
      <div class="founder-bio">${FOUNDER.bio.map((p) => `<p>${h(p)}</p>`).join('')}</div>
      <ul class="founder-facts">${FOUNDER.facts.map(([ic, t]) => `<li>${icon(ic, 18)}<span>${h(t)}</span></li>`).join('')}</ul>
      <blockquote class="founder-quote"><p>“${h(FOUNDER.commitment)}”</p><footer>— ${h(FOUNDER.name)}</footer></blockquote>
      <div class="hero-actions">
        ${btn('Conversemos directamente', wa(FOUNDER.wa), { ico: 'message', ext: true })}
      </div>
    </div>
  </div>
</section>`;

const spa = caseBySlug('spa-web');

export const home = () =>
  page({
    path: '/',
    title: 'Automatización con IA y desarrollo web, Costa Rica | EtherIA',
    description:
      'Resolvemos problemas reales de tu negocio con inteligencia artificial, automatización y desarrollo web. Soluciones a medida y atención humana desde Costa Rica.',
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
      <p class="eyebrow">Inteligencia artificial · Automatización · Desarrollo web · Costa Rica</p>
      <h1 id="hero-title">Tu competencia ya está en Fórmula 1. <span class="grad">No sigas montado en un burro.</span></h1>
      <p class="hero-lead hero-hook">La automatización no reemplaza a las personas: <strong>las potencia</strong>. Una persona apoyada por IA siempre avanzará más rápido que una que lo hace todo a mano. Subirte a ese auto ya no es opcional.</p>
      <div class="hero-actions">
        ${btn('Cuéntanos qué necesita tu negocio', '#diagnostico', { ico: 'message' })}
        ${btn('Descubre nuestras soluciones', '#soluciones', { variant: 'ghost' })}
      </div>
      <a class="text-link" href="#demos">Prueba nuestra tecnología ${icon('arrow', 16)}</a>
      <ul class="hero-trust" aria-label="Nuestros principios">
        <li>${icon('ear', 18)}Primero entendemos el problema</li>
        <li>${icon('layers', 18)}Soluciones a tu medida</li>
        <li>${icon('heart', 18)}Atención humana y cercana</li>
      </ul>
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

<section class="section" id="problemas" aria-labelledby="problemas-title">
  <div class="container">
    ${sectionHead('Problemas reales', '¿Te suena alguno de estos desafíos?', 'Nuestra especialidad no es la tecnología: es resolver problemas empresariales con tecnología. Empezamos por aquí.', { id: 'problemas-title' })}
    <div class="problem-grid">
      ${PROBLEMS.map(([t, d, slug]) => `
      <article class="problem-card reveal">
        <h3>${t}</h3>
        <p>${d}</p>
        <a href="/soluciones/${slug}" class="problem-link">${icon('arrow', 16)} ${h(bySlug(slug).short)}</a>
      </article>`).join('')}
    </div>
  </div>
</section>

${founder()}

<section class="section section-alt" id="soluciones" aria-labelledby="soluciones-title">
  <div class="container">
    ${sectionHead('Soluciones', 'Tecnología diseñada alrededor de tu negocio', 'Cada solución parte de experiencia práctica en proyectos reales y se adapta a tus procesos, tus objetivos y tu presupuesto.', { id: 'soluciones-title' })}
    <div class="sol-grid">${SOLUTIONS.map(solutionCard).join('')}</div>
  </div>
</section>

<section class="section" id="precios" aria-labelledby="precios-title">
  <div class="container">
    ${sectionHead('Precios orientativos', 'Tecnología inteligente. <span class="grad">Inversiones a tu medida.</span>', 'Automatizar tu negocio no debería ser un lujo. Estos son los precios iniciales de nuestras soluciones.', { id: 'precios-title' })}
    <ul class="price-strip">${PLANS.map((p) => `
      <li class="price-tile${p.featured ? ' is-featured' : ''} reveal">
        ${p.featured ? '<span class="price-tile-flag">Destacada</span>' : ''}
        <span class="sol-icon">${icon(p.icon, 22)}</span>
        <h3><a href="/precios#plan-${p.id}" class="stretched">${h(p.name)}</a></h3>
        <p class="price-tile-main"><span>Desde</span> <strong>${crc(p.impl[0])}</strong> <span>de implementación</span></p>
        <p class="price-tile-monthly">+ ${crc(p.monthly[0])} al mes <span>de soporte y mantenimiento</span></p>
      </li>`).join('')}
    </ul>
    ${priceNote()}
    <div class="price-strip-foot reveal">
      <div class="cta-actions">
        ${btn('Ver precios y calcular mi inversión', '/precios#calculadora', { ico: 'arrow' })}
        ${btn('Solicitar cotización', wa('Hola, vi los precios en su web y quisiera solicitar una cotización para mi negocio.'), { variant: 'ghost', ico: 'message', ext: true })}
      </div>
    </div>
  </div>
</section>

<section class="section" id="por-que" aria-labelledby="porque-title">
  <div class="container">
    ${sectionHead('Por qué EtherIA', '¿Por qué elegir EtherIA?', 'No queremos ser simplemente proveedores de tecnología. Queremos ser el aliado que entiende tu negocio.', { id: 'porque-title' })}
    <div class="reason-grid">
      ${REASONS.map(([ic, t, d]) => `<article class="reason reveal"><span class="reason-ico">${icon(ic, 22)}</span><h3>${t}</h3><p>${d}</p></article>`).join('')}
      <blockquote class="reason reason-quote reveal"><p>“En EtherIA, la tecnología está al servicio de las personas y los negocios, nunca al revés.”</p></blockquote>
    </div>
  </div>
</section>

${demos()}

<section class="section section-alt" id="proyectos" aria-labelledby="proyectos-title">
  <div class="container">
    ${sectionHead('Proyectos reales', 'Experiencia práctica que podemos mostrarte', 'Sistemas y sitios que hemos construido. Sin métricas infladas ni testimonios inventados: lo que hicimos y cómo funciona.', { id: 'proyectos-title' })}
    <article class="case-feature reveal">
      <div class="case-feature-media">
        <figure class="frame-desktop"><div class="frame-bar"><span></span><span></span><span></span><p>handsandparadisespa.com</p></div><img src="${spa.media[0].src}" alt="${h(spa.media[0].alt)}" width="1200" height="750" loading="lazy"></figure>
        <figure class="frame-phone"><img src="${spa.media[1].src}" alt="${h(spa.media[1].alt)}" width="390" height="844" loading="lazy"></figure>
      </div>
      <div class="case-feature-copy">
        <p class="case-kind">${h(spa.kind)} · Proyecto publicado</p>
        <h3>${h(spa.title)}</h3>
        <p>${h(spa.summary)}</p>
        <ul class="mini-list">${spa.built.slice(1, 5).map((b) => `<li>${icon('check', 16)}${h(b)}</li>`).join('')}</ul>
        <div class="case-actions">
          ${btn('Visitar el sitio', spa.url, { variant: 'ghost', ico: 'external', ext: true })}
          ${btn('Ver todos los proyectos', '/proyectos', { variant: 'link' })}
        </div>
      </div>
    </article>
    <div class="case-grid">${CASES.filter((c) => c.slug !== 'spa-web').map(caseCard).join('')}</div>
  </div>
</section>

<section class="section" id="como-trabajamos" aria-labelledby="como-title">
  <div class="container">
    ${sectionHead('Cómo trabajamos', 'Un proceso claro, de principio a fin', 'Primero entendemos. Después proponemos. Y nos quedamos para acompañarte.', { id: 'como-title' })}
    <ol class="steps">
      ${STEPS.map(([t, d], i) => `<li class="step reveal"><span class="step-n">${String(i + 1).padStart(2, '0')}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}
    </ol>
  </div>
</section>

${diagnostic()}

<section class="section" id="compromiso" aria-labelledby="compromiso-title">
  <div class="container">
    ${sectionHead('Nuestro compromiso', 'Atención de excelencia, no solo tecnología', 'Queremos que sientas que tienes un aliado que entiende tu negocio, no una empresa tecnológica distante.', { id: 'compromiso-title' })}
    <div class="commit-grid">
      ${COMMITMENTS.map(([ic, t, d]) => `<article class="commit reveal">${icon(ic, 22)}<div><h3>${t}</h3><p>${d}</p></div></article>`).join('')}
    </div>
    <div class="clarity reveal">
      <div>
        <h3>${icon('bot', 20)} Atención automatizada</h3>
        <p>Los asistentes que construimos responden al instante con información autorizada y se identifican como respuestas automáticas.</p>
      </div>
      <div>
        <h3>${icon('user', 20)} Atención humana</h3>
        <p>Las propuestas, el seguimiento de tu proyecto y las decisiones importantes las conversas con una persona de EtherIA.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section-alt" id="preguntas" aria-labelledby="faq-title">
  <div class="container container-narrow">
    ${sectionHead('Preguntas frecuentes', 'Resolvemos tus dudas', '', { id: 'faq-title' })}
    ${faqBlock(FAQ)}
  </div>
</section>

<section class="section section-tight" aria-labelledby="promesa-title">
  <div class="container container-narrow">
    <div class="promise reveal">
      <p class="eyebrow">Nuestra promesa</p>
      <h2 id="promesa-title">La satisfacción de nuestros clientes, ante todo</h2>
      <p>Trabajamos pensando, antes que nada, en la satisfacción de cada cliente. Nuestro principal objetivo es ayudar a las empresas a ser cada día mejores y a seguir creciendo sin detenerse.</p>
      <p>Actuamos con total profesionalismo y compromiso. Eso es lo que prometemos y lo que nos diferencia: un trato especial, cercano y dedicado al cien por ciento a cada cliente.</p>
      <ul class="promise-pillars">
        <li>${icon('heart', 18)}Satisfacción del cliente</li>
        <li>${icon('shield', 18)}Profesionalismo</li>
        <li>${icon('users', 18)}Trato 100 % dedicado</li>
      </ul>
    </div>
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
        ${btn('Solicita una evaluación', '#diagnostico', { variant: 'ghost' })}
      </div>
      <p class="contact-line"><a href="mailto:${SITE.email}">${icon('mail', 16)} ${SITE.email}</a><span>·</span><a href="${wa()}" target="_blank" rel="noopener">${icon('message', 16)} ${SITE.phoneDisplay}</a></p>
    </div>
  </div>
</section>`,
  });
