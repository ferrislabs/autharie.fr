import { useEffect, useState } from 'react'
import type { Locale } from '../i18n'

const STEP_MS = 3200
const HOLD_MS = 3500

type Verdict = 'allowed' | 'blocked' | 'stopped'

interface Event {
  time: string
  who: string
  action: string
  verdict: Verdict
  label: string
  because: string
  /** Index of the rule chip that decided it. */
  chip: number
}

/** A rule as a sentence: plain strings, and chips as [text, isForbidden]. */
type Segment = string | [string, boolean]

const copy = {
  en: {
    agent: 'Accounting assistant',
    via: 'AI agent, connected through MCP',
    working: 'Working',
    stoppedBadge: 'Stopped',
    stop: 'Stop this agent',
    resume: 'Restart',
    ruleTitle: 'The rule',
    rule: [
      'Accounting assistant can ',
      ['read invoices', false],
      ' on behalf of ',
      ['Lea', false],
      ', until ',
      ['8 pm', false],
      '. It can never ',
      ['make a bank transfer', true],
      ', and it is stopped if it goes over ',
      ['30 actions a minute', false],
      '.',
    ] as Segment[],
    nowTitle: 'Right now',
    waiting: 'Waiting for the agent to do something.',
    because: 'Because:',
    events: [
      { time: '10:02', who: 'Accounting assistant', action: 'wants to read 12 invoices', verdict: 'allowed', label: 'Allowed', because: 'it can read invoices.', chip: 1 },
      { time: '10:04', who: 'Accounting assistant', action: 'wants to make a €4,800 transfer', verdict: 'blocked', label: 'Blocked', because: 'it can never make a bank transfer. Lea is notified.', chip: 7 },
      { time: '10:05', who: 'Its sub-agent', action: 'sends 48 emails in one minute', verdict: 'stopped', label: 'Stopped', because: 'it went over 30 actions a minute.', chip: 9 },
      { time: '20:01', who: 'Accounting assistant', action: 'wants to read the invoices again', verdict: 'blocked', label: 'Refused', because: 'its access ended at 8 pm.', chip: 5 },
    ] as Event[],
    stoppedTitle: 'You stopped the accounting assistant.',
    stoppedBody: 'Nothing it asks for goes through any more, starting now.',
    historyTitle: 'History',
  },
  fr: {
    agent: 'Assistant compta',
    via: 'Agent IA, connecté via MCP',
    working: 'Au travail',
    stoppedBadge: 'Arrêté',
    stop: 'Arrêter cet agent',
    resume: 'Relancer',
    ruleTitle: 'La règle',
    rule: [
      'Assistant compta peut ',
      ['lire les factures', false],
      ' pour le compte de ',
      ['Léa', false],
      ', jusqu’à ',
      ['20 h', false],
      '. Il ne peut jamais ',
      ['faire de virement', true],
      ', et il est arrêté s’il dépasse ',
      ['30 actions par minute', false],
      '.',
    ] as Segment[],
    nowTitle: 'En ce moment',
    waiting: 'En attente d’une action de l’agent.',
    because: 'Parce que :',
    events: [
      { time: '10:02', who: 'Assistant compta', action: 'veut lire 12 factures', verdict: 'allowed', label: 'Autorisé', because: 'il peut lire les factures.', chip: 1 },
      { time: '10:04', who: 'Assistant compta', action: 'veut faire un virement de 4 800 €', verdict: 'blocked', label: 'Bloqué', because: 'il ne peut jamais faire de virement. Léa est prévenue.', chip: 7 },
      { time: '10:05', who: 'Son sous-agent', action: 'envoie 48 e-mails en une minute', verdict: 'stopped', label: 'Arrêté', because: 'il a dépassé 30 actions par minute.', chip: 9 },
      { time: '20:01', who: 'Assistant compta', action: 'veut relire les factures', verdict: 'blocked', label: 'Refusé', because: 'son accès s’est terminé à 20 h.', chip: 5 },
    ] as Event[],
    stoppedTitle: 'Vous avez arrêté l’assistant compta.',
    stoppedBody: 'Plus rien de ce qu’il demande ne passe, dès maintenant.',
    historyTitle: 'Historique',
  },
}

const VERDICT: Record<Verdict, { badge: string; chip: string }> = {
  allowed: { badge: 'bg-emerald-600 text-white', chip: 'bg-emerald-100 text-emerald-900 ring-emerald-400' },
  blocked: { badge: 'bg-red-600 text-white', chip: 'bg-red-100 text-red-900 ring-red-400' },
  stopped: { badge: 'bg-amber-500 text-ink', chip: 'bg-amber-100 text-amber-900 ring-amber-400' },
}

const HISTORY_TEXT: Record<Verdict, string> = {
  allowed: 'text-emerald-700',
  blocked: 'text-red-700',
  stopped: 'text-amber-800',
}

export function AgentControl({ locale = 'en' }: { locale?: Locale }) {
  const t = copy[locale]
  const total = t.events.length
  const [step, setStep] = useState(2)
  const [animated, setAnimated] = useState(false)
  const [stopped, setStopped] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setAnimated(true)
    setStep(0)
  }, [])

  useEffect(() => {
    if (!animated || stopped) return
    const id = setTimeout(() => setStep((s) => (s >= total ? 0 : s + 1)), step >= total ? HOLD_MS : STEP_MS)
    return () => clearTimeout(id)
  }, [animated, stopped, step, total])

  const current = !stopped && step > 0 ? t.events[step - 1] : null
  const history = stopped ? [] : t.events.slice(0, Math.max(0, step - 1)).reverse()

  return (
    <div className="overflow-hidden rounded-2xl border bg-card text-left shadow-xl shadow-primary/5">
      <div className="flex flex-wrap items-center gap-3 border-b px-5 py-4">
        <span className="flex size-10 items-center justify-center rounded-xl bg-ink text-sm font-semibold text-white" aria-hidden="true">
          {t.agent
            .split(' ')
            .map((w) => w[0])
            .join('')
            .toUpperCase()}
        </span>
        <span className="min-w-0">
          <span className="flex items-center gap-2">
            <span className="font-semibold">{t.agent}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                stopped ? 'bg-zinc-100 text-zinc-700' : 'bg-emerald-50 text-emerald-700'
              }`}
            >
              {stopped ? t.stoppedBadge : t.working}
            </span>
          </span>
          <span className="block text-xs text-muted-foreground">{t.via}</span>
        </span>
        <button
          type="button"
          aria-pressed={stopped}
          onClick={() => {
            setStopped((s) => !s)
            setStep(0)
          }}
          className={`ml-auto inline-flex h-9 items-center rounded-md px-4 text-sm font-semibold transition-colors ${
            stopped ? 'border bg-card text-foreground hover:bg-accent' : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          {stopped ? t.resume : t.stop}
        </button>
      </div>

      <div className="border-b px-5 py-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.ruleTitle}</p>
        <p className="mt-3 text-base leading-9 sm:text-lg sm:leading-10">
          {t.rule.map((seg, i) =>
            typeof seg === 'string' ? (
              <span key={i}>{seg}</span>
            ) : (
              <span
                key={i}
                className={`mx-0.5 rounded-md px-2 py-1 font-medium ring-1 transition-colors duration-300 ${
                  current?.chip === i
                    ? VERDICT[current.verdict].chip
                    : seg[1]
                      ? 'bg-red-50 text-red-800 ring-red-200'
                      : 'bg-primary/10 text-primary ring-primary/20'
                }`}
              >
                {seg[0]}
              </span>
            ),
          )}
        </p>
      </div>

      <div className="bg-surface/60 px-5 py-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.nowTitle}</p>
        <div className="mt-3 min-h-[5.5rem]">
          {stopped ? (
            <div>
              <p className="text-lg font-semibold">{t.stoppedTitle}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t.stoppedBody}</p>
            </div>
          ) : current ? (
            <div key={step} className="animate-[menu-item-in_300ms_ease-out]">
              <p className="text-lg">
                <span className="font-semibold">{current.who}</span> {current.action}
              </p>
              <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span className={`rounded-md px-2.5 py-1 font-semibold ${VERDICT[current.verdict].badge}`}>{current.label}</span>
                <span>
                  <span className="font-semibold">{t.because}</span> {current.because}
                </span>
              </p>
            </div>
          ) : (
            <p className="text-lg text-muted-foreground">{t.waiting}</p>
          )}
        </div>
      </div>

      <div className="border-t px-5 py-4" aria-hidden="true">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.historyTitle}</p>
        <ul className="mt-2 min-h-[4.5rem] space-y-1 text-sm">
          {history.map((e) => (
            <li key={e.time} className="flex gap-3">
              <span className="w-11 shrink-0 tabular-nums text-muted-foreground">{e.time}</span>
              <span className="min-w-0 flex-1 truncate">
                {e.who} {e.action}
              </span>
              <span className={`shrink-0 font-medium ${HISTORY_TEXT[e.verdict]}`}>{e.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
