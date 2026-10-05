import { ConsoleWindow } from '../console/ui'
import { cn } from '@explainer/ui'

const copy = {
  en: {
    stats: [['Requests / s', '412'], ['p95 latency', '38 ms'], ['Active sessions', '18 204']],
    replicas: 'Instances',
    cpu: 'CPU',
    mem: 'Memory',
    byClient: 'Sign-ins by application',
    topUsers: 'Most active people, 24 h',
    signins: 'sign-ins',
  },
  fr: {
    stats: [['Requêtes / s', '412'], ['Latence p95', '38 ms'], ['Sessions actives', '18 204']],
    replicas: 'Instances',
    cpu: 'CPU',
    mem: 'Mémoire',
    byClient: 'Connexions par application',
    topUsers: 'Personnes les plus actives, 24 h',
    signins: 'connexions',
  },
}

const replicas = [
  { name: 'acme-production-0', cpu: 46, mem: 58 },
  { name: 'acme-production-1', cpu: 52, mem: 61 },
  { name: 'acme-production-2', cpu: 71, mem: 64 },
]
const clients = [
  ['web-app', 48],
  ['mobile-app', 27],
  ['admin-console', 12],
  ['partner-api', 9],
  ['legacy-sso', 4],
] as const
const users = [
  ['s.benali', 41],
  ['j.roche', 37],
  ['svc-reports', 33],
] as const

const Bar = ({ value, warn }: { value: number; warn?: boolean }) => (
  <span className="block h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
    <span className={cn('block h-full rounded-full', warn ? 'bg-amber-500' : 'bg-primary')} style={{ width: `${value}%` }} />
  </span>
)

export default function ObserveLoad({ locale = 'en' }: { locale?: 'en' | 'fr' }) {
  const t = copy[locale]
  return (
    <ConsoleWindow className="shadow-sm">
      <div className="grid grid-cols-3 divide-x border-b">
        {t.stats.map(([label, value]) => (
          <div key={label} className="p-3">
            <p className="text-[11px] leading-tight text-muted-foreground">{label}</p>
            <p className="mt-1 text-lg font-semibold">{value}</p>
          </div>
        ))}
      </div>
      <div className="space-y-2.5 border-b p-4">
        <p className="text-sm font-semibold">{t.replicas}</p>
        {replicas.map((r) => (
          <div key={r.name} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 sm:grid-cols-[7.5rem_1fr_1fr]">
            <span className="truncate font-mono text-[11px] text-muted-foreground">{r.name}</span>
            <span className="col-span-2 flex items-center gap-2 text-[11px] sm:col-span-1">
              <span className="w-14 shrink-0 text-muted-foreground">{t.cpu}</span>
              <Bar value={r.cpu} warn={r.cpu > 65} />
              <span className="w-8 text-right tabular-nums">{r.cpu}%</span>
            </span>
            <span className="col-span-2 flex items-center gap-2 text-[11px] sm:col-span-1">
              <span className="w-14 shrink-0 text-muted-foreground">{t.mem}</span>
              <Bar value={r.mem} />
              <span className="w-8 text-right tabular-nums">{r.mem}%</span>
            </span>
          </div>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 sm:divide-x">
        <div className="space-y-2 border-b p-4 sm:border-b-0">
          <p className="text-sm font-semibold">{t.byClient}</p>
          {clients.map(([name, share]) => (
            <div key={name} className="flex items-center gap-2 text-xs">
              <span className="w-24 shrink-0 truncate font-mono text-[11px]">{name}</span>
              <Bar value={share * 2} />
              <span className="w-8 text-right tabular-nums text-muted-foreground">{share}%</span>
            </div>
          ))}
        </div>
        <div className="space-y-2 p-4">
          <p className="text-sm font-semibold">{t.topUsers}</p>
          {users.map(([name, n]) => (
            <div key={name} className="flex items-center justify-between text-sm">
              <span>{name}</span>
              <span className="text-xs text-muted-foreground">
                {n} {t.signins}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ConsoleWindow>
  )
}
