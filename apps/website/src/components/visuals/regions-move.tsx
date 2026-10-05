import { useEffect, useRef, useState } from 'react'
import { cn } from '@explainer/ui'
import { ConsoleWindow, Icon, StatusBadge } from '../console/ui'

const copy = {
  en: {
    regions: [
      { id: 'paris', name: 'eu-paris', owner: 'Autharie · Scaleway' },
      { id: 'lyon', name: 'onprem-lyon', owner: 'Your cluster' },
    ],
    move: 'Move to',
    moving: 'Moving',
    again: 'Move back',
    running: 'Running',
    steps: ['Archive', 'Restore', 'Switch traffic'],
    same: 'Same address, same applications, nothing to reconfigure',
    empty: 'No instance',
  },
  fr: {
    regions: [
      { id: 'paris', name: 'eu-paris', owner: 'Autharie · Scaleway' },
      { id: 'lyon', name: 'onprem-lyon', owner: 'Votre cluster' },
    ],
    move: 'Déplacer vers',
    moving: 'Déplacement',
    again: 'Ramener',
    running: 'Actif',
    steps: ['Archive', 'Restauration', 'Bascule du trafic'],
    same: 'Même adresse, mêmes applications, rien à reconfigurer',
    empty: 'Aucune instance',
  },
}

const initial: Record<string, 'paris' | 'lyon'> = { 'acme-production': 'paris', 'acme-staging': 'paris', partners: 'lyon' }
const names = Object.keys(initial)
const address: Record<string, string> = { 'acme-production': 'id.acme.com', 'acme-staging': 'id-staging.acme.com', partners: 'id.partners.acme.com' }

export default function RegionsMove({ locale = 'en' }: { locale?: 'en' | 'fr' }) {
  const t = copy[locale]
  const [where, setWhere] = useState(initial)
  const [moving, setMoving] = useState<{ name: string; step: number } | null>(null)
  const timers = useRef<number[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const move = (name: string) => {
    if (moving) return
    const to = where[name] === 'paris' ? 'lyon' : 'paris'
    setMoving({ name, step: 0 })
    timers.current.push(window.setTimeout(() => setMoving({ name, step: 1 }), 900))
    timers.current.push(window.setTimeout(() => setMoving({ name, step: 2 }), 1800))
    timers.current.push(
      window.setTimeout(() => {
        setWhere((w) => ({ ...w, [name]: to }))
        setMoving(null)
      }, 2700),
    )
  }

  return (
    <ConsoleWindow className="shadow-sm">
      <div className="grid sm:grid-cols-2 sm:divide-x">
        {t.regions.map((r) => {
          const here = names.filter((n) => where[n] === r.id)
          return (
            <div key={r.id} className="space-y-2 border-b p-4 sm:border-b-0">
              <div className="flex items-center gap-2">
                <Icon name={r.id === 'paris' ? 'globe' : 'server'} className="h-4 w-4 text-muted-foreground" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-none">{r.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{r.owner}</p>
                </div>
              </div>
              <div className="min-h-[148px] space-y-2">
                {here.length === 0 && <p className="rounded-lg border border-dashed p-3 text-xs text-muted-foreground">{t.empty}</p>}
                {here.map((n) => {
                  const busy = moving?.name === n
                  const target = t.regions.find((x) => x.id !== r.id)!.name
                  return (
                    <div key={n} className={cn('rounded-lg border p-3 transition-colors', busy && 'border-blue-200 bg-blue-50/50')}>
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-medium">{n}</span>
                        <span className="shrink-0 whitespace-nowrap"><StatusBadge tone={busy ? 'progress' : 'success'}>{busy ? t.moving : t.running}</StatusBadge></span>
                      </div>
                      {busy ? (
                        <ol className="mt-2 flex gap-1.5">
                          {t.steps.map((s, i) => (
                            <li key={s} className={cn('flex-1 rounded border px-1.5 py-1 text-center text-[10px]', i <= moving!.step ? 'border-blue-300 bg-blue-100 text-blue-800' : 'text-muted-foreground')}>
                              {s}
                            </li>
                          ))}
                        </ol>
                      ) : (
                        <div className="mt-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
                          <span className="text-xs text-muted-foreground">{address[n]}</span>
                          <button
                            type="button"
                            onClick={() => move(n)}
                            disabled={!!moving}
                            className="shrink-0 rounded-md border px-2 py-1 text-[11px] font-medium transition-colors hover:bg-accent disabled:opacity-40"
                          >
                            {t.move} {target}
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      <p className="flex items-center gap-2 border-t bg-muted/30 px-4 py-2.5 text-xs text-muted-foreground">
        <Icon name="circle-check" className="h-3.5 w-3.5 text-green-600" />
        {t.same}
      </p>
    </ConsoleWindow>
  )
}
