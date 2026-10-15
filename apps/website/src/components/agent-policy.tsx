import { useEffect, useState } from 'react'
import { PixelOtarie } from './pixel-otarie'
import type { Locale } from '../i18n'

const STEP_MS = 3400
const HOLD_MS = 4000
const W = 1000
const H = 420

type Status = 'idle' | 'ok' | 'fail' | 'cut'
type NodeId = 'agent' | 'sub' | 'cond' | 'breaker' | 'tool1' | 'tool2'
type EdgeId = 'toCond' | 'toTool1' | 'toTool2' | 'toSub' | 'toBreaker'

/** The canvas reads left to right like a sentence: who, if, then. */
const NODES: Record<NodeId, { x: number; y: number; w: number; h: number }> = {
  agent: { x: 20, y: 105, w: 190, h: 72 },
  cond: { x: 290, y: 40, w: 320, h: 202 },
  tool1: { x: 700, y: 60, w: 270, h: 64 },
  tool2: { x: 700, y: 160, w: 270, h: 64 },
  sub: { x: 20, y: 310, w: 190, h: 72 },
  breaker: { x: 290, y: 310, w: 320, h: 72 },
}

const COLUMNS: { x: number; key: 'who' | 'if' | 'then' }[] = [
  { x: 20, key: 'who' },
  { x: 290, key: 'if' },
  { x: 700, key: 'then' },
]

const curve = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = (x2 - x1) / 2
  return `M${x1} ${y1} C${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`
}

const EDGES: Record<EdgeId, string> = {
  toCond: curve(210, 141, 290, 141),
  toTool1: curve(610, 141, 700, 92),
  toTool2: curve(610, 141, 700, 192),
  toSub: 'M115 177 L115 310',
  toBreaker: curve(210, 346, 290, 346),
}

type Row = 'identity' | 'network' | 'time'

const copy = {
  en: {
    preview: 'Preview',
    visual: 'Visual',
    code: 'Code',
    cut: 'Stop this agent',
    cutShort: 'Stop',
    resume: 'Restart',
    columns: { who: 'Who', if: 'If', then: 'Then' },
    agent: ['Agent', 'Support assistant', 'for the support team'],
    sub: ['Sub-agent', 'Survey assistant', 'started by the assistant'],
    condTitle: 'All of these are true',
    rows: {
      identity: ['Acts for', 'the support team'],
      network: ['From', 'the helpdesk tool'],
      time: ['During', 'opening hours'],
    } as Record<Row, string[]>,
    breaker: ['Safety', 'Stopped over 30 actions a minute'],
    tool1: 'Reply to customers',
    tool2: 'Refund an order',
    never: 'Never',
    burst: '48 actions a minute',
    allowed: 'Allowed',
    denied: 'Blocked',
    tripped: 'Triggered',
    cutLabel: 'Stopped',
    yes: 'Yes',
    no: 'No',
    traceTitle: 'What happened, end to end',
    trace: [
      ['09:14:02', 'Support team → Support assistant', 'delegation for the day', 'ok'],
      ['09:14:05', 'Support assistant → Reply to customers', 'allowed by the support rule', 'ok'],
      ['09:16:40', 'Support assistant → Refund an order', 'blocked, never allowed by the rule', 'fail'],
      ['09:17:12', 'Survey assistant → 48 emails', 'stopped by the safety', 'fail'],
    ],
    captions: [
      'Read it like a sentence: who, if these conditions are true, then what it may and may never do.',
      'The assistant replies to a customer: all three conditions are true. Allowed.',
      'It tries to refund an order: the conditions are true, but the rule never allows refunds. Blocked, and recorded.',
      'A sub-agent runs away (48 actions a minute): the safety stops it on its own.',
    ],
    cutCaption: 'You stopped the agent: no action goes through any more, effective immediately.',
    sameRule: 'Same rule, as blocks or as code.',
  },
  fr: {
    preview: 'Aperçu',
    visual: 'Visuel',
    code: 'Code',
    cut: 'Arrêter cet agent',
    cutShort: 'Arrêter',
    resume: 'Relancer',
    columns: { who: 'Qui', if: 'Si', then: 'Alors' },
    agent: ['Agent', 'Assistant support', 'pour l’équipe support'],
    sub: ['Sous-agent', 'Assistant enquêtes', 'lancé par l’assistant'],
    condTitle: 'Toutes ces conditions sont vraies',
    rows: {
      identity: ['Agit pour', 'l’équipe support'],
      network: ['Depuis', 'l’outil de support'],
      time: ['Pendant', 'les heures d’ouverture'],
    } as Record<Row, string[]>,
    breaker: ['Sécurité', 'Arrêté au-delà de 30 actions par minute'],
    tool1: 'Répondre aux clients',
    tool2: 'Rembourser',
    never: 'Jamais',
    burst: '48 actions par minute',
    allowed: 'Autorisé',
    denied: 'Bloqué',
    tripped: 'Déclenchée',
    cutLabel: 'Arrêté',
    yes: 'Oui',
    no: 'Non',
    traceTitle: 'Ce qui s’est passé, de bout en bout',
    trace: [
      ['09:14:02', 'Équipe support → Assistant support', 'délégation pour la journée', 'ok'],
      ['09:14:05', 'Assistant support → Répondre aux clients', 'autorisé par la règle support', 'ok'],
      ['09:16:40', 'Assistant support → Rembourser', 'bloqué, jamais permis par la règle', 'fail'],
      ['09:17:12', 'Assistant enquêtes → 48 e-mails', 'arrêté par la sécurité', 'fail'],
    ],
    captions: [
      'Ça se lit comme une phrase : qui, si ces conditions sont vraies, alors ce qu’il peut faire et ce qu’il ne fera jamais.',
      'L’assistant répond à un client : les trois conditions sont vraies. Autorisé.',
      'Il tente de rembourser une commande : les conditions sont vraies, mais la règle interdit les remboursements. Bloqué, et tracé.',
      'Un sous-agent s’emballe (48 actions par minute) : la sécurité l’arrête toute seule.',
    ],
    cutCaption: 'Vous avez arrêté l’agent : plus aucune action ne passe, immédiatement.',
    sameRule: 'La même règle, en blocs ou en code.',
  },
}

const CODE: Record<Locale, string> = {
  en: `policy: support-replies
agent: agent·support
allow:
  tool: helpdesk.reply
  when:
    identity: delegated_by(team:support)
    network: helpdesk.acme.io
    hours: "09:00-18:00"
deny:
  tool: payments.refund
breaker:
  agent: sub-agent·surveys
  above: 30 actions/min
  action: stop`,
  fr: `policy: support-reponses
agent: agent·support
allow:
  tool: helpdesk.reply
  when:
    identity: delegated_by(team:support)
    network: helpdesk.acme.fr
    hours: "09:00-18:00"
deny:
  tool: payments.refund
breaker:
  agent: sub-agent·enquetes
  above: 30 actions/min
  action: stop`,
}

const EDGE_COLOR: Record<Status, string> = {
  idle: '#c9c1f2',
  ok: '#059669',
  fail: '#dc2626',
  cut: '#a1a1aa',
}

const NODE_RING: Record<Status, string> = {
  idle: 'border-primary/20',
  ok: 'border-emerald-500 ring-2 ring-emerald-500/20',
  fail: 'border-red-500 ring-2 ring-red-500/20',
  cut: 'border-zinc-300 opacity-60',
}

const PILL: Record<Exclude<Status, 'idle'>, string> = {
  ok: 'bg-emerald-50 text-emerald-700',
  fail: 'bg-red-50 text-red-700',
  cut: 'bg-zinc-100 text-zinc-600',
}

interface State {
  node: Partial<Record<NodeId, Status>>
  edge: Partial<Record<EdgeId, Status>>
  rows: Partial<Record<Row, Status>>
}

function statuses(step: number, cut: boolean): State {
  if (cut) return { node: { agent: 'cut', sub: 'cut' }, edge: { toCond: 'cut', toSub: 'cut' }, rows: {} }
  if (step === 1)
    return {
      node: { cond: 'ok', tool1: 'ok' },
      edge: { toCond: 'ok', toTool1: 'ok' },
      rows: { identity: 'ok', network: 'ok', time: 'ok' },
    }
  if (step === 2)
    return {
      node: { cond: 'ok', tool2: 'fail' },
      edge: { toCond: 'ok', toTool2: 'fail' },
      rows: { identity: 'ok', network: 'ok', time: 'ok' },
    }
  if (step === 3) return { node: { sub: 'cut', breaker: 'fail' }, edge: { toSub: 'ok', toBreaker: 'fail' }, rows: {} }
  return { node: {}, edge: {}, rows: {} }
}

const box = (id: NodeId) => {
  const { x, y, w, h } = NODES[id]
  return { left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%`, width: `${(w / W) * 100}%`, height: `${(h / H) * 100}%` }
}

export function AgentPolicy({ locale = 'en' }: { locale?: Locale }) {
  const t = copy[locale]
  const last = t.captions.length - 1
  // The static state (no JavaScript, reduced motion) shows the blocked decision.
  const [step, setStep] = useState(2)
  const [animated, setAnimated] = useState(false)
  const [view, setView] = useState<'visual' | 'code'>('visual')
  const [cut, setCut] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setAnimated(true)
    setStep(0)
  }, [])

  useEffect(() => {
    if (!animated || cut) return
    const id = setTimeout(() => setStep((s) => (s >= last ? 0 : s + 1)), step >= last ? HOLD_MS : STEP_MS)
    return () => clearTimeout(id)
  }, [animated, cut, step, last])

  const { node, edge, rows } = statuses(step, cut)
  const caption = cut ? t.cutCaption : t.captions[step]
  const traced = cut ? 1 : step + 1
  const subBurst = step === 3 && !cut

  const statusPill = (status: Status | undefined, label: string) =>
    status && status !== 'idle' ? (
      <span className={`shrink-0 rounded-sm px-1.5 font-mono text-micro font-semibold ${PILL[status]}`}>{label}</span>
    ) : null

  const actor = (id: 'agent' | 'sub', [tag, title, sub]: string[]) => {
    const status = node[id] ?? 'idle'
    const burst = id === 'sub' && subBurst
    return (
      <div className={`absolute flex flex-col justify-center rounded-lg border bg-white px-3 shadow-sm transition-all duration-300 ${NODE_RING[status]}`} style={box(id)}>
        <span className="flex items-center justify-between gap-2">
          <span className="font-mono text-micro font-semibold uppercase tracking-[0.18em] text-ink">{tag}</span>
          {statusPill(status, t.cutLabel)}
        </span>
        <span className="mt-0.5 truncate text-sm font-semibold">{title}</span>
        <span className={`truncate text-micro ${burst ? 'font-semibold text-red-700' : 'text-muted-foreground'}`}>{burst ? t.burst : sub}</span>
      </div>
    )
  }

  const tool = (id: 'tool1' | 'tool2', label: string) => {
    const status = node[id] ?? 'idle'
    const forbidden = id === 'tool2'
    return (
      <div
        className={`absolute flex items-center justify-between gap-2 rounded-lg border px-4 shadow-sm transition-all duration-300 ${
          forbidden && status === 'idle' ? 'border-dashed border-red-300 bg-red-50/40' : `bg-white ${NODE_RING[status]}`
        }`}
        style={box(id)}
      >
        <span className="truncate text-sm font-medium">
          {forbidden && <span className="mr-2 rounded-sm bg-red-100 px-1.5 py-0.5 font-mono text-micro font-semibold uppercase text-red-700">{t.never}</span>}
          {label}
        </span>
        {statusPill(status, status === 'ok' ? t.allowed : t.denied)}
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-[#f6f4ff] text-left ring-1 ring-primary/15 shadow-lift">
      <div className="flex h-11 items-center gap-3 border-b border-primary/10 bg-white/70 px-4">
        <span className="hidden sm:block">
          <PixelOtarie />
        </span>
        <div className="flex rounded-md border bg-white p-0.5">
          {(['visual', 'code'] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={`rounded px-2.5 py-1 font-mono text-micro font-medium transition-colors ${
                view === v ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t[v]}
            </button>
          ))}
        </div>
        <span className="hidden font-mono text-micro text-muted-foreground sm:block">{t.sameRule}</span>
        <button
          type="button"
          aria-pressed={cut}
          onClick={() => {
            setCut((c) => !c)
            setStep(0)
          }}
          className={`ml-auto inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
            cut ? 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300' : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          <span className="size-2 rounded-full bg-current" aria-hidden="true" />
          {cut ? (
            t.resume
          ) : (
            <>
              <span className="sm:hidden">{t.cutShort}</span>
              <span className="hidden sm:inline">{t.cut}</span>
            </>
          )}
        </button>
        <span className="rounded-sm border border-primary/20 px-1.5 py-0.5 font-mono text-micro uppercase tracking-[0.2em] text-primary">
          {t.preview}
        </span>
      </div>

      {view === 'visual' ? (
        <>
        <div className="space-y-3 p-4 md:hidden" aria-hidden="true">
          <p className="font-mono text-micro font-semibold uppercase tracking-[0.2em] text-primary">{t.columns.who}</p>
          <div className={`rounded-lg border bg-white px-4 py-3 shadow-resting transition-all ${NODE_RING[node.agent ?? 'idle']}`}>
            <span className="flex items-center justify-between gap-2">
              <span className="font-mono text-micro font-semibold uppercase tracking-[0.18em] text-ink">{t.agent[0]}</span>
              {statusPill(node.agent, t.cutLabel)}
            </span>
            <span className="mt-0.5 block font-semibold">{t.agent[1]}</span>
            <span className="block text-xs text-muted-foreground">{t.agent[2]}</span>
          </div>
          <p className="pt-2 font-mono text-micro font-semibold uppercase tracking-[0.2em] text-primary">{t.columns.if}</p>
          <div className={`rounded-xl border bg-white p-3 shadow-resting transition-all ${NODE_RING[node.cond ?? 'idle']}`}>
            <span className="px-1 text-xs font-semibold text-muted-foreground">{t.condTitle}</span>
            <ul className="mt-2 space-y-1.5">
              {(Object.keys(t.rows) as Row[]).map((row) => {
                const status = rows[row] ?? 'idle'
                const [lead, value] = t.rows[row]
                return (
                  <li
                    key={row}
                    className={`flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm ${
                      status === 'ok' ? 'border-emerald-200 bg-emerald-50/60' : status === 'fail' ? 'border-red-200 bg-red-50/70' : 'border-primary/10 bg-surface/60'
                    }`}
                  >
                    <span>
                      <span className="text-muted-foreground">{lead} </span>
                      <span className="font-semibold">{value}</span>
                    </span>
                    {statusPill(status, status === 'ok' ? t.yes : t.no)}
                  </li>
                )
              })}
            </ul>
          </div>
          <p className="pt-2 font-mono text-micro font-semibold uppercase tracking-[0.2em] text-primary">{t.columns.then}</p>
          {(['tool1', 'tool2'] as const).map((id) => {
            const status = node[id] ?? 'idle'
            const forbidden = id === 'tool2'
            return (
              <div
                key={id}
                className={`flex items-center justify-between gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-all ${
                  forbidden && status === 'idle' ? 'border-dashed border-red-300 bg-red-50/40' : `bg-white shadow-resting ${NODE_RING[status]}`
                }`}
              >
                <span>
                  {forbidden && <span className="mr-2 rounded-sm bg-red-100 px-1.5 py-0.5 font-mono text-micro font-semibold uppercase text-red-700">{t.never}</span>}
                  {id === 'tool1' ? t.tool1 : t.tool2}
                </span>
                {statusPill(status, status === 'ok' ? t.allowed : t.denied)}
              </div>
            )
          })}
          <div className={`mt-4 rounded-lg border bg-white px-4 py-3 shadow-resting transition-all ${NODE_RING[node.breaker ?? 'idle']}`}>
            <span className="flex items-center justify-between gap-2">
              <span className="font-mono text-micro font-semibold uppercase tracking-[0.18em] text-primary">{t.breaker[0]}</span>
              {statusPill(node.breaker, t.tripped)}
            </span>
            <span className="mt-0.5 block text-sm">
              <span className="font-semibold">{t.sub[1]}</span> · {subBurst ? <span className="font-semibold text-red-700">{t.burst}</span> : t.breaker[1]}
            </span>
          </div>
        </div>
        <div className="hidden overflow-x-auto md:block" aria-hidden="true">
          <div
            className="relative min-w-[720px]"
            style={{
              aspectRatio: `${W} / ${H}`,
              backgroundImage: 'radial-gradient(rgb(99 78 207 / 0.18) 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }}
          >
            {COLUMNS.map((c) => (
              <span
                key={c.key}
                className="absolute font-mono text-micro font-semibold uppercase tracking-[0.2em] text-primary"
                style={{ left: `${(c.x / W) * 100}%`, top: `${(8 / H) * 100}%` }}
              >
                {t.columns[c.key]}
              </span>
            ))}

            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" fill="none">
              {(Object.keys(EDGES) as EdgeId[]).map((id) => {
                const status = edge[id] ?? 'idle'
                return (
                  <path
                    key={id}
                    d={EDGES[id]}
                    stroke={EDGE_COLOR[status]}
                    strokeWidth={status === 'idle' ? 1.5 : 2.5}
                    className={status === 'ok' || status === 'fail' ? 'edge-flow' : undefined}
                    strokeDasharray={status === 'cut' ? '4 4' : undefined}
                    style={{ transition: 'stroke 400ms' }}
                  />
                )
              })}
            </svg>

            {actor('agent', t.agent)}

            <div className={`absolute flex flex-col rounded-xl border bg-white p-3 shadow-sm transition-all duration-300 ${NODE_RING[node.cond ?? 'idle']}`} style={box('cond')}>
              <span className="px-1 text-xs font-semibold text-muted-foreground">{t.condTitle}</span>
              <ul className="mt-2 flex flex-1 flex-col justify-between gap-1.5">
                {(Object.keys(t.rows) as Row[]).map((row) => {
                  const status = rows[row] ?? 'idle'
                  const [lead, value] = t.rows[row]
                  return (
                    <li
                      key={row}
                      className={`flex flex-1 items-center justify-between gap-2 rounded-md border px-3 transition-colors duration-300 ${
                        status === 'ok' ? 'border-emerald-200 bg-emerald-50/60' : status === 'fail' ? 'border-red-200 bg-red-50/70' : 'border-primary/10 bg-surface/60'
                      }`}
                    >
                      <span className="truncate text-sm">
                        <span className="text-muted-foreground">{lead} </span>
                        <span className="font-semibold">{value}</span>
                      </span>
                      {statusPill(status, status === 'ok' ? t.yes : t.no)}
                    </li>
                  )
                })}
              </ul>
            </div>

            {tool('tool1', t.tool1)}
            {tool('tool2', t.tool2)}

            {actor('sub', t.sub)}

            <div className={`absolute flex flex-col justify-center rounded-lg border bg-white px-4 shadow-sm transition-all duration-300 ${NODE_RING[node.breaker ?? 'idle']}`} style={box('breaker')}>
              <span className="flex items-center justify-between gap-2">
                <span className="font-mono text-micro font-semibold uppercase tracking-[0.18em] text-primary">{t.breaker[0]}</span>
                {statusPill(node.breaker, t.tripped)}
              </span>
              <span className="mt-0.5 truncate text-sm font-medium">{t.breaker[1]}</span>
            </div>
          </div>
        </div>
        </>
      ) : (
        <pre className="m-4 overflow-x-auto rounded-xl bg-[#1b1730] p-5 font-mono text-sm leading-6 text-white/90 sm:m-6" tabIndex={0}>
          {CODE[locale]}
        </pre>
      )}

      <div className="border-t border-primary/10 bg-white/80 px-4 py-3 sm:px-6" aria-hidden="true">
        <p className="font-mono text-micro uppercase tracking-[0.2em] text-muted-foreground">{t.traceTitle}</p>
        <ol className="mt-2 space-y-1">
          {t.trace.map(([time, path, result, kind], i) => (
            <li
              key={i}
              className="grid grid-cols-[4.5rem_1fr] items-baseline gap-x-3 gap-y-0.5 font-mono text-micro transition-opacity duration-500 sm:grid-cols-[4.5rem_1fr_auto] sm:text-xs"
              style={{ opacity: i < traced ? 1 : 0.4 }}
            >
              <span className="text-muted-foreground">{time}</span>
              <span className="min-w-0 sm:truncate">{path}</span>
              <span className={`col-start-2 sm:col-start-auto ${kind === 'ok' ? 'text-emerald-700' : 'text-red-700'}`}>{result}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex items-center gap-4 border-t border-primary/10 bg-white/70 px-4 py-3 sm:px-6">
        <span className="flex shrink-0 gap-1.5" aria-hidden="true">
          {t.captions.map((_, s) => (
            <span key={s} className={`size-2 transition-colors ${!cut && s === step ? 'bg-primary' : 'bg-primary/20'}`} />
          ))}
        </span>
        <p className="text-sm font-medium text-ink sm:text-base">{caption}</p>
      </div>
    </div>
  )
}
