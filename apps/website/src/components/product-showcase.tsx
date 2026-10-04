import { useState } from 'react'
import { cn } from '@explainer/ui'
import type { Locale } from '../i18n'
import {
  Button, Card, ConsoleWindow, Field, Icon, InfoRow, Input, Meter, NavTabs, Page, PageTitle,
  Section, SectionPage, SideNavLayout, StatusBadge, Switch, Table, TopBar,
  type Crumb, type SideItem,
} from './console/ui'

/**
 * The console, drawn rather than screenshotted, one panel per thing the
 * platform does. Each panel copies a real console page: same top bar, tab bar,
 * settings navigation and tables, from /opt/aether/apps/console.
 *
 * The tab switcher exists so the hero can show six capabilities in the space
 * of one.
 */

interface Tab {
  id: string
  icon: string
}

const TABS: Tab[] = [
  { id: 'deploy', icon: 'rocket' },
  { id: 'archives', icon: 'archive' },
  { id: 'upgrades', icon: 'refresh-cw' },
  { id: 'dataplanes', icon: 'server' },
  { id: 'access', icon: 'shield-check' },
  { id: 'audit', icon: 'scroll-text' },
]

interface Copy {
  tabs: string[]
  tablistLabel: string
  deployments: string
  settingsNav: { general: string; resources: string; upgrades: string; version: string; automatic: string; network: string; branding: string; backups: string; danger: string }
  deployTabs: { overview: string; observability: string; settings: string }
  obsNav: { logs: string; traces: string; usage: string }
  deploy: {
    refresh: string; action: string; filter: string
    head: string[]; ago: string[]; running: string; upgrading: string
  }
  archives: {
    title: string; description: string; schedule: string; enabled: string; daily: string
    takeBackups: string; takeHint: string; howOften: string; every: string; at: string
    keepLast: string; keepDays: string; archivesTitle: string; restore: string; ages: string[]; kept: string
  }
  upgrades: {
    title: string; description: string; section: string; on: string; patch: string; low: string
    changed: string; changes: string[]; action: string; window: string; windowValue: string
    policy: string; policyValue: string
  }
  dataplanes: {
    title: string; action: string; shared: string; reserved: string; alive: string
    deployments: string[]; cpu: string; memory: string; cpuValues: string[]; memValues: string[]; registered: string
  }
  access: {
    title: string; description: string; applied: string; restricted: string; ranges: string; add: string
    footer: string
  }
  audit: {
    title: string; description: string; filter: string; head: string[]; system: string
    events: string[]; flagged: string; info: string
  }
}

const copy: Record<Locale, Copy> = {
  en: {
    tabs: ['Deploy', 'Archives', 'Upgrades', 'Data planes', 'Access', 'Audit'],
    tablistLabel: 'What the platform does',
    deployments: 'Deployments',
    settingsNav: {
      general: 'General', resources: 'Resources', upgrades: 'Upgrades', version: 'Version',
      automatic: 'Automatic upgrades', network: 'Network access', branding: 'Branding',
      backups: 'Backups', danger: 'Danger zone',
    },
    deployTabs: { overview: 'Overview', observability: 'Observability', settings: 'Settings' },
    obsNav: { logs: 'Logs', traces: 'Traces', usage: 'Usage' },
    deploy: {
      refresh: 'Refresh', action: 'New deployment', filter: 'Filter by name or namespace',
      head: ['Name', 'Provider', 'Status', 'Namespace', 'Size', 'Created'],
      ago: ['3 months ago', '3 months ago', '8 months ago', '1 month ago'],
      running: 'Running', upgrading: 'Upgrading',
    },
    archives: {
      title: 'Backups',
      description: 'When this instance is archived, and what has been archived so far.',
      schedule: 'Schedule', enabled: 'Enabled', daily: 'Every day at 02:00, keeping the last 7 and 30 days',
      takeBackups: 'Take backups', takeHint: 'Archive this deployment on a schedule.',
      howOften: 'How often', every: 'Every day', at: 'At',
      keepLast: 'Always keep the last', keepDays: 'And everything from the last',
      archivesTitle: 'Archives', restore: 'Restore', kept: 'days',
      ages: ['today', 'yesterday', '2 days ago', '3 days ago'],
    },
    upgrades: {
      title: 'Version', description: 'Running 1.4.2.', section: 'Available upgrade', on: 'You are on 1.4.2',
      patch: 'Patch', low: 'Low risk', changed: 'What changed',
      changes: ['Fixes token refresh under clock skew.', 'Faster realm export.'],
      action: 'Upgrade to 1.4.3', window: 'Maintenance window', windowValue: 'Sun 03:00 to 05:00',
      policy: 'What we may apply for you', policyValue: 'Patches only, majors ask first',
    },
    dataplanes: {
      title: 'Data planes', action: 'Register a data plane', shared: 'Shared', reserved: 'Reserved for Acme',
      alive: 'Alive', deployments: ['18 deployments', '2 deployments'], cpu: 'CPU', memory: 'Memory',
      cpuValues: ['11.5 of 16 vCPU', '1.2 of 8 vCPU'], memValues: ['22 of 32 Gi', '3 of 16 Gi'],
      registered: 'Registered 4 months ago',
    },
    access: {
      title: 'Network access', description: 'Which source addresses may reach this deployment.',
      applied: 'Applied now', restricted: 'Restricted', ranges: '3 allowed ranges', add: 'Add range',
      footer: 'Changes take effect within a minute.',
    },
    audit: {
      title: 'Logs', description: 'Every action, attributed and timestamped.', filter: 'Filter by actor or action',
      head: ['Time', 'Actor', 'Action', 'Target'], system: 'System', flagged: 'Warning', info: 'Info',
      events: ['Changed the backup schedule', 'Cleared the network allow list', 'Granted Admin', 'Applied 1.4.2', 'Restored an archive'],
    },
  },
  fr: {
    tabs: ['Déploiement', 'Archives', 'Mises à jour', 'Data planes', 'Accès', 'Audit'],
    tablistLabel: 'Ce que fait la plateforme',
    deployments: 'Déploiements',
    settingsNav: {
      general: 'Général', resources: 'Ressources', upgrades: 'Mises à jour', version: 'Version',
      automatic: 'Mises à jour automatiques', network: 'Accès réseau', branding: 'Personnalisation',
      backups: 'Sauvegardes', danger: 'Zone de danger',
    },
    deployTabs: { overview: "Vue d'ensemble", observability: 'Observabilité', settings: 'Paramètres' },
    obsNav: { logs: 'Journaux', traces: 'Traces', usage: 'Utilisation' },
    deploy: {
      refresh: 'Actualiser', action: 'Nouveau déploiement', filter: 'Filtrer par nom ou namespace',
      head: ['Nom', 'Fournisseur', 'Statut', 'Namespace', 'Taille', 'Créé'],
      ago: ['il y a 3 mois', 'il y a 3 mois', 'il y a 8 mois', 'il y a 1 mois'],
      running: 'En cours', upgrading: 'Mise à jour',
    },
    archives: {
      title: 'Sauvegardes',
      description: "Quand cette instance est archivée, et ce qui l'a déjà été.",
      schedule: 'Planification', enabled: 'Activée', daily: 'Tous les jours à 02:00, en gardant les 7 dernières et 30 jours',
      takeBackups: 'Effectuer des sauvegardes', takeHint: 'Archive ce déploiement selon une planification.',
      howOften: 'Fréquence', every: 'Tous les jours', at: 'À',
      keepLast: 'Toujours conserver les', keepDays: 'Et tout ce qui date des',
      archivesTitle: 'Archives', restore: 'Restaurer', kept: 'jours',
      ages: ["aujourd'hui", 'hier', 'il y a 2 jours', 'il y a 3 jours'],
    },
    upgrades: {
      title: 'Version', description: 'Version 1.4.2 en service.', section: 'Mise à jour disponible', on: 'Vous êtes en 1.4.2',
      patch: 'Correctif', low: 'Risque faible', changed: 'Ce qui change',
      changes: ["Corrige le renouvellement des jetons en cas de décalage d'horloge.", "Export de realm plus rapide."],
      action: 'Passer en 1.4.3', window: 'Fenêtre de maintenance', windowValue: 'Dim. 03:00 à 05:00',
      policy: 'Ce que nous pouvons appliquer pour vous', policyValue: "Correctifs seulement, versions majeures sur accord",
    },
    dataplanes: {
      title: 'Data planes', action: 'Enregistrer un data plane', shared: 'Partagé', reserved: 'Réservé à Acme',
      alive: 'Actif', deployments: ['18 déploiements', '2 déploiements'], cpu: 'CPU', memory: 'Mémoire',
      cpuValues: ['11,5 sur 16 vCPU', '1,2 sur 8 vCPU'], memValues: ['22 sur 32 Gi', '3 sur 16 Gi'],
      registered: 'Enregistré il y a 4 mois',
    },
    access: {
      title: 'Accès réseau', description: 'Les adresses sources autorisées à joindre ce déploiement.',
      applied: 'Appliqué actuellement', restricted: 'Restreint', ranges: '3 plages autorisées', add: 'Ajouter une plage',
      footer: "Les modifications s'appliquent en moins d'une minute.",
    },
    audit: {
      title: 'Journaux', description: 'Chaque action, attribuée et horodatée.', filter: "Filtrer par auteur ou action",
      head: ['Heure', 'Auteur', 'Action', 'Cible'], system: 'Système', flagged: 'Alerte', info: 'Info',
      events: ['Planification des sauvegardes modifiée', 'Liste d’adresses autorisées vidée', 'Rôle Admin attribué', '1.4.2 appliquée', 'Archive restaurée'],
    },
  },
}

function useChrome(t: Copy, active: 'overview' | 'observability' | 'settings') {
  const crumbs: Crumb[] = [
    { label: t.deployments, icon: 'boxes' },
    { label: 'acme-production' },
  ]
  const tabs = [
    { label: t.deployTabs.overview, icon: 'layout-grid', active: active === 'overview' },
    { label: t.deployTabs.observability, icon: 'radar', active: active === 'observability' },
    { label: t.deployTabs.settings, icon: 'settings', active: active === 'settings' },
  ]
  return { crumbs, tabs }
}

function settingsEntries(t: Copy, active: 'version' | 'network' | 'backups'): SideItem[] {
  const s = t.settingsNav
  return [
    { label: s.general, icon: 'settings-2' },
    { label: s.resources, icon: 'cpu' },
    {
      label: s.upgrades,
      icon: 'arrow-up-circle',
      active: false,
      children: [
        { label: s.version, active: active === 'version' },
        { label: s.automatic },
      ],
    },
    { label: s.network, icon: 'globe', active: active === 'network' },
    { label: s.branding, icon: 'palette' },
    { label: s.backups, icon: 'database-backup', active: active === 'backups' },
    { label: s.danger, icon: 'skull' },
  ]
}

function Muted({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn('text-xs text-muted-foreground', className)}>{children}</span>
}

function SettingsWindow({
  t, active, children,
}: { t: Copy; active: 'version' | 'network' | 'backups'; children: React.ReactNode }) {
  const { crumbs, tabs } = useChrome(t, 'settings')
  return (
    <ConsoleWindow>
      <TopBar crumbs={crumbs} />
      <NavTabs tabs={tabs} />
      <SideNavLayout entries={settingsEntries(t, active)}>{children}</SideNavLayout>
    </ConsoleWindow>
  )
}

function DeployPanel({ t }: { t: Copy }) {
  const d = t.deploy
  const rows = [
    ['acme-production', 'Ferriskey', true, 'acme-production', '2 vCPU · 4 Gi', d.ago[0]],
    ['acme-staging', 'Ferriskey', true, 'acme-staging', '1 vCPU · 2 Gi', d.ago[1]],
    ['legacy-sso', 'Keycloak', false, 'legacy-sso', '1 vCPU · 2 Gi', d.ago[2]],
    ['partners-sandbox', 'Ferriskey', true, 'partners-sandbox', '0.5 vCPU · 1 Gi', d.ago[3]],
  ] as const

  return (
    <ConsoleWindow>
      <TopBar crumbs={[{ label: t.deployments, icon: 'boxes' }]} />
      <Page>
        <PageTitle
          title={t.deployments}
          actions={
            <>
              <Button variant="outline" icon="refresh-cw">{d.refresh}</Button>
              <Button icon="plus">{d.action}</Button>
            </>
          }
        />
        <div className="mt-6 space-y-4">
          <Input icon="search" value={d.filter} className="max-w-sm [&>div]:text-muted-foreground" />
          <Table
            head={[
              { label: d.head[0] }, { label: d.head[1] }, { label: d.head[2] },
              { label: d.head[3] }, { label: d.head[4], right: true }, { label: d.head[5], right: true },
            ]}
            rows={rows.map(([name, provider, ok, ns, size, age]) => [
              name,
              <span key="p" className="text-muted-foreground">{provider}</span>,
              <StatusBadge key="s" tone={ok ? 'success' : 'progress'}>{ok ? d.running : d.upgrading}</StatusBadge>,
              <span key="n" className="font-mono text-xs text-muted-foreground">{ns}</span>,
              <span key="z" className="font-mono text-xs text-muted-foreground">{size}</span>,
              <Muted key="c">{age}</Muted>,
            ])}
          />
        </div>
      </Page>
    </ConsoleWindow>
  )
}

function ArchivesPanel({ t }: { t: Copy }) {
  const a = t.archives
  const sizes = ['1.8 GB', '1.8 GB', '1.7 GB', '1.7 GB']
  const stamps = ['2026-09-18 02:14', '2026-09-17 02:14', '2026-09-16 02:14', '2026-09-15 02:14']

  return (
    <SettingsWindow t={t} active="backups">
      <SectionPage title={a.title} description={a.description}>
        <Section title={a.schedule} aside={<StatusBadge tone="success" dot={false}>{a.enabled}</StatusBadge>}>
          <Card className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <p className="text-sm font-medium leading-none">{a.takeBackups}</p>
                <Muted>{a.takeHint}</Muted>
              </div>
              <Switch on />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={a.howOften}><Input value={a.every} /></Field>
              <Field label={a.at}><Input value="02:00" /></Field>
              <Field label={a.keepLast}><Input value="7" /></Field>
              <Field label={a.keepDays}><Input value={`30 ${a.kept}`} /></Field>
            </div>
          </Card>
        </Section>
        <Section title={a.archivesTitle}>
          <div className="divide-y rounded-lg border">
            {stamps.map((at, i) => (
              <div key={at} className="flex items-center gap-3 px-4 py-3">
                <Icon name="circle-check" className="h-4 w-4 text-emerald-600" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm">{a.ages[i]}</p>
                  <p className="truncate font-mono text-xs text-muted-foreground">{at} · s3://acme-archives</p>
                </div>
                <Muted className="hidden sm:inline">{sizes[i]}</Muted>
                <Button variant="outline">{a.restore}</Button>
              </div>
            ))}
          </div>
        </Section>
      </SectionPage>
    </SettingsWindow>
  )
}

function UpgradesPanel({ t }: { t: Copy }) {
  const u = t.upgrades

  return (
    <SettingsWindow t={t} active="version">
      <SectionPage title={u.title} description={u.description}>
        <Section title={u.section}>
          <Card className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-lg font-semibold">1.4.3</span>
                <StatusBadge tone="neutral" dot={false}>{u.patch}</StatusBadge>
                <StatusBadge tone="success" dot={false}>{u.low}</StatusBadge>
              </div>
              <Button icon="arrow-up-circle">{u.action}</Button>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">{u.changed}</p>
              <div className="space-y-1 rounded-md border bg-muted/30 p-3 text-sm">
                {u.changes.map((line) => <p key={line}>{line}</p>)}
              </div>
            </div>
          </Card>
        </Section>
        <Card className="space-y-3">
          <InfoRow label={u.on} value={<span className="font-mono">1.4.2</span>} />
          <InfoRow label={u.window} value={u.windowValue} />
          <InfoRow label={u.policy} value={u.policyValue} />
        </Card>
      </SectionPage>
    </SettingsWindow>
  )
}

function DataplanesPanel({ t }: { t: Copy }) {
  const d = t.dataplanes
  const planes = [
    { name: 'eu-west', id: 'dp_4c19a7', mode: d.shared, pct: [72, 69] },
    { name: 'acme-onprem', id: 'dp_8f2a41', mode: d.reserved, pct: [15, 19] },
  ]

  return (
    <ConsoleWindow>
      <TopBar org="Platform" crumbs={[{ label: d.title, icon: 'server' }]} />
      <Page>
        <PageTitle title={d.title} actions={<Button icon="plus">{d.action}</Button>} />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {planes.map((plane, i) => (
            <Card key={plane.id}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <Icon name="server" className="h-4 w-4 text-muted-foreground" />
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{plane.name}</p>
                    <p className="truncate font-mono text-xs text-muted-foreground">{plane.id}</p>
                  </div>
                </div>
                <StatusBadge tone="success">{d.alive}</StatusBadge>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <StatusBadge tone="neutral" dot={false}>{plane.mode}</StatusBadge>
                <Muted>{d.deployments[i]}</Muted>
              </div>
              <div className="mt-4 space-y-3">
                <Meter label={d.cpu} value={d.cpuValues[i]} pct={plane.pct[0]} />
                <Meter label={d.memory} value={d.memValues[i]} pct={plane.pct[1]} />
              </div>
              <div className="mt-4 border-t pt-3">
                <Muted>{d.registered}</Muted>
              </div>
            </Card>
          ))}
        </div>
      </Page>
    </ConsoleWindow>
  )
}

function AccessPanel({ t }: { t: Copy }) {
  const a = t.access
  const ranges = ['203.0.113.0/24', '198.51.100.14/32', '10.4.0.0/16']

  return (
    <SettingsWindow t={t} active="network">
      <SectionPage title={a.title} description={a.description} actions={<Button icon="plus">{a.add}</Button>}>
        <Section
          title={a.applied}
          aside={<StatusBadge tone="warning" dot={false}>{a.restricted}</StatusBadge>}
        >
          <div className="overflow-hidden rounded-lg border">
            <div className="flex items-center gap-2 border-b px-4 py-2.5">
              <Icon name="shield-check" className="h-4 w-4 text-muted-foreground" />
              <Muted>{a.ranges}</Muted>
            </div>
            <div className="divide-y">
              {ranges.map((range) => (
                <div key={range} className="flex items-center justify-between gap-3 px-4 py-2.5">
                  <span className="font-mono text-sm">{range}</span>
                  <Icon name="trash-2" className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
            <p className="border-t bg-muted/20 px-4 py-2.5 text-xs text-muted-foreground">{a.footer}</p>
          </div>
        </Section>
      </SectionPage>
    </SettingsWindow>
  )
}

function AuditPanel({ t }: { t: Copy }) {
  const a = t.audit
  const { crumbs, tabs } = useChrome(t, 'observability')
  const events = [
    ['11:02:14', 'Ralph Edwards', a.events[0], 'acme-production', false],
    ['09:41:03', 'Devon Lane', a.events[1], 'acme-staging', true],
    ['09:12:55', 'Arlene McCoy', a.events[2], 'robert@acme.com', false],
    ['08:30:21', a.system, a.events[3], 'partners-sandbox', false],
    ['08:02:00', 'Jacob Jones', a.events[4], 'legacy-sso', false],
  ] as const
  const entries: SideItem[] = [
    { label: t.obsNav.logs, icon: 'scroll-text', active: true },
    { label: t.obsNav.traces, icon: 'waypoints' },
    { label: t.obsNav.usage, icon: 'chart-line' },
  ]

  return (
    <ConsoleWindow>
      <TopBar crumbs={crumbs} />
      <NavTabs tabs={tabs} />
      <SideNavLayout entries={entries}>
        <SectionPage title={a.title} description={a.description}>
          <Input icon="search" value={a.filter} className="max-w-sm [&>div]:text-muted-foreground" />
          <Table
            head={[{ label: a.head[0] }, { label: a.head[1] }, { label: a.head[2] }, { label: a.head[3] }, {}]}
            rows={events.map(([at, who, what, target, flagged]) => [
              <span key="t" className="font-mono text-xs text-muted-foreground">{at}</span>,
              who,
              <span key="w" className="font-normal">{what}</span>,
              <span key="g" className="font-mono text-xs text-muted-foreground">{target}</span>,
              <StatusBadge key="b" tone={flagged ? 'warning' : 'neutral'} dot={false}>
                {flagged ? a.flagged : a.info}
              </StatusBadge>,
            ])}
          />
        </SectionPage>
      </SideNavLayout>
    </ConsoleWindow>
  )
}

const PANELS: Record<string, (props: { t: Copy }) => React.ReactNode> = {
  deploy: DeployPanel,
  archives: ArchivesPanel,
  upgrades: UpgradesPanel,
  dataplanes: DataplanesPanel,
  access: AccessPanel,
  audit: AuditPanel,
}

export function ProductShowcase({ locale = 'en' }: { locale?: Locale }) {
  const t = copy[locale]
  const [active, setActive] = useState('deploy')

  return (
    <div className="relative pb-8">
      {/*
        Every panel sits in the same grid cell, so the card is always as tall
        as the tallest one and switching tabs never moves the page under the
        reader. A fixed height would need a magic number that stops being true
        at the next breakpoint.
      */}
      <div className="grid min-w-0 pb-6 shadow-[0_24px_48px_-24px_rgba(16,16,28,0.28)] [&>div]:rounded-lg">
        {TABS.map((candidate) => {
          const Body = PANELS[candidate.id]
          const shown = candidate.id === active

          return (
            <div
              key={candidate.id}
              className={cn('col-start-1 row-start-1 min-w-0', !shown && 'invisible pointer-events-none')}
              aria-hidden={!shown}
            >
              <Body t={t} />
            </div>
          )
        })}
      </div>

      <div className="absolute inset-x-0 bottom-0 flex justify-center px-4">
        <div
          role="tablist"
          aria-label={t.tablistLabel}
          className="flex max-w-full gap-0.5 overflow-x-auto rounded-full border bg-card p-1 shadow-[0_8px_24px_-12px_rgba(16,16,28,0.35)]"
        >
          {TABS.map((candidate, index) => (
            <button
              key={candidate.id}
              type="button"
              role="tab"
              aria-selected={candidate.id === active}
              onClick={() => setActive(candidate.id)}
              className={cn(
                'inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                candidate.id === active
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <Icon name={candidate.icon} />
              {t.tabs[index]}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
