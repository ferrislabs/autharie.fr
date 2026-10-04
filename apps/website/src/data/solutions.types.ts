import type { Locale } from '../i18n'

export type SolutionGroup = 'role' | 'stage' | 'industry' | 'migrate'

export interface SolutionCopy {
  /** Page eyebrow and heading context, e.g. "Platform engineers". */
  name: string
  /** Label in the Solutions menu, e.g. "Platform Engineers" or "Migrate from self-hosted Keycloak". */
  menu: string
  /** One line, used in meta description and the "Keep exploring" cards. */
  tagline: string
  hero: { title: string; accent: string; lead: string }
  /** Three situations the reader recognises. */
  challenges: { title: string; description: string }[]
  /** Three to six things Autharie gives them. `icon` is a name from components/icon.astro. */
  benefits: { icon: string; title: string; description: string }[]
  /** Migrate pages only: ordered steps of the move. */
  steps?: { title: string; description: string }[]
}

export interface SolutionDef {
  slug: string
  group: SolutionGroup
  icon: string
  /** Slugs of products (data/products.ts) this audience should look at. */
  products: string[]
  copy: Record<Locale, SolutionCopy>
}
