import { ConsoleWindow, Icon } from '../console/ui'

const copy = {
  en: { search: 'Search logs', level: 'Level', all: 'All', signins: 'Sign-ins per minute', failed: 'Failed', rate: '6.4 %', live: 'Live' },
  fr: { search: 'Rechercher dans les journaux', level: 'Niveau', all: 'Tous', signins: 'Connexions par minute', failed: 'Échecs', rate: '6,4 %', live: 'En direct' },
}

const bars = [22, 24, 21, 26, 25, 30, 28, 33, 31, 38, 42, 40, 36, 44, 47, 43, 39, 41, 45, 52, 48, 44, 40, 38]
const failedFrom = 19

const logs = [
  { t: '14:23:47', lvl: 'info', msg: 'LOGIN client=web-app user=s.benali ip=91.157.64.115' },
  { t: '14:23:52', lvl: 'info', msg: 'TOKEN_REFRESH client=mobile-app user=j.roche' },
  { t: '14:23:52', lvl: 'error', msg: 'LOGIN_ERROR client=web-app error=invalid_user_credentials ip=23.21.71.168' },
  { t: '14:23:53', lvl: 'warn', msg: 'LOGIN_ERROR client=web-app error=too_many_attempts ip=23.21.71.168' },
  { t: '14:23:54', lvl: 'info', msg: 'LOGOUT client=admin-console user=c.martin' },
] as const

const bar = { info: 'bg-blue-500', warn: 'bg-amber-400', error: 'bg-red-500' }
const row = { info: '', warn: 'bg-amber-50', error: 'bg-red-50' }

export default function ObserveLogs({ locale = 'en' }: { locale?: 'en' | 'fr' }) {
  const t = copy[locale]
  return (
    <ConsoleWindow className="shadow-sm">
      <div className="border-b p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold">{t.signins}</p>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
            {t.live}
          </span>
        </div>
        <div className="flex h-20 items-end gap-[3px]" aria-hidden="true">
          {bars.map((h, i) => (
            <span key={i} className={'flex-1 rounded-sm ' + (i >= failedFrom ? 'bg-primary/80' : 'bg-primary/30')} style={{ height: `${h * 1.7}%` }} />
          ))}
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-sm bg-primary/80" />
          {t.failed} {t.rate}
        </p>
      </div>
      <div className="flex gap-2 border-b p-3">
        <div className="flex h-9 flex-1 items-center gap-2 rounded-md border px-3 text-sm text-muted-foreground">
          <Icon name="search" className="h-4 w-4" />
          {t.search}
        </div>
        <div className="hidden h-9 items-center gap-2 rounded-md border px-3 text-sm sm:flex">
          {t.level}: {t.all}
          <Icon name="chevron-down" className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
      </div>
      <div className="divide-y font-mono text-[11px] leading-relaxed">
        {logs.map((l, i) => (
          <div key={i} className={'flex items-start gap-3 py-2 pr-3 ' + row[l.lvl]}>
            <span className={'w-1 self-stretch ' + bar[l.lvl]} />
            <span className="shrink-0 text-muted-foreground">{l.t}</span>
            <span className="min-w-0 break-words">{l.msg}</span>
          </div>
        ))}
      </div>
    </ConsoleWindow>
  )
}
