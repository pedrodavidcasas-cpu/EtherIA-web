import { SITE, wa } from '../config.mjs';
import { page, btn, breadcrumb, breadcrumbSchema } from '../layout.mjs';

export const privacidad = () => {
  const crumbs = [['Inicio', '/'], ['Política de privacidad', '/privacidad']];
  const mail = `<a href="mailto:${SITE.email}">${SITE.email}</a>`;
  return page({
    path: '/privacidad',
    title: 'Política de privacidad | EtherIA',
    description: 'Cómo EtherIA trata los datos de quienes visitan su sitio y los que procesa para sus clientes en WhatsApp Business Platform, con IA y atención humana.',
    schema: [breadcrumbSchema(crumbs)],
    body: `
<section class="page-hero">
  <div class="container container-narrow">
    ${breadcrumb(crumbs)}
    <h1>Política de privacidad</h1>
    <p class="hero-lead">Última actualización: noviembre de 2026.</p>
  </div>
</section>
<section class="section section-tight">
  <div class="container container-narrow prose">
    <h2>1. Quiénes somos</h2>
    <p>EtherIA es una empresa tecnológica de Costa Rica que desarrolla soluciones de automatización, inteligencia artificial y desarrollo web para empresas y emprendedores. Esta política explica qué información tratamos cuando visitas www.etheriatech.com o te comunicas con nosotros, y también cómo tratamos la información de los clientes de las empresas que contratan nuestros servicios de atención automatizada por WhatsApp.</p>

    <h2>2. A quién aplica esta política</h2>
    <p>Tratamos dos tipos de datos, con responsabilidades distintas:</p>
    <ul>
      <li><strong>Datos de visitantes y prospectos de EtherIA:</strong> los de quienes visitan este sitio, completan el diagnóstico o nos escriben por WhatsApp o correo. En este caso, EtherIA decide para qué se usan y es responsable de ellos (secciones 3 a 7).</li>
      <li><strong>Datos tratados por cuenta de empresas clientes:</strong> los de las personas que escriben al WhatsApp de una empresa que contrató a EtherIA (por ejemplo, para hacer una consulta o pedir una reserva). La empresa cliente es la responsable de esos datos y decide para qué se usan; EtherIA los trata únicamente para prestarle el servicio contratado y siguiendo sus instrucciones (secciones 8 a 13). Si eres cliente de una de esas empresas, también aplica su propia política de privacidad.</li>
    </ul>

    <h2>3. Qué información recopilamos de los visitantes</h2>
    <ul>
      <li><strong>Formulario de diagnóstico:</strong> tu nombre, tu dato de contacto (teléfono o correo), tu preferencia de contacto y las respuestas que nos das sobre tu negocio.</li>
      <li><strong>WhatsApp y correo:</strong> la información que decidas compartir al escribirnos.</li>
      <li><strong>Datos técnicos:</strong> como cualquier sitio web, nuestro proveedor de alojamiento puede registrar datos técnicos de las visitas (por ejemplo, dirección IP y navegador) por motivos de seguridad y funcionamiento.</li>
    </ul>
    <p>No recopilamos datos de pago a través de este sitio. Te pedimos que no incluyas información sensible (de salud, financiera o de terceros) en el formulario.</p>

    <h2>4. Demostraciones interactivas</h2>
    <p>Las demostraciones del sitio funcionan con respuestas preparadas dentro de tu navegador. Los mensajes que escribas en la demo del asistente no se envían ni se almacenan en nuestros servidores.</p>

    <h2>5. Para qué usamos la información de los visitantes</h2>
    <ul>
      <li>Responder a tu solicitud y darte una orientación sobre tu caso.</li>
      <li>Preparar propuestas y dar seguimiento a la conversación que iniciaste.</li>
      <li>Gestionar proyectos en curso, si llegas a contratar nuestros servicios.</li>
    </ul>
    <p>No vendemos tu información ni la compartimos con terceros con fines comerciales.</p>

    <h2>6. Cómo procesamos las solicitudes del sitio</h2>
    <p>Cuando envías el diagnóstico, la información viaja de forma cifrada a nuestro sistema de automatización, que la registra y avisa a una persona del equipo para que revise tu caso. Para ello utilizamos proveedores tecnológicos como Vercel (alojamiento del sitio), n8n (plataforma de automatización), Google Workspace (registro de solicitudes) y Telegram (avisos internos). Cada proveedor aplica sus propias medidas de seguridad y políticas de privacidad.</p>

    <h2>7. Cookies</h2>
    <p>Este sitio no utiliza cookies de seguimiento ni publicidad. Si en el futuro incorporamos herramientas de analítica, actualizaremos esta política y, cuando corresponda, solicitaremos tu consentimiento.</p>

    <h2>8. Servicios de WhatsApp para empresas clientes</h2>
    <p>EtherIA conecta los números de WhatsApp de sus empresas clientes con asistentes automatizados mediante la plataforma oficial de Meta, WhatsApp Business Platform (Cloud API):</p>
    <ul>
      <li><strong>Registro integrado (Embedded Signup):</strong> la empresa cliente conecta su cuenta de WhatsApp Business con EtherIA desde el flujo oficial de Meta y autoriza expresamente los permisos que concede. Así recibimos los identificadores de su cuenta y de su número, y una credencial de acceso que usamos solo para prestarle el servicio.</li>
      <li><strong>Coexistencia (WhatsApp Coexistence):</strong> si la empresa cliente usa la aplicación WhatsApp Business, puede seguir usándola en el mismo número mientras el asistente atiende por la Cloud API. Los mensajes enviados desde la aplicación y desde la automatización se sincronizan entre ambas. Al conectar el número, Meta puede ofrecer a la empresa sincronizar sus contactos y el historial reciente de conversaciones; esa sincronización solo ocurre si la empresa la acepta.</li>
    </ul>
    <p><strong>Datos que tratamos en este servicio:</strong></p>
    <ul>
      <li>Número de teléfono de WhatsApp y nombre de perfil o de contacto de quien escribe.</li>
      <li>Contenido de los mensajes (texto y, cuando la automatización lo admite, los archivos que la persona envía).</li>
      <li>Datos necesarios para gestionar consultas y solicitudes de reserva, como el servicio solicitado, la fecha y la hora deseadas y las indicaciones que la persona comparte.</li>
      <li>Información técnica de los mensajes que entrega Meta, como la fecha y la hora, el estado de entrega y los identificadores de mensaje.</li>
      <li>Si la empresa lo acepta al activar la coexistencia, los contactos y el historial de conversaciones sincronizados.</li>
      <li>Datos de la cuenta de la empresa cliente: los identificadores de su cuenta de WhatsApp Business y de su número, y la credencial de acceso que autorizó.</li>
    </ul>
    <p>Pedimos a las empresas clientes que no usen el servicio para solicitar datos sensibles (como datos de salud o financieros), salvo que sea estrictamente necesario y cuenten con la base legal correspondiente.</p>

    <h2>9. Para qué tratamos estos datos</h2>
    <ul>
      <li>Recibir y responder los mensajes que las personas envían al WhatsApp de la empresa cliente.</li>
      <li>Automatizar la atención: responder preguntas frecuentes con la información que la empresa autorizó, tomar y organizar solicitudes de reserva y dar seguimiento a la conversación.</li>
      <li>Avisar a una persona de la empresa cuando una consulta requiere atención humana.</li>
      <li>Registrar las solicitudes en las herramientas que la empresa cliente defina, para que pueda gestionarlas.</li>
      <li>Mantener, revisar y corregir el funcionamiento del servicio y atender incidencias.</li>
    </ul>
    <p>No vendemos estos datos, no los usamos para publicidad ni para fines propios de EtherIA, y no los compartimos con otras empresas clientes.</p>

    <h2>10. Procesamiento con inteligencia artificial</h2>
    <p>Para generar las respuestas, el asistente envía el contenido de la conversación, junto con la información autorizada por la empresa cliente, a un proveedor de modelos de inteligencia artificial. El modelo interpreta la consulta y propone una respuesta, que el sistema envía por WhatsApp. Para dar continuidad a la conversación, el asistente puede usar su historial reciente.</p>
    <p>Las respuestas automáticas pueden contener errores. Por eso el asistente está pensado para pasar a una persona las consultas que no puede resolver, y las decisiones importantes (por ejemplo, confirmar una reserva o resolver un reclamo) quedan sujetas a lo que defina la empresa cliente. EtherIA no utiliza el contenido de las conversaciones para entrenar modelos propios.</p>

    <h2>11. Intervención humana y gestión manual</h2>
    <ul>
      <li>La empresa cliente puede leer las conversaciones y responder manualmente en cualquier momento; por ejemplo, desde la aplicación WhatsApp Business cuando usa la coexistencia.</li>
      <li>Según la configuración del servicio, el asistente avisa a una persona responsable (por ejemplo, por Telegram) cuando la consulta lo requiere.</li>
      <li>Quien escribe puede pedir en la conversación que lo atienda una persona.</li>
      <li>El personal de EtherIA solo accede a las conversaciones cuando es necesario para configurar el servicio, dar soporte o corregir errores.</li>
    </ul>

    <h2>12. Proveedores que intervienen</h2>
    <p>Para prestar nuestros servicios utilizamos los siguientes proveedores. Cada uno aplica sus propias condiciones y políticas de privacidad, y algunos pueden tratar los datos en servidores ubicados fuera de Costa Rica:</p>
    <ul>
      <li><strong>Meta Platforms (WhatsApp Business Platform y Cloud API):</strong> transporte y entrega de los mensajes de WhatsApp, y registro integrado de las cuentas. Meta trata los mensajes según sus propias condiciones y su política de privacidad.</li>
      <li><strong>n8n:</strong> plataforma de automatización donde funcionan los flujos que reciben, procesan y responden los mensajes.</li>
      <li><strong>Hostinger:</strong> proveedor de servidores donde opera nuestra plataforma de automatización.</li>
      <li><strong>Proveedores de modelos de inteligencia artificial:</strong> generan las respuestas del asistente a partir del contenido de la conversación.</li>
      <li><strong>Google Workspace:</strong> registro de solicitudes y reservas, cuando la empresa cliente lo usa.</li>
      <li><strong>Telegram:</strong> avisos internos a las personas responsables.</li>
      <li><strong>Vercel:</strong> alojamiento de este sitio web.</li>
    </ul>

    <h2>13. Conservación de los datos</h2>
    <ul>
      <li><strong>Visitantes y prospectos:</strong> conservamos los datos de contacto y de las solicitudes mientras sean necesarios para atender tu consulta o la relación comercial, y los eliminamos cuando dejan de serlo o cuando nos lo pides, salvo que la ley nos obligue a conservarlos.</li>
      <li><strong>Datos de empresas clientes:</strong> los conservamos solo mientras sean necesarios para prestar el servicio y según las instrucciones de la empresa cliente. Cuando termina el servicio, o cuando la empresa lo solicita, los eliminamos o se los entregamos, salvo que la ley nos obligue a conservarlos.</li>
      <li>Meta y los demás proveedores pueden conservar ciertos datos durante los plazos que establecen sus propias condiciones.</li>
    </ul>

    <h2>14. Seguridad</h2>
    <p>Aplicamos medidas razonables para proteger la información: este sitio y las comunicaciones con la Cloud API de Meta viajan cifradas mediante HTTPS, las credenciales de acceso y las direcciones de nuestras integraciones no se publican en el código del sitio, y el acceso a las conversaciones se limita a las personas que lo necesitan para prestar el servicio. Ningún sistema es completamente infalible; si detectamos un incidente que afecte datos personales, lo atenderemos y lo comunicaremos a quien corresponda conforme a la ley.</p>

    <h2 id="eliminacion-de-datos">15. Cómo solicitar la eliminación de tus datos</h2>
    <ul>
      <li><strong>Si eres visitante o prospecto de EtherIA:</strong> escríbenos a ${mail} o por WhatsApp al ${SITE.phoneDisplay} con tu nombre y el número o correo con el que te comunicaste. Eliminaremos tus datos de nuestros registros, salvo los que la ley nos obligue a conservar, y te confirmaremos cuando esté hecho.</li>
      <li><strong>Si escribiste al WhatsApp de una empresa que usa nuestros servicios:</strong> puedes pedírselo directamente a esa empresa o escribirnos a ${mail} con el nombre de la empresa y tu número de WhatsApp. Trasladaremos tu solicitud a la empresa responsable y, siguiendo sus instrucciones, eliminaremos los datos que tratamos por su cuenta.</li>
      <li><strong>Si eres una empresa cliente:</strong> puedes retirar en cualquier momento el acceso concedido a EtherIA desde la configuración de tu cuenta empresarial de Meta, y pedirnos por correo que eliminemos los datos de tu cuenta y de tus conversaciones.</li>
    </ul>

    <h2>16. Tus derechos y cómo ejercerlos</h2>
    <p>De acuerdo con la Ley de Protección de la Persona frente al Tratamiento de sus Datos Personales (Ley N.º 8968 de Costa Rica) y su reglamento, puedes solicitar el acceso, la rectificación o la eliminación de tus datos personales. Para hacerlo:</p>
    <ul>
      <li>Escríbenos a ${mail} indicando qué derecho quieres ejercer y el teléfono o correo relacionado con tus datos.</li>
      <li>Podemos pedirte información adicional para confirmar tu identidad antes de atender la solicitud, con el fin de proteger tus datos.</li>
      <li>Responderemos dentro de los plazos que establece la normativa costarricense. Si tratamos los datos por cuenta de una empresa cliente, coordinaremos la respuesta con ella.</li>
    </ul>
    <p>Si consideras que no se atendieron tus derechos, puedes acudir a la Agencia de Protección de Datos de los Habitantes (PRODHAB).</p>

    <h2>17. Cumplimiento de las condiciones de Meta</h2>
    <p>Usamos WhatsApp Business Platform conforme a las condiciones y políticas de Meta y de WhatsApp aplicables a los negocios. En particular, solo usamos los datos recibidos por medio de la plataforma para prestar el servicio a la empresa cliente que los autorizó, no los vendemos y respetamos las solicitudes de eliminación. Las empresas clientes son responsables de contar con el permiso de las personas a quienes escriben y de respetar su decisión de no recibir más mensajes.</p>

    <h2>18. Menores de edad</h2>
    <p>Nuestros servicios están dirigidos a empresas y personas adultas. No recopilamos de forma intencionada datos de menores de edad a través de este sitio.</p>

    <h2>19. Cambios en esta política</h2>
    <p>Podemos actualizar esta política cuando cambien nuestros servicios o la normativa. Publicaremos la versión vigente en esta misma página, con su fecha de actualización.</p>

    <h2>20. Contacto</h2>
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
