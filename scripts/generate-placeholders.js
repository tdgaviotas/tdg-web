/**
 * Genera placeholders para imágenes faltantes del proyecto TDG.
 * - Logos: copia desde los PNG existentes con los nombres esperados.
 * - Fotos de equipo: genera JPG con silueta de persona desde SVG.
 * Uso: node scripts/generate-placeholders.js
 */
import { copyFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const imagesDir = join(publicDir, 'images');

// ─── SVG de silueta de persona (cabeza + hombros, profesional) ───
const personSvg = (color = '#6B4A2A', bg = '#F4EFE9') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300">
  <rect width="300" height="300" fill="${bg}"/>
  <g transform="translate(150,150)">
    <!-- Cabeza -->
    <circle cx="0" cy="-45" r="38" fill="${color}" opacity="0.35"/>
    <!-- Hombros / cuerpo -->
    <path d="M-80,70 C-75,10 -40,-5 0,0 C40,-5 75,10 80,70 C85,120 90,160 90,160 L-90,160 C-90,160 -85,120 -80,70Z" fill="${color}" opacity="0.20"/>
  </g>
</svg>`;

// ─── SVG de equipo (grupo de 4 siluetas) ───
const teamSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 350" width="800" height="350">
  <rect width="800" height="350" fill="#F4EFE9"/>
  <g transform="translate(150,140)"><circle cx="0" cy="-35" r="30" fill="#6B4A2A" opacity="0.30"/><path d="M-60,55 C-55,10 -30,-2 0,0 C30,-2 55,10 60,55 C65,95 68,125 68,125 L-68,125 C-68,125 -65,95 -60,55Z" fill="#6B4A2A" opacity="0.16"/></g>
  <g transform="translate(320,140)"><circle cx="0" cy="-38" r="32" fill="#6B4A2A" opacity="0.30"/><path d="M-65,55 C-58,8 -32,-3 0,0 C32,-3 58,8 65,55 C70,98 73,130 73,130 L-73,130 C-73,130 -70,98 -65,55Z" fill="#6B4A2A" opacity="0.16"/></g>
  <g transform="translate(490,140)"><circle cx="0" cy="-33" r="28" fill="#6B4A2A" opacity="0.30"/><path d="M-55,55 C-50,12 -28,-2 0,0 C28,-2 50,12 55,55 C58,92 60,120 60,120 L-60,120 C-60,120 -58,92 -55,55Z" fill="#6B4A2A" opacity="0.16"/></g>
  <g transform="translate(640,140)"><circle cx="0" cy="-36" r="31" fill="#6B4A2A" opacity="0.30"/><path d="M-62,55 C-56,9 -30,-3 0,0 C30,-3 56,9 62,55 C66,96 69,128 69,128 L-69,128 C-69,128 -66,96 -62,55Z" fill="#6B4A2A" opacity="0.16"/></g>
</svg>`;

async function generatePersonJpg(filename, text = '') {
  const svg = personSvg();
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 85 })
    .toFile(join(imagesDir, 'equipo', filename));
  console.log('  ✓ equipo/' + filename);
}

async function main() {
  // ─── LOGOS: copiar desde los existentes ───
  console.log('Logos:');

  // Horizontal claro → copiar tdg1.png
  await copyFile(
    join(imagesDir, 'logo', 'tdg1.png'),
    join(imagesDir, 'logo', 'TDG_1_Horizontal_-_Para_fondo_claro.png')
  );
  console.log('  ✓ logo/TDG_1_Horizontal_-_Para_fondo_claro.png (copiado de tdg1.png)');

  // Vertical claro → copiar tdg4.png
  await copyFile(
    join(imagesDir, 'logo', 'tdg4.png'),
    join(imagesDir, 'logo', 'TDG_1_Vertical_-_Para_fondo_claro.png')
  );
  console.log('  ✓ logo/TDG_1_Vertical_-_Para_fondo_claro.png (copiado de tdg4.png)');

  // Vertical oscuro → copiar tdg5.png (variante vertical)
  await copyFile(
    join(imagesDir, 'logo', 'tdg5.png'),
    join(imagesDir, 'logo', 'TDG_1_Vertical_-_Para_fondo_oscuro.png')
  );
  console.log('  ✓ logo/TDG_1_Vertical_-_Para_fondo_oscuro.png (copiado de tdg5.png)');

  // ─── FOTOS DE PERSONAS ───
  console.log('\nFotos de equipo:');
  const personas = [
    'luis-soto.jpg',
    'claudio-aguila.jpg',
    'daniela-vera.jpg',
    'renato-mansilla.jpg',
    'jorge-alvarado.jpg',
    'claudio-constanzo.jpg',
  ];

  for (const p of personas) {
    await generatePersonJpg(p);
  }

  // ─── FOTO DE EQUIPO ───
  console.log('\nFoto de equipo:');
  await sharp(Buffer.from(teamSvg))
    .jpeg({ quality: 85 })
    .toFile(join(imagesDir, 'equipo', 'equipo-tdg.jpg'));
  console.log('  ✓ equipo/equipo-tdg.jpg');

  console.log('\nListo.');
}

main().catch(err => { console.error('Error:', err.message); process.exit(1); });
