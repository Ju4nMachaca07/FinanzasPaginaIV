/* ====================================================
   AUREN CAPITAL DESK — script.js
==================================================== */

// ── MENÚ MÓVIL ──────────────────────────────────────
(() => {
  const btn = document.getElementById('navToggle');
  const nav = document.getElementById('navMenu');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    nav.classList.toggle('is-open');
    btn.classList.toggle('is-open');
  });

  nav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      btn.classList.remove('is-open');
    })
  );
})();

// ── HEADER SCROLL ───────────────────────────────────
(() => {
  const header = document.getElementById('header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ── SCROLL ANIMATIONS (Intersection Observer) ───────
(() => {
  const els = document.querySelectorAll('[data-anim]');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
})();

// ── TABS SERVICIOS ───────────────────────────────────
(() => {
  const root = document.querySelector('[data-tabs]');
  if (!root) return;

  const btns   = root.querySelectorAll('.tab-btn');
  const panels = root.querySelectorAll('.tab-pane');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      btns.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      panels.forEach(p => {
        const active = p.id === target;
        p.classList.toggle('is-active', active);
        p.hidden = !active;
      });
    });
  });
})();

// ── TESTIMONIOS FADE ─────────────────────────────────
(() => {
  const root    = document.getElementById('fadeTestimonials');
  if (!root) return;

  const cards    = Array.from(root.querySelectorAll('.testi-card'));
  const dotsWrap = document.getElementById('fadeDots');
  const prevBtn  = document.getElementById('prevFade');
  const nextBtn  = document.getElementById('nextFade');

  let index = 0;
  let timer;

  function renderDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    cards.forEach((_, i) => {
      const d = document.createElement('button');
      d.setAttribute('aria-label', `Testimonio ${i + 1}`);
      if (i === index) d.classList.add('is-active');
      d.addEventListener('click', () => { index = i; update(); restart(); });
      dotsWrap.appendChild(d);
    });
  }

  function update() {
    cards.forEach((c, i) => c.classList.toggle('is-active', i === index));
    if (dotsWrap)
      [...dotsWrap.children].forEach((d, i) => d.classList.toggle('is-active', i === index));
  }

  function next() { index = (index + 1) % cards.length; update(); }
  function prev() { index = (index - 1 + cards.length) % cards.length; update(); }

  function start()   { stop(); timer = setInterval(next, 5000); }
  function stop()    { clearInterval(timer); }
  function restart() { start(); }

  prevBtn?.addEventListener('click', () => { prev(); restart(); });
  nextBtn?.addEventListener('click', () => { next(); restart(); });

  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);

  renderDots();
  update();
  start();
})();

// ── TICKER — duplicado para loop continuo ────────────
(() => {
  const track = document.getElementById('logosTicker');
  if (!track || track.dataset.cloned === 'true') return;

  Array.from(track.children).forEach(item => {
    const clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  track.dataset.cloned = 'true';
})();