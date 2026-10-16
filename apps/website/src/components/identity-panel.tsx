import { useState } from 'react'
import { AgentControl } from './agent-control'
import { PixelOtarie } from './pixel-otarie'
import type { Locale } from '../i18n'

type Kind = 'users' | 'services' | 'agents'

interface Profile {
  initials: string
  name: string
  role: string
  status: string
  sections: { title: string; chips?: string[]; rows?: [string, string][] }[]
  history: [string, string, string][]
  watch: string
}

const copy = {
  en: {
    label: 'Identity type',
    tabs: { users: 'Users', services: 'Services', agents: 'AI agents' } as Record<Kind, string>,
    users: {
      initials: 'LM',
      name: 'Lea Martin',
      role: 'User · Finance team',
      status: 'Active',
      sections: [
        { title: 'How she signs in', chips: ['Passkey', 'Two-factor on', 'Company SSO (SAML)', 'Google'] },
        {
          title: 'Roles and apps',
          rows: [
            ['Accountant', 'Billing app'],
            ['Viewer', 'Back office'],
          ],
        },
      ],
      history: [
        ['09:12', 'Signed in with a passkey, Paris', 'Allowed'],
        ['Yesterday', 'Sign in from a new country asked for two-factor', 'Verified'],
      ],
      watch: 'Autharie protects this account: passkey, two-factor and an alert on any unusual sign in.',
    } as Profile,
    services: {
      initials: 'BS',
      name: 'Billing service',
      role: 'Service account · backend app',
      status: 'Active',
      sections: [
        { title: 'What it may do', chips: ['Write invoices', 'Read customers'] },
        {
          title: 'Credentials',
          rows: [
            ['API key', 'rotated automatically in 12 days'],
            ['OAuth client', 'secret never shown again'],
          ],
        },
      ],
      history: [
        ['09:20', 'Token issued for 15 minutes', 'Allowed'],
        ['09:05', 'Tried to delete a customer', 'Blocked'],
      ],
      watch: 'Autharie rotates its keys for you and records every token it gets.',
    } as Profile,
  },
  fr: {
    label: 'Type d’identité',
    tabs: { users: 'Utilisateurs', services: 'Services', agents: 'Agents IA' } as Record<Kind, string>,
    users: {
      initials: 'LM',
      name: 'Léa Martin',
      role: 'Utilisatrice · Équipe finance',
      status: 'Active',
      sections: [
        { title: 'Comment elle se connecte', chips: ['Passkey', 'Double authentification', 'SSO d’entreprise (SAML)', 'Google'] },
        {
          title: 'Rôles et applications',
          rows: [
            ['Comptable', 'Application facturation'],
            ['Lecture', 'Back-office'],
          ],
        },
      ],
      history: [
        ['09:12', 'Connexion par passkey, Paris', 'Autorisé'],
        ['Hier', 'Connexion depuis un nouveau pays, double authentification demandée', 'Vérifié'],
      ],
      watch: 'Autharie protège ce compte : passkey, double authentification et alerte en cas de connexion inhabituelle.',
    } as Profile,
    services: {
      initials: 'SF',
      name: 'Service facturation',
      role: 'Compte de service · application backend',
      status: 'Actif',
      sections: [
        { title: 'Ce qu’il peut faire', chips: ['Écrire des factures', 'Lire les clients'] },
        {
          title: 'Identifiants',
          rows: [
            ['Clé API', 'renouvelée automatiquement dans 12 jours'],
            ['Client OAuth', 'secret jamais réaffiché'],
          ],
        },
      ],
      history: [
        ['09:20', 'Jeton émis pour 15 minutes', 'Autorisé'],
        ['09:05', 'A tenté de supprimer un client', 'Bloqué'],
      ],
      watch: 'Autharie renouvelle ses clés pour vous et trace chaque jeton qu’il reçoit.',
    } as Profile,
  },
}

const ORDER: Kind[] = ['users', 'services', 'agents']

function ProfileCard({ profile, kind }: { profile: Profile; kind: Kind }) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card text-left shadow-lift">
      <div className="flex items-center gap-3 border-b px-5 py-4">
        <span
          className={`flex size-10 items-center justify-center rounded-xl text-sm font-semibold ${
            kind === 'users' ? 'bg-primary/10 text-primary' : 'bg-zinc-200 text-zinc-800'
          }`}
          aria-hidden="true"
        >
          {profile.initials}
        </span>
        <span className="min-w-0">
          <span className="flex items-center gap-2">
            <span className="font-semibold">{profile.name}</span>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-micro font-medium text-emerald-700">{profile.status}</span>
          </span>
          <span className="block text-xs text-muted-foreground">{profile.role}</span>
        </span>
      </div>

      <div className="grid gap-px bg-border md:grid-cols-2">
        {profile.sections.map((section) => (
          <div key={section.title} className="bg-card px-5 py-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{section.title}</p>
            {section.chips && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {section.chips.map((chip) => (
                  <li key={chip} className="rounded-md bg-primary/10 px-2.5 py-1 text-sm font-medium text-primary ring-1 ring-primary/20">
                    {chip}
                  </li>
                ))}
              </ul>
            )}
            {section.rows && (
              <ul className="mt-3 space-y-2">
                {section.rows.map(([lead, value]) => (
                  <li key={lead} className="flex flex-wrap items-baseline justify-between gap-x-3 rounded-md border px-3 py-2 text-sm">
                    <span className="font-medium">{lead}</span>
                    <span className="text-muted-foreground">{value}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="border-t px-5 py-4">
        <ul className="space-y-1.5 text-sm">
          {profile.history.map(([time, text, verdict]) => (
            <li key={time} className="flex gap-3">
              <span className="w-16 shrink-0 tabular-nums text-muted-foreground">{time}</span>
              <span className="min-w-0 flex-1 leading-snug">{text}</span>
              <span className={`shrink-0 font-medium ${verdict === 'Bloqué' || verdict === 'Blocked' ? 'text-red-700' : 'text-emerald-700'}`}>{verdict}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-3 border-t bg-primary/[0.04] px-5 py-3">
        <PixelOtarie className="size-7 shrink-0" />
        <p className="text-sm text-muted-foreground">{profile.watch}</p>
      </div>
    </div>
  )
}

export function IdentityPanel({ locale = 'en' }: { locale?: Locale }) {
  const t = copy[locale]
  const [kind, setKind] = useState<Kind>('agents')

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
        <div className="flex rounded-full border bg-card p-1 shadow-resting" role="group" aria-label={t.label}>
          {ORDER.map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={kind === k}
              onClick={() => setKind(k)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                kind === k ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t.tabs[k]}
            </button>
          ))}
        </div>
      </div>
      {kind === 'agents' ? (
        <AgentControl locale={locale} />
      ) : (
        <ProfileCard profile={t[kind]} kind={kind} />
      )}
    </div>
  )
}
