import { useState } from 'react'
import { cn } from '@explainer/ui'
import { ConsoleWindow, Icon, StatusBadge } from '../console/ui'

const tabs = {
  discovery: { label: 'curl', code: `curl https://id.acme.com/realms/acme/.well-known/openid-configuration\n\n{\n  "issuer": "https://id.acme.com/realms/acme",\n  "authorization_endpoint": "…/protocol/openid-connect/auth",\n  "token_endpoint": "…/protocol/openid-connect/token",\n  "jwks_uri": "…/protocol/openid-connect/certs"\n}` },
  ts: { label: 'TypeScript', code: `import * as client from 'openid-client'\n\nconst config = await client.discovery(\n  new URL('https://id.acme.com/realms/acme'),\n  'web-app',\n  process.env.CLIENT_SECRET,\n)\n\nconst url = client.buildAuthorizationUrl(config, {\n  redirect_uri: 'https://app.acme.com/callback',\n  scope: 'openid profile email',\n})` },
  rust: { label: 'Rust', code: `let issuer = IssuerUrl::new("https://id.acme.com/realms/acme".into())?;\nlet metadata =\n    CoreProviderMetadata::discover_async(issuer, &http).await?;\n\nlet client = CoreClient::from_provider_metadata(\n    metadata,\n    ClientId::new("web-app".into()),\n    Some(ClientSecret::new(secret)),\n);` },
} as const
type Tab = keyof typeof tabs

const copy = {
  en: { env: 'Environments', sandbox: 'Sandbox per pull request', endpoints: 'Standard endpoints', note: 'Any library that speaks OpenID Connect works. No SDK to adopt.', rows: [['pr-482', 'sandbox-482.acme.dev'], ['pr-479', 'sandbox-479.acme.dev']], eps: ['Authorization', 'Token', 'JWKS', 'Userinfo'] },
  fr: { env: 'Environnements', sandbox: 'Bac à sable par pull request', endpoints: 'Points d’accès standard', note: 'Toute bibliothèque OpenID Connect convient. Aucun SDK à adopter.', rows: [['pr-482', 'sandbox-482.acme.dev'], ['pr-479', 'sandbox-479.acme.dev']], eps: ['Autorisation', 'Jeton', 'JWKS', 'Userinfo'] },
}

export default function DevQuickstart({ locale = 'en' }: { locale?: 'en' | 'fr' }) {
  const t = copy[locale]
  const [tab, setTab] = useState<Tab>('ts')
  return (
    <ConsoleWindow className="shadow-sm">
      <div className="grid md:grid-cols-[1.3fr_0.7fr]">
        <div className="min-w-0 border-b md:border-b-0 md:border-r">
          <div className="flex gap-1 border-b px-3 pt-2" role="tablist">
            {(Object.keys(tabs) as Tab[]).map((k) => (
              <button key={k} role="tab" aria-selected={tab === k} type="button" onClick={() => setTab(k)} className={cn('-mb-px border-b-2 px-3 py-2 text-xs transition-colors', tab === k ? 'border-primary font-medium text-primary' : 'border-transparent text-muted-foreground hover:text-foreground')}>
                {tabs[k].label}
              </button>
            ))}
          </div>
          <pre className="overflow-x-auto bg-[#14131f] p-4 font-mono text-[11.5px] leading-6 text-slate-300"><code>{tabs[tab].code}</code></pre>
          <p className="flex items-center gap-2 border-t px-4 py-2.5 text-xs text-muted-foreground">
            <Icon name="info" className="h-3.5 w-3.5" />
            {t.note}
          </p>
        </div>
        <div className="space-y-5 p-4 text-sm">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t.endpoints}</p>
            {t.eps.map((e) => (
              <div key={e} className="flex items-center gap-2 text-xs">
                <Icon name="circle-check" className="h-3.5 w-3.5 text-green-600" />
                {e}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{t.sandbox}</p>
            {t.rows.map(([pr, host]) => (
              <div key={pr} className="rounded-lg border p-2.5">
                <div className="flex items-center justify-between">
                  <code className="font-mono text-[11px]">{pr}</code>
                  <StatusBadge tone="success">OK</StatusBadge>
                </div>
                <p className="mt-1 truncate text-[11px] text-muted-foreground">{host}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ConsoleWindow>
  )
}
