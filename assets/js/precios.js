// Calculadora de inversión de /precios. Todo se calcula en el navegador: no se envía nada a ningún servidor.
// Básica = mínimo del rango, intermedia = punto medio redondeado a ₡5.000, avanzada = máximo.
(() => {
  const calc = document.querySelector('[data-calc]');
  if (!calc) return;
  const $ = (sel) => calc.querySelector(sel);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const crc = (n) => '₡' + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const range = (s) => s.split('-').map(Number);
  const pick = ([min, max], level) =>
    level === 'basica' ? min : level === 'avanzada' ? max : Math.round((min + max) / 2 / 5000) * 5000;

  const implEl = $('[data-calc-impl]');
  const monthlyEl = $('[data-calc-monthly]');
  const summary = $('[data-calc-summary]');
  const live = $('[data-calc-live]');
  const cta = $('[data-calc-cta]');
  const shown = new Map([[implEl, 0], [monthlyEl, 0]]);

  // Animación breve del número; con movimiento reducido se muestra directamente.
  const tween = (el, to) => {
    const from = shown.get(el);
    shown.set(el, to);
    if (reduce || from === to) { el.textContent = crc(to); return; }
    el.classList.remove('is-changing');
    void el.offsetWidth;
    el.classList.add('is-changing');
    const start = performance.now();
    const step = (t) => {
      if (shown.get(el) !== to) return;
      const k = Math.min(1, (t - start) / 450);
      const ease = 1 - Math.pow(1 - k, 3);
      el.textContent = crc(Math.round((from + (to - from) * ease) / 500) * 500);
      if (k < 1) requestAnimationFrame(step);
      else el.textContent = crc(to);
    };
    requestAnimationFrame(step);
  };

  const update = (animate = true) => {
    const plan = $('input[name="calc-plan"]:checked');
    const level = $('input[name="calc-level"]:checked');
    const name = plan.dataset.name;
    const label = level.dataset.label;
    const impl = pick(range(plan.dataset.impl), level.value);
    const monthly = pick(range(plan.dataset.monthly), level.value);
    if (animate) { tween(implEl, impl); tween(monthlyEl, monthly); }
    else { shown.set(implEl, impl); shown.set(monthlyEl, monthly); }
    summary.textContent = `${name} · ${label}`;
    live.textContent = `Estimación para ${name}, complejidad ${label.toLowerCase()}: implementación ${crc(impl)} y mensualidad ${crc(monthly)}.`;
    const text = `Hola, usé la calculadora de precios de su web. Me interesa "${name}" con complejidad ${label.toLowerCase()}. Estimación: implementación ${crc(impl)} y ${crc(monthly)}/mes. Quisiera una cotización personalizada.`;
    cta.href = cta.href.split('?')[0] + '?text=' + encodeURIComponent(text);
  };

  calc.addEventListener('change', (e) => { if (e.target.matches('input[type="radio"]')) update(); });
  update(false);
})();
