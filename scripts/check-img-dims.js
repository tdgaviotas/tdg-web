import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const astroDir = 'src';
const publicDir = 'public';

function findAstroFiles(dir) {
  const files = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...findAstroFiles(full));
    else if (e.name.endsWith('.astro')) files.push(full);
  }
  return files;
}

async function main() {
  const astroFiles = findAstroFiles(astroDir);
  const results = [];

  for (const file of astroFiles) {
    const content = readFileSync(file, 'utf8');
    const imgRegex = /<img\s+[^>]*src="([^"]+)"[^>]*>/g;
    let match;
    while ((match = imgRegex.exec(content)) !== null) {
      const src = match[1];
      if (src.includes('youtube.com') || src.includes('ytimg.com')) continue;
      const imgPath = join(publicDir, src);
      if (!existsSync(imgPath)) continue;

      try {
        const meta = await sharp(imgPath).metadata();
        const hasWidth = match[0].includes('width=');
        const hasHeight = match[0].includes('height=');
        results.push({
          file: file,
          src: src,
          w: meta.width,
          h: meta.height,
          hasWidth,
          hasHeight,
        });
      } catch {
        // skip unreadable images
      }
    }
  }

  const byFile = {};
  for (const r of results) {
    if (!byFile[r.file]) byFile[r.file] = [];
    byFile[r.file].push(r);
  }

  for (const [file, imgs] of Object.entries(byFile)) {
    console.log('\n' + file + ':');
    for (const img of imgs) {
      const status = img.hasWidth && img.hasHeight ? '✓' : '✗ FALTA';
      console.log(`  ${status} ${img.src} → ${img.w}x${img.h}`);
    }
  }

  const total = results.length;
  const missing = results.filter((r) => !r.hasWidth || !r.hasHeight).length;
  console.log(`\n\nTotal: ${total} imágenes, ${missing} sin width/height`);
}

main().catch((e) => console.error(e));
