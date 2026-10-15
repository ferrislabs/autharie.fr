# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Decision makers, not developers. They pick a managed solution; they do not install a library.

- Young entrepreneurs launching a project.
- Startups of about three founders, possibly non-technical, building their product and agents quickly with AI.
- Structured small and mid-sized companies that want to speed up, improve their security and bring AI into their teams.
- Teams building their own internal AI platform, who need an identity and policy layer for their users and agents.

Roles reached on those teams: company heads, CTOs, product owners.

## Product Purpose

Autharie lets a company put AI agents to work while keeping control: each agent gets its own identity and only the access its task needs, every action is recorded end to end, and any agent or sub-agent can be stopped by hand or automatically before it causes damage.

Around that, Autharie provides the identity basics a product needs before its first customer (sign in, accounts, roles, security, audit), ready in about two minutes, so the team ships faster and safer.

Success: a visitor requests free access, tries a space on a real project, likes it, and later pays for Premium.

## Positioning

Autharie is the managed experience layer on top of Ferriskey, the open source IAM written in Rust by the same team. It sells a next-generation, agentic AI experience and the trust you need when delegating identity, not an IAM and not identity-provider plumbing (managing a few apps or setting up TOTP is something most companies already handle).

Direct competitor: BetterAuth, a TypeScript library developers install inside their app, with a light agent layer. BetterAuth's path is "install the library"; Autharie's path is "try a free space, like it, pay for premium features". Autharie operates, upgrades and audits the service; the customer writes rules, not infrastructure.

## Operating Context

- Funnel: free space (freemium, no credit card) → Premium.
- Status: private beta. Spaces are opened to a few selected teams at a time; the public console is closed for now (`PUBLIC_PLATFORM_OPEN=false`), so calls to action request access through the contact form.
- Agents authenticate through standards: MCP, OpenID Connect, dynamic client registration (DCR), client ID metadata documents (CIMD), API keys. Identity delegation and reduced scopes apply to agents.
- Rules can be built visually (blocks) or kept as policy as code by a tech team.
- Alerts can be sent to communication channels such as Slack, Discord, email and webhooks.
- Contact: contact@ferrislabs.fr.

## Capabilities and Constraints

Building blocks presented on the site:

- Access policies for agents and users (who, conditions such as identity, network and time, then allowed or forbidden tools; circuit breaker that cuts a runaway agent).
- Identity management for people, agents and apps; sign in with Google and existing identity providers (Ferriskey acts as a broker).
- Account security: event analysis, privilege escalation prevention, permission audits through Seawatch, Ferriskey's audit module.
- Logs, traces and metrics, end to end.
- User governance for multi-level organisations (group, subsidiaries, branches, teams), each level managing only its own users and apps.
- Customisable sign-in pages and emails.
- Alerting to communication channels.

Plans:

- Free: one realm on shared infrastructure in Europe, users up to a quota, limited AI/MCP usage. A free space is a realm, not a dedicated instance, ready in about two minutes.
- Premium (on request during the beta): dedicated instance or the customer's own cluster, several realms, higher quotas, detailed logs and metrics, access audit, usage analytics, extended AI usage. Analytics run on per-customer infrastructure and are not viable on the free tier.

Hosting: our clusters run at Scaleway; customer data planes can run at OVHcloud or Scaleway. French company, hosted in Europe.

Undecided:

- The free-tier user quota number.
- Premium prices (no prices are published).
- Whether Seawatch auditing is part of the free tier or Premium only.
- Agent policies may not be fully shipped yet; visuals showing them are marked "Preview".

## Brand Commitments

- Name: Autharie, built on Ferriskey. The mascot and logo are a pixel-art sea lion (otarie).
- Languages: English and French, with equal content.
- Voice: product and outcomes, plain words, short sentences, confident. Speak to decision makers, not engineers; technical detail belongs on /technology.
- Never: emojis or decorative symbols, AI-sounding filler, the term "vibe coding", hedging or confessions ("not shipped yet"), Keycloak (no longer offered), price figures, founder names or faces as a headline.
- Compliance wording: "compliant", never "certified", and only for frameworks the team has confirmed.
- Made in France, European governance and hosting are real commitments.

## Evidence on Hand

- No customers, logos, testimonials, case studies, benchmarks or usage numbers are publishable today. Do not fabricate any.
- A few selected beta testers exist but cannot be named or quoted publicly yet.
- Ferriskey is open source on GitHub (https://github.com/ferriskey).

## Product Principles

- Control over agents is the headline; identity basics are the reassuring foundation, not the pitch.
- Show the product working (a rule, a decision, the reason, a stop button) rather than describing infrastructure.
- Every claim on the site must be true today or clearly marked as preview.
- Free to start, no credit card: the first step must stay effortless.
- Trust comes from transparency: everything traced, open source engine, European hosting, reversible.

## Accessibility & Inclusion

WCAG 2.2 AA. Keyboard access, visible focus, sufficient contrast, labelled controls, announced form errors, and `prefers-reduced-motion` respected by every animation.
