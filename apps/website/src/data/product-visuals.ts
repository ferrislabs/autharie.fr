import type { Locale } from '../i18n'

export type VisualId =
  | 'identity'
  | 'identity-rightsizing'
  | 'identity-growth'
  | 'secure'
  | 'secure-governance'
  | 'auth-flow'
  | 'observe-alerts'
  | 'observe-logs'
  | 'observe-load'
  | 'regions'
  | 'operate'
  | 'operate-promote'
  | 'manifest-apply'
  | 'dev-quickstart'
  | 'audit-trail'
  | 'login-branding'
  | 'growth-path'
  | 'member-sso'
  | 'four-eyes'
  | 'data-residency'
  | 'tenant-sso'
  | 'migration-plan'

export interface ProductVisual {
  id: VisualId
  eyebrow: string
  title: string
  description: string
  points: string[]
  /** Full width, the text above the visual. */
  wide?: boolean
}

/** Illustrated sections of the product pages: one or two per product, in both languages. */
export const productVisuals: Record<string, Record<Locale, ProductVisual[]>> = {
  identity: {
    en: [
      {
        id: 'identity',
        eyebrow: 'Federation',
        title: 'One realm, every organisation in its own lane',
        description:
          'A group with several brands, regions and sites keeps one realm. Each organisation manages its own people, applications and settings, and nothing outside it.',
        points: [
          'Organisations and nested groups that mirror the company',
          'A site manager never sees another site’s users, applications or configuration',
          'Delegate administration without handing over the realm',
        ],
      },
      {
        id: 'identity-rightsizing',
        eyebrow: 'Least privilege',
        title: 'Reduce permissions nobody uses',
        description:
          'See which roles have not been used in months and remove them in one step. Nothing changes until you approve it, and each change can be reverted.',
        points: ['Permissions unused for 90 days, listed by person', 'One approval to reduce access', 'Every change recorded and reversible'],
      },
      {
        id: 'identity-growth',
        eyebrow: 'Growth',
        title: 'Watch your user base evolve',
        description:
          'Total accounts, active people and new arrivals over the year, so a jump or a drop does not go unnoticed.',
        points: ['Total and active users over time', 'New accounts per month', 'Compare instances side by side'],
      },
    ],
    fr: [
      {
        id: 'identity',
        eyebrow: 'Fédération',
        title: 'Un realm, chaque organisation dans son périmètre',
        description:
          'Un groupe avec plusieurs enseignes, régions et sites garde un seul realm. Chaque organisation gère ses utilisateurs, ses applications et ses réglages, et rien en dehors.',
        points: [
          'Organisations et groupes imbriqués, à l’image de l’entreprise',
          'Un directeur de site ne voit ni les utilisateurs, ni les applications, ni la configuration des autres sites',
          'Déléguez l’administration sans céder le realm',
        ],
      },
      {
        id: 'identity-rightsizing',
        eyebrow: 'Moindre privilège',
        title: 'Réduisez les permissions que personne n’utilise',
        description:
          'Repérez les rôles inutilisés depuis des mois et retirez-les en une étape. Rien ne change sans votre validation, et chaque changement peut être annulé.',
        points: ['Permissions inutilisées depuis 90 jours, par personne', 'Une validation pour réduire les accès', 'Chaque changement consigné et réversible'],
      },
      {
        id: 'identity-growth',
        eyebrow: 'Croissance',
        title: 'Suivez l’évolution de vos utilisateurs',
        description:
          'Comptes au total, personnes actives et nouveaux arrivants sur l’année, pour qu’une hausse ou une chute ne passe pas inaperçue.',
        points: ['Utilisateurs totaux et actifs dans le temps', 'Nouveaux comptes par mois', 'Comparez les instances côte à côte'],
      },
    ],
  },
  secure: {
    en: [
      {
        id: 'secure',
        eyebrow: 'Policies',
        title: 'Rules decide, and every decision is explained',
        description:
          'Write the rules once: who may sign in, from where, with which proof. Each attempt is evaluated against them, and you can read afterwards which rule applied.',
        points: [
          'Conditions on role, country, device and application',
          'Step-up authentication only when the context calls for it',
          'The matching rule is kept with every decision',
        ],
      },
      {
        id: 'secure-governance',
        eyebrow: 'Governance analysis',
        title: 'Catch a stolen account or a privilege escalation early',
        description:
          'Autharie reviews sensitive accounts and permission changes continuously. A role granted outside a change window, or an admin who appears in two countries at once, becomes a finding you can act on.',
        points: ['Privilege escalation detected as it happens', 'Critical accounts watched for takeover signals', 'Revoke sessions or revert a grant from the finding'],
      },
      {
        id: 'auth-flow',
        wide: true,
        eyebrow: 'Authentication flows',
        title: 'Design the sign‑in journey as a flow',
        description:
          'Drag steps onto a canvas and link them: password, passkey, risk check, notification, block. The editor checks that every path ends in a decision, and you can run a scenario through it before publishing.',
        points: ['Verify, decide and act steps, drawn as nodes', 'Different paths by risk, device or country', 'Run a scenario through the flow before you publish it'],
      },
    ],
    fr: [
      {
        id: 'secure',
        eyebrow: 'Politiques',
        title: 'Des règles décident, chaque décision est expliquée',
        description:
          'Écrivez les règles une fois : qui peut se connecter, d’où, avec quelle preuve. Chaque tentative y est confrontée, et vous pouvez relire ensuite quelle règle s’est appliquée.',
        points: [
          'Conditions sur le rôle, le pays, l’appareil et l’application',
          'Authentification renforcée seulement quand le contexte l’impose',
          'La règle appliquée est conservée avec chaque décision',
        ],
      },
      {
        id: 'secure-governance',
        eyebrow: 'Analyse de gouvernance',
        title: 'Repérez tôt un compte volé ou une escalade de privilèges',
        description:
          'Autharie passe en revue en continu les comptes sensibles et les changements de droits. Un rôle accordé hors fenêtre de changement, ou un admin qui apparaît dans deux pays en même temps, devient un constat sur lequel agir.',
        points: ['Escalade de privilèges détectée au moment où elle a lieu', 'Comptes critiques surveillés contre les signes de vol', 'Révoquez les sessions ou annulez un octroi depuis le constat'],
      },
      {
        id: 'auth-flow',
        wide: true,
        eyebrow: 'Parcours d’authentification',
        title: 'Dessinez le parcours de connexion comme un flux',
        description:
          'Glissez des étapes sur un canevas et reliez-les : mot de passe, passkey, analyse du risque, notification, blocage. L’éditeur vérifie que chaque chemin se termine par une décision, et vous pouvez y faire passer un scénario avant de publier.',
        points: ['Étapes de vérification, de décision et d’action, dessinées en nœuds', 'Des chemins différents selon le risque, l’appareil ou le pays', 'Testez un scénario dans le flux avant de le publier'],
      },
    ],
  },
  observe: {
    en: [
      {
        id: 'observe-alerts',
        eyebrow: 'Alerts',
        title: 'Alerts that tell you when something is wrong',
        description:
          'Set rules on the signals that matter, such as failed sign-ins or response time. The notification lands in the tool your team already reads, with a link to the instance.',
        points: ['Rules per instance', 'Chat and email notifications', 'One list of open and resolved alerts'],
      },
      {
        id: 'observe-logs',
        eyebrow: 'Metrics and logs',
        title: 'Search your logs without leaving the console',
        description:
          'Follow sign-in traffic live or go back through the history. Filter by level, client or user, and spot failures as they start.',
        points: ['Live view and historical search', 'Sign-in rate and failure rate', 'Errors flagged automatically'],
      },
      {
        id: 'observe-load',
        eyebrow: 'Load and traffic',
        title: 'See where the load comes from',
        description:
          'Load on each instance, and sign-ins split by application and by person. Spot the client that is hammering the service before it slows everyone down.',
        points: ['CPU and memory per instance', 'Connections by application', 'Most active people'],
      },
    ],
    fr: [
      {
        id: 'observe-alerts',
        eyebrow: 'Alertes',
        title: 'Des alertes qui préviennent quand quelque chose cloche',
        description:
          'Posez des règles sur les signaux qui comptent, comme les échecs de connexion ou le temps de réponse. La notification arrive dans l’outil que votre équipe lit déjà, avec un lien vers l’instance.',
        points: ['Des règles par instance', 'Notifications par messagerie et par e-mail', 'Une seule liste des alertes ouvertes et résolues'],
      },
      {
        id: 'observe-logs',
        eyebrow: 'Métriques et journaux',
        title: 'Cherchez dans vos journaux sans quitter la console',
        description:
          'Suivez le trafic de connexion en direct ou remontez dans l’historique. Filtrez par niveau, client ou utilisateur, et repérez les échecs dès qu’ils commencent.',
        points: ['Vue en direct et recherche dans l’historique', 'Taux de connexion et taux d’échec', 'Erreurs signalées automatiquement'],
      },
      {
        id: 'observe-load',
        eyebrow: 'Charge et trafic',
        title: 'Voyez d’où vient la charge',
        description:
          'La charge de chaque instance, et les connexions réparties par application et par personne. Repérez le client qui sature le service avant qu’il ne ralentisse tout le monde.',
        points: ['CPU et mémoire par instance', 'Connexions par application', 'Personnes les plus actives'],
      },
    ],
  },
  regions: {
    en: [
      {
        id: 'regions',
        eyebrow: 'Mobility',
        title: 'Move an instance from one region to another',
        description:
          'Start on our clusters, move to yours when a requirement says so, and move back if it changes. The instance keeps its address and its applications keep working.',
        points: ['Archive, restore and switch traffic in one action', 'Same address, same configuration', 'Works between our clusters and yours'],
      },
    ],
    fr: [
      {
        id: 'regions',
        eyebrow: 'Mobilité',
        title: 'Déplacez une instance d’une région à une autre',
        description:
          'Démarrez sur nos clusters, passez sur les vôtres quand une exigence l’impose, et revenez si elle change. L’instance garde son adresse et vos applications continuent de fonctionner.',
        points: ['Archive, restauration et bascule du trafic en une action', 'Même adresse, même configuration', 'Entre nos clusters et les vôtres'],
      },
    ],
  },
  operate: {
    en: [
      {
        id: 'operate',
        eyebrow: 'Restore tests',
        title: 'Prove a backup works before you need it',
        description:
          'Start a temporary instance from any archive. Autharie checks the data and the sign-in flow, then deletes it. Production is never touched.',
        points: ['Built from a real archive', 'Automatic checks on data and sign-in', 'Removed on its own after a few hours'],
      },
      {
        id: 'operate-promote',
        eyebrow: 'Staging to production',
        title: 'Test a version on staging, then promote it',
        description:
          'Run the new version on a staging instance and check it. When it is right, promote the same version to production in one step.',
        points: ['A staging instance beside production', 'Promote only what was tested', 'Stop or hold back a rollout'],
      },
    ],
    fr: [
      {
        id: 'operate',
        eyebrow: 'Tests de restauration',
        title: 'Prouvez qu’une sauvegarde fonctionne avant d’en avoir besoin',
        description:
          'Démarrez une instance temporaire depuis n’importe quelle archive. Autharie vérifie les données et la connexion, puis la supprime. La production n’est jamais touchée.',
        points: ['Construite depuis une vraie archive', 'Vérifications automatiques des données et de la connexion', 'Supprimée toute seule au bout de quelques heures'],
      },
      {
        id: 'operate-promote',
        eyebrow: 'Préproduction vers production',
        title: 'Testez une version en préproduction, puis promouvez-la',
        description:
          'Faites tourner la nouvelle version sur une instance de préproduction et vérifiez-la. Quand elle est bonne, promouvez cette même version en production en une étape.',
        points: ['Une préproduction à côté de la production', 'Ne promouvoir que ce qui a été testé', 'Stopper ou retenir un déploiement'],
      },
    ],
  },
}
