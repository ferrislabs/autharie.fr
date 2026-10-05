import { ConsoleWindow, Icon, StatusBadge } from '../console/ui'

const copy = {
  en: {
    title: 'Restore test',
    source: 'Archive',
    sourceMeta: 'acme-production · today 02:14 · 1.8 GB',
    env: 'Temporary instance',
    envName: 'restore-test-0412',
    envMeta: 'Built from the archive. Production keeps serving.',
    running: 'Running',
    checks: 'Checks',
    list: [
      ['Archive restored', '3 min 12 s'],
      ['4 812 users found', 'expected 4 812'],
      ['Sign-in flow works', 'synthetic check'],
      ['Realm settings match', 'no difference'],
    ],
    ends: 'Deleted automatically in 1 h 42 min',
    action: 'Start a restore test',
  },
  fr: {
    title: 'Test de restauration',
    source: 'Archive',
    sourceMeta: 'acme-production · aujourd’hui 02:14 · 1,8 Go',
    env: 'Instance temporaire',
    envName: 'restore-test-0412',
    envMeta: 'Construite depuis l’archive. La production continue de servir.',
    running: 'En fonctionnement',
    checks: 'Vérifications',
    list: [
      ['Archive restaurée', '3 min 12 s'],
      ['4 812 utilisateurs retrouvés', '4 812 attendus'],
      ['Connexion fonctionnelle', 'test synthétique'],
      ['Réglages du realm identiques', 'aucune différence'],
    ],
    ends: 'Supprimée automatiquement dans 1 h 42 min',
    action: 'Lancer un test de restauration',
  },
}

export default function OperateEphemeral({ locale = 'en' }: { locale?: 'en' | 'fr' }) {
  const t = copy[locale]
  return (
    <ConsoleWindow className="shadow-sm">
      <div className="flex items-center justify-between border-b p-4">
        <p className="text-sm font-semibold">{t.title}</p>
        <span className="inline-flex h-8 items-center gap-2 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground">
          <Icon name="play" className="h-3.5 w-3.5" />
          {t.action}
        </span>
      </div>

      <div className="space-y-0 p-4">
        <div className="flex items-start gap-3 rounded-lg border p-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-muted/40">
            <Icon name="database-backup" className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">{t.source}</p>
            <p className="truncate text-sm font-medium">{t.sourceMeta}</p>
          </div>
        </div>

        <div className="ml-[22px] flex h-6 items-center text-muted-foreground/60">
          <Icon name="arrow-down" className="h-4 w-4" />
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50/40 p-3">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-background">
              <Icon name="server" className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold">{t.envName}</p>
                <StatusBadge tone="success">{t.running}</StatusBadge>
              </div>
              <p className="text-xs text-muted-foreground">{t.envMeta}</p>
            </div>
          </div>

          <p className="mb-1.5 mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">{t.checks}</p>
          <ul className="space-y-1.5">
            {t.list.map(([label, detail]) => (
              <li key={label} className="flex items-center justify-between gap-3 rounded-md border bg-background px-2.5 py-1.5 text-sm">
                <span className="flex items-center gap-2">
                  <Icon name="circle-check" className="h-3.5 w-3.5 text-green-600" />
                  {label}
                </span>
                <span className="text-xs text-muted-foreground">{detail}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Icon name="clock" className="h-3.5 w-3.5" />
            {t.ends}
          </p>
        </div>
      </div>
    </ConsoleWindow>
  )
}
