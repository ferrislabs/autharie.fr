import type { Product } from './products'

export type ProductCopy = Pick<
  Product,
  'tagline' | 'hero' | 'mock' | 'pillars' | 'spotlight' | 'grid' | 'underTheHood'
>

export const productsFr: Record<string, ProductCopy> = {
  deploy: {
    tagline: 'Votre propre service de connexion, en route en quelques minutes',
    hero: {
      title: 'Mettez la connexion en route,',
      accent: 'sans la développer.',
      lead: 'Choisissez un nom et une taille. Autharie démarre le service d’identité, sa base de données, son certificat et son adresse. Vos applications s’y connectent dès l’après-midi.',
    },
    mock: {
      title: 'acme-production',
      caption: 'Nouvelle instance',
      rows: [
        { label: 'Adresse', value: 'id.acme.com', tone: 'info' },
        { label: 'Taille', value: 'Standard · 10 000 utilisateurs' },
        { label: 'Base de données', value: 'Provisionnée', tone: 'ok' },
        { label: 'Certificat', value: 'Émis', tone: 'ok' },
        { label: 'Statut', value: 'En fonctionnement', tone: 'ok' },
      ],
    },
    pillars: [
      {
        icon: 'plug',
        title: 'Compatible avec ce que vous utilisez déjà',
        description:
          'Les applications qui parlent OpenID Connect ou OAuth 2 se connectent sans modification. Migrer revient à changer une adresse, pas à réécrire la connexion.',
      },
      {
        icon: 'lock',
        title: 'Sécurisé dès le premier démarrage',
        description:
          'Un certificat est émis pour votre nom de domaine et renouvelé avant son expiration. Personne n’a à copier un fichier de clé d’un poste à l’autre.',
      },
      {
        icon: 'database',
        title: 'Rien d’autre à installer',
        description:
          'La base de données est fournie avec l’instance, archivée à intervalles réguliers et restaurable depuis la console.',
      },
    ],
    spotlight: {
      eyebrow: 'Tailles',
      title: 'Démarrez petit, évoluez sans tout reconstruire',
      description:
        'Choisissez une taille pour essayer, une plus grande pour un vrai trafic de connexion, ou un cluster dédié. Passer à la taille supérieure ne reconstruit rien.',
      points: [
        'Essayez sur une petite instance avant que quiconque en dépende',
        'Gardez une instance de préproduction à côté de la production pour tester les changements d’abord',
        'Rien n’est coupé à la limite : l’instance ralentit d’abord et vous êtes prévenu',
      ],
    },
    grid: [
      { icon: 'terminal', title: 'Console, API ou manifeste', description: 'Tout ce que fait la console passe par l’API documentée.' },
      { icon: 'globe', title: 'Votre propre domaine', description: 'Servez la connexion depuis id.votreentreprise.com.' },
      { icon: 'rotate', title: 'Une préproduction identique', description: 'Une seconde instance, de même taille, pour tester vos changements d’abord.' },
      { icon: 'users', title: 'Toute l’équipe dans la console', description: 'Toute personne qui s’en occupe peut utiliser la console, chacune avec son rôle.' },
      { icon: 'zap', title: 'Rapide à démarrer', description: 'D’un nom à une instance en fonctionnement en quelques minutes.' },
      { icon: 'archive', title: 'Repartez quand vous voulez', description: 'Les deux fournisseurs sont open source et la base est du Postgres ordinaire.' },
    ],
    underTheHood: {
      label: 'Comment les instances sont déclarées et réconciliées',
      href: '/technology#kubernetes',
      description: 'Chaque instance est une ressource Kubernetes surveillée par un opérateur écrit en Rust.',
    },
  },
  identity: {
    tagline: 'Sachez qui a accès à quoi, et gardez-le à jour',
    hero: {
      title: 'Gérez vos collaborateurs,',
      accent: 'pas un écran de configuration.',
      lead: 'Identity offre à la personne qui gère les accès un outil fait pour ce travail. Qui est présent, dans quelles équipes, ce que chacun peut ouvrir, et ce qui a changé depuis le mois dernier.',
    },
    mock: {
      title: 'Vue d’ensemble des accès',
      caption: 'Acme · Production',
      rows: [
        { label: 'Utilisateurs actifs', value: '4 812', tone: 'info' },
        { label: 'En attente de validation', value: '6', tone: 'warn' },
        { label: 'Sans connexion depuis 90 jours', value: '38', tone: 'muted' },
        { label: 'Administrateurs', value: '9', tone: 'ok' },
      ],
    },
    pillars: [
      {
        icon: 'users',
        title: 'Utilisateurs, groupes et rôles au même endroit',
        description:
          'Créez des personnes, rangez-les dans des équipes et donnez à chaque équipe ce dont elle a besoin. Une seule vue, avec les mots que vos collègues emploient.',
      },
      {
        icon: 'check',
        title: 'Arrivées, mobilités, départs',
        description:
          'Invitez quelqu’un, adaptez ses accès quand il change de poste et retirez tout le jour de son départ.',
      },
      {
        icon: 'scroll',
        title: 'Des réponses pour l’auditeur',
        description:
          'Qui avait accès à quoi, qui l’a accordé et quand. Exportable : la réponse est un fichier, pas une réunion.',
      },
    ],
    spotlight: {
      eyebrow: 'Gouvernance',
      title: 'Des revues régulières, sans tableur',
      description:
        'Demandez au responsable de chaque équipe de confirmer qui doit encore en faire partie. Les accès que personne ne confirme peuvent être retirés, et la décision est enregistrée.',
      points: [
        'Repérez les comptes inutilisés depuis des mois',
        'Demandez aux responsables d’équipe de confirmer leurs membres',
        'Conservez une trace de chaque décision',
      ],
    },
    grid: [
      { icon: 'users', title: 'Des équipes à l’image de votre entreprise', description: 'Groupes et sous-groupes selon votre organisation.' },
      { icon: 'key', title: 'Des rôles aux noms clairs', description: 'Décrivez ce qu’un rôle autorise en une phrase que tout le monde comprend.' },
      { icon: 'clock', title: 'Des accès qui expirent', description: 'Accordez un accès pour une semaine et laissez-le se terminer seul.' },
      { icon: 'lock', title: 'Règles de connexion', description: 'Décidez qui doit confirmer avec un second facteur.' },
      { icon: 'scroll', title: 'Historique d’activité', description: 'Chaque changement, avec son auteur et sa date.' },
      { icon: 'network', title: 'Reliez votre annuaire', description: 'Importez vos collaborateurs depuis les outils où vous les gérez déjà.' },
    ],
    underTheHood: {
      label: 'Ce qui fait tourner le service d’identité',
      href: '/technology#open-source',
      description: 'Ferriskey et Keycloak, tous deux open source, avec Autharie par-dessus.',
    },
  },
  operate: {
    tagline: 'Mises à jour, sauvegardes et restaurations, prises en charge',
    hero: {
      title: 'Le travail qui commence',
      accent: 'après le premier déploiement.',
      lead: 'Nouvelles versions, archives quotidiennes, restauration quand quelque chose tourne mal. Autharie s’en occupe selon le calendrier que vous fixez, pour que personne dans votre équipe n’ait à le faire.',
    },
    mock: {
      title: 'Archives',
      caption: 'acme-production',
      rows: [
        { label: 'Aujourd’hui 02:14', value: '1,8 Go', tone: 'ok' },
        { label: 'Hier 02:14', value: '1,8 Go', tone: 'ok' },
        { label: 'Il y a 2 jours 02:14', value: '1,7 Go', tone: 'ok' },
        { label: 'Prochaine fenêtre de mise à jour', value: 'Dimanche 03:00', tone: 'info' },
      ],
    },
    pillars: [
      {
        icon: 'clock',
        title: 'Des mises à jour dans la fenêtre de votre choix',
        description:
          'Indiquez quand les correctifs peuvent être appliqués et lesquels peuvent passer seuls. Les versions majeures restent votre décision.',
      },
      {
        icon: 'archive',
        title: 'Des archives quotidiennes, conservées pour vous',
        description:
          'Réalisées à intervalles réguliers, conservées aussi longtemps que votre taille le prévoit, listées dans la console.',
      },
      {
        icon: 'rotate',
        title: 'Restauration dans une nouvelle instance',
        description:
          'Choisissez une archive et obtenez une instance construite à partir d’elle. L’originale continue de répondre pendant que vous vérifiez la copie.',
      },
    ],
    spotlight: {
      eyebrow: 'Nouvelles versions',
      title: 'Déployées par vagues, jamais toutes en même temps',
      description:
        'Une version atteint d’abord les instances de test, puis la production. Un déploiement peut être mis en attente et un lancement peut être arrêté.',
      points: [
        'Retenez une version tant que vous n’êtes pas prêt',
        'Arrêtez un déploiement qui vous paraît douteux',
        'Choisissez si les correctifs s’appliquent sans validation',
      ],
    },
    grid: [
      { icon: 'clock', title: 'Fenêtres de maintenance', description: 'Les changements ont lieu quand vous l’avez autorisé.' },
      { icon: 'archive', title: 'Rétention des archives', description: 'Choisissez combien de temps les archives sont conservées.' },
      { icon: 'rotate', title: 'Restaurations sûres', description: 'Une restauration n’écrase jamais l’instance en fonctionnement.' },
      { icon: 'branch', title: 'Contrôle des déploiements', description: 'Mettre en attente, reprendre ou arrêter une version.' },
      { icon: 'lock', title: 'Certificats renouvelés', description: 'Renouvelés avant expiration, sans ticket à ouvrir.' },
      { icon: 'check', title: 'Les majeures vous appartiennent', description: 'Nous ne vous faisons jamais passer à une nouvelle version majeure sans votre accord.' },
    ],
    underTheHood: {
      label: 'Comment les déploiements et les restaurations sont pilotés',
      href: '/technology#kubernetes',
      description: 'Un opérateur compare en continu ce que le cluster contient à ce que vous avez demandé.',
    },
  },
  observe: {
    tagline: 'Voyez ce que fait votre connexion',
    hero: {
      title: 'Sachez comment se passe la connexion',
      accent: 'avant que vos utilisateurs ne vous le disent.',
      lead: 'Journaux, usage et activité dans la console. Aucun accès au cluster nécessaire, rien à installer.',
    },
    mock: {
      title: '7 derniers jours',
      caption: 'acme-production',
      rows: [
        { label: 'Personnes connectées', value: '3 204', tone: 'info' },
        { label: 'Connexions réussies', value: '98,7 %', tone: 'ok' },
        { label: 'Tentatives échouées', value: '412', tone: 'warn' },
        { label: 'Santé de l’instance', value: 'Saine', tone: 'ok' },
      ],
    },
    pillars: [
      {
        icon: 'terminal',
        title: 'Journaux en direct dans la console',
        description:
          'Suivez ce que fait l’instance au fur et à mesure, sans kubeconfig ni terminal.',
      },
      {
        icon: 'users',
        title: 'Un usage lisible',
        description:
          'Combien de personnes se sont réellement connectées ce mois-ci, pour choisir la bonne taille avec des faits.',
      },
      {
        icon: 'scroll',
        title: 'L’historique de chaque action',
        description:
          'Qui a changé quoi, et quand. Écrit pour la personne qui devra répondre à une question des mois plus tard.',
      },
    ],
    spotlight: {
      eyebrow: 'Capacité',
      title: 'Repérez une taille devenue trop juste',
      description:
        'Une instance trop petite ralentit d’abord. Vous le voyez dans la console bien avant une panne.',
      points: [
        'L’usage par rapport à votre taille, d’un coup d’œil',
        'La santé de chaque déploiement',
        'Un signal clair quand il est temps de passer à la taille supérieure',
      ],
    },
    grid: [
      { icon: 'activity', title: 'La santé d’un coup d’œil', description: 'Un statut par déploiement.' },
      { icon: 'terminal', title: 'Recherche dans les journaux', description: 'Retrouvez la requête à l’origine d’une réclamation.' },
      { icon: 'users', title: 'Utilisateurs actifs par mois', description: 'Le chiffre qui compte pour dimensionner.' },
      { icon: 'clock', title: 'Changements récents', description: 'Ce qui s’est passé et qui l’a fait.' },
      { icon: 'scroll', title: 'Export d’audit', description: 'Remettez l’historique à qui vous le demande.' },
      { icon: 'zap', title: 'Alertes', description: 'Soyez prévenu quand quelque chose demande une intervention humaine.' },
    ],
    underTheHood: {
      label: 'D’où viennent les données',
      href: '/technology#dataplane',
      description: 'L’agent du plan de données remonte son état au plan de contrôle.',
    },
  },
  secure: {
    tagline: 'Des clés, des accès et une piste d’audit que vous pouvez remettre',
    hero: {
      title: 'Un service d’identité sur lequel',
      accent: 'on peut poser les questions difficiles.',
      lead: 'C’est la première chose qu’un auditeur regarde. Autharie répond clairement sur les clés, les accès réseau, qui peut faire quoi et qui a fait quoi.',
    },
    mock: {
      title: 'Sécurité',
      caption: 'acme-production',
      rows: [
        { label: 'Chiffrement des archives', value: 'Clé v3', tone: 'ok' },
        { label: 'Accès réseau', value: '1 plage autorisée', tone: 'info' },
        { label: 'Invitations en attente', value: '2', tone: 'warn' },
        { label: 'Dernière rotation de clé', value: 'Il y a 12 jours', tone: 'muted' },
      ],
    },
    pillars: [
      {
        icon: 'key',
        title: 'Des clés jamais stockées en clair',
        description:
          'Chaque archive a sa propre clé, protégée par une clé conservée dans un coffre. Une rotation ajoute une version : les anciennes archives restent lisibles.',
      },
      {
        icon: 'network',
        title: 'Vous décidez qui peut y accéder',
        description:
          'N’autorisez que vos propres plages réseau. Les changements s’appliquent sans redéploiement, et la console indique quand l’accès est ouvert.',
      },
      {
        icon: 'users',
        title: 'Des rôles là où ils s’appliquent',
        description:
          'Attribuez des permissions par organisation et par déploiement, de la lecture seule au contrôle total. Les invitations expirent d’elles-mêmes.',
      },
    ],
    spotlight: {
      eyebrow: 'Maîtrise',
      title: 'Vos données restent dans votre périmètre',
      description:
        'Faites tourner Autharie sur un cluster qui vous appartient : les comptes, les sessions et la base de données ne quittent jamais votre infrastructure. Les archives peuvent aller dans un bucket que vous possédez.',
      points: [
        'Gardez les données sur votre propre cluster quand une politique l’exige',
        'Les archives peuvent aller dans un bucket que vous possédez',
        'Une documentation sécurité détaillée pour vos auditeurs',
      ],
    },
    grid: [
      { icon: 'lock', title: 'TLS partout', description: 'Certificats émis et renouvelés pour vous.' },
      { icon: 'network', title: 'Listes d’autorisation', description: 'Limitez qui peut joindre votre instance.' },
      { icon: 'key', title: 'Rotation des clés', description: 'Ajoutez une version sans perdre l’accès au passé.' },
      { icon: 'users', title: 'Rôles à portée limitée', description: 'De la lecture seule au contrôle total.' },
      { icon: 'scroll', title: 'Journal d’audit', description: 'Qui, quoi et quand, pour chaque action.' },
      { icon: 'shield', title: 'Cœur open source', description: 'Le code qui gère votre connexion peut être lu.' },
    ],
    underTheHood: {
      label: 'Pourquoi Rust et l’open source comptent ici',
      href: '/technology#rust',
      description: 'Du code sûr côté mémoire, et des fournisseurs dont vous pouvez auditer les sources.',
    },
  },
  regions: {
    tagline: 'Gardez les données de vos utilisateurs là où elles doivent rester',
    hero: {
      title: 'Notre infrastructure,',
      accent: 'ou la vôtre.',
      lead: 'Démarrez sur les clusters d’Autharie, hébergés chez Scaleway, parce que c’est plus rapide. Passez sur un cluster qui vous appartient quand une politique impose que la base de données reste chez vous. Le produit est le même des deux côtés.',
    },
    mock: {
      title: 'Où cela tourne',
      caption: 'Votre organisation',
      rows: [
        { label: 'eu-paris', value: 'Autharie · partagé', tone: 'info' },
        { label: 'onprem-lyon', value: 'À vous · réservé', tone: 'ok' },
        { label: 'Instances dans eu-paris', value: '2' },
        { label: 'Instances dans onprem-lyon', value: '1' },
      ],
    },
    pillars: [
      {
        icon: 'server',
        title: 'Connectez un cluster en une étape',
        description:
          'Installez un seul paquet sur un cluster que vous exploitez déjà. Il se déclare tout seul et commence à accepter du travail.',
      },
      {
        icon: 'shield',
        title: 'Vos utilisateurs restent chez vous',
        description:
          'Les comptes, les sessions et la base de données vivent dans votre cluster. Autharie envoie des instructions et lit l’état. Elle ne détient jamais vos utilisateurs.',
      },
      {
        icon: 'globe',
        title: 'Des régions que vous nommez',
        description:
          'Déclarez une région, puis choisissez où va chaque instance.',
      },
    ],
    spotlight: {
      eyebrow: 'Partagé ou réservé',
      title: 'Un cluster pour tout le monde, ou rien que pour vous',
      description:
        'Un cluster peut accueillir le travail de n’importe qui sur la plateforme, ou être réservé à une seule organisation et rien d’autre.',
      points: [
        'Scale et au-delà tournent sur un cluster dédié',
        'Changez de région quand les exigences évoluent',
        'Même console, mêmes opérations, où que cela tourne',
      ],
    },
    grid: [
      { icon: 'server', title: 'Apportez votre cluster', description: 'Kubernetes ou k3s, chez OVHcloud, Scaleway, Hetzner, Outscale ou dans vos locaux.' },
      { icon: 'globe', title: 'Plusieurs régions', description: 'Hébergez au plus près des personnes qui se connectent.' },
      { icon: 'lock', title: 'Les données restent chez vous', description: 'La base de données ne quitte jamais votre cluster.' },
      { icon: 'network', title: 'Capacité réservée', description: 'Rien d’autre n’est planifié à côté de vous.' },
      { icon: 'archive', title: 'Votre propre stockage', description: 'Les archives vont dans un bucket qui vous appartient.' },
      { icon: 'check', title: 'Mêmes opérations', description: 'Mises à jour, restaurations et journaux fonctionnent de la même façon.' },
    ],
    underTheHood: {
      label: 'Comment le plan de données et le plan de contrôle communiquent',
      href: '/technology#dataplane',
      description: 'Un petit agent dans votre cluster, et des ressources qui décrivent ce qui doit tourner.',
    },
  },
}
