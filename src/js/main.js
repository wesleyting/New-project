

// ─── CURSOR ───────────────────────────────────────────
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  gsap.to(dot, { x: mx, y: my, duration: 0.05 });
});

function followRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
  requestAnimationFrame(followRing);
}
followRing();

// GSAP setup
gsap.registerPlugin(ScrollTrigger);


// force again after load (for safety)
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});

function hidePageOverlay() {
  const overlay = document.getElementById('pageOverlay');
  if (overlay) overlay.style.display = 'none';
}

// Hero intro
const heroTl = gsap.timeline({
  delay: 0.7,
  onComplete: () => document.body.classList.add('hero-ready')
});

heroTl.to('.hero-label', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });

const words = document.querySelectorAll('.hero-headline .word');
heroTl.fromTo(words, {
  y: '110%'
}, {
  y: '0%',
  duration: 1,
  stagger: 0.07,
  ease: 'expo.out'
}, '-=0.2');

heroTl.to('.hero-sub', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3');

gsap.to('#pageOverlay', {
  scaleY: 0,
  duration: 1.1,
  ease: 'expo.inOut',
  delay: 0.2,
  onComplete: hidePageOverlay
});

setTimeout(hidePageOverlay, 2500);

gsap.to('.hero-blob-1', {
  y: '-6%', x: '3%',
  duration: 8, ease: 'sine.inOut',
  repeat: -1, yoyo: true
});

gsap.to('.hero-blob-2', {
  y: '5%', x: '-3%',
  duration: 10, ease: 'sine.inOut',
  repeat: -1, yoyo: true,
  delay: 1.5
});

let resizeRefreshTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeRefreshTimer);
  resizeRefreshTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 150);
});

window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});

window.addEventListener('pageshow', () => {
  requestAnimationFrame(() => ScrollTrigger.refresh());
});

// Work items reveal
gsap.utils.toArray('.work-item').forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%' },
    opacity: 0,
    y: 48,
    duration: 0.9,
    ease: 'expo.out',
    delay: i * 0.1
  });
});

// About reveal
gsap.timeline({
  scrollTrigger: {
    trigger: '#about',
    start: 'top 45%',
    once: true
  }
})
  .from('.about-title', {
    x: -80,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  })
  .from('.about-lede', {
    y: 42,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out'
  }, '-=0.35')
  .from('.about-tags span', {
    y: 18,
    opacity: 0,
    duration: 0.55,
    stagger: 0.08,
    ease: 'power3.out'
  }, '-=0.35');

// Services items reveal
gsap.utils.toArray('.service-item').forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 90%' },
    x: -40, opacity: 0,
    duration: 0.8, ease: 'expo.out', delay: i * 0.06
  });
});


// ─── WOW 5: CONTACT — headline clip reveal ────────────
ScrollTrigger.create({
  trigger: '#contact',
  start: 'top 75%',
  onEnter: () => {
    gsap.from('.contact-headline', {
      scale: 1.08, opacity: 0, duration: 1.1, ease: 'expo.out'
    });
    gsap.from('.contact-grid', {
      y: 40, opacity: 0, duration: 0.9, delay: 0.4, ease: 'power3.out'
    });
  }
});

// ─── Section titles ────────────────────────────────────
gsap.utils.toArray('.section-title').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%' },
    x: -32, opacity: 0, duration: 0.9, ease: 'expo.out'
  });
});

// ─── Marquee pause on hover ────────────────────────────
document.querySelectorAll('.marquee-track, .clients-track').forEach(el => {
  el.addEventListener('mouseenter', () => el.style.animationPlayState = 'paused');
  el.addEventListener('mouseleave', () => el.style.animationPlayState = 'running');
});

// Mobile navigation
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
let mobileMenuOpen = false;

if (menuToggle && mobileMenu && mobileMenuOverlay) {
  const mobileMenuTl = gsap.timeline({
    paused: true,
    defaults: { ease: 'power3.out' },
    onReverseComplete: () => {
      gsap.set([mobileMenu, mobileMenuOverlay], { pointerEvents: 'none' });
    }
  });

  mobileMenuTl
    .to(mobileMenuOverlay, {
      opacity: 1,
      duration: 0.28
    }, 0)
    .to(mobileMenu, {
      x: '0%',
      duration: 0.55
    }, 0)
    .to(mobileMenuLinks, {
      opacity: 1,
      y: 0,
      duration: 0.48,
      stagger: 0.06
    }, 0.2)
    .to('.menu-toggle span:first-child', {
      y: 4.5,
      rotate: 45,
      duration: 0.28
    }, 0)
    .to('.menu-toggle span:last-child', {
      y: -4.5,
      rotate: -45,
      duration: 0.28
    }, 0);

  gsap.set(mobileMenuLinks, { y: 18 });

  function openMobileMenu() {
    mobileMenuOpen = true;
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close menu');
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileMenuOverlay.setAttribute('aria-hidden', 'false');
    gsap.set([mobileMenu, mobileMenuOverlay], { pointerEvents: 'auto' });
    mobileMenuTl.play();
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenuOverlay.setAttribute('aria-hidden', 'true');
    mobileMenuTl.reverse();
  }

  menuToggle.addEventListener('click', () => {
    if (mobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileMenuOverlay.addEventListener('click', closeMobileMenu);
  mobileMenuLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobileMenuOpen) closeMobileMenu();
  });
}
