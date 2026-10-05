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
    '/simulator': '/pricing',
    '/fr/simulator': '/fr/pricing',
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
    optimizeDeps: {
      // Dependencies of the shared UI package. Vite finds them only when a page
      // first imports them, then re-optimizes mid-session; a running dev server
      // can be left serving pages that point at dependencies it no longer has
      // (504 Outdated Optimize Dep) and every React component stops working.
      // Declaring them keeps the set complete from the start.
      include: [
        '@explainer/ui > clsx',
        '@explainer/ui > tailwind-merge',
        '@explainer/ui > class-variance-authority',
        '@explainer/ui > @radix-ui/react-slot',
        '@explainer/ui > @radix-ui/react-dropdown-menu',
        '@explainer/ui > @iconify/react',
      ],
    },
  },
})
