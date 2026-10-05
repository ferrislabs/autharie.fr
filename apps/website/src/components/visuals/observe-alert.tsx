import { Icon } from '../console/ui'

const copy = {
  en: {
    bot: 'Bot',
    now: 'Just now',
    title: 'acme-production · 1 alert firing',
    name: 'Failed sign-ins high',
    rule: 'More than 5% of attempts over the last 5 minutes',
    severity: 'Medium severity',
    hint: 'Open the instance in the Autharie console',
    actions: ['All issues', 'Metrics', 'Logs'],
  },
  fr: {
    bot: 'Bot',
    now: 'À l’instant',
    title: 'acme-production · 1 alerte en cours',
    name: 'Échecs de connexion élevés',
    rule: 'Plus de 5 % des tentatives sur les 5 dernières minutes',
    severity: 'Gravité moyenne',
    hint: 'Ouvrir l’instance dans la console Autharie',
    actions: ['Toutes les alertes', 'Métriques', 'Journaux'],
  },
}

const ghost = 'mx-3 h-16 rounded-xl border bg-white/50 sm:mx-6'

/** A chat notification, the way an alert reaches the team. Ghost cards above and below frame it. */
export default function ObserveAlert({ locale = 'en' }: { locale?: 'en' | 'fr' }) {
  const t = copy[locale]
  return (
    <div className="space-y-3">
      <div className={ghost} />
      <div className="rounded-xl border bg-white p-4 shadow-sm sm:p-5">
        <div className="flex gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-base font-semibold text-primary-foreground">A</span>
          <div className="min-w-0 flex-1">
            <p className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-semibold">Autharie</span>
              <span className="rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">{t.bot}</span>
              <span className="text-xs text-muted-foreground">{t.now}</span>
            </p>
            <div className="mt-2 flex gap-3">
              <span className="w-1 shrink-0 rounded-full bg-orange-500" />
              <div className="min-w-0 space-y-1 text-sm">
                <p className="font-medium text-blue-700">{t.title}</p>
                <p className="font-semibold">{t.name}</p>
                <p>{t.rule}</p>
                <p className="text-muted-foreground">{t.severity}</p>
                <p className="pt-1 text-xs text-muted-foreground">{t.hint}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {t.actions.map((a) => (
                    <span key={a} className="rounded-md border bg-white px-2.5 py-1 text-xs font-medium">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={ghost} />
    </div>
  )
}

export { Icon }
