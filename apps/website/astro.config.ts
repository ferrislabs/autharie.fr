import react from '@astrojs/react'
import { thumbnailIntegration } from '@explainer/thumbnail/integration'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: process.env.PUBLIC_WEBSITE_URL || undefined,
  redirects: {
    '/europe': '/about',
    '/fr/europe': '/fr/about',
  },
  integrations: [
    react(),
    thumbnailIntegration({
      appName: 'Autharie',
      content: {
        type: 'static',
        pages: [
          {
            path: '/',
            title: 'Autharie',
            description:
              'Managed Ferriskey and Keycloak instances on Kubernetes, on our clusters or on yours.',
          },
        ],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    envDir: '../../',
  },
})
