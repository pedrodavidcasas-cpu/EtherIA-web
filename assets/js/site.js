// Comportamiento común: menú móvil, cabecera al hacer scroll, apariciones suaves y año del pie.
(() => {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');

  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.sr-only').textContent = open ? 'Cerrar menú' : 'Abrir menú';
    menu.classList.toggle('is-open', open);
  };
  if (toggle && menu) {
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
    });
  }

  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Solo se ocultan los elementos que todavía no están en pantalla, así no hay parpadeo al cargar.
  const items = [...document.querySelectorAll('.reveal')];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('reveal-in');
        entry.target.classList.remove('reveal-pending');
        io.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -8% 0px' });
    const vh = window.innerHeight;
    for (const el of items) {
      if (el.getBoundingClientRect().top > vh) { el.classList.add('reveal-pending'); io.observe(el); }
    }
  }

  // El botón flotante de WhatsApp se aparta cuando hay controles debajo (demos, formulario, pie).
  const float = document.querySelector('.wa-float');
  const blockers = document.querySelectorAll('.demo-shell, .diag-card, .site-footer');
  if (float && blockers.length && 'IntersectionObserver' in window) {
    const visible = new Set();
    const fo = new IntersectionObserver((entries) => {
      for (const e of entries) e.isIntersecting ? visible.add(e.target) : visible.delete(e.target);
      float.classList.toggle('is-hidden', visible.size > 0);
    });
    blockers.forEach((b) => fo.observe(b));
  }

  // Enlaces a WhatsApp: se abren en una pestaña nueva y, si el navegador la bloquea, en la misma pestaña.
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="https://wa.me/"]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    const w = window.open(a.href, '_blank');
    if (w) w.opener = null;
    else window.location.href = a.href;
  });

  for (const el of document.querySelectorAll('[data-year]')) el.textContent = new Date().getFullYear();
})();
