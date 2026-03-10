/* ═══════════════════════════════════════════════════
   JOSEPH HACCANDY — PORTFOLIO JS
   ═══════════════════════════════════════════════════ */

/* ── NAV scroll ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── REVEAL on scroll ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── SKILL BARS animation ── */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const pct = bar.dataset.pct;
      const fill = bar.querySelector('.sb-fill');
      if (fill) {
        setTimeout(() => { fill.style.width = pct + '%'; }, 200);
      }
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-bar').forEach(bar => barObserver.observe(bar));

/* ── SMOOTH active nav link ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + id
          ? 'var(--blue-bright)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ── COUNTER animation for stats ── */
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const isDecimal = String(target).includes('.');
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = isDecimal
      ? (ease * target).toFixed(1)
      : Math.floor(ease * target);
    el.textContent = current + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const num = entry.target;
      const rawText = num.textContent.replace('+', '').replace('%', '');
      const val = parseFloat(rawText);
      num.dataset.suffix = num.textContent.includes('+') ? '+' : '';
      if (!isNaN(val)) animateCounter(num, val);
      statObserver.unobserve(num);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => statObserver.observe(el));

/* ── HERO text stagger ── */
window.addEventListener('load', () => {
  document.querySelectorAll('#hero .reveal').forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 150 + i * 120);
  });
});

/* ── CURSOR glow (desktop only) ── */
if (window.matchMedia('(hover: hover)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed;pointer-events:none;z-index:9999;
    width:300px;height:300px;border-radius:50%;
    background:radial-gradient(circle,rgba(77,168,218,.06) 0%,transparent 70%);
    transform:translate(-50%,-50%);
    transition:opacity .3s;
    top:0;left:0;
  `;
  document.body.appendChild(glow);
  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    glow.style.left = mx + 'px';
    glow.style.top  = my + 'px';
  });
}
