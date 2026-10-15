import { cn } from '@explainer/ui'
import { useEffect, useRef, useState } from 'react'
import { localePath, switchPath, useUi, type Locale } from '../i18n'
import { primaryCta } from '../platform'
import { logoColors, logoPaths } from './logo-paths'

interface SiteHeaderProps {
  docsUrl?: string
  consoleUrl?: string
  locale?: Locale
  pathname?: string
}

export function SiteHeader({
  consoleUrl = '#',
  locale = 'en',
  pathname: initialPath = '/',
}: SiteHeaderProps) {
  const t = useUi(locale)
  const href = (path: string) => localePath(locale, path)
  const cta = primaryCta(locale, consoleUrl)
  const links = [
    { label: t('product'), href: href('/#solutions') },
    { label: t('forWho'), href: href('/#for-who') },
    { label: t('plans'), href: href('/#plans') },
    { label: t('vision'), href: href('/#vision') },
    { label: t('technology'), href: href('/technology') },
    { label: 'GitHub', href: 'https://github.com/ferriskey' },
  ]

  const otherLocale: Locale = locale === 'en' ? 'fr' : 'en'
  const [pathname, setPathname] = useState(initialPath)
  useEffect(() => {
    const sync = () => setPathname(window.location.pathname)
    sync()
    document.addEventListener('astro:page-load', sync)
    return () => document.removeEventListener('astro:page-load', sync)
  }, [])

  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const mobileButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      mobileButtonRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const withSlash = (path: string) => (path.endsWith('/') ? path : `${path}/`)
  const isCurrent = (target: string) => !target.includes('#') && withSlash(target) === withSlash(pathname)

  const backdrop = 'blur(18px) saturate(160%)'

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-[border-color,box-shadow] duration-300',
        scrolled ? 'border-border shadow-[0_8px_24px_-16px_rgb(30_20_80/0.2)]' : 'border-transparent',
      )}
    >
      {/* Always on, so the frosted glass never depends on the scroll state being detected. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: 'color-mix(in oklab, var(--color-background) 92%, transparent)',
          backdropFilter: backdrop,
          WebkitBackdropFilter: backdrop,
        }}
      />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <a href={href('/')} className="group flex items-center gap-2.5">
          <svg
            viewBox="0 0 24 24"
            width={36}
            height={36}
            shapeRendering="crispEdges"
            className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
            aria-hidden="true"
          >
            <path fill={logoColors.body} d={logoPaths.body} />
            <path fill={logoColors.shade} d={logoPaths.shade} />
            <path fill={logoColors.belly} d={logoPaths.belly} />
            <path fill={logoColors.outline} d={logoPaths.outline} />
          </svg>
          <span className="text-[17px] font-semibold tracking-tight">Autharie</span>
        </a>

        <nav aria-label={t('mainNav')} className="hidden items-center gap-0.5 lg:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-current={isCurrent(link.href) ? 'page' : undefined}
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent/70 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={cta.href}
            aria-current={isCurrent(cta.href) ? 'page' : undefined}
            className="inline-flex h-9 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-md hover:shadow-primary/30"
          >
            {cta.label}
          </a>
          <a
            href={switchPath(pathname, otherLocale)}
            hrefLang={otherLocale}
            lang={otherLocale}
            aria-label={otherLocale === 'fr' ? 'FR, Français' : 'EN, English'}
            className="rounded-full px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:bg-accent/70 hover:text-foreground max-[359px]:hidden"
          >
            {otherLocale}
          </a>
          <button
            type="button"
            ref={mobileButtonRef}
            onClick={() => setOpen(!open)}
            aria-label={t('menu')}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-accent lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="menu-panel max-h-[calc(100dvh-4rem)] overflow-y-auto border-t bg-background px-5 py-4 lg:hidden">
          <nav aria-label={t('mobileNav')} className="flex flex-col">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isCurrent(link.href) ? 'page' : undefined}
                className="border-b border-border/60 py-3 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href={switchPath(pathname, otherLocale)}
              hrefLang={otherLocale}
              lang={otherLocale}
              onClick={() => setOpen(false)}
              className="py-3 text-sm font-medium text-muted-foreground"
            >
              {otherLocale === 'fr' ? 'Français' : 'English'}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
