// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  fonts: [
    {
      name: 'Cormorant Garamond',
      provider: fontProviders.google(),
      cssVariable: '--font-cormorant-garamond',
      weights: [600, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Georgia', 'Times New Roman', 'serif'],
    },
    {
      name: 'Playfair Display',
      provider: fontProviders.google(),
      cssVariable: '--font-playfair-display',
      weights: [400, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      name: 'Source Serif 4',
      provider: fontProviders.google(),
      cssVariable: '--font-source-serif-4',
      weights: [300, 400, 600],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      name: 'Orbitron',
      provider: fontProviders.google(),
      cssVariable: '--font-orbitron',
      weights: [600, 700, 800],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
  ],
  devToolbar: { enabled: false },
});
