// Diagnóstico de /diagnostico: pasos, validación, orientación y envío.
// El único envío real es a /api/diagnostico (→ n8n), y solo cuando la persona pulsa "Enviar".
// Si falla, ofrece enviar las respuestas por WhatsApp con el mensaje ya redactado.
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const WA = '50664876840';

  const form = $('[data-diag]');
  if (form) {
    const SOL = {
      'recepcionista-ia': ['message', 'Recepcionista inteligente con IA', 'Puede responder las consultas frecuentes de tus clientes con rapidez y avisarte cuando alguien necesita atención personal.'],
      'redes-sociales-ia': ['sparkles', 'Gestor de redes sociales con IA', 'Puede mantener tus redes activas con contenido planificado según tus servicios y fechas importantes, con tu aprobación.'],
      'contenido-productos': ['camera', 'Contenido inteligente para productos', 'Puede convertir las fotos de tus productos en publicaciones y descripciones más profesionales, con revisión antes de publicar.'],
      'gestion-oportunidades': ['target', 'Gestión de oportunidades', 'Puede organizar tus contactos y automatizar el seguimiento para que ningún cliente interesado se quede sin respuesta.'],
      'desarrollo-web': ['monitor', 'Desarrollo web profesional', 'Una web clara y rápida que explique lo que haces y facilite que te contacten, conectada con tus herramientas.'],
      'automatizacion-procesos': ['workflow', 'Automatización de procesos', 'Puede conectar tus herramientas y eliminar tareas repetitivas como pasar datos o preparar reportes.'],
    };
    const ICONS = {
      message: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
      sparkles: '<path d="M12 3l1.9 5.8L20 10.7l-6.1 1.9L12 18.5l-1.9-5.9L4 10.7l6.1-1.9z"/>',
      camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
      target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
      monitor: '<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>',
      workflow: '<rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/>',
      users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    };
    const RULES = {
      dificultad: { mensajes: ['recepcionista-ia', 3], redes: ['redes-sociales-ia', 3], productos: ['contenido-productos', 3], seguimiento: ['gestion-oportunidades', 3], web: ['desarrollo-web', 3], repetitivas: ['automatizacion-procesos', 3] },
      tareas: { responder: ['recepcionista-ia', 2], citas: ['recepcionista-ia', 2], publicar: ['redes-sociales-ia', 2], fotos: ['contenido-productos', 2], seguimiento: ['gestion-oportunidades', 2], datos: ['automatizacion-procesos', 2], reportes: ['automatizacion-procesos', 2] },
      herramientas: { 'Instagram / Facebook': ['redes-sociales-ia', 1], 'Un CRM': ['gestion-oportunidades', 1], 'Excel / Google Sheets': ['automatizacion-procesos', 1] },
    };
    const KEYWORDS = [
      [/whats|mensaje|consulta|cita|reserva|atenci/, 'recepcionista-ia'],
      [/redes|instagram|facebook|tiktok|publica|contenido/, 'redes-sociales-ia'],
      [/producto|cat[aá]logo|tienda|inventario|foto/, 'contenido-productos'],
      [/seguimiento|ventas|prospect|oportunidad|cotizaci/, 'gestion-oportunidades'],
      [/web|p[aá]gina|sitio|google/, 'desarrollo-web'],
      [/excel|hoja|reporte|manual|factura|datos|repetitiv/, 'automatizacion-procesos'],
    ];

    const steps = $$('.diag-step', form);
    const bar = $('[data-diag-bar]', form);
    const label = $('[data-diag-label]', form);
    const err = $('[data-diag-error]', form);
    const prev = $('[data-diag-prev]', form);
    const next = $('[data-diag-next]', form);
    const submit = $('[data-diag-submit]', form);
    const result = $('[data-diag-result]');
    const recsBox = $('[data-diag-recs]');
    const sendBtn = $('[data-diag-send]');
    const waBtn = $('[data-diag-wa]');
    const status = $('[data-diag-status]');
    const contact = $('#d-contacto');
    const contactLabel = $('[data-contact-label]');
    const started = Date.now();
    let current = 0;
    let payload = null;

    const values = (name) => $$(`[name="${name}"]:checked`, form).map((i) => i.value);
    const val = (name) => (form.elements[name]?.value || '').trim();

    const show = (i) => {
      current = i;
      steps.forEach((s, k) => s.classList.toggle('is-active', k === i));
      bar.style.width = `${((i + 1) / steps.length) * 100}%`;
      label.textContent = `Paso ${i + 1} de ${steps.length}`;
      prev.hidden = i === 0;
      next.hidden = i === steps.length - 1;
      submit.hidden = i !== steps.length - 1;
      err.textContent = '';
    };

    const invalid = (input, msg) => {
      err.textContent = msg;
      if (input) { input.setAttribute('aria-invalid', 'true'); input.focus(); }
      return false;
    };
    form.addEventListener('input', (e) => e.target.removeAttribute?.('aria-invalid'));

    const validate = (i) => {
      if (i === 0) {
        if (val('negocio').length < 2) return invalid(form.elements.negocio, 'Cuéntanos brevemente a qué se dedica tu negocio.');
        if (!values('dificultad').length && val('detalle').length < 5) return invalid(null, 'Elige al menos una dificultad o descríbela con tus palabras.');
      }
      if (i === 2) {
        if (val('nombre').length < 2) return invalid(form.elements.nombre, 'Escribe tu nombre.');
        const pref = values('preferencia')[0];
        const c = val('contacto');
        const ok = pref === 'Correo' ? /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c) : c.replace(/\D/g, '').length >= 8;
        if (!ok) return invalid(contact, pref === 'Correo' ? 'Escribe un correo electrónico válido.' : 'Escribe un número de teléfono válido (al menos 8 dígitos).');
        if (!form.elements.consentimiento.checked) return invalid(form.elements.consentimiento, 'Necesitamos tu autorización para poder responderte.');
      }
      return true;
    };

    for (const r of $$('[name="preferencia"]', form)) {
      r.addEventListener('change', () => {
        const email = r.value === 'Correo';
        contactLabel.textContent = { WhatsApp: 'Tu número de WhatsApp', Correo: 'Tu correo electrónico', Llamada: 'Tu número de teléfono' }[r.value];
        contact.inputMode = email ? 'email' : 'tel';
        contact.autocomplete = email ? 'email' : 'tel';
        contact.placeholder = email ? 'nombre@correo.com' : '+506 …';
      });
    }

    next.addEventListener('click', () => { if (validate(current)) { show(current + 1); steps[current].querySelector('input, textarea')?.focus(); } });
    prev.addEventListener('click', () => show(current - 1));

    const recommend = () => {
      const score = {};
      const add = ([slug, n]) => { score[slug] = (score[slug] || 0) + n; };
      for (const group of ['dificultad', 'tareas', 'herramientas']) for (const v of values(group)) if (RULES[group][v]) add(RULES[group][v]);
      const free = `${val('detalle')} ${val('mejorar')} ${val('negocio')}`.toLowerCase();
      for (const [re, slug] of KEYWORDS) if (re.test(free)) add([slug, 1]);
      return Object.entries(score).filter(([, n]) => n >= 2).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([s]) => s);
    };

    const recCard = (ic, title, text, href, linkText) => {
      const card = el('div', 'rec');
      const i = el('span', 'sol-icon');
      i.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[ic]}</svg>`;
      const body = el('div');
      const a = el('a', '', linkText);
      a.href = href;
      body.append(el('h3', '', title), el('p', '', text), a);
      card.append(i, body);
      return card;
    };

    const waSummary = (recs) => {
      const lines = [
        'Hola, completé el diagnóstico en la web de EtherIA.',
        `Nombre: ${val('nombre')}`,
        `Negocio: ${val('negocio')}`,
        values('dificultad').length ? `Dificultades: ${$$('[name="dificultad"]:checked', form).map((i) => i.nextElementSibling.textContent).join('; ')}` : '',
        val('detalle') ? `Detalle: ${val('detalle')}` : '',
        values('tareas').length ? `Tareas que consumen tiempo: ${$$('[name="tareas"]:checked', form).map((i) => i.nextElementSibling.textContent).join('; ')}` : '',
        values('herramientas').length ? `Herramientas: ${values('herramientas').join(', ')}` : '',
        val('mejorar') ? `Me gustaría mejorar: ${val('mejorar')}` : '',
        recs.length ? `Orientación sugerida: ${recs.map((r) => SOL[r][1]).join(' / ')}` : '',
      ].filter(Boolean);
      return `https://wa.me/${WA}?text=${encodeURIComponent(lines.join('\n').slice(0, 1800))}`;
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate(2)) return;
      const recs = recommend();
      recsBox.replaceChildren(
        ...(recs.length
          ? recs.map((s) => recCard(SOL[s][0], SOL[s][1], SOL[s][2], `/soluciones/${s}`, 'Conocer esta solución →'))
          : [recCard('users', 'Conversemos sobre tu caso', 'Con lo que nos cuentas, lo mejor es una conversación breve para entender tu negocio antes de recomendar cualquier tecnología.', '/#como-trabajamos', 'Ver cómo trabajamos →')]),
      );
      payload = {
        negocio: val('negocio'), dificultad: values('dificultad'), detalle: val('detalle'), tareas: values('tareas'),
        herramientas: values('herramientas'), mejorar: val('mejorar'), preferencia: values('preferencia')[0] || 'WhatsApp',
        nombre: val('nombre'), contacto: val('contacto'), consentimiento: true, orientacion: recs,
        sitio_web: val('sitio_web'), t: Date.now() - started,
      };
      waBtn.href = waSummary(recs);
      status.textContent = '';
      status.className = 'diag-status';
      sendBtn.hidden = false;
      sendBtn.disabled = false;
      form.hidden = true;
      result.hidden = false;
      result.focus();
    });

    sendBtn.addEventListener('click', async () => {
      if (!payload) return;
      sendBtn.disabled = true;
      status.className = 'diag-status';
      status.textContent = 'Enviando…';
      try {
        const r = await fetch('/api/diagnostico', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const data = await r.json().catch(() => ({}));
        if (!r.ok || !data.ok) throw new Error(data.code || 'error');
        status.className = 'diag-status is-ok';
        status.textContent = `¡Gracias, ${payload.nombre}! Recibimos tu solicitud. Una persona del equipo la revisará y te contactará por ${payload.preferencia === 'Correo' ? 'correo' : payload.preferencia === 'Llamada' ? 'teléfono' : 'WhatsApp'}.`;
        sendBtn.hidden = true;
      } catch {
        status.className = 'diag-status is-warn';
        status.textContent = 'No pudimos enviarlo automáticamente en este momento. Puedes enviarlo por WhatsApp con un clic: ya preparamos el mensaje con tus respuestas.';
        sendBtn.disabled = false;
        waBtn.focus();
      }
    });

    $('[data-diag-restart]').addEventListener('click', () => {
      form.reset();
      payload = null;
      result.hidden = true;
      form.hidden = false;
      show(0);
      form.elements.negocio.focus();
    });

    show(0);
  }
})();
