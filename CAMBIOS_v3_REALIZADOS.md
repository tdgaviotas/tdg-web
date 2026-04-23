# Cambios v3 — Coherencia tipográfica + Manual Gráfico

## Resumen ejecutivo

Se eliminaron todos los overrides de `font-family` inline en archivos HTML,
moviendo las definiciones tipográficas a clases CSS propias en `components-v2.css`.
El caso especial BDLN (tipografía Orbitron/Dune) se formalizó como `.bdln-logo-text`.
El Manual Gráfico se reestructuró completamente: ahora incluye una narrativa histórica
del origen de la identidad TDG y separa las 6 identidades en dos subsecciones claras
(oficiales disponibles y en desarrollo), con la corrección de paletas para GOTR (3 colores),
GAE (3 colores) y Trova 2018 (3 colores cálidos históricos, sin negro).

---

## Archivos modificados

| Archivo | Cambio |
|---------|--------|
| `css/components-v2.css` | +180 líneas: `.bdln-logo-text`, `.volunteer-circle-number`, `.manual-preview-*`, `.manual-narrativa`, `.manual-subsection`, `.manual-identidad__en-desarrollo` |
| `index.html` | Google Fonts URL reparada (estaba duplicada y malformada) · Span BDLN → `class="bdln-logo-text"` |
| `voluntariado.html` | 3 divs de números circulares → `class="volunteer-circle-number"` (eliminado `font-family` inline) |
| `donaciones.html` | Eliminado `font-family` de 4 reglas en `<style>` interno (`.impacto-item__monto`, `.banco-dato__label`, `.banco-dato__valor`, `.banco-dato__copy`) |
| `contacto.html` | Eliminado `font-family` de 2 reglas en `<style>` interno (`.directorio-tabla th`, `.directorio-tabla td:first-child`) |
| `noticias.html` | Eliminado `font-family` de 3 reglas en `<style>` interno (`.noticias-featured__meta`, `.noticias-featured__title`, `.instrucciones-box__title`) |
| `manual-grafico.html` | Reestructura completa de la sección de identidades (ver sección siguiente) |

---

## Overrides inline eliminados

| Archivo | Línea original | Solución aplicada |
|---------|----------------|-------------------|
| `index.html` | 322 — `style="font-family:'Orbitron'..."` en `<span>` | → `class="bdln-logo-text"` (CSS en components-v2.css) |
| `voluntariado.html` | 206 — `font-family:var(--font-titulo)` en div número 1 | → `.volunteer-circle-number` |
| `voluntariado.html` | 215 — `font-family:var(--font-titulo)` en div número 2 | → `.volunteer-circle-number` |
| `voluntariado.html` | 224 — `font-family:var(--font-titulo)` en div número 3 | → `.volunteer-circle-number` |
| `donaciones.html` | 48 — `.impacto-item__monto { font-family: var(--font-titulo) }` | Línea eliminada — hereda globalmente |
| `donaciones.html` | 95 — `.banco-dato__label { font-family: var(--font-display) }` | Línea eliminada — hereda globalmente |
| `donaciones.html` | 104 — `.banco-dato__valor { font-family: var(--font-display) }` | Línea eliminada — hereda globalmente |
| `donaciones.html` | 115 — `.banco-dato__copy { font-family: var(--font-display) }` | Línea eliminada — hereda globalmente |
| `contacto.html` | 49 — `.directorio-tabla th { font-family: var(--font-display) }` | Línea eliminada — hereda globalmente |
| `contacto.html` | 67 — `.directorio-tabla td:first-child { font-family: var(--font-display) }` | Línea eliminada — hereda globalmente |
| `noticias.html` | 59 — `.noticias-featured__meta { font-family: var(--font-display) }` | Línea eliminada — hereda globalmente |
| `noticias.html` | 67 — `.noticias-featured__title { font-family: var(--font-titulo) }` | Línea eliminada — hereda globalmente |
| `noticias.html` | 90 — `.instrucciones-box__title { font-family: var(--font-display) }` | Línea eliminada — hereda globalmente |
| `manual-grafico.html` | 137, 174, 211, 248, 285 — 5 `<p style="font-family:...">` en previews | → Clases `.manual-preview-text .manual-preview-[fdg/gotr/gae/trova]` + `.bdln-logo-text` |

**Bonus:** URL de Google Fonts en `index.html` fue reparada — estaba duplicada y malformada por concatenaciones de sesiones anteriores.

---

## Manual Gráfico — nuevo modelo

| # | Nombre | Estado | Colores | Descargable |
|---|--------|--------|---------|-------------|
| 1 | Tierra de Gaviotas (TDG) | Oficial | 4 (#352112 · #6B4A2A · #FFB600 · #F4EFE9) | Sí (PNG logo) |
| 2 | Festival de Gaviotas (FDG) | Oficial | 4 (#6B2A8E · #B07BE8 · #FFB600 · #1A0A28) | Sí (pack próximamente) |
| 3 | Gaviotas on the Rock (GOTR) | Oficial | **3** (#0D0D0D · #CC2200 · #F0F0F0) | Sí (pack próximamente) |
| 4 | Gaviotas al Estrecho (GAE) | Oficial | **3** (#0C1E35 · #7AB8D4 · #D0E9F5) | Sí (pack próximamente) |
| 5 | Primer Festival Trova 2018 | En desarrollo | **3 cálidos** (#E85D24 · #FFB600 · #FFFFFF) | No — pieza histórica |
| 6 | BDLN · Borderline_CL | En desarrollo | 4 (expansible por edición) | No — identidad viva |

### Cambios vs. versión anterior

- **GOTR**: Reducido de 4 a 3 colores (eliminado gris plomo #555555)
- **GAE**: Reducido de 4 a 3 colores (eliminado azul intermedio #1B5E8C)
- **Trova 2018**: Paleta completamente corregida — era #E85D24/#1A0A00/#8B3A1A/#F5C89A (incorrecta, incluía café oscuro); ahora es #E85D24/#FFB600/#FFFFFF (histórica real, sin negro)
- **Trova**: Reposicionada como "Primer Festival Trova 2018" con contexto histórico correcto — no es la identidad del festival, sino la primera marca de TDG en 2018
- **Narrativa histórica** añadida: 3 pasos que explican la evolución visual de TDG

---

## Pendientes

- [ ] Obtener archivo `.woff2` de tipografía **"Dune"** para el logo oficial BDLN  
      (instrucciones de implementación están como comentario HTML en `manual-grafico.html`)
- [ ] Confirmar tipografías originales del afiche del Festival Trova 2018 con el equipo fundador
- [ ] Crear/subir logos oficiales: FDG, GOTR, GAE, BDLN (en `images/identidades/`)
- [ ] Activar URLs de packs descargables para las 4 identidades oficiales (reemplazar `href="#"`)
- [ ] Activar URLs de donación: Reveniu, Donorbox, Payku (`donaciones.html`)
- [ ] Subir foto de Jorge Alvarado Torres (`images/equipo/jorge-alvarado.jpg`)
- [ ] Completar datos bancarios en `donaciones.html`

---

## Verificaciones manuales sugeridas

- [ ] Abrir `nosotros.html` → confirmar que se ve idéntico a antes (es la referencia tipográfica)
- [ ] Abrir `index.html` → verificar que el logo "BDLN" en la tarjeta de Borderline usa Orbitron metálico
- [ ] Abrir `voluntariado.html` → confirmar círculos de pasos 1/2/3 visualmente iguales a antes
- [ ] Abrir `donaciones.html` → verificar que los montos y etiquetas bancarias siguen viéndose bien
- [ ] Abrir `manual-grafico.html` → confirmar 4 tarjetas oficiales + 2 en desarrollo diferenciadas
- [ ] Verificar en móvil que la narrativa histórica (3 columnas) colapsa a 1 columna
- [ ] Confirmar que `nosotros.html` sigue sin overrides de `font-family`

---

*Generado como parte del proceso de correcciones v3*  
*Fundación Cultural Tierra de Gaviotas · tierradegaviotas.cl · 2026-04-22*
