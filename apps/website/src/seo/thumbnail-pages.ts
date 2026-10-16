import type { StaticPage } from '@explainer/thumbnail/integration'

/**
 * One social card per page, generated at build time from the same copy the
 * pages use, so a title edited on a page changes its card too.
 */

const home = {
  en: {
    title: 'One identity platform',
    accent: 'for users, services and AI agents.',
    description: 'A complete IAM built on Ferriskey, hosted in Europe.',
  },
  fr: {
    title: 'Une plateforme d’identité',
    accent: 'pour humains, services et agents IA.',
    description: 'Un IAM complet construit sur Ferriskey, hébergé en Europe.',
  },
}

const fixed = {
  en: {
    technology: {
      title: 'Boring where it counts,',
      accent: 'built to last.',
      description: 'Rust, Kubernetes, open source and a data plane you can place anywhere.',
    },
    contact: {
      title: 'Tell us what you run,',
      accent: 'we will take it from there.',
      description: 'The beta, a migration or a security question.',
    },
  },
  fr: {
    technology: {
      title: 'Sobre là où ça compte,',
      accent: 'conçu pour durer.',
      description: 'Rust, Kubernetes, open source et un data plane que vous placez où vous voulez.',
    },
    contact: {
      title: 'Dites-nous ce que vous faites tourner,',
      accent: 'nous nous occupons du reste.',
      description: 'La bêta, une migration ou une question de sécurité.',
    },
  },
}

const prefix = { en: '', fr: '/fr' } as const

export const thumbnailPages: StaticPage[] = (['en', 'fr'] as const).flatMap((locale) => {
  const p = prefix[locale]
  return [
    { path: locale === 'en' ? '/' : '/fr', locale, ...home[locale] },
    ...(['technology', 'contact'] as const).map((slug) => ({
      path: `${p}/${slug}`,
      locale,
      ...fixed[locale][slug],
    })),
  ]
})
