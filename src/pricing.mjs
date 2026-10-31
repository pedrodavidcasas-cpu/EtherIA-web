// Precios orientativos de la página /precios. Son referencias iniciales, no tarifas cerradas.
// `impl` y `monthly` son rangos [mínimo, máximo] en colones: el mínimo es el "desde" de la tarjeta
// y la calculadora usa mínimo (básica), punto medio redondeado a ₡5.000 (intermedia) y máximo (avanzada).
export const PLANS = [
  {
    id: 'automatizaciones',
    icon: 'workflow',
    name: 'Automatizaciones a medida',
    calcName: 'Automatizaciones a medida',
    text: 'Elimina tareas repetitivas y conecta las herramientas de tu negocio para trabajar de forma más rápida, organizada y eficiente.',
    benefits: ['Automatización de procesos repetitivos.', 'Integración entre aplicaciones.', 'Reducción del trabajo manual.'],
    impl: [80000, 150000],
    monthly: [18000, 35000],
  },
  {
    id: 'captacion',
    icon: 'target',
    name: 'Captación de clientes potenciales',
    calcName: 'Captación de clientes',
    text: 'Descubre nuevas oportunidades comerciales mediante sistemas que buscan, organizan y clasifican clientes potenciales.',
    benefits: ['Identificación de oportunidades comerciales.', 'Organización automática de prospectos.', 'Seguimiento de clientes potenciales.'],
    impl: [135000, 250000],
    monthly: [35000, 60000],
  },
  {
    id: 'redes',
    icon: 'sparkles',
    name: 'Gestión inteligente de redes sociales',
    calcName: 'Redes sociales',
    text: 'Mantén tus redes sociales activas mediante automatizaciones que ayudan a planificar, generar y publicar contenido de manera inteligente.',
    benefits: ['Publicaciones automatizadas.', 'Campañas para fechas especiales.', 'Ahorro de tiempo en gestión de contenido.'],
    impl: [170000, 250000],
    monthly: [50000, 75000],
  },
  {
    id: 'asistentes',
    icon: 'bot',
    name: 'Recepcionistas y asistentes con IA',
    calcName: 'Asistentes con IA',
    text: 'Ofrece atención inteligente a tus clientes las 24 horas mediante asistentes virtuales capaces de responder consultas y gestionar solicitudes.',
    benefits: ['Atención automática 24/7.', 'Respuestas personalizadas con IA.', 'Integración con herramientas del negocio.'],
    impl: [200000, 390000],
    monthly: [60000, 100000],
    featured: true,
  },
  {
    id: 'sistemas',
    icon: 'layers',
    name: 'Sistemas comerciales avanzados',
    calcName: 'Sistemas comerciales avanzados',
    text: 'Conecta captación, atención al cliente, inteligencia artificial y seguimiento comercial en un único sistema inteligente.',
    benefits: ['Automatización de procesos comerciales.', 'Clasificación inteligente de conversaciones.', 'Integraciones avanzadas y seguimiento.'],
    impl: [280000, 500000],
    monthly: [70000, 110000],
  },
];

export const LEVELS = [
  ['basica', 'Básica'],
  ['intermedia', 'Intermedia'],
  ['avanzada', 'Avanzada'],
];

// Formato de colones con punto de miles: 80000 → "₡80.000". Debe coincidir con assets/js/precios.js.
export const crc = (n) => '₡' + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
