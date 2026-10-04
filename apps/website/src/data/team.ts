import type { Locale } from '../i18n'

export interface TeamMember {
  name: string
  role?: Record<Locale, string>
  bio?: Record<Locale, string>
  /** Path under public/, e.g. /team/jane.jpg. Initials are shown when absent. */
  photo?: string
  links?: { label: string; href: string }[]
}

/**
 * The people shown on the About page. The section stays hidden while this is
 * empty, so nothing is invented. Add a member and it appears, in both locales.
 */
export const team: TeamMember[] = [
  {
    name: 'Baptiste Parmantier',
    links: [{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/baptiste-parmantier' }],
  },
  {
    name: 'Nathaël Bonnal',
    links: [{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/nathael-bonnal' }],
  },
]
