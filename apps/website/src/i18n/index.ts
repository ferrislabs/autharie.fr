export const locales = ['en', 'fr'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && (locales as readonly string[]).includes(value)

/** Locale of the page being rendered, read from the URL prefix. */
export function localeFromUrl(url: URL): Locale {
  const first = url.pathname.split('/')[1]
  return isLocale(first) && first !== defaultLocale ? first : defaultLocale
}

/** Pages are directories, so every internal link ends with a slash (before any #anchor). */
function withTrailingSlash(path: string): string {
  const [, pathname = '', rest = ''] = path.match(/^([^?#]*)(.*)$/) ?? []
  if (pathname.endsWith('/') || /\.[a-z0-9]+$/i.test(pathname)) return path
  return `${pathname}/${rest}`
}

/** Prefix an internal path (`/products/deploy`, `/#offers`) with the locale. */
export function localePath(locale: Locale, path: string): string {
  if (!path.startsWith('/')) return path
  const normalized = withTrailingSlash(path)
  if (locale === defaultLocale) return normalized
  return normalized === '/' ? `/${locale}/` : `/${locale}${normalized}`
}

/** The same page in another locale, for the language switcher and hreflang. */
export function switchPath(pathname: string, to: Locale): string {
  const parts = pathname.split('/')
  const stripped = isLocale(parts[1]) && parts[1] !== defaultLocale ? '/' + parts.slice(2).join('/') : pathname
  return localePath(to, stripped || '/')
}

export const ui = {
  en: {
    products: 'Products',
    solutions: 'Solutions',
    byRole: 'By role',
    byStage: 'By stage',
    byIndustry: 'By industry',
    migrate: 'Migrate',
    footerSolutions: 'Solutions',
    notSure: 'Not sure where to start?',
    talkToUs: 'Talk to us',
    technology: 'Technology',
    madeInFrance: 'Made in France',
    pricing: 'Pricing',
    docs: 'Docs',
    signIn: 'Sign in',
    getStarted: 'Get started',
    menu: 'Menu',
    soon: 'Soon',
    underTheHood: 'Under the hood',
    getStartedGroup: 'Get started',
    howItWorks: 'How it works',
    rust: 'Rust',
    kubernetes: 'Kubernetes and CRDs',
    dataplane: 'Data plane',
    openSource: 'Open source',
    footerProduct: 'Product',
    footerTechnology: 'Technology',
    footerResources: 'Resources',
    footerOpenSource: 'Company',
    about: 'About us',
    simulator: 'Cost comparison',
    deployInstance: 'Deploy an instance',
    earlyAccess: 'Request early access',
    contactUs: 'Contact us',
    console: 'Console',
    documentation: 'Documentation',
    blog: 'Blog',
    apiReference: 'API reference',
    status: 'Status',
    contact: 'Contact',
    footerBlurb: 'Managed Ferriskey and Keycloak instances on Kubernetes, on our clusters or on yours.',
    builtIn: 'Made in France. 100% European.',
    language: 'Language',
  },
  fr: {
    products: 'Produits',
    solutions: 'Solutions',
    byRole: 'Par rôle',
    byStage: 'Par stade',
    byIndustry: 'Par secteur',
    migrate: 'Migrer',
    footerSolutions: 'Solutions',
    notSure: 'Vous ne savez pas par où commencer ?',
    talkToUs: 'Parlons-en',
    technology: 'Technologie',
    madeInFrance: 'Made in France',
    pricing: 'Tarifs',
    docs: 'Docs',
    signIn: 'Se connecter',
    getStarted: 'Commencer',
    menu: 'Menu',
    soon: 'Bientôt',
    underTheHood: 'Sous le capot',
    getStartedGroup: 'Pour démarrer',
    howItWorks: 'Comment ça marche',
    rust: 'Rust',
    kubernetes: 'Kubernetes et CRDs',
    dataplane: 'Data plane',
    openSource: 'Open source',
    footerProduct: 'Produit',
    footerTechnology: 'Technologie',
    footerResources: 'Ressources',
    footerOpenSource: 'Société',
    about: 'À propos',
    simulator: 'Comparateur de coût',
    deployInstance: 'Déployer une instance',
    earlyAccess: 'Demander l’accès anticipé',
    contactUs: 'Nous contacter',
    console: 'Console',
    documentation: 'Documentation',
    blog: 'Blog',
    apiReference: 'Référence API',
    status: 'Statut',
    contact: 'Contact',
    footerBlurb: 'Des instances Ferriskey et Keycloak gérées sur Kubernetes, sur nos clusters ou sur les vôtres.',
    builtIn: 'Conçu en France. 100 % européen.',
    language: 'Langue',
  },
} as const

export type UiKey = keyof (typeof ui)['en']
export const useUi = (locale: Locale) => (key: UiKey): string => ui[locale][key]
