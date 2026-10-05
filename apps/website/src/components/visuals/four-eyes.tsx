import { useState } from 'react'
import { cn } from '@explainer/ui'
import { ConsoleWindow, Icon, StatusBadge } from '../console/ui'

const copy = {
  en: {
    title: 'Privileged access request', who: 'a.nguyen', ask: 'Requests', role: 'realm-admin', for: 'for 4 hours', why: 'Reason: restore the payment client after an incident',
    steps: ['Requested', 'Approved by a second person', 'Granted', 'Expired'],
    approve: 'Approve as k.laurent', reject: 'Reject', restart: 'Start over', pending: 'Waiting for approval', granted: 'Granted, ends 18:30', rejected: 'Rejected', note: 'Nobody can approve their own request. Both decisions are in the audit log.',
  },
  fr: {
    title: 'Demande d’accès privilégié', who: 'a.nguyen', ask: 'Demande', role: 'realm-admin', for: 'pour 4 heures', why: 'Motif : rétablir le client de paiement après un incident',
    steps: ['Demandé', 'Approuvé par une deuxième personne', 'Accordé', 'Expiré'],
    approve: 'Approuver en tant que k.laurent', reject: 'Refuser', restart: 'Recommencer', pending: 'En attente d’approbation', granted: 'Accordé, jusqu’à 18 h 30', rejected: 'Refusé', note: 'Personne ne peut approuver sa propre demande. Les deux décisions sont dans le journal d’audit.',
  },
}

export default function FourEyes({ locale = 'en' }: { locale?: 'en' | 'fr' }) {
  const t = copy[locale]
  const [state, setState] = useState<'pending' | 'granted' | 'rejected'>('pending')
  const progress = state === 'pending' ? 1 : state === 'granted' ? 3 : 1
  return (
    <ConsoleWindow className="shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b p-4">
        <p className="text-sm font-semibold">{t.title}</p>
        <StatusBadge tone={state === 'pending' ? 'warning' : state === 'granted' ? 'success' : 'danger'}>{state === 'pending' ? t.pending : state === 'granted' ? t.granted : t.rejected}</StatusBadge>
      </div>
      <div className="space-y-3 p-4">
        <div className="rounded-lg border p-3 text-sm">
          <p><span className="font-medium">{t.who}</span> <span className="text-muted-foreground">{t.ask}</span> <code className="rounded border bg-muted/40 px-1.5 py-0.5 font-mono text-[11px]">{t.role}</code> <span className="text-muted-foreground">{t.for}</span></p>
          <p className="mt-1.5 text-xs text-muted-foreground">{t.why}</p>
        </div>
        <ol className="space-y-0">
          {t.steps.map((s, i) => {
            const done = i < progress || (state === 'rejected' && i === 0)
            return (
              <li key={s} className="relative flex gap-3 pb-3 last:pb-0">
                {i < t.steps.length - 1 && <span className="absolute left-[9px] top-5 h-[calc(100%-8px)] w-px bg-border" aria-hidden="true" />}
                <span className={cn('z-10 mt-0.5 flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full border bg-background', done ? 'border-green-400 text-green-600' : 'text-muted-foreground/50')}>
                  {done && <Icon name="check" className="h-2.5 w-2.5" />}
                </span>
                <span className={cn('text-sm', done ? 'font-medium' : 'text-muted-foreground')}>{s}</span>
              </li>
            )
          })}
        </ol>
        {state === 'pending' ? (
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setState('granted')} className="h-8 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:opacity-90">{t.approve}</button>
            <button type="button" onClick={() => setState('rejected')} className="h-8 rounded-md border px-3 text-xs font-medium hover:bg-accent">{t.reject}</button>
          </div>
        ) : (
          <button type="button" onClick={() => setState('pending')} className="h-8 rounded-md border px-3 text-xs font-medium hover:bg-accent">{t.restart}</button>
        )}
      </div>
      <p className="flex items-center gap-2 border-t bg-muted/30 px-4 py-2.5 text-xs text-muted-foreground"><Icon name="shield-check" className="h-3.5 w-3.5" />{t.note}</p>
    </ConsoleWindow>
  )
}
