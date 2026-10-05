import { useState } from 'react'
import { cn } from '@explainer/ui'
import { ConsoleWindow, Icon, StatusBadge } from '../console/ui'

const copy = {
  en: {
    steps: [
      { name: 'Inventory', body: 'What runs today, read from your Keycloak.' },
      { name: 'Staging', body: 'A copy on Autharie, tested before anyone depends on it.' },
      { name: 'Switch', body: 'Applications point to the new address, one by one.' },
      { name: 'Retire', body: 'The old server stays as a fallback, then goes.' },
    ],
    rows: [['Realms', 3], ['Clients', 41], ['Roles', 128], ['Users', 18420]],
    source: 'Your Keycloak', target: 'Autharie instance', next: 'Next step', again: 'Start over', match: 'Match', pending: 'Not yet', matchNote: 'Counts match between source and target.',
    apps: 'Applications on the new address',
  },
  fr: {
    steps: [
      { name: 'Inventaire', body: 'Ce qui tourne aujourd’hui, lu depuis votre Keycloak.' },
      { name: 'Préproduction', body: 'Une copie sur Autharie, testée avant que quiconque en dépende.' },
      { name: 'Bascule', body: 'Les applications pointent vers la nouvelle adresse, une par une.' },
      { name: 'Retrait', body: 'L’ancien serveur reste en secours, puis disparaît.' },
    ],
    rows: [['Realms', 3], ['Clients', 41], ['Rôles', 128], ['Utilisateurs', 18420]],
    source: 'Votre Keycloak', target: 'Instance Autharie', next: 'Étape suivante', again: 'Recommencer', match: 'Identique', pending: 'Pas encore', matchNote: 'Les totaux concordent entre la source et la cible.',
    apps: 'Applications sur la nouvelle adresse',
  },
}

export default function MigrationPlan({ locale = 'en' }: { locale?: 'en' | 'fr' }) {
  const t = copy[locale]
  const [step, setStep] = useState(0)
  const nf = new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US')
  const switched = step === 2 ? 17 : step >= 3 ? 41 : 0
  return (
    <ConsoleWindow className="shadow-sm">
      <ol className="grid grid-cols-4 border-b text-center text-[11px]">
        {t.steps.map((s, i) => (
          <li key={s.name} className={cn('border-r px-1 py-2.5 last:border-r-0', i === step ? 'bg-primary/10 font-medium text-primary' : i < step ? 'text-foreground' : 'text-muted-foreground')}>
            <span className="flex items-center justify-center gap-1">{i < step && <Icon name="check" className="h-3 w-3 text-green-600" />}{s.name}</span>
          </li>
        ))}
      </ol>
      <div className="space-y-4 p-4">
        <p className="text-sm text-muted-foreground">{t.steps[step].body}</p>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-xs text-muted-foreground">
              <th className="py-1.5 text-left font-medium" />
              <th className="py-1.5 text-right font-medium">{t.source}</th>
              <th className="py-1.5 text-right font-medium">{t.target}</th>
              <th className="py-1.5 pr-0 text-right font-medium" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {t.rows.map(([label, n]) => {
              const imported = step >= 1
              return (
                <tr key={String(label)}>
                  <td className="py-2">{label}</td>
                  <td className="py-2 text-right tabular-nums">{nf.format(n as number)}</td>
                  <td className="py-2 text-right tabular-nums">{imported ? nf.format(n as number) : '—'}</td>
                  <td className="py-2 text-right"><StatusBadge tone={imported ? 'success' : 'neutral'} dot={false}>{imported ? t.match : t.pending}</StatusBadge></td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {step >= 2 && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs"><span className="text-muted-foreground">{t.apps}</span><span className="font-medium tabular-nums">{switched}/41</span></div>
            <span className="block h-1.5 overflow-hidden rounded-full bg-muted"><span className="block h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${(switched / 41) * 100}%` }} /></span>
          </div>
        )}
        <button type="button" onClick={() => setStep((s) => (s >= 3 ? 0 : s + 1))} className="inline-flex h-8 items-center gap-2 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:opacity-90">
          {step >= 3 ? t.again : t.next}
          <Icon name={step >= 3 ? 'refresh-cw' : 'chevron-right'} className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="flex items-center gap-2 border-t bg-muted/30 px-4 py-2.5 text-xs text-muted-foreground"><Icon name="circle-check" className="h-3.5 w-3.5 text-green-600" />{t.matchNote}</p>
    </ConsoleWindow>
  )
}
