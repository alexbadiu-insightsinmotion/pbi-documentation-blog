// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://alexbadiu-insightsinmotion.github.io',
  base: '/pbi-documentation-blog',
  vite: {
    plugins: [tailwindcss()],
  },
});
