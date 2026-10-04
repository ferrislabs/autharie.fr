import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { thumbnailIntegration } from '@explainer/thumbnail/integration'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import { thumbnailPages } from './src/seo/thumbnail-pages'

/** Absolute URLs (canonical, Open Graph, sitemap) need the real origin. */
export const SITE = process.env.PUBLIC_WEBSITE_URL || 'https://autharie.fr'

export default defineConfig({
  site: SITE,
  redirects: {
    '/europe': '/about',
    '/fr/europe': '/fr/about',
  },
  integrations: [
    react(),
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', fr: 'fr' } },
      filter: (page) => !page.includes('/404'),
    }),
    thumbnailIntegration({
      appName: 'Autharie',
      variant: 'brand',
      content: { type: 'static', pages: thumbnailPages },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    envDir: '../../',
  },
})
