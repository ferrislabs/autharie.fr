import { localePath, type Locale, useUi } from './i18n'

/**
 * The console is not open yet. While it is closed, nothing on the site sends
 * people to it: no sign in, no get started, and the "deploy" buttons ask for
 * early access instead. Set PUBLIC_PLATFORM_OPEN=true at build time to bring
 * them back.
 */
export const platformOpen = import.meta.env.PUBLIC_PLATFORM_OPEN === 'true'

/** The main call to action of a page: deploy when the console is open, else early access. */
export function primaryCta(locale: Locale, consoleUrl: string): { label: string; href: string } {
  const t = useUi(locale)
  return platformOpen
    ? { label: t('deployInstance'), href: consoleUrl }
    : { label: t('earlyAccess'), href: localePath(locale, '/contact') }
}
