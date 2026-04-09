/* ═══════════════════════════════════════════════════
   JOSEPH HACCANDY — PORTFOLIO JS v3
   Carousel · Flip · Dots nav · Parallax mouse · Magnetic
   ═══════════════════════════════════════════════════ */

/* ── SCROLL PROGRESS ── */
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
  progressBar.style.width = pct + '%';
}, { passive: true });

/* ── NAV scrolled ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── REVEAL ── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── HERO stagger ── */
window.addEventListener('load', () => {
  document.querySelectorAll('#hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + i * 130);
  });
});

/* ── SKILLS CAROUSEL ── */
const skillsCarousel = document.getElementById('skills-carousel');
const skillsFill = document.getElementById('skills-fill');
if (skillsCarousel) {
  let skDown = false, skStartX = 0, skScrollLeft = 0;
  const updateSkFill = () => {
    const max = skillsCarousel.scrollWidth - skillsCarousel.clientWidth;
    if (skillsFill) skillsFill.style.width = (max > 0 ? (skillsCarousel.scrollLeft / max) * 100 : 0) + '%';
  };
  skillsCarousel.addEventListener('mousedown', e => {
    skDown = true; skillsCarousel.classList.add('grabbing');
    skStartX = e.pageX - skillsCarousel.offsetLeft;
    skScrollLeft = skillsCarousel.scrollLeft; e.preventDefault();
  });
  window.addEventListener('mouseup', () => { skDown = false; skillsCarousel.classList.remove('grabbing'); });
  skillsCarousel.addEventListener('mousemove', e => {
    if (!skDown) return;
    skillsCarousel.scrollLeft = skScrollLeft - (e.pageX - skillsCarousel.offsetLeft - skStartX) * 1.8;
    updateSkFill();
  });
  let skTx0 = 0, skSl0 = 0;
  skillsCarousel.addEventListener('touchstart', e => { skTx0 = e.touches[0].clientX; skSl0 = skillsCarousel.scrollLeft; }, { passive: true });
  skillsCarousel.addEventListener('touchmove', e => { skillsCarousel.scrollLeft = skSl0 - (e.touches[0].clientX - skTx0); updateSkFill(); }, { passive: true });
  skillsCarousel.addEventListener('scroll', updateSkFill, { passive: true });
}

/* ── COUNTER ── */
function animCount(el, target) {
  let s = 0;
  const step = ts => {
    if (!s) s = ts;
    const p = Math.min((ts - s) / 1600, 1);
    el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target) + (el.dataset.suffix || '');
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const statObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const val = parseFloat(e.target.textContent.replace(/\D/g, ''));
      e.target.dataset.suffix = e.target.textContent.includes('+') ? '+' : '';
      if (!isNaN(val)) animCount(e.target, val);
      statObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(el => statObs.observe(el));

/* ── ACTIVE NAV + CHAPTER DOTS ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const dots = document.querySelectorAll('.cdot');

const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      navLinks.forEach(a => a.style.color = a.getAttribute('href') === '#' + id ? 'var(--gold-bright)' : '');
      dots.forEach(d => d.classList.toggle('active', d.getAttribute('href') === '#' + id));
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObs.observe(s));

/* ══════════════════════════════════════════════════
   CURSOR GLOW — or chaud
══════════════════════════════════════════════════ */
if (window.matchMedia('(hover: hover)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `position:fixed;pointer-events:none;z-index:9999;
    width:380px;height:380px;border-radius:50%;
    background:radial-gradient(circle,rgba(201,168,76,.065) 0%,transparent 70%);
    transform:translate(-50%,-50%);top:0;left:0;`;
  document.body.appendChild(glow);
  let tx = 0, ty = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
  (function loop() {
    cx += (tx - cx) * 0.07; cy += (ty - cy) * 0.07;
    glow.style.left = cx + 'px'; glow.style.top = cy + 'px';
    requestAnimationFrame(loop);
  })();
}

/* ══════════════════════════════════════════════════
   MOUSE PARALLAX sur le hero
══════════════════════════════════════════════════ */
const heroSection  = document.getElementById('hero');
const portraitFrame = document.getElementById('portrait-frame');
const heroVisual   = document.getElementById('hero-visual');
const badges = document.querySelectorAll('.float-badge');

if (heroSection && portraitFrame) {
  heroSection.addEventListener('mousemove', e => {
    const r = heroSection.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    portraitFrame.style.transform = `translate(${x * 22}px, ${y * 12}px)`;
    badges.forEach((b, i) => {
      const f = ((i % 2 === 0) ? 1 : -1) * (i + 1) * 0.35;
      b.style.transform = `translate(${x * 14 * f}px, ${y * 9 * f}px)`;
    });
  });
  heroSection.addEventListener('mouseleave', () => {
    portraitFrame.style.transform = '';
    badges.forEach(b => b.style.transform = '');
  });
}

/* ══════════════════════════════════════════════════
   MAGNETIC BUTTONS
══════════════════════════════════════════════════ */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    btn.style.transform = `translate(${(e.clientX - r.left - r.width/2) * .18}px, ${(e.clientY - r.top - r.height/2) * .18}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1)';
    btn.style.transform = '';
    setTimeout(() => btn.style.transition = '', 510);
  });
  btn.addEventListener('mouseenter', () => btn.style.transition = 'transform 0.1s ease');
});

/* ══════════════════════════════════════════════════
   CAROUSEL HORIZONTAL — Draggable
══════════════════════════════════════════════════ */
const carousel = document.getElementById('loisirs-carousel');
const carouselFill = document.getElementById('carousel-fill');

if (carousel) {
  let isDown = false, startX = 0, scrollLeft = 0;

  const updateFill = () => {
    const max = carousel.scrollWidth - carousel.clientWidth;
    const pct = max > 0 ? (carousel.scrollLeft / max) * 100 : 0;
    if (carouselFill) carouselFill.style.width = pct + '%';
  };

  carousel.addEventListener('mousedown', e => {
    isDown = true; carousel.classList.add('grabbing');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    e.preventDefault();
  });
  window.addEventListener('mouseup', () => { isDown = false; carousel.classList.remove('grabbing'); });
  carousel.addEventListener('mousemove', e => {
    if (!isDown) return;
    carousel.scrollLeft = scrollLeft - (e.pageX - carousel.offsetLeft - startX) * 1.8;
    updateFill();
  });

  // Touch
  let tx0 = 0, sl0 = 0;
  carousel.addEventListener('touchstart', e => { tx0 = e.touches[0].clientX; sl0 = carousel.scrollLeft; }, { passive: true });
  carousel.addEventListener('touchmove',  e => { carousel.scrollLeft = sl0 - (e.touches[0].clientX - tx0); updateFill(); }, { passive: true });
  carousel.addEventListener('scroll', updateFill, { passive: true });

  // Hover tilt sur chaque carte
  carousel.querySelectorAll('.lcard').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `translateY(-14px) scale(1.03) perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // Reflet dynamique au survol
  carousel.querySelectorAll('.lcard').forEach(card => {
    const top = card.querySelector('.lcard-top');
    const shine = card.querySelector('.lcard-shine');
    if (!top || !shine) return;
    card.addEventListener('mousemove', e => {
      const r = top.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  * 100).toFixed(1);
      const y = ((e.clientY - r.top)  / r.height * 100).toFixed(1);
      shine.style.background = `radial-gradient(ellipse at ${x}% ${y}%, rgba(255,255,255,.22) 0%, transparent 60%)`;
    });
    card.addEventListener('mouseleave', () => {
      shine.style.background = '';
    });
  });
}

/* ══════════════════════════════════════════════════
   TEXT SCRAMBLE sur le nom hero
══════════════════════════════════════════════════ */
class Scramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>—_\\/[]{}=+*^?#@§';
    this.update = this.update.bind(this);
  }
  set(text) {
    const old = this.el.innerText;
    const len = Math.max(old.length, text.length);
    this.resolve && this.resolve();
    const p = new Promise(r => this.resolve = r);
    this.queue = Array.from({ length: len }, (_, i) => ({
      from: old[i] || '', to: text[i] || '',
      start: Math.floor(Math.random() * 10),
      end: Math.floor(Math.random() * 10) + 12, char: ''
    }));
    cancelAnimationFrame(this.req);
    this.frame = 0; this.update();
    return p;
  }
  update() {
    let out = '', done = 0;
    this.queue.forEach(q => {
      if (this.frame >= q.end) { done++; out += q.to; }
      else if (this.frame >= q.start) {
        if (!q.char || Math.random() < .28) q.char = this.chars[Math.floor(Math.random() * this.chars.length)];
        out += `<span style="color:var(--gold-dim)">${q.char}</span>`;
      } else { out += q.from; }
    });
    this.el.innerHTML = out;
    if (done === this.queue.length) this.resolve();
    else { this.req = requestAnimationFrame(this.update); this.frame++; }
  }
}

const scrambleEl = document.getElementById('scramble-target');
if (scrambleEl) {
  const fx = new Scramble(scrambleEl);
  const orig = scrambleEl.innerText;
  let busy = false;
  document.getElementById('hero').addEventListener('mouseenter', () => {
    if (!busy) { busy = true; fx.set(orig).then(() => busy = false); }
  });
}

/* ══════════════════════════════════════════════════
   CONTACT items stagger
══════════════════════════════════════════════════ */
const cItems = document.querySelectorAll('.contact-item');
const cObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    cItems.forEach((item, i) => setTimeout(() => {
      item.style.opacity = '1'; item.style.transform = 'translateX(0)';
    }, i * 90));
    cObs.disconnect();
  }
}, { threshold: 0.2 });
cItems.forEach(item => {
  item.style.opacity = '0'; item.style.transform = 'translateX(-18px)';
  item.style.transition = 'opacity .5s ease, transform .5s ease';
});
if (cItems.length) cObs.observe(cItems[0]);

/* ══════════════════════════════════════════════════
   SOFT TAGS : bounce au hover
══════════════════════════════════════════════════ */
document.querySelectorAll('.soft-tag').forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    tag.style.transition = 'all .15s cubic-bezier(.34,1.56,.64,1)';
  });
  tag.addEventListener('mouseleave', () => {
    tag.style.transition = 'all .35s ease';
  });
});
