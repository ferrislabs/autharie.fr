import { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@explainer/ui'
import { ConsoleWindow, Icon, StatusBadge } from '../console/ui'

/**
 * A sign-in flow as a graph, editable the way the console editor is: drag steps from the
 * palette, move them, draw links from an output port, select a step to see its settings,
 * and run a scenario through the flow. Everything here is local state.
 */

type L = 'en' | 'fr'
type T = { en: string; fr: string }
type Category = 'start' | 'verify' | 'decide' | 'act' | 'end'

interface Out {
  id: string
  label: T
}
interface NodeType {
  id: string
  category: Category
  icon: string
  label: T
  hint: T
  outs: Out[]
  settings: { k: T; v: T }[]
  terminal?: 'allow' | 'deny'
}

const one: Out[] = [{ id: 'next', label: { en: '', fr: '' } }]

const types: Record<string, NodeType> = {
  start: { id: 'start', category: 'start', icon: 'play', label: { en: 'Sign in', fr: 'Connexion' }, hint: { en: 'Where every sign-in attempt begins.', fr: 'Là où chaque tentative de connexion commence.' }, outs: one, settings: [{ k: { en: 'Applies to', fr: 'S’applique à' }, v: { en: 'All applications', fr: 'Toutes les applications' } }] },
  password: { id: 'password', category: 'verify', icon: 'lock', label: { en: 'Password', fr: 'Mot de passe' }, hint: { en: 'Checks the password against the user’s credential.', fr: 'Vérifie le mot de passe de la personne.' }, outs: one, settings: [{ k: { en: 'Lock after', fr: 'Verrouiller après' }, v: { en: '5 failures', fr: '5 échecs' } }, { k: { en: 'Breached passwords', fr: 'Mots de passe compromis' }, v: { en: 'Rejected', fr: 'Refusés' } }] },
  passkey: { id: 'passkey', category: 'verify', icon: 'key-round', label: { en: 'Passkey', fr: 'Passkey' }, hint: { en: 'Asks for a passkey on a device the person owns.', fr: 'Demande une passkey sur un appareil de la personne.' }, outs: one, settings: [{ k: { en: 'Authenticators', fr: 'Authentificateurs' }, v: { en: 'Platform and security keys', fr: 'Appareil et clés de sécurité' } }, { k: { en: 'User verification', fr: 'Vérification' }, v: { en: 'Required', fr: 'Obligatoire' } }] },
  otp: { id: 'otp', category: 'verify', icon: 'radio', label: { en: 'One-time code', fr: 'Code à usage unique' }, hint: { en: 'A code from an authenticator app.', fr: 'Un code issu d’une application d’authentification.' }, outs: one, settings: [{ k: { en: 'Digits', fr: 'Chiffres' }, v: { en: '6', fr: '6' } }, { k: { en: 'Window', fr: 'Validité' }, v: { en: '30 seconds', fr: '30 secondes' } }] },
  email: { id: 'email', category: 'verify', icon: 'mail-plus', label: { en: 'Email link', fr: 'Lien par e-mail' }, hint: { en: 'Sends a single-use link to the person’s address.', fr: 'Envoie un lien à usage unique à l’adresse de la personne.' }, outs: one, settings: [{ k: { en: 'Link valid for', fr: 'Lien valable' }, v: { en: '10 minutes', fr: '10 minutes' } }] },
  idp: { id: 'idp', category: 'verify', icon: 'building-2', label: { en: 'Company directory', fr: 'Annuaire d’entreprise' }, hint: { en: 'Signs the person in through their own identity provider.', fr: 'Connecte la personne via son propre fournisseur d’identité.' }, outs: one, settings: [{ k: { en: 'Protocol', fr: 'Protocole' }, v: { en: 'OpenID Connect', fr: 'OpenID Connect' } }, { k: { en: 'Match by', fr: 'Rapprochement' }, v: { en: 'Verified email', fr: 'E-mail vérifié' } }] },
  risk: { id: 'risk', category: 'decide', icon: 'radar', label: { en: 'Risk check', fr: 'Analyse du risque' }, hint: { en: 'Scores the attempt and routes it by level.', fr: 'Note la tentative et l’oriente selon le niveau.' }, outs: [{ id: 'low', label: { en: 'low', fr: 'faible' } }, { id: 'medium', label: { en: 'medium', fr: 'moyen' } }, { id: 'high', label: { en: 'high', fr: 'élevé' } }], settings: [{ k: { en: 'Signals', fr: 'Signaux' }, v: { en: 'Country, device, velocity', fr: 'Pays, appareil, rythme' } }, { k: { en: 'High from', fr: 'Élevé à partir de' }, v: { en: 'score 70', fr: 'note 70' } }] },
  device: { id: 'device', category: 'decide', icon: 'cpu', label: { en: 'Known device?', fr: 'Appareil connu ?' }, hint: { en: 'Has this person signed in from this device before?', fr: 'La personne s’est-elle déjà connectée depuis cet appareil ?' }, outs: [{ id: 'known', label: { en: 'known', fr: 'connu' } }, { id: 'new', label: { en: 'new', fr: 'nouveau' } }], settings: [{ k: { en: 'Remember for', fr: 'Mémoriser' }, v: { en: '30 days', fr: '30 jours' } }] },
  country: { id: 'country', category: 'decide', icon: 'globe', label: { en: 'Country', fr: 'Pays' }, hint: { en: 'Compares the country with the allowed list.', fr: 'Compare le pays à la liste autorisée.' }, outs: [{ id: 'usual', label: { en: 'allowed', fr: 'autorisé' } }, { id: 'unusual', label: { en: 'other', fr: 'autre' } }], settings: [{ k: { en: 'Allowed', fr: 'Autorisés' }, v: { en: 'FR, DE, BE', fr: 'FR, DE, BE' } }] },
  notify: { id: 'notify', category: 'act', icon: 'alert-triangle', label: { en: 'Notify admin', fr: 'Prévenir un admin' }, hint: { en: 'Sends an alert, then carries on.', fr: 'Envoie une alerte, puis continue.' }, outs: one, settings: [{ k: { en: 'Channel', fr: 'Canal' }, v: { en: 'Chat and email', fr: 'Messagerie et e-mail' } }] },
  session: { id: 'session', category: 'act', icon: 'calendar-clock', label: { en: 'Limit session', fr: 'Limiter la session' }, hint: { en: 'Shortens how long the session lasts.', fr: 'Raccourcit la durée de la session.' }, outs: one, settings: [{ k: { en: 'Lasts', fr: 'Durée' }, v: { en: '1 hour', fr: '1 heure' } }] },
  allow: { id: 'allow', category: 'end', icon: 'circle-check', label: { en: 'Allow', fr: 'Autoriser' }, hint: { en: 'Ends the flow and issues the session.', fr: 'Termine le flux et ouvre la session.' }, outs: [], terminal: 'allow', settings: [{ k: { en: 'Issues', fr: 'Délivre' }, v: { en: 'Access and refresh tokens', fr: 'Jetons d’accès et de rafraîchissement' } }] },
  deny: { id: 'deny', category: 'end', icon: 'shield-alert', label: { en: 'Block', fr: 'Bloquer' }, hint: { en: 'Ends the flow without a session.', fr: 'Termine le flux sans ouvrir de session.' }, outs: [], terminal: 'deny', settings: [{ k: { en: 'Message', fr: 'Message' }, v: { en: 'Generic, no detail', fr: 'Générique, sans détail' } }] },
}

const palette: { title: T; ids: string[] }[] = [
  { title: { en: 'Verify', fr: 'Vérifier' }, ids: ['password', 'passkey', 'otp', 'email', 'idp'] },
  { title: { en: 'Decide', fr: 'Décider' }, ids: ['risk', 'device', 'country'] },
  { title: { en: 'Act', fr: 'Agir' }, ids: ['notify', 'session', 'allow', 'deny'] },
]

interface Node {
  id: string
  type: string
  x: number
  y: number
}
interface Edge {
  id: string
  from: string
  port: string
  to: string
}

const W = 800
const H = 400
const NW = 132
const base = 44
const heightOf = (n: Node) => (types[n.type].outs.length > 1 ? 30 + types[n.type].outs.length * 20 : base)
const portY = (n: Node, i: number) => n.y + (heightOf(n) * (i + 1)) / (types[n.type].outs.length + 1)

const initialNodes: Node[] = [
  { id: 'start', type: 'start', x: 8, y: 178 },
  { id: 'password', type: 'password', x: 160, y: 178 },
  { id: 'risk', type: 'risk', x: 312, y: 154 },
  { id: 'otp', type: 'otp', x: 500, y: 62 },
  { id: 'passkey', type: 'passkey', x: 500, y: 294 },
  { id: 'allow', type: 'allow', x: 664, y: 178 },
]
const initialEdges: Edge[] = [
  { id: 'e1', from: 'start', port: 'next', to: 'password' },
  { id: 'e2', from: 'password', port: 'next', to: 'risk' },
  { id: 'e3', from: 'risk', port: 'low', to: 'allow' },
  { id: 'e4', from: 'risk', port: 'medium', to: 'otp' },
  { id: 'e5', from: 'risk', port: 'high', to: 'passkey' },
  { id: 'e6', from: 'otp', port: 'next', to: 'allow' },
  { id: 'e7', from: 'passkey', port: 'next', to: 'allow' },
]

const scenarios: { id: string; label: T; level: 'low' | 'medium' | 'high'; who: T }[] = [
  { id: 'known', label: { en: 'Usual device and country', fr: 'Appareil et pays habituels' }, level: 'low', who: { en: 'Sofia, from Marseille', fr: 'Sofia, depuis Marseille' } },
  { id: 'new', label: { en: 'New device', fr: 'Nouvel appareil' }, level: 'medium', who: { en: 'Julien, new laptop', fr: 'Julien, nouvel ordinateur' } },
  { id: 'abroad', label: { en: 'Admin from another country', fr: 'Admin depuis un autre pays' }, level: 'high', who: { en: 'Claire, from Singapore', fr: 'Claire, depuis Singapour' } },
]

const chosenPort = (type: string, level: string) => {
  if (type === 'risk') return level
  if (type === 'device') return level === 'low' ? 'known' : 'new'
  if (type === 'country') return level === 'high' ? 'unusual' : 'usual'
  return 'next'
}

const copy = {
  en: {
    title: 'Sign-in flow', draft: 'Draft', publish: 'Publish', reset: 'Reset', run: 'Run test', test: 'Test with',
    palette: 'Drag onto the canvas', hint: 'Drag from a round port to a step to link them.',
    inspector: 'Step', link: 'Link', remove: 'Remove step', removeLink: 'Remove link', checks: 'Checks', none: 'Select a step or a link to see its settings.',
    okEnds: 'Every path ends in Allow or Block', badEnds: (n: number) => `${n} path${n > 1 ? 's' : ''} end${n > 1 ? '' : 's'} without a decision`,
    okReach: 'Every step is connected', badReach: (n: number) => `${n} step${n > 1 ? 's are' : ' is'} not connected`,
    path: 'Path', allowed: 'Allowed', blocked: 'Blocked', incomplete: 'Incomplete flow', result: 'Result', steps: (n: number) => `${n} step${n > 1 ? 's' : ''}`,
  },
  fr: {
    title: 'Parcours de connexion', draft: 'Brouillon', publish: 'Publier', reset: 'Réinitialiser', run: 'Lancer le test', test: 'Tester avec',
    palette: 'Glissez sur le canevas', hint: 'Glissez d’un port rond vers une étape pour les relier.',
    inspector: 'Étape', link: 'Lien', remove: 'Supprimer l’étape', removeLink: 'Supprimer le lien', checks: 'Vérifications', none: 'Sélectionnez une étape ou un lien pour voir ses réglages.',
    okEnds: 'Chaque chemin se termine par Autoriser ou Bloquer', badEnds: (n: number) => `${n} chemin${n > 1 ? 's' : ''} sans décision finale`,
    okReach: 'Toutes les étapes sont reliées', badReach: (n: number) => `${n} étape${n > 1 ? 's' : ''} non reliée${n > 1 ? 's' : ''}`,
    path: 'Chemin', allowed: 'Autorisé', blocked: 'Bloqué', incomplete: 'Flux incomplet', result: 'Résultat', steps: (n: number) => `${n} étape${n > 1 ? 's' : ''}`,
  },
}

const tone: Record<Category, string> = {
  start: 'border-primary/40 bg-primary/10 text-primary',
  verify: 'bg-background',
  decide: 'border-amber-300 bg-amber-50 text-amber-900',
  act: 'border-sky-200 bg-sky-50 text-sky-900',
  end: 'bg-background',
}
const endTone = { allow: 'border-green-300 bg-green-50 text-green-800', deny: 'border-red-300 bg-red-50 text-red-800' }

function curve(x1: number, y1: number, x2: number, y2: number) {
  const dx = Math.max(40, Math.abs(x2 - x1) / 2)
  return `M${x1} ${y1} C${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}`
}

export default function AuthFlow({ locale = 'en' }: { locale?: L }) {
  const t = copy[locale]
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)
  const [sel, setSel] = useState<{ kind: 'node' | 'edge'; id: string } | null>(null)
  const [scenario, setScenario] = useState(scenarios[2].id)
  const [run, setRun] = useState<{ nodes: string[]; edges: string[]; outcome: 'allow' | 'deny' | 'incomplete'; done: boolean } | null>(null)
  const [link, setLink] = useState<{ from: string; port: string; x: number; y: number } | null>(null)

  const box = useRef<HTMLDivElement>(null)
  const wrap = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const drag = useRef<{ id: string; dx: number; dy: number } | null>(null)
  const counter = useRef(0)
  const timers = useRef<number[]>([])

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const update = () => setScale(Math.min(1.15, Math.max(0.8, el.clientWidth / W)))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const byId = useMemo(() => Object.fromEntries(nodes.map((n) => [n.id, n])), [nodes])
  const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n))
  const toLogical = (cx: number, cy: number) => {
    const r = box.current!.getBoundingClientRect()
    return { x: (cx - r.left) / scale, y: (cy - r.top) / scale }
  }
  const clearRun = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setRun(null)
  }

  const add = (type: string, at?: { x: number; y: number }) => {
    counter.current += 1
    const n = counter.current
    const pos = at ?? { x: 130 + ((n - 1) % 5) * 140, y: 372 }
    const id = `n${n}`
    setNodes((ns) => [...ns, { id, type, x: clamp(pos.x - NW / 2, 0, W - NW), y: clamp(pos.y - base / 2, 0, H - 60) }])
    setSel({ kind: 'node', id })
    clearRun()
  }
  const removeNode = (id: string) => {
    if (id === 'start') return
    setNodes((ns) => ns.filter((n) => n.id !== id))
    setEdges((es) => es.filter((e) => e.from !== id && e.to !== id))
    setSel(null)
    clearRun()
  }
  const reset = () => {
    setNodes(initialNodes)
    setEdges(initialEdges)
    setSel(null)
    clearRun()
  }

  const onNodeDown = (e: React.PointerEvent, n: Node) => {
    const p = toLogical(e.clientX, e.clientY)
    drag.current = { id: n.id, dx: p.x - n.x, dy: p.y - n.y }
    setSel({ kind: 'node', id: n.id })
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onMove = (e: React.PointerEvent) => {
    const p = toLogical(e.clientX, e.clientY)
    if (link) setLink({ ...link, x: p.x, y: p.y })
    const d = drag.current
    if (!d) return
    setNodes((ns) => ns.map((n) => (n.id === d.id ? { ...n, x: clamp(p.x - d.dx, 0, W - NW), y: clamp(p.y - d.dy, 0, H - heightOf(n)) } : n)))
  }
  const onUp = (e: React.PointerEvent) => {
    drag.current = null
    if (!link) return
    const p = toLogical(e.clientX, e.clientY)
    const target = nodes.find((n) => n.id !== link.from && n.type !== 'start' && p.x >= n.x && p.x <= n.x + NW && p.y >= n.y && p.y <= n.y + heightOf(n))
    if (target) {
      setEdges((es) => [...es.filter((x) => !(x.from === link.from && x.port === link.port)), { id: `e${Date.now()}`, from: link.from, port: link.port, to: target.id }])
      clearRun()
    }
    setLink(null)
  }
  const onPortDown = (e: React.PointerEvent, n: Node, port: string, i: number) => {
    e.stopPropagation()
    const p = toLogical(e.clientX, e.clientY)
    setLink({ from: n.id, port, x: p.x, y: p.y })
    box.current?.setPointerCapture(e.pointerId)
    void i
  }

  // Checks
  const checks = useMemo(() => {
    const reach = new Set<string>(['start'])
    const queue = ['start']
    while (queue.length) {
      const id = queue.shift()!
      for (const e of edges) if (e.from === id && !reach.has(e.to)) (reach.add(e.to), queue.push(e.to))
    }
    const unreachable = nodes.filter((n) => !reach.has(n.id)).length
    let dead = 0
    for (const n of nodes) {
      if (!reach.has(n.id) || types[n.type].terminal) continue
      for (const o of types[n.type].outs) if (!edges.some((e) => e.from === n.id && e.port === o.id)) dead += 1
    }
    return { unreachable, dead }
  }, [nodes, edges])

  const runTest = () => {
    clearRun()
    const sc = scenarios.find((s) => s.id === scenario)!
    const ns: string[] = ['start']
    const es: string[] = []
    let cur = 'start'
    let outcome: 'allow' | 'deny' | 'incomplete' = 'incomplete'
    for (let i = 0; i < 14; i++) {
      const node = byId[cur]
      const ty = types[node.type]
      if (ty.terminal) {
        outcome = ty.terminal
        break
      }
      const edge = edges.find((e) => e.from === cur && e.port === chosenPort(node.type, sc.level))
      if (!edge) break
      es.push(edge.id)
      ns.push(edge.to)
      cur = edge.to
    }
    ns.forEach((_, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setRun({ nodes: ns.slice(0, i + 1), edges: es.slice(0, i), outcome, done: i === ns.length - 1 })
        }, i * 520),
      )
    })
  }

  const selNode = sel?.kind === 'node' ? byId[sel.id] : undefined
  const selEdge = sel?.kind === 'edge' ? edges.find((e) => e.id === sel.id) : undefined
  const sc = scenarios.find((s) => s.id === scenario)!

  return (
    <ConsoleWindow className="shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b p-3">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <Icon name="waypoints" className="h-4 w-4 text-muted-foreground" />
          {t.title}
          <span className="rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">{t.draft}</span>
        </p>
        <div className="flex items-center gap-2">
          <button type="button" onClick={reset} className="h-8 rounded-md border px-3 text-xs font-medium hover:bg-accent">
            {t.reset}
          </button>
          <span className="inline-flex h-8 items-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground">{t.publish}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b bg-muted/30 px-3 py-2">
        {palette.map((g) => (
          <div key={g.title.en} className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{g.title[locale]}</span>
            {g.ids.map((id) => (
              <span
                key={id}
                draggable
                onClick={() => add(id)}
                onDragStart={(e) => e.dataTransfer.setData('text/plain', id)}
                className="inline-flex cursor-grab items-center gap-1.5 rounded-md border bg-background px-2 py-1 text-xs font-medium transition-colors hover:border-primary/40 active:cursor-grabbing"
              >
                <Icon name={types[id].icon} className="h-3 w-3" />
                {types[id].label[locale]}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div ref={wrap} className="min-w-0 overflow-x-auto border-b lg:border-b-0 lg:border-r">
          <div
            ref={box}
            tabIndex={0}
            className="relative touch-none select-none outline-none [background-image:radial-gradient(circle,var(--color-border)_1px,transparent_1px)] [background-size:16px_16px]"
            style={{ width: W * scale, height: H * scale }}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerDown={(e) => e.target === e.currentTarget && setSel(null)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              const id = e.dataTransfer.getData('text/plain')
              if (types[id]) add(id, toLogical(e.clientX, e.clientY))
            }}
            onKeyDown={(e) => {
              if ((e.key === 'Delete' || e.key === 'Backspace') && selNode) removeNode(selNode.id)
              if ((e.key === 'Delete' || e.key === 'Backspace') && selEdge) (setEdges((es) => es.filter((x) => x.id !== selEdge.id)), setSel(null), clearRun())
            }}
          >
            <div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${scale})` }}>
              <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible">
                {edges.map((e) => {
                  const a = byId[e.from]
                  const b = byId[e.to]
                  if (!a || !b) return null
                  const idx = types[a.type].outs.findIndex((o) => o.id === e.port)
                  const x1 = a.x + NW
                  const y1 = portY(a, idx)
                  const x2 = b.x
                  const y2 = b.y + heightOf(b) / 2
                  const d = curve(x1, y1, x2, y2)
                  const lit = run?.edges.includes(e.id)
                  const label = types[a.type].outs[idx]?.label[locale]
                  const selected = sel?.kind === 'edge' && sel.id === e.id
                  return (
                    <g key={e.id}>
                      <path d={d} fill="none" className={cn(lit ? 'stroke-primary' : selected ? 'stroke-primary/70' : 'stroke-muted-foreground/45')} strokeWidth={lit || selected ? 2.6 : 1.6} />
                      <path d={d} fill="none" stroke="transparent" strokeWidth={14} className="cursor-pointer" onPointerDown={(ev) => (ev.stopPropagation(), setSel({ kind: 'edge', id: e.id }))} />
                      {label && types[a.type].outs.length > 1 && (
                        <g transform={`translate(${(x1 + x2) / 2} ${(y1 + y2) / 2})`} className="pointer-events-none">
                          <rect x={-20} y={-8} width={40} height={16} rx={4} className="fill-background stroke-border" />
                          <text textAnchor="middle" y={3.5} fontSize={9.5} className={lit ? 'fill-primary' : 'fill-muted-foreground'}>
                            {label}
                          </text>
                        </g>
                      )}
                    </g>
                  )
                })}
                {link && (() => {
                  const a = byId[link.from]
                  const idx = types[a.type].outs.findIndex((o) => o.id === link.port)
                  return <path d={curve(a.x + NW, portY(a, idx), link.x, link.y)} fill="none" className="stroke-primary" strokeWidth={2} strokeDasharray="5 4" />
                })()}
              </svg>

              {nodes.map((n) => {
                const ty = types[n.type]
                const lit = run?.nodes.includes(n.id)
                return (
                  <div
                    key={n.id}
                    onPointerDown={(e) => onNodeDown(e, n)}
                    className={cn(
                      'absolute flex cursor-grab items-center gap-2 rounded-lg border px-2.5 text-xs font-medium shadow-xs transition-shadow active:cursor-grabbing',
                      ty.terminal ? endTone[ty.terminal] : tone[ty.category],
                      sel?.kind === 'node' && sel.id === n.id && 'ring-2 ring-primary/50',
                      lit && 'ring-2 ring-primary shadow-md',
                    )}
                    style={{ left: n.x, top: n.y, width: NW, height: heightOf(n) }}
                  >
                    <Icon name={ty.icon} className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{ty.label[locale]}</span>
                    {ty.outs.map((o, i) => (
                      <span
                        key={o.id}
                        onPointerDown={(e) => onPortDown(e, n, o.id, i)}
                        className="absolute -right-[7px] h-3.5 w-3.5 cursor-crosshair rounded-full border-2 border-muted-foreground/60 bg-background transition-colors hover:border-primary hover:bg-primary/20"
                        style={{ top: portY(n, i) - n.y - 7 }}
                        title={o.label[locale]}
                      />
                    ))}
                    {ty.category !== 'start' && <span className="pointer-events-none absolute -left-[5px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border bg-background" />}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <aside className="space-y-4 p-4 text-sm">
          {selNode ? (
            <div className="space-y-3">
              <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{t.inspector}</p>
              <div className="flex items-center gap-2 font-semibold">
                <Icon name={types[selNode.type].icon} className="h-4 w-4" />
                {types[selNode.type].label[locale]}
              </div>
              <p className="text-xs text-muted-foreground">{types[selNode.type].hint[locale]}</p>
              <dl className="space-y-1.5 rounded-lg border p-3 text-xs">
                {types[selNode.type].settings.map((s) => (
                  <div key={s.k.en} className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">{s.k[locale]}</dt>
                    <dd className="text-right font-medium">{s.v[locale]}</dd>
                  </div>
                ))}
              </dl>
              {selNode.type !== 'start' && (
                <button type="button" onClick={() => removeNode(selNode.id)} className="inline-flex h-8 items-center gap-2 rounded-md border px-3 text-xs font-medium text-red-700 hover:bg-red-50">
                  <Icon name="trash-2" className="h-3.5 w-3.5" />
                  {t.remove}
                </button>
              )}
            </div>
          ) : selEdge ? (
            <div className="space-y-3">
              <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{t.link}</p>
              <p className="text-xs">
                {types[byId[selEdge.from].type].label[locale]} → {types[byId[selEdge.to].type].label[locale]}
              </p>
              <button type="button" onClick={() => (setEdges((es) => es.filter((x) => x.id !== selEdge.id)), setSel(null), clearRun())} className="inline-flex h-8 items-center gap-2 rounded-md border px-3 text-xs font-medium text-red-700 hover:bg-red-50">
                <Icon name="trash-2" className="h-3.5 w-3.5" />
                {t.removeLink}
              </button>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">{t.none}</p>
          )}

          <div className="space-y-2 border-t pt-4">
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{t.checks}</p>
            {[
              [checks.dead === 0, checks.dead === 0 ? t.okEnds : t.badEnds(checks.dead)],
              [checks.unreachable === 0, checks.unreachable === 0 ? t.okReach : t.badReach(checks.unreachable)],
            ].map(([ok, label]) => (
              <p key={String(label)} className="flex items-start gap-2 text-xs">
                <Icon name={ok ? 'circle-check' : 'alert-triangle'} className={cn('mt-px h-3.5 w-3.5 shrink-0', ok ? 'text-green-600' : 'text-amber-600')} />
                {String(label)}
              </p>
            ))}
          </div>

          <div className="space-y-2 border-t pt-4">
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{t.test}</p>
            <div className="space-y-1">
              {scenarios.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => (setScenario(s.id), clearRun())}
                  className={cn('block w-full rounded-md border px-2.5 py-1.5 text-left text-xs transition-colors', s.id === scenario ? 'border-primary/40 bg-primary/10 font-medium text-primary' : 'hover:bg-accent')}
                >
                  {s.label[locale]}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground">{sc.who[locale]}</p>
            <button type="button" onClick={runTest} className="inline-flex h-8 w-full items-center justify-center gap-2 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:opacity-90">
              <Icon name="play" className="h-3.5 w-3.5" />
              {t.run}
            </button>
            {run?.done && (
              <div className="space-y-1.5 rounded-lg border p-3 text-xs" aria-live="polite">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t.result}</span>
                  <StatusBadge tone={run.outcome === 'allow' ? 'success' : run.outcome === 'deny' ? 'danger' : 'warning'} dot={false}>
                    {run.outcome === 'allow' ? t.allowed : run.outcome === 'deny' ? t.blocked : t.incomplete}
                  </StatusBadge>
                </div>
                <p className="text-muted-foreground">
                  {t.path}: {run.nodes.map((id) => types[byId[id].type].label[locale]).join(' → ')}
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
      <p className="border-t bg-muted/30 px-4 py-2 text-[11px] text-muted-foreground">{t.hint}</p>
    </ConsoleWindow>
  )
}
