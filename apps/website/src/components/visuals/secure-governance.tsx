import { ConsoleWindow, Icon, StatusBadge } from '../console/ui'

const copy = {
  en: {
    title: 'Governance review',
    scan: 'Last scan 4 minutes ago',
    stats: [
      ['Critical accounts', '9'],
      ['Privilege changes, 24 h', '2'],
      ['Open findings', '3'],
    ],
    findings: [
      { sev: 'danger' as const, label: 'High', title: 'Privilege escalation', body: 'svc-billing received realm-admin from m.durand, outside any change window.', when: '2 h ago', actions: ['Revert', 'Approve'] },
      { sev: 'danger' as const, label: 'High', title: 'Possible account takeover', body: 'c.martin (admin) signed in from Paris and Singapore within 9 minutes.', when: '34 min ago', actions: ['Revoke sessions', 'Dismiss'] },
      { sev: 'warning' as const, label: 'Medium', title: 'Critical account without second factor', body: 'ops-backup can administer the realm with a password only.', when: 'Today', actions: ['Require passkey'] },
    ],
  },
  fr: {
    title: 'Revue de gouvernance',
    scan: 'Dernière analyse il y a 4 minutes',
    stats: [
      ['Comptes critiques', '9'],
      ['Changements de droits, 24 h', '2'],
      ['Constats ouverts', '3'],
    ],
    findings: [
      { sev: 'danger' as const, label: 'Élevée', title: 'Escalade de privilèges', body: 'svc-billing a reçu realm-admin de m.durand, hors de toute fenêtre de changement.', when: 'il y a 2 h', actions: ['Annuler', 'Approuver'] },
      { sev: 'danger' as const, label: 'Élevée', title: 'Vol de compte possible', body: 'c.martin (admin) s’est connecté depuis Paris et Singapour à 9 minutes d’écart.', when: 'il y a 34 min', actions: ['Révoquer les sessions', 'Ignorer'] },
      { sev: 'warning' as const, label: 'Moyenne', title: 'Compte critique sans second facteur', body: 'ops-backup peut administrer le realm avec un mot de passe seul.', when: 'Aujourd’hui', actions: ['Exiger une passkey'] },
    ],
  },
}

export default function SecureGovernance({ locale = 'en' }: { locale?: 'en' | 'fr' }) {
  const t = copy[locale]
  return (
    <ConsoleWindow className="shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b p-4">
        <p className="text-sm font-semibold">{t.title}</p>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Icon name="radar" className="h-3.5 w-3.5" />
          {t.scan}
        </span>
      </div>
      <div className="grid grid-cols-3 divide-x border-b">
        {t.stats.map(([label, value]) => (
          <div key={label} className="p-3">
            <p className="text-[11px] leading-tight text-muted-foreground">{label}</p>
            <p className="mt-1 text-lg font-semibold">{value}</p>
          </div>
        ))}
      </div>
      <ul className="divide-y">
        {t.findings.map((f) => (
          <li key={f.title} className="space-y-2 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-sm font-semibold">
                <Icon name={f.sev === 'danger' ? 'shield-alert' : 'alert-triangle'} className={f.sev === 'danger' ? 'h-4 w-4 text-red-600' : 'h-4 w-4 text-amber-600'} />
                {f.title}
              </span>
              <span className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{f.when}</span>
                <StatusBadge tone={f.sev} dot={false}>
                  {f.label}
                </StatusBadge>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{f.body}</p>
            <div className="flex flex-wrap gap-2">
              {f.actions.map((a, i) => (
                <span key={a} className={'rounded-md border px-2.5 py-1 text-xs font-medium ' + (i === 0 ? 'bg-primary text-primary-foreground' : 'bg-background')}>
                  {a}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </ConsoleWindow>
  )
}
