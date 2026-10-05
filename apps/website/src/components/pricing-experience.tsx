import { cn } from '@explainer/ui'
import { useEffect, useState } from 'react'
import { localePath, type Locale } from '../i18n'
import { platformOpen } from '../platform'
import { pricingCopy } from '../pricing/copy'
import {
  TCO_DEFAULTS,
  internalMonthly,
  STARTER_MAX_VOLUME,
  VOLUMES,
  monthlyOf,
  normalise,
  priceOf,
  type Engine,
  type Mode,
  type PlanId,
  type Selection,
  type TcoInput,
} from '../pricing/model'
import { thumbAt } from '../pricing/slider'
import { TcoComparator } from '../pricing/tco'

const PLANS: PlanId[] = ['starter', 'business', 'scale']

function Check({ ok }: { ok: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('mt-0.5 size-4 shrink-0', ok ? 'text-primary' : 'text-muted-foreground/50')} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ok ? <path d="M20 6 9 17l-5-5" /> : <path d="M18 6 6 18M6 6l12 12" />}
    </svg>
  )
}

function StepTitle({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
      <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">{n}</span>
      {children}
    </h2>
  )
}

export function PricingExperience({ locale = 'en' }: { locale?: Locale }) {
  const c = pricingCopy[locale]
  const [selection, setSelection] = useState<Selection>({
    mode: 'managed',
    engine: 'ferriskey',
    plan: 'business',
    volume: 10000,
  })
  const { mode, engine, plan, volume } = selection
  const [tco, setTco] = useState<TcoInput>(TCO_DEFAULTS)
  const [inCompare, setInCompare] = useState(false)
  const update = (patch: Partial<Selection>) => setSelection((current) => normalise({ ...current, ...patch }))

  const eur = new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-GB', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  })
  const num = new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-GB')

  const volumeIndex = VOLUMES.indexOf(volume as (typeof VOLUMES)[number])
  const volumeLabel = (v: number) => (v >= 1000 ? `${v / 1000}k` : String(v))

  const priceText = (id: PlanId) => {
    const price = priceOf({ ...selection, plan: id })
    if (price.kind === 'unavailable') return { main: '—', note: c.card.unavailable }
    return {
      main: price.amount === 0 ? c.card.free : eur.format(price.amount),
      note: price.amount === 0 ? c.card.perMonth.replace(/,? ?excl\. VAT|HT/, '').trim() : c.card.perMonth,
    }
  }

  const chosen = monthlyOf(selection)
  const chosenName = c.plans[mode][plan].name
  const chosenPrice = priceText(plan)
  const totalText = chosenPrice.main

  const summaryParts = {
    mode: c.modes[mode].name,
    engine: c.engines[engine].name,
    volume: mode === 'managed' ? `${num.format(volume)} ${c.volume.accounts}` : c.recap.unlimited,
    plan: chosenName,
    total: totalText,
  }
  const [summaryText, setSummaryText] = useState('')
  useEffect(() => setSummaryText(c.recap.summary(summaryParts)), [mode, engine, volume, plan, locale])

  const isFree = chosen.amount === 0 && priceOf(selection).kind === 'price'
  const cta = !platformOpen
    ? { label: c.recap.earlyAccess, short: c.recap.short.earlyAccess }
    : isFree
      ? { label: c.recap.startFree, short: c.recap.short.startFree }
      : { label: c.recap.deploy, short: c.recap.short.deploy }
  const ctaHref = `${localePath(locale, '/contact')}?topic=pricing&message=${encodeURIComponent(summaryText)}`

  // The features that only FerrisKey has, for the plans of the current mode.
  const ferrisKeyOnly = [
    ...new Set(
      (PLANS as PlanId[]).flatMap((id) =>
        c.plans[mode][id].features.filter((f) => f.engine === 'ferriskey').map((f) => f.text),
      ),
    ),
  ]
  // The bar shows the price while choosing, and the comparison once the reader reaches it.
  useEffect(() => {
    const section = document.getElementById('compare')
    if (!section) return
    const observer = new IntersectionObserver(([entry]) => setInCompare(entry.isIntersecting), {
      rootMargin: '-30% 0px -30% 0px',
    })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const showKeycloakNoFree = mode === 'managed' && engine === 'keycloak' && volume === 1000
  const showFreeNote = mode === 'managed' && engine === 'ferriskey' && volume === 1000

  const internal = internalMonthly(tco)
  const yearlySaving = (internal - chosen.amount) * 12

  const configuration = `${summaryParts.mode}, ${summaryParts.engine}, ${summaryParts.volume}, ${chosenName}`

  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-10">
      <div className="min-w-0">
        <div className="space-y-12">
          {/* 1. Deployment mode */}
          <section className="space-y-4">
            <StepTitle n={1}>{c.steps.mode}</StepTitle>
            <div role="tablist" aria-label={c.steps.mode} className="grid gap-3 sm:grid-cols-2">
              {(['managed', 'byoc'] as Mode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  role="tab"
                  aria-selected={mode === m}
                  onClick={() => update({ mode: m })}
                  className={cn(
                    'rounded-xl border p-5 text-left transition-all',
                    mode === m ? 'border-primary bg-primary/5 ring-1 ring-primary/30' : 'bg-card hover:border-primary/40',
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span className="font-semibold">{c.modes[m].name}</span>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                      {c.modes[m].tag}
                    </span>
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">{c.modes[m].description}</span>
                </button>
              ))}
            </div>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span>{c.inCluster.text}</span>
              <a href={localePath(locale, '/contact')} className="font-medium text-primary hover:underline">
                {c.inCluster.button}
              </a>
            </p>
          </section>

          {/* 2. Engine */}
          <section className="space-y-4">
            <StepTitle n={2}>{c.steps.engine}</StepTitle>
            <div role="radiogroup" aria-label={c.steps.engine} className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                role="radio"
                aria-checked={engine === 'ferriskey'}
                onClick={() => update({ engine: 'ferriskey' })}
                className={cn(
                  'rounded-xl border p-5 text-left transition-all',
                  engine === 'ferriskey' ? 'border-primary bg-primary/5 ring-1 ring-primary/30' : 'bg-card hover:border-primary/40',
                )}
              >
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{c.engines.ferriskey.name}</span>
                  <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
                    {c.engines.ferriskey.badge}
                  </span>
                  <span className="text-xs text-muted-foreground">{c.engines.ferriskey.badge2}</span>
                </span>
                <ul className="mt-3 space-y-1.5">
                  {c.engines.ferriskey.points.map((point) => (
                    <li key={point} className="flex gap-2 text-sm text-muted-foreground">
                      <Check ok />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </button>

              <button
                type="button"
                role="radio"
                aria-checked={engine === 'keycloak'}
                onClick={() => update({ engine: 'keycloak' })}
                className={cn(
                  'rounded-xl border p-5 text-left transition-all',
                  engine === 'keycloak' ? 'border-primary bg-primary/5 ring-1 ring-primary/30' : 'bg-card hover:border-primary/40',
                )}
              >
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{c.engines.keycloak.name}</span>
                  <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700 ring-1 ring-amber-200">
                    {c.engines.keycloak.badge}
                  </span>
                </span>
                <p className="mt-3 text-sm text-muted-foreground">{c.engines.keycloak.description}</p>
                <p className="mt-3 flex gap-2 text-sm text-amber-800">
                  <svg viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 9v4M12 17h.01" />
                    <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
                  </svg>
                  <span>{c.engines.keycloak.warning}</span>
                </p>
              </button>
            </div>
          </section>

          {/* 3. Volume */}
          <section className="space-y-4">
            <StepTitle n={3}>{c.steps.volume}</StepTitle>
            {mode === 'managed' ? (
              <div className="rounded-xl border bg-card p-5 sm:p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <label htmlFor="volume" className="font-medium">{c.volume.label}</label>
                  <span className="text-lg font-semibold text-primary tabular-nums">
                    {num.format(volume)} <span className="text-sm font-normal text-muted-foreground">{c.volume.accounts}</span>
                  </span>
                </div>
                <input
                  id="volume"
                  type="range"
                  min={0}
                  max={VOLUMES.length - 1}
                  step={1}
                  value={volumeIndex}
                  onChange={(e) => update({ volume: VOLUMES[Number(e.target.value)] })}
                  aria-valuetext={`${num.format(volume)} ${c.volume.accounts}`}
                  className="slider mt-4"
                  style={{ '--fill': thumbAt(volumeIndex / (VOLUMES.length - 1)) } as React.CSSProperties}
                />
                <div className="relative mt-2 h-5 text-xs text-muted-foreground" aria-hidden="true">
                  {VOLUMES.map((v, i) => (
                    <span
                      key={v}
                      style={{ left: thumbAt(i / (VOLUMES.length - 1)) }}
                      className={cn(
                        'absolute -translate-x-1/2 whitespace-nowrap',
                        i % 2 === 1 && volume !== v && 'hidden sm:block',
                        volume === v && 'font-semibold text-primary',
                      )}
                    >
                      {volumeLabel(v)}
                    </span>
                  ))}
                </div>
                {(showFreeNote || showKeycloakNoFree || volume > STARTER_MAX_VOLUME || volume < 10000) && (
                  <ul className="mt-4 space-y-1 text-sm text-muted-foreground" aria-live="polite">
                    {showFreeNote && <li className="text-emerald-700">{c.volume.freeNote}</li>}
                    {showKeycloakNoFree && <li className="text-amber-800">{c.volume.keycloakNoFree}</li>}
                    {volume > STARTER_MAX_VOLUME && <li>{c.volume.starterLimit}</li>}
                    {volume < 10000 && <li>{c.volume.businessFloor}</li>}
                  </ul>
                )}
              </div>
            ) : (
              <div className="rounded-xl border bg-primary/5 p-5 sm:p-6">
                <p className="font-semibold">{c.byocBox.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.byocBox.text}</p>
              </div>
            )}
          </section>

          {/* 4. Plan */}
          <section className="space-y-4">
            <StepTitle n={4}>{c.steps.plan}</StepTitle>
            {engine === 'keycloak' && (
              <div role="alert" className="rounded-xl border border-amber-300 bg-amber-50 p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <p className="flex gap-2 font-semibold text-amber-900">
                    <svg viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 9v4M12 17h.01" />
                      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
                    </svg>
                    {c.keycloakAlert.title}
                  </p>
                  <button
                    type="button"
                    onClick={() => update({ engine: 'ferriskey' })}
                    className="inline-flex h-9 shrink-0 items-center rounded-md bg-amber-900 px-3 text-sm font-medium text-white transition-colors hover:bg-amber-800"
                  >
                    {c.keycloakAlert.switch}
                  </button>
                </div>
                <p className="mt-2 text-sm text-amber-900">{c.keycloakAlert.intro}</p>
                <ul className="mt-2 space-y-1 text-sm font-medium text-amber-900">
                  {ferrisKeyOnly.map((text) => (
                    <li key={text} className="flex gap-2">
                      <span aria-hidden="true">×</span>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-1">
              {PLANS.map((id) => {
                const copy = c.plans[mode][id]
                const price = priceText(id)
                const unavailable = priceOf({ ...selection, plan: id }).kind === 'unavailable'
                const picked = plan === id
                const featured = id === 'business'
                return (
                  <div
                    key={id}
                    className={cn(
                      'relative flex flex-col rounded-2xl border bg-card p-5 transition-all xl:grid xl:grid-cols-[230px_minmax(0,1fr)] xl:grid-rows-[auto_1fr] xl:gap-x-8',
                      featured && 'border-primary/50 shadow-[0_20px_40px_-24px_rgb(60_40_160/0.4)]',
                      picked && 'ring-2 ring-primary',
                      unavailable && 'opacity-60',
                    )}
                  >
                    {featured && (
                      <span className="absolute -top-3 left-5 rounded-full bg-primary px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary-foreground">
                        {c.card.recommended}
                      </span>
                    )}
                    <div className="xl:col-start-1 xl:row-start-1">
                      <h3 className="text-lg font-semibold">{copy.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{copy.tagline}</p>

                      <div className="mt-4 min-h-[4.5rem]">
                        <p className="text-3xl font-semibold tracking-tight tabular-nums">{price.main}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{price.note}</p>
                      </div>
                    </div>

                    <ul className="mt-4 flex-1 space-y-2 border-t pt-4 xl:col-start-2 xl:row-span-2 xl:row-start-1 xl:mt-0 xl:border-l xl:border-t-0 xl:pl-8 xl:pt-0">
                      {copy.features.map((feature) => {
                        const ok = !feature.engine || engine === feature.engine
                        return ok ? (
                          <li key={feature.text} className="flex gap-2 text-sm">
                            <Check ok />
                            <span>{feature.text}</span>
                          </li>
                        ) : (
                          <li
                            key={feature.text}
                            className="flex gap-2 rounded-md bg-amber-50 px-2.5 py-2 text-sm text-amber-900 ring-1 ring-amber-200"
                          >
                            <svg viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M18 6 6 18M6 6l12 12" />
                            </svg>
                            <span>
                              <span className="line-through decoration-amber-400">{feature.text}</span>
                              <span className="mt-0.5 block text-xs font-semibold">{c.card.notOnKeycloak}</span>
                            </span>
                          </li>
                        )
                      })}
                    </ul>

                    <button
                      type="button"
                      disabled={unavailable}
                      onClick={() => update({ plan: id })}
                      aria-pressed={picked}
                      className={cn(
                        'mt-5 inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors disabled:cursor-not-allowed xl:col-start-1 xl:row-start-2 xl:self-end',
                        picked ? 'bg-primary text-primary-foreground' : 'border bg-card hover:bg-accent',
                      )}
                    >
                      {picked ? c.card.selected : c.card.select}
                    </button>
                  </div>
                )
              })}
            </div>
          </section>
        </div>

      {/* TCO */}
      <section id="compare" className="mt-24 scroll-mt-24 border-t pt-16">
        <div className="max-w-2xl">
          <p className="eyebrow">{c.tco.eyebrow}</p>
          <h2 className="mt-4 text-3xl sm:text-4xl">{c.tco.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{c.tco.lead}</p>
        </div>
        <div className="mt-10">
          <TcoComparator locale={locale} input={tco} onChange={(patch) => setTco((current) => ({ ...current, ...patch }))} autharie={chosen} configuration={configuration} />
        </div>
      </section>
      </div>

      {/* The cost stays on screen. A card on the right from xl, which follows the scroll; a bar at the bottom below that. */}
      <div className="contents xl:block">
        <aside className="sticky bottom-3 z-30 mt-10 sm:bottom-4 xl:top-24 xl:bottom-auto xl:mt-0 xl:self-start" aria-label={c.recap.title}>
          <div className="xl:hidden">
        <div className="flex flex-col gap-2 rounded-2xl border bg-card/95 p-3 shadow-[0_24px_60px_-20px_rgb(40_30_110/0.45)] backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5">
            {inCompare ? (
              <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">{c.tco.bar.internal}</p>
                  <p className="font-semibold tabular-nums">
                    {eur.format(internal)} <span className="text-xs font-normal text-muted-foreground">{c.tco.bar.perMonth}</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{c.tco.bar.autharie}</p>
                  <p className="font-semibold tabular-nums">
                    {eur.format(chosen.amount)} <span className="text-xs font-normal text-muted-foreground">{c.tco.bar.perMonth}</span>
                  </p>
                </div>
                {yearlySaving > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground">{c.tco.bar.saves}</p>
                    <p className="font-semibold text-emerald-600 tabular-nums">
                      {eur.format(yearlySaving)} <span className="text-xs font-normal text-emerald-700">{c.tco.bar.perYear}</span>
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <>
                <dl className="hidden gap-x-6 text-sm sm:flex sm:flex-wrap sm:items-center">
                  {[
                    [c.recap.mode, summaryParts.mode],
                    [c.recap.engine, summaryParts.engine],
                    [c.recap.accounts, summaryParts.volume],
                    [c.recap.plan, chosenName],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-xs text-muted-foreground">{label}</dt>
                      <dd className="font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="truncate text-xs text-muted-foreground sm:hidden">
                  {summaryParts.mode} · {summaryParts.engine} · {summaryParts.volume} · {chosenName}
                </p>
              </>
            )}
  
            <div className="flex items-center justify-between gap-3 sm:justify-end sm:gap-5">
              <div className="min-w-0">
                <p className="hidden text-xs text-muted-foreground sm:block">{c.recap.total}</p>
                <p className="text-xl font-semibold tracking-tight tabular-nums sm:text-2xl" >
                  {totalText}
                </p>
                {isFree && <p className="text-xs text-emerald-700">{c.recap.discovery}</p>}
              </div>
              <a
                href={ctaHref}
                className="inline-flex h-11 shrink-0 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:px-5"
              >
                <span className="sm:hidden">{cta.short}</span>
                <span className="hidden sm:inline">{cta.label}</span>
              </a>
            </div>
          </div>
            </div>

          <div className="hidden rounded-2xl border bg-card p-6 shadow-[0_24px_48px_-28px_rgb(60_40_160/0.35)] xl:block">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">{c.recap.title}</h2>
            <dl className="mt-4 divide-y text-sm">
              {[
                [c.recap.mode, summaryParts.mode],
                [c.recap.engine, summaryParts.engine],
                [c.recap.accounts, summaryParts.volume],
                [c.recap.plan, chosenName],
              ].map(([label, value]) => (
                <div key={label} className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="text-right font-medium">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-4 rounded-xl bg-surface p-4">
              <p className="text-xs text-muted-foreground">{c.recap.total}</p>
              <p className="mt-1 text-3xl font-semibold tracking-tight tabular-nums" aria-live="polite">
                {totalText}
              </p>
              {isFree && <p className="mt-1 text-xs text-emerald-700">{c.recap.discovery}</p>}
            </div>

            {inCompare && (
              <div className="mt-3 space-y-1.5 rounded-xl border p-4 text-sm">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-muted-foreground">{c.tco.bar.internal}</span>
                  <span className="font-semibold tabular-nums">
                    {eur.format(internal)} <span className="text-xs font-normal text-muted-foreground">{c.tco.bar.perMonth}</span>
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-muted-foreground">{c.tco.bar.autharie}</span>
                  <span className="font-semibold tabular-nums">
                    {eur.format(chosen.amount)} <span className="text-xs font-normal text-muted-foreground">{c.tco.bar.perMonth}</span>
                  </span>
                </div>
                {yearlySaving > 0 && (
                  <div className="flex items-baseline justify-between gap-3 border-t pt-1.5">
                    <span className="text-muted-foreground">{c.tco.bar.saves}</span>
                    <span className="font-semibold text-emerald-600 tabular-nums">
                      {eur.format(yearlySaving)} <span className="text-xs font-normal text-emerald-700">{c.tco.bar.perYear}</span>
                    </span>
                  </div>
                )}
              </div>
            )}

            <a
              href={ctaHref}
              className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {cta.label}
            </a>
          </div>
        </aside>
      </div>
    </div>
  )
}
