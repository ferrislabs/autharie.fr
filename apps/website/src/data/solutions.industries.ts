import type { SolutionDef } from './solutions.types'

export const industrySolutions: SolutionDef[] = [
  {
    slug: 'financial-services',
    group: 'industry',
    icon: 'lock',
    products: ['secure', 'observe', 'regions', 'operate'],
    copy: {
      en: {
        name: 'Financial services',
        menu: 'Financial Services',
        tagline: 'Sign in you can explain to an auditor, with data kept where policy requires',
        hero: {
          title: 'Sign in for finance teams,',
          accent: 'with a record of every decision.',
          lead: 'Autharie runs a managed Ferriskey or Keycloak instance for you, with an audit log, allow lists and a choice of where your data lives. It helps you answer auditors with facts from the console.',
        },
        challenges: [
          {
            title: 'Auditors ask who changed what, and when',
            description:
              'Answers are scattered across servers and chat threads. You need one place that shows administrative changes and sign in activity.',
          },
          {
            title: 'Policy says where identity data may live',
            description:
              'Customer and employee identities cannot sit just anywhere. The location of the database and the cluster has to be a decision you make.',
          },
          {
            title: 'Upgrades and restores cannot be improvised',
            description:
              'A change to the login service touches every application. Maintenance needs a window, a rollout plan and a way back.',
          },
        ],
        benefits: [
          {
            icon: 'scroll',
            title: 'Audit log in the console',
            description:
              'Administrative actions and sign in activity are recorded and readable, next to logs and usage. Evidence is a search away.',
          },
          {
            icon: 'globe',
            title: 'Data stays where policy requires',
            description:
              'Run on Autharie clusters or on a cluster you own. When you own it, the data stays there.',
          },
          {
            icon: 'shield',
            title: 'Controlled access',
            description:
              'Allow lists restrict who can reach the console and the admin endpoints. Roles are set per organisation and per deployment.',
          },
          {
            icon: 'key',
            title: 'Keys wrapped in a vault',
            description:
              'Signing and encryption keys are wrapped in a vault instead of living in configuration files.',
          },
        ],
      },
      fr: {
        name: 'Services financiers',
        menu: 'Services financiers',
        tagline: 'Une connexion que vous pouvez expliquer à un auditeur, avec des données hébergées là où votre politique l’exige',
        hero: {
          title: 'La connexion pour les équipes financières,',
          accent: 'avec une trace de chaque décision.',
          lead: 'Autharie exploite pour vous une instance Ferriskey ou Keycloak, avec journal d’audit, listes d’autorisation et choix du lieu d’hébergement de vos données. Vous répondez aux auditeurs avec des faits issus de la console.',
        },
        challenges: [
          {
            title: 'Les auditeurs demandent qui a changé quoi, et quand',
            description:
              'Les réponses sont dispersées entre des serveurs et des fils de discussion. Il vous faut un endroit unique qui montre les changements d’administration et l’activité de connexion.',
          },
          {
            title: 'Votre politique fixe où les données d’identité peuvent se trouver',
            description:
              'Les identités de vos clients et de vos équipes ne peuvent pas être hébergées n’importe où. L’emplacement de la base et du cluster doit rester votre décision.',
          },
          {
            title: 'Mises à jour et restaurations ne s’improvisent pas',
            description:
              'Une modification du service de connexion touche toutes vos applications. La maintenance demande une fenêtre, un plan de déploiement et un retour arrière.',
          },
        ],
        benefits: [
          {
            icon: 'scroll',
            title: 'Journal d’audit dans la console',
            description:
              'Les actions d’administration et l’activité de connexion sont enregistrées et consultables, à côté des journaux et de l’usage. Une preuve se retrouve en une recherche.',
          },
          {
            icon: 'globe',
            title: 'Les données restent où votre politique l’exige',
            description:
              'Exécutez sur les clusters d’Autharie ou sur un cluster qui vous appartient. Dans ce second cas, les données y restent.',
          },
          {
            icon: 'shield',
            title: 'Accès maîtrisé',
            description:
              'Les listes d’autorisation limitent l’accès à la console et aux points d’administration. Les rôles se définissent par organisation et par déploiement.',
          },
          {
            icon: 'key',
            title: 'Clés protégées dans un coffre',
            description:
              'Les clés de signature et de chiffrement sont enveloppées dans un coffre, et non laissées dans des fichiers de configuration.',
          },
        ],
      },
    },
  },
  {
    slug: 'healthcare',
    group: 'industry',
    icon: 'activity',
    products: ['secure', 'regions', 'observe'],
    copy: {
      en: {
        name: 'Healthcare',
        menu: 'Healthcare',
        tagline: 'Sign in for care teams and patients, with identity data kept where you decide',
        hero: {
          title: 'Sign in for care teams and patients,',
          accent: 'on infrastructure you choose.',
          lead: 'Autharie runs a managed Ferriskey or Keycloak instance and lets you decide where its data lives, on our clusters or on yours. Access is restricted, activity is logged, and upgrades happen when you say.',
        },
        challenges: [
          {
            title: 'Many people, many roles, one login',
            description:
              'Clinicians, administrative staff, partners and patients all sign in to different applications. Each needs access to its own scope and nothing more.',
          },
          {
            title: 'Identity data needs a defined home',
            description:
              'Where the database runs is a question your policy answers, not your hosting provider. It has to stay true over time.',
          },
          {
            title: 'The login service cannot go down for an upgrade',
            description:
              'Sign in sits in front of daily work. Maintenance has to be scheduled and rolled out with care, never applied by surprise.',
          },
        ],
        benefits: [
          {
            icon: 'server',
            title: 'Your cluster, if you want it',
            description:
              'Run the instance on a cluster you own and the data stays there. Or use Autharie clusters and pick the region.',
          },
          {
            icon: 'users',
            title: 'Roles per organisation',
            description:
              'Separate hospitals, departments or partners into their own organisations, each with its own roles and its own deployments.',
          },
          {
            icon: 'clock',
            title: 'Maintenance on your schedule',
            description:
              'Maintenance windows and controlled rollouts mean upgrades land when your teams expect them. Major versions are your decision.',
          },
          {
            icon: 'activity',
            title: 'Activity you can read',
            description:
              'Logs, usage and the audit log sit in the console, so a question about a sign in gets an answer.',
          },
        ],
      },
      fr: {
        name: 'Santé',
        menu: 'Santé',
        tagline: 'La connexion des équipes de soin et des patients, avec des données d’identité hébergées là où vous décidez',
        hero: {
          title: 'La connexion des équipes de soin et des patients,',
          accent: 'sur l’infrastructure de votre choix.',
          lead: 'Autharie exploite une instance Ferriskey ou Keycloak et vous laisse décider où se trouvent ses données, sur nos clusters ou sur les vôtres. L’accès est restreint, l’activité est journalisée et les mises à jour se font quand vous le décidez.',
        },
        challenges: [
          {
            title: 'Beaucoup de monde, beaucoup de rôles, une seule connexion',
            description:
              'Soignants, personnel administratif, partenaires et patients se connectent à des applications différentes. Chacun doit accéder à son périmètre, et à rien de plus.',
          },
          {
            title: 'Les données d’identité ont besoin d’un lieu défini',
            description:
              'L’endroit où tourne la base est une question à laquelle répond votre politique, pas votre hébergeur. Cela doit rester vrai dans le temps.',
          },
          {
            title: 'Le service de connexion ne peut pas s’arrêter pour une mise à jour',
            description:
              'La connexion se trouve devant le travail de chaque jour. La maintenance doit être planifiée et déployée avec soin, jamais appliquée par surprise.',
          },
        ],
        benefits: [
          {
            icon: 'server',
            title: 'Votre cluster, si vous le souhaitez',
            description:
              'Exécutez l’instance sur un cluster qui vous appartient et les données y restent. Ou utilisez les clusters d’Autharie et choisissez la région.',
          },
          {
            icon: 'users',
            title: 'Des rôles par organisation',
            description:
              'Séparez établissements, services ou partenaires en organisations distinctes, chacune avec ses rôles et ses déploiements.',
          },
          {
            icon: 'clock',
            title: 'Une maintenance à votre rythme',
            description:
              'Fenêtres de maintenance et déploiements contrôlés : les mises à jour arrivent quand vos équipes les attendent. Les versions majeures restent votre décision.',
          },
          {
            icon: 'activity',
            title: 'Une activité lisible',
            description:
              'Journaux, usage et journal d’audit se trouvent dans la console. Une question sur une connexion trouve sa réponse.',
          },
        ],
      },
    },
  },
  {
    slug: 'public-sector',
    group: 'industry',
    icon: 'globe',
    products: ['regions', 'secure', 'deploy', 'observe'],
    copy: {
      en: {
        name: 'Public sector',
        menu: 'Public Sector',
        tagline: 'Open source identity, built in France, running where your policy says it should',
        hero: {
          title: 'Identity for public services,',
          accent: 'open source and under your control.',
          lead: 'Autharie runs Ferriskey and Keycloak for you, on our clusters or on yours. Standard protocols, plain Postgres and no lock-in keep the choice of provider in your hands.',
        },
        challenges: [
          {
            title: 'Services multiply, and each has its own login',
            description:
              'Agencies and departments run applications bought and built at different times. Residents and staff end up with one account per service.',
          },
          {
            title: 'Procurement asks about exit and control',
            description:
              'A login service becomes critical quickly. You need to know that you can read it, move it and take your data with you.',
          },
          {
            title: 'Data location is a requirement, not a preference',
            description:
              'Where identity data is stored has to follow policy and has to stay there.',
          },
        ],
        benefits: [
          {
            icon: 'globe',
            title: 'On our clusters or on yours',
            description:
              'Choose a region on Autharie clusters, or run on a cluster you own. In that case your data stays on it.',
          },
          {
            icon: 'plug',
            title: 'Standard protocols',
            description:
              'OIDC and OAuth 2 mean applications connect by changing an address, whoever built them and whenever.',
          },
          {
            icon: 'database',
            title: 'Plain Postgres, no lock-in',
            description:
              'The providers are open source and the data sits in plain Postgres. Moving away is a plan you can write down.',
          },
          {
            icon: 'scroll',
            title: 'Audit log and allow lists',
            description:
              'Administrative actions are recorded in the console, and allow lists restrict who can reach it. It helps you answer auditors.',
          },
        ],
      },
      fr: {
        name: 'Secteur public',
        menu: 'Secteur public',
        tagline: 'Une identité open source, conçue en France, qui tourne là où votre politique l’indique',
        hero: {
          title: 'L’identité des services publics,',
          accent: 'open source et sous votre contrôle.',
          lead: 'Autharie exploite Ferriskey et Keycloak pour vous, sur nos clusters ou sur les vôtres. Protocoles standards, Postgres classique et absence de dépendance vous laissent le choix du fournisseur.',
        },
        challenges: [
          {
            title: 'Les services se multiplient, chacun avec sa connexion',
            description:
              'Administrations et directions exploitent des applications achetées et développées à des moments différents. Usagers et agents se retrouvent avec un compte par service.',
          },
          {
            title: 'Les achats demandent comment sortir et comment garder la main',
            description:
              'Un service de connexion devient vite critique. Vous devez savoir que vous pouvez le lire, le déplacer et repartir avec vos données.',
          },
          {
            title: 'Le lieu des données est une exigence, pas une préférence',
            description:
              'L’endroit où sont stockées les données d’identité doit suivre votre politique, et y rester.',
          },
        ],
        benefits: [
          {
            icon: 'globe',
            title: 'Sur nos clusters ou sur les vôtres',
            description:
              'Choisissez une région sur les clusters d’Autharie, ou exécutez sur un cluster qui vous appartient. Dans ce cas, vos données y restent.',
          },
          {
            icon: 'plug',
            title: 'Des protocoles standards',
            description:
              'Avec OIDC et OAuth 2, les applications se connectent en changeant une adresse, quel que soit leur auteur et leur âge.',
          },
          {
            icon: 'database',
            title: 'Postgres classique, sans dépendance',
            description:
              'Les fournisseurs sont open source et les données se trouvent dans un Postgres classique. Partir devient un plan que l’on peut écrire.',
          },
          {
            icon: 'scroll',
            title: 'Journal d’audit et listes d’autorisation',
            description:
              'Les actions d’administration sont enregistrées dans la console et les listes d’autorisation limitent qui peut y accéder. Cela vous aide à répondre aux auditeurs.',
          },
        ],
      },
    },
  },
  {
    slug: 'b2b-saas',
    group: 'industry',
    icon: 'network',
    products: ['deploy', 'operate', 'identity', 'regions'],
    copy: {
      en: {
        name: 'B2B SaaS',
        menu: 'B2B SaaS',
        tagline: 'Sign in for your product and your customers, without building an identity team',
        hero: {
          title: 'Ship your product,',
          accent: 'not another login service.',
          lead: 'Autharie runs a managed Ferriskey or Keycloak instance for your product, with staging next to production. Your application connects over OIDC and OAuth 2, and your team stops operating the identity layer.',
        },
        challenges: [
          {
            title: 'Every customer asks for something different',
            description:
              'Separate organisations, their own roles, a data location, an access review. Each request lands on a login service that was never the product.',
          },
          {
            title: 'Identity work competes with the roadmap',
            description:
              'Upgrades, archives, restores and certificates take engineering time that customers never see.',
          },
          {
            title: 'Staging rarely looks like production',
            description:
              'Login changes are tested late, on a setup that differs from the real one, and surprises arrive after release.',
          },
        ],
        benefits: [
          {
            icon: 'rocket',
            title: 'Running in minutes',
            description:
              'Pick a name and a size. The instance, its Postgres, its certificate and its address come up together.',
          },
          {
            icon: 'branch',
            title: 'Staging next to production',
            description:
              'Run a staging instance beside production and try a change on it first. Restore an archive into a new instance to rehearse an upgrade.',
          },
          {
            icon: 'terminal',
            title: 'Console, API and manifests',
            description:
              'Operate from the console, script it through the API, or describe it in Kubernetes-style manifests next to your code.',
          },
          {
            icon: 'globe',
            title: 'Where your customers need it',
            description:
              'Pick a region, or run on a cluster you own when a customer requires their identity data to stay in a given place.',
          },
        ],
      },
      fr: {
        name: 'SaaS B2B',
        menu: 'SaaS B2B',
        tagline: 'La connexion de votre produit et de vos clients, sans monter une équipe identité',
        hero: {
          title: 'Livrez votre produit,',
          accent: 'pas un service de connexion de plus.',
          lead: 'Autharie exploite pour votre produit une instance Ferriskey ou Keycloak, avec un environnement de préproduction à côté de la production. Votre application se connecte en OIDC et OAuth 2, et votre équipe n’a plus à exploiter la couche d’identité.',
        },
        challenges: [
          {
            title: 'Chaque client demande quelque chose de différent',
            description:
              'Organisations séparées, rôles propres, lieu des données, revue des accès. Chaque demande retombe sur un service de connexion qui n’a jamais été votre produit.',
          },
          {
            title: 'Le travail sur l’identité prend la place de la feuille de route',
            description:
              'Mises à jour, archives, restaurations et certificats mobilisent un temps d’ingénierie que vos clients ne voient jamais.',
          },
          {
            title: 'La préproduction ressemble rarement à la production',
            description:
              'Les changements de connexion sont testés tard, sur une configuration différente de la réelle, et les surprises arrivent après la mise en ligne.',
          },
        ],
        benefits: [
          {
            icon: 'rocket',
            title: 'En route en quelques minutes',
            description:
              'Choisissez un nom et une taille. L’instance, son Postgres, son certificat et son adresse démarrent ensemble.',
          },
          {
            icon: 'branch',
            title: 'Préproduction à côté de la production',
            description:
              'Faites tourner une instance de préproduction près de la production et essayez-y d’abord un changement. Restaurez une archive dans une nouvelle instance pour répéter une mise à jour.',
          },
          {
            icon: 'terminal',
            title: 'Console, API et manifestes',
            description:
              'Pilotez depuis la console, automatisez par l’API, ou décrivez l’ensemble dans des manifestes de type Kubernetes à côté de votre code.',
          },
          {
            icon: 'globe',
            title: 'Là où vos clients en ont besoin',
            description:
              'Choisissez une région, ou exécutez sur un cluster qui vous appartient lorsqu’un client exige que ses données d’identité restent à un endroit précis.',
          },
        ],
      },
    },
  },
]
