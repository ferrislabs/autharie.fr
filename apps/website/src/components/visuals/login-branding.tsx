import { useState } from 'react'
import { cn } from '@explainer/ui'
import { ConsoleWindow, Icon } from '../console/ui'

const copy = {
  en: { controls: 'Appearance', accent: 'Accent', lang: 'Language', social: 'Sign in with a company directory', passkey: 'Passkey sign in', title: 'Sign in to Acme', email: 'Email', pass: 'Password', cta: 'Continue', or: 'or', dir: 'Company directory', pk: 'Use a passkey', note: 'Your login, your colours. The service behind it stays ours to run.' },
  fr: { controls: 'Apparence', accent: 'Couleur', lang: 'Langue', social: 'Connexion par annuaire d’entreprise', passkey: 'Connexion par passkey', title: 'Connexion à Acme', email: 'E-mail', pass: 'Mot de passe', cta: 'Continuer', or: 'ou', dir: 'Annuaire d’entreprise', pk: 'Utiliser une passkey', note: 'Votre connexion, vos couleurs. Le service derrière reste à nous d’exploiter.' },
}
const accents = ['#634ecf', '#0f766e', '#c2410c', '#1d4ed8']

export default function LoginBranding({ locale = 'en' }: { locale?: 'en' | 'fr' }) {
  const [lang, setLang] = useState(locale)
  const t = copy[lang]
  const [accent, setAccent] = useState(accents[0])
  const [social, setSocial] = useState(true)
  const [passkey, setPasskey] = useState(true)
  const ui = copy[locale]
  const Toggle = ({ on, set, label }: { on: boolean; set: (v: boolean) => void; label: string }) => (
    <button type="button" role="switch" aria-checked={on} onClick={() => set(!on)} className="flex w-full items-center justify-between gap-3 text-left text-xs">
      {label}
      <span className={cn('inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full p-0.5 transition-colors', on ? 'bg-primary' : 'bg-input')}>
        <span className={cn('block size-4 rounded-full bg-background transition-transform', on && 'translate-x-3.5')} />
      </span>
    </button>
  )
  return (
    <ConsoleWindow className="shadow-sm">
      <div className="grid md:grid-cols-[0.7fr_1.3fr]">
        <div className="space-y-4 border-b p-4 md:border-b-0 md:border-r">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{ui.controls}</p>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">{ui.accent}</p>
            <div className="flex gap-2">
              {accents.map((c) => (
                <button key={c} type="button" aria-label={c} onClick={() => setAccent(c)} className={cn('h-6 w-6 rounded-full ring-offset-2 transition-shadow', accent === c && 'ring-2 ring-foreground/60')} style={{ background: c }} />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">{ui.lang}</p>
            <div className="flex gap-1.5">
              {(['en', 'fr'] as const).map((l) => (
                <button key={l} type="button" onClick={() => setLang(l)} className={cn('rounded-md border px-2.5 py-1 text-xs uppercase', lang === l ? 'border-primary/40 bg-primary/10 font-medium text-primary' : 'hover:bg-accent')}>{l}</button>
              ))}
            </div>
          </div>
          <Toggle on={social} set={setSocial} label={ui.social} />
          <Toggle on={passkey} set={setPasskey} label={ui.passkey} />
        </div>
        <div className="flex items-center justify-center bg-muted/40 p-5">
          <div className="w-full max-w-[17rem] space-y-3 rounded-xl border bg-white p-5 shadow-sm">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold text-white transition-colors" style={{ background: accent }}>A</span>
            <p className="text-base font-semibold">{t.title}</p>
            <div className="space-y-2 text-xs">
              <div className="rounded-md border px-3 py-2 text-muted-foreground">{t.email}</div>
              <div className="rounded-md border px-3 py-2 text-muted-foreground">{t.pass}</div>
            </div>
            <span className="flex h-9 items-center justify-center rounded-md text-xs font-medium text-white transition-colors" style={{ background: accent }}>{t.cta}</span>
            {(social || passkey) && <p className="text-center text-[11px] text-muted-foreground">{t.or}</p>}
            {social && <span className="flex h-9 items-center justify-center gap-2 rounded-md border text-xs"><Icon name="building-2" className="h-3.5 w-3.5" />{t.dir}</span>}
            {passkey && <span className="flex h-9 items-center justify-center gap-2 rounded-md border text-xs"><Icon name="key-round" className="h-3.5 w-3.5" />{t.pk}</span>}
          </div>
        </div>
      </div>
      <p className="border-t bg-muted/30 px-4 py-2.5 text-xs text-muted-foreground">{ui.note}</p>
    </ConsoleWindow>
  )
}
