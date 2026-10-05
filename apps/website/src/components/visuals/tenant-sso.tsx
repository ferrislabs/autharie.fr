import { useState } from 'react'
import { cn } from '@explainer/ui'
import { ConsoleWindow, Icon, StatusBadge } from '../console/ui'

const customers = [
  { name: 'Northwind', domain: 'northwind.com', idp: { en: 'Microsoft Entra ID', fr: 'Microsoft Entra ID' }, users: 1240, mfa: true },
  { name: 'Globex', domain: 'globex.io', idp: { en: 'Google Workspace', fr: 'Google Workspace' }, users: 386, mfa: true },
  { name: 'Initech', domain: 'initech.fr', idp: { en: 'Own OpenID Connect provider', fr: 'Son propre fournisseur OpenID Connect' }, users: 92, mfa: false },
  { name: 'Umbrella', domain: 'umbrella.eu', idp: { en: 'Passwords and passkeys', fr: 'Mots de passe et passkeys' }, users: 57, mfa: false },
]
const copy = {
  en: { title: 'Customer organisations', add: 'Add a customer', users: 'users', idp: 'Sign in through', domain: 'Email domain', own: 'Customers only see their own users, applications and settings.', route: 'Routed by email domain to the right directory', mfa: 'Second factor required', nomfa: 'Second factor optional' },
  fr: { title: 'Organisations clientes', add: 'Ajouter un client', users: 'utilisateurs', idp: 'Connexion via', domain: 'Domaine e-mail', own: 'Chaque client ne voit que ses propres utilisateurs, applications et réglages.', route: 'Orienté vers le bon annuaire selon le domaine e-mail', mfa: 'Second facteur exigé', nomfa: 'Second facteur facultatif' },
}

export default function TenantSso({ locale = 'en' }: { locale?: 'en' | 'fr' }) {
  const t = copy[locale]
  const [sel, setSel] = useState(0)
  const c = customers[sel]
  return (
    <ConsoleWindow className="shadow-sm">
      <div className="flex items-center justify-between border-b p-4">
        <p className="text-sm font-semibold">{t.title}</p>
        <span className="inline-flex h-8 items-center gap-2 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground"><Icon name="plus" className="h-3.5 w-3.5" />{t.add}</span>
      </div>
      <div className="grid md:grid-cols-[0.9fr_1.1fr]">
        <ul className="divide-y border-b md:border-b-0 md:border-r">
          {customers.map((x, i) => (
            <li key={x.name}>
              <button type="button" onClick={() => setSel(i)} className={cn('flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors', i === sel ? 'bg-primary/5' : 'hover:bg-accent')}>
                <span className="flex items-center gap-2.5">
                  <span className={cn('flex h-7 w-7 items-center justify-center rounded-full border text-xs font-medium', i === sel && 'border-primary/40 text-primary')}>{x.name[0]}</span>
                  <span className="text-sm font-medium">{x.name}</span>
                </span>
                <span className="text-xs text-muted-foreground tabular-nums">{x.users} {t.users}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="space-y-3 p-4 text-sm">
          <p className="text-base font-semibold">{c.name}</p>
          <dl className="space-y-2 rounded-lg border p-3 text-xs">
            <div className="flex justify-between gap-3"><dt className="text-muted-foreground">{t.domain}</dt><dd className="font-mono font-medium">{c.domain}</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-muted-foreground">{t.idp}</dt><dd className="text-right font-medium">{c.idp[locale]}</dd></div>
          </dl>
          <StatusBadge tone={c.mfa ? 'success' : 'neutral'}>{c.mfa ? t.mfa : t.nomfa}</StatusBadge>
          <p className="flex items-start gap-2 text-xs text-muted-foreground"><Icon name="waypoints" className="mt-px h-3.5 w-3.5 shrink-0" />{t.route}</p>
        </div>
      </div>
      <p className="flex items-center gap-2 border-t bg-muted/30 px-4 py-2.5 text-xs text-muted-foreground"><Icon name="lock" className="h-3.5 w-3.5" />{t.own}</p>
    </ConsoleWindow>
  )
}
