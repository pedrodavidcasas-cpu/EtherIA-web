// Utilidades compartidas por las funciones serverless. Los archivos que empiezan por "_" no se publican como rutas.

const ALLOWED_HOSTS = new Set(['www.etheriatech.com', 'etheriatech.com']);
const hits = new Map();

// Solo acepta peticiones desde el propio sitio (o una vista previa de Vercel de este proyecto).
export function originAllowed(req) {
  const origin = req.headers.origin || '';
  if (!origin) return false;
  try {
    const { host, protocol } = new URL(origin);
    const local = host === 'localhost:3000' && process.env.VERCEL_ENV !== 'production';
    if (protocol !== 'https:' && !local) return false;
    if (ALLOWED_HOSTS.has(host) || local) return true;
    return Boolean(process.env.VERCEL_URL) && host === process.env.VERCEL_URL;
  } catch {
    return false;
  }
}

// Límite básico por IP dentro de cada instancia. Para un límite global, usar Vercel Firewall o un almacén compartido.
export function rateLimited(req, max = 5, windowMs = 10 * 60 * 1000) {
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'desconocida';
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > max;
}

// Normaliza texto: quita caracteres de control y recorta a la longitud máxima.
export function clean(value, max) {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max);
}

export function cleanList(value, allowed) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((v) => typeof v === 'string' && allowed.includes(v)))];
}

export function send(res, status, body) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(status).json(body);
}

// Reenvía los datos a un webhook de n8n con un secreto compartido para que n8n pueda verificar el origen.
export async function forward(url, payload) {
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-EtherIA-Secret': process.env.N8N_WEBHOOK_SECRET || '' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(8000),
  });
  if (!r.ok) throw new Error(`n8n respondió ${r.status}`);
  return r;
}

// Comprobaciones comunes a cualquier endpoint público. Devuelve true si la petición ya fue respondida.
export function guard(req, res, maxBytes) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    send(res, 405, { ok: false, code: 'method_not_allowed' });
    return true;
  }
  if (!String(req.headers['content-type'] || '').startsWith('application/json')) {
    send(res, 415, { ok: false, code: 'unsupported_media_type' });
    return true;
  }
  if (!originAllowed(req)) {
    send(res, 403, { ok: false, code: 'forbidden' });
    return true;
  }
  if (Number(req.headers['content-length'] || 0) > maxBytes || JSON.stringify(req.body || {}).length > maxBytes) {
    send(res, 413, { ok: false, code: 'too_large' });
    return true;
  }
  if (rateLimited(req)) {
    send(res, 429, { ok: false, code: 'rate_limited' });
    return true;
  }
  return false;
}
