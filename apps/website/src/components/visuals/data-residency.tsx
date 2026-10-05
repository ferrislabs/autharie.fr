import { ConsoleWindow, Icon } from '../console/ui'

const copy = {
  en: {
    ours: 'Autharie control plane', oursNote: 'Instructions and status only',
    yours: 'Your cluster, in France', inside: ['Identity service', 'Database with accounts and sessions', 'Archives in your own bucket'],
    never: 'Never leaves', flow: ['Desired state', 'Status'], users: 'Your users', sign: 'Sign in goes straight to your cluster',
  },
  fr: {
    ours: 'Plan de contrôle Autharie', oursNote: 'Instructions et statut uniquement',
    yours: 'Votre cluster, en France', inside: ['Service d’identité', 'Base avec comptes et sessions', 'Archives dans votre propre bucket'],
    never: 'Ne sort jamais', flow: ['État souhaité', 'Statut'], users: 'Vos utilisateurs', sign: 'La connexion va directement à votre cluster',
  },
}

export default function DataResidency({ locale = 'en' }: { locale?: 'en' | 'fr' }) {
  const t = copy[locale]
  return (
    <ConsoleWindow className="shadow-sm">
      <div className="space-y-3 p-4">
        <div className="rounded-lg border bg-muted/30 p-3">
          <p className="flex items-center gap-2 text-sm font-semibold"><Icon name="radar" className="h-4 w-4 text-muted-foreground" />{t.ours}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{t.oursNote}</p>
        </div>
        <div className="flex items-center justify-center gap-6 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1"><Icon name="arrow-down" className="h-3.5 w-3.5" />{t.flow[0]}</span>
          <span className="flex items-center gap-1"><Icon name="arrow-up-circle" className="h-3.5 w-3.5" />{t.flow[1]}</span>
        </div>
        <div className="rounded-lg border-2 border-dashed border-primary/40 bg-primary/5 p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="flex items-center gap-2 text-sm font-semibold"><Icon name="server" className="h-4 w-4 text-primary" />{t.yours}</p>
            <span className="flex items-center gap-1 rounded-md border border-primary/30 bg-background px-2 py-0.5 text-[11px] font-medium text-primary"><Icon name="lock" className="h-3 w-3" />{t.never}</span>
          </div>
          <ul className="mt-3 space-y-1.5">
            {t.inside.map((x) => (
              <li key={x} className="flex items-center gap-2 rounded-md border bg-background px-2.5 py-1.5 text-sm"><Icon name="circle-check" className="h-3.5 w-3.5 text-green-600" />{x}</li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-center text-muted-foreground"><Icon name="arrow-up-circle" className="h-4 w-4" /></div>
        <div className="flex items-center gap-3 rounded-lg border p-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border"><Icon name="users" className="h-4 w-4" /></span>
          <div>
            <p className="text-sm font-semibold">{t.users}</p>
            <p className="text-xs text-muted-foreground">{t.sign}</p>
          </div>
        </div>
      </div>
    </ConsoleWindow>
  )
}
