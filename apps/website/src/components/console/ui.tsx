import { cn } from '@explainer/ui'
import { lucide } from './lucide'

/**
 * The console, in markup.
 *
 * Mirrors /opt/aether/apps/console: the same top bar, tab bar, side navigation,
 * status badges, tables and cards, with the same spacing and type sizes. These
 * render on the server and carry no behaviour, so a mock panel costs no
 * JavaScript. When the console changes a component, change it here too.
 */

export function Icon({ name, className = 'h-4 w-4' }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('shrink-0', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: lucide[name] ?? '' }}
    />
  )
}

/** Scope: Noto Sans and the console's tighter radii apply inside this only. */
export function ConsoleWindow({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'console-ui overflow-hidden rounded-lg border bg-background text-left text-foreground',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function Initial({ label }: { label: string }) {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-medium uppercase">
      {label.charAt(0)}
    </span>
  )
}

export interface Crumb {
  label: string
  icon?: string
}

/** The console's top bar: logo, organisation switcher, breadcrumbs. */
export function TopBar({ org = 'Acme', crumbs = [] }: { org?: string; crumbs?: Crumb[] }) {
  return (
    <div className="flex h-14 items-center gap-3 border-b bg-background px-4">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
        A
      </span>
      <span className="text-muted-foreground/60">/</span>
      <span className="flex items-center gap-2 rounded-md px-1.5 py-1 text-sm font-medium">
        <Initial label={org} />
        <span className="max-w-40 truncate">{org}</span>
        <Icon name="chevrons-up-down" className="h-3.5 w-3.5 text-muted-foreground" />
      </span>
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex min-w-0 items-center gap-3">
          <span className="text-muted-foreground/60">/</span>
          <span
            className={cn(
              'flex min-w-0 items-center gap-1.5 truncate text-sm',
              i === crumbs.length - 1 ? 'font-medium' : 'text-muted-foreground',
            )}
          >
            {crumb.icon && <Icon name={crumb.icon} className="h-4 w-4" />}
            <span className="truncate">{crumb.label}</span>
          </span>
        </span>
      ))}
    </div>
  )
}

export interface TabItem {
  label: string
  icon: string
  active?: boolean
}

export function NavTabs({ tabs }: { tabs: TabItem[] }) {
  return (
    <nav className="flex items-center gap-1 overflow-hidden border-b px-4">
      {tabs.map((tab) => (
        <span
          key={tab.label}
          className={cn(
            '-mb-px flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-2.5 text-sm',
            tab.active
              ? 'border-primary font-medium text-primary'
              : 'border-transparent text-muted-foreground',
          )}
        >
          <Icon name={tab.icon} />
          {tab.label}
        </span>
      ))}
    </nav>
  )
}

export interface SideItem {
  label: string
  icon?: string
  active?: boolean
  children?: { label: string; active?: boolean }[]
}

function sideClasses(active: boolean) {
  return cn(
    'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm',
    active ? 'bg-accent font-medium text-foreground' : 'text-muted-foreground',
  )
}

export function SideNav({ entries }: { entries: SideItem[] }) {
  return (
    <nav className="w-full shrink-0 space-y-0.5 sm:w-52">
      {entries.map((entry) => (
        <div key={entry.label}>
          <div className={sideClasses(!!entry.active)}>
            {entry.icon && <Icon name={entry.icon} />}
            <span className="flex-1 truncate">{entry.label}</span>
            {entry.children && <Icon name="chevron-down" className="h-3.5 w-3.5" />}
          </div>
          {entry.children && (
            <div className="ml-[1.4rem] space-y-0.5 border-l pl-2">
              {entry.children.map((child) => (
                <div key={child.label} className={sideClasses(!!child.active)}>
                  <span className="truncate">{child.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}

/** A section beside a vertical navigation, as Settings and Observability are. */
export function SideNavLayout({
  entries,
  children,
}: {
  entries: SideItem[]
  children: React.ReactNode
}) {
  return (
    <div className="flex w-full flex-col gap-6 px-5 py-6 sm:flex-row">
      <SideNav entries={entries} />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}

/** The body of a console page that is not beside a side navigation. */
export function Page({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-5 py-6', className)}>{children}</div>
}

export function PageTitle({
  title,
  badges,
  actions,
}: {
  title: React.ReactNode
  badges?: React.ReactNode
  actions?: React.ReactNode
}) {
  return (
    <div className="space-y-3 border-b pb-4">
      <div className="flex items-start justify-between gap-4">
        <div className="truncate text-2xl font-bold tracking-tight">{title}</div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
      {badges && <div className="flex flex-wrap items-center gap-2">{badges}</div>}
    </div>
  )
}

export function SectionPage({
  title,
  description,
  actions,
  action,
  children,
}: {
  title: string
  description?: string
  actions?: React.ReactNode
  /** A single button, for callers that cannot pass JSX (Astro attributes). */
  action?: { label: string; icon?: string }
  children: React.ReactNode
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4 border-b pb-4">
        <div className="space-y-1">
          <div className="text-xl font-semibold tracking-tight">{title}</div>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {(actions || action) && (
          <div className="flex shrink-0 items-center gap-2">
            {actions}
            {action && <Button icon={action.icon}>{action.label}</Button>}
          </div>
        )}
      </div>
      {children}
    </div>
  )
}

export function Section({
  title,
  aside,
  children,
}: {
  title: string
  aside?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <div className="text-base font-semibold">{title}</div>
        {aside}
      </div>
      {children}
    </section>
  )
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('rounded-lg border bg-card p-5', className)}>{children}</div>
}

export function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Card className="p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </Card>
  )
}

export function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  )
}

export type Tone = 'success' | 'progress' | 'warning' | 'danger' | 'neutral' | 'accent'

const TONES: Record<Tone, { pill: string; dot: string }> = {
  success: { pill: 'border-green-200 bg-green-50 text-green-700', dot: 'bg-green-500' },
  progress: { pill: 'border-blue-200 bg-blue-50 text-blue-700', dot: 'bg-blue-500 animate-pulse' },
  warning: { pill: 'border-amber-200 bg-amber-50 text-amber-700', dot: 'bg-amber-500' },
  danger: { pill: 'border-red-200 bg-red-50 text-red-700', dot: 'bg-red-500' },
  neutral: { pill: 'border-border bg-muted text-muted-foreground', dot: 'bg-muted-foreground' },
  accent: { pill: 'border-primary/30 bg-primary/10 text-primary', dot: 'bg-primary' },
}

export function StatusBadge({
  tone,
  children,
  dot = true,
}: {
  tone: Tone
  children: React.ReactNode
  dot?: boolean
}) {
  const { pill, dot: dotClass } = TONES[tone]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium',
        pill,
      )}
    >
      {children}
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', dotClass)} />}
    </span>
  )
}

export function Button({
  children,
  icon,
  variant = 'default',
}: {
  children: React.ReactNode
  icon?: string
  variant?: 'default' | 'outline' | 'ghost'
}) {
  return (
    <span
      className={cn(
        'inline-flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded-md px-3 text-sm font-medium',
        variant === 'default' && 'bg-primary text-primary-foreground',
        variant === 'outline' && 'border bg-background',
        variant === 'ghost' && 'text-foreground',
      )}
    >
      {icon && <Icon name={icon} />}
      {children}
    </span>
  )
}

export function Input({ value, icon, className }: { value: string; icon?: string; className?: string }) {
  return (
    <div className={cn('relative', className)}>
      {icon && <Icon name={icon} className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />}
      <div
        className={cn(
          'flex h-9 w-full items-center rounded-md border bg-transparent px-3 text-sm shadow-xs',
          icon && 'pl-8',
        )}
      >
        {value}
      </div>
    </div>
  )
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <p className="text-sm font-medium leading-none">{label}</p>
      {children}
    </div>
  )
}

export function Switch({ on }: { on: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent p-0.5',
        on ? 'bg-primary' : 'bg-input',
      )}
    >
      <span
        className={cn('block size-4 rounded-full bg-background', on ? 'translate-x-[calc(100%-2px)]' : 'translate-x-0')}
      />
    </span>
  )
}

/** The console's table: bordered, header row, last row without a rule. */
export function Table({
  head,
  rows,
}: {
  head: { label?: string; right?: boolean }[]
  rows: React.ReactNode[][]
}) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr className="border-b">
            {head.map((h, i) => (
              <th
                key={i}
                className={cn(
                  'h-10 whitespace-nowrap px-2 text-left align-middle font-medium text-foreground',
                  h.right && 'text-right',
                )}
              >
                {h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {rows.map((row, r) => (
            <tr key={r} className="border-b">
              {row.map((cell, c) => (
                <td
                  key={c}
                  className={cn(
                    'whitespace-nowrap p-2 align-middle',
                    c === 0 && 'font-medium',
                    head[c]?.right && 'text-right',
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** The slim usage bar the console draws for CPU, memory and quota. */
export function Meter({ label, value, pct }: { label: string; value: string; pct: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

const ROW_TONES: Record<string, Tone> = { ok: 'success', warn: 'warning', info: 'accent', muted: 'neutral' }

/** Label and value rows inside a card, the way the console's detail pages list facts. */
export function MockRows({ rows }: { rows: { label: string; value: string; tone?: string }[] }) {
  return (
    <Card className="space-y-3 p-4">
      {rows.map((row) => (
        <InfoRow
          key={row.label}
          label={row.label}
          value={
            row.tone ? (
              <StatusBadge tone={ROW_TONES[row.tone] ?? 'neutral'} dot={row.tone !== 'muted'}>
                {row.value}
              </StatusBadge>
            ) : (
              row.value
            )
          }
        />
      ))}
    </Card>
  )
}
