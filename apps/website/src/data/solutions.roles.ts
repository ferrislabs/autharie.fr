import type { SolutionDef } from './solutions.types'

export const roleSolutions: SolutionDef[] = [
  {
    slug: 'platform-engineers',
    group: 'role',
    icon: 'server',
    products: ['deploy', 'operate', 'regions', 'observe'],
    copy: {
      en: {
        name: 'Platform engineers',
        menu: 'Platform Engineers',
        tagline: 'Identity providers as a managed service, on your cluster or ours, driven by manifests and API.',
        hero: {
          title: 'Offer identity to every team,',
          accent: 'without running it yourself.',
          lead: 'Autharie runs Ferriskey and Keycloak for you, on our clusters or on a Kubernetes cluster you own. You keep control of versions and placement, and your teams get sign in as a service.',
        },
        challenges: [
          {
            title: 'Every team wants its own login',
            description:
              'Requests for new realms, hostnames and databases pile up in your queue, and each one is a small project of its own.',
          },
          {
            title: 'Upgrades are a gamble',
            description:
              'A major version of the identity provider can break sign in for every application at once, so nobody wants to touch it.',
          },
          {
            title: 'Identity data has to stay in your perimeter',
            description:
              'Security asks that user data live on infrastructure you control, but you do not want to staff another on-call rotation.',
          },
        ],
        benefits: [
          {
            icon: 'terminal',
            title: 'Console, API and manifests',
            description:
              'Create and change instances from the console, the API or Kubernetes-style manifests kept in your repository.',
          },
          {
            icon: 'server',
            title: 'Your cluster or ours',
            description:
              'Run on Autharie clusters, or on a cluster you own. In that case the data stays on your side.',
          },
          {
            icon: 'rotate',
            title: 'Upgrades on your terms',
            description:
              'Maintenance windows and controlled rollouts are yours to set. Major versions happen when you decide, with a staging instance next to production to try them first.',
          },
          {
            icon: 'branch',
            title: 'Open source, no lock-in',
            description:
              'Ferriskey and Keycloak are open source and data lives in plain Postgres, so you can always take your identity layer elsewhere.',
          },
        ],
      },
      fr: {
        name: 'Platform engineers',
        menu: 'Platform Engineers',
        tagline: 'Des fournisseurs d’identité managés, sur votre cluster ou le nôtre, pilotés par manifestes et API.',
        hero: {
          title: 'Offrez l’identité à toutes vos équipes,',
          accent: 'sans l’exploiter vous-même.',
          lead: 'Autharie exploite Ferriskey et Keycloak pour vous, sur nos clusters ou sur un cluster Kubernetes qui vous appartient. Vous gardez la main sur les versions et l’emplacement, vos équipes disposent de la connexion en service.',
        },
        challenges: [
          {
            title: 'Chaque équipe veut sa propre connexion',
            description:
              'Les demandes de realms, de noms de domaine et de bases de données s’accumulent dans votre file, et chacune est un petit projet à part entière.',
          },
          {
            title: 'Les mises à jour sont un pari',
            description:
              'Une version majeure du fournisseur d’identité peut casser la connexion de toutes les applications en même temps, alors personne ne veut y toucher.',
          },
          {
            title: 'Les données d’identité doivent rester dans votre périmètre',
            description:
              'La sécurité demande que les données des utilisateurs restent sur une infrastructure que vous maîtrisez, sans pour autant monter une astreinte de plus.',
          },
        ],
        benefits: [
          {
            icon: 'terminal',
            title: 'Console, API et manifestes',
            description:
              'Créez et modifiez vos instances depuis la console, l’API ou des manifestes de type Kubernetes versionnés dans votre dépôt.',
          },
          {
            icon: 'server',
            title: 'Votre cluster ou le nôtre',
            description:
              'Exécutez sur les clusters d’Autharie, ou sur un cluster qui vous appartient. Dans ce cas, les données restent chez vous.',
          },
          {
            icon: 'rotate',
            title: 'Des mises à jour à votre rythme',
            description:
              'Fenêtres de maintenance et déploiements progressifs sont à votre main. Les versions majeures passent quand vous le décidez, avec une instance de préproduction à côté de la production pour les essayer d’abord.',
          },
          {
            icon: 'branch',
            title: 'Open source, sans enfermement',
            description:
              'Ferriskey et Keycloak sont open source et les données vivent dans un Postgres standard : vous pouvez toujours emporter votre couche d’identité ailleurs.',
          },
        ],
      },
    },
  },
  {
    slug: 'developers',
    group: 'role',
    icon: 'terminal',
    products: ['deploy', 'identity', 'operate'],
    copy: {
      en: {
        name: 'Developers',
        menu: 'Developers',
        tagline: 'Sign in that works with the libraries you already use, ready the same day.',
        hero: {
          title: 'Ship your product,',
          accent: 'not another login system.',
          lead: 'Autharie gives you a running identity provider that speaks OIDC and OAuth 2. Point your application at a new address and sign in works.',
        },
        challenges: [
          {
            title: 'Auth keeps eating sprints',
            description:
              'Sessions, tokens, password resets and social sign in take time away from the features your users came for.',
          },
          {
            title: 'Local and production behave differently',
            description:
              'Sign in works on your machine, then breaks in staging because the identity setup was never the same twice.',
          },
          {
            title: 'Nobody owns the identity server',
            description:
              'It runs somewhere, someone set it up once, and now a certificate or a database is about to expire.',
          },
        ],
        benefits: [
          {
            icon: 'plug',
            title: 'Standard protocols',
            description:
              'Any library or framework that speaks OIDC or OAuth 2 connects by changing an address. No proprietary SDK to adopt.',
          },
          {
            icon: 'rocket',
            title: 'Running the same day',
            description:
              'Pick a name and a size, and the instance comes up with its database, certificate and address.',
          },
          {
            icon: 'branch',
            title: 'Staging next to production',
            description:
              'Try a change on a staging instance first, then apply the same configuration to production.',
          },
          {
            icon: 'terminal',
            title: 'Console and API',
            description:
              'Manage instances from the console, or script them through the API and manifests when you prefer code.',
          },
        ],
      },
      fr: {
        name: 'Développeurs',
        menu: 'Développeurs',
        tagline: 'Une connexion compatible avec les bibliothèques que vous utilisez déjà, prête dès le jour même.',
        hero: {
          title: 'Livrez votre produit,',
          accent: 'pas un système de connexion de plus.',
          lead: 'Autharie vous donne un fournisseur d’identité prêt à l’emploi, compatible OIDC et OAuth 2. Pointez votre application vers une nouvelle adresse et la connexion fonctionne.',
        },
        challenges: [
          {
            title: 'L’authentification mange vos sprints',
            description:
              'Sessions, jetons, réinitialisation de mot de passe et connexion sociale prennent du temps sur les fonctionnalités que vos utilisateurs attendent.',
          },
          {
            title: 'Le local et la production se comportent différemment',
            description:
              'La connexion fonctionne sur votre machine, puis casse en préproduction parce que la configuration d’identité n’a jamais été la même deux fois.',
          },
          {
            title: 'Personne ne s’occupe du serveur d’identité',
            description:
              'Il tourne quelque part, quelqu’un l’a installé une fois, et voilà qu’un certificat ou une base de données arrive à expiration.',
          },
        ],
        benefits: [
          {
            icon: 'plug',
            title: 'Des protocoles standard',
            description:
              'Toute bibliothèque ou tout framework compatible OIDC ou OAuth 2 se connecte en changeant une adresse. Aucun SDK propriétaire à adopter.',
          },
          {
            icon: 'rocket',
            title: 'En route le jour même',
            description:
              'Choisissez un nom et une taille : l’instance démarre avec sa base de données, son certificat et son adresse.',
          },
          {
            icon: 'branch',
            title: 'Préproduction à côté de la production',
            description:
              'Essayez un changement sur une instance de préproduction, puis appliquez la même configuration en production.',
          },
          {
            icon: 'terminal',
            title: 'Console et API',
            description:
              'Gérez vos instances depuis la console, ou scriptez-les via l’API et les manifestes si vous préférez le code.',
          },
        ],
      },
    },
  },
  {
    slug: 'security-compliance',
    group: 'role',
    icon: 'shield',
    products: ['secure', 'observe', 'operate', 'regions'],
    copy: {
      en: {
        name: 'Security and compliance',
        menu: 'Security & Compliance',
        tagline: 'Access rules, audit log and key protection you can show to an auditor.',
        hero: {
          title: 'Know who can sign in,',
          accent: 'and be able to show it.',
          lead: 'Autharie puts allow lists, scoped roles and an audit log in front of your identity service. When an auditor asks a question, the answer is in the console.',
        },
        challenges: [
          {
            title: 'Auditors ask who did what, and when',
            description:
              'Answers are scattered across servers and exports, and assembling them takes days before each review.',
          },
          {
            title: 'Too many people can change too much',
            description:
              'Administrative access to the identity service was granted once and never narrowed down.',
          },
          {
            title: 'Secrets and data sit in unknown places',
            description:
              'Nobody can say with confidence where signing keys live, who holds copies, or where the user data is stored.',
          },
        ],
        benefits: [
          {
            icon: 'scroll',
            title: 'Audit log in the console',
            description:
              'Administrative actions are recorded and searchable, next to logs and usage, to help you answer auditors’ questions.',
          },
          {
            icon: 'users',
            title: 'Roles per organisation and deployment',
            description:
              'Give each person access to the organisations and deployments they need, and nothing beyond.',
          },
          {
            icon: 'lock',
            title: 'Allow lists and wrapped keys',
            description:
              'Restrict who can reach an instance with allow lists. Keys are wrapped in a vault, not left in files.',
          },
          {
            icon: 'archive',
            title: 'Daily archives, restore on demand',
            description:
              'Archives are taken every day and can be restored into a new instance, so recovery can be tested without touching production.',
          },
        ],
      },
      fr: {
        name: 'Sécurité et conformité',
        menu: 'Sécurité et conformité',
        tagline: 'Règles d’accès, journal d’audit et protection des clés, présentables à un auditeur.',
        hero: {
          title: 'Sachez qui peut se connecter,',
          accent: 'et soyez en mesure de le montrer.',
          lead: 'Autharie place listes d’autorisation, rôles délimités et journal d’audit devant votre service d’identité. Quand un auditeur pose une question, la réponse se trouve dans la console.',
        },
        challenges: [
          {
            title: 'Les auditeurs demandent qui a fait quoi, et quand',
            description:
              'Les réponses sont dispersées entre serveurs et exports, et les rassembler prend des jours avant chaque revue.',
          },
          {
            title: 'Trop de personnes peuvent trop modifier',
            description:
              'L’accès administrateur au service d’identité a été donné une fois et n’a jamais été restreint.',
          },
          {
            title: 'Secrets et données dans des endroits flous',
            description:
              'Personne ne sait dire avec certitude où se trouvent les clés de signature, qui en détient des copies, ni où sont stockées les données des utilisateurs.',
          },
        ],
        benefits: [
          {
            icon: 'scroll',
            title: 'Journal d’audit dans la console',
            description:
              'Les actions d’administration sont enregistrées et consultables, à côté des journaux et de l’usage, pour vous aider à répondre aux questions des auditeurs.',
          },
          {
            icon: 'users',
            title: 'Des rôles par organisation et par déploiement',
            description:
              'Donnez à chacun l’accès aux organisations et aux déploiements dont il a besoin, et rien de plus.',
          },
          {
            icon: 'lock',
            title: 'Listes d’autorisation et clés protégées',
            description:
              'Limitez qui peut atteindre une instance grâce aux listes d’autorisation. Les clés sont enveloppées dans un coffre, pas laissées dans des fichiers.',
          },
          {
            icon: 'archive',
            title: 'Archives quotidiennes, restauration à la demande',
            description:
              'Les archives sont réalisées chaque jour et se restaurent dans une nouvelle instance : vous pouvez tester une reprise sans toucher à la production.',
          },
        ],
      },
    },
  },
  {
    slug: 'product-teams',
    group: 'role',
    icon: 'users',
    products: ['deploy', 'identity', 'operate'],
    copy: {
      en: {
        name: 'Product teams',
        menu: 'Product Teams',
        tagline: 'Sign in that is ready when the roadmap needs it, and stays out of the way afterwards.',
        hero: {
          title: 'Keep sign in off the roadmap,',
          accent: 'and out of the way.',
          lead: 'Autharie gives your product a managed identity service that engineers connect in an afternoon. Your team keeps its focus on what customers ask for.',
        },
        challenges: [
          {
            title: 'A feature is waiting on login',
            description:
              'A launch depends on accounts, roles or single sign on, and the estimate keeps growing every time someone looks at it.',
          },
          {
            title: 'Identity work competes with the roadmap',
            description:
              'Every hour spent on sessions and password flows is an hour not spent on the product itself.',
          },
          {
            title: 'Enterprise buyers ask about sign in',
            description:
              'Prospects want to know how access is controlled and where their users’ data lives, and you need a clear answer.',
          },
        ],
        benefits: [
          {
            icon: 'zap',
            title: 'Fast to first sign in',
            description:
              'Applications connect by changing an address, so a working login does not need a dedicated project.',
          },
          {
            icon: 'clock',
            title: 'Predictable upgrades',
            description:
              'Maintenance windows are agreed in advance and major versions only happen when you decide, so releases are not disrupted.',
          },
          {
            icon: 'globe',
            title: 'Choose where data lives',
            description:
              'Pick a region, or run on a cluster you own, to answer questions about where user data is stored. Autharie is built in France.',
          },
          {
            icon: 'activity',
            title: 'Usage you can see',
            description:
              'Logs and usage are available in the console, so you can follow sign in activity without asking an engineer.',
          },
        ],
      },
      fr: {
        name: 'Équipes produit',
        menu: 'Équipes produit',
        tagline: 'Une connexion prête quand la feuille de route en a besoin, et discrète ensuite.',
        hero: {
          title: 'Sortez la connexion de la feuille de route,',
          accent: 'et oubliez-la.',
          lead: 'Autharie offre à votre produit un service d’identité managé que vos ingénieurs branchent en une après-midi. Votre équipe reste concentrée sur ce que les clients demandent.',
        },
        challenges: [
          {
            title: 'Une fonctionnalité attend la connexion',
            description:
              'Un lancement dépend des comptes, des rôles ou de la connexion unique, et l’estimation grossit à chaque fois que quelqu’un la regarde.',
          },
          {
            title: 'L’identité entre en concurrence avec la feuille de route',
            description:
              'Chaque heure passée sur les sessions et les parcours de mot de passe est une heure qui n’est pas consacrée au produit.',
          },
          {
            title: 'Les clients grands comptes posent des questions sur la connexion',
            description:
              'Les prospects veulent savoir comment l’accès est contrôlé et où se trouvent les données de leurs utilisateurs, et il vous faut une réponse claire.',
          },
        ],
        benefits: [
          {
            icon: 'zap',
            title: 'Rapide jusqu’à la première connexion',
            description:
              'Les applications se connectent en changeant une adresse : une connexion qui fonctionne ne demande pas un projet dédié.',
          },
          {
            icon: 'clock',
            title: 'Des mises à jour prévisibles',
            description:
              'Les fenêtres de maintenance sont convenues à l’avance et les versions majeures n’arrivent que lorsque vous le décidez, sans perturber vos livraisons.',
          },
          {
            icon: 'globe',
            title: 'Choisissez où vivent les données',
            description:
              'Choisissez une région, ou exécutez sur un cluster qui vous appartient, pour répondre aux questions sur le lieu de stockage des données. Autharie est conçu en France.',
          },
          {
            icon: 'activity',
            title: 'Un usage visible',
            description:
              'Journaux et usage sont disponibles dans la console : vous suivez l’activité de connexion sans solliciter un ingénieur.',
          },
        ],
      },
    },
  },
]
