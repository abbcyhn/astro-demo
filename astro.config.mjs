// @ts-check
import { defineConfig } from 'astro/config';
import { config } from 'dotenv';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

import react from '@astrojs/react';

import vercel from '@astrojs/vercel';

// Load environment variables
config();

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    define: {
      'process.env.MONGODB_URI': JSON.stringify(process.env.MONGODB_URI),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.BREVO_API_KEY': JSON.stringify(process.env.BREVO_API_KEY),
    }
  },

  integrations: [mdx(), react()],

  adapter: vercel()
});