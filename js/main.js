/* ================================================================
   FUNDACIÓN CULTURAL TIERRA DE GAVIOTAS — main.js
   Navegación, scroll effects, contadores animados, menú móvil
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
   NAVBAR
   --------------------------------------------------------------- */
(function initNavbar() {
  const navbar = $('#navbar');
  if (!navbar) return;

  const SCROLL_THRESHOLD = 60;

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // ejecutar una vez al cargar
})();


/* ---------------------------------------------------------------
   MENÚ HAMBURGUESA (MÓVIL)
   --------------------------------------------------------------- */
(function initMobileMenu() {
  const toggle   = $('#menuToggle');
  const navMenu  = $('#navMenu');
  const navbar   = $('#navbar');
  if (!toggle || !navMenu) return;

  let isOpen = false;

  function openMenu() {
    isOpen = true;
    navMenu.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Trap focus inside menu
    navMenu.addEventListener('keydown', trapFocus);
  }

  function closeMenu() {
    isOpen = false;
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
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }

  toggle.addEventListener('click', () => isOpen ? closeMenu() : openMenu());

  // Cerrar al hacer clic en un link del menú
  $$('.navbar__link', navMenu).forEach(link => {
    link.addEventListener('click', () => closeMenu());
  });

  // Cerrar al presionar Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
      toggle.focus();
    }
  });

  // Cerrar al hacer clic fuera
  document.addEventListener('click', e => {
    if (isOpen && !navbar.contains(e.target)) closeMenu();
  });

  // Cerrar al redimensionar a desktop
  window.addEventListener('resize', debounce(() => {
    if (window.innerWidth >= 768 && isOpen) closeMenu();
  }));
})();


/* ---------------------------------------------------------------
   LINK ACTIVO EN NAVBAR
   --------------------------------------------------------------- */
(function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  $$('.navbar__link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPage = href.split('/').pop();
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });
})();


/* ---------------------------------------------------------------
   SCROLL REVEAL (Intersection Observer)
   --------------------------------------------------------------- */
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
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  elements.forEach(el => observer.observe(el));
})();


/* ---------------------------------------------------------------
   CONTADORES ANIMADOS (CIFRAS DE IMPACTO)
   --------------------------------------------------------------- */
(function initCounters() {
  const counters = $$('[data-counter]');
  if (!counters.length) return;

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animateCounter(el) {
    const target   = parseInt(el.getAttribute('data-counter'), 10);
    const prefix   = el.getAttribute('data-prefix') || '';
    const suffix   = el.getAttribute('data-suffix') || '';
    const duration = parseInt(el.getAttribute('data-duration') || '2000', 10);
    const start    = performance.now();

    function step(timestamp) {
      const elapsed  = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutQuart(progress);
      const current  = Math.round(eased * target);

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
    // Mostrar valor inicial en 0
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    el.textContent = prefix + '0' + suffix;
    observer.observe(el);
  });
})();


/* ---------------------------------------------------------------
   SMOOTH SCROLL para anclas internas
   --------------------------------------------------------------- */
(function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id  = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const navbarH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-h') || '72', 10);
      const top = target.getBoundingClientRect().top + window.scrollY - navbarH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // Botón "scroll down" del hero
  const heroScroll = $('.hero__scroll');
  if (heroScroll) {
    heroScroll.addEventListener('click', () => {
      const impact = $('#impact') || document.querySelector('.impact') || document.querySelector('main > *:nth-child(2)');
      if (impact) {
        const navbarH = 72;
        const top = impact.getBoundingClientRect().top + window.scrollY - navbarH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  }
})();


/* ---------------------------------------------------------------
   STICKY FOOTER — Asegurar que el footer ocupe el resto
   de la altura mínima en páginas cortas
   --------------------------------------------------------------- */
(function initMinHeight() {
  function setMinHeight() {
    const main = $('main') || $('[role="main"]');
    if (!main) return;
    const navbar = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-h') || '72', 10);
    const footer = $('footer');
    const footerH = footer ? footer.offsetHeight : 0;
    main.style.minHeight = `calc(100vh - ${navbar}px - ${footerH}px)`;
  }
  setMinHeight();
  window.addEventListener('resize', debounce(setMinHeight));
})();


/* ---------------------------------------------------------------
   MANEJO DE IMÁGENES ROTAS (mostrar placeholder)
   --------------------------------------------------------------- */
(function initImageFallbacks() {
  $$('img[data-placeholder-text]').forEach(img => {
    img.addEventListener('error', function() {
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


/* ---------------------------------------------------------------
   NOTIFICACIÓN WHATSAPP — Abrir en nueva pestaña
   --------------------------------------------------------------- */
(function initWhatsApp() {
  $$('a[href^="https://wa.me"]').forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
})();


/* ---------------------------------------------------------------
   FORMULARIO DE CONTACTO (validación básica del lado cliente)
   --------------------------------------------------------------- */
(function initContactForm() {
  const form = $('#contact-form');
  if (!form) return;

  const msgEl = form.querySelector('.form-message');

  form.addEventListener('submit', function(e) {
    // Validación básica HTML5 ya la hace el navegador
    // Aquí podemos añadir validación custom si fuera necesario
    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
    }
    // Si usa Formspree: el redirect lo maneja Formspree
    // Si quisieran AJAX, agregar aquí la lógica con fetch
  });
})();


/* ---------------------------------------------------------------
   TOOLTIPS SIMPLES (para acreditaciones en footer)
   --------------------------------------------------------------- */
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
