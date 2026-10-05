import { ConsoleWindow } from '../console/ui'

const copy = {
  en: { title: 'Users', total: 'Total accounts', active: 'Active in 30 days', joined: 'Joined this month', months: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'], legend: ['Total', 'New per month'] },
  fr: { title: 'Utilisateurs', total: 'Comptes au total', active: 'Actifs sur 30 jours', joined: 'Arrivés ce mois-ci', months: ['nov.', 'déc.', 'janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.'], legend: ['Total', 'Nouveaux par mois'] },
}

const total = [2140, 2310, 2480, 2790, 3010, 3240, 3520, 3790, 4020, 4260, 4520, 4812]
const news = total.map((v, i) => (i === 0 ? 170 : v - total[i - 1]))

export default function IdentityGrowth({ locale = 'en' }: { locale?: 'en' | 'fr' }) {
  const t = copy[locale]
  const W = 480
  const H = 170
  const min = 1800
  const max = 5000
  const x = (i: number) => 14 + (i * (W - 28)) / (total.length - 1)
  const y = (v: number) => H - 14 - ((v - min) / (max - min)) * (H - 34)
  const line = total.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')
  const nf = new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US')
  return (
    <ConsoleWindow className="shadow-sm">
      <div className="grid grid-cols-3 divide-x border-b">
        {[
          [t.total, nf.format(4812)],
          [t.active, nf.format(3204)],
          [t.joined, `+${news[news.length - 1]}`],
        ].map(([label, value]) => (
          <div key={label} className="p-3">
            <p className="text-[11px] leading-tight text-muted-foreground">{label}</p>
            <p className="mt-1 text-lg font-semibold">{value}</p>
          </div>
        ))}
      </div>
      <div className="p-4">
        <p className="mb-2 text-sm font-semibold">{t.title}</p>
        <svg viewBox={`0 0 ${W} ${H + 18}`} className="w-full" role="img" aria-label={t.title}>
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} x1={14} x2={W - 14} y1={H * f} y2={H * f} className="stroke-border" strokeDasharray="3 4" />
          ))}
          {news.map((v, i) => (
            <rect key={i} x={x(i) - 8} y={H - 14 - (v / 400) * 60} width={16} height={(v / 400) * 60} rx={2} className="fill-primary/20" />
          ))}
          <path d={`${line} L${x(11)} ${H - 14} L${x(0)} ${H - 14} Z`} className="fill-primary/10" />
          <path d={line} fill="none" className="stroke-primary" strokeWidth={2.2} strokeLinejoin="round" strokeLinecap="round" />
          <circle cx={x(11)} cy={y(total[11])} r={4} className="fill-primary" />
          {t.months.map((m, i) => (
            <text key={i} x={x(i)} y={H + 12} textAnchor="middle" className="fill-muted-foreground" fontSize={9}>
              {i % 2 === 0 || i === 11 ? m : ''}
            </text>
          ))}
        </svg>
        <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 rounded bg-primary" />
            {t.legend[0]}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-primary/20" />
            {t.legend[1]}
          </span>
        </p>
      </div>
    </ConsoleWindow>
  )
}
