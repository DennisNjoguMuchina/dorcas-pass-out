/* ========================================
   DORCAS PASS OUT PARADE — LOVE PAGE
   Interactive Features — script.js v2
   ========================================
   Componentized: one function per feature.
   No external dependencies.
   ======================================== */

'use strict';

/* ──────────────────────────────────────
   DATA — Edit these to personalize!
   ────────────────────────────────────── */

// ============================================
// LOVE LIST — Loving, Point-Form & Emojis
// ============================================
const LOVE_LIST = [
  {
    color: '#E85C6B',
    title: '🎖️ Your Discipline & Unstoppable Strength',
    detail: 'Watching you push through military training with grace and power has filled my heart with so much pride. You set your mind to something and you achieve it — officially my hero and my KDF soldier! ❤️'
  },
  {
    color: '#FF69B4',
    title: '💛 You Are So Incredibly Caring',
    detail: 'The genuine warmth and kindness you show to me and everyone around you is unmatched. You have the softest, most loving heart. 🌸'
  },
  {
    color: '#D9A24C',
    title: '✨ You Are So Fun to Hang Out With',
    detail: 'Every single moment spent with you is filled with real laughter, good vibes, and pure happiness. Time with you is always the absolute best part of my day! 🥳'
  },
  {
    color: '#F4744F',
    title: '🤗 Your Understanding Nature',
    detail: 'You listen without judgment, you truly get me, and you\'re always there with patience and comfort whenever I need you. Having you in my corner means everything. 🤝'
  },
  {
    color: '#E85C6B',
    title: '🔥 How You\'re Not Afraid to Be Yourself',
    detail: 'Your confidence, your authenticity, and how real you stay no matter what environment you\'re in — I admire that so deeply about you. You shine so brightly! 🌟'
  },
  {
    color: '#FF85C1',
    title: '👑 Your Resilient Spirit & Winning Energy',
    detail: 'Even when times get tough or training gets intense, your spirit never breaks. This Pass Out Parade is just the beginning of your rising through the ranks! 🏆'
  }
];

// ============================================
// SONGS — YouTube Covers & Real Titles
// ============================================
const SONGS = [
  {
    title: 'mwendwa wakwa wee 🎵🎶✨',
    artist: 'Sacred Word Audio',
    id: 'erX73Xjos0E',
    thumbnail: 'https://img.youtube.com/vi/erX73Xjos0E/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=erX73Xjos0E'
  },
  {
    title: 'Bien - Chikwere',
    artist: 'Bien Official',
    id: '0Aqz15wJKkg',
    thumbnail: 'https://img.youtube.com/vi/0Aqz15wJKkg/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=0Aqz15wJKkg'
  },
  {
    title: 'Loise Kim - NATHANIEL',
    artist: 'Loise Kim Official',
    id: 'Vn1WZKbDeXU',
    thumbnail: 'https://img.youtube.com/vi/Vn1WZKbDeXU/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=Vn1WZKbDeXU'
  },
  {
    title: 'Ed Sheeran - Perfect',
    artist: 'Ed Sheeran',
    id: '2Vv-BfVoq4g',
    thumbnail: 'https://img.youtube.com/vi/2Vv-BfVoq4g/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g'
  }
];


/* ──────────────────────────────────────
   UTILITY
   ────────────────────────────────────── */
const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;


/* ══════════════════════════════════════
   1. SCROLL PROGRESS BAR
   ══════════════════════════════════════ */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress-bar');
  if (!bar) return;
  function update() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}


/* ══════════════════════════════════════
   2. SCROLL REVEAL
   ══════════════════════════════════════ */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-scale');
  if (!els.length) return;
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
  );
  els.forEach((el) => observer.observe(el));
}


/* ══════════════════════════════════════
   3. HERO SCROLL BUTTON
   ══════════════════════════════════════ */
function initHeroScroll() {
  const btn = document.getElementById('hero-scroll-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const target = document.getElementById('scratch-section');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
}


/* ══════════════════════════════════════
   4. FLOATING HEARTS — Bigger, more transparent
   ══════════════════════════════════════ */
function initFloatingHearts() {
  if (prefersReducedMotion()) return;

  const container = document.getElementById('floating-hearts');
  if (!container) return;

  const HEART_COUNT = 18;
  const colors = ['#D9A24C', '#E85C6B', '#F4744F', '#EFC97D', '#F2A65A', '#FF69B4'];

  function createHeart() {
    const heart = document.createElement('div');
    const size = 14 + Math.random() * 28; // bigger: 14–42px
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const duration = 8 + Math.random() * 14;
    const delay = Math.random() * duration;
    const opacity = 0.08 + Math.random() * 0.18; // more transparent

    // Randomly choose heart or star shape
    const isHeart = Math.random() > 0.35;

    heart.style.cssText = `
      position: absolute;
      left: ${left}%;
      top: -${size + 10}px;
      width: ${size}px;
      height: ${size}px;
      opacity: ${opacity};
      animation: floatDown ${duration}s linear ${delay}s infinite;
      pointer-events: none;
    `;

    if (isHeart) {
      heart.innerHTML = `<svg viewBox="0 0 24 24" width="${size}" height="${size}">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
        2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09
        3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4
        6.86-8.55 11.54L12 21.35z" fill="${color}"/>
      </svg>`;
    } else {
      // 5-point star
      heart.innerHTML = `<svg viewBox="0 0 24 24" width="${size}" height="${size}">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                 fill="${color}"/>
      </svg>`;
    }

    container.appendChild(heart);
  }

  // Inject keyframes
  if (!document.getElementById('float-keyframes')) {
    const style = document.createElement('style');
    style.id = 'float-keyframes';
    style.textContent = `
      @keyframes floatDown {
        0% { transform: translateY(0) rotate(0deg) translateX(0); }
        25% { transform: translateY(25vh) rotate(45deg) translateX(15px); }
        50% { transform: translateY(50vh) rotate(90deg) translateX(-10px); }
        75% { transform: translateY(75vh) rotate(135deg) translateX(12px); }
        100% { transform: translateY(110vh) rotate(180deg) translateX(0); }
      }
    `;
    document.head.appendChild(style);
  }

  for (let i = 0; i < HEART_COUNT; i++) {
    createHeart();
  }
}


/* ══════════════════════════════════════
   5. SCRATCH TO REVEAL
   ══════════════════════════════════════ */
function initScratchReveal() {
  const canvas = document.getElementById('scratch-canvas');
  const label = document.getElementById('scratch-label');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let isDrawing = false;
  let autoRevealTriggered = false;

  function setup() {
    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;

    // Vibrant gradient overlay (like reference — pink/magenta/purple)
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#c72c5c');
    grad.addColorStop(0.3, '#d13568');
    grad.addColorStop(0.5, '#b82b65');
    grad.addColorStop(0.7, '#a02356');
    grad.addColorStop(1, '#8a1d4a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dot pattern overlay (like the reference)
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    for (let x = 0; x < canvas.width; x += 6) {
      for (let y = 0; y < canvas.height; y += 6) {
        ctx.fillRect(x, y, 1.5, 1.5);
      }
    }
  }

  function scratch(x, y) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, 40, 0, Math.PI * 2);
    ctx.globalAlpha = 0.45;
    ctx.fill();
    ctx.globalAlpha = 1;
    checkProgress();
  }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;
    return {
      x: (touch.clientX - rect.left) * (canvas.width / rect.width),
      y: (touch.clientY - rect.top) * (canvas.height / rect.height)
    };
  }

  function checkProgress() {
    if (autoRevealTriggered) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    const total = data.length / 4;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 128) transparent++;
    }
    const pct = transparent / total;
    if (pct > 0.05 && label) label.classList.add('hidden');
    if (pct > 0.45) {
      autoRevealTriggered = true;
      canvas.style.transition = 'opacity 0.8s ease';
      canvas.style.opacity = '0';
      setTimeout(() => { canvas.style.display = 'none'; }, 800);
    }
  }

  canvas.addEventListener('mousedown', (e) => { isDrawing = true; scratch(...Object.values(getPos(e))); });
  canvas.addEventListener('mousemove', (e) => { if (isDrawing) scratch(...Object.values(getPos(e))); });
  canvas.addEventListener('mouseup', () => { isDrawing = false; });
  canvas.addEventListener('mouseleave', () => { isDrawing = false; });

  canvas.addEventListener('touchstart', (e) => { e.preventDefault(); isDrawing = true; scratch(...Object.values(getPos(e))); }, { passive: false });
  canvas.addEventListener('touchmove', (e) => { e.preventDefault(); if (isDrawing) scratch(...Object.values(getPos(e))); }, { passive: false });
  canvas.addEventListener('touchend', () => { isDrawing = false; });

  setup();
  let timer;
  window.addEventListener('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(() => { if (!autoRevealTriggered) setup(); }, 300);
  });
}


/* ══════════════════════════════════════
   6. LETTER MODAL
   ══════════════════════════════════════ */
function initLetterModal() {
  const overlay = document.getElementById('letter-modal');
  const openBtn = document.getElementById('letter-open-btn');
  const closeBtn = document.getElementById('letter-close-btn');
  const content = document.getElementById('letter-content');
  const scrollHint = document.getElementById('letter-scroll-hint');

  if (!overlay || !openBtn) return;

  function open() {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    checkScrollHint();
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function checkScrollHint() {
    if (!content || !scrollHint) return;
    const hasScroll = content.scrollHeight > content.clientHeight;
    const atBottom = content.scrollTop + content.clientHeight >= content.scrollHeight - 10;
    scrollHint.style.opacity = hasScroll && !atBottom ? '1' : '0';
  }

  openBtn.addEventListener('click', open);
  openBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
  });
  if (closeBtn) closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) close();
  });
  if (content) content.addEventListener('scroll', checkScrollHint, { passive: true });
}


/* ══════════════════════════════════════
   7. FLOWER EXPLOSION — Real SVG Flowers
   ══════════════════════════════════════ */
function initFlowerExplosion() {
  const btn = document.getElementById('flower-trigger-btn');
  const canvas = document.getElementById('flower-canvas');
  if (!btn || !canvas) return;

  const ctx = canvas.getContext('2d');
  let petals = [];
  let animId = null;

  const PETAL_COLORS = ['#FF1493', '#FF69B4', '#FF85C1', '#FFD700', '#FFA500', '#FF6347', '#E85C6B', '#F4744F', '#D9A24C'];
  const LEAF_COLORS = ['#228B22', '#32CD32', '#6B8E23', '#2E8B57'];

  function resize() {
    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
  }

  function drawFlower(ctx, x, y, size, rotation, petalColor) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.shadowColor = petalColor;
    ctx.shadowBlur = 3;

    // 5 or 6 petals
    const petalCount = 5 + Math.floor(Math.random() * 2);
    for (let i = 0; i < petalCount; i++) {
      ctx.save();
      ctx.rotate((Math.PI * 2 / petalCount) * i);
      ctx.fillStyle = petalColor;
      ctx.beginPath();
      ctx.ellipse(0, -size * 0.55, size * 0.35, size * 0.65, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Center
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.18, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawPetal(ctx, x, y, size, rotation, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 2;
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.28, size * 0.75, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawLeaf(ctx, x, y, size, rotation, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, 0, size * 0.2, size * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function createPetal(originX, originY) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 9;
    const rand = Math.random();
    let type = 'petal';
    if (rand > 0.7) type = 'flower';
    else if (rand > 0.55) type = 'leaf';

    return {
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - (3 + Math.random() * 5),
      size: 10 + Math.random() * 22,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.15,
      gravity: 0.07 + Math.random() * 0.09,
      opacity: 1,
      fadeSpeed: 0.003 + Math.random() * 0.005,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      leafColor: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
      type
    };
  }

  function explode() {
    resize();
    const rect = btn.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    const originX = rect.left + rect.width / 2 - canvasRect.left;
    const originY = rect.top + rect.height / 2 - canvasRect.top;

    const count = 50 + Math.floor(Math.random() * 25);
    for (let i = 0; i < count; i++) {
      petals.push(createPetal(originX, originY));
    }
    if (!animId) animate();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = petals.length - 1; i >= 0; i--) {
      const p = petals[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.99;
      p.rotation += p.rotSpeed;
      p.opacity -= p.fadeSpeed;

      if (p.opacity <= 0) { petals.splice(i, 1); continue; }

      ctx.globalAlpha = p.opacity;

      if (p.type === 'flower') {
        drawFlower(ctx, p.x, p.y, p.size, p.rotation, p.color);
      } else if (p.type === 'leaf') {
        drawLeaf(ctx, p.x, p.y, p.size, p.rotation, p.leafColor);
      } else {
        drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.color);
      }
    }
    ctx.globalAlpha = 1;

    if (petals.length > 0) {
      animId = requestAnimationFrame(animate);
    } else {
      animId = null;
    }
  }

  btn.addEventListener('click', explode);
  window.addEventListener('resize', resize);
  resize();
}


/* ══════════════════════════════════════
   8. LOVE CARDS — List Style with hover slide
   ══════════════════════════════════════ */
function initLoveCards() {
  const container = document.getElementById('love-cards-container');
  if (!container) return;

  container.innerHTML = '';

  LOVE_LIST.forEach((item, idx) => {
    const el = document.createElement('div');
    el.className = 'love-list-item';
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-expanded', 'false');

    // SVG heart icon in the item's color
    el.innerHTML = `
      <div class="love-list-icon">
        <svg viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
          2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09
          3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4
          6.86-8.55 11.54L12 21.35z" fill="${item.color}"/>
        </svg>
      </div>
      <div class="love-list-text">
        <div class="love-list-title">${item.title}</div>
        <div class="love-list-detail">${item.detail}</div>
      </div>
    `;

    el.addEventListener('click', () => {
      const expanded = el.classList.toggle('expanded');
      el.setAttribute('aria-expanded', expanded);
    });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const expanded = el.classList.toggle('expanded');
        el.setAttribute('aria-expanded', expanded);
      }
    });

    container.appendChild(el);
  });
}


/* ══════════════════════════════════════
   9. COMPATIBILITY CALCULATOR
   ══════════════════════════════════════ */
function initCompatibilityCalc() {
  const input = document.getElementById('compat-name-input');
  const btn = document.getElementById('compat-calc-btn');
  const resultDiv = document.getElementById('compat-result');
  const percentEl = document.getElementById('compat-percentage');
  const labelEl = document.getElementById('compat-label');

  if (!btn || !input) return;

  function hashString(str) {
    let hash = 0;
    const s = str.toLowerCase().trim();
    for (let i = 0; i < s.length; i++) {
      hash = ((hash << 5) - hash) + s.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  function burstHearts(target) {
    const rect = target.getBoundingClientRect();
    const hearts = ['❤️', '💛', '💕', '✨', '🥰', '💖'];
    for (let i = 0; i < 12; i++) {
      const el = document.createElement('span');
      el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      el.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width / 2 + (Math.random() - 0.5) * 80}px;
        top: ${rect.top + rect.height / 2}px;
        font-size: ${1 + Math.random() * 1.5}rem;
        pointer-events: none; z-index: 9999;
        transition: all ${0.8 + Math.random() * 0.8}s cubic-bezier(0.34,1.56,0.64,1);
        opacity: 1;
      `;
      document.body.appendChild(el);
      requestAnimationFrame(() => {
        el.style.transform = `translate(${(Math.random()-0.5)*120}px, ${-80-Math.random()*120}px) scale(0.3)`;
        el.style.opacity = '0';
      });
      setTimeout(() => el.remove(), 2000);
    }
  }

  function calculate() {
    const name = input.value.trim();
    if (!name) {
      input.focus();
      input.style.borderColor = '#E85C6B';
      setTimeout(() => { input.style.borderColor = ''; }, 1500);
      return;
    }

    const hash = hashString(name + 'dorcas');
    const percent = 85 + (hash % 15);

    resultDiv.classList.add('visible');
    let current = 0;
    const start = performance.now();

    function animateCount(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / 1500, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      current = Math.round(eased * percent);
      percentEl.textContent = current + '%';
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        labelEl.textContent = percent >= 90 ? '✨ Perfect Match! ✨' : '💛 Great Match! 💛';
        burstHearts(resultDiv);
      }
    }
    requestAnimationFrame(animateCount);
  }

  btn.addEventListener('click', calculate);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') calculate(); });
}


/* ══════════════════════════════════════
   10. SONGS CAROUSEL
   ══════════════════════════════════════ */
function initSongsCarousel() {
  const slider = document.getElementById('carousel-slider');
  const counter = document.getElementById('carousel-counter');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  if (!slider) return;

  let idx = 0;

  SONGS.forEach((song) => {
    const card = document.createElement('div');
    card.className = 'song-card';
    card.innerHTML = `
      <div class="song-cover-container">
        <img class="song-cover-img" src="${song.thumbnail}" alt="${song.title}" loading="lazy" />
        <a href="${song.url}" target="_blank" rel="noopener noreferrer" class="song-play-overlay" aria-label="Play ${song.title} on YouTube">
          <div class="song-play-btn">▶</div>
        </a>
      </div>
      <div class="song-info">
        <div class="song-card-title">${song.title}</div>
        <div class="song-card-artist">${song.artist}</div>
        <a href="${song.url}" target="_blank" rel="noopener noreferrer" class="song-card-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          Watch on YouTube
        </a>
      </div>
    `;
    slider.appendChild(card);
  });

  function update() {
    slider.style.transform = `translateX(-${idx * 100}%)`;
    counter.textContent = `${idx + 1} / ${SONGS.length}`;
    prevBtn.disabled = idx === 0;
    nextBtn.disabled = idx === SONGS.length - 1;
  }

  prevBtn.addEventListener('click', () => { if (idx > 0) { idx--; update(); } });
  nextBtn.addEventListener('click', () => { if (idx < SONGS.length - 1) { idx++; update(); } });

  let startX = 0;
  slider.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && idx < SONGS.length - 1) idx++;
      else if (diff < 0 && idx > 0) idx--;
      update();
    }
  }, { passive: true });

  update();
}


/* ══════════════════════════════════════
   11. TIKTOK VIDEO PLAYER
   ══════════════════════════════════════ */
function initTikTokPlayer() {
  const video = document.getElementById('tiktok-video');
  const overlay = document.getElementById('tiktok-play-overlay');
  if (!video || !overlay) return;

  overlay.addEventListener('click', () => { overlay.classList.add('hidden'); video.play(); });
  video.addEventListener('pause', () => { if (!video.ended) overlay.classList.remove('hidden'); });
  video.addEventListener('ended', () => { overlay.classList.remove('hidden'); });
  video.addEventListener('click', () => {
    if (video.paused) { overlay.classList.add('hidden'); video.play(); }
    else video.pause();
  });
}


/* ══════════════════════════════════════
   INIT
   ══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initScrollReveal();
  initHeroScroll();
  initFloatingHearts();
  initScratchReveal();
  initLetterModal();
  initFlowerExplosion();
  initLoveCards();
  initCompatibilityCalc();
  initSongsCarousel();
  initTikTokPlayer();
});
