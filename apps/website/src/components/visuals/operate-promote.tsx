import { useEffect, useRef, useState } from 'react'
import { cn } from '@explainer/ui'
import { ConsoleWindow, Icon, StatusBadge } from '../console/ui'

const copy = {
  en: {
    staging: 'Staging',
    production: 'Production',
    checks: ['Migrations applied', 'Sign-in flow works', 'Clients unchanged'],
    promote: 'Promote 1.5.0 to production',
    promoting: 'Rolling out',
    steps: ['Archive', 'Upgrade', 'Verify'],
    running: 'Running',
    again: 'Start over',
    note: 'Production keeps serving during the rollout. A version can be stopped or held back.',
  },
  fr: {
    staging: 'Préproduction',
    production: 'Production',
    checks: ['Migrations appliquées', 'Connexion fonctionnelle', 'Clients inchangés'],
    promote: 'Promouvoir la 1.5.0 en production',
    promoting: 'Déploiement',
    steps: ['Archive', 'Mise à jour', 'Vérification'],
    running: 'Actif',
    again: 'Recommencer',
    note: 'La production continue de servir pendant le déploiement. Une version peut être stoppée ou retenue.',
  },
}

export default function OperatePromote({ locale = 'en' }: { locale?: 'en' | 'fr' }) {
  const t = copy[locale]
  const [step, setStep] = useState<number | null>(null)
  const [version, setVersion] = useState('1.4.2')
  const timers = useRef<number[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const promote = () => {
    if (step !== null) return
    setStep(0)
    timers.current.push(window.setTimeout(() => setStep(1), 900))
    timers.current.push(window.setTimeout(() => setStep(2), 1800))
    timers.current.push(
      window.setTimeout(() => {
        setVersion('1.5.0')
        setStep(null)
      }, 2700),
    )
  }

  const busy = step !== null
  const done = version === '1.5.0'

  return (
    <ConsoleWindow className="shadow-sm">
      <div className="space-y-3 p-4">
        <div className="rounded-lg border p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold">
              {t.staging} <span className="font-normal text-muted-foreground">· acme-staging</span>
            </p>
            <span className="flex items-center gap-2">
              <code className="rounded border bg-muted/40 px-1.5 py-0.5 font-mono text-[11px]">1.5.0</code>
              <StatusBadge tone="success">{t.running}</StatusBadge>
            </span>
          </div>
          <ul className="mt-3 space-y-1.5">
            {t.checks.map((c) => (
              <li key={c} className="flex items-center gap-2 text-sm">
                <Icon name="circle-check" className="h-3.5 w-3.5 text-green-600" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={promote}
            disabled={busy || done}
            className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            <Icon name="arrow-up-circle" className="h-4 w-4" />
            {t.promote}
          </button>
        </div>

        <div className={cn('rounded-lg border p-3 transition-colors', busy && 'border-blue-200 bg-blue-50/50', done && 'border-green-200 bg-green-50/40')}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold">
              {t.production} <span className="font-normal text-muted-foreground">· acme-production</span>
            </p>
            <span className="flex items-center gap-2">
              <code className="rounded border bg-background px-1.5 py-0.5 font-mono text-[11px]">{version}</code>
              <StatusBadge tone={busy ? 'progress' : 'success'}>{busy ? t.promoting : t.running}</StatusBadge>
            </span>
          </div>
          {busy && (
            <ol className="mt-3 flex gap-1.5">
              {t.steps.map((s, i) => (
                <li key={s} className={cn('flex-1 rounded border px-1.5 py-1 text-center text-[10px]', i <= step! ? 'border-blue-300 bg-blue-100 text-blue-800' : 'text-muted-foreground')}>
                  {s}
                </li>
              ))}
            </ol>
          )}
          {done && !busy && (
            <button type="button" onClick={() => setVersion('1.4.2')} className="mt-3 text-[11px] text-muted-foreground underline underline-offset-2">
              {t.again}
            </button>
          )}
        </div>
      </div>
      <p className="flex items-center gap-2 border-t bg-muted/30 px-4 py-2.5 text-xs text-muted-foreground">
        <Icon name="info" className="h-3.5 w-3.5" />
        {t.note}
      </p>
    </ConsoleWindow>
  )
}
