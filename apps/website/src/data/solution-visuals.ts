import type { ProductVisual } from './product-visuals'
import type { Locale } from '../i18n'

/** Illustrated sections of the solution pages, one per page, in both languages. */
export const solutionVisuals: Record<string, Record<Locale, ProductVisual[]>> = {
  'platform-engineers': {
    en: [
      { id: 'manifest-apply', eyebrow: 'Declarative', title: 'Describe an instance, let the operator do the rest', description: 'Keep identity instances as manifests next to your other infrastructure. Change a version or a region, apply it, and the operator reconciles the cluster toward what you asked.', points: ['Instances as manifests in your repository', 'Version and placement changes applied by the operator', 'The same API behind the console and the manifests'] },
    ],
    fr: [
      { id: 'manifest-apply', eyebrow: 'Déclaratif', title: 'Décrivez une instance, l’opérateur fait le reste', description: 'Gardez vos instances d’identité sous forme de manifestes, à côté du reste de votre infrastructure. Changez une version ou une région, appliquez, et l’opérateur ramène le cluster vers ce que vous avez demandé.', points: ['Des instances décrites par manifestes dans votre dépôt', 'Changements de version et de placement appliqués par l’opérateur', 'La même API derrière la console et les manifestes'] },
    ],
  },
  'developers': {
    en: [
      { id: 'dev-quickstart', eyebrow: 'Standard protocols', title: 'Plug in any OpenID Connect library', description: 'Point your library at the realm address and it discovers the rest. There is no proprietary SDK to adopt, and a sandbox per pull request lets you try changes before they ship.', points: ['A discovery document lists every endpoint', 'Works with the libraries you already use', 'A sandbox instance per pull request'] },
    ],
    fr: [
      { id: 'dev-quickstart', eyebrow: 'Protocoles standard', title: 'Branchez n’importe quelle bibliothèque OpenID Connect', description: 'Pointez votre bibliothèque vers l’adresse du realm, elle découvre le reste. Aucun SDK propriétaire à adopter, et un bac à sable par pull request pour essayer les changements avant leur livraison.', points: ['Un document de découverte liste tous les points d’accès', 'Compatible avec les bibliothèques que vous utilisez déjà', 'Une instance de bac à sable par pull request'] },
    ],
  },
  'security-compliance': {
    en: [
      { id: 'audit-trail', eyebrow: 'Evidence', title: 'Answer the auditor with a file, not a meeting', description: 'Every administrative change and access decision is recorded with its author and date. Filter the log, and export what an auditor asks for.', points: ['Who changed what, and when', 'Policy decisions kept with the rule that applied', 'Export for an audit in one step'] },
    ],
    fr: [
      { id: 'audit-trail', eyebrow: 'Preuves', title: 'Répondez à l’auditeur par un fichier, pas par une réunion', description: 'Chaque changement d’administration et chaque décision d’accès est consigné avec son auteur et sa date. Filtrez le journal et exportez ce que l’auditeur demande.', points: ['Qui a changé quoi, et quand', 'Les décisions de politique conservées avec la règle appliquée', 'Export pour un audit en une étape'] },
    ],
  },
  'product-teams': {
    en: [
      { id: 'login-branding', eyebrow: 'Your sign in', title: 'A login that looks like your product', description: 'Choose colours, language and the ways people can sign in. The security behind it is ours to run, so your team keeps shipping features.', points: ['Colours and language, per application', 'Passkeys and company directories on top of passwords', 'No identity code to write or maintain'] },
    ],
    fr: [
      { id: 'login-branding', eyebrow: 'Votre connexion', title: 'Une connexion à l’image de votre produit', description: 'Choisissez les couleurs, la langue et les façons de se connecter. La sécurité derrière reste à nous d’exploiter, votre équipe continue de livrer des fonctionnalités.', points: ['Couleurs et langue, application par application', 'Passkeys et annuaires d’entreprise en plus des mots de passe', 'Aucun code d’identité à écrire ni à maintenir'] },
    ],
  },
  'startups': {
    en: [
      { id: 'growth-path', eyebrow: 'Growth', title: 'Start small, grow without a rebuild', description: 'Begin on a small instance. As users arrive, capacity, availability and placement grow with you, on the same address and with the same configuration.', points: ['Same address and configuration at every step', 'A staging instance next to production from day one', 'Move to your own cluster when you need to'] },
    ],
    fr: [
      { id: 'growth-path', eyebrow: 'Croissance', title: 'Démarrez petit, grandissez sans reconstruire', description: 'Commencez sur une petite instance. À mesure que les utilisateurs arrivent, la capacité, la disponibilité et le placement évoluent avec vous, à la même adresse et avec la même configuration.', points: ['Même adresse et même configuration à chaque palier', 'Une préproduction à côté de la production dès le premier jour', 'Passez sur votre propre cluster quand il le faut'] },
    ],
  },
  'associations': {
    en: [
      { id: 'member-sso', eyebrow: 'One sign in', title: 'One account for members, volunteers and staff', description: 'People keep a single login across your tools, and you decide who opens which tool by role. When a volunteer leaves, one change closes every door.', points: ['Access by role, not tool by tool', 'One change when someone leaves', 'Backups and updates handled for you'] },
    ],
    fr: [
      { id: 'member-sso', eyebrow: 'Une connexion', title: 'Un seul compte pour adhérents, bénévoles et salariés', description: 'Chacun garde une seule connexion pour tous vos outils, et vous décidez par rôle qui ouvre quoi. Quand un bénévole part, un seul changement ferme toutes les portes.', points: ['Des accès par rôle, pas outil par outil', 'Un seul changement quand quelqu’un part', 'Sauvegardes et mises à jour prises en charge'] },
    ],
  },
  'enterprise': {
    en: [
      { id: 'identity', eyebrow: 'Organisations', title: 'Delegate administration, keep one realm', description: 'Groups, brands and sites each manage their own people and applications inside one realm. Central teams keep control of policies and see everything.', points: ['Organisations and nested groups', 'Delegated administration with a limited scope', 'One set of policies for the whole group'] },
    ],
    fr: [
      { id: 'identity', eyebrow: 'Organisations', title: 'Déléguez l’administration, gardez un seul realm', description: 'Groupes, enseignes et sites gèrent chacun leurs personnes et leurs applications dans un seul realm. Les équipes centrales gardent la main sur les politiques et voient tout.', points: ['Organisations et groupes imbriqués', 'Administration déléguée à périmètre limité', 'Un seul jeu de politiques pour tout le groupe'] },
    ],
  },
  'financial-services': {
    en: [
      { id: 'four-eyes', eyebrow: 'Separation of duties', title: 'Privileged access needs a second person', description: 'A request for a sensitive role is approved by someone else, for a limited time, and both decisions are recorded.', points: ['Time-limited privileged access', 'Approval by a second person', 'Both decisions in the audit log'] },
    ],
    fr: [
      { id: 'four-eyes', eyebrow: 'Séparation des tâches', title: 'Un accès privilégié demande une deuxième personne', description: 'Une demande de rôle sensible est approuvée par quelqu’un d’autre, pour une durée limitée, et les deux décisions sont consignées.', points: ['Accès privilégié limité dans le temps', 'Approbation par une deuxième personne', 'Les deux décisions dans le journal d’audit'] },
    ],
  },
  'healthcare': {
    en: [
      { id: 'data-residency', eyebrow: 'Data residency', title: 'Identity data stays where the rules say', description: 'Accounts, sessions and archives live in a cluster in France. Autharie sends instructions and reads status, and never holds your users.', points: ['Database and archives in your cluster', 'The control plane exchanges instructions and status only', 'Sign in goes straight to your cluster'] },
    ],
    fr: [
      { id: 'data-residency', eyebrow: 'Localisation des données', title: 'Les données d’identité restent là où les règles l’exigent', description: 'Comptes, sessions et archives vivent dans un cluster en France. Autharie envoie des instructions et lit un statut, sans jamais détenir vos utilisateurs.', points: ['Base de données et archives dans votre cluster', 'Le plan de contrôle n’échange que des instructions et un statut', 'La connexion va directement à votre cluster'] },
    ],
  },
  'public-sector': {
    en: [
      { id: 'regions', eyebrow: 'Placement', title: 'Choose where each instance runs, and move it when needed', description: 'Start on Autharie’s clusters, or run on a cluster you own. Moving between them keeps the address and the configuration.', points: ['Our clusters or yours', 'Moves keep the same address', 'Same console and operations wherever it runs'] },
    ],
    fr: [
      { id: 'regions', eyebrow: 'Placement', title: 'Choisissez où tourne chaque instance, et déplacez-la au besoin', description: 'Démarrez sur les clusters d’Autharie, ou sur un cluster qui vous appartient. Passer de l’un à l’autre conserve l’adresse et la configuration.', points: ['Nos clusters ou les vôtres', 'Un déplacement garde la même adresse', 'Même console, mêmes opérations où qu’elle tourne'] },
    ],
  },
  'b2b-saas': {
    en: [
      { id: 'tenant-sso', eyebrow: 'Enterprise sign in', title: 'Give each customer their own sign in', description: 'Each customer organisation signs in through its own directory, routed by email domain, and sees only its own users and settings. Adding a customer takes minutes, not a project.', points: ['Routing by email domain', 'Each customer isolated in its own organisation', 'Their directory, your application'] },
    ],
    fr: [
      { id: 'tenant-sso', eyebrow: 'Connexion entreprise', title: 'Donnez à chaque client sa propre connexion', description: 'Chaque organisation cliente se connecte via son propre annuaire, orientée selon le domaine e-mail, et ne voit que ses utilisateurs et ses réglages. Ajouter un client prend quelques minutes, pas un projet.', points: ['Orientation selon le domaine e-mail', 'Chaque client isolé dans sa propre organisation', 'Leur annuaire, votre application'] },
    ],
  },
  'keycloak': {
    en: [
      { id: 'migration-plan', eyebrow: 'Migration', title: 'Move at your own pace, with a way back', description: 'Inventory what you run, stand up a copy on Autharie, switch applications one by one, then retire the old server. The old one stays as a fallback until you are sure.', points: ['Realms, clients, roles and users carried over', 'Staging first, production when it checks out', 'The old server kept as a fallback'] },
    ],
    fr: [
      { id: 'migration-plan', eyebrow: 'Migration', title: 'Avancez à votre rythme, avec un retour possible', description: 'Faites l’inventaire de ce qui tourne, montez une copie sur Autharie, basculez les applications une par une, puis retirez l’ancien serveur. Il reste en secours tant que vous n’êtes pas sûr.', points: ['Realms, clients, rôles et utilisateurs repris', 'D’abord la préproduction, puis la production quand tout est bon', 'L’ancien serveur conservé en secours'] },
    ],
  },
}

export const solutionTints = ['from-violet-200 via-indigo-100 to-white', 'from-fuchsia-200 via-violet-100 to-white', 'from-emerald-100 via-violet-100 to-white', 'from-sky-200 via-indigo-100 to-white', 'from-indigo-200 via-violet-200 to-white']
