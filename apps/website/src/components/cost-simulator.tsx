import { cn } from '@explainer/ui'
import { useMemo, useState } from 'react'
import type { Locale } from '../i18n'

/**
 * What it costs to run an identity provider yourself.
 *
 * Every figure below is an assumption, shown to the reader and editable. It
 * models the self-hosted side only: it says nothing about what Autharie costs.
 */

const copy = {
  en: {
    inputs: 'Your setup',
    environments: 'Environments',
    environmentsHelp: 'Production plus staging, preview, and so on',
    users: 'Active users per month',
    availability: 'Availability',
    basic: 'Single instance',
    ha: 'Highly available',
    onCall: '24/7 on-call',
    onCallHelp: 'Somebody can be woken up when sign in is down',
    assumptions: 'Assumptions you can change',
    dayRate: 'Loaded cost of one engineering day',
    infraBase: 'Infrastructure per production environment, per month',
    perMonth: 'per month',
    perYear: 'per year',
    total: 'Estimated cost of running it yourself',
    breakdown: 'Where it goes',
    infra: 'Infrastructure',
    infraDetail: 'Compute, highly available Postgres, backup storage, monitoring',
    upgrades: 'Upgrades',
    upgradesDetail: 'Minor releases and one major a year, tested on every environment',
    backups: 'Backups and restore tests',
    backupsDetail: 'Checking that an archive actually restores',
    maintenance: 'Patching and monitoring',
    maintenanceDetail: 'Operating system, Postgres, Kubernetes and CVE follow-up',
    incidents: 'Incidents and support',
    incidentsDetail: 'Investigating when sign in is slow or down',
    security: 'Security upkeep',
    securityDetail: 'Key rotation, access reviews, audit preparation',
    onCallLine: 'On-call allowance',
    onCallLineDetail: 'A rotation that covers nights and weekends',
    time: 'Engineering time',
    days: 'working days per year',
    fte: 'of one full-time engineer',
    note: 'An estimate from typical figures, not a quote. Change the assumptions to match your own costs. It does not include the cost of an incident, a missed upgrade or a failed restore.',
    cta: 'Talk to us about taking this off your plate',
    pricing: 'Autharie runs all of this for you.',
  },
  fr: {
    inputs: 'Votre configuration',
    environments: 'Environnements',
    environmentsHelp: 'Production, plus préproduction, préviews, etc.',
    users: 'Utilisateurs actifs par mois',
    availability: 'Disponibilité',
    basic: 'Instance unique',
    ha: 'Haute disponibilité',
    onCall: 'Astreinte 24/7',
    onCallHelp: 'Quelqu’un peut être réveillé quand la connexion est en panne',
    assumptions: 'Hypothèses modifiables',
    dayRate: 'Coût chargé d’une journée d’ingénieur',
    infraBase: 'Infrastructure par environnement de production, par mois',
    perMonth: 'par mois',
    perYear: 'par an',
    total: 'Coût estimé pour l’exploiter vous-même',
    breakdown: 'Où part l’argent',
    infra: 'Infrastructure',
    infraDetail: 'Calcul, Postgres haute disponibilité, stockage des sauvegardes, supervision',
    upgrades: 'Mises à jour',
    upgradesDetail: 'Versions mineures et une majeure par an, testées sur chaque environnement',
    backups: 'Sauvegardes et tests de restauration',
    backupsDetail: 'Vérifier qu’une archive se restaure vraiment',
    maintenance: 'Correctifs et supervision',
    maintenanceDetail: 'Système, Postgres, Kubernetes et suivi des CVE',
    incidents: 'Incidents et support',
    incidentsDetail: 'Enquêter quand la connexion est lente ou en panne',
    security: 'Entretien de la sécurité',
    securityDetail: 'Rotation des clés, revues d’accès, préparation des audits',
    onCallLine: 'Prime d’astreinte',
    onCallLineDetail: 'Une rotation qui couvre nuits et week-ends',
    time: 'Temps d’ingénierie',
    days: 'jours de travail par an',
    fte: 'd’un ingénieur à temps plein',
    note: 'Une estimation à partir de chiffres courants, pas un devis. Modifiez les hypothèses pour qu’elles correspondent à vos coûts. Elle n’inclut pas le coût d’un incident, d’une mise à jour manquée ou d’une restauration qui échoue.',
    cta: 'Parlons de ce que nous pouvons vous retirer des mains',
    pricing: 'Autharie exploite tout cela pour vous.',
  },
}

const HOURS_PER_DAY = 7
const FTE_HOURS_PER_YEAR = 1600
const ON_CALL_PER_MONTH = 600

export function CostSimulator({ locale = 'en' }: { locale?: Locale }) {
  const t = copy[locale]
  const [environments, setEnvironments] = useState(2)
  const [users, setUsers] = useState(10000)
  const [ha, setHa] = useState(true)
  const [onCall, setOnCall] = useState(false)
  const [dayRate, setDayRate] = useState(600)
  const [infraBase, setInfraBase] = useState(260)

  const result = useMemo(() => {
    const others = Math.max(environments - 1, 0)
    // Production counts in full, every other environment at half.
    const weight = 1 + others * 0.5
    const hourly = dayRate / HOURS_PER_DAY

    const infraPerMonth = (ha ? infraBase : infraBase * 0.45) * weight * (1 + users / 150000)

    const hoursPerYear = {
      upgrades: (4 * 4 + 24) * weight,
      backups: 4 * 4,
      maintenance: (3 * 12) * weight * (ha ? 1 : 0.8),
      incidents: 3 * 12 * (ha ? 0.7 : 1),
      security: 16,
    }

    const money = {
      infra: infraPerMonth * 12,
      upgrades: hoursPerYear.upgrades * hourly,
      backups: hoursPerYear.backups * hourly,
      maintenance: hoursPerYear.maintenance * hourly,
      incidents: hoursPerYear.incidents * hourly,
      security: hoursPerYear.security * hourly,
      onCall: onCall ? ON_CALL_PER_MONTH * 12 : 0,
    }
    const totalYear = Object.values(money).reduce((sum, value) => sum + value, 0)
    const totalHours = Object.values(hoursPerYear).reduce((sum, value) => sum + value, 0)
    return { money, totalYear, totalMonth: totalYear / 12, totalHours }
  }, [environments, users, ha, onCall, dayRate, infraBase])

  const eur = new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-GB', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  })
  const num = new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-GB')

  const lines: { key: keyof typeof result.money; label: string; detail: string }[] = [
    { key: 'infra', label: t.infra, detail: t.infraDetail },
    { key: 'upgrades', label: t.upgrades, detail: t.upgradesDetail },
    { key: 'backups', label: t.backups, detail: t.backupsDetail },
    { key: 'maintenance', label: t.maintenance, detail: t.maintenanceDetail },
    { key: 'incidents', label: t.incidents, detail: t.incidentsDetail },
    { key: 'security', label: t.security, detail: t.securityDetail },
    ...(onCall ? [{ key: 'onCall' as const, label: t.onCallLine, detail: t.onCallLineDetail }] : []),
  ]

  const days = result.totalHours / HOURS_PER_DAY
  const fte = (result.totalHours / FTE_HOURS_PER_YEAR) * 100

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-7 rounded-2xl border bg-card p-6 sm:p-7">
        <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">{t.inputs}</h2>

        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="sim-env" className="font-medium">{t.environments}</label>
            <span className="font-semibold text-primary">{environments}</span>
          </div>
          <input
            id="sim-env"
            type="range"
            min={1}
            max={6}
            value={environments}
            onChange={(e) => setEnvironments(Number(e.target.value))}
            className="mt-3 w-full accent-[var(--color-primary)]"
          />
          <p className="mt-1.5 text-xs text-muted-foreground">{t.environmentsHelp}</p>
        </div>

        <div>
          <div className="flex items-baseline justify-between">
            <label htmlFor="sim-users" className="font-medium">{t.users}</label>
            <span className="font-semibold text-primary">{num.format(users)}</span>
          </div>
          <input
            id="sim-users"
            type="range"
            min={1000}
            max={200000}
            step={1000}
            value={users}
            onChange={(e) => setUsers(Number(e.target.value))}
            className="mt-3 w-full accent-[var(--color-primary)]"
          />
        </div>

        <div>
          <p className="font-medium">{t.availability}</p>
          <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg bg-surface p-1">
            {[
              { value: false, label: t.basic },
              { value: true, label: t.ha },
            ].map((option) => (
              <button
                key={String(option.value)}
                type="button"
                onClick={() => setHa(option.value)}
                aria-pressed={ha === option.value}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  ha === option.value ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={onCall}
            onChange={(e) => setOnCall(e.target.checked)}
            className="mt-1 size-4 accent-[var(--color-primary)]"
          />
          <span>
            <span className="block font-medium">{t.onCall}</span>
            <span className="block text-xs text-muted-foreground">{t.onCallHelp}</span>
          </span>
        </label>

        <details className="group rounded-lg border">
          <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
            {t.assumptions}
          </summary>
          <div className="space-y-4 border-t px-4 py-4">
            <label className="block text-sm">
              <span className="text-muted-foreground">{t.dayRate}</span>
              <div className="mt-1.5 flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  step={50}
                  value={dayRate}
                  onChange={(e) => setDayRate(Math.max(0, Number(e.target.value)))}
                  className="h-9 w-full rounded-md border bg-transparent px-3 text-sm"
                />
                <span className="text-muted-foreground">€</span>
              </div>
            </label>
            <label className="block text-sm">
              <span className="text-muted-foreground">{t.infraBase}</span>
              <div className="mt-1.5 flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  step={10}
                  value={infraBase}
                  onChange={(e) => setInfraBase(Math.max(0, Number(e.target.value)))}
                  className="h-9 w-full rounded-md border bg-transparent px-3 text-sm"
                />
                <span className="text-muted-foreground">€</span>
              </div>
            </label>
          </div>
        </details>
      </div>

      <div className="rounded-2xl border bg-card p-6 sm:p-7">
        <p className="text-sm text-muted-foreground">{t.total}</p>
        <p className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-5xl font-semibold tracking-tight">{eur.format(result.totalMonth)}</span>
          <span className="text-muted-foreground">{t.perMonth}</span>
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {eur.format(result.totalYear)} {t.perYear}
        </p>

        <div className="mt-6 flex h-2.5 w-full overflow-hidden rounded-full bg-surface" aria-hidden="true">
          {lines.map((line, i) => (
            <span
              key={line.key}
              style={{
                width: `${(result.money[line.key] / result.totalYear) * 100}%`,
                opacity: 1 - i * 0.11,
              }}
              className="bg-primary"
            />
          ))}
        </div>

        <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">{t.breakdown}</h3>
        <ul className="mt-3 divide-y">
          {lines.map((line) => (
            <li key={line.key} className="flex items-start justify-between gap-4 py-3">
              <span className="min-w-0">
                <span className="block text-sm font-medium">{line.label}</span>
                <span className="block text-xs text-muted-foreground">{line.detail}</span>
              </span>
              <span className="shrink-0 text-sm font-semibold tabular-nums">{eur.format(result.money[line.key])}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 grid gap-3 rounded-xl bg-surface p-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-muted-foreground">{t.time}</p>
            <p className="mt-1 text-lg font-semibold">
              {num.format(Math.round(days))} <span className="text-sm font-normal text-muted-foreground">{t.days}</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">&nbsp;</p>
            <p className="mt-1 text-lg font-semibold">
              {Math.round(fte)}% <span className="text-sm font-normal text-muted-foreground">{t.fte}</span>
            </p>
          </div>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{t.note}</p>
      </div>
    </div>
  )
}
