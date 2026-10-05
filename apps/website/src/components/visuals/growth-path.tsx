import { useState } from 'react'
import { cn } from '@explainer/ui'
import { ConsoleWindow, Icon, StatusBadge } from '../console/ui'

const stages = [
  { users: 500, en: { name: 'Starter instance', note: 'One small instance, daily archives, a staging next to it.', items: ['Standard sign in', 'Daily archives', 'Staging instance'] }, fr: { name: 'Instance de départ', note: 'Une petite instance, archives quotidiennes, une préproduction à côté.', items: ['Connexion standard', 'Archives quotidiennes', 'Préproduction'] } },
  { users: 5000, en: { name: 'Production sized', note: 'More capacity and a database cluster, same address and same configuration.', items: ['Database cluster', 'Alerts on sign in failures', 'Maintenance windows'] }, fr: { name: 'Taille production', note: 'Plus de capacité et une base en cluster, même adresse, même configuration.', items: ['Base de données en cluster', 'Alertes sur les échecs de connexion', 'Fenêtres de maintenance'] } },
  { users: 50000, en: { name: 'High availability', note: 'Several replicas spread across nodes, so an upgrade or a failure does not interrupt sign in.', items: ['Replicas across nodes', 'Rollouts in waves', 'Support with a response target'] }, fr: { name: 'Haute disponibilité', note: 'Plusieurs réplicas répartis sur des nœuds : une mise à jour ou une panne n’interrompt pas la connexion.', items: ['Réplicas répartis sur plusieurs nœuds', 'Déploiements par vagues', 'Support avec un objectif de réponse'] } },
  { users: 250000, en: { name: 'Your own cluster', note: 'Move to a reserved cluster, or one you own, without rebuilding anything.', items: ['Reserved or your own cluster', 'Data stays in your perimeter', 'Same console and API'] }, fr: { name: 'Votre propre cluster', note: 'Passez sur un cluster réservé, ou le vôtre, sans rien reconstruire.', items: ['Cluster réservé ou le vôtre', 'Les données restent dans votre périmètre', 'Même console, même API'] } },
]
const copy = { en: { users: 'Active users', same: 'Nothing to migrate between steps' }, fr: { users: 'Utilisateurs actifs', same: 'Rien à migrer entre les paliers' } }

export default function GrowthPath({ locale = 'en' }: { locale?: 'en' | 'fr' }) {
  const t = copy[locale]
  const [i, setI] = useState(0)
  const s = stages[i]
  const nf = new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US')
  return (
    <ConsoleWindow className="shadow-sm">
      <div className="space-y-4 border-b p-4">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-muted-foreground">{t.users}</span>
          <span className="text-2xl font-semibold tabular-nums">{nf.format(s.users)}</span>
        </div>
        <input type="range" min={0} max={stages.length - 1} step={1} value={i} onChange={(e) => setI(Number(e.target.value))} aria-label={t.users} className="slider w-full" />
        <div className="flex justify-between text-[11px] text-muted-foreground">
          {stages.map((x) => <span key={x.users}>{nf.format(x.users)}</span>)}
        </div>
      </div>
      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="flex items-center gap-2 text-base font-semibold">
              <Icon name="server" className="h-4 w-4 text-muted-foreground" />
              {s[locale].name}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{s[locale].note}</p>
          </div>
          <StatusBadge tone="accent" dot={false}>{i + 1}/{stages.length}</StatusBadge>
        </div>
        <ul className="space-y-1.5">
          {s[locale].items.map((it) => (
            <li key={it} className="flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-sm">
              <Icon name="circle-check" className="h-3.5 w-3.5 text-green-600" />
              {it}
            </li>
          ))}
        </ul>
      </div>
      <p className={cn('flex items-center gap-2 border-t bg-muted/30 px-4 py-2.5 text-xs text-muted-foreground')}>
        <Icon name="info" className="h-3.5 w-3.5" />
        {t.same}
      </p>
    </ConsoleWindow>
  )
}
