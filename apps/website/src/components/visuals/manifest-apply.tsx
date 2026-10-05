import { useEffect, useRef, useState } from 'react'
import { cn } from '@explainer/ui'
import { ConsoleWindow, Icon, StatusBadge } from '../console/ui'

const copy = {
  en: { file: 'acme-production.yaml', version: 'Version', replicas: 'Database replicas', region: 'Region', apply: 'Apply', pending: 'Changes to apply', synced: 'In sync', applying: 'Reconciling', steps: ['Validate', 'Plan', 'Roll out'], observed: 'Observed state', applied: 'Applied by the operator, no manual step.', hint: 'Edit the manifest values, then apply. The operator does the rest.' },
  fr: { file: 'acme-production.yaml', version: 'Version', replicas: 'Réplicas de base', region: 'Région', apply: 'Appliquer', pending: 'Changements à appliquer', synced: 'À jour', applying: 'Réconciliation', steps: ['Validation', 'Plan', 'Déploiement'], observed: 'État observé', applied: 'Appliqué par l’opérateur, sans étape manuelle.', hint: 'Modifiez les valeurs du manifeste puis appliquez. L’opérateur fait le reste.' },
}

type S = { version: string; replicas: number; region: string }
const start: S = { version: '1.4.2', replicas: 3, region: 'eu-paris' }

const Chip = ({ on, children, onClick }: { on: boolean; children: React.ReactNode; onClick: () => void }) => (
  <button type="button" onClick={onClick} className={cn('rounded-md border px-2 py-1 font-mono text-[11px] transition-colors', on ? 'border-primary/40 bg-primary/10 text-primary' : 'hover:bg-accent')}>
    {children}
  </button>
)

export default function ManifestApply({ locale = 'en' }: { locale?: 'en' | 'fr' }) {
  const t = copy[locale]
  const [draft, setDraft] = useState<S>(start)
  const [live, setLive] = useState<S>(start)
  const [step, setStep] = useState<number | null>(null)
  const timers = useRef<number[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const dirty = JSON.stringify(draft) !== JSON.stringify(live)
  const apply = () => {
    if (!dirty || step !== null) return
    const target = draft
    setStep(0)
    timers.current.push(window.setTimeout(() => setStep(1), 700))
    timers.current.push(window.setTimeout(() => setStep(2), 1400))
    timers.current.push(window.setTimeout(() => (setLive(target), setStep(null)), 2300))
  }

  const line = (k: string, v: string, changed: boolean) => (
    <div className={cn('px-4', changed && 'bg-amber-400/15')}>
      <span className="text-sky-300">{k}</span>: <span className="text-amber-200">{v}</span>
    </div>
  )

  return (
    <ConsoleWindow className="shadow-sm">
      <div className="grid md:grid-cols-[1.15fr_0.85fr]">
        <div className="border-b md:border-b-0 md:border-r">
          <div className="flex items-center justify-between border-b px-4 py-2.5 text-xs">
            <span className="flex items-center gap-2 font-mono text-muted-foreground">
              <Icon name="scroll-text" className="h-3.5 w-3.5" />
              {t.file}
            </span>
            {dirty && <StatusBadge tone="warning">{t.pending}</StatusBadge>}
          </div>
          <div className="bg-[#14131f] py-3 font-mono text-[11.5px] leading-6 text-slate-300">
            <div className="px-4"><span className="text-sky-300">kind</span>: IdentityInstance</div>
            <div className="px-4"><span className="text-sky-300">metadata</span>:</div>
            <div className="px-4 pl-8"><span className="text-sky-300">name</span>: acme-production</div>
            <div className="px-4"><span className="text-sky-300">spec</span>:</div>
            <div className="px-4 pl-8"><span className="text-sky-300">provider</span>: ferriskey</div>
            <div className="pl-4">{line('  version', `"${draft.version}"`, draft.version !== live.version)}</div>
            <div className="pl-4">{line('  region', draft.region, draft.region !== live.region)}</div>
            <div className="px-4 pl-8"><span className="text-sky-300">database</span>:</div>
            <div className="pl-8">{line('  instances', String(draft.replicas), draft.replicas !== live.replicas)}</div>
          </div>
          <div className="space-y-2 border-t p-3 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="w-24 text-muted-foreground">{t.version}</span>
              {['1.4.2', '1.5.0'].map((v) => <Chip key={v} on={draft.version === v} onClick={() => setDraft({ ...draft, version: v })}>{v}</Chip>)}
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="w-24 text-muted-foreground">{t.replicas}</span>
              {[1, 3].map((v) => <Chip key={v} on={draft.replicas === v} onClick={() => setDraft({ ...draft, replicas: v })}>{v}</Chip>)}
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="w-24 text-muted-foreground">{t.region}</span>
              {['eu-paris', 'onprem-lyon'].map((v) => <Chip key={v} on={draft.region === v} onClick={() => setDraft({ ...draft, region: v })}>{v}</Chip>)}
            </div>
          </div>
        </div>

        <div className="space-y-4 p-4">
          <button type="button" onClick={apply} disabled={!dirty || step !== null} className="inline-flex h-8 w-full items-center justify-center gap-2 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40">
            <Icon name="rocket" className="h-3.5 w-3.5" />
            {t.apply}
          </button>
          <div className="space-y-2.5 rounded-lg border p-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t.observed}</span>
              <StatusBadge tone={step === null ? 'success' : 'progress'}>{step === null ? t.synced : t.applying}</StatusBadge>
            </div>
            {step !== null && (
              <ol className="flex gap-1.5">
                {t.steps.map((s, i) => (
                  <li key={s} className={cn('flex-1 rounded border px-1 py-1 text-center text-[10px]', i <= step ? 'border-blue-300 bg-blue-100 text-blue-800' : 'text-muted-foreground')}>{s}</li>
                ))}
              </ol>
            )}
            {[[t.version, live.version], [t.replicas, String(live.replicas)], [t.region, live.region]].map(([k, v]) => (
              <div key={k} className="flex justify-between text-xs">
                <span className="text-muted-foreground">{k}</span>
                <span className="font-mono font-medium">{v}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground">{step === null && !dirty ? t.applied : t.hint}</p>
        </div>
      </div>
    </ConsoleWindow>
  )
}
