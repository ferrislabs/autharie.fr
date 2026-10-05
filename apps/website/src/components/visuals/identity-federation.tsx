import { useState } from 'react'
import { cn } from '@explainer/ui'
import { ConsoleWindow, Icon, StatusBadge } from '../console/ui'

/**
 * One realm, many organisations: what each person sees depends on where they sit.
 * The group is fictional.
 */

interface Hotel {
  id: string
  name: string
  users: number
  clients: number
}
interface Region {
  id: string
  name: string
  hotels: Hotel[]
}
interface Brand {
  id: string
  name: string
  regions: Region[]
}

const brands: Brand[] = [
  {
    id: 'aurore',
    name: 'Aurore',
    regions: [
      {
        id: 'aurore-sud',
        name: 'Sud',
        hotels: [
          { id: 'mar1', name: 'Aurore Marseille 1', users: 214, clients: 4 },
          { id: 'mar2', name: 'Aurore Marseille 2', users: 188, clients: 4 },
          { id: 'nice', name: 'Aurore Nice', users: 162, clients: 3 },
        ],
      },
      {
        id: 'aurore-idf',
        name: 'Île-de-France',
        hotels: [
          { id: 'opera', name: 'Aurore Paris Opéra', users: 341, clients: 5 },
          { id: 'bercy', name: 'Aurore Paris Bercy', users: 297, clients: 5 },
        ],
      },
    ],
  },
  {
    id: 'brise',
    name: 'Brise',
    regions: [
      {
        id: 'brise-sud',
        name: 'Sud',
        hotels: [
          { id: 'lyon', name: 'Brise Lyon Part-Dieu', users: 126, clients: 2 },
          { id: 'mont', name: 'Brise Montpellier', users: 98, clients: 2 },
        ],
      },
    ],
  },
]

type Scope = { kind: 'realm' } | { kind: 'brand'; id: string } | { kind: 'region'; id: string } | { kind: 'hotel'; id: string }

interface Persona {
  id: string
  role: Record<'en' | 'fr', string>
  name: string
  scope: Scope
}

const personas: Persona[] = [
  { id: 'group', role: { en: 'Group administrator', fr: 'Administrateur du groupe' }, name: 'Claire Martin', scope: { kind: 'realm' } },
  { id: 'region', role: { en: 'Regional manager, Aurore Sud', fr: 'Responsable régional, Aurore Sud' }, name: 'Julien Roche', scope: { kind: 'region', id: 'aurore-sud' } },
  { id: 'hotel', role: { en: 'Hotel manager, Marseille 1', fr: 'Directrice de l’hôtel Marseille 1' }, name: 'Sofia Benali', scope: { kind: 'hotel', id: 'mar1' } },
]

const inScope = (scope: Scope, brand: Brand, region: Region, hotel?: Hotel) => {
  switch (scope.kind) {
    case 'realm':
      return true
    case 'brand':
      return scope.id === brand.id
    case 'region':
      return scope.id === region.id
    case 'hotel':
      return !!hotel && scope.id === hotel.id
  }
}

const copy = {
  en: {
    realm: 'Realm',
    signedInAs: 'Signed in as',
    organisations: 'Organisations',
    sees: 'Can see',
    hotels: 'Hotels',
    clients: 'Applications',
    users: 'Users',
    hidden: 'Not visible to this role',
    regionLabel: 'Region',
    other: 'Everything else in the realm',
    otherValue: 'Hidden',
  },
  fr: {
    realm: 'Realm',
    signedInAs: 'Connecté·e en tant que',
    organisations: 'Organisations',
    sees: 'Peut voir',
    hotels: 'Hôtels',
    clients: 'Applications',
    users: 'Utilisateurs',
    hidden: 'Invisible pour ce rôle',
    regionLabel: 'Région',
    other: 'Tout le reste du realm',
    otherValue: 'Masqué',
  },
}

export default function IdentityFederation({ locale = 'en' }: { locale?: 'en' | 'fr' }) {
  const t = copy[locale]
  const [active, setActive] = useState('hotel')
  const persona = personas.find((p) => p.id === active) ?? personas[2]

  let hotels = 0
  let users = 0
  let clients = 0
  for (const b of brands)
    for (const r of b.regions)
      for (const h of r.hotels)
        if (inScope(persona.scope, b, r, h)) {
          hotels += 1
          users += h.users
          clients += h.clients
        }

  return (
    <ConsoleWindow className="shadow-sm">
      <div className="flex flex-wrap gap-1.5 border-b p-3" role="tablist" aria-label={t.signedInAs}>
        {personas.map((p) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={p.id === active}
            onClick={() => setActive(p.id)}
            className={cn(
              'rounded-md border px-3 py-1.5 text-left text-xs transition-colors',
              p.id === active ? 'border-primary/40 bg-primary/10 font-medium text-primary' : 'text-muted-foreground hover:bg-accent',
            )}
          >
            {p.role[locale]}
          </button>
        ))}
      </div>

      <div className="grid gap-0 sm:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-1 border-b p-4 sm:border-b-0 sm:border-r">
          <p className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <Icon name="building-2" className="h-3.5 w-3.5" />
            {t.realm} · hotelia
          </p>
          {brands.map((b) => (
            <div key={b.id}>
              <div className="flex items-center gap-2 py-1 text-sm font-semibold">
                <Icon name="layout-grid" className="h-3.5 w-3.5 text-muted-foreground" />
                {b.name}
              </div>
              <div className="ml-[7px] space-y-0.5 border-l pl-3">
                {b.regions.map((r) => (
                  <div key={r.id} className="py-0.5">
                    <div className="py-0.5 text-xs text-muted-foreground">
                      {t.regionLabel} {r.name}
                    </div>
                    {r.hotels.map((h) => {
                      const visible = inScope(persona.scope, b, r, h)
                      return (
                        <div
                          key={h.id}
                          className={cn(
                            'flex items-center justify-between gap-2 rounded-md border px-2.5 py-1.5 text-sm transition-all duration-300',
                            visible
                              ? 'border-primary/30 bg-primary/5 font-medium'
                              : 'border-transparent bg-muted/40 text-muted-foreground/50',
                          )}
                        >
                          <span className="truncate">{h.name}</span>
                          <Icon name={visible ? 'circle-check' : 'lock'} className={cn('h-3.5 w-3.5', visible ? 'text-primary' : '')} />
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4 p-4">
          <div>
            <p className="text-xs text-muted-foreground">{t.signedInAs}</p>
            <p className="mt-0.5 text-sm font-semibold">{persona.name}</p>
          </div>
          <div className="space-y-2 rounded-lg border p-3 text-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t.sees}</p>
            {[
              [t.hotels, hotels],
              [t.clients, clients],
              [t.users, users.toLocaleString(locale === 'fr' ? 'fr-FR' : 'en-US')],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-semibold tabular-nums">{value}</span>
              </div>
            ))}
          </div>
          {persona.scope.kind !== 'realm' && (
            <div className="flex items-center justify-between gap-2 rounded-lg border border-dashed p-3 text-xs text-muted-foreground">
              <span>{t.other}</span>
              <StatusBadge tone="neutral" dot={false}>
                {t.otherValue}
              </StatusBadge>
            </div>
          )}
        </div>
      </div>
    </ConsoleWindow>
  )
}
