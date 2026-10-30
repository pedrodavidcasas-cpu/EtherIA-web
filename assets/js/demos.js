// Demostraciones interactivas y diagnóstico de la página de inicio.
// Todas las demos usan respuestas preparadas y datos ficticios: no se envía nada a ningún servidor.
// El único envío real es el del diagnóstico, y solo cuando la persona pulsa "Enviar".
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, reduce ? 0 : ms));
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const WA = '50660886254';

  /* ---------- Pestañas ---------- */
  const tabs = $$('.demo-tabs [role="tab"]');
  const selectTab = (tab, focus = false) => {
    for (const t of tabs) {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      $('#' + t.getAttribute('aria-controls')).hidden = !on;
    }
    if (focus) tab.focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => selectTab(t));
    t.addEventListener('keydown', (e) => {
      const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (d) { e.preventDefault(); selectTab(tabs[(i + d + tabs.length) % tabs.length], true); }
      if (e.key === 'Home') { e.preventDefault(); selectTab(tabs[0], true); }
      if (e.key === 'End') { e.preventDefault(); selectTab(tabs[tabs.length - 1], true); }
    });
  });

  /* ---------- Demo 1: asistente ---------- */
  const chat = $('[data-chat]');
  if (chat) {
    const log = $('[data-chat-log]', chat);
    const suggest = $('[data-chat-suggest]', chat);
    const form = $('[data-chat-form]', chat);
    const input = $('input', form);
    const trace = $('[data-chat-trace]', chat);
    const notify = $('[data-chat-notify]', chat);
    const notifyText = $('[data-chat-notify-text]', chat);
    // Si se define data-endpoint en el contenedor, la demo consulta un backend real (por ejemplo /api/asistente).
    const endpoint = chat.dataset.endpoint || '';
    const sessionId = Math.random().toString(36).slice(2);
    let busy = false;

    const DEFAULT_SUGGEST = ['¿Cuál es su horario?', '¿Cuánto cuesta una limpieza?', 'Quiero agendar una cita', 'Ya soy paciente', 'Tengo mucho dolor', '¿Aceptan mi seguro médico?'];
    const INTENTS = [
      {
        re: /dolor|urgen|emergen|sangr|hinchad|roto|quebr|muela/,
        label: 'urgencia',
        reply: 'Lamento que tengas molestias. Voy a avisar ahora mismo a una persona del equipo para que te contacte con prioridad.\n\nSi se trata de una emergencia grave, acude al servicio de emergencias más cercano.',
        trace: ['Detecta una <strong>posible urgencia</strong>', 'Prioridad <strong>alta</strong>: no intenta resolverlo solo', 'Escala a una persona del equipo'],
        escalate: 'alta',
      },
      {
        re: /humano|persona|asesor|alguien|hablar con|operador|s[ií], hablar/,
        label: 'atención humana',
        reply: 'Claro. Ya avisé a una persona del equipo; te escribirá por este mismo chat en cuanto esté disponible.',
        trace: ['Solicitud de <strong>atención humana</strong>', 'Resume la conversación para el equipo', 'Escala a una persona'],
        escalate: 'normal',
      },
      {
        re: /seguro|convenio|p[oó]liza|ins|ccss/,
        label: 'seguros',
        reply: 'Aceptamos tarjeta, SINPE Móvil y efectivo. Sobre seguros médicos, prefiero que te lo confirme una persona del equipo para darte información exacta. Ya le pasé tu consulta.',
        trace: ['Intención: <strong>formas de pago y seguros</strong>', 'Responde lo autorizado (formas de pago)', 'La parte de seguros no está autorizada: <strong>no inventa</strong> y escala'],
        escalate: 'normal',
      },
      {
        re: /ya soy|soy paciente|otra vez|vine antes|de nuevo|control/,
        label: 'cliente recurrente',
        reply: '¡Qué gusto saludarte de nuevo, Laura! Veo que tu última visita fue una limpieza en abril. ¿Quieres que te ayude a agendar tu control de seguimiento?',
        trace: ['Identifica a un <strong>cliente recurrente</strong>', 'Consulta el <strong>historial</strong> de conversaciones (ficticio)', 'Personaliza la respuesta con ese contexto'],
        next: ['Sí, quiero agendar', '¿Cuál es su horario?'],
      },
      {
        re: /\b(10:30|2:00|4:30)\b/,
        label: 'confirmación de cita',
        reply: (m) => `¡Listo! Reservé tu espacio de mañana a las ${m.match(/10:30|2:00|4:30/)[0]} ${m.includes('10:30') ? 'a. m.' : 'p. m.'} Te enviaremos un recordatorio el día anterior. ¿Te ayudo con algo más?`,
        trace: ['Confirma el horario elegido', 'Registra la reserva en la agenda (simulada)', 'Avisa al equipo de la nueva cita'],
        escalate: 'info',
        next: ['¿Dónde están ubicados?', 'Gracias'],
      },
      {
        re: /cita|agendar|reservar|espacio|disponib|turno|s[ií], quiero/,
        label: 'agendar cita',
        reply: 'Con gusto. Para mañana tengo estos espacios disponibles: 10:30 a. m., 2:00 p. m. y 4:30 p. m. ¿Cuál te sirve?',
        trace: ['Intención: <strong>agendar una cita</strong>', 'Consulta la disponibilidad en la agenda (simulada)', 'Ofrece opciones concretas'],
        next: ['10:30 a. m.', '2:00 p. m.', '4:30 p. m.'],
      },
      {
        re: /horario|hora|abren|cierran|atienden|s[aá]bado|domingo/,
        label: 'horario',
        reply: 'Atendemos de lunes a viernes de 8:00 a. m. a 6:00 p. m. y los sábados de 8:00 a. m. a 12:00 m. Domingos y feriados permanecemos cerrados.',
        trace: ['Intención: <strong>horario</strong>', 'Fuente: <strong>información autorizada</strong> del negocio', 'Registra la consulta'],
      },
      {
        re: /precio|cuesta|cu[aá]nto|tarifa|costo|limpieza|valoraci/,
        label: 'precios',
        reply: 'La limpieza dental tiene un precio de referencia de ₡25 000 y la valoración inicial, de ₡15 000. El precio final lo confirma el odontólogo después de la valoración. ¿Quieres que te ayude a agendar?',
        trace: ['Intención: <strong>precios</strong>', 'Fuente: lista de precios <strong>autorizada</strong>', 'Aclara que el precio final lo confirma una persona'],
        next: ['Quiero agendar una cita', '¿Aceptan mi seguro médico?'],
      },
      {
        re: /d[oó]nde|ubica|direcci|llegar|parqueo|mapa/,
        label: 'ubicación',
        reply: 'Estamos en Escazú, San José (dirección ficticia para esta demostración). Contamos con parqueo para pacientes.',
        trace: ['Intención: <strong>ubicación</strong>', 'Fuente: información autorizada del negocio'],
      },
      { re: /gracias|perfecto|genial|excelente|buen[ií]simo/, label: 'agradecimiento', reply: '¡Con gusto! Si necesitas algo más, aquí estoy.', trace: ['Cierre amable de la conversación', 'Guarda el historial para la próxima vez'] },
      { re: /hola|buenas|buenos|saludos|hey/, label: 'saludo', reply: '¡Hola! Soy el asistente virtual de Clínica Dental Aurora. Puedo ayudarte con horarios, precios de referencia, ubicación y citas. ¿En qué te ayudo?', trace: ['Saludo inicial', 'Presenta en qué puede ayudar'] },
    ];
    const FALLBACK = {
      label: 'sin información autorizada',
      reply: 'No tengo esa información entre los datos que la clínica me autorizó, y prefiero no inventar una respuesta. Si quieres, aviso a una persona del equipo para que te ayude.',
      trace: ['No encuentra información autorizada', '<strong>No inventa</strong> una respuesta', 'Ofrece pasar la consulta a una persona'],
      next: ['Sí, hablar con una persona', '¿Cuál es su horario?'],
    };

    const scrollLog = () => { log.scrollTop = log.scrollHeight; };
    const addMsg = (text, who) => { log.append(el('p', 'msg msg-' + who, text)); scrollLog(); };
    const setSuggest = (list) => {
      suggest.replaceChildren(...list.map((t) => {
        const b = el('button', '', t);
        b.type = 'button';
        b.addEventListener('click', () => send(t));
        return b;
      }));
    };
    const addTrace = async (lines) => {
      $('.trace-empty', trace)?.remove();
      for (const l of lines) {
        const li = el('li');
        li.innerHTML = l; // contenido estático definido arriba, nunca texto del usuario
        trace.append(li);
        await wait(260);
      }
    };
    const showNotify = (msg, level) => {
      const p = { alta: 'Prioridad alta', normal: 'Prioridad normal', info: 'Informativo' }[level];
      notifyText.textContent = `${level === 'info' ? 'Nueva cita registrada' : 'Conversación que requiere atención'} · Cliente: Laura (ficticio) · ${p}\n“${msg.slice(0, 120)}”`;
      notify.hidden = false;
    };
    const typing = () => {
      const t = el('div', 'msg msg-bot typing');
      t.setAttribute('aria-label', 'El asistente está escribiendo');
      t.append(el('span'), el('span'), el('span'));
      log.append(t); scrollLog();
      return t;
    };

    const send = async (raw) => {
      const text = raw.trim().slice(0, 200);
      if (!text || busy) return;
      busy = true;
      addMsg(text, 'user');
      input.value = '';
      const t = typing();
      trace.replaceChildren();
      notify.hidden = true;
      let intent;
      if (endpoint) {
        try {
          const r = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text, sessionId }) });
          const data = await r.json();
          intent = { label: 'respuesta del asistente', reply: data.reply || FALLBACK.reply, trace: ['Mensaje enviado al asistente conectado'] };
        } catch {
          intent = FALLBACK;
        }
      } else {
        const lower = text.toLowerCase();
        intent = INTENTS.find((i) => i.re.test(lower)) || FALLBACK;
      }
      await wait(700);
      t.remove();
      addMsg(typeof intent.reply === 'function' ? intent.reply(text) : intent.reply, 'bot');
      await addTrace([...intent.trace, 'Conversación <strong>registrada</strong> en el historial']);
      if (intent.escalate) {
        log.append(el('p', 'msg msg-system', intent.escalate === 'info' ? 'Se notificó al equipo de la nueva cita' : 'Conversación derivada a una persona del equipo'));
        scrollLog();
        showNotify(text, intent.escalate);
      }
      setSuggest(intent.next || DEFAULT_SUGGEST);
      busy = false;
    };

    form.addEventListener('submit', (e) => { e.preventDefault(); send(input.value); });
    addMsg('Demostración simulada: negocio y datos ficticios', 'system');
    addMsg('¡Hola! Soy el asistente virtual de Clínica Dental Aurora. ¿En qué puedo ayudarte hoy?', 'bot');
    setSuggest(DEFAULT_SUGGEST);
  }

  /* ---------- Demo 2: gestor de redes ---------- */
  const social = $('[data-social]');
  if (social) {
    const STEPS = ['Analiza la fecha y el contexto comercial', 'Selecciona un servicio o tema', 'Prepara una propuesta de contenido', 'Genera o adapta una creatividad', 'Redacta los textos para cada red', 'Solicita aprobación', 'Envía al proceso de publicación'];
    const BIZ = [
      {
        key: 'spa', label: 'Spa', brand: 'Spa Brisa Serena', theme: 'theme-spa',
        context: 'Semana previa al Día de la Madre (15 de agosto en Costa Rica).',
        topic: 'Paquete de regalo para mamá: masaje relajante + facial hidratante.',
        visual: 'Fotografía real de la sala de masajes con luz cálida, tipografía elegante y el logo de la marca.',
        title: 'Este 15 de agosto, regálale una pausa', sub: 'Paquete especial Día de la Madre',
        copy: 'Mamá merece un momento solo para ella. Este 15 de agosto, regálale una experiencia de calma con nuestro paquete de masaje relajante y facial hidratante. Espacios limitados por día.',
        cta: 'Reserva su regalo por WhatsApp', channels: ['Instagram', 'Facebook'],
      },
      {
        key: 'restaurante', label: 'Restaurante', brand: 'Fogón de la Abuela', theme: 'theme-restaurante',
        context: 'Inicio de la temporada de lluvias: días frescos por la tarde.',
        topic: 'Sopas de la casa: olla de carne y sopa negra.',
        visual: 'Foto real del plato humeante sobre la mesa de madera del restaurante, en primer plano.',
        title: 'Tardes lluviosas, sopa de la casa', sub: 'Olla de carne y sopa negra todos los días',
        copy: 'Empezaron las lluvias y no hay nada como una olla de carne bien caliente. Te esperamos con las recetas de siempre, hechas como en casa.',
        cta: 'Pide por WhatsApp o visítanos', channels: ['Instagram', 'Facebook', 'Estados de WhatsApp'],
      },
      {
        key: 'tienda', label: 'Tienda', brand: 'Tienda Luna Verde', theme: 'theme-tienda',
        context: 'Regreso a clases (inicio del curso lectivo en febrero).',
        topic: 'Mochilas y loncheras con descuento por temporada.',
        visual: 'Productos reales de la tienda fotografiados sobre fondo limpio con los colores de la marca.',
        title: 'Listos para el regreso a clases', sub: 'Mochilas y loncheras de temporada',
        copy: 'Que el regreso a clases empiece con todo listo. Encuentra mochilas resistentes y loncheras prácticas para toda la familia. Consulta disponibilidad de modelos y colores.',
        cta: 'Consulta modelos por WhatsApp', channels: ['Instagram', 'Facebook', 'TikTok'],
      },
      {
        key: 'clinica', label: 'Clínica', brand: 'Clínica Vida Plena', theme: 'theme-clinica',
        context: 'Octubre, mes de concientización sobre el cáncer de mama.',
        topic: 'Recordatorio sobre la importancia de los chequeos preventivos.',
        visual: 'Foto real de la recepción de la clínica con un lazo rosado discreto; tono sobrio e informativo.',
        title: 'Cuidarte también es prevenir', sub: 'Octubre: mes de la prevención',
        copy: 'Este mes te recordamos la importancia de los chequeos preventivos. Consulta con tu médico cuál es el control adecuado para ti y agenda tu cita con tiempo.',
        cta: 'Agenda tu cita', channels: ['Instagram', 'Facebook'],
      },
      {
        key: 'servicios', label: 'Servicios profesionales', brand: 'Rivera Contadores', theme: 'theme-servicios',
        context: 'Cercanía del plazo de la declaración anual del impuesto sobre la renta (marzo).',
        topic: 'Acompañamiento en la preparación de la declaración.',
        visual: 'Foto real del equipo en su oficina, con una composición limpia y la paleta de la marca.',
        title: '¿Tu declaración de renta ya está lista?', sub: 'Te acompañamos antes del plazo',
        copy: 'Se acerca el plazo de la declaración anual. Organiza tus documentos con tiempo y evita carreras de último minuto. Te ayudamos a revisar tu caso.',
        cta: 'Agenda una asesoría', channels: ['LinkedIn', 'Facebook'],
      },
    ];
    const bizBox = $('[data-social-biz]', social);
    const stepsBox = $('[data-social-steps]', social);
    const out = $('[data-social-output]', social);
    stepsBox.replaceChildren(...STEPS.map((s) => el('li', '', s)));
    let run = 0;

    const render = (b) => {
      const post = el('article', 'post');
      const head = el('div', 'post-head');
      const av = el('span', 'post-avatar', b.brand.split(' ').map((w) => w[0]).slice(0, 2).join(''));
      const meta = el('div');
      meta.append(el('p', 'post-brand', b.brand), el('p', 'post-meta', 'Negocio ficticio · Propuesta de publicación'));
      head.append(av, meta);
      const visual = el('div', 'post-visual ' + b.theme);
      visual.append(el('span', 'pv-tag', 'Concepto visual'), el('p', 'pv-title', b.title), el('p', 'pv-sub', b.sub));
      const body = el('div', 'post-body');
      const dl = el('dl');
      for (const [k, v] of [['Fecha y contexto', b.context], ['Tema', b.topic], ['Concepto visual', b.visual], ['Texto', b.copy], ['Llamada a la acción', b.cta]]) {
        const d = el('div');
        d.append(el('dt', '', k), el('dd', '', v));
        dl.append(d);
      }
      const ch = el('div');
      ch.append(el('dt', '', 'Canales'));
      const tags = el('ul', 'tag-list');
      tags.append(...b.channels.map((c) => el('li', '', c)));
      const dd = el('dd'); dd.append(tags); ch.append(dd);
      dl.append(ch);
      body.append(dl);
      const status = el('div', 'post-status');
      const st = el('p', '', 'Pendiente de aprobación');
      const approve = el('button', 'approve', 'Aprobar');
      const change = el('button', '', 'Pedir cambios');
      approve.type = change.type = 'button';
      approve.addEventListener('click', () => {
        st.textContent = 'Aprobada · pasa al proceso de publicación';
        st.className = 'is-ok';
        approve.remove(); change.remove();
        for (const li of stepsBox.children) { li.classList.remove('is-active'); li.classList.add('is-done'); }
      });
      change.addEventListener('click', () => {
        st.textContent = 'Cambios solicitados · el sistema prepara una nueva versión';
        st.className = '';
      });
      status.append(st, approve, change);
      post.append(head, visual, body, status);
      out.replaceChildren(post);
    };

    const play = async (b) => {
      const id = ++run;
      out.replaceChildren();
      const items = [...stepsBox.children];
      items.forEach((li) => li.classList.remove('is-done', 'is-active'));
      for (let i = 0; i < items.length - 1; i++) {
        items[i].classList.add('is-active');
        await wait(420);
        if (id !== run) return;
        items[i].classList.replace('is-active', 'is-done');
      }
      items[items.length - 2].classList.add('is-active');
      items[items.length - 2].classList.remove('is-done');
      render(b);
    };

    bizBox.replaceChildren(...BIZ.map((b) => {
      const btn = el('button', 'chip-btn', b.label);
      btn.type = 'button';
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-checked', 'false');
      btn.addEventListener('click', () => {
        for (const x of bizBox.children) x.setAttribute('aria-checked', String(x === btn));
        play(b);
      });
      return btn;
    }));
  }

  /* ---------- Demo 3: contenido para productos ---------- */
  const product = $('[data-product]');
  if (product) {
    const SVG = {
      taza: '<svg viewBox="0 0 120 120" width="100%" height="100%" aria-hidden="true"><path d="M84 46h8a12 12 0 0 1 0 24h-8" fill="none" stroke="#e9e1d6" stroke-width="8"/><path d="M28 34h56v46a18 18 0 0 1-18 18H46a18 18 0 0 1-18-18z" fill="#ece4d8"/><ellipse cx="56" cy="34" rx="28" ry="6" fill="#d3c6b3"/><path d="M28 62h56" stroke="#2f7a69" stroke-width="7"/></svg>',
      bolso: '<svg viewBox="0 0 120 120" width="100%" height="100%" aria-hidden="true"><path d="M42 46c0-14 8-22 18-22s18 8 18 22" fill="none" stroke="#7b4f26" stroke-width="5"/><path d="M24 46h72l-8 52H32z" fill="#c98b4c"/><path d="M27 60h66M29 74h62M31 88h58" stroke="#a66b32" stroke-width="3"/><path d="M44 46v52M60 46v52M76 46v52" stroke="#b77a3d" stroke-width="2"/></svg>',
      cafe: '<svg viewBox="0 0 120 120" width="100%" height="100%" aria-hidden="true"><path d="M36 20h48l6 12v64a4 4 0 0 1-4 4H34a4 4 0 0 1-4-4V32z" fill="#3a2a20"/><path d="M30 32h60" stroke="#5b4334" stroke-width="3"/><rect x="40" y="48" width="40" height="32" rx="3" fill="#ead8ba"/><ellipse cx="60" cy="64" rx="7" ry="10" fill="#6b4329"/><path d="M60 55c-3 5 3 13 0 18" stroke="#ead8ba" stroke-width="2" fill="none"/></svg>',
    };
    const PRODUCTS = [
      {
        key: 'taza', label: 'Taza artesanal', cls: 'prod-a', brand: 'Barro & Fuego', headline: 'Hecha a mano, una por una',
        title: 'Taza de cerámica artesanal · 350 ml',
        desc: 'Taza de cerámica esmaltada a mano, con franja verde y acabado mate. Cada pieza es única: pequeñas variaciones de color forman parte de su carácter artesanal.',
        points: 'Capacidad de 350 ml\nApta para microondas (dato a confirmar por el negocio)\nHecha en Costa Rica',
        social: 'Tu café de la mañana sabe distinto en una taza hecha a mano. ☕ Piezas únicas, esmaltadas una por una en nuestro taller.',
        tags: '#hechoamano #cerámica #costarica',
        review: ['El color del esmalte coincide con la pieza real', 'La forma del asa no fue alterada', 'Los datos técnicos están confirmados'],
      },
      {
        key: 'bolso', label: 'Bolso tejido', cls: 'prod-b', brand: 'Trenza Studio', headline: 'Tejido a mano para tus días de sol',
        title: 'Bolso tejido en fibra natural',
        desc: 'Bolso tejido a mano en fibra natural, con asas resistentes y amplio espacio interior. Ideal para la playa, el mercado o el día a día.',
        points: 'Tejido artesanal\nAsas reforzadas\nMedidas aproximadas: a confirmar por el negocio',
        social: 'Sol, mercado y un bolso que lo aguanta todo. 🌿 Tejido a mano por artesanas locales.',
        tags: '#artesanía #tejidoamano #modasostenible',
        review: ['El patrón del tejido es el real', 'El tamaño aparente no está exagerado', 'El color de la fibra coincide'],
      },
      {
        key: 'cafe', label: 'Café de altura', cls: 'prod-c', brand: 'Finca Los Robles', headline: 'Café de altura, tostado esta semana',
        title: 'Café de altura molido · 340 g',
        desc: 'Café 100 % arábica de altura, tueste medio, con notas a chocolate y frutos rojos. Tostado en pequeños lotes para conservar su frescura.',
        points: 'Tueste medio\nPresentación de 340 g\nOrigen y notas de cata: a confirmar por el productor',
        social: 'Del cafetal a tu taza, tostado esta misma semana. ☕ Notas a chocolate y frutos rojos.',
        tags: '#cafédecostarica #caféespecial #tuestemedio',
        review: ['La etiqueta y el peso son los reales', 'No se añadieron sellos o certificaciones inexistentes', 'Las notas de cata las confirma el productor'],
      },
    ];
    const pick = $('[data-product-pick]', product);
    const stage = $('[data-product-stage]', product);

    const render = (p) => {
      const before = el('figure', 'product-fig');
      const bi = el('div', 'pf-img pf-before');
      bi.innerHTML = SVG[p.key];
      before.append(bi, el('figcaption', '', 'Antes: foto casera del producto (ilustración)'));
      const after = el('figure', 'product-fig');
      const ai = el('div', 'pf-img pf-after ' + p.cls);
      ai.innerHTML = SVG[p.key];
      ai.prepend(el('p', 'pf-headline', p.headline));
      ai.append(el('p', 'pf-brand', p.brand));
      after.append(ai, el('figcaption', '', 'Después: creatividad comercial (ilustración)'));
      const copy = el('div', 'product-copy');
      copy.append(el('h3', '', p.title));
      const dl = el('dl');
      for (const [k, v] of [['Descripción', p.desc], ['Puntos clave', p.points], ['Texto para redes', p.social], ['Etiquetas', p.tags]]) {
        const d = el('div');
        d.append(el('dt', '', k), el('dd', '', v));
        dl.append(d);
      }
      const review = el('div', 'review');
      review.append(el('p', '', 'Revisión humana antes de publicar'));
      const ul = el('ul');
      ul.append(...p.review.map((r) => el('li', '', r)));
      review.append(ul);
      copy.append(dl, review);
      stage.replaceChildren(before, after, copy);
    };

    pick.replaceChildren(...PRODUCTS.map((p, i) => {
      const btn = el('button', 'chip-btn', p.label);
      btn.type = 'button';
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-checked', String(i === 0));
      btn.addEventListener('click', () => {
        for (const x of pick.children) x.setAttribute('aria-checked', String(x === btn));
        render(p);
      });
      return btn;
    }));
    render(PRODUCTS[0]);
  }

  /* ---------- Diagnóstico ---------- */
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
      body.append(el('h4', '', title), el('p', '', text), a);
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
          : [recCard('users', 'Conversemos sobre tu caso', 'Con lo que nos cuentas, lo mejor es una conversación breve para entender tu negocio antes de recomendar cualquier tecnología.', '#como-trabajamos', 'Ver cómo trabajamos →')]),
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
