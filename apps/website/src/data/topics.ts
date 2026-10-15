import type { Locale } from '../i18n'

export type TopicId =
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

export interface TopicCopy {
  eyebrow: string
  title: string
  description: string
  points: string[]
}

export interface Topic extends Record<Locale, TopicCopy> {
  /** Background of the diagram card. */
  tint: string
  /** Full width, the text above the diagram. */
  wide?: boolean
}

/** Topics illustrated with an interactive diagram, ready to drop on any page with <TopicSection id="..." />. */
export const topics: Record<TopicId, Topic> = {
  'identity': {
    tint: 'from-violet-200 via-indigo-100 to-white',
    en: { eyebrow: 'Federation', title: 'One realm, every organisation in its own lane', description: 'A group with several brands, regions and sites keeps one realm. Each organisation manages its own people, applications and settings, and nothing outside it.', points: ['Organisations and nested groups that mirror the company', 'A site manager never sees another site’s users, applications or configuration', 'Delegate administration without handing over the realm'] },
    fr: { eyebrow: 'Fédération', title: 'Un realm, chaque organisation dans son périmètre', description: 'Un groupe avec plusieurs enseignes, régions et sites garde un seul realm. Chaque organisation gère ses utilisateurs, ses applications et ses réglages, et rien en dehors.', points: ['Organisations et groupes imbriqués, à l’image de l’entreprise', 'Un directeur de site ne voit ni les utilisateurs, ni les applications, ni la configuration des autres sites', 'Déléguez l’administration sans céder le realm'] },
  },
  'identity-rightsizing': {
    tint: 'from-fuchsia-200 via-violet-100 to-white',
    en: { eyebrow: 'Least privilege', title: 'Reduce permissions nobody uses', description: 'See which roles have not been used in months and remove them in one step. Nothing changes until you approve it, and each change can be reverted.', points: ['Permissions unused for 90 days, listed by person', 'One approval to reduce access', 'Every change recorded and reversible'] },
    fr: { eyebrow: 'Moindre privilège', title: 'Réduisez les permissions que personne n’utilise', description: 'Repérez les rôles inutilisés depuis des mois et retirez-les en une étape. Rien ne change sans votre validation, et chaque changement peut être annulé.', points: ['Permissions inutilisées depuis 90 jours, par personne', 'Une validation pour réduire les accès', 'Chaque changement consigné et réversible'] },
  },
  'identity-growth': {
    tint: 'from-violet-300 via-fuchsia-100 to-white',
    en: { eyebrow: 'Growth', title: 'Watch your user base evolve', description: 'Total accounts, active people and new arrivals over the year, so a jump or a drop does not go unnoticed.', points: ['Total and active users over time', 'New accounts per month', 'Compare instances side by side'] },
    fr: { eyebrow: 'Croissance', title: 'Suivez l’évolution de vos utilisateurs', description: 'Comptes au total, personnes actives et nouveaux arrivants sur l’année, pour qu’une hausse ou une chute ne passe pas inaperçue.', points: ['Utilisateurs totaux et actifs dans le temps', 'Nouveaux comptes par mois', 'Comparez les instances côte à côte'] },
  },
  'secure': {
    tint: 'from-emerald-100 via-violet-100 to-white',
    en: { eyebrow: 'Policies', title: 'Rules decide, and every decision is explained', description: 'Write the rules once: who may sign in, from where, with which proof. Each attempt is evaluated against them, and you can read afterwards which rule applied.', points: ['Conditions on role, country, device and application', 'Step-up authentication only when the context calls for it', 'The matching rule is kept with every decision'] },
    fr: { eyebrow: 'Politiques', title: 'Des règles décident, chaque décision est expliquée', description: 'Écrivez les règles une fois : qui peut se connecter, d’où, avec quelle preuve. Chaque tentative y est confrontée, et vous pouvez relire ensuite quelle règle s’est appliquée.', points: ['Conditions sur le rôle, le pays, l’appareil et l’application', 'Authentification renforcée seulement quand le contexte l’impose', 'La règle appliquée est conservée avec chaque décision'] },
  },
  'secure-governance': {
    tint: 'from-indigo-200 via-violet-200 to-white',
    en: { eyebrow: 'Governance analysis', title: 'Catch a stolen account or a privilege escalation early', description: 'Autharie reviews sensitive accounts and permission changes continuously. A role granted outside a change window, or an admin who appears in two countries at once, becomes a finding you can act on.', points: ['Privilege escalation detected as it happens', 'Critical accounts watched for takeover signals', 'Revoke sessions or revert a grant from the finding'] },
    fr: { eyebrow: 'Analyse de gouvernance', title: 'Repérez tôt un compte volé ou une escalade de privilèges', description: 'Autharie passe en revue en continu les comptes sensibles et les changements de droits. Un rôle accordé hors fenêtre de changement, ou un admin qui apparaît dans deux pays en même temps, devient un constat sur lequel agir.', points: ['Escalade de privilèges détectée au moment où elle a lieu', 'Comptes critiques surveillés contre les signes de vol', 'Révoquez les sessions ou annulez un octroi depuis le constat'] },
  },
  'auth-flow': {
    tint: 'from-sky-200 via-indigo-100 to-white',
    wide: true,
    en: { eyebrow: 'Authentication flows', title: 'Design the sign‑in journey as a flow', description: 'Drag steps onto a canvas and link them: password, passkey, risk check, notification, block. The editor checks that every path ends in a decision, and you can run a scenario through it before publishing.', points: ['Verify, decide and act steps, drawn as nodes', 'Different paths by risk, device or country', 'Run a scenario through the flow before you publish it'] },
    fr: { eyebrow: 'Parcours d’authentification', title: 'Dessinez le parcours de connexion comme un flux', description: 'Glissez des étapes sur un canevas et reliez-les : mot de passe, passkey, analyse du risque, notification, blocage. L’éditeur vérifie que chaque chemin se termine par une décision, et vous pouvez y faire passer un scénario avant de publier.', points: ['Étapes de vérification, de décision et d’action, dessinées en nœuds', 'Des chemins différents selon le risque, l’appareil ou le pays', 'Testez un scénario dans le flux avant de le publier'] },
  },
  'observe-alerts': {
    tint: 'from-violet-200 via-indigo-100 to-white',
    en: { eyebrow: 'Alerts', title: 'Alerts that tell you when something is wrong', description: 'Set rules on the signals that matter, such as failed sign-ins or response time. The notification lands in the tool your team already reads, with a link to the instance.', points: ['Rules per instance', 'Chat and email notifications', 'One list of open and resolved alerts'] },
    fr: { eyebrow: 'Alertes', title: 'Des alertes qui préviennent quand quelque chose cloche', description: 'Posez des règles sur les signaux qui comptent, comme les échecs de connexion ou le temps de réponse. La notification arrive dans l’outil que votre équipe lit déjà, avec un lien vers l’instance.', points: ['Des règles par instance', 'Notifications par messagerie et par e-mail', 'Une seule liste des alertes ouvertes et résolues'] },
  },
  'observe-logs': {
    tint: 'from-fuchsia-200 via-violet-100 to-white',
    en: { eyebrow: 'Metrics and logs', title: 'Search your logs without leaving the console', description: 'Follow sign-in traffic live or go back through the history. Filter by level, client or user, and spot failures as they start.', points: ['Live view and historical search', 'Sign-in rate and failure rate', 'Errors flagged automatically'] },
    fr: { eyebrow: 'Métriques et journaux', title: 'Cherchez dans vos journaux sans quitter la console', description: 'Suivez le trafic de connexion en direct ou remontez dans l’historique. Filtrez par niveau, client ou utilisateur, et repérez les échecs dès qu’ils commencent.', points: ['Vue en direct et recherche dans l’historique', 'Taux de connexion et taux d’échec', 'Erreurs signalées automatiquement'] },
  },
  'observe-load': {
    tint: 'from-violet-300 via-fuchsia-100 to-white',
    en: { eyebrow: 'Load and traffic', title: 'See where the load comes from', description: 'Load on each instance, and sign-ins split by application and by person. Spot the client that is hammering the service before it slows everyone down.', points: ['CPU and memory per instance', 'Connections by application', 'Most active people'] },
    fr: { eyebrow: 'Charge et trafic', title: 'Voyez d’où vient la charge', description: 'La charge de chaque instance, et les connexions réparties par application et par personne. Repérez le client qui sature le service avant qu’il ne ralentisse tout le monde.', points: ['CPU et mémoire par instance', 'Connexions par application', 'Personnes les plus actives'] },
  },
  'regions': {
    tint: 'from-emerald-100 via-violet-100 to-white',
    en: { eyebrow: 'Mobility', title: 'Move an instance from one region to another', description: 'Start on our clusters, move to yours when a requirement says so, and move back if it changes. The instance keeps its address and its applications keep working.', points: ['Archive, restore and switch traffic in one action', 'Same address, same configuration', 'Works between our clusters and yours'] },
    fr: { eyebrow: 'Mobilité', title: 'Déplacez une instance d’une région à une autre', description: 'Démarrez sur nos clusters, passez sur les vôtres quand une exigence l’impose, et revenez si elle change. L’instance garde son adresse et vos applications continuent de fonctionner.', points: ['Archive, restauration et bascule du trafic en une action', 'Même adresse, même configuration', 'Entre nos clusters et les vôtres'] },
  },
  'operate': {
    tint: 'from-indigo-200 via-violet-200 to-white',
    en: { eyebrow: 'Restore tests', title: 'Prove a backup works before you need it', description: 'Start a temporary instance from any archive. Autharie checks the data and the sign-in flow, then deletes it. Production is never touched.', points: ['Built from a real archive', 'Automatic checks on data and sign-in', 'Removed on its own after a few hours'] },
    fr: { eyebrow: 'Tests de restauration', title: 'Prouvez qu’une sauvegarde fonctionne avant d’en avoir besoin', description: 'Démarrez une instance temporaire depuis n’importe quelle archive. Autharie vérifie les données et la connexion, puis la supprime. La production n’est jamais touchée.', points: ['Construite depuis une vraie archive', 'Vérifications automatiques des données et de la connexion', 'Supprimée toute seule au bout de quelques heures'] },
  },
  'operate-promote': {
    tint: 'from-sky-200 via-indigo-100 to-white',
    en: { eyebrow: 'Staging to production', title: 'Test a version on staging, then promote it', description: 'Run the new version on a staging instance and check it. When it is right, promote the same version to production in one step.', points: ['A staging instance beside production', 'Promote only what was tested', 'Stop or hold back a rollout'] },
    fr: { eyebrow: 'Préproduction vers production', title: 'Testez une version en préproduction, puis promouvez-la', description: 'Faites tourner la nouvelle version sur une instance de préproduction et vérifiez-la. Quand elle est bonne, promouvez cette même version en production en une étape.', points: ['Une préproduction à côté de la production', 'Ne promouvoir que ce qui a été testé', 'Stopper ou retenir un déploiement'] },
  },
  'manifest-apply': {
    tint: 'from-violet-200 via-indigo-100 to-white',
    en: { eyebrow: 'Declarative', title: 'Describe an instance, let the operator do the rest', description: 'Keep identity instances as manifests next to your other infrastructure. Change a version or a region, apply it, and the operator reconciles the cluster toward what you asked.', points: ['Instances as manifests in your repository', 'Version and placement changes applied by the operator', 'The same API behind the console and the manifests'] },
    fr: { eyebrow: 'Déclaratif', title: 'Décrivez une instance, l’opérateur fait le reste', description: 'Gardez vos instances d’identité sous forme de manifestes, à côté du reste de votre infrastructure. Changez une version ou une région, appliquez, et l’opérateur ramène le cluster vers ce que vous avez demandé.', points: ['Des instances décrites par manifestes dans votre dépôt', 'Changements de version et de placement appliqués par l’opérateur', 'La même API derrière la console et les manifestes'] },
  },
  'dev-quickstart': {
    tint: 'from-fuchsia-200 via-violet-100 to-white',
    en: { eyebrow: 'Standard protocols', title: 'Plug in any OpenID Connect library', description: 'Point your library at the realm address and it discovers the rest. There is no proprietary SDK to adopt, and a sandbox per pull request lets you try changes before they ship.', points: ['A discovery document lists every endpoint', 'Works with the libraries you already use', 'A sandbox instance per pull request'] },
    fr: { eyebrow: 'Protocoles standard', title: 'Branchez n’importe quelle bibliothèque OpenID Connect', description: 'Pointez votre bibliothèque vers l’adresse du realm, elle découvre le reste. Aucun SDK propriétaire à adopter, et un bac à sable par pull request pour essayer les changements avant leur livraison.', points: ['Un document de découverte liste tous les points d’accès', 'Compatible avec les bibliothèques que vous utilisez déjà', 'Une instance de bac à sable par pull request'] },
  },
  'audit-trail': {
    tint: 'from-violet-300 via-fuchsia-100 to-white',
    en: { eyebrow: 'Evidence', title: 'Answer the auditor with a file, not a meeting', description: 'Every administrative change and access decision is recorded with its author and date. Filter the log, and export what an auditor asks for.', points: ['Who changed what, and when', 'Policy decisions kept with the rule that applied', 'Export for an audit in one step'] },
    fr: { eyebrow: 'Preuves', title: 'Répondez à l’auditeur par un fichier, pas par une réunion', description: 'Chaque changement d’administration et chaque décision d’accès est consigné avec son auteur et sa date. Filtrez le journal et exportez ce que l’auditeur demande.', points: ['Qui a changé quoi, et quand', 'Les décisions de politique conservées avec la règle appliquée', 'Export pour un audit en une étape'] },
  },
  'login-branding': {
    tint: 'from-emerald-100 via-violet-100 to-white',
    en: { eyebrow: 'Your sign in', title: 'A login that looks like your product', description: 'Choose colours, language and the ways people can sign in. The security behind it is ours to run, so your team keeps shipping features.', points: ['Colours and language, per application', 'Passkeys and company directories on top of passwords', 'No identity code to write or maintain'] },
    fr: { eyebrow: 'Votre connexion', title: 'Une connexion à l’image de votre produit', description: 'Choisissez les couleurs, la langue et les façons de se connecter. La sécurité derrière reste à nous d’exploiter, votre équipe continue de livrer des fonctionnalités.', points: ['Couleurs et langue, application par application', 'Passkeys et annuaires d’entreprise en plus des mots de passe', 'Aucun code d’identité à écrire ni à maintenir'] },
  },
  'growth-path': {
    tint: 'from-indigo-200 via-violet-200 to-white',
    en: { eyebrow: 'Growth', title: 'Start small, grow without a rebuild', description: 'Begin on a small instance. As users arrive, capacity, availability and placement grow with you, on the same address and with the same configuration.', points: ['Same address and configuration at every step', 'A staging instance next to production from day one', 'Move to your own cluster when you need to'] },
    fr: { eyebrow: 'Croissance', title: 'Démarrez petit, grandissez sans reconstruire', description: 'Commencez sur une petite instance. À mesure que les utilisateurs arrivent, la capacité, la disponibilité et le placement évoluent avec vous, à la même adresse et avec la même configuration.', points: ['Même adresse et même configuration à chaque palier', 'Une préproduction à côté de la production dès le premier jour', 'Passez sur votre propre cluster quand il le faut'] },
  },
  'member-sso': {
    tint: 'from-sky-200 via-indigo-100 to-white',
    en: { eyebrow: 'One sign in', title: 'One account for members, volunteers and staff', description: 'People keep a single login across your tools, and you decide who opens which tool by role. When a volunteer leaves, one change closes every door.', points: ['Access by role, not tool by tool', 'One change when someone leaves', 'Backups and updates handled for you'] },
    fr: { eyebrow: 'Une connexion', title: 'Un seul compte pour adhérents, bénévoles et salariés', description: 'Chacun garde une seule connexion pour tous vos outils, et vous décidez par rôle qui ouvre quoi. Quand un bénévole part, un seul changement ferme toutes les portes.', points: ['Des accès par rôle, pas outil par outil', 'Un seul changement quand quelqu’un part', 'Sauvegardes et mises à jour prises en charge'] },
  },
  'four-eyes': {
    tint: 'from-violet-200 via-indigo-100 to-white',
    en: { eyebrow: 'Separation of duties', title: 'Privileged access needs a second person', description: 'A request for a sensitive role is approved by someone else, for a limited time, and both decisions are recorded.', points: ['Time-limited privileged access', 'Approval by a second person', 'Both decisions in the audit log'] },
    fr: { eyebrow: 'Séparation des tâches', title: 'Un accès privilégié demande une deuxième personne', description: 'Une demande de rôle sensible est approuvée par quelqu’un d’autre, pour une durée limitée, et les deux décisions sont consignées.', points: ['Accès privilégié limité dans le temps', 'Approbation par une deuxième personne', 'Les deux décisions dans le journal d’audit'] },
  },
  'data-residency': {
    tint: 'from-fuchsia-200 via-violet-100 to-white',
    en: { eyebrow: 'Data residency', title: 'Identity data stays where the rules say', description: 'Accounts, sessions and archives live in a cluster in France. Autharie sends instructions and reads status, and never holds your users.', points: ['Database and archives in your cluster', 'The control plane exchanges instructions and status only', 'Sign in goes straight to your cluster'] },
    fr: { eyebrow: 'Localisation des données', title: 'Les données d’identité restent là où les règles l’exigent', description: 'Comptes, sessions et archives vivent dans un cluster en France. Autharie envoie des instructions et lit un statut, sans jamais détenir vos utilisateurs.', points: ['Base de données et archives dans votre cluster', 'Le plan de contrôle n’échange que des instructions et un statut', 'La connexion va directement à votre cluster'] },
  },
  'tenant-sso': {
    tint: 'from-violet-300 via-fuchsia-100 to-white',
    en: { eyebrow: 'Enterprise sign in', title: 'Give each customer their own sign in', description: 'Each customer organisation signs in through its own directory, routed by email domain, and sees only its own users and settings. Adding a customer takes minutes, not a project.', points: ['Routing by email domain', 'Each customer isolated in its own organisation', 'Their directory, your application'] },
    fr: { eyebrow: 'Connexion entreprise', title: 'Donnez à chaque client sa propre connexion', description: 'Chaque organisation cliente se connecte via son propre annuaire, orientée selon le domaine e-mail, et ne voit que ses utilisateurs et ses réglages. Ajouter un client prend quelques minutes, pas un projet.', points: ['Orientation selon le domaine e-mail', 'Chaque client isolé dans sa propre organisation', 'Leur annuaire, votre application'] },
  },
}
