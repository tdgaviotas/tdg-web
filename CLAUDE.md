# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Entorno Windows y comandos

- El proyecto está en **Windows 10**.
- Carpeta raíz: `C:\Users\lmsot\OneDrive\Documentos\GitHub\tdg-web-astro`
- Si necesitas ejecutar comandos PowerShell, hazlo mediante:

  ```
  powershell.exe -NoProfile -Command "COMANDO"
  ```

- No uses directamente `Get-ChildItem`, `Select-Object` ni otros cmdlets de PowerShell dentro de Bash. Para comandos simples de lectura, prefiere herramientas compatibles con Bash: `ls`, `find`, `cat`, `pwd`.
- Para operaciones de búsqueda y lectura de archivos, usa las herramientas dedicadas (Glob, Grep, Read) en lugar de comandos de terminal.
- Antes de cambios grandes, explica qué archivos tocarás y por qué.
- Después de cambios importantes, ejecuta `npm run build` para verificar que el proyecto compila sin errores.
- No inventes información real de la Fundación Cultural Tierra de Gaviotas (nombres de personas, eventos, fechas, cifras, testimonios). Usa los datos que ya están en el código.
- No elimines archivos sin explicar qué hacen y por qué es seguro borrarlos.

## Comandos del proyecto

| Comando | Acción |
| :--- | :--- |
| `npm run dev` | Servidor de desarrollo en `localhost:4321` |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Previsualizar build de producción localmente |
| `npm run astro -- --help` | Ayuda del CLI de Astro |

No hay tests ni linter configurados en este proyecto.

## Arquitectura

Sitio web estático tipo brochure para la Fundación Cultural Tierra de Gaviotas, una organización sin fines de lucro chilena. Desarrollado con **Astro 6** sobre **Node >= 22.12.0**. No usa React, Vue ni otros frameworks de UI: las páginas son archivos `.astro` puros y la interactividad se maneja con JavaScript vanilla.

### Enrutamiento y páginas

- **`src/pages/`** — Enrutamiento basado en archivos. 8 páginas: `index` (inicio), `nosotros`, `programas`, `voluntariado`, `contacto`, `donaciones`, `manual-grafico`, `noticias`.
- **`src/layouts/BaseLayout.astro`** — El layout único del sitio. Cada página se envuelve en `<BaseLayout>` pasando las props `title`, `description` y `canonical`.
- **La página de Noticias está temporalmente desactivada**: `_redirects` redirige `/noticias` a `/`, la página incluye `<meta name="robots" content="noindex, nofollow">`, y los enlaces del navbar están comentados.

### BaseLayout

El layout centraliza todo lo compartido:

- **`<head>`**: meta tags, Open Graph, Twitter Card, JSON-LD (schema.org para NGO), favicons, preconnect a Google Fonts.
- **Navbar**: logo, menú de navegación con indicador de página activa (`aria-current`), botón hamburguesa para móvil, y botón CTA de donaciones.
- **Footer**: logo, descripción de la fundación, redes sociales, mapa del sitio, listado de programas, datos de contacto, aliados tecnológicos, y barra legal con RUT.
- **Scripts**: carga `main.js` y `components.js` con `is:inline` (no son procesados por Astro, van directo al HTML).
- **Slot**: expone `<slot name="head" />` para que cada página inyecte elementos adicionales en el `<head>` (ej. meta robots en noticias).

### CSS

Cuatro archivos CSS planos en `src/styles/`, importados por BaseLayout en este orden:

1. **`main.css`** — Reset, tipografía (Cormorant Garamond, Playfair Display, Source Serif 4), botones (`.btn`, `.btn--ambar`, `.btn--cafe`, `.btn--outline`, `.btn--outline-white`), hero, contadores de impacto, utilidades de layout.
2. **`components.css`** — Tarjetas de programa, accordion, lightbox, tabs, timeline, secciones de identidad de marca.
3. **`components-v2.css`** — Componentes más recientes: Borderline, colaboraciones, videos, formulario, grid de voluntariado.
4. **`responsive.css`** — Todas las media queries.

Nomenclatura tipo BEM: `.navbar__inner`, `.card-programa__title`, `.footer__grid`. Paleta de colores principal: café `#352112`, ámbar `#FFB600`, crema `#F4EFE9`.

### JavaScript

Dos archivos vanilla JS en `public/js/`, cargados mediante `<script is:inline>`:

- **`main.js`** (cargar primero) — Define los helpers `$` y `$$` (querySelector y querySelectorAll acotados). Contiene: efecto de scroll en navbar, menú hamburguesa móvil (apertura/cierre, focus trap, tecla Escape), scroll-reveal con IntersectionObserver (clases `.reveal` → `.visible`), contadores animados (`data-counter`, `data-prefix`, `data-suffix`), smooth scroll para anclas internas, manejo de envío del formulario de contacto, fallback de imágenes rotas (`data-placeholder-text`), tooltips, aplicación CSP-safe de estilos (`data-bg`, `data-color`, `data-border`), manejo de enlaces WhatsApp, y detección de mensaje de éxito de Formspree (`?enviado=true`).
- **`components.js`** — Acordeón (`.acordeon`), lightbox para galerías (`[data-gallery]`), tabs (`[role="tablist"]`), y botones de copiar al portapapeles (`[data-copy]`).

**Importante**: `components.js` asume que `main.js` ya se cargó, pues usa `$` y `$$` sin redeclararlos. Ambos scripts son compatibles con CSP: no usan event handlers inline y los estilos dinámicos se aplican por JS, no mediante atributos HTML.

### Convenciones del proyecto

- **Idioma**: todo el contenido está en español (es-CL).
- **Accesibilidad**: atributos `aria-*`, navegación por teclado, focus traps, skip-link (`<a href="#main-content">`), atributos `role`, clase `sr-only` para encabezados solo visuales.
- **Placeholders**: el patrón `[PLACEHOLDER: descripción]` marca contenido, imágenes o URLs pendientes de completar. Muchas etiquetas `<img>` incluyen `data-placeholder-text` para mostrar un texto alternativo cuando la imagen no carga.
- **Formulario de contacto**: usa Formspree (`formspree.io/f/xjgjpewp`) con campo honeypot anti-spam. El redirect de éxito usa `?enviado=true`.
- **Despliegue**: Cloudflare Pages (ver `_headers` para políticas de seguridad y caché, `_redirects` para redirecciones).

### Encabezados de seguridad (`public/_headers`)

CSP estricto (`script-src 'self'`, `style-src 'self' https://fonts.googleapis.com`), HSTS, `X-Frame-Options: DENY`, `frame-ancestors 'none'`, y políticas de caché para CSS/JS/imágenes. Cualquier recurso externo nuevo (fuentes, scripts, estilos, endpoints de conexión) debe agregarse al CSP.

### Estructura de archivos relevante

```
/
├── public/
│   ├── _headers          # Encabezados HTTP (CSP, HSTS, caché)
│   ├── _redirects        # Redirecciones de Cloudflare Pages
│   ├── js/
│   │   ├── main.js       # Utilidades, navbar, scroll, formulario
│   │   └── components.js # Acordeón, lightbox, tabs, clipboard
│   └── images/           # Imágenes estáticas organizadas por categoría
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro  # Layout único del sitio
│   ├── pages/            # 8 páginas .astro (una por ruta)
│   └── styles/           # 4 archivos CSS planos
├── astro.config.mjs      # Configuración de Astro (mínima)
├── tsconfig.json         # Extiende astro/tsconfigs/strict
└── package.json          # Dependencia única: astro ^6.2.1
```
