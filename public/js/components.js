/* ================================================================
   FUNDACIÓN CULTURAL TIERRA DE GAVIOTAS — components.js
   Componentes interactivos: acordeón, galería lightbox simple,
   tabs, slider testimonios
   ================================================================ */

'use strict';

/* $ y $$ se declaran en main.js (cargado antes) — no redeclarar aquí */

/* ---------------------------------------------------------------
   ACORDEÓN (FAQ / Preguntas frecuentes)
   --------------------------------------------------------------- */
(function initAcordeon() {
  $$('.acordeon').forEach(acordeon => {
    const items = $$('.acordeon-item', acordeon);

    items.forEach(item => {
      const trigger = $('.acordeon-trigger', item);
      const content = $('.acordeon-content', item);
      if (!trigger || !content) return;

      // Estado inicial
      const isOpen = item.classList.contains('open');
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      content.style.maxHeight = isOpen ? content.scrollHeight + 'px' : '0';
      content.style.overflow = 'hidden';
      content.style.transition = 'max-height 0.35s ease';

      trigger.addEventListener('click', () => {
        const open = item.classList.contains('open');

        // Cerrar todos (modo exclusivo)
        items.forEach(other => {
          if (other === item) return;
          const otherContent = $('.acordeon-content', other);
          if (otherContent) otherContent.style.maxHeight = '0';
          other.classList.remove('open');
          const otherTrigger = $('.acordeon-trigger', other);
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        });

        // Toggle el actual
        item.classList.toggle('open', !open);
        trigger.setAttribute('aria-expanded', (!open).toString());
        content.style.maxHeight = open ? '0' : content.scrollHeight + 'px';
      });

      // Soporte teclado
      trigger.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          trigger.click();
        }
      });
    });
  });
})();


/* ---------------------------------------------------------------
   LIGHTBOX SIMPLE (galería de fotos)
   --------------------------------------------------------------- */
(function initLightbox() {
  const galleries = $$('[data-gallery]');
  if (!galleries.length) return;

  // Crear overlay una sola vez
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Visualizador de imagen');
  overlay.innerHTML = `
    <div class="lightbox-inner">
      <button class="lightbox-close" aria-label="Cerrar">&times;</button>
      <button class="lightbox-prev" aria-label="Imagen anterior">&#8249;</button>
      <div class="lightbox-img-wrap">
        <img class="lightbox-img" src="" alt="">
        <p class="lightbox-caption"></p>
      </div>
      <button class="lightbox-next" aria-label="Imagen siguiente">&#8250;</button>
    </div>
  `;
  document.body.appendChild(overlay);

  // Estilos inline del lightbox
  const style = document.createElement('style');
  style.textContent = `
    .lightbox-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(30, 12, 4, 0.95);
      z-index: 9999;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }
    .lightbox-overlay.active { display: flex; }
    .lightbox-inner {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .lightbox-img-wrap { text-align: center; }
    .lightbox-img {
      max-width: 80vw;
      max-height: 80vh;
      object-fit: contain;
      border-radius: 8px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    }
    .lightbox-caption {
      color: rgba(255,255,255,0.7);
      font-size: 0.9rem;
      margin-top: 0.75rem;
      font-family: 'Playfair Display', serif;
    }
    .lightbox-close, .lightbox-prev, .lightbox-next {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.15);
      color: #fff;
      border-radius: 50%;
      width: 48px;
      height: 48px;
      font-size: 1.5rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background 0.2s;
    }
    .lightbox-close:hover, .lightbox-prev:hover, .lightbox-next:hover {
      background: #FFB600;
      color: #352112;
    }
    .lightbox-close {
      position: absolute;
      top: -60px;
      right: 0;
    }
    @media (max-width: 768px) {
      .lightbox-prev, .lightbox-next { display: none; }
      .lightbox-img { max-width: 95vw; }
    }
  `;
  document.head.appendChild(style);

  let currentItems = [];
  let currentIndex = 0;

  const img     = overlay.querySelector('.lightbox-img');
  const caption = overlay.querySelector('.lightbox-caption');
  const closeBtn = overlay.querySelector('.lightbox-close');
  const prevBtn  = overlay.querySelector('.lightbox-prev');
  const nextBtn  = overlay.querySelector('.lightbox-next');

  function open(items, index) {
    currentItems = items;
    currentIndex = index;
    show();
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function show() {
    const item = currentItems[currentIndex];
    img.src = item.src;
    img.alt = item.alt || '';
    caption.textContent = item.caption || '';
    prevBtn.style.visibility = currentIndex > 0 ? 'visible' : 'hidden';
    nextBtn.style.visibility = currentIndex < currentItems.length - 1 ? 'visible' : 'hidden';
  }

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

  prevBtn.addEventListener('click', () => { if (currentIndex > 0) { currentIndex--; show(); } });
  nextBtn.addEventListener('click', () => { if (currentIndex < currentItems.length - 1) { currentIndex++; show(); } });

  document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
  });

  // Inicializar cada galería
  galleries.forEach(gallery => {
    const triggers = $$('[data-lightbox]', gallery);
    const items = triggers.map(el => ({
      src: el.getAttribute('data-lightbox') || el.querySelector('img')?.src || '',
      alt: el.getAttribute('data-alt') || el.querySelector('img')?.alt || '',
      caption: el.getAttribute('data-caption') || ''
    }));

    triggers.forEach((el, i) => {
      el.style.cursor = 'pointer';
      el.setAttribute('tabindex', '0');
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', `Ver imagen ${i + 1} de ${triggers.length}`);

      el.addEventListener('click', () => open(items, i));
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(items, i); }
      });
    });
  });
})();


/* ---------------------------------------------------------------
   TABS (para noticias / categorías)
   --------------------------------------------------------------- */
(function initTabs() {
  $$('[role="tablist"]').forEach(tablist => {
    const tabs    = $$('[role="tab"]', tablist);
    const panels  = [];

    tabs.forEach(tab => {
      const panelId = tab.getAttribute('aria-controls');
      const panel   = panelId ? document.getElementById(panelId) : null;
      if (panel) panels.push(panel);
    });

    function activate(tab) {
      tabs.forEach(t => {
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });
      panels.forEach(p => p.hidden = true);

      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
      const panelId = tab.getAttribute('aria-controls');
      const panel   = panelId ? document.getElementById(panelId) : null;
      if (panel) panel.hidden = false;
    }

    tabs.forEach((tab, i) => {
      // Inicial
      if (tab.getAttribute('aria-selected') === 'true') {
        activate(tab);
      } else if (i === 0 && !tabs.some(t => t.getAttribute('aria-selected') === 'true')) {
        activate(tab);
      }

      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', e => {
        let idx = tabs.indexOf(e.currentTarget);
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          idx = (idx + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          idx = (idx - 1 + tabs.length) % tabs.length;
        } else if (e.key === 'Home') {
          idx = 0;
        } else if (e.key === 'End') {
          idx = tabs.length - 1;
        } else return;
        e.preventDefault();
        activate(tabs[idx]);
        tabs[idx].focus();
      });
    });
  });
})();


/* ---------------------------------------------------------------
   COPIAR AL PORTAPAPELES (datos bancarios, etc.)
   --------------------------------------------------------------- */
(function initCopyButtons() {
  $$('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(text).then(() => {
        const original = btn.textContent;
        btn.textContent = '¡Copiado!';
        setTimeout(() => btn.textContent = original, 2000);
      });
    });
  });
})();
