import { useState } from 'react'
import { cn } from '@explainer/ui'
import { ConsoleWindow, Icon, StatusBadge } from '../console/ui'

type Kind = 'admin' | 'access' | 'policy'
const events: { t: string; kind: Kind; en: string; fr: string; by: string }[] = [
  { t: '14:02', kind: 'admin', en: 'Role realm-admin granted to svc-billing', fr: 'Rôle realm-admin accordé à svc-billing', by: 'm.durand' },
  { t: '13:47', kind: 'policy', en: 'Policy “Unusual country for admins” updated', fr: 'Politique « Pays inhabituel pour un admin » modifiée', by: 'c.martin' },
  { t: '13:15', kind: 'access', en: 'Passkey required for c.martin (new device)', fr: 'Passkey exigée pour c.martin (nouvel appareil)', by: 'policy' },
  { t: '11:40', kind: 'admin', en: 'User l.petit disabled', fr: 'Utilisateur l.petit désactivé', by: 'c.martin' },
  { t: '10:05', kind: 'access', en: 'Realm export downloaded', fr: 'Export du realm téléchargé', by: 'j.roche' },
  { t: '09:12', kind: 'policy', en: 'Session lifetime set to 8 h', fr: 'Durée de session fixée à 8 h', by: 'c.martin' },
]
const copy = {
  en: { title: 'Audit log', filters: { all: 'All', admin: 'Administration', access: 'Access', policy: 'Policies' }, export: 'Export for the auditor', who: 'by', range: 'Today', kept: 'Kept for 12 months', ready: 'Prepared as a CSV with author, date and object.' },
  fr: { title: 'Journal d’audit', filters: { all: 'Tout', admin: 'Administration', access: 'Accès', policy: 'Politiques' }, export: 'Exporter pour l’auditeur', who: 'par', range: 'Aujourd’hui', kept: 'Conservé 12 mois', ready: 'Préparé en CSV avec auteur, date et objet.' },
}
const tone = { admin: 'accent', access: 'progress', policy: 'warning' } as const

export default function AuditTrail({ locale = 'en' }: { locale?: 'en' | 'fr' }) {
  const t = copy[locale]
  const [filter, setFilter] = useState<'all' | Kind>('all')
  const [exported, setExported] = useState(false)
  const shown = events.filter((e) => filter === 'all' || e.kind === filter)
  return (
    <ConsoleWindow className="shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b p-4">
        <div>
          <p className="text-sm font-semibold">{t.title}</p>
          <p className="text-xs text-muted-foreground">{t.range} · {t.kept}</p>
        </div>
        <button type="button" onClick={() => setExported(true)} className="inline-flex h-8 items-center gap-2 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:opacity-90">
          <Icon name="download" className="h-3.5 w-3.5" />
          {t.export}
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5 border-b p-3" role="tablist">
        {(Object.keys(t.filters) as ('all' | Kind)[]).map((k) => (
          <button key={k} type="button" role="tab" aria-selected={filter === k} onClick={() => setFilter(k)} className={cn('rounded-md border px-2.5 py-1 text-xs transition-colors', filter === k ? 'border-primary/40 bg-primary/10 font-medium text-primary' : 'text-muted-foreground hover:bg-accent')}>
            {t.filters[k]}
          </button>
        ))}
      </div>
      <ul className="divide-y">
        {shown.map((e) => (
          <li key={e.t + e.en} className="flex items-start gap-3 px-4 py-3">
            <span className="w-10 shrink-0 pt-0.5 font-mono text-[11px] text-muted-foreground">{e.t}</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm">{e[locale]}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{t.who} {e.by}</p>
            </div>
            <StatusBadge tone={tone[e.kind]} dot={false}>{t.filters[e.kind]}</StatusBadge>
          </li>
        ))}
      </ul>
      <p className={cn('flex items-center gap-2 border-t px-4 py-2.5 text-xs', exported ? 'bg-green-50 text-green-800' : 'bg-muted/30 text-muted-foreground')}>
        <Icon name={exported ? 'circle-check' : 'info'} className="h-3.5 w-3.5" />
        {exported ? `${shown.length} · ${t.ready}` : t.ready}
      </p>
    </ConsoleWindow>
  )
}
