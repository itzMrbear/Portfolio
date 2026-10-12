/* ===========================
   1. SCROLL PROGRESS BAR
=========================== */
const progress = document.querySelector('.progress');
const updateProgress = () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progress.style.width = scrolled + '%';
};
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

/* ===========================
   2. CURSOR GLOW
=========================== */
const glow = document.querySelector('.cursor-glow');
let gx = window.innerWidth / 2, gy = window.innerHeight / 2;
let cx = gx, cy = gy;

window.addEventListener('mousemove', (e) => {
  gx = e.clientX;
  gy = e.clientY;
});

const animateGlow = () => {
  cx += (gx - cx) * 0.12;
  cy += (gy - cy) * 0.12;
  glow.style.left = cx + 'px';
  glow.style.top = cy + 'px';
  requestAnimationFrame(animateGlow);
};
if (window.matchMedia('(pointer: fine)').matches) animateGlow();

/* ===========================
   3. SCROLL REVEAL
=========================== */
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

/* ===========================
   4. MAGNETIC NAV LINKS
=========================== */
document.querySelectorAll('.magnetic').forEach((el) => {
  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
  });
});

/* ===========================
   5. TILT + SPOTLIGHT SKILL CARDS
=========================== */
document.querySelectorAll('.tilt').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    const rotX = (py - 0.5) * -10;
    const rotY = (px - 0.5) * 10;

    card.style.transform =
      `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px) scale(1.02)`;

    card.style.setProperty('--mx', px * 100 + '%');
    card.style.setProperty('--my', py * 100 + '%');
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ===========================
   6. TEXT SCRAMBLE ON "CODER"
=========================== */
const scrambleEl = document.getElementById('maincon');
const finalText = scrambleEl.dataset.scramble || scrambleEl.textContent;
const glyphs = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let frame = 0;
const totalFrames = 45;

function scramble() {
  const progressRatio = frame / totalFrames;
  let out = '';
  for (let i = 0; i < finalText.length; i++) {
    if (i < finalText.length * progressRatio) {
      out += finalText[i];
    } else {
      out += glyphs[Math.floor(Math.random() * glyphs.length)];
    }
  }
  scrambleEl.textContent = out;
  frame++;
  if (frame <= totalFrames) requestAnimationFrame(scramble);
  else scrambleEl.textContent = finalText;
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion) setTimeout(scramble, 350);