import { wa, h, icon } from '../config.mjs';
import { page, breadcrumb, breadcrumbSchema } from '../layout.mjs';

// Página /diagnostico: el formulario de diagnóstico que antes estaba en la portada (#diagnostico).
// Campos, nombres, validaciones y envío (/api/diagnostico → n8n) se mantienen iguales; la lógica está en assets/js/diagnostico.js.

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

const form = () => `
<div class="diag-card">
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
    <h2 class="diag-result-title" data-diag-result-title>Esto es lo que podríamos explorar juntos</h2>
    <div class="diag-recs" data-diag-recs></div>
    <p class="fine-print">Orientación automática basada en reglas sencillas. Una persona del equipo revisará tu caso para confirmar qué tiene sentido para tu negocio.</p>
    <div class="diag-send">
      <button type="button" class="btn btn-primary" data-diag-send>${icon('send', 18)} Enviar mi solicitud a EtherIA</button>
      <a class="btn btn-ghost" data-diag-wa href="${wa()}" target="_blank" rel="noopener">${icon('message', 18)} Enviarla por WhatsApp</a>
    </div>
    <p class="diag-status" data-diag-status role="status"></p>
    <button type="button" class="link-btn" data-diag-restart>Empezar de nuevo</button>
  </div>
</div>`;

export const diagnostico = () => {
  const crumbs = [['Inicio', '/'], ['Diagnóstico', '/diagnostico']];
  return page({
    path: '/diagnostico',
    title: 'Diagnóstico inicial para automatizar tu negocio | EtherIA',
    description:
      'Cuéntanos qué necesita tu negocio en tres pasos y recibe una primera orientación sobre automatización con IA, WhatsApp, redes sociales o tu página web.',
    scripts: ['/assets/js/diagnostico.js'],
    schema: [breadcrumbSchema(crumbs)],
    body: `
<section class="section section-diag diag-page" aria-labelledby="diag-title">
  <div class="container">
    ${breadcrumb(crumbs)}
    <div class="diag-grid">
      <div class="diag-intro">
        <p class="eyebrow">Diagnóstico inicial</p>
        <h1 id="diag-title">Cuéntanos qué necesitas. Busquemos juntos la solución.</h1>
        <p class="section-lead">No necesitas saber qué tecnología contratar. Cuéntanos qué quieres resolver y te ayudaremos a encontrar el camino.</p>
        <ul class="check-list">
          <li>${icon('check', 18)}Toma unos dos minutos.</li>
          <li>${icon('check', 18)}Al final verás una primera orientación.</li>
          <li>${icon('check', 18)}Una persona del equipo revisa cada solicitud.</li>
        </ul>
        <p class="fine-print">La orientación se calcula con reglas sencillas a partir de tus respuestas. No es un diagnóstico experto: es un punto de partida para conversar. ¿Prefieres hablar directamente? <a class="inline-link" href="${wa()}" target="_blank" rel="noopener">Escríbenos por WhatsApp</a>.</p>
      </div>
      ${form()}
    </div>
  </div>
</section>`,
  });
};
