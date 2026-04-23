# Correcciones TDG v2 — Registro de cambios realizados

**Fecha de aplicación:** 2026-04-21  
**Versión:** v2.0  
**Solicitante:** Fundación Cultural Tierra de Gaviotas  

---

## Archivos modificados

| Archivo | Cambios aplicados |
|---------|-------------------|
| `css/main.css` | CAMBIO 1: Nuevo sistema de contraste para `.label` (WCAG AA) |
| `css/components.css` | CAMBIO 2: Hero con foto real + fallback CSS · CAMBIO 4: CTA banner con logo TDG |
| `css/components-v2.css` | **NUEVO** — Todos los estilos v2 (600+ líneas) |
| `index.html` | Navbar + Manual gráfico · CAMBIO 5: card Borderline · CAMBIO 6: aliados consolidados · Footer Borderline link |
| `nosotros.html` | CAMBIO 3: page-hero con foto · CAMBIO 8: etimología infográfica · CAMBIO 9: timeline con marcas de identidad · CAMBIO 14: link clínica YouTube · Footer Borderline link |
| `programas.html` | CAMBIO 3: page-hero con foto · CAMBIO 5: sección Borderline_CL completa · CAMBIO 10: cards colaboraciones con fotos · Footer Borderline link |
| `voluntariado.html` | CAMBIO 3: page-hero con foto · CAMBIO 12: áreas de participación con foto de fondo · CAMBIO 14: link video clínica embajador · Footer Borderline link |
| `donaciones.html` | CAMBIO 3: page-hero con foto · Footer Borderline link |
| `contacto.html` | CAMBIO 3: page-hero con foto · CAMBIO 13: contacto compacto con `.contact-list-compact` · Navbar Manual gráfico · Footer Borderline link |
| `noticias.html` | CAMBIO 3: page-hero con foto · Footer Borderline link |
| `sitemap.xml` | Añadida entrada para `manual-grafico.html` |

---

## Archivos nuevos creados

| Archivo | Descripción |
|---------|-------------|
| `css/components-v2.css` | Hoja de estilos v2 — todos los nuevos componentes |
| `manual-grafico.html` | Nueva página de identidades visuales (CAMBIO 11) |
| `images/hero/hero-chiloe.jpg` | Foto hero página de inicio |
| `images/hero/hero-chiloe-mobile.jpg` | Versión mobile del hero de inicio |
| `images/hero/hero-nosotros.jpg` | Foto hero página Nosotros |
| `images/hero/hero-programas.jpg` | Foto hero página Programas |
| `images/hero/hero-voluntariado.jpg` | Foto hero página Voluntariado |
| `images/hero/hero-noticias.jpg` | Foto hero página Noticias |
| `images/hero/hero-donaciones.jpg` | Foto hero página Apóyanos |
| `images/hero/hero-contacto.jpg` | Foto hero página Contacto |
| `images/hero/hero-manual-grafico.jpg` | Foto hero página Manual gráfico |
| `images/hero/section-programas.jpg` | Foto sección programas |
| `images/hero/section-voluntariado.jpg` | Foto sección voluntariado |
| `images/borderline/bdln-*.jpg` | 6 fotos para sección Borderline_CL |
| `images/colaboraciones/colab-*.jpg` | 3 fotos para tarjetas de colaboraciones |
| `images/voluntariado/*.jpg` | 10 fotos para áreas de voluntariado |
| `images/aliados/*.svg` | 6 logos SVG placeholder de aliados tecnológicos |

---

## Placeholders pendientes — por orden de prioridad

### 🔴 Prioridad ALTA (visibles en primeras impresiones)

| # | Archivo / URL | Ubicación | Acción requerida |
|---|---------------|-----------|------------------|
| 1 | `images/equipo/jorge-alvarado.jpg` | voluntariado.html — embajador | Subir foto real de Jorge Alvarado Torres |
| 2 | `images/equipo/voluntarios-tdg.jpg` | voluntariado.html — sección intro | Subir foto grupal del equipo o voluntarios |
| 3 | URL YouTube clínica Jorge Alvarado | voluntariado.html, nosotros.html | Reemplazar `[PLACEHOLDER: URL YouTube...]` con la URL real del video |
| 4 | Banco + tipo de cuenta + N° cuenta | donaciones.html — datos bancarios | Completar los 3 campos bancarios pendientes |
| 5 | URL Reveniu / Donorbox / Payku | donaciones.html — plataformas | Activar cuentas y reemplazar `href="#"` con URL real |

### 🟡 Prioridad MEDIA (logos de programas)

| # | Archivo | Ubicación | Acción requerida |
|---|---------|-----------|------------------|
| 6 | `images/identidades/trova-logo.png` | manual-grafico.html | Subir logo oficial Trova Chilota |
| 7 | `images/identidades/festival-logo.png` | manual-grafico.html | Subir logo oficial Festival de Gaviotas |
| 8 | `images/identidades/rock-logo.png` | manual-grafico.html | Subir logo oficial Gaviotas on the Rock |
| 9 | `images/identidades/estrecho-logo.png` | manual-grafico.html | Subir logo oficial Gaviotas al Estrecho |
| 10 | `images/identidades/bdln-logo.png` | manual-grafico.html | Subir logo oficial Borderline_CL |

### 🟢 Prioridad BAJA (formulario)

| # | Campo | Ubicación | Acción requerida |
|---|-------|-----------|------------------|
| 11 | ID Formspree | contacto.html | Crear cuenta en formspree.io y reemplazar `[PLACEHOLDER-ID-FORMSPREE]` |

---

## Imágenes descargadas desde Unsplash (royalty-free)

Todas las imágenes de marcador de posición fueron descargadas de Unsplash bajo licencia libre.
Son **placeholders visuales** para evaluar el diseño — se recomienda reemplazarlas con fotografías
propias de los eventos, equipo y lugares de la fundación cuando estén disponibles.

| Categoría | Cantidad | Carpeta |
|-----------|----------|---------|
| Heroes de páginas | 11 | `images/hero/` |
| Borderline_CL | 6 | `images/borderline/` |
| Colaboraciones | 3 | `images/colaboraciones/` |
| Áreas de voluntariado | 10 | `images/voluntariado/` |

---

## Cómo subir los cambios a GitHub.com

### Opción A — GitHub.com (sin instalar nada)

1. Ir a [github.com/lsoto-tdg/tierra-de-gaviotas-web](https://github.com/lsoto-tdg/tierra-de-gaviotas-web)
2. Para **archivos de texto** (HTML, CSS, XML, MD):
   - Abrir el archivo en el repositorio → clic en ✏️ "Edit" → pegar el contenido nuevo → clic en "Commit changes"
3. Para **imágenes y archivos binarios**:
   - En la carpeta correspondiente → "Add file" → "Upload files" → arrastrar los JPG/PNG/SVG → "Commit changes"

### Opción B — Git en terminal (recomendado para muchos archivos)

```bash
# Desde la carpeta del proyecto
git add .
git commit -m "feat: correcciones v2 — heroes, Borderline, manual gráfico, voluntariado"
git push origin main
```

### Opción C — GitHub Desktop

1. Abrir GitHub Desktop
2. El panel izquierdo mostrará todos los archivos cambiados
3. Escribir el mensaje de commit en el campo "Summary"
4. Clic en "Commit to main"
5. Clic en "Push origin"

---

## Notas técnicas

- **`css/components-v2.css`** se enlaza después de `components.css` en todos los HTML,
  lo que garantiza que los nuevos estilos tienen mayor especificidad sin necesidad de `!important`.
- Las fotos de Unsplash se descargaron con `?w=1200&fit=crop&q=80` para equilibrar calidad y peso.
- Los logos SVG en `images/aliados/` son placeholders de texto — deben ser reemplazados con
  los logos vectoriales oficiales de cada empresa cuando se disponga de ellos.
- El `.paleta-chip` con color claro (#F4EFE9, #D0E9F5, etc.) ya tiene `color:#352112` y
  `text-shadow:none` inline para garantizar contraste legible del código hex.
- La URL `[PLACEHOLDER: URL YouTube clínica de batería Jorge Alvarado]` aparece en:
  - `voluntariado.html` — sección embajador
  - `nosotros.html` — entrada timeline 2020–2021

---

*Generado automáticamente como parte del proceso de correcciones v2*  
*Fundación Cultural Tierra de Gaviotas · tierradegaviotas.cl*
