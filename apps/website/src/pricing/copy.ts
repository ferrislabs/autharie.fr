import type { Locale } from '../i18n'

export interface PlanCopy {
  name: string
  tagline: string
  features: { text: string; engine?: 'ferriskey' }[]
}

export interface PricingCopy {
  hero: { eyebrow: string; h1a: string; h1b: string; lead: string }
  steps: { mode: string; engine: string; volume: string; plan: string }
  modes: {
    managed: { name: string; tag: string; description: string }
    byoc: { name: string; tag: string; description: string }
  }
  inCluster: { text: string; button: string }
  engines: {
    ferriskey: { name: string; badge: string; badge2: string; points: string[] }
    keycloak: { name: string; badge: string; description: string; warning: string }
  }
  volume: {
    label: string
    accounts: string
    unit: string
    freeNote: string
    keycloakNoFree: string
    starterLimit: string
    businessFloor: string
  }
  keycloakAlert: { title: string; intro: string; switch: string }
  byocBox: { title: string; text: string }
  plans: {
    managed: Record<'starter' | 'business' | 'scale', PlanCopy>
    byoc: Record<'starter' | 'business' | 'scale', PlanCopy>
  }
  card: {
    recommended: string
    select: string
    selected: string
    free: string
    perMonth: string
    notAvailable: string
    notOnKeycloak: string
    unavailable: string
  }
  recap: {
    title: string
    mode: string
    engine: string
    accounts: string
    unlimited: string
    plan: string
    total: string
    vat: string
    discovery: string
    startFree: string
    deploy: string
    earlyAccess: string
    short: { startFree: string; deploy: string; earlyAccess: string }
    summary: (parts: { mode: string; engine: string; volume: string; plan: string; total: string }) => string
  }
  tco: {
    eyebrow: string
    title: string
    lead: string
    salary: string
    salaryHelp: string
    time: string
    timeHelp: string
    ha: string
    haHelp: string
    onCall: string
    onCallHelp: string
    majors: string
    majorsHelp: string
    cve: string
    cveHelp: string
    internal: string
    autharie: string
    perMonth: string
    configured: string
    savings: string
    perYear: string
    hours: (n: string) => string
    noSaving: string
    assumptions: string
    bar: { internal: string; autharie: string; saves: string; perMonth: string; perYear: string }
  }
}

const fr: PricingCopy = {
  hero: {
    eyebrow: 'Tarifs',
    h1a: 'Des tarifs lisibles,',
    h1b: 'quel que soit votre mode de déploiement.',
    lead: 'Choisissez où tourne votre IAM, avec quel moteur, et pour combien de comptes. Le prix se recalcule en direct, et vous pouvez le comparer à ce que coûte de l’exploiter vous-même.',
  },
  steps: { mode: 'Mode de déploiement', engine: 'Moteur IAM', volume: 'Volume de comptes actifs', plan: 'Offre' },
  modes: {
    managed: {
      name: 'Fully Managed',
      tag: 'Clé en main',
      description: 'Hébergé par Autharie sur nos clouds partenaires. Zéro infrastructure à gérer, zéro maintenance ops.',
    },
    byoc: {
      name: 'BYOC',
      tag: 'Bring Your Own Cloud',
      description:
        'Déployé directement sur votre compte cloud (OVHcloud, Scaleway). Vous gardez la souveraineté totale de vos données, nous orchestrons la plateforme.',
    },
  },
  inCluster: {
    text: 'Vous avez déjà votre propre cluster Kubernetes ? Découvrez nos options sur mesure.',
    button: 'Nous contacter',
  },
  engines: {
    ferriskey: {
      name: 'FerrisKey',
      badge: 'Recommandé',
      badge2: 'Cloud-Native & ultra-léger',
      points: [
        'Découverte gratuite jusqu’à 1 000 comptes',
        'Performances optimales',
        'Fonctionnalités exclusives incluses : analytics temps réel Quickwit, autorisations distribuées ReBAC, passerelle MCP pour agents IA',
      ],
    },
    keycloak: {
      name: 'Keycloak',
      badge: '+30 % de surcoût d’infrastructure',
      description: 'Moteur historique basé sur la JVM, qui demande plus de mémoire et de calcul.',
      warning: 'Les modules ReBAC distribué et MCP Hub ne sont pas disponibles sur ce moteur.',
    },
  },
  volume: {
    label: 'Comptes actifs',
    accounts: 'comptes',
    unit: 'par mois',
    freeNote: 'Découverte : gratuit jusqu’à 1 000 comptes avec FerrisKey.',
    keycloakNoFree: 'L’offre gratuite est réservée au moteur FerrisKey. Avec Keycloak, le tarif démarre à 49 € par mois.',
    starterLimit: 'Starter s’arrête à 25 000 comptes.',
    businessFloor: 'Business démarre au tarif du palier 10 000 comptes.',
  },
  keycloakAlert: {
    title: 'Avec Keycloak, certaines fonctionnalités ne sont pas disponibles',
    intro: 'Ces fonctionnalités des offres ci-dessous ne sont pas incluses avec ce moteur :',
    switch: 'Passer à FerrisKey',
  },
  byocBox: {
    title: 'Utilisateurs illimités',
    text: 'Vous payez votre infrastructure directement à votre fournisseur cloud. Autharie facture un forfait fixe pour le plan de contrôle et l’orchestration, quel que soit le nombre de comptes.',
  },
  plans: {
    managed: {
      starter: {
        name: 'Starter',
        tagline: 'Idéal pour un MVP ou des applications internes.',
        features: [
          { text: 'Disponibilité 99 %' },
          { text: 'Support par e-mail, J+1 ouvré (au mieux)' },
          { text: 'Historique d’audit : 7 jours' },
          { text: 'Mises à jour en 1 clic, avec retour arrière' },
        ],
      },
      business: {
        name: 'Business',
        tagline: 'Pour les produits en production.',
        features: [
          { text: 'Disponibilité 99,5 %' },
          { text: 'Support prioritaire garanti (moins de 4 h)' },
          { text: 'Sandbox de staging éphémère : un environnement de test en 1 clic, sur une copie des données, pour valider les changements et les montées de version avant la production' },
          { text: 'Audit et analytics : 30 jours (Quickwit / Datafusion managé)' },
          { text: 'Autorisations distribuées (ReBAC) incluses', engine: 'ferriskey' },
          { text: 'Passerelle MCP (IA et agents) incluse', engine: 'ferriskey' },
        ],
      },
      scale: {
        name: 'Scale',
        tagline: 'Pour aller plus loin, avec le support le plus élevé.',
        features: [
          { text: 'Disponibilité 99,9 %, multi-AZ, haute disponibilité' },
          { text: 'Support le plus élevé : canal Slack ou Teams dédié, astreinte critique 24/7 (moins de 1 h)' },
          { text: 'Sandboxes de staging illimitées, avec clonage automatisé' },
          { text: 'Analyses avancées : recherche dans tous les logs d’audit et de connexion, tableaux de bord d’usage' },
          { text: 'Rétention d’audit de 90 à 365 jours, et exports de conformité' },
          { text: 'Autorisations distribuées (ReBAC) incluses', engine: 'ferriskey' },
          { text: 'Passerelle MCP (IA et agents) incluse', engine: 'ferriskey' },
        ],
      },
    },
    byoc: {
      starter: {
        name: 'BYOC Starter',
        tagline: 'Le plan de contrôle chez nous, les données chez vous.',
        features: [
          { text: 'Disponibilité du plan de contrôle 99 %' },
          { text: 'Support par e-mail' },
          { text: 'Export brut des logs' },
        ],
      },
      business: {
        name: 'BYOC Business',
        tagline: 'Pour la production sur votre cloud.',
        features: [
          { text: 'Disponibilité du plan de contrôle 99,5 %' },
          { text: 'Support en moins de 4 h' },
          { text: 'Sandbox de staging éphémère, orchestrée sur votre cloud' },
          { text: 'Déploiement managé de Quickwit sur votre compte' },
          { text: 'ReBAC et MCP inclus', engine: 'ferriskey' },
        ],
      },
      scale: {
        name: 'BYOC Scale',
        tagline: 'Plusieurs clusters, le support le plus élevé.',
        features: [
          { text: 'Disponibilité du plan de contrôle 99,9 %' },
          { text: 'Multi-clusters' },
          { text: 'Support 24/7, avec canal dédié' },
          { text: 'Sandboxes de staging illimitées, orchestrées sur vos clouds' },
          { text: 'Analyses avancées : recherche dans tous les logs, tableaux de bord d’usage' },
          { text: 'Déploiements canari automatisés' },
          { text: 'ReBAC et MCP inclus', engine: 'ferriskey' },
        ],
      },
    },
  },
  card: {
    recommended: 'Recommandé',
    select: 'Choisir cette offre',
    selected: 'Offre choisie',
    free: 'Gratuit',
    perMonth: 'par mois HT',
    notAvailable: 'Non disponible',
    notOnKeycloak: 'Non disponible avec Keycloak',
    unavailable: 'Jusqu’à 25 000 comptes. Au-delà, choisissez Business.',
  },
  recap: {
    title: 'Récapitulatif de ma configuration',
    mode: 'Mode de déploiement',
    engine: 'Moteur',
    accounts: 'Comptes actifs',
    unlimited: 'Illimités',
    plan: 'Offre',
    total: 'Total mensuel HT',
    vat: 'HT, hors taxes.',
    discovery: 'Offre de découverte',
    startFree: 'Commencer l’essai gratuit',
    deploy: 'Déployer mon instance',
    earlyAccess: 'Demander l’accès anticipé',
    short: { startFree: 'Essai gratuit', deploy: 'Déployer', earlyAccess: 'Accès anticipé' },
    summary: ({ mode, engine, volume, plan, total }) =>
      `Ma configuration : ${mode}, ${engine}, ${volume}, offre ${plan}, ${total} par mois HT.`,
  },
  tco: {
    eyebrow: 'Comparateur',
    title: 'Gérer soi-même, ou choisir Autharie ?',
    lead: 'Si vous envisagez de monter un Keycloak en interne, voici ce que cela coûte vraiment, avec vos propres chiffres, face à la configuration choisie plus haut.',
    salary: 'Salaire annuel chargé du profil DevOps ou SRE',
    salaryHelp: 'Le coût total employeur d’une personne qui s’en occuperait.',
    time: 'Temps consacré à l’IAM',
    timeHelp: 'En pourcentage d’un temps plein : surveillance, correctifs de sécurité, réglage de la base de données.',
    ha: 'Haute disponibilité (multi-AZ)',
    haHelp: '+200 € par mois d’infrastructure : serveurs et base répliquée.',
    onCall: 'Astreinte 24/7 interne',
    onCallHelp: '+800 € par mois d’indemnités et d’astreinte d’équipe.',
    majors: 'Changements majeurs et montées de version',
    majorsHelp: '+4 jours d’ingénierie par an pour valider les migrations sans casser la production.',
    cve: 'Réponse aux failles de sécurité (CVE) en urgence',
    cveHelp: '+2 jours d’intervention imprévue par an.',
    internal: 'Coût mensuel estimé en interne',
    autharie: 'Coût Autharie',
    perMonth: 'par mois',
    configured: 'La configuration choisie plus haut',
    savings: 'Économie estimée',
    perYear: 'par an',
    hours: (n) => `Vous gagnez environ ${n} heures d’ingénierie par an pour vous concentrer sur votre produit.`,
    noSaving:
      'Avec ces paramètres, l’exploitation interne coûte moins cher sur le papier. Elle ne compte pas le coût d’un incident, d’une mise à jour ratée ou d’une personne qui part.',
    assumptions: 'Estimation à partir de vos paramètres et de 220 jours travaillés par an. Ce n’est pas un devis.',
    bar: { internal: 'En interne', autharie: 'Autharie', saves: 'Économie', perMonth: '/mois', perYear: '/an' },
  },
}

const en: PricingCopy = {
  hero: {
    eyebrow: 'Pricing',
    h1a: 'Clear pricing,',
    h1b: 'whichever way you deploy.',
    lead: 'Choose where your IAM runs, on which engine, and for how many accounts. The price updates as you go, and you can compare it with running it yourself.',
  },
  steps: { mode: 'Deployment mode', engine: 'IAM engine', volume: 'Active accounts', plan: 'Plan' },
  modes: {
    managed: {
      name: 'Fully Managed',
      tag: 'Turnkey',
      description: 'Hosted by Autharie on our partner clouds. No infrastructure to run, no ops maintenance.',
    },
    byoc: {
      name: 'BYOC',
      tag: 'Bring Your Own Cloud',
      description:
        'Deployed straight into your cloud account (OVHcloud, Scaleway). You keep full sovereignty over your data, we orchestrate the platform.',
    },
  },
  inCluster: {
    text: 'Already have your own Kubernetes cluster? See our tailored options.',
    button: 'Contact us',
  },
  engines: {
    ferriskey: {
      name: 'FerrisKey',
      badge: 'Recommended',
      badge2: 'Cloud-native & ultra-light',
      points: [
        'Free to discover, up to 1,000 accounts',
        'Best performance',
        'Exclusive features included: real-time Quickwit analytics, distributed ReBAC authorisations, MCP gateway for AI agents',
      ],
    },
    keycloak: {
      name: 'Keycloak',
      badge: '+30% infrastructure cost',
      description: 'The historical JVM-based engine, which needs more memory and compute.',
      warning: 'Distributed ReBAC and the MCP Hub are not available on this engine.',
    },
  },
  volume: {
    label: 'Active accounts',
    accounts: 'accounts',
    unit: 'per month',
    freeNote: 'Discovery: free up to 1,000 accounts with FerrisKey.',
    keycloakNoFree: 'The free offer is reserved for the FerrisKey engine. With Keycloak, pricing starts at €49 a month.',
    starterLimit: 'Starter stops at 25,000 accounts.',
    businessFloor: 'Business starts at the price of the 10,000 accounts tier.',
  },
  keycloakAlert: {
    title: 'With Keycloak, some features are not available',
    intro: 'These features of the plans below are not included with this engine:',
    switch: 'Switch to FerrisKey',
  },
  byocBox: {
    title: 'Unlimited users',
    text: 'You pay your infrastructure directly to your cloud provider. Autharie charges a fixed fee for the control plane and the orchestration, whatever the number of accounts.',
  },
  plans: {
    managed: {
      starter: {
        name: 'Starter',
        tagline: 'Ideal for an MVP or internal applications.',
        features: [
          { text: '99% availability' },
          { text: 'Email support, next business day (best effort)' },
          { text: 'Audit history: 7 days' },
          { text: 'One-click updates, with rollback' },
        ],
      },
      business: {
        name: 'Business',
        tagline: 'For products in production.',
        features: [
          { text: '99.5% availability' },
          { text: 'Guaranteed priority support (under 4 h)' },
          { text: 'Ephemeral staging sandbox: a test environment in one click, on a copy of your data, to validate breaking changes and version upgrades before production' },
          { text: 'Audit and analytics: 30 days (managed Quickwit / Datafusion)' },
          { text: 'Distributed authorisations (ReBAC) included', engine: 'ferriskey' },
          { text: 'MCP gateway (AI and agents) included', engine: 'ferriskey' },
        ],
      },
      scale: {
        name: 'Scale',
        tagline: 'To go further, with the highest level of support.',
        features: [
          { text: '99.9% availability, multi-AZ, high availability' },
          { text: 'Highest support: dedicated Slack or Teams channel, critical 24/7 on-call (under 1 h)' },
          { text: 'Unlimited staging sandboxes, with automated cloning' },
          { text: 'Advanced analytics: search across all audit and sign-in logs, usage dashboards' },
          { text: 'Audit retention from 90 to 365 days, and compliance exports' },
          { text: 'Distributed authorisations (ReBAC) included', engine: 'ferriskey' },
          { text: 'MCP gateway (AI and agents) included', engine: 'ferriskey' },
        ],
      },
    },
    byoc: {
      starter: {
        name: 'BYOC Starter',
        tagline: 'The control plane with us, the data with you.',
        features: [
          { text: '99% control plane availability' },
          { text: 'Email support' },
          { text: 'Raw log export' },
        ],
      },
      business: {
        name: 'BYOC Business',
        tagline: 'For production in your cloud.',
        features: [
          { text: '99.5% control plane availability' },
          { text: 'Support in under 4 h' },
          { text: 'Ephemeral staging sandbox, orchestrated in your cloud' },
          { text: 'Managed Quickwit deployment in your account' },
          { text: 'ReBAC and MCP included', engine: 'ferriskey' },
        ],
      },
      scale: {
        name: 'BYOC Scale',
        tagline: 'Several clusters, the highest level of support.',
        features: [
          { text: '99.9% control plane availability' },
          { text: 'Multi-cluster' },
          { text: '24/7 support, with a dedicated channel' },
          { text: 'Unlimited staging sandboxes, orchestrated in your clouds' },
          { text: 'Advanced analytics: search across all logs, usage dashboards' },
          { text: 'Automated canary deployments' },
          { text: 'ReBAC and MCP included', engine: 'ferriskey' },
        ],
      },
    },
  },
  card: {
    recommended: 'Recommended',
    select: 'Choose this plan',
    selected: 'Plan selected',
    free: 'Free',
    perMonth: 'per month, excl. VAT',
    notAvailable: 'Not available',
    notOnKeycloak: 'Not available with Keycloak',
    unavailable: 'Up to 25,000 accounts. Beyond that, choose Business.',
  },
  recap: {
    title: 'My configuration',
    mode: 'Deployment mode',
    engine: 'Engine',
    accounts: 'Active accounts',
    unlimited: 'Unlimited',
    plan: 'Plan',
    total: 'Monthly total, excl. VAT',
    vat: 'Excluding VAT.',
    discovery: 'Discovery plan',
    startFree: 'Start the free trial',
    deploy: 'Deploy my instance',
    earlyAccess: 'Request early access',
    short: { startFree: 'Free trial', deploy: 'Deploy', earlyAccess: 'Early access' },
    summary: ({ mode, engine, volume, plan, total }) =>
      `My configuration: ${mode}, ${engine}, ${volume}, ${plan} plan, ${total} per month excl. VAT.`,
  },
  tco: {
    eyebrow: 'Comparison',
    title: 'Run it yourself, or choose Autharie?',
    lead: 'If you are thinking of setting up Keycloak in house, here is what it really costs, with your own numbers, next to the configuration you chose above.',
    salary: 'Loaded yearly salary of the DevOps or SRE profile',
    salaryHelp: 'The full employer cost of the person who would look after it.',
    time: 'Time spent on the IAM',
    timeHelp: 'As a share of a full-time position: monitoring, security patches, database tuning.',
    ha: 'High availability (multi-AZ)',
    haHelp: '+€200 a month of infrastructure: servers and a replicated database.',
    onCall: 'In-house 24/7 on-call',
    onCallHelp: '+€800 a month in on-call allowances for the team.',
    majors: 'Breaking changes and major upgrades',
    majorsHelp: '+4 engineering days a year to validate migrations without breaking production.',
    cve: 'Emergency response to security flaws (CVE)',
    cveHelp: '+2 days of unplanned work a year.',
    internal: 'Estimated in-house monthly cost',
    autharie: 'Autharie cost',
    perMonth: 'per month',
    configured: 'The configuration chosen above',
    savings: 'Estimated savings',
    perYear: 'per year',
    hours: (n) => `You free up about ${n} engineering hours a year to focus on your own product.`,
    noSaving:
      'With these settings, running it in house costs less on paper. It does not count the cost of an incident, a failed upgrade or someone leaving.',
    assumptions: 'An estimate from your settings and 220 working days a year. It is not a quote.',
    bar: { internal: 'In house', autharie: 'Autharie', saves: 'Savings', perMonth: '/mo', perYear: '/yr' },
  },
}

export const pricingCopy: Record<Locale, PricingCopy> = { fr, en }
