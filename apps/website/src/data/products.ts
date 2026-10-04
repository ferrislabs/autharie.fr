import type { Locale } from '../i18n'
import { productsFr } from './products.fr'

export type Tone = 'ok' | 'warn' | 'info' | 'muted'

export interface MockRow {
  label: string
  value: string
  tone?: Tone
}

export interface Product {
  slug: string
  name: string
  tagline: string
  icon: string
  tint: string
  status?: 'new' | 'soon'
  hero: { title: string; accent: string; lead: string }
  mock: { title: string; caption: string; rows: MockRow[] }
  pillars: { icon: string; title: string; description: string }[]
  spotlight: {
    eyebrow: string
    title: string
    description: string
    points: string[]
  }
  grid: { icon: string; title: string; description: string }[]
  underTheHood: { label: string; href: string; description: string }
  related: string[]
}

export const products: Product[] = [
  {
    slug: 'deploy',
    name: 'Deploy',
    tagline: 'A login service of your own, running in minutes',
    icon: 'rocket',
    tint: 'from-violet-200 via-indigo-100 to-white',
    hero: {
      title: 'Get sign in running,',
      accent: 'without building it.',
      lead: 'Pick a name and a size. Autharie brings up the identity service, its database, its certificate and its address. Your applications connect to it the same afternoon.',
    },
    mock: {
      title: 'acme-production',
      caption: 'New instance',
      rows: [
        { label: 'Address', value: 'id.acme.com', tone: 'info' },
        { label: 'Size', value: 'Standard · 10 000 users' },
        { label: 'Database', value: 'Provisioned', tone: 'ok' },
        { label: 'Certificate', value: 'Issued', tone: 'ok' },
        { label: 'Status', value: 'Running', tone: 'ok' },
      ],
    },
    pillars: [
      {
        icon: 'plug',
        title: 'Works with what you already use',
        description:
          'Applications that speak OpenID Connect or OAuth 2 connect without changes. Moving over means changing an address, not rewriting sign in.',
      },
      {
        icon: 'lock',
        title: 'Secure from the first boot',
        description:
          'A certificate is issued for your hostname and renewed before it lapses. Nobody copies a key file around.',
      },
      {
        icon: 'database',
        title: 'Nothing else to set up',
        description:
          'The database comes with the instance, is archived on a schedule and can be restored from the console.',
      },
    ],
    spotlight: {
      eyebrow: 'Sizes',
      title: 'Start small, grow without rebuilding',
      description:
        'Pick a size to try things against, a larger one for real sign in traffic, or a cluster of your own. Moving up a size does not rebuild anything.',
      points: [
        'Try it on a small instance before anybody depends on it',
        'Keep a staging instance next to production to test changes first',
        'Nothing is switched off at the ceiling, the instance slows down first and you are told',
      ],
    },
    grid: [
      { icon: 'terminal', title: 'Console, API or manifest', description: 'Everything the console does goes through the documented API.' },
      { icon: 'globe', title: 'Your own domain', description: 'Serve sign in from id.yourcompany.com.' },
      { icon: 'rotate', title: 'Staging that matches', description: 'A second instance, same size, for testing changes first.' },
      { icon: 'users', title: 'The whole team in the console', description: 'Everyone who looks after it can use the console, each with their own role.' },
      { icon: 'zap', title: 'Fast to start', description: 'From a name to a running instance in a few minutes.' },
      { icon: 'archive', title: 'Take it with you', description: 'Both providers are open source and the database is ordinary Postgres.' },
    ],
    underTheHood: {
      label: 'How instances are declared and reconciled',
      href: '/technology#kubernetes',
      description: 'Each instance is a Kubernetes resource watched by an operator written in Rust.',
    },
    related: ['operate', 'secure', 'regions'],
  },
  {
    slug: 'identity',
    name: 'Identity',
    tagline: 'Know who has access to what, and keep it that way',
    icon: 'users',
    tint: 'from-fuchsia-200 via-violet-100 to-white',
    status: 'soon',
    hero: {
      title: 'Manage your people,',
      accent: 'not a configuration screen.',
      lead: 'Identity gives the person who looks after access a place made for the job. Who is in, which teams they belong to, what they may open, and what changed since last month.',
    },
    mock: {
      title: 'Access overview',
      caption: 'Acme · Production',
      rows: [
        { label: 'Active users', value: '4 812', tone: 'info' },
        { label: 'Waiting for approval', value: '6', tone: 'warn' },
        { label: 'Not signed in for 90 days', value: '38', tone: 'muted' },
        { label: 'Admins', value: '9', tone: 'ok' },
      ],
    },
    pillars: [
      {
        icon: 'users',
        title: 'Users, groups and roles in one place',
        description:
          'Create people, organise them into teams and give each team what it needs. One view, in words your colleagues use.',
      },
      {
        icon: 'check',
        title: 'Joiners, movers, leavers',
        description:
          'Invite someone, change their access when they change role, and remove everything the day they leave.',
      },
      {
        icon: 'scroll',
        title: 'Answers for the auditor',
        description:
          'Who had access to what, who granted it, and when. Exportable, so the answer is a file and not a meeting.',
      },
    ],
    spotlight: {
      eyebrow: 'Governance',
      title: 'Regular reviews, without a spreadsheet',
      description:
        'Ask the owner of each team to confirm who should still be there. Access nobody confirms can be removed, and the decision is recorded.',
      points: [
        'See accounts nobody has used in months',
        'Ask team owners to confirm their members',
        'Keep a record of each decision',
      ],
    },
    grid: [
      { icon: 'users', title: 'Teams that mirror your company', description: 'Groups and nested groups for the way you are organised.' },
      { icon: 'key', title: 'Roles with plain names', description: 'Describe what a role allows in a sentence anyone can read.' },
      { icon: 'clock', title: 'Access that expires', description: 'Grant access for a week and let it end by itself.' },
      { icon: 'lock', title: 'Sign in rules', description: 'Decide who must confirm with a second factor.' },
      { icon: 'scroll', title: 'Activity history', description: 'Every change with its author and date.' },
      { icon: 'network', title: 'Connect your directory', description: 'Bring people in from the tools you already manage them in.' },
    ],
    underTheHood: {
      label: 'What runs the identity service',
      href: '/technology#open-source',
      description: 'Ferriskey and Keycloak, both open source, with Autharie on top.',
    },
    related: ['secure', 'observe', 'deploy'],
  },
  {
    slug: 'operate',
    name: 'Operate',
    tagline: 'Upgrades, backups and restores, handled',
    icon: 'rotate',
    tint: 'from-violet-300 via-fuchsia-100 to-white',
    hero: {
      title: 'The work that starts',
      accent: 'after the first deploy.',
      lead: 'New versions, daily archives, a restore when something goes wrong. Autharie takes care of them on a schedule you set, so nobody on your team has to.',
    },
    mock: {
      title: 'Archives',
      caption: 'acme-production',
      rows: [
        { label: 'Today 02:14', value: '1.8 GB', tone: 'ok' },
        { label: 'Yesterday 02:14', value: '1.8 GB', tone: 'ok' },
        { label: '2 days ago 02:14', value: '1.7 GB', tone: 'ok' },
        { label: 'Next upgrade window', value: 'Sunday 03:00', tone: 'info' },
      ],
    },
    pillars: [
      {
        icon: 'clock',
        title: 'Upgrades in a window you choose',
        description:
          'Say when patches may be applied and which ones can go through on their own. Major versions stay your decision.',
      },
      {
        icon: 'archive',
        title: 'Daily archives, kept for you',
        description:
          'Taken on a schedule, kept for as long as your size includes, listed in the console.',
      },
      {
        icon: 'rotate',
        title: 'Restore into a new instance',
        description:
          'Pick an archive and get an instance built from it. The original keeps serving while you check the copy.',
      },
    ],
    spotlight: {
      eyebrow: 'New versions',
      title: 'Rolled out in waves, never all at once',
      description:
        'A release reaches test instances first, then production. A deployment can be held back and a rollout can be stopped.',
      points: [
        'Hold a version back when you are not ready',
        'Stop a rollout that looks wrong',
        'Choose whether patches apply without asking',
      ],
    },
    grid: [
      { icon: 'clock', title: 'Maintenance windows', description: 'Changes happen when you said they could.' },
      { icon: 'archive', title: 'Archive retention', description: 'Choose how long archives are kept.' },
      { icon: 'rotate', title: 'Safe restores', description: 'Restores never overwrite the running instance.' },
      { icon: 'branch', title: 'Rollout control', description: 'Hold, resume or stop a version.' },
      { icon: 'lock', title: 'Certificates renewed', description: 'Renewed before they expire, without a ticket.' },
      { icon: 'check', title: 'Majors are yours', description: 'We never move you to a new major version unasked.' },
    ],
    underTheHood: {
      label: 'How rollouts and restores are driven',
      href: '/technology#kubernetes',
      description: 'An operator compares what the cluster has against what you asked for, continuously.',
    },
    related: ['deploy', 'observe', 'secure'],
  },
  {
    slug: 'observe',
    name: 'Observe',
    tagline: 'See what your sign in is doing',
    icon: 'activity',
    tint: 'from-emerald-100 via-violet-100 to-white',
    hero: {
      title: 'Know how sign in is going',
      accent: 'before users tell you.',
      lead: 'Logs, usage and activity in the console. No access to the cluster needed, nothing to install.',
    },
    mock: {
      title: 'Last 7 days',
      caption: 'acme-production',
      rows: [
        { label: 'People who signed in', value: '3 204', tone: 'info' },
        { label: 'Successful sign ins', value: '98.7%', tone: 'ok' },
        { label: 'Failed attempts', value: '412', tone: 'warn' },
        { label: 'Instance health', value: 'Healthy', tone: 'ok' },
      ],
    },
    pillars: [
      {
        icon: 'terminal',
        title: 'Live logs in the console',
        description:
          'Follow what the instance is doing as it happens, without a kubeconfig or a terminal.',
      },
      {
        icon: 'users',
        title: 'Usage you can read',
        description:
          'How many people actually signed in this month, so you pick the right size with facts.',
      },
      {
        icon: 'scroll',
        title: 'A history of every action',
        description:
          'Who changed what, and when. Written for the person who has to answer a question months later.',
      },
    ],
    spotlight: {
      eyebrow: 'Capacity',
      title: 'Spot a size that no longer fits',
      description:
        'An instance that is too small gets slower first. You see it in the console well before an outage.',
      points: [
        'Usage against your size, at a glance',
        'Health of each deployment',
        'A clear sign when it is time to move up',
      ],
    },
    grid: [
      { icon: 'activity', title: 'Health at a glance', description: 'One status per deployment.' },
      { icon: 'terminal', title: 'Log search', description: 'Find the request behind a complaint.' },
      { icon: 'users', title: 'Monthly active users', description: 'The number that matters for sizing.' },
      { icon: 'clock', title: 'Recent changes', description: 'What happened and who did it.' },
      { icon: 'scroll', title: 'Audit export', description: 'Hand the history to whoever asks.' },
      { icon: 'zap', title: 'Alerts', description: 'Be told when something needs a person.' },
    ],
    underTheHood: {
      label: 'Where the data comes from',
      href: '/technology#dataplane',
      description: 'The data plane agent reports status back to the control plane.',
    },
    related: ['operate', 'identity', 'secure'],
  },
  {
    slug: 'secure',
    name: 'Secure',
    tagline: 'Keys, access and an audit trail you can hand over',
    icon: 'shield',
    tint: 'from-indigo-200 via-violet-200 to-white',
    hero: {
      title: 'An identity service people',
      accent: 'can ask hard questions about.',
      lead: 'It is the first thing an auditor looks at. Autharie gives clear answers about keys, network access, who can do what and who did what.',
    },
    mock: {
      title: 'Security',
      caption: 'acme-production',
      rows: [
        { label: 'Archive encryption', value: 'Key v3', tone: 'ok' },
        { label: 'Network access', value: '1 range allowed', tone: 'info' },
        { label: 'Invitations pending', value: '2', tone: 'warn' },
        { label: 'Last key rotation', value: '12 days ago', tone: 'muted' },
      ],
    },
    pillars: [
      {
        icon: 'key',
        title: 'Keys that are never stored bare',
        description:
          'Each archive gets its own key, wrapped by a key held in a vault. Rotating adds a version, so old archives still open.',
      },
      {
        icon: 'network',
        title: 'You decide who can reach it',
        description:
          'Allow only your own network ranges. Changes apply without a redeploy, and the console says when access is open.',
      },
      {
        icon: 'users',
        title: 'Roles where they apply',
        description:
          'Give permissions per organisation and per deployment, from read only to full control. Invitations lapse on their own.',
      },
    ],
    spotlight: {
      eyebrow: 'Control',
      title: 'Your data stays inside your perimeter',
      description:
        'Run Autharie on a cluster you own and accounts, sessions and the database never leave your infrastructure. Archives can go to a bucket you own.',
      points: [
        'Keep data on your own cluster when a policy requires it',
        'Archives can go to a bucket you own',
        'Detailed security documentation for your auditors',
      ],
    },
    grid: [
      { icon: 'lock', title: 'TLS everywhere', description: 'Certificates issued and renewed for you.' },
      { icon: 'network', title: 'Allow lists', description: 'Limit who can reach your instance.' },
      { icon: 'key', title: 'Key rotation', description: 'Add a version without losing access to the past.' },
      { icon: 'users', title: 'Scoped roles', description: 'Read only up to full control.' },
      { icon: 'scroll', title: 'Audit log', description: 'Who, what and when, for every action.' },
      { icon: 'shield', title: 'Open source core', description: 'The code behind your sign in can be read.' },
    ],
    underTheHood: {
      label: 'Why Rust and open source matter here',
      href: '/technology#rust',
      description: 'Memory safe code, and providers whose source you can audit.',
    },
    related: ['identity', 'regions', 'observe'],
  },
  {
    slug: 'regions',
    name: 'Regions',
    tagline: 'Keep your users’ data where it has to stay',
    icon: 'globe',
    tint: 'from-sky-200 via-indigo-100 to-white',
    hero: {
      title: 'Our infrastructure,',
      accent: 'or yours.',
      lead: 'Start on Autharie’s clusters, hosted at Scaleway, because it is quicker. Move to a cluster you own when a policy says the database has to stay home. The product is the same on both sides.',
    },
    mock: {
      title: 'Where it runs',
      caption: 'Your organisation',
      rows: [
        { label: 'eu-paris', value: 'Autharie · shared', tone: 'info' },
        { label: 'onprem-lyon', value: 'Yours · reserved', tone: 'ok' },
        { label: 'Instances in eu-paris', value: '2' },
        { label: 'Instances in onprem-lyon', value: '1' },
      ],
    },
    pillars: [
      {
        icon: 'server',
        title: 'Connect a cluster in one step',
        description:
          'Install one package on a cluster you already run. It announces itself and starts accepting work.',
      },
      {
        icon: 'shield',
        title: 'Your users stay with you',
        description:
          'Accounts, sessions and the database live in your cluster. Autharie sends instructions and reads status. It never holds your users.',
      },
      {
        icon: 'globe',
        title: 'Regions you name',
        description:
          'Declare a region, then choose where each instance goes.',
      },
    ],
    spotlight: {
      eyebrow: 'Shared or reserved',
      title: 'A cluster for everyone, or for you alone',
      description:
        'A cluster can take work from anyone on the platform, or be reserved for a single organisation and nothing else.',
      points: [
        'Scale and above run on a cluster of your own',
        'Move between regions as requirements change',
        'Same console, same operations, wherever it runs',
      ],
    },
    grid: [
      { icon: 'server', title: 'Bring your cluster', description: 'Kubernetes or k3s, at OVHcloud, Scaleway, Hetzner, Outscale or on your premises.' },
      { icon: 'globe', title: 'Several regions', description: 'Run close to the people who sign in.' },
      { icon: 'lock', title: 'Data stays home', description: 'The database never leaves your cluster.' },
      { icon: 'network', title: 'Reserved capacity', description: 'Nothing else is scheduled beside you.' },
      { icon: 'archive', title: 'Your own storage', description: 'Archives into a bucket you own.' },
      { icon: 'check', title: 'Same operations', description: 'Upgrades, restores and logs work the same.' },
    ],
    underTheHood: {
      label: 'How the data plane and control plane talk',
      href: '/technology#dataplane',
      description: 'A small agent in your cluster, and resources that describe what should run.',
    },
    related: ['deploy', 'secure', 'operate'],
  },
]

export const localizeProduct = (product: Product, locale: Locale): Product =>
  locale === 'fr' && productsFr[product.slug] ? { ...product, ...productsFr[product.slug] } : product

export const getProducts = (locale: Locale): Product[] => products.map((p) => localizeProduct(p, locale))

export const getProduct = (slug: string, locale: Locale = 'en') => {
  const product = products.find((p) => p.slug === slug)
  return product && localizeProduct(product, locale)
}
