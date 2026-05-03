import eslint from '@eslint/js';
import astro from 'eslint-plugin-astro';

export default [
  eslint.configs.recommended,
  ...astro.configs.recommended,

  // Archivos .astro con soporte TypeScript
  {
    files: ['**/*.astro'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
  },

  // main.js — define $ y $$ para components.js
  {
    files: ['public/js/main.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        document: 'readonly',
        window: 'readonly',
        IntersectionObserver: 'readonly',
        performance: 'readonly',
        getComputedStyle: 'readonly',
        requestAnimationFrame: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-undef': 'error',
    },
  },

  // components.js — $ y $$ vienen de main.js
  {
    files: ['public/js/components.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        $: 'writable',
        $$: 'writable',
        document: 'readonly',
        navigator: 'readonly',
        IntersectionObserver: 'readonly',
        setTimeout: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      'no-undef': 'error',
    },
  },

  // Scripts de Node.js
  {
    files: ['scripts/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  // Archivos de configuración (Node.js + ESM)
  {
    files: ['*.config.*', '*.mjs'],
    languageOptions: {
      globals: {
        console: 'readonly',
        process: 'readonly',
      },
    },
  },

  // Ignorar
  {
    ignores: ['dist/', '.astro/', 'node_modules/'],
  },
];
