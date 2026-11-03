import { icon } from './config.mjs';
// Precios orientativos de la página /precios. Son referencias iniciales, no tarifas cerradas.
// `impl` y `monthly` son rangos [mínimo, máximo] en colones: el mínimo es el "desde" de la tarjeta.
// Los nombres coinciden con las soluciones de /soluciones (`solution`); "Sistemas comerciales avanzados" es una
// combinación de varias. Desarrollo web y Contenido para productos no tienen precio publicado: se cotizan (ver QUOTE_ONLY).
// La calculadora usa mínimo (básica), punto medio redondeado a ₡5.000 (intermedia) y máximo (avanzada).
export const PLANS = [
  {
    id: 'automatizaciones',
    icon: 'workflow',
    name: 'Automatización de procesos',
    calcName: 'Automatización de procesos',
    solution: 'automatizacion-procesos',
    text: 'Elimina tareas repetitivas y conecta las herramientas de tu negocio para trabajar de forma más rápida, organizada y eficiente.',
    benefits: ['Automatización de procesos repetitivos.', 'Integración entre aplicaciones.', 'Reducción del trabajo manual.'],
    impl: [80000, 150000],
    monthly: [18000, 35000],
  },
  {
    id: 'captacion',
    icon: 'target',
    name: 'Gestión de oportunidades',
    calcName: 'Gestión de oportunidades',
    solution: 'gestion-oportunidades',
    text: 'Descubre nuevas oportunidades comerciales mediante sistemas que buscan, organizan y clasifican clientes potenciales.',
    benefits: ['Identificación de oportunidades comerciales.', 'Organización automática de prospectos.', 'Seguimiento de clientes potenciales.'],
    impl: [135000, 250000],
    monthly: [35000, 60000],
  },
  {
    id: 'redes',
    icon: 'sparkles',
    name: 'Redes sociales con IA',
    calcName: 'Redes sociales con IA',
    solution: 'redes-sociales-ia',
    text: 'Mantén tus redes sociales activas mediante automatizaciones que ayudan a planificar, generar y publicar contenido de manera inteligente.',
    benefits: ['Publicaciones automatizadas.', 'Campañas para fechas especiales.', 'Ahorro de tiempo en gestión de contenido.'],
    impl: [140000, 250000],
    monthly: [50000, 75000],
  },
  {
    id: 'asistentes',
    icon: 'bot',
    name: 'Recepcionista con IA',
    calcName: 'Recepcionista con IA',
    solution: 'recepcionista-ia',
    text: 'Ofrece atención inteligente a tus clientes las 24 horas mediante asistentes virtuales capaces de responder consultas y gestionar solicitudes.',
    benefits: ['Atención automática 24/7.', 'Respuestas personalizadas con IA.', 'Integración con herramientas del negocio.'],
    impl: [160000, 390000],
    monthly: [60000, 100000],
  },
  {
    id: 'sistemas',
    icon: 'layers',
    name: 'Sistemas comerciales avanzados',
    calcName: 'Sistemas comerciales avanzados',
    text: 'Combina varias soluciones (captación, atención al cliente con IA y seguimiento comercial) en un único sistema conectado.',
    benefits: ['Automatización de procesos comerciales.', 'Clasificación inteligente de conversaciones.', 'Integraciones avanzadas y seguimiento.'],
    impl: [240000, 500000],
    monthly: [70000, 110000],
  },
];

// Soluciones sin precio publicado: se muestran como "cotización a medida" junto a los planes.
export const QUOTE_ONLY = ['desarrollo-web', 'contenido-productos'];

export const LEVELS = [
  ['basica', 'Básica'],
  ['intermedia', 'Intermedia'],
  ['avanzada', 'Avanzada'],
];

// Formato de colones con punto de miles: 80000 → "₡80.000". Debe coincidir con assets/js/precios.js.
export const crc = (n) => '₡' + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

// Aviso visible de que los precios son una referencia. `extra` añade una segunda frase más detallada.
export const priceNote = (extra = '') => `
<div class="price-note-box reveal" role="note">
  <span class="price-note-ico">${icon('info', 20)}</span>
  <div>
    <p><strong>Estos precios son orientativos, no una cotización.</strong> Cada automatización es distinta: el precio final depende del alcance y la complejidad de lo que necesite tu negocio.</p>
    ${extra ? `<p class="price-note-extra">${extra}</p>` : ''}
  </div>
</div>`;
