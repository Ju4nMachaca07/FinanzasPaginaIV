// =========================
// MENÚ MÓVIL
// =========================
(() => {
  const btn = document.getElementById("navToggle");
  const nav = document.getElementById("navMenu");
  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    nav.classList.toggle("is-open");
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => nav.classList.remove("is-open"));
  });
})();

// =========================
// TABS DE SERVICIOS
// =========================
(() => {
  const root = document.querySelector("[data-tabs]");
  if (!root) return;

  const buttons = root.querySelectorAll(".tab-btn");
  const panels = root.querySelectorAll(".tab-panel");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;

      buttons.forEach(b => {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");

      panels.forEach(panel => {
        const active = panel.id === target;
        panel.classList.toggle("is-active", active);
        panel.hidden = !active;
      });
    });
  });
})();

// =========================
// FAQ POR CATEGORÍAS (TABS)
// =========================
(() => {
  const root = document.querySelector("[data-faq-tabs]");
  if (!root) return;

  const cats = root.querySelectorAll(".faq-cat");
  const panes = root.querySelectorAll(".faq-pane");

  cats.forEach(cat => {
    cat.addEventListener("click", () => {
      const target = cat.dataset.faqCat;

      cats.forEach(c => c.classList.remove("is-active"));
      cat.classList.add("is-active");

      panes.forEach(pane => {
        const active = pane.id === target;
        pane.classList.toggle("is-active", active);
        pane.hidden = !active;
      });
    });
  });
})();

// =========================
// TESTIMONIOS FADE (NO SLIDER HORIZONTAL)
// =========================
(() => {
  const root = document.getElementById("fadeTestimonials");
  if (!root) return;

  const cards = Array.from(root.querySelectorAll(".fade-card"));
  const dotsWrap = document.getElementById("fadeDots");
  const prevBtn = document.getElementById("prevFade");
  const nextBtn = document.getElementById("nextFade");

  let index = 0;
  let timer;

  function renderDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";
    cards.forEach((_, i) => {
      const dot = document.createElement("button");
      if (i === index) dot.classList.add("is-active");
      dot.addEventListener("click", () => {
        index = i;
        update();
        restart();
      });
      dotsWrap.appendChild(dot);
    });
  }

  function update() {
    cards.forEach((card, i) => {
      card.classList.toggle("is-active", i === index);
    });
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, i) => {
        dot.classList.toggle("is-active", i === index);
      });
    }
  }

  function next() {
    index = (index + 1) % cards.length;
    update();
  }

  function prev() {
    index = (index - 1 + cards.length) % cards.length;
    update();
  }

  function start() {
    stop();
    timer = setInterval(next, 5000);
  }

  function stop() {
    if (timer) clearInterval(timer);
  }

  function restart() {
    start();
  }

  prevBtn?.addEventListener("click", () => { prev(); restart(); });
  nextBtn?.addEventListener("click", () => { next(); restart(); });

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);

  renderDots();
  update();
  start();
})();

// =========================
// TICKER LOGOS CONTINUO
// Duplica items para loop visual más fluido
// =========================
(() => {
  const track = document.getElementById("logosTicker");
  if (!track) return;

  // Evita duplicar más de una vez
  if (track.dataset.cloned === "true") return;

  const items = Array.from(track.children);
  items.forEach(item => {
    const clone = item.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  });

  track.dataset.cloned = "true";
})();