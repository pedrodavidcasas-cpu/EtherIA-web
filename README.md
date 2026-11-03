# Web de EtherIA — www.etheriatech.com

Sitio estático multipágina, sin frameworks ni dependencias, desplegado en Vercel desde GitHub.

## Estructura

```
src/                 Contenido y plantillas (fuente de verdad)
  config.mjs         Teléfono, correo, redes, iconos
  solutions.mjs      Las 6 soluciones (+ estado de cada capacidad)
  cases.mjs          Proyectos y casos reales (+ diagramas de los flujos en n8n)
  founder.mjs        Foto y biografía del fundador (sección "Conoce a la persona detrás de EtherIA")
  layout.mjs         <head>, cabecera, pie, SEO y datos estructurados
  pages/             Inicio, soluciones, proyectos, precios, diagnóstico, privacidad, 404
scripts/
  generar.mjs        Genera los HTML, sitemap.xml, robots.txt y el manifest
  verificar.mjs      Comprueba enlaces, SEO, JSON-LD, CSP, accesibilidad básica y secretos
assets/              CSS, JS e imágenes optimizadas (WebP/PNG)
api/                 Funciones serverless de Vercel (diagnóstico y asistente → n8n)
vercel.json          URLs limpias y cabeceras de seguridad (CSP estricta)
```

Los `.html` de la raíz, `soluciones/`, `proyectos/` y `privacidad/` **se generan**: no los edites a mano.

## Cómo hacer cambios

```bash
# 1. Edita el contenido en src/ (o estilos en assets/css, comportamiento en assets/js)
npm run generar     # 2. Regenera las páginas
npm run verificar   # 3. Debe terminar en "✓ Verificación correcta"
```

Requiere Node 20 o superior. No hay `npm install` porque no hay dependencias.

**CSP:** el sitio no permite scripts ni estilos en línea. No uses atributos `style="..."` ni `<script>` en línea; `verificar` lo detecta.

## Integraciones con n8n

### Diagnóstico (`/api/diagnostico`) — listo para conectar

El formulario está en la página `/diagnostico` (`src/pages/diagnostico.mjs`, lógica en `assets/js/diagnostico.js`). Los enlaces antiguos a `/#diagnostico` redirigen ahí (`assets/js/site.js`).

1. En n8n, crea un flujo con un nodo **Webhook** (POST) y copia la URL de producción.
2. En el webhook, comprueba que la cabecera `X-EtherIA-Secret` coincida con tu secreto y rechaza la petición si no coincide.
3. En Vercel → Settings → Environment Variables (Production y Preview):
   - `N8N_DIAGNOSTICO_WEBHOOK_URL` = URL del webhook
   - `N8N_WEBHOOK_SECRET` = una cadena larga y aleatoria
4. Vuelve a desplegar.

Mientras no esté configurado, el endpoint responde `503` y la web ofrece enviar la solicitud por WhatsApp con un mensaje ya redactado con las respuestas.

JSON que recibe n8n:

```json
{
  "negocio": "Spa en Escazú",
  "dificultad": ["mensajes", "redes"],
  "detalle": "",
  "tareas": ["responder", "citas"],
  "herramientas": ["Instagram / Facebook"],
  "mejorar": "Responder más rápido",
  "preferencia": "WhatsApp",
  "nombre": "Ana",
  "contacto": "+506 8888 8888",
  "orientacion": ["recepcionista-ia", "redes-sociales-ia"],
  "origen": "web-diagnostico",
  "recibido": "2026-10-30T14:28:15.610Z"
}
```

Sugerencia de flujo: Webhook → verificar secreto → Google Sheets (registrar) → Telegram (avisar al responsable).

### Asistente de la demo (`/api/asistente`) — preparado, desactivado

La demo usa respuestas preparadas. Para conectarla a un flujo real:

1. Configura `N8N_ASISTENTE_WEBHOOK_URL` (y el mismo `N8N_WEBHOOK_SECRET`).
2. El flujo debe responder `{ "reply": "texto" }`, usando **solo datos ficticios o autorizados**.
3. En `src/pages/home.mjs`, añade `data-endpoint="/api/asistente"` al elemento `[data-chat]` y regenera.

### Protecciones de los endpoints

- Solo `POST` con `application/json` y origen del propio dominio.
- Tamaño máximo del cuerpo, campos con longitud limitada y listas cerradas de valores.
- Honeypot y tiempo mínimo de llenado contra bots.
- Límite de 5 envíos cada 10 minutos por IP, **por instancia**. Para un límite global, activa reglas de rate limiting en Vercel Firewall.
- Las URL de los webhooks y el secreto nunca están en el código.

## Pendientes (requieren información o materiales de EtherIA)

- [ ] **Confirmar el estado de cada capacidad** en `src/solutions.mjs` (`dev`, `test` o `custom`) y en `src/cases.mjs` (`built`, `testing`, `status`).
- [ ] **Autorización de Hands & Paradise Spa** para mostrar su sitio y su automatización como casos.
- [x] Diagramas de los flujos de Kael, del gestor de redes del spa y del gestor de productos (`diagram` en `src/cases.mjs`).
- [ ] Diagrama o capturas del flujo de gestión de oportunidades, sin la parte de captación masiva por WhatsApp.
- [ ] La biografía menciona la edad (29 años): actualizarla cada año en `src/founder.mjs` o quitarla.
- [ ] **Ejemplos antes/después autorizados** para el gestor de contenido de productos.
- [ ] Correo profesional (por ejemplo `hola@etheriatech.com`) en lugar del Gmail, en `src/config.mjs`.
- [ ] Configurar las variables de entorno de n8n en Vercel.
- [ ] Si se añade analítica, actualizar la política de privacidad y la CSP (`connect-src`, `script-src`).
- [ ] Dar de alta el sitio y el sitemap en Google Search Console y crear o completar el Perfil de Empresa de Google.
