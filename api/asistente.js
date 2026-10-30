// POST /api/asistente — preparado para conectar la demo del asistente con un flujo real de n8n.
// No está activo por defecto: la demo usa respuestas preparadas. Para activarlo:
//   1. Configura N8N_ASISTENTE_WEBHOOK_URL y N8N_WEBHOOK_SECRET en Vercel.
//   2. El flujo de n8n debe responder JSON: { "reply": "texto" }, usando solo datos ficticios o autorizados.
//   3. Añade data-endpoint="/api/asistente" al elemento [data-chat] en src/pages/home.mjs y regenera.
import { guard, clean, send, forward } from './_lib.js';

export default async function handler(req, res) {
  if (guard(req, res, 2000)) return;
  const message = clean(req.body?.message, 200);
  const sessionId = clean(req.body?.sessionId, 40).replace(/[^a-z0-9]/gi, '');
  if (!message || !sessionId) return send(res, 422, { ok: false, code: 'invalid' });

  const url = process.env.N8N_ASISTENTE_WEBHOOK_URL;
  if (!url) return send(res, 503, { ok: false, code: 'not_configured' });

  try {
    const r = await forward(url, { message, sessionId, origen: 'web-demo' });
    const data = await r.json().catch(() => ({}));
    return send(res, 200, { ok: true, reply: clean(data.reply, 1200) });
  } catch (e) {
    console.error('asistente: fallo al consultar n8n', e.message);
    return send(res, 502, { ok: false, code: 'upstream' });
  }
}
