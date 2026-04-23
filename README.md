# Sitio Web — Fundación Cultural Tierra de Gaviotas

Sitio oficial de la **Fundación Cultural Tierra de Gaviotas** (tierradegaviotas.cl).  
100% estático: HTML + CSS + JavaScript vanilla. Hosting en **Cloudflare Pages**.

---

## Estructura de archivos

```
/
├── index.html          → Página principal
├── nosotros.html       → Historia, misión, directorio, acreditaciones
├── programas.html      → Festival, talleres, vinculación territorial
├── voluntariado.html   → Cómo unirse, embajador cultural
├── noticias.html       → Blog / noticias
├── donaciones.html     → Plataformas de donación
├── contacto.html       → Formulario y directorio de emails
├── css/
│   ├── main.css        → Variables, tipografía, layout global
│   ├── components.css  → Todos los componentes UI
│   └── responsive.css  → Media queries mobile-first
├── js/
│   ├── main.js         → Navbar, contadores, scroll reveal
│   └── components.js   → Acordeón, lightbox, tabs
├── images/             → Ver images/PLACEHOLDER.md para guía
│   ├── logo/
│   ├── hero/
│   ├── eventos/
│   ├── talleres/
│   ├── equipo/
│   └── noticias/
├── _headers            → Headers de seguridad (Cloudflare Pages)
├── _redirects          → Redirecciones HTTP → HTTPS
├── robots.txt          → Instrucciones a crawlers
├── sitemap.xml         → Mapa del sitio para SEO
├── favicon.svg         → Favicon SVG
├── site.webmanifest    → PWA manifest para móviles
└── README.md           → Este archivo
```

---

## Cómo actualizar el sitio (sin código)

Todo se edita desde GitHub. No se necesita instalar nada.

### 1. Cambiar un texto

1. Ir al repositorio en GitHub
2. Hacer clic en el archivo HTML que quieres editar (ej. `index.html`)
3. Clic en el ícono del **lápiz** (✏️) arriba a la derecha
4. Buscar el texto a cambiar (Ctrl+F en el navegador)
5. Editar el texto
6. Clic en **"Commit changes"** → **"Commit directly to main"**
7. El sitio se actualiza en **3-5 minutos** automáticamente

### 2. Agregar una noticia

1. Abrir `noticias.html` en GitHub
2. Clic en el ícono del lápiz
3. Buscar `<!-- INICIO NOTICIA -->`
4. **Copiar** el bloque completo hasta `<!-- FIN NOTICIA -->`
5. **Pegarlo justo antes** del primer bloque existente
6. Cambiar: título, categoría, fecha, extracto e imagen
7. Commit → listo

### 3. Subir una imagen nueva

1. En GitHub, ir a la carpeta correspondiente (ej. `images/eventos/`)
2. Clic en **"Add file"** → **"Upload files"**
3. Subir la imagen con el **mismo nombre** que está en el HTML
4. Clic en **"Commit changes"**

> Tip: Comprimir las imágenes antes de subir en [squoosh.app](https://squoosh.app). Objetivo: menos de 400KB por imagen.

### 4. Actualizar los links de donación

1. Abrir `donaciones.html`
2. Buscar `[PLACEHOLDER: URL Reveniu]` (o Donorbox, Payku)
3. Reemplazar `href="#"` con la URL real de cada plataforma
4. Commit

### 5. Completar los datos bancarios

1. Abrir `donaciones.html`
2. Buscar `[PLACEHOLDER: Nombre del banco]`
3. Completar banco, tipo de cuenta y número de cuenta
4. Commit

### 6. Activar el formulario de contacto

1. Registrarse en [formspree.io](https://formspree.io) con `admin@tierradegaviotas.cl`
2. Crear un nuevo formulario → copiar el ID (ej. `xyzabc12`)
3. Abrir `contacto.html`
4. Buscar `[PLACEHOLDER-ID-FORMSPREE]`
5. Reemplazar con tu ID: `action="https://formspree.io/f/xyzabc12"`
6. Commit

---

## Placeholders pendientes (prioridad alta)

| Archivo | Qué falta | Dónde buscarlo |
|---|---|---|
| `images/logo/*.png` | Todos los logos TDG | Assets de diseño TDG |
| `images/hero/hero-chiloe.jpg` | Foto hero homepage | Archivo fotográfico TDG |
| `images/equipo/*.jpg` | Fotos del directorio | Fotos personales de cada miembro |
| `images/eventos/*.jpg` | Fotos de festivales y eventos | Archivo fotográfico TDG |
| `donaciones.html` | URLs de Reveniu, Donorbox, Payku | Admin financiero TDG |
| `donaciones.html` | Datos bancarios completos | Tesorero TDG |
| `contacto.html` | ID de Formspree | Admin digital TDG |
| `nosotros.html` | URLs LinkedIn del directorio | Cada miembro del directorio |
| `noticias.html` | Noticias reales | Equipo de comunicaciones |
| `index.html` | Testimonio real de artista | Equipo de RRPP |
| `index.html` | Próximos eventos (fechas reales) | Equipo de producción |
| `programas.html` | Nombres de artistas en colaboraciones externas | Equipo TDG |
| `apple-touch-icon.png` | Ícono 180×180px | Diseñador TDG |
| `images/og-image.jpg` | Imagen Open Graph 1200×630px | Diseñador TDG |

---

## Publicación en Cloudflare Pages

### Primera vez (conexión con GitHub):

1. Ir a [cloudflare.com](https://cloudflare.com) → Login
2. Panel izquierdo: **Workers & Pages** → **Create** → **Pages**
3. Clic en **"Connect to Git"** → Seleccionar GitHub
4. Elegir el repositorio `tierra-de-gaviotas-web`
5. Configuración del build:
   - **Framework preset:** None
   - **Build command:** (dejar vacío)
   - **Build output directory:** `/` (raíz)
6. Clic en **"Save and Deploy"**
7. El sitio queda en `https://tierra-de-gaviotas-web.pages.dev`

### Dominio personalizado:

1. En el proyecto de Pages → **Custom Domains** → **Set up a custom domain**
2. Ingresar `tierradegaviotas.cl`
3. Seguir instrucciones para apuntar el DNS en el registrador del dominio

### Actualizaciones automáticas:

Cada vez que se hace un commit en la rama `main`, Cloudflare Pages redeploya automáticamente. No se necesita hacer nada más.

---

## Verificación de seguridad (anual recomendado)

Después de publicar, verificar en:

1. **Mozilla Observatory:** https://developer.mozilla.org/en-US/observatory  
   → Ingresar `tierradegaviotas.cl` → Objetivo: nota A o A+

2. **Security Headers:** https://securityheaders.com  
   → Objetivo: nota A

3. **SSL Labs:** https://www.ssllabs.com/ssltest/  
   → Objetivo: A+ (Cloudflare lo garantiza automáticamente)

4. **Google Rich Results:** https://search.google.com/test/rich-results  
   → Verificar que el Schema JSON-LD sea válido

5. **PageSpeed Insights:** https://pagespeed.web.dev  
   → Objetivo: 90+ en móvil y desktop

---

## Datos institucionales

| Campo | Valor |
|---|---|
| Nombre legal | Fundación Cultural Tierra de Gaviotas |
| RUT | 65.216.893-0 |
| Inscripción | N° 336270 — SRCeI |
| Fecha constitución | 17-10-2022 |
| Representante legal | Luis Miguel Soto Almonacid |
| Dominio | tierradegaviotas.cl |
| WhatsApp | +56 9 9104 2738 |
| Email contacto | contacto@tierradegaviotas.cl |
| Email admin | admin@tierradegaviotas.cl |

---

## Contacto técnico

Para dudas técnicas sobre el sitio web, escribir a:  
**admin@tierradegaviotas.cl**

---

*Sitio desarrollado con HTML5, CSS3 y JavaScript vanilla. Sin dependencias externas ni frameworks.*
