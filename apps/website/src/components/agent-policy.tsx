import { useEffect, useState } from 'react'
import { logoColors, logoPaths, type LogoColors } from './logo-paths'
import type { Locale } from '../i18n'

const STEP_MS = 3400
const HOLD_MS = 4000
const W = 1000
const H = 440

type Status = 'idle' | 'ok' | 'fail' | 'cut'
type NodeId = 'agent' | 'sub' | 'identity' | 'scope' | 'network' | 'breaker' | 'and' | 'tool1' | 'tool2'
type EdgeId = 'e1' | 'e2' | 'e3' | 'e4' | 'e5' | 'e6' | 'e7' | 'e8' | 'e9' | 'e10' | 'e11'

const NODES: Record<NodeId, { x: number; y: number; w: number; h: number }> = {
  agent: { x: 20, y: 60, w: 180, h: 70 },
  sub: { x: 20, y: 300, w: 180, h: 70 },
  identity: { x: 290, y: 20, w: 200, h: 56 },
  scope: { x: 290, y: 100, w: 200, h: 56 },
  network: { x: 290, y: 180, w: 200, h: 56 },
  breaker: { x: 290, y: 300, w: 200, h: 70 },
  and: { x: 562, y: 96, w: 126, h: 64 },
  tool1: { x: 770, y: 40, w: 210, h: 60 },
  tool2: { x: 770, y: 170, w: 210, h: 60 },
}

const curve = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = (x2 - x1) / 2
  return `M${x1} ${y1} C${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`
}

const EDGES: Record<EdgeId, string> = {
  e1: curve(200, 95, 290, 48),
  e2: curve(200, 95, 290, 128),
  e3: curve(200, 95, 290, 208),
  e4: curve(490, 48, 562, 128),
  e5: curve(490, 128, 562, 128),
  e6: curve(490, 208, 562, 128),
  e7: curve(688, 128, 770, 70),
  e8: curve(688, 128, 770, 200),
  e9: 'M110 130 L110 300',
  e10: curve(200, 335, 290, 335),
  e11: 'M490 335 C560 335, 625 260, 625 160',
}

const copy = {
  en: {
    preview: 'Preview',
    visual: 'Visual',
    code: 'Code',
    cut: 'Cut the agent',
    resume: 'Resume',
    nodes: {
      agent: ['Agent', 'agent · billing', 'for lea@acme.io'],
      sub: ['Sub-agent', 'sub-agent · reminders', 'delegated by agent · billing'],
      identity: ['Identity', 'delegated by lea@acme.io'],
      scope: ['Scope', 'invoices:read'],
      network: ['Network', 'acme VPC · 10.0.0.0/8'],
      breaker: ['Circuit breaker', 'over 30 req/min → cut'],
      and: ['And', 'all must pass'],
      tool1: ['Tool', 'stripe.invoices.list'],
      tool2: ['Tool', 'stripe.transfers.create'],
    } as Record<NodeId, string[]>,
    burst: '48 req/min',
    allowed: 'Allowed',
    denied: 'Denied',
    tripped: 'Tripped',
    cutLabel: 'Cut',
    traceTitle: 'Trace 7f3a·c21, end to end',
    trace: [
      ['14:02:01', 'lea@acme.io → agent · billing', 'delegation · 15 min', 'ok'],
      ['14:02:04', 'agent · billing → stripe.invoices.list', 'allowed · billing-read', 'ok'],
      ['14:02:09', 'agent · billing → stripe.transfers.create', 'denied · missing scope', 'fail'],
      ['14:02:15', 'sub-agent · reminders → email.send ×48', 'cut · circuit breaker', 'fail'],
    ],
    captions: [
      'Connect blocks to write a rule: identity, scope, network, tool.',
      'The agent calls stripe.invoices.list: identity, scope and network check out. Allowed.',
      'It tries stripe.transfers.create: the scope is missing. Denied, and recorded.',
      'A sub-agent runs away (48 req/min): the circuit breaker cuts it on its own.',
    ],
    cutCaption: 'You cut the agent: no action goes through any more, effective immediately.',
    sameRule: 'Same rule, as blocks or as code.',
  },
  fr: {
    preview: 'Aperçu',
    visual: 'Visuel',
    code: 'Code',
    cut: 'Couper l’agent',
    resume: 'Rétablir',
    nodes: {
      agent: ['Agent', 'agent · facturation', 'pour lea@acme.fr'],
      sub: ['Sous-agent', 'sub-agent · relance', 'délégué par agent · facturation'],
      identity: ['Identité', 'délégué par lea@acme.fr'],
      scope: ['Scope', 'invoices:read'],
      network: ['Réseau', 'VPC acme · 10.0.0.0/8'],
      breaker: ['Disjoncteur', 'plus de 30 req/min → couper'],
      and: ['Et', 'tout doit passer'],
      tool1: ['Outil', 'stripe.invoices.list'],
      tool2: ['Outil', 'stripe.transfers.create'],
    } as Record<NodeId, string[]>,
    burst: '48 req/min',
    allowed: 'Autorisé',
    denied: 'Refusé',
    tripped: 'Déclenché',
    cutLabel: 'Coupé',
    traceTitle: 'Trace 7f3a·c21, de bout en bout',
    trace: [
      ['14:02:01', 'lea@acme.fr → agent · facturation', 'délégation · 15 min', 'ok'],
      ['14:02:04', 'agent · facturation → stripe.invoices.list', 'autorisé · facturation-lecture', 'ok'],
      ['14:02:09', 'agent · facturation → stripe.transfers.create', 'refusé · scope manquant', 'fail'],
      ['14:02:15', 'sub-agent · relance → email.send ×48', 'coupé · disjoncteur', 'fail'],
    ],
    captions: [
      'Reliez des blocs pour écrire une règle : identité, scope, réseau, outil.',
      'L’agent appelle stripe.invoices.list : identité, scope et réseau sont validés. Autorisé.',
      'Il tente stripe.transfers.create : le scope manque. Refusé, et tracé.',
      'Un sous-agent s’emballe (48 req/min) : le disjoncteur le coupe tout seul.',
    ],
    cutCaption: 'Vous avez coupé l’agent : plus aucune action ne passe, immédiatement.',
    sameRule: 'La même règle, en blocs ou en code.',
  },
}

const CODE: Record<Locale, string> = {
  en: `policy: billing-read
agent: agent·billing
allow:
  tool: stripe.invoices.list
  when:
    identity: delegated_by(lea@acme.io)
    scope: invoices:read
    network: vpc-acme 10.0.0.0/8
deny:
  tool: stripe.transfers.*
breaker:
  agent: sub-agent·reminders
  above: 30 req/min
  action: cut`,
  fr: `policy: facturation-lecture
agent: agent·facturation
allow:
  tool: stripe.invoices.list
  when:
    identity: delegated_by(lea@acme.fr)
    scope: invoices:read
    network: vpc-acme 10.0.0.0/8
deny:
  tool: stripe.transfers.*
breaker:
  agent: sub-agent·relance
  above: 30 req/min
  action: cut`,
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

function Mark() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" shapeRendering="crispEdges" aria-hidden="true">
      {(Object.keys(logoPaths) as (keyof LogoColors)[]).map((layer) => (
        <path key={layer} fill={logoColors[layer]} d={logoPaths[layer]} />
      ))}
    </svg>
  )
}

function statuses(step: number, cut: boolean) {
  const node: Partial<Record<NodeId, Status>> = {}
  const edge: Partial<Record<EdgeId, Status>> = {}
  if (cut) {
    node.agent = 'cut'
    node.sub = 'cut'
    for (const e of ['e1', 'e2', 'e3', 'e9'] as EdgeId[]) edge[e] = 'cut'
    return { node, edge }
  }
  if (step === 1) {
    Object.assign(node, { identity: 'ok', scope: 'ok', network: 'ok', and: 'ok', tool1: 'ok' })
    for (const e of ['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7'] as EdgeId[]) edge[e] = 'ok'
  }
  if (step === 2) {
    Object.assign(node, { identity: 'ok', scope: 'fail', network: 'ok', and: 'fail', tool2: 'fail' })
    Object.assign(edge, { e1: 'ok', e2: 'fail', e3: 'ok', e4: 'ok', e5: 'fail', e6: 'ok', e8: 'fail' })
  }
  if (step === 3) {
    Object.assign(node, { sub: 'cut', breaker: 'fail' })
    Object.assign(edge, { e9: 'ok', e10: 'fail', e11: 'cut' })
  }
  return { node, edge }
}

export function AgentPolicy({ locale = 'en' }: { locale?: Locale }) {
  const t = copy[locale]
  const last = t.captions.length - 1
  const [step, setStep] = useState(0)
  const [animated, setAnimated] = useState(false)
  const [view, setView] = useState<'visual' | 'code'>('visual')
  const [cut, setCut] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setAnimated(true)
  }, [])

  useEffect(() => {
    if (!animated || cut) return
    const id = setTimeout(() => setStep((s) => (s >= last ? 0 : s + 1)), step >= last ? HOLD_MS : STEP_MS)
    return () => clearTimeout(id)
  }, [animated, cut, step, last])

  const { node, edge } = statuses(step, cut)
  const caption = cut ? t.cutCaption : t.captions[step]
  const traced = animated ? (cut ? 1 : step + 1) : t.trace.length

  const pill = (id: NodeId, status: Status) => {
    if (status === 'idle') return null
    if (id === 'tool1' || id === 'tool2')
      return status === 'ok' ? t.allowed : t.denied
    if (id === 'breaker') return t.tripped
    if (status === 'cut') return t.cutLabel
    return status === 'ok' ? 'OK' : locale === 'fr' ? 'Non' : 'No'
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-[#f6f4ff] text-left ring-1 ring-border/70">
      <div className="flex h-11 items-center gap-3 border-b border-primary/10 bg-white/70 px-4">
        <Mark />
        <div className="flex rounded-md border bg-white p-0.5">
          {(['visual', 'code'] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={`rounded px-2.5 py-1 font-mono text-[11px] font-medium transition-colors ${
                view === v ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t[v]}
            </button>
          ))}
        </div>
        <span className="hidden font-mono text-[11px] text-muted-foreground sm:block">{t.sameRule}</span>
        <button
          type="button"
          aria-pressed={cut}
          onClick={() => {
            setCut((c) => !c)
            setStep(0)
          }}
          className={`ml-auto inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
            cut ? 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300' : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          <span className="size-2 rounded-full bg-current" aria-hidden="true" />
          {cut ? t.resume : t.cut}
        </button>
        <span className="hidden rounded-sm border border-primary/20 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary md:block">
          {t.preview}
        </span>
      </div>

      {view === 'visual' ? (
        <div className="overflow-x-auto" aria-hidden="true">
          <div
            className="relative min-w-[720px]"
            style={{
              aspectRatio: `${W} / ${H}`,
              backgroundImage: 'radial-gradient(rgb(99 78 207 / 0.18) 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }}
          >
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" fill="none">
              {(Object.keys(EDGES) as EdgeId[]).map((id) => {
                const status = edge[id] ?? 'idle'
                return (
                  <path
                    key={id}
                    d={EDGES[id]}
                    stroke={EDGE_COLOR[status]}
                    strokeWidth={status === 'idle' ? 1.5 : 2.25}
                    className={status === 'ok' || status === 'fail' ? 'edge-flow' : undefined}
                    strokeDasharray={status === 'cut' ? '4 4' : undefined}
                    style={{ transition: 'stroke 400ms' }}
                  />
                )
              })}
            </svg>

            {(Object.keys(NODES) as NodeId[]).map((id) => {
              const { x, y, w, h } = NODES[id]
              const status = node[id] ?? 'idle'
              const [tag, title, sub] = t.nodes[id]
              const label = pill(id, status)
              const agentish = id === 'agent' || id === 'sub'
              return (
                <div
                  key={id}
                  className={`absolute flex flex-col justify-center rounded-lg border bg-white px-3 shadow-sm transition-all duration-300 ${NODE_RING[status]}`}
                  style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%`, width: `${(w / W) * 100}%`, height: `${(h / H) * 100}%` }}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className={`font-mono text-[9px] font-semibold uppercase tracking-[0.18em] ${agentish ? 'text-ink' : 'text-primary'}`}>
                      {tag}
                    </span>
                    {label && (
                      <span
                        className={`rounded-sm px-1.5 font-mono text-[10px] font-semibold ${
                          status === 'ok' ? 'bg-emerald-50 text-emerald-700' : status === 'fail' ? 'bg-red-50 text-red-700' : 'bg-zinc-100 text-zinc-600'
                        }`}
                      >
                        {label}
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 truncate font-mono text-xs font-medium">{title}</span>
                  {sub && (
                    <span className={`truncate text-[10px] ${id === 'sub' && step === 3 && !cut ? 'font-semibold text-red-700' : 'text-muted-foreground'}`}>
                      {id === 'sub' && step === 3 && !cut ? t.burst : sub}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <pre className="m-4 overflow-x-auto rounded-xl bg-[#1b1730] p-5 font-mono text-[13px] leading-6 text-white/90 sm:m-6" tabIndex={0}>
          {CODE[locale]}
        </pre>
      )}

      <div className="border-t border-primary/10 bg-white/80 px-4 py-3 sm:px-6" aria-hidden="true">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{t.traceTitle}</p>
        <ol className="mt-2 space-y-1">
          {t.trace.map(([time, path, result, kind], i) => (
            <li
              key={i}
              className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-3 font-mono text-[11px] transition-opacity duration-500 sm:text-xs"
              style={{ opacity: i < traced ? 1 : 0.15, paddingLeft: `${Math.min(i, 1) * 0.75}rem` }}
            >
              <span className="text-muted-foreground">{time}</span>
              <span className="truncate">{path}</span>
              <span className={kind === 'ok' ? 'text-emerald-700' : 'text-red-700'}>{result}</span>
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
        <p className="text-sm font-medium text-ink sm:text-base">
          {caption}
        </p>
      </div>
    </div>
  )
}
