import type { SolutionDef } from './solutions.types'

export const stageSolutions: SolutionDef[] = [
  {
    slug: 'startups',
    group: 'stage',
    icon: 'rocket',
    products: ['deploy', 'operate', 'identity'],
    copy: {
      en: {
        name: 'Startups',
        menu: 'Startups',
        tagline: 'Sign in running the same day, with no identity team, and room to grow later.',
        hero: {
          title: 'Get to first sign in fast,',
          accent: 'with no identity team.',
          lead: 'Autharie runs your identity provider so your first users can sign in this week. When you grow, the same setup grows with you.',
        },
        challenges: [
          {
            title: 'You need accounts before you need anything else',
            description:
              'Your product cannot launch without sign in, and nobody on the team wants to spend weeks on it.',
          },
          {
            title: 'No one is available to run it',
            description:
              'There is no platform engineer to patch, back up and renew certificates on an identity server.',
          },
          {
            title: 'You will need more than a login box soon',
            description:
              'Customers will ask for single sign on, roles and audit trails, and you do not want to rebuild when they do.',
          },
        ],
        benefits: [
          {
            icon: 'zap',
            title: 'First sign in the same day',
            description:
              'Pick a name and a size, then point your app at the new address. OIDC and OAuth 2 libraries work as they are.',
          },
          {
            icon: 'database',
            title: 'Everything included',
            description:
              'Postgres, TLS and daily archives come with each instance, so there is nothing to set up or remember.',
          },
          {
            icon: 'arrow',
            title: 'Grow without rebuilding',
            description:
              'Move to a larger size, add a staging instance or later run on your own cluster, without changing how your apps sign in.',
          },
          {
            icon: 'branch',
            title: 'Open source underneath',
            description:
              'Ferriskey and Keycloak are open source and your data sits in plain Postgres, so you are never locked in.',
          },
        ],
      },
      fr: {
        name: 'Startups',
        menu: 'Startups',
        tagline: 'La connexion en route le jour même, sans équipe identité, avec de la marge pour grandir.',
        hero: {
          title: 'Arrivez vite à la première connexion,',
          accent: 'sans équipe identité.',
          lead: 'Autharie exploite votre fournisseur d’identité pour que vos premiers utilisateurs puissent se connecter cette semaine. Quand vous grandissez, la même configuration suit.',
        },
        challenges: [
          {
            title: 'Il vous faut des comptes avant tout le reste',
            description:
              'Votre produit ne peut pas sortir sans connexion, et personne dans l’équipe ne veut y passer des semaines.',
          },
          {
            title: 'Personne n’est disponible pour l’exploiter',
            description:
              'Vous n’avez pas de platform engineer pour mettre à jour, sauvegarder et renouveler les certificats d’un serveur d’identité.',
          },
          {
            title: 'Il vous faudra bientôt plus qu’un formulaire de connexion',
            description:
              'Vos clients demanderont de la connexion unique, des rôles et des traces d’audit, et vous ne voulez pas tout reconstruire à ce moment-là.',
          },
        ],
        benefits: [
          {
            icon: 'zap',
            title: 'Première connexion le jour même',
            description:
              'Choisissez un nom et une taille, puis pointez votre application vers la nouvelle adresse. Les bibliothèques OIDC et OAuth 2 fonctionnent telles quelles.',
          },
          {
            icon: 'database',
            title: 'Tout est inclus',
            description:
              'Postgres, TLS et archives quotidiennes sont fournis avec chaque instance : rien à installer ni à surveiller.',
          },
          {
            icon: 'arrow',
            title: 'Grandissez sans reconstruire',
            description:
              'Passez à une taille supérieure, ajoutez une instance de préproduction ou exécutez plus tard sur votre propre cluster, sans changer la façon dont vos applications se connectent.',
          },
          {
            icon: 'branch',
            title: 'De l’open source en dessous',
            description:
              'Ferriskey et Keycloak sont open source et vos données sont dans un Postgres standard : vous n’êtes jamais enfermé.',
          },
        ],
      },
    },
  },
  {
    slug: 'associations',
    group: 'stage',
    icon: 'users',
    products: ['deploy', 'operate', 'secure'],
    copy: {
      en: {
        name: 'Associations and non-profits',
        menu: 'Associations and non-profits',
        tagline: 'Reliable sign in for members, volunteers and staff, without a dedicated IT team.',
        hero: {
          title: 'Look after your members’ accounts,',
          accent: 'without an IT team.',
          lead: 'Autharie runs the sign in service for your members, volunteers and staff. Backups, certificates and updates are handled for you.',
        },
        challenges: [
          {
            title: 'Accounts spread across many tools',
            description:
              'Members, volunteers and staff each have different logins for different services, and access is hard to keep tidy.',
          },
          {
            title: 'Volunteers come and go',
            description:
              'People join for a project and leave after a season, and their access has to be removed without anyone forgetting.',
          },
          {
            title: 'You hold personal data and little IT time',
            description:
              'Member information deserves care, but the person who set things up has moved on and nobody checks the server.',
          },
        ],
        benefits: [
          {
            icon: 'key',
            title: 'One sign in for your tools',
            description:
              'Applications that support OIDC or OAuth 2 can share the same accounts, so people sign in once with one identity.',
          },
          {
            icon: 'users',
            title: 'Roles that match your organisation',
            description:
              'Give staff, volunteers and members the access they need, and change it from the console when roles change.',
          },
          {
            icon: 'archive',
            title: 'Backups handled for you',
            description:
              'Archives are taken daily and can be restored into a new instance, so a mistake does not mean losing accounts.',
          },
          {
            icon: 'globe',
            title: 'Built in France',
            description:
              'Autharie is built in France, and you can choose a region for where your members’ data is stored.',
          },
        ],
      },
      fr: {
        name: 'Associations et organisations à but non lucratif',
        menu: 'Associations et organisations à but non lucratif',
        tagline: 'Une connexion fiable pour vos adhérents, bénévoles et salariés, sans équipe informatique dédiée.',
        hero: {
          title: 'Prenez soin des comptes de vos adhérents,',
          accent: 'sans équipe informatique.',
          lead: 'Autharie exploite le service de connexion de vos adhérents, bénévoles et salariés. Sauvegardes, certificats et mises à jour sont pris en charge pour vous.',
        },
        challenges: [
          {
            title: 'Des comptes dispersés dans de nombreux outils',
            description:
              'Adhérents, bénévoles et salariés ont chacun des identifiants différents selon les services, et les accès sont difficiles à tenir en ordre.',
          },
          {
            title: 'Les bénévoles vont et viennent',
            description:
              'Des personnes rejoignent un projet et partent au bout d’une saison, et leurs accès doivent être retirés sans que personne n’oublie.',
          },
          {
            title: 'Vous détenez des données personnelles avec peu de temps informatique',
            description:
              'Les informations des adhérents méritent des soins, mais la personne qui avait tout installé est partie et personne ne surveille le serveur.',
          },
        ],
        benefits: [
          {
            icon: 'key',
            title: 'Une seule connexion pour vos outils',
            description:
              'Les applications compatibles OIDC ou OAuth 2 peuvent partager les mêmes comptes : chacun se connecte une fois avec une seule identité.',
          },
          {
            icon: 'users',
            title: 'Des rôles à l’image de votre organisation',
            description:
              'Donnez aux salariés, bénévoles et adhérents l’accès dont ils ont besoin, et modifiez-le depuis la console quand les rôles changent.',
          },
          {
            icon: 'archive',
            title: 'Des sauvegardes prises en charge',
            description:
              'Les archives sont réalisées chaque jour et se restaurent dans une nouvelle instance : une erreur ne veut pas dire perdre les comptes.',
          },
          {
            icon: 'globe',
            title: 'Conçu en France',
            description:
              'Autharie est conçu en France, et vous pouvez choisir une région pour le stockage des données de vos adhérents.',
          },
        ],
      },
    },
  },
  {
    slug: 'enterprise',
    group: 'stage',
    icon: 'network',
    products: ['regions', 'secure', 'observe', 'operate'],
    copy: {
      en: {
        name: 'Enterprise',
        menu: 'Enterprise',
        tagline: 'Managed identity on your own cluster, with access control, audit and change control built in.',
        hero: {
          title: 'Identity at scale,',
          accent: 'on infrastructure you control.',
          lead: 'Autharie operates Ferriskey and Keycloak on a Kubernetes cluster you own, so user data stays with you. Roles, audit log and controlled rollouts fit the way your organisation works.',
        },
        challenges: [
          {
            title: 'Many teams, many identity setups',
            description:
              'Each business unit runs its own provider with its own version and its own habits, and nobody has the full picture.',
          },
          {
            title: 'Change needs approval and a window',
            description:
              'An unplanned upgrade to a sign in service is not acceptable, and major versions need to be scheduled and tested.',
          },
          {
            title: 'Data location and access are reviewed',
            description:
              'Security and legal teams want to know where identity data lives, who administers it and what has been changed.',
          },
        ],
        benefits: [
          {
            icon: 'server',
            title: 'Run on your own cluster',
            description:
              'Deploy on a Kubernetes cluster you own, and the data stays there. Or use Autharie clusters in the region you choose.',
          },
          {
            icon: 'users',
            title: 'Roles per organisation and deployment',
            description:
              'Separate business units and environments, and give each administrator access to exactly their scope.',
          },
          {
            icon: 'scroll',
            title: 'Audit log and allow lists',
            description:
              'Review administrative activity in the console, and limit who can reach each instance. It helps you answer auditors’ questions.',
          },
          {
            icon: 'terminal',
            title: 'API and manifests for your pipeline',
            description:
              'Drive instances through the API or Kubernetes-style manifests, with staging next to production and major versions only when you approve them.',
          },
        ],
      },
      fr: {
        name: 'Grandes entreprises',
        menu: 'Entreprise',
        tagline: 'Une identité managée sur votre propre cluster, avec contrôle d’accès, audit et maîtrise du changement.',
        hero: {
          title: 'L’identité à grande échelle,',
          accent: 'sur une infrastructure que vous maîtrisez.',
          lead: 'Autharie exploite Ferriskey et Keycloak sur un cluster Kubernetes qui vous appartient : les données des utilisateurs restent chez vous. Rôles, journal d’audit et déploiements contrôlés s’adaptent à votre organisation.',
        },
        challenges: [
          {
            title: 'Beaucoup d’équipes, beaucoup de configurations d’identité',
            description:
              'Chaque direction exploite son propre fournisseur, avec sa version et ses habitudes, et personne n’a la vue d’ensemble.',
          },
          {
            title: 'Le changement demande validation et créneau',
            description:
              'Une mise à jour imprévue d’un service de connexion est inacceptable, et les versions majeures doivent être planifiées et testées.',
          },
          {
            title: 'L’emplacement des données et les accès sont passés en revue',
            description:
              'Les équipes sécurité et juridique veulent savoir où vivent les données d’identité, qui les administre et ce qui a été modifié.',
          },
        ],
        benefits: [
          {
            icon: 'server',
            title: 'Sur votre propre cluster',
            description:
              'Déployez sur un cluster Kubernetes qui vous appartient : les données y restent. Ou utilisez les clusters d’Autharie dans la région de votre choix.',
          },
          {
            icon: 'users',
            title: 'Des rôles par organisation et par déploiement',
            description:
              'Séparez les directions et les environnements, et donnez à chaque administrateur l’accès à son périmètre, rien de plus.',
          },
          {
            icon: 'scroll',
            title: 'Journal d’audit et listes d’autorisation',
            description:
              'Consultez l’activité d’administration dans la console et limitez qui peut atteindre chaque instance. Cela vous aide à répondre aux questions des auditeurs.',
          },
          {
            icon: 'terminal',
            title: 'API et manifestes pour vos pipelines',
            description:
              'Pilotez les instances par l’API ou des manifestes de type Kubernetes, avec une préproduction à côté de la production et des versions majeures seulement quand vous les validez.',
          },
        ],
      },
    },
  },
]
