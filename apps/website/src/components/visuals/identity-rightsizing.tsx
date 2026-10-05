import { useState } from 'react'
import { cn } from '@explainer/ui'
import { ConsoleWindow, Icon, StatusBadge } from '../console/ui'

const copy = {
  en: {
    title: 'Permissions not used in 90 days',
    user: 'Person',
    role: 'Permission',
    used: 'Last used',
    never: 'Never',
    removed: 'Removed',
    apply: (n: number) => `Remove ${n} unused permission${n > 1 ? 's' : ''}`,
    done: 'Access reduced. The change is recorded and can be reverted.',
    undo: 'Revert',
    days: (d: number) => `${d} days ago`,
  },
  fr: {
    title: 'Permissions inutilisées depuis 90 jours',
    user: 'Personne',
    role: 'Permission',
    used: 'Dernier usage',
    never: 'Jamais',
    removed: 'Retirée',
    apply: (n: number) => `Retirer ${n} permission${n > 1 ? 's' : ''} inutilisée${n > 1 ? 's' : ''}`,
    done: 'Accès réduits. Le changement est consigné et peut être annulé.',
    undo: 'Annuler',
    days: (d: number) => `il y a ${d} j`,
  },
}

const rows = [
  { user: 'm.durand', role: 'realm-admin', days: 212 },
  { user: 'l.petit', role: 'billing-export', days: 131 },
  { user: 'svc-reports', role: 'users:write', days: null },
  { user: 'a.nguyen', role: 'client-admin', days: 97 },
]

export default function IdentityRightsizing({ locale = 'en' }: { locale?: 'en' | 'fr' }) {
  const t = copy[locale]
  const [done, setDone] = useState(false)
  return (
    <ConsoleWindow className="shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b p-4">
        <p className="text-sm font-semibold">{t.title}</p>
        {done ? (
          <button type="button" onClick={() => setDone(false)} className="rounded-md border px-2.5 py-1 text-xs font-medium hover:bg-accent">
            {t.undo}
          </button>
        ) : (
          <button type="button" onClick={() => setDone(true)} className="inline-flex h-8 items-center gap-2 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90">
            <Icon name="trash-2" className="h-3.5 w-3.5" />
            {t.apply(rows.length)}
          </button>
        )}
      </div>
      <div className="grid grid-cols-[1.1fr_1.2fr_1fr] gap-2 border-b px-4 py-2 text-xs font-medium text-muted-foreground">
        <span>{t.user}</span>
        <span>{t.role}</span>
        <span className="text-right">{t.used}</span>
      </div>
      <ul className="divide-y">
        {rows.map((r) => (
          <li key={r.user} className={cn('grid grid-cols-[1.1fr_1.2fr_1fr] items-center gap-2 px-4 py-3 text-sm transition-colors duration-300', done && 'bg-muted/40')}>
            <span className={cn('truncate font-medium', done && 'text-muted-foreground')}>{r.user}</span>
            <code className={cn('w-fit truncate rounded border bg-muted/40 px-1.5 py-0.5 font-mono text-[11px]', done && 'text-muted-foreground line-through')}>{r.role}</code>
            <span className="flex justify-end">
              {done ? (
                <StatusBadge tone="success">{t.removed}</StatusBadge>
              ) : (
                <span className="text-xs text-muted-foreground">{r.days === null ? t.never : t.days(r.days)}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
      <p className={cn('flex items-center gap-2 border-t px-4 py-2.5 text-xs transition-colors', done ? 'bg-green-50 text-green-800' : 'bg-muted/30 text-muted-foreground')}>
        <Icon name="circle-check" className="h-3.5 w-3.5" />
        {done ? t.done : locale === 'fr' ? 'Rien n’est retiré tant que vous n’avez pas validé.' : 'Nothing is removed until you approve it.'}
      </p>
    </ConsoleWindow>
  )
}
