// Scroll progress + nav state
(function () {
  const fill = document.getElementById('progress');
  const nav = document.getElementById('top-bar');
  function on() {
    const sc = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    fill.style.width = (max > 0 ? (sc / max) * 100 : 0) + '%';
    nav.classList.toggle('is-scrolled', sc > 24);
  }
  window.addEventListener('scroll', on, { passive: true });
  on();
})();

// Reveal on scroll
(function () {
  const els = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  els.forEach(el => io.observe(el));
})();

// Counters
(function () {
  const els = document.querySelectorAll('[data-counter]');
  const animate = (el) => {
    const to = parseFloat(el.dataset.to);
    const dec = parseInt(el.dataset.decimals || '0', 10);
    const suf = el.dataset.suffix || '';
    const dur = 1400;
    const t0 = performance.now();
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - k, 3);
      const v = to * e;
      el.textContent = (dec ? v.toFixed(dec) : Math.round(v)) + suf;
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); }
  }), { threshold: 0.4 });
  els.forEach(el => io.observe(el));
})();

// Smooth-scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) { e.preventDefault(); window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: 'smooth' }); }
    }
  });
});
