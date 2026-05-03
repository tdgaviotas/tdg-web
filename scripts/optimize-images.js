/**
 * Optimiza imágenes JPG en public/images/ usando sharp.
 * Convierte imágenes > 100 KB a calidad 80-85 y genera versiones WebP.
 * Uso: node scripts/optimize-images.js
 */
import { readdir, stat, writeFile, readFile } from 'node:fs/promises';
import { join, dirname, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const imagesDir = join(__dirname, '..', 'public', 'images');
const SIZE_THRESHOLD = 100 * 1024; // 100 KB
const JPG_QUALITY = 82;

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(jpe?g|png)$/i.test(entry.name)) yield full;
  }
}

async function optimizeImage(filePath) {
  const originalSize = (await stat(filePath)).size;
  if (originalSize <= SIZE_THRESHOLD) return null;

  const ext = extname(filePath).toLowerCase();
  const dir = dirname(filePath);
  const isJpg = /\.jpe?g$/i.test(ext);

  // Comprimir in-place (git preserva el original)
  let compressedBuffer;
  try {
    const inputBuffer = await readFile(filePath);
    compressedBuffer = isJpg
      ? await sharp(inputBuffer).jpeg({ quality: JPG_QUALITY, mozjpeg: true }).toBuffer()
      : await sharp(inputBuffer).png({ quality: JPG_QUALITY, palette: true }).toBuffer();

    await writeFile(filePath, compressedBuffer);
  } catch (err) {
    console.warn(`  ⚠ Error al procesar ${basename(filePath)}: ${err.message}`);
    return null;
  }

  const ratio = ((1 - compressedBuffer.length / originalSize) * 100).toFixed(0);
  const origKB = (originalSize / 1024).toFixed(0);
  const newKB = (compressedBuffer.length / 1024).toFixed(0);
  return { file: basename(filePath), origKB, newKB, ratio, dir: basename(dir) };
}

async function main() {
  console.log('Buscando imágenes > 100 KB en public/images/...\n');

  const results = [];
  for await (const img of walk(imagesDir)) {
    const result = await optimizeImage(img);
    if (result) results.push(result);
  }

  if (results.length === 0) {
    console.log('No se encontraron imágenes que optimizar.');
    return;
  }

  console.log('Resultados de optimización:\n');
  console.log('Directorio          | Archivo                     | Original | Nueva   | Reducción');
  console.log('-'.repeat(90));

  let totalOrig = 0;
  let totalNew = 0;
  for (const r of results) {
    console.log(`${r.dir.padEnd(20)}| ${r.file.padEnd(28)}| ${(r.origKB + ' KB').padStart(8)} | ${(r.newKB + ' KB').padStart(7)} | ${(r.ratio + '%').padStart(7)}`);
    totalOrig += parseInt(r.origKB);
    totalNew += parseInt(r.newKB);
  }

  console.log('-'.repeat(90));
  const totalRatio = ((1 - totalNew / totalOrig) * 100).toFixed(0);
  console.log(`TOTAL: ${results.length} imágenes | ${totalOrig} KB → ${totalNew} KB | -${totalRatio}%`);
  console.log('\nPara restaurar originales: git checkout -- public/images/');
}

main().catch(err => { console.error('Error:', err.message); process.exit(1); });
