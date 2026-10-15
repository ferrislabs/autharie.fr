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

/** Prefix an internal path (`/technology`, `/#product`) with the locale. */
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
    product: 'Product',
    vision: 'Vision',
    plans: 'Plans',
    forWho: 'Who it is for',
    technology: 'Technology',
    menu: 'Menu',
    rust: 'Rust',
    kubernetes: 'Kubernetes and CRDs',
    dataplane: 'Data plane',
    openSource: 'Open source',
    footerTechnology: 'Technology',
    footerResources: 'Resources',
    footerOpenSource: 'Company',
    deployInstance: 'Deploy an instance',
    earlyAccess: 'Request free access',
    console: 'Console',
    documentation: 'Documentation',
    blog: 'Blog',
    apiReference: 'API reference',
    status: 'Status',
    contact: 'Contact',
    footerBlurb: 'The identity platform for startups and small teams, built on Ferriskey.',
    builtIn: 'Made in France. 100% European.',
    language: 'Language',
    skipToContent: 'Skip to content',
    mainNav: 'Main',
    mobileNav: 'Mobile',
    codeExample: 'Code example',
  },
  fr: {
    product: 'Produit',
    vision: 'Vision',
    plans: 'Offres',
    forWho: 'Pour qui',
    technology: 'Technologie',
    menu: 'Menu',
    rust: 'Rust',
    kubernetes: 'Kubernetes et CRDs',
    dataplane: 'Data plane',
    openSource: 'Open source',
    footerTechnology: 'Technologie',
    footerResources: 'Ressources',
    footerOpenSource: 'Société',
    deployInstance: 'Déployer une instance',
    earlyAccess: 'Demander mon accès gratuit',
    console: 'Console',
    documentation: 'Documentation',
    blog: 'Blog',
    apiReference: 'Référence API',
    status: 'Statut',
    contact: 'Contact',
    footerBlurb: 'La plateforme d’identité des startups et des petites équipes, construite sur Ferriskey.',
    builtIn: 'Conçu en France. 100 % européen.',
    language: 'Langue',
    skipToContent: 'Aller au contenu',
    mainNav: 'Principal',
    mobileNav: 'Mobile',
    codeExample: 'Exemple de code',
  },
} as const

export type UiKey = keyof (typeof ui)['en']
export const useUi = (locale: Locale) => (key: UiKey): string => ui[locale][key]
