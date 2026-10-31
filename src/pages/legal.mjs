import { SITE, wa } from '../config.mjs';
import { page, btn, breadcrumb, breadcrumbSchema } from '../layout.mjs';

export const privacidad = () => {
  const crumbs = [['Inicio', '/'], ['Política de privacidad', '/privacidad']];
  const mail = `<a href="mailto:${SITE.email}">${SITE.email}</a>`;
  return page({
    path: '/privacidad',
    title: 'Política de privacidad | EtherIA',
    description: 'Cómo EtherIA recopila, usa y protege los datos que nos compartes al visitar el sitio, completar el diagnóstico o escribirnos por WhatsApp o correo.',
    schema: [breadcrumbSchema(crumbs)],
    body: `
<section class="page-hero">
  <div class="container container-narrow">
    ${breadcrumb(crumbs)}
    <h1>Política de privacidad</h1>
    <p class="hero-lead">Última actualización: octubre de 2026.</p>
  </div>
</section>
<section class="section section-tight">
  <div class="container container-narrow prose">
    <h2>1. Quiénes somos</h2>
    <p>EtherIA es una empresa tecnológica de Costa Rica que desarrolla soluciones de automatización, inteligencia artificial y desarrollo web para empresas y emprendedores. Esta política explica qué información recopilamos cuando visitas www.etheriatech.com o te comunicas con nosotros, y cómo la usamos.</p>

    <h2>2. Qué información recopilamos</h2>
    <ul>
      <li><strong>Formulario de diagnóstico:</strong> tu nombre, tu dato de contacto (teléfono o correo), tu preferencia de contacto y las respuestas que nos das sobre tu negocio.</li>
      <li><strong>WhatsApp y correo:</strong> la información que decidas compartir al escribirnos.</li>
      <li><strong>Datos técnicos:</strong> como cualquier sitio web, nuestro proveedor de alojamiento puede registrar datos técnicos de las visitas (por ejemplo, dirección IP y navegador) por motivos de seguridad y funcionamiento.</li>
    </ul>
    <p>No recopilamos datos de pago a través de este sitio. Te pedimos que no incluyas información sensible (de salud, financiera o de terceros) en el formulario.</p>

    <h2>3. Demostraciones interactivas</h2>
    <p>Las demostraciones del sitio funcionan con respuestas preparadas dentro de tu navegador. Los mensajes que escribas en la demo del asistente no se envían ni se almacenan en nuestros servidores.</p>

    <h2>4. Para qué usamos tu información</h2>
    <ul>
      <li>Responder a tu solicitud y darte una orientación sobre tu caso.</li>
      <li>Preparar propuestas y dar seguimiento a la conversación que iniciaste.</li>
      <li>Gestionar proyectos en curso, si llegas a contratar nuestros servicios.</li>
    </ul>
    <p>No vendemos tu información ni la compartimos con terceros con fines comerciales.</p>

    <h2>5. Cómo procesamos las solicitudes</h2>
    <p>Cuando envías el diagnóstico, la información viaja de forma cifrada a nuestro sistema de automatización, que la registra y avisa a una persona del equipo para que revise tu caso. Para ello utilizamos proveedores tecnológicos como Vercel (alojamiento del sitio), nuestra plataforma de automatización, Google Workspace (registro de solicitudes) y Telegram (avisos internos). Cada proveedor aplica sus propias medidas de seguridad y políticas de privacidad.</p>

    <h2>6. Cookies</h2>
    <p>Este sitio no utiliza cookies de seguimiento ni publicidad. Si en el futuro incorporamos herramientas de analítica, actualizaremos esta política y, cuando corresponda, solicitaremos tu consentimiento.</p>

    <h2>7. Cuánto tiempo conservamos los datos</h2>
    <p>Conservamos los datos de contacto y de las solicitudes mientras sean necesarios para atender tu consulta o la relación comercial, y los eliminamos cuando dejan de serlo o cuando nos lo pides, salvo que la ley nos obligue a conservarlos.</p>

    <h2>8. Tus derechos</h2>
    <p>De acuerdo con la Ley de Protección de la Persona frente al Tratamiento de sus Datos Personales (Ley N.º 8968 de Costa Rica), puedes solicitar el acceso, la rectificación o la eliminación de tus datos personales escribiéndonos a ${mail}.</p>

    <h2>9. Contacto</h2>
    <p>Si tienes preguntas sobre esta política, escríbenos a ${mail} o por <a href="${wa()}" target="_blank" rel="noopener">WhatsApp al ${SITE.phoneDisplay}</a>.</p>

    <p class="back">${btn('Volver al inicio', '/', { variant: 'ghost' })}</p>
  </div>
</section>`,
  });
};

export const notFound = () =>
  page({
    path: '/404',
    title: 'Página no encontrada | EtherIA',
    description: 'La página que buscas no existe o cambió de dirección. Vuelve al inicio de EtherIA o explora nuestras soluciones.',
    noindex: true,
    body: `
<section class="page-hero not-found">
  <div class="container container-narrow">
    <p class="eyebrow">Error 404</p>
    <h1>No encontramos esta página</h1>
    <p class="hero-lead">Puede que el enlace haya cambiado. Te ayudamos a encontrar lo que buscas.</p>
    <div class="hero-actions">
      ${btn('Ir al inicio', '/')}
      ${btn('Ver soluciones', '/#soluciones', { variant: 'ghost' })}
    </div>
  </div>
</section>`,
  });
