import { cn } from '@explainer/ui'
import { useRef, useState } from 'react'
import type { Locale } from '../i18n'

/**
 * The contact form.
 *
 * With an endpoint configured it posts the message there as JSON. Without one
 * it opens the visitor's mail client with the message filled in, so the form
 * works before a backend exists.
 */

const EMAIL = 'hello@autharie.fr'
const MIN_FILL_MS = 3000

const copy = {
  en: {
    name: 'Your name',
    email: 'Work email',
    company: 'Company',
    optional: 'optional',
    topic: 'What is it about?',
    topics: [
      ['access', 'Early access'],
      ['pricing', 'Pricing'],
      ['migration', 'Migrating from another provider'],
      ['other', 'Something else'],
    ],
    message: 'Your message',
    placeholder: 'What do you run today, and what would you like to change?',
    consent: 'I agree that Autharie uses these details to answer me. Nothing is shared or used for anything else.',
    send: 'Send message',
    sending: 'Sending…',
    errors: {
      name: 'Tell us your name.',
      email: 'Enter a valid email address.',
      message: 'Write a few words so we can help.',
      consent: 'Please tick the box so we can answer you.',
    },
    sentTitle: 'Message sent',
    sentBody: 'Thank you. We will come back to you at the address you gave.',
    mailTitle: 'Your mail app should have opened',
    mailBody: `If nothing happened, write to ${EMAIL}.`,
    failTitle: 'The message could not be sent',
    failBody: `Try again, or write to ${EMAIL}.`,
    again: 'Send another message',
  },
  fr: {
    name: 'Votre nom',
    email: 'E-mail professionnel',
    company: 'Entreprise',
    optional: 'facultatif',
    topic: 'De quoi s’agit-il ?',
    topics: [
      ['access', 'Accès anticipé'],
      ['pricing', 'Tarifs'],
      ['migration', 'Migrer depuis un autre fournisseur'],
      ['other', 'Autre chose'],
    ],
    message: 'Votre message',
    placeholder: 'Que faites-vous tourner aujourd’hui, et que souhaitez-vous changer ?',
    consent: 'J’accepte qu’Autharie utilise ces informations pour me répondre. Rien n’est partagé ni utilisé pour autre chose.',
    send: 'Envoyer le message',
    sending: 'Envoi…',
    errors: {
      name: 'Indiquez votre nom.',
      email: 'Saisissez une adresse e-mail valide.',
      message: 'Écrivez quelques mots pour que nous puissions vous aider.',
      consent: 'Cochez la case pour que nous puissions vous répondre.',
    },
    sentTitle: 'Message envoyé',
    sentBody: 'Merci. Nous reviendrons vers vous à l’adresse indiquée.',
    mailTitle: 'Votre messagerie devrait s’être ouverte',
    mailBody: `Si rien ne s’est passé, écrivez à ${EMAIL}.`,
    failTitle: 'Le message n’a pas pu être envoyé',
    failBody: `Réessayez, ou écrivez à ${EMAIL}.`,
    again: 'Envoyer un autre message',
  },
}

type Status = 'idle' | 'sending' | 'sent' | 'mail' | 'failed'
type Field = 'name' | 'email' | 'message' | 'consent'

const input =
  'h-11 w-full rounded-md border bg-card px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20 aria-[invalid=true]:border-red-400'

export function ContactForm({ locale = 'en', endpoint = '' }: { locale?: Locale; endpoint?: string }) {
  const t = copy[locale]
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const shownAt = useRef(Date.now())

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const value = (key: string) => String(form.get(key) ?? '').trim()

    const next: Partial<Record<Field, string>> = {}
    if (!value('name')) next.name = t.errors.name
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value('email'))) next.email = t.errors.email
    if (value('message').length < 10) next.message = t.errors.message
    if (form.get('consent') !== 'on') next.consent = t.errors.consent
    setErrors(next)
    if (Object.keys(next).length > 0) return

    // A bot fills the hidden field too: pretend it worked and send nothing.
    if (value('website')) {
      setStatus('sent')
      return
    }

    // Submitted within seconds of the page opening: hold it back a moment. A
    // person with autofill still gets through, a script that does not wait does not.
    const wait = MIN_FILL_MS - (Date.now() - shownAt.current)
    if (wait > 0) {
      setStatus('sending')
      await new Promise((resolve) => setTimeout(resolve, wait))
    }

    const payload = {
      name: value('name'),
      email: value('email'),
      company: value('company'),
      topic: value('topic'),
      message: value('message'),
      locale,
      page: window.location.href,
    }

    if (!endpoint) {
      const topic = t.topics.find(([key]) => key === payload.topic)?.[1] ?? ''
      const body = `${payload.message}\n\n${payload.name}${payload.company ? `, ${payload.company}` : ''}\n${payload.email}`
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`[Autharie] ${topic}`)}&body=${encodeURIComponent(body)}`
      setStatus('mail')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      setStatus(response.ok ? 'sent' : 'failed')
    } catch {
      setStatus('failed')
    }
  }

  if (status === 'sent' || status === 'mail' || status === 'failed') {
    const ok = status !== 'failed'
    return (
      <div role="status" className="rounded-2xl border bg-card p-8 text-center">
        <span
          className={cn(
            'mx-auto flex size-12 items-center justify-center rounded-full',
            ok ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600',
          )}
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {ok ? <path d="M20 6 9 17l-5-5" /> : <path d="M18 6 6 18M6 6l12 12" />}
          </svg>
        </span>
        <h2 className="mt-5 text-xl font-semibold">
          {status === 'sent' ? t.sentTitle : status === 'mail' ? t.mailTitle : t.failTitle}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {status === 'sent' ? t.sentBody : status === 'mail' ? t.mailBody : t.failBody}
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm font-medium text-primary hover:underline"
        >
          {t.again}
        </button>
      </div>
    )
  }

  const error = (field: Field) =>
    errors[field] && (
      <p id={`contact-${field}-error`} className="mt-1.5 text-xs text-red-600">
        {errors[field]}
      </p>
    )
  const aria = (field: Field) => ({
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `contact-${field}-error` : undefined,
  })

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-2xl border bg-card p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium">{t.name}</label>
          <input id="contact-name" name="name" autoComplete="name" className={cn(input, 'mt-1.5')} {...aria('name')} />
          {error('name')}
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-medium">{t.email}</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" className={cn(input, 'mt-1.5')} {...aria('email')} />
          {error('email')}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-company" className="text-sm font-medium">
            {t.company} <span className="font-normal text-muted-foreground">({t.optional})</span>
          </label>
          <input id="contact-company" name="company" autoComplete="organization" className={cn(input, 'mt-1.5')} />
        </div>
        <div>
          <label htmlFor="contact-topic" className="text-sm font-medium">{t.topic}</label>
          <select id="contact-topic" name="topic" defaultValue="access" className={cn(input, 'mt-1.5')}>
            {t.topics.map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="text-sm font-medium">{t.message}</label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          placeholder={t.placeholder}
          className={cn(input, 'mt-1.5 h-auto py-3')}
          {...aria('message')}
        />
        {error('message')}
      </div>

      {/* Off screen, not display:none, so a bot that reads the DOM still finds it. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
          <input type="checkbox" name="consent" className="mt-0.5 size-4 shrink-0 accent-[var(--color-primary)]" {...aria('consent')} />
          <span>{t.consent}</span>
        </label>
        {error('consent')}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60 sm:w-auto"
      >
        {status === 'sending' ? t.sending : t.send}
      </button>
    </form>
  )
}
