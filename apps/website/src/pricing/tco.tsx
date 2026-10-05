import { cn } from '@explainer/ui'
import type { Locale } from '../i18n'
import { pricingCopy } from './copy'
import { thumbAt } from './slider'
import { internalHoursPerYear, internalMonthly, type TcoInput } from './model'

interface Props {
  locale: Locale
  input: TcoInput
  onChange: (patch: Partial<TcoInput>) => void
  /** What the configuration chosen above costs, per month. */
  autharie: { amount: number }
  /** A short description of that configuration. */
  configuration: string
}

export function TcoComparator({ locale, input, onChange: set, autharie, configuration }: Props) {
  const t = pricingCopy[locale].tco

  const eur = new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-GB', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  })
  const num = new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-GB', { maximumFractionDigits: 0 })

  const internal = internalMonthly(input)
  const yearlySaving = (internal - autharie.amount) * 12
  const saves = yearlySaving > 0
  const hours = Math.round(internalHoursPerYear(input) / 10) * 10

  const toggles: { key: 'ha' | 'onCall' | 'majorUpgrades' | 'cve'; label: string; help: string }[] = [
    { key: 'ha', label: t.ha, help: t.haHelp },
    { key: 'onCall', label: t.onCall, help: t.onCallHelp },
    { key: 'majorUpgrades', label: t.majors, help: t.majorsHelp },
    { key: 'cve', label: t.cve, help: t.cveHelp },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] xl:grid-cols-1">
      <div className="space-y-7 rounded-2xl border bg-card p-6 sm:p-7">
        <div>
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor="tco-salary" className="font-medium">{t.salary}</label>
            <span className="shrink-0 font-semibold text-primary">{eur.format(input.salary)}</span>
          </div>
          <input
            id="tco-salary"
            type="range"
            min={40000}
            max={150000}
            step={1000}
            value={input.salary}
            onChange={(e) => set({ salary: Number(e.target.value) })}
            className="slider mt-3"
            style={{ '--fill': thumbAt((input.salary - 40000) / (150000 - 40000)) } as React.CSSProperties}
          />
          <p className="mt-1.5 text-xs text-muted-foreground">{t.salaryHelp}</p>
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor="tco-time" className="font-medium">{t.time}</label>
            <span className="shrink-0 font-semibold text-primary">{input.timePercent} %</span>
          </div>
          <input
            id="tco-time"
            type="range"
            min={5}
            max={100}
            step={5}
            value={input.timePercent}
            onChange={(e) => set({ timePercent: Number(e.target.value) })}
            className="slider mt-3"
            style={{ '--fill': thumbAt((input.timePercent - 5) / (100 - 5)) } as React.CSSProperties}
          />
          <p className="mt-1.5 text-xs text-muted-foreground">{t.timeHelp}</p>
        </div>

        <div className="space-y-4">
          {toggles.map((toggle) => (
            <label key={toggle.key} className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={input[toggle.key]}
                onChange={(e) => set({ [toggle.key]: e.target.checked })}
                className="mt-1 size-4 shrink-0 accent-[var(--color-primary)]"
              />
              <span>
                <span className="block text-sm font-medium">{toggle.label}</span>
                <span className="block text-xs text-muted-foreground">{toggle.help}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border bg-card p-6">
            <p className="text-sm text-muted-foreground">{t.internal}</p>
            <p className="mt-2 flex flex-wrap items-baseline gap-x-2">
              <span className="text-4xl font-semibold tracking-tight tabular-nums">{eur.format(internal)}</span>
              <span className="text-sm text-muted-foreground">{t.perMonth}</span>
            </p>
          </div>
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
            <p className="text-sm text-muted-foreground">{t.autharie}</p>
            <p className="mt-2 flex flex-wrap items-baseline gap-x-2">
              <span className="text-4xl font-semibold tracking-tight tabular-nums">{eur.format(autharie.amount)}</span>
              <span className="text-sm text-muted-foreground">{t.perMonth}</span>
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              {t.configured}: {configuration}
            </p>
          </div>
        </div>

        <div
          className={cn(
            'rounded-2xl border p-6',
            saves ? 'border-emerald-200 bg-emerald-50' : 'bg-card',
          )}
          aria-live="polite"
        >
          {saves ? (
            <>
              <p className="text-sm font-medium text-emerald-800">{t.savings}</p>
              <p className="mt-2 flex flex-wrap items-baseline gap-x-2">
                <span className="text-5xl font-semibold tracking-tight text-emerald-600 tabular-nums">
                  {eur.format(yearlySaving)}
                </span>
                <span className="text-sm text-emerald-800">{t.perYear}</span>
              </p>
              <p className="mt-3 text-sm text-emerald-900">{t.hours(num.format(hours))}</p>
            </>
          ) : (
            <p className="text-sm leading-relaxed text-muted-foreground">{t.noSaving}</p>
          )}
        </div>

        <p className="text-xs leading-relaxed text-muted-foreground">{t.assumptions}</p>
      </div>
    </div>
  )
}
