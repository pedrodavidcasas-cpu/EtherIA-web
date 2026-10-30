// POST /api/diagnostico — recibe el formulario de diagnóstico y lo reenvía a n8n.
// Variables de entorno (Vercel → Settings → Environment Variables):
//   N8N_DIAGNOSTICO_WEBHOOK_URL  URL del webhook de producción en n8n (nunca en el código)
//   N8N_WEBHOOK_SECRET           secreto compartido que n8n debe comprobar en la cabecera X-EtherIA-Secret
// Si no están configuradas responde 503 y la web ofrece enviar la solicitud por WhatsApp.
import { guard, clean, cleanList, send, forward } from './_lib.js';

const DIFICULTADES = ['mensajes', 'redes', 'productos', 'seguimiento', 'web', 'repetitivas', 'otra'];
const TAREAS = ['responder', 'citas', 'publicar', 'fotos', 'seguimiento', 'datos', 'reportes'];
const HERRAMIENTAS = ['WhatsApp', 'Instagram / Facebook', 'Excel / Google Sheets', 'Google Drive', 'Correo electrónico', 'Un CRM', 'Sistema de facturación', 'Página web', 'Ninguna en especial'];
const PREFERENCIAS = ['WhatsApp', 'Correo', 'Llamada'];
const SOLUCIONES = ['recepcionista-ia', 'redes-sociales-ia', 'contenido-productos', 'gestion-oportunidades', 'desarrollo-web', 'automatizacion-procesos'];

export default async function handler(req, res) {
  if (guard(req, res, 8000)) return;
  const b = req.body || {};

  // Trampa para bots: campo oculto relleno o envío demasiado rápido. Se responde "ok" para no dar pistas.
  if (clean(b.sitio_web, 200) || Number(b.t) < 4000) return send(res, 200, { ok: true });

  const data = {
    negocio: clean(b.negocio, 120),
    dificultad: cleanList(b.dificultad, DIFICULTADES),
    detalle: clean(b.detalle, 800),
    tareas: cleanList(b.tareas, TAREAS),
    herramientas: cleanList(b.herramientas, HERRAMIENTAS),
    mejorar: clean(b.mejorar, 800),
    preferencia: PREFERENCIAS.includes(b.preferencia) ? b.preferencia : 'WhatsApp',
    nombre: clean(b.nombre, 80),
    contacto: clean(b.contacto, 120),
    orientacion: cleanList(b.orientacion, SOLUCIONES),
  };

  const contactoValido =
    data.preferencia === 'Correo' ? /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.contacto) : data.contacto.replace(/\D/g, '').length >= 8;
  if (data.negocio.length < 2 || data.nombre.length < 2 || !contactoValido || b.consentimiento !== true) {
    return send(res, 422, { ok: false, code: 'invalid' });
  }

  const url = process.env.N8N_DIAGNOSTICO_WEBHOOK_URL;
  if (!url) return send(res, 503, { ok: false, code: 'not_configured' });

  try {
    await forward(url, { ...data, origen: 'web-diagnostico', recibido: new Date().toISOString() });
    return send(res, 200, { ok: true });
  } catch (e) {
    console.error('diagnostico: fallo al reenviar a n8n', e.message);
    return send(res, 502, { ok: false, code: 'upstream' });
  }
}
