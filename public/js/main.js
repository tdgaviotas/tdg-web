/* ================================================================
   FUNDACIÓN CULTURAL TIERRA DE GAVIOTAS — main.js
   Navegación, scroll effects, contadores animados, menú móvil
   Compatible con ClientRouter (astro:transitions).
   ================================================================ */

'use strict';

/* ---------------------------------------------------------------
   UTILIDADES
   --------------------------------------------------------------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function debounce(fn, delay = 150) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
}

/* ---------------------------------------------------------------
   SETUP PERSISTENTE (se ejecuta una sola vez)
   Listeners en document/window que sobreviven a navegaciones.
   --------------------------------------------------------------- */
let _persistentDone = false;

function setupPersistent() {
  if (_persistentDone) return;
  _persistentDone = true;

  // Escape — cerrar menú móvil
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    const nav = $('#navMenu');
    const toggle = $('#menuToggle');
    if (!nav || !toggle) return;
    if (nav.classList.contains('nav-open')) {
      nav.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      toggle.focus();
    }
  });

  // Clic fuera — cerrar menú móvil
  document.addEventListener('click', e => {
    const navbar = $('#navbar');
    const nav = $('#navMenu');
    if (!navbar || !nav) return;
    if (nav.classList.contains('nav-open') && !navbar.contains(e.target)) {
      nav.classList.remove('nav-open');
      const toggle = $('#menuToggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Resize — cerrar menú al pasar a desktop
  window.addEventListener('resize', debounce(() => {
    if (window.innerWidth < 768) return;
    const nav = $('#navMenu');
    const toggle = $('#menuToggle');
    if (!nav || !toggle) return;
    if (nav.classList.contains('nav-open')) {
      nav.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }));

  // Scroll del navbar
  let navbarEl = null;
  window.addEventListener('scroll', () => {
    if (!navbarEl) navbarEl = $('#navbar');
    if (navbarEl && !document.body.contains(navbarEl)) navbarEl = $('#navbar');
    if (navbarEl) navbarEl.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ---------------------------------------------------------------
   INICIALIZACIÓN DE DOM (se ejecuta en cada carga de página)
   --------------------------------------------------------------- */
function initDOM() {
  setupPersistent();

  // --- Navbar: clase scrolled inicial ---
  const navbar = $('#navbar');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);

  // --- Menú hamburguesa (móvil) ---
  (function initMobileMenu() {
    const toggle = $('#menuToggle');
    const navMenu = $('#navMenu');
    if (!toggle || !navMenu) return;

    function openMenu() {
      navMenu.classList.add('nav-open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      navMenu.addEventListener('keydown', trapFocus);
    }

    function closeMenu() {
      navMenu.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      navMenu.removeEventListener('keydown', trapFocus);
    }

    function trapFocus(e) {
      if (e.key !== 'Tab') return;
      const focusable = $$('a, button', navMenu).filter(el => !el.disabled);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }

    toggle.addEventListener('click', () => {
      navMenu.classList.contains('nav-open') ? closeMenu() : openMenu();
    });

    // Cerrar al hacer clic en un link del menú
    $$('.navbar__link', navMenu).forEach(link => {
      link.addEventListener('click', () => closeMenu());
    });
  })();

  // --- Scroll reveal ---
  (function initScrollReveal() {
    const elements = $$('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(el => observer.observe(el));
  })();

  // --- Contadores animados ---
  (function initCounters() {
    const counters = $$('[data-counter]');
    if (!counters.length) return;

    function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

    function animateCounter(el) {
      const target = parseInt(el.getAttribute('data-counter'), 10);
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = parseInt(el.getAttribute('data-duration') || '2000', 10);
      const start = performance.now();

      function step(timestamp) {
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.round(easeOutQuart(progress) * target);
        el.textContent = prefix + current.toLocaleString('es-CL') + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = prefix + target.toLocaleString('es-CL') + suffix;
      }

      requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(el => {
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';
      el.textContent = prefix + '0' + suffix;
      observer.observe(el);
    });
  })();

  // --- Smooth scroll para anclas ---
  (function initSmoothScroll() {
    $$('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const id = link.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        const navbarH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-h') || '72', 10);
        const top = target.getBoundingClientRect().top + window.scrollY - navbarH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });

    const heroScroll = $('.hero__scroll');
    if (heroScroll) {
      heroScroll.addEventListener('click', () => {
        const target = $('#impact') || $('.impact') || $('main > *:nth-child(2)');
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - 72;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    }
  })();

  // --- Sticky footer ---
  (function initMinHeight() {
    function setMinHeight() {
      const main = $('main') || $('[role="main"]');
      if (!main) return;
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-h') || '72', 10);
      const footer = $('footer');
      const footerH = footer ? footer.offsetHeight : 0;
      main.style.minHeight = `calc(100vh - ${navH}px - ${footerH}px)`;
    }
    setMinHeight();
  })();

  // --- Fallback de imágenes rotas ---
  (function initImageFallbacks() {
    $$('img[data-placeholder-text]').forEach(img => {
      img.addEventListener('error', function handler() {
        const text = this.getAttribute('data-placeholder-text') || '[Imagen próximamente]';
        const wrap = this.closest('.img-wrap') || this.parentElement;
        if (wrap) {
          const p = document.createElement('div');
          p.className = 'img-placeholder-text';
          p.textContent = text;
          wrap.replaceChild(p, this);
        }
      });
    });
  })();

  // --- WhatsApp en nueva pestaña ---
  (function initWhatsApp() {
    $$('a[href^="https://wa.me"]').forEach(link => {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
  })();

  // --- Formulario de contacto ---
  (function initContactForm() {
    const form = $('#contact-form');
    if (!form) return;

    form.addEventListener('submit', function () {
      const submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
      }
    });
  })();

  // --- Tooltips ---
  (function initTooltips() {
    $$('[data-tooltip]').forEach(el => {
      el.setAttribute('tabindex', '0');

      function show() {
        let tip = el.querySelector('.tooltip-bubble');
        if (tip) return;
        tip = document.createElement('span');
        tip.className = 'tooltip-bubble';
        tip.textContent = el.getAttribute('data-tooltip');
        el.appendChild(tip);
      }

      function hide() {
        const tip = el.querySelector('.tooltip-bubble');
        if (tip) tip.remove();
      }

      el.addEventListener('mouseenter', show);
      el.addEventListener('focusin', show);
      el.addEventListener('mouseleave', hide);
      el.addEventListener('focusout', hide);
    });
  })();

  // --- Estilos por data-atributo (CSP-safe) ---
  (function initDataStyles() {
    $$('[data-bg]').forEach(el => { el.style.background = el.getAttribute('data-bg'); });
    $$('[data-color]').forEach(el => { el.style.color = el.getAttribute('data-color'); });
    $$('[data-border]').forEach(el => { el.style.border = el.getAttribute('data-border'); });
  })();

  // --- Mensaje éxito contacto (Formspree redirect) ---
  (function initContactSuccessMessage() {
    if (!window.location.search.includes('enviado=true')) return;
    const msg = document.getElementById('form-success');
    if (msg) msg.style.display = 'block';
    const form = document.getElementById('contact-form');
    if (form) form.style.display = 'none';
  })();
}

/* ---------------------------------------------------------------
   ARRANQUE
   --------------------------------------------------------------- */
initDOM();
document.addEventListener('astro:after-swap', initDOM);
