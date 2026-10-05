import { cn } from '@explainer/ui'
import { useEffect, useRef, useState } from 'react'
import { brandIcons } from '../data/brand-icons'
import { getProducts } from '../data/products'
import { solutionCopy, solutionGroups, solutionsIn } from '../data/solutions'
import { localePath, switchPath, useUi, type Locale } from '../i18n'
import { platformOpen } from '../platform'
import { paths } from './icon-paths'
import { logoColors, logoPaths } from './logo-paths'

interface SiteHeaderProps {
  docsUrl?: string
  consoleUrl?: string
  locale?: Locale
  pathname?: string
}

type MenuId = 'products' | 'solutions'

interface Product {
  name: string
  tagline: string
  href: string
  icon: string
  isNew: boolean
  tint: string
}

function Glyph({ name, className = 'size-5' }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('shrink-0', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: paths[name] ?? paths.check }}
    />
  )
}

/** A migration source, drawn in its own colours. */
function Brand({ slug }: { slug: string }) {
  const brand = brandIcons[slug]
  if (!brand) return <Glyph name="rotate" className="size-4 text-muted-foreground" />
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-white shadow-sm ring-1 ring-black/5">
      <svg viewBox="0 0 24 24" className="size-[18px]" fill={brand.color} aria-hidden="true">
        <path d={brand.path} />
      </svg>
    </span>
  )
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('size-3.5 transition-transform duration-200', open && 'rotate-180')}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function NewBadge({ label = 'New' }: { label?: string }) {
  return (
    <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
      {label}
    </span>
  )
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('size-3.5', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function ProductCard({
  product,
  index,
  soonLabel,
  onNavigate,
}: {
  product: Product
  index: number
  soonLabel: string
  onNavigate: () => void
}) {
  return (
    <a
      href={product.href}
      onClick={onNavigate}
      style={{ '--i': index } as React.CSSProperties}
      className="menu-item group -m-2.5 block rounded-xl p-2.5 transition-colors hover:bg-accent/60"
    >
      <div
        className={cn(
          'relative flex h-24 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br ring-1 ring-black/5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:ring-primary/30',
          product.tint,
        )}
      >
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <span className="relative flex size-11 items-center justify-center rounded-xl bg-white text-primary shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-110">
          <Glyph name={product.icon} className="size-5" />
        </span>
      </div>
      <div className="mt-3 flex items-center text-sm font-semibold text-foreground">
        {product.name}
        {product.isNew && <NewBadge label={soonLabel} />}
        <Arrow className="ml-1.5 -translate-x-1 text-primary opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
      </div>
      <p className="mt-0.5 text-[13px] leading-snug text-muted-foreground">{product.tagline}</p>
    </a>
  )
}

function MenuLink({
  href,
  label,
  index,
  onNavigate,
  lead,
}: {
  href: string
  label: string
  index: number
  onNavigate: () => void
  lead?: React.ReactNode
}) {
  return (
    <a
      href={href}
      onClick={onNavigate}
      style={{ '--i': index } as React.CSSProperties}
      className="menu-item group -mx-2 flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent/70 hover:text-primary"
    >
      {lead}
      <span className="flex-1">{label}</span>
      <Arrow className="-translate-x-1 text-primary opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
    </a>
  )
}

function GroupTitle({ children, index = 0 }: { children: React.ReactNode; index?: number }) {
  return (
    <p
      style={{ '--i': index } as React.CSSProperties}
      className="menu-item mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
    >
      {children}
    </p>
  )
}

export function SiteHeader({
  docsUrl = '',
  consoleUrl = '#',
  locale = 'en',
  pathname: initialPath = '/',
}: SiteHeaderProps) {
  const t = useUi(locale)
  const href = (path: string) => localePath(locale, path)
  const products: Product[] = getProducts(locale).map((p) => ({
    name: p.name,
    tagline: p.tagline,
    href: href(`/products/${p.slug}`),
    icon: p.icon,
    isNew: p.status === 'soon',
    tint: p.tint,
  }))
  const underTheHood = [
    { label: t('rust'), href: href('/technology#rust') },
    { label: t('kubernetes'), href: href('/technology#kubernetes') },
    { label: t('dataplane'), href: href('/technology#dataplane') },
    { label: t('openSource'), href: href('/technology#open-source') },
  ]
  const getStarted = [
    { label: t('pricing'), href: href('/pricing') },
    { label: t('howItWorks'), href: href('/technology') },
  ]
  const groupLabels = {
    role: t('byRole'),
    stage: t('byStage'),
    industry: t('byIndustry'),
    migrate: t('migrate'),
  } as const
  const solutionLinks = (group: (typeof solutionGroups)[number]) =>
    solutionsIn(group).map((solution) => ({
      slug: solution.slug,
      icon: solution.icon,
      label: solutionCopy(solution, locale).menu,
      href: href(`/solutions/${solution.slug}`),
    }))

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
  const [menu, setMenu] = useState<MenuId | null>(null)
  const [mobileProducts, setMobileProducts] = useState(false)
  const [mobileSolutions, setMobileSolutions] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navRef = useRef<HTMLElement>(null)

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
    if (!menu) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(null)
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenu(null)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onDown)
    }
  }, [menu])

  const openMenu = (id: MenuId) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setMenu(id)
  }
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setMenu(null), 120)
  }
  const closeMenu = () => setMenu(null)

  const links = [
    { label: t('technology'), href: href('/technology') },
    { label: t('about'), href: href('/about') },
    { label: t('pricing'), href: href('/pricing'), accent: true },
    { label: t('docs'), href: docsUrl || '#' },
  ]

  const trigger = (id: MenuId, label: string) => (
    <button
      type="button"
      aria-haspopup="true"
      aria-expanded={menu === id}
      aria-controls={`${id}-menu`}
      onClick={() => setMenu((v) => (v === id ? null : id))}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm transition-colors hover:bg-accent/70 hover:text-foreground',
        menu === id ? 'bg-accent/70 text-foreground' : 'text-muted-foreground',
      )}
    >
      {label}
      <Chevron open={menu === id} />
    </button>
  )

  const panelClass =
    'menu-panel absolute inset-x-0 top-full border-b border-border bg-background shadow-[0_32px_64px_-32px_rgb(30_20_80/0.28)]'

  const backdrop = menu === null ? 'blur(18px) saturate(160%)' : 'none'

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-[border-color,box-shadow] duration-300',
        scrolled || menu !== null ? 'border-border' : 'border-transparent',
        scrolled && menu === null && 'shadow-[0_8px_24px_-16px_rgb(30_20_80/0.2)]',
      )}
    >
      {/* Always on, so the frosted glass never depends on the scroll state being detected. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            menu !== null
              ? 'var(--color-background)'
              : 'color-mix(in oklab, var(--color-background) 72%, transparent)',
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

        <nav ref={navRef} className="hidden items-center gap-0.5 lg:flex">
          <div className="flex h-16 items-center" onMouseEnter={() => openMenu('products')} onMouseLeave={scheduleClose}>
            {trigger('products', t('products'))}

            {menu === 'products' && (
              <div id="products-menu" className={panelClass}>
                <div className="mx-auto grid max-w-6xl grid-cols-[1fr_16rem] gap-12 px-5 pb-10 pt-8">
                  <div className="grid grid-cols-3 gap-x-8 gap-y-8">
                    {products.map((product, i) => (
                      <ProductCard key={product.name} product={product} index={i} soonLabel={t('soon')} onNavigate={closeMenu} />
                    ))}
                  </div>

                  <div className="space-y-7 border-l pl-10">
                    <div>
                      <GroupTitle index={1}>{t('underTheHood')}</GroupTitle>
                      <ul className="space-y-0.5">
                        {underTheHood.map((item, i) => (
                          <li key={item.label}>
                            <MenuLink href={item.href} label={item.label} index={i + 2} onNavigate={closeMenu} />
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <GroupTitle index={6}>{t('getStartedGroup')}</GroupTitle>
                      <ul className="space-y-0.5">
                        {getStarted.map((item, i) => (
                          <li key={item.label}>
                            <MenuLink href={item.href} label={item.label} index={i + 7} onNavigate={closeMenu} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex h-16 items-center" onMouseEnter={() => openMenu('solutions')} onMouseLeave={scheduleClose}>
            {trigger('solutions', t('solutions'))}

            {menu === 'solutions' && (
              <div id="solutions-menu" className={panelClass}>
                <div className="mx-auto max-w-6xl px-5 pb-6 pt-8">
                  <div className="grid grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,2.1fr)] gap-x-10">
                    {(['role', 'industry', 'stage'] as const).map((group, g) => (
                      <div key={group}>
                        <GroupTitle index={g}>{groupLabels[group]}</GroupTitle>
                        <ul className="space-y-0.5">
                          {solutionLinks(group).map((item, i) => (
                            <li key={item.slug}>
                              <MenuLink
                                href={item.href}
                                label={item.label}
                                index={g * 2 + i + 1}
                                onNavigate={closeMenu}
                                lead={
                                  <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                    <Glyph name={item.icon} className="size-3.5" />
                                  </span>
                                }
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    <div className="border-l pl-10">
                      <GroupTitle index={3}>{groupLabels.migrate}</GroupTitle>
                      <ul className={cn('grid gap-3', solutionLinks('migrate').length > 1 ? 'grid-cols-2' : 'grid-cols-1')}>
                        {solutionLinks('migrate').map((item, i) => (
                          <li key={item.slug}>
                            <a
                              href={item.href}
                              onClick={closeMenu}
                              style={{ '--i': i + 4 } as React.CSSProperties}
                              className="menu-item group flex h-14 items-center gap-3 rounded-xl border bg-card px-3 text-sm font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                            >
                              <Brand slug={item.slug} />
                              <span className="leading-tight">{item.label}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div
                    style={{ '--i': 9 } as React.CSSProperties}
                    className="menu-item mt-7 flex items-center justify-between rounded-xl bg-accent/60 px-5 py-3 text-sm"
                  >
                    <span className="text-muted-foreground">{t('notSure')}</span>
                    <a
                      href={href('/contact')}
                      onClick={closeMenu}
                      className="group inline-flex items-center gap-1.5 font-medium text-primary"
                    >
                      {t('talkToUs')}
                      <Arrow className="transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm transition-colors hover:bg-accent/70 hover:text-foreground',
                link.accent ? 'font-medium text-primary hover:text-primary' : 'text-muted-foreground',
              )}
            >
              {link.accent && <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />}
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={switchPath(pathname, otherLocale)}
            hrefLang={otherLocale}
            aria-label={t('language')}
            className="rounded-full px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:bg-accent/70 hover:text-foreground max-[359px]:hidden"
          >
            {otherLocale}
          </a>
          {platformOpen ? (
            <>
              <a
                href={href('/contact')}
                className="hidden h-9 items-center rounded-full border bg-card px-4 text-sm font-medium transition-colors hover:bg-accent xl:inline-flex"
              >
                {t('talkToUs')}
              </a>
              <a
                href={consoleUrl}
                className="hidden rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/70 hover:text-foreground xl:inline-flex"
              >
                {t('signIn')}
              </a>
              <a
                href={consoleUrl}
                className="inline-flex h-9 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-md hover:shadow-primary/30"
              >
                {t('getStarted')}
              </a>
            </>
          ) : (
            <a
              href={href('/contact')}
              className="inline-flex h-9 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-md hover:shadow-primary/30"
            >
              {t('talkToUs')}
            </a>
          )}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={t('menu')}
            aria-expanded={open}
            className="flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-accent lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="menu-panel max-h-[calc(100dvh-4rem)] overflow-y-auto border-t bg-background px-5 py-4 lg:hidden">
          <nav className="flex flex-col">
            <button
              type="button"
              aria-expanded={mobileProducts}
              onClick={() => setMobileProducts((v) => !v)}
              className="flex items-center justify-between border-b border-border/60 py-3 text-sm font-medium"
            >
              {t('products')}
              <Chevron open={mobileProducts} />
            </button>
            {mobileProducts && (
              <div className="border-b border-border/60 pb-2">
                {products.map((product, i) => (
                  <a
                    key={product.name}
                    href={product.href}
                    onClick={() => setOpen(false)}
                    style={{ '--i': i } as React.CSSProperties}
                    className="menu-item flex items-start gap-3 py-2.5"
                  >
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Glyph name={product.icon} className="size-4" />
                    </span>
                    <span>
                      <span className="flex items-center text-sm font-medium">
                        {product.name}
                        {product.isNew && <NewBadge label={t('soon')} />}
                      </span>
                      <span className="block text-[13px] text-muted-foreground">{product.tagline}</span>
                    </span>
                  </a>
                ))}
              </div>
            )}

            <button
              type="button"
              aria-expanded={mobileSolutions}
              onClick={() => setMobileSolutions((v) => !v)}
              className="flex items-center justify-between border-b border-border/60 py-3 text-sm font-medium"
            >
              {t('solutions')}
              <Chevron open={mobileSolutions} />
            </button>
            {mobileSolutions && (
              <div className="space-y-4 border-b border-border/60 pb-4 pt-1">
                {solutionGroups.map((group, g) => (
                  <div key={group}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      {groupLabels[group]}
                    </p>
                    <ul className="mt-2 space-y-0.5">
                      {solutionLinks(group).map((item, i) => (
                        <li key={item.slug}>
                          <a
                            href={item.href}
                            onClick={() => setOpen(false)}
                            style={{ '--i': g + i } as React.CSSProperties}
                            className="menu-item flex items-center gap-2.5 py-1.5 text-sm font-medium"
                          >
                            {group === 'migrate' ? (
                              <Brand slug={item.slug} />
                            ) : (
                              <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                                <Glyph name={item.icon} className="size-3.5" />
                              </span>
                            )}
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 text-sm font-medium last:border-0"
              >
                {link.label}
              </a>
            ))}
            <a
              href={href('/contact')}
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-3 text-sm font-medium"
            >
              {t('contactUs')}
            </a>
            <a
              href={switchPath(pathname, otherLocale)}
              hrefLang={otherLocale}
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
