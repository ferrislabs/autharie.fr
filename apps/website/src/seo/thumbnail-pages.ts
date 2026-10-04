import { products } from '../data/products'
import { productsFr } from '../data/products.fr'
import { solutions } from '../data/solutions'
import type { StaticPage } from '@explainer/thumbnail/integration'

/**
 * One social card per page, generated at build time from the same copy the
 * pages use, so a title edited on a page changes its card too.
 */

const home = {
  en: {
    eyebrow: 'Early access',
    title: 'An identity provider of your own,',
    accent: 'operated for you.',
    description:
      'Managed Ferriskey and Keycloak, on our clusters or on yours.',
  },
  fr: {
    eyebrow: 'Accès anticipé',
    title: 'Un fournisseur d’identité à vous,',
    accent: 'exploité pour vous.',
    description:
      'Ferriskey et Keycloak gérés, sur nos clusters ou sur les vôtres.',
  },
}

const fixed = {
  en: {
    technology: {
      eyebrow: 'Technology',
      title: 'Boring where it counts,',
      accent: 'built to last.',
      description: 'Rust, Kubernetes, open source and a data plane you can place anywhere.',
    },
    about: {
      eyebrow: 'About us',
      title: 'Identity is a hard problem.',
      accent: 'We make it ours, not yours.',
      description: 'A French company that builds and operates identity providers.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Tell us what you run,',
      accent: 'we will take it from there.',
      description: 'Early access, pricing, a migration or a security question.',
    },
    simulator: {
      eyebrow: 'Simulator',
      title: 'What does it really cost to run',
      accent: 'your own identity provider?',
      description: 'Infrastructure, engineering time and on-call, with your own numbers.',
    },
  },
  fr: {
    technology: {
      eyebrow: 'Technologie',
      title: 'Sobre là où ça compte,',
      accent: 'conçu pour durer.',
      description: 'Rust, Kubernetes, open source et un data plane que vous placez où vous voulez.',
    },
    about: {
      eyebrow: 'À propos',
      title: 'L’identité est un problème difficile.',
      accent: 'Nous le prenons à notre charge.',
      description: 'Une société française qui construit et exploite des fournisseurs d’identité.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Dites-nous ce que vous faites tourner,',
      accent: 'nous nous occupons du reste.',
      description: 'Accès anticipé, tarifs, une migration ou une question de sécurité.',
    },
    simulator: {
      eyebrow: 'Simulateur',
      title: 'Que coûte vraiment l’exploitation',
      accent: 'de votre fournisseur d’identité ?',
      description: 'Infrastructure, temps d’ingénierie et astreinte, avec vos propres chiffres.',
    },
  },
}

const prefix = { en: '', fr: '/fr' } as const
const word = { en: { product: 'Product', solutions: 'Solutions' }, fr: { product: 'Produit', solutions: 'Solutions' } }

export const thumbnailPages: StaticPage[] = (['en', 'fr'] as const).flatMap((locale) => {
  const p = prefix[locale]
  return [
    { path: locale === 'en' ? '/' : '/fr', locale, ...home[locale] },
    ...(['technology', 'about', 'contact', 'simulator'] as const).map((slug) => ({
      path: `${p}/${slug}`,
      locale,
      ...fixed[locale][slug],
    })),
    ...products.map((product) => {
      const copy = locale === 'fr' ? { ...product, ...productsFr[product.slug] } : product
      return {
        path: `${p}/products/${product.slug}`,
        locale,
        eyebrow: `${word[locale].product} · ${product.name}`,
        title: copy.hero.title,
        accent: copy.hero.accent,
        description: copy.tagline,
      }
    }),
    ...solutions.map((solution) => {
      const c = solution.copy[locale]
      return {
        path: `${p}/solutions/${solution.slug}`,
        locale,
        eyebrow: `${word[locale].solutions} · ${c.name}`,
        title: c.hero.title,
        accent: c.hero.accent,
        description: c.tagline,
      }
    }),
  ]
})
