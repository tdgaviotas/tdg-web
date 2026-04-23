# Cambios v4 — Planetas BDLN + Clínica a Programas + Colaboraciones en video

## Resumen ejecutivo

Tres cambios coordinados que enriquecen la narrativa del universo BDLN y mejoran la
presentación audiovisual del sitio. Se agregaron los nombres de los planetas del
universo Borderline_CL en la galería de capítulos (`programas.html`) y en el Manual
Gráfico (`manual-grafico.html`). El link a la clínica de batería de Jorge Alvarado
Torres fue movido desde `voluntariado.html` (donde era un enlace de texto) hacia
`programas.html` (como tarjeta de video con thumbnail de YouTube). Por último, las
tres tarjetas de Colaboraciones Externas se convirtieron de imágenes estáticas a
reproductores de video con thumbnail interactivo.

---

## Archivos modificados

| Archivo | Cambio |
|---------|--------|
| `css/components-v2.css` | +~130 líneas: `.bdln-cap__num/planet/subtitle`, `.bdln-planetas-*`, `.video-thumbnail`, `.colab-card--video`, `.colab-card__media`, `.colab-card__video-link`, `.colab-card--pendiente` |
| `programas.html` | BDLN gallery: figcaptions reestructurados con planeta/subtítulo · Taller card 3: imagen estática → video YouTube · Colaboraciones: 3 tarjetas → versiones con video |
| `voluntariado.html` | Eliminado párrafo con link a clínica de batería (ahora vive en Programas) |
| `manual-grafico.html` | Insertado bloque `.bdln-planetas-conocidos` dentro de la tarjeta BDLN |

---

## Detalle por cambio

### CAMBIO 1 — Nombres de planetas BDLN

**`programas.html` — Galería de capítulos:**

| Capítulo | Antes | Después |
|----------|-------|---------|
| I | `<figcaption>Capítulo I</figcaption>` | Etiqueta `Capítulo I` + planeta `[PLACEHOLDER]` |
| II | `<figcaption>Capítulo II</figcaption>` | Etiqueta `Capítulo II` + planeta `El planeta helado` (color azul `#A8D8EA`) |
| III | `<figcaption>Capítulo III</figcaption>` | Etiqueta `Capítulo III` + planeta `IGNIA` + subtítulo `El planeta del eterno verano` (color naranjo `#F4A261`) |

**`manual-grafico.html` — Tarjeta BDLN:**
- Insertado bloque `div.bdln-planetas-conocidos` con lista de 3 planetas
- Capítulo I muestra placeholder, Capítulo II en azul helado, Capítulo III (IGNIA) en naranjo solar

**CSS añadido (`.bdln-cap__*` + `.bdln-planetas-*`):**
- `.bdln-cap__num` — tipografía `Courier New`, monoespaciada, tamaño pequeño, gris translúcido
- `.bdln-cap__planet` — tipografía `Orbitron`, bold, plata clara
- `.bdln-cap__subtitle` — tipografía cuerpo, cursiva, ámbar translúcido
- `.bdln-cap--frio` y `.bdln-planeta--frio` → color `#A8D8EA` (azul helado)
- `.bdln-cap--ignia` y `.bdln-planeta--ignia` → color `#F4A261` (naranjo solar)

---

### CAMBIO 2 — Clínica de Batería: de voluntariado a programas

**`voluntariado.html`:** Eliminado el párrafo `<p class="embajador__desc">` que contenía
el link a la clínica de batería vía streaming (era el tercer párrafo del embajador Jorge
Alvarado Torres). La sección del embajador queda con: foto, tag/nombre, párrafo de México,
párrafo de puertas internacionales, y ubicación. Más limpia y sin links placeholder sueltos.

**`programas.html` — Taller card 3:** Reemplazada la imagen estática `clinica-streaming.jpg`
por una tarjeta de video con thumbnail YouTube interactivo. La card mantiene el mismo texto
descriptivo. **Requiere rellenar `[ID_VIDEO_YOUTUBE]`** con el ID real del video de la clínica.

---

### CAMBIO 3 — Colaboraciones Externas en video

Las 3 tarjetas de `colaboraciones-grid` pasaron de imagen estática a estructura de video:

| Card | Estado | URL YouTube |
|------|--------|-------------|
| Manuel García | ✅ Video real | `https://www.youtube.com/watch?v=CK1GXlU0ayM` |
| Festival de Gaviotas por Tomy | ⚠️ Placeholder | Reemplazar `[ID_VIDEO_FDG_TOMY]` |
| Próximamente | ⏳ Pendiente | Sin video — muestra ícono de cámara |

Cada tarjeta con video real/placeholder incluye:
- `div.colab-card__media` con `a.video-thumbnail` (thumbnail + botón play SVG)
- `a.colab-card__video-link` "Ver en YouTube" dentro del body de la tarjeta

---

## Cómo funciona el thumbnail de YouTube (para el equipo no técnico)

YouTube genera automáticamente miniaturas de todos sus videos públicos en una URL fija:

```
https://img.youtube.com/vi/[ID_DEL_VIDEO]/hqdefault.jpg
```

El **ID del video** son los caracteres después del `?v=` en la URL del video.
Por ejemplo, si el video está en:
```
https://www.youtube.com/watch?v=CK1GXlU0ayM
```
El ID es `CK1GXlU0ayM` y el thumbnail es:
```
https://img.youtube.com/vi/CK1GXlU0ayM/hqdefault.jpg
```

**No se necesita API key ni cuenta de Google** — la imagen es pública y gratuita.
Para mejor calidad, usar `maxresdefault.jpg` en lugar de `hqdefault.jpg`
(aunque no todos los videos tienen versión maxres).

---

## Placeholders pendientes de rellenar

- [ ] **Clínica de Batería (Taller card 3):** Reemplazar `[ID_VIDEO_YOUTUBE]` en `programas.html`
      con el ID real del video de la clínica de Jorge Alvarado Torres
- [ ] **Festival por Tomy (Colaboraciones card 2):** Reemplazar `[ID_VIDEO_FDG_TOMY]` en `programas.html`
      con el ID del video correspondiente
- [ ] **Capítulo I BDLN:** Reemplazar `[PLACEHOLDER: Nombre del primer planeta]` en `programas.html`
      y `manual-grafico.html` con el nombre real del planeta del primer capítulo
- [ ] **Colaboración pendiente (card 3):** Completar nombre, tag y descripción de la próxima colaboración

---

## Pendientes heredados (v3)

- [ ] Obtener archivo `.woff2` de tipografía **"Dune"** para el logo oficial BDLN
- [ ] Confirmar tipografías originales del afiche del Festival Trova 2018
- [ ] Crear/subir logos oficiales: FDG, GOTR, GAE, BDLN (`images/identidades/`)
- [ ] Activar URLs de packs descargables (reemplazar `href="#"` en Manual Gráfico)
- [ ] Activar URLs de donación: Reveniu, Donorbox, Payku (`donaciones.html`)
- [ ] Subir foto de Jorge Alvarado Torres (`images/equipo/jorge-alvarado.jpg`)
- [ ] Completar datos bancarios en `donaciones.html`
- [ ] Subir fotos de capítulos BDLN (`images/borderline/capitulo-1/2/3.jpg`)

---

## Verificaciones manuales sugeridas

- [ ] Abrir `programas.html` → sección Talleres → card 3 muestra thumbnail de video (roto hasta rellenar ID)
- [ ] Abrir `programas.html` → galería BDLN → Capítulo II en azul, Capítulo III en naranjo con subtítulo
- [ ] Abrir `programas.html` → Colaboraciones → card Manuel García muestra thumbnail del video real
- [ ] Abrir `programas.html` → Colaboraciones → card 3 muestra ícono de cámara y borde punteado
- [ ] Abrir `voluntariado.html` → sección Embajador Jorge Alvarado → sin mención a clínica de batería
- [ ] Abrir `manual-grafico.html` → tarjeta BDLN → lista de planetas visible (I pendiente, II azul, III naranjo)
- [ ] Verificar hover en thumbnails de video: imagen se aclara y botón play crece levemente
- [ ] Verificar en móvil que los thumbnails mantienen proporción 16:9 / 16:10

---

*Generado como parte del proceso de correcciones v4*
*Fundación Cultural Tierra de Gaviotas · tierradegaviotas.cl · 2026-04-22*
