// Casos y proyectos. No incluir métricas, testimonios ni resultados que no estén documentados.
// `media`: capturas reales (rutas en /assets/img). Si un caso no tiene capturas todavía, se muestra
// su diagrama de arquitectura (`flow`). Para añadir capturas más adelante, agrega objetos
// { src, alt, w, h, kind: 'desktop' | 'mobile' } en `media`, ocultando datos confidenciales.
// `diagram`: imagen del flujo real en n8n { src, alt, w, h, note }. Se muestra a ancho completo.

export const CASES = [
  {
    slug: 'spa-web',
    client: 'Hands & Paradise Spa',
    title: 'Sitio web de Hands & Paradise Spa',
    kind: 'Desarrollo web',
    solution: 'desarrollo-web',
    url: 'https://handsandparadisespa.com/',
    summary:
      'Sitio web bilingüe para un spa en San José: catálogo completo de servicios con precios, paquetes, galería, reservas directas por WhatsApp y una experiencia pensada para el celular.',
    challenge:
      'El spa necesitaba una presencia digital a la altura de la experiencia que ofrece en persona: que el cliente encontrara rápido los servicios y pudiera reservar sin fricción.',
    built: [
      'Diseño a medida con la identidad visual del spa.',
      'Catálogo de servicios con filtros por categoría, duración y precio.',
      'Botones de reserva por WhatsApp en cada servicio.',
      'Versión en español e inglés.',
      'Optimización para móviles, velocidad y SEO local.',
    ],
    stack: ['HTML y CSS a medida', 'Integración con WhatsApp', 'SEO técnico', 'GitHub + Vercel'],
    status: 'Publicado y en funcionamiento.',
    media: [
      { src: '/assets/img/caso-spa-portada-escritorio.webp', alt: 'Portada del sitio web de Hands & Paradise Spa en escritorio', w: 1200, h: 750, kind: 'desktop' },
      { src: '/assets/img/caso-spa-portada-movil.webp', alt: 'Portada del sitio web de Hands & Paradise Spa en un celular', w: 390, h: 844, kind: 'mobile' },
      { src: '/assets/img/caso-spa-catalogo-escritorio.webp', alt: 'Catálogo de servicios con filtros y precios del sitio de Hands & Paradise Spa', w: 1200, h: 750, kind: 'desktop' },
      { src: '/assets/img/caso-spa-catalogo-movil.webp', alt: 'Catálogo de servicios del spa visto desde un celular', w: 390, h: 844, kind: 'mobile' },
    ],
  },
  {
    slug: 'spa-contenido',
    client: 'Hands & Paradise Spa',
    title: 'Automatización de contenido para redes sociales',
    kind: 'Gestor de redes con IA',
    solution: 'redes-sociales-ia',
    summary:
      'Un sistema que planifica publicaciones según fechas y campañas, selecciona servicios, genera creatividades con fotografías reales del spa y prepara los textos para cada red, con revisión antes de publicar.',
    challenge:
      'Mantener las redes activas exigía pensar temas, diseñar piezas y redactar textos de forma manual, quitándole tiempo a la atención de los clientes.',
    built: [
      'Activación programada y análisis de fechas y campañas estacionales.',
      'Selección de servicios y promociones a destacar.',
      'Generación de creatividades a partir de fotografías reales del negocio.',
      'Redacción de textos adaptados a cada red, con la identidad de la marca.',
      'Memoria de publicaciones para reducir repeticiones.',
      'Revisión y aprobación antes de enviar a publicación.',
      'Organización de recursos en Google Drive.',
    ],
    stack: ['n8n', 'Modelos de IA', 'Generación y edición de imágenes', 'Google Drive', 'Google Sheets', 'Blotato', 'Telegram'],
    status: 'Desarrollado. Los canales de publicación activos dependen de la configuración vigente.',
    diagram: {
      src: '/assets/img/flujo-redes-hands-paradise.webp',
      alt: 'Diagrama del flujo en n8n: un mensaje de Telegram activa el sistema, que elige entre contenido por festividad o por servicio regular, genera la imagen y el texto con IA y prepara las publicaciones para Instagram, Facebook, TikTok y Pinterest',
      w: 1875,
      h: 839,
    },
    flow: ['Fecha y contexto', 'Servicio o tema', 'Propuesta', 'Creatividad', 'Textos por red', 'Aprobación', 'Publicación'],
  },
  {
    slug: 'kael',
    client: 'EtherIA (proyecto interno)',
    title: 'Kael, asistente inteligente de EtherIA',
    kind: 'Recepcionista con IA',
    solution: 'recepcionista-ia',
    summary:
      'Nuestro propio asistente de atención: recibe mensajes por WhatsApp, entiende la consulta, responde con información autorizada, recuerda el historial y avisa a una persona por Telegram cuando hace falta.',
    challenge:
      'Queríamos demostrar en nuestro propio negocio lo que proponemos a nuestros clientes: atención rápida y consistente sin perder el trato humano.',
    built: [
      'Recepción de mensajes por WhatsApp y comprensión de lenguaje natural.',
      'Respuestas basadas en información autorizada del negocio.',
      'Historial y memoria de conversaciones; identificación de clientes recurrentes.',
      'Clasificación de solicitudes y registro de interacciones.',
      'Avisos al responsable por Telegram y escalamiento a una persona.',
    ],
    testing: ['Consulta de disponibilidad y reservas.', 'Integraciones con sistemas externos.'],
    stack: ['n8n', 'Modelos de IA', 'WhatsApp', 'Telegram', 'Google Sheets'],
    status: 'Funciones de atención desarrolladas; reservas e integraciones externas en evolución.',
    diagram: {
      src: '/assets/img/flujo-kael-asistente.webp',
      alt: 'Diagrama del flujo de Kael en n8n: recibe el mensaje, clasifica al cliente, lo dirige a seis ramas (activación de demo, preguntas sobre el servicio, cliente no interesado, saludo, mensaje irrelevante y otras preguntas) y usa un agente de IA con memoria, Google Sheets y aviso al responsable',
      w: 1883,
      h: 835,
      note: 'Se ocultaron identificadores internos del sistema.',
    },
    flow: ['Mensaje en WhatsApp', 'Comprensión', 'Información autorizada', 'Memoria', 'Respuesta o aviso a una persona'],
  },
  {
    slug: 'productos',
    client: 'Desarrollo propio',
    title: 'Gestor de contenido para productos',
    kind: 'Contenido para productos',
    solution: 'contenido-productos',
    summary:
      'Un flujo que parte de la fotografía de un producto y la convierte en una propuesta comercial: imagen mejorada con IA, descripción, copy para redes y preparación para publicación.',
    challenge:
      'Los negocios con catálogo necesitan presentar muchos productos de forma profesional, y hacerlo a mano no escala.',
    built: [
      'Recepción de fotografías e información del producto.',
      'Preparación y mejora de imágenes con IA.',
      'Descripciones comerciales y copy adaptado por red.',
      'Inclusión de identidad de marca y organización del contenido.',
      'Paso de revisión para verificar que el producto se muestre tal como es.',
    ],
    stack: ['n8n', 'Modelos de IA', 'Edición de imágenes con IA', 'Google Drive'],
    status: 'Desarrollado. Los ejemplos antes/después se publicarán cuando contemos con casos autorizados.',
    diagram: {
      src: '/assets/img/flujo-contenido-productos.webp',
      alt: 'Diagrama del flujo en n8n: recibe la foto del producto por Telegram, la IA analiza la imagen, un copywriter genera el texto, se crea la imagen final, se verifica y se publica en redes sociales',
      w: 1746,
      h: 901,
    },
    flow: ['Fotografía', 'Procesamiento con IA', 'Creatividad', 'Texto publicitario', 'Revisión', 'Publicación'],
  },
  {
    slug: 'oportunidades',
    client: 'Desarrollo propio',
    title: 'Gestión inteligente de oportunidades',
    kind: 'Gestión de oportunidades',
    solution: 'gestion-oportunidades',
    summary:
      'Flujos que encuentran negocios por nicho y ciudad, limpian y validan la información, extraen correos de contacto, organizan todo en Google Sheets y preparan correos personalizados para el seguimiento.',
    challenge:
      'La búsqueda de clientes potenciales y su seguimiento se hacían a mano: datos dispersos, contactos duplicados y oportunidades sin un estado claro.',
    built: [
      'Búsqueda de negocios por nicho y ciudad en fuentes públicas como Google Maps.',
      'Limpieza de datos, eliminación de duplicados y procesamiento de sitios web.',
      'Extracción y validación de correos de contacto.',
      'Registro y actualización de una base de contactos en Google Sheets.',
      'Preparación y envío de correos personalizados según el estado de cada contacto.',
    ],
    stack: ['n8n', 'Modelos de IA', 'Google Maps', 'Google Sheets', 'Correo electrónico'],
    status: 'Desarrollado y en uso interno. El envío por correo y la integración con CRM se adaptan a cada cliente.',
    diagram: {
      src: '/assets/img/flujo-gestion-oportunidades.webp',
      alt: 'Diagrama del flujo en n8n: genera la búsqueda por nicho y ciudad, obtiene negocios de Google Maps, limpia y filtra los datos, procesa las páginas web, extrae y valida correos, los registra en Google Sheets y envía correos personalizados',
      w: 1959,
      h: 803,
      caption: 'Diagrama simplificado del flujo en n8n.',
    },
    flow: ['Búsqueda', 'Limpieza', 'Extracción de correos', 'Google Sheets', 'Correo personalizado'],
  },
];

export const caseBySlug = (slug) => CASES.find((c) => c.slug === slug);
