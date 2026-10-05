import { ConsoleWindow, Icon, StatusBadge } from '../console/ui'

const copy = {
  en: {
    policies: 'Policies',
    attempt: 'Sign-in attempt',
    who: 'm.durand@acme.com',
    meta: 'Admin console · new device · Singapore',
    rules: [
      { name: 'Account is active', rule: 'user.enabled', result: 'pass' as const },
      { name: 'Password is valid', rule: 'credential.password', result: 'pass' as const },
      { name: 'Unusual country for admins', rule: 'admin AND country ∉ {FR, DE}', result: 'match' as const },
      { name: 'Service accounts', rule: 'token.ttl ≤ 15 min', result: 'skip' as const },
    ],
    pass: 'Passed',
    match: 'Matched',
    skip: 'Not applicable',
    decision: 'Decision',
    decisionValue: 'Ask for a passkey',
    because: 'Rule “Unusual country for admins”. Recorded in the audit log.',
  },
  fr: {
    policies: 'Politiques',
    attempt: 'Tentative de connexion',
    who: 'm.durand@acme.com',
    meta: 'Console admin · nouvel appareil · Singapour',
    rules: [
      { name: 'Le compte est actif', rule: 'user.enabled', result: 'pass' as const },
      { name: 'Le mot de passe est valide', rule: 'credential.password', result: 'pass' as const },
      { name: 'Pays inhabituel pour un admin', rule: 'admin AND pays ∉ {FR, DE}', result: 'match' as const },
      { name: 'Comptes de service', rule: 'token.ttl ≤ 15 min', result: 'skip' as const },
    ],
    pass: 'Validée',
    match: 'Déclenchée',
    skip: 'Sans objet',
    decision: 'Décision',
    decisionValue: 'Demander une passkey',
    because: 'Règle « Pays inhabituel pour un admin ». Consignée dans le journal d’audit.',
  },
}

export default function SecurePolicy({ locale = 'en' }: { locale?: 'en' | 'fr' }) {
  const t = copy[locale]
  const tone = { pass: 'success', match: 'warning', skip: 'neutral' } as const
  return (
    <ConsoleWindow className="shadow-sm">
      <div className="flex items-center gap-3 border-b p-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-muted/40">
          <Icon name="user-cog" className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{t.attempt}</p>
          <p className="truncate text-sm font-semibold">{t.who}</p>
          <p className="truncate text-xs text-muted-foreground">{t.meta}</p>
        </div>
      </div>

      <div className="px-4 pb-1 pt-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">{t.policies}</div>
      <ol className="px-4 pb-4">
        {t.rules.map((r, i) => (
          <li key={r.name} className="relative flex gap-3 pb-3 last:pb-0">
            {i < t.rules.length - 1 && <span className="absolute left-[11px] top-6 h-[calc(100%-12px)] w-px bg-border" aria-hidden="true" />}
            <span
              className={
                'z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-background ' +
                (r.result === 'match' ? 'border-amber-300 text-amber-600' : r.result === 'pass' ? 'border-green-300 text-green-600' : 'text-muted-foreground/60')
              }
            >
              <Icon name={r.result === 'match' ? 'shield-alert' : r.result === 'pass' ? 'check' : 'pause'} className="h-3 w-3" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-medium">{r.name}</span>
                <StatusBadge tone={tone[r.result]} dot={false}>
                  {t[r.result]}
                </StatusBadge>
              </div>
              <code className="mt-1 inline-block rounded border bg-muted/40 px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">{r.rule}</code>
            </div>
          </li>
        ))}
      </ol>

      <div className="flex items-start gap-3 border-t bg-primary/5 p-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Icon name="shield-check" className="h-4 w-4" />
        </span>
        <div>
          <p className="text-xs text-muted-foreground">{t.decision}</p>
          <p className="text-sm font-semibold">{t.decisionValue}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{t.because}</p>
        </div>
      </div>
    </ConsoleWindow>
  )
}
