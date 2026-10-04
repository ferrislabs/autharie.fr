import type { SolutionDef } from './solutions.types'

export const migrateSolutions: SolutionDef[] = [
  {
    slug: 'keycloak',
    group: 'migrate',
    icon: 'rotate',
    products: ['deploy', 'operate', 'observe'],
    copy: {
      en: {
        name: 'Self-hosted Keycloak',
        menu: 'Migrate from self-hosted Keycloak',
        tagline: 'Keep Keycloak, stop operating it',
        hero: {
          title: 'Keep Keycloak,',
          accent: 'hand over the operations.',
          lead: 'Autharie runs Keycloak itself, so your realms and clients carry over naturally. Your team stops handling upgrades, archives and restores, and your applications keep the same protocols.',
        },
        challenges: [
          {
            title: 'Upgrades wait for someone to find the time',
            description:
              'Each new version means reading release notes, testing against your themes and clients, and planning a window. It is easy to fall behind.',
          },
          {
            title: 'Archives and restores are only as good as the last test',
            description:
              'A backup that has never been restored is an assumption. Someone has to schedule it, check it and rehearse the recovery.',
          },
          {
            title: 'The person who knows the setup is also doing other work',
            description:
              'Database, certificates, clustering and tuning sit with a small number of people, next to their main job.',
          },
        ],
        benefits: [
          {
            icon: 'rotate',
            title: 'Realms and clients carry over',
            description:
              'It is the same Keycloak underneath, so the structure you built moves across instead of being rebuilt in another model.',
          },
          {
            icon: 'clock',
            title: 'Upgrades you control',
            description:
              'Maintenance windows and controlled rollouts handle the work. Major versions stay your decision.',
          },
          {
            icon: 'archive',
            title: 'Daily archives, restore to a new instance',
            description:
              'Archives are taken daily and a restore goes into a new instance, so you can check it before you rely on it.',
          },
          {
            icon: 'database',
            title: 'Plain Postgres, no lock-in',
            description:
              'Keycloak is open source and its data sits in plain Postgres, included with the instance. TLS is included too.',
          },
        ],
        steps: [
          {
            title: 'Inventory what you run',
            description:
              'List realms, clients, identity provider links, themes and custom extensions, and note which applications depend on each.',
          },
          {
            title: 'Stand up an instance, staging first',
            description:
              'Create a Keycloak instance in Autharie and bring your realm configuration across. Test your applications against staging before production.',
          },
          {
            title: 'Move users and switch applications',
            description:
              'Bring users across with the realm data. Then move applications one at a time by changing the issuer address and client settings.',
          },
          {
            title: 'Verify, then retire the old server',
            description:
              'Keep the previous Keycloak available until you have checked sign in, tokens and integrations. Switch it off once the cutover holds.',
          },
        ],
      },
      fr: {
        name: 'Keycloak auto-hébergé',
        menu: 'Migrer depuis Keycloak auto-hébergé',
        tagline: 'Gardez Keycloak, arrêtez de l’exploiter',
        hero: {
          title: 'Gardez Keycloak,',
          accent: 'confiez-nous l’exploitation.',
          lead: 'Autharie exploite Keycloak lui-même : vos realms et vos clients se transposent donc naturellement. Votre équipe n’a plus à gérer mises à jour, archives et restaurations, et vos applications gardent les mêmes protocoles.',
        },
        challenges: [
          {
            title: 'Les mises à jour attendent que quelqu’un trouve le temps',
            description:
              'Chaque nouvelle version demande de lire les notes de version, de tester thèmes et clients, et de prévoir une fenêtre. Il est facile de prendre du retard.',
          },
          {
            title: 'Archives et restaurations valent ce que vaut le dernier test',
            description:
              'Une sauvegarde jamais restaurée reste une hypothèse. Quelqu’un doit la planifier, la contrôler et répéter la reprise.',
          },
          {
            title: 'La personne qui connaît la plateforme a aussi d’autres missions',
            description:
              'Base de données, certificats, cluster et réglages reposent sur quelques personnes, en plus de leur travail principal.',
          },
        ],
        benefits: [
          {
            icon: 'rotate',
            title: 'Realms et clients se transposent',
            description:
              'C’est le même Keycloak en dessous : la structure que vous avez construite passe d’un système à l’autre au lieu d’être refaite dans un autre modèle.',
          },
          {
            icon: 'clock',
            title: 'Des mises à jour que vous maîtrisez',
            description:
              'Fenêtres de maintenance et déploiements contrôlés prennent le travail en charge. Les versions majeures restent votre décision.',
          },
          {
            icon: 'archive',
            title: 'Archives quotidiennes, restauration vers une nouvelle instance',
            description:
              'Les archives sont réalisées chaque jour et une restauration se fait dans une nouvelle instance : vous la vérifiez avant de vous y fier.',
          },
          {
            icon: 'database',
            title: 'Postgres classique, sans dépendance',
            description:
              'Keycloak est open source et ses données se trouvent dans un Postgres classique, fourni avec l’instance. Le TLS est inclus lui aussi.',
          },
        ],
        steps: [
          {
            title: 'Faites l’inventaire de l’existant',
            description:
              'Listez realms, clients, liens avec des fournisseurs d’identité, thèmes et extensions, et notez quelles applications dépendent de chacun.',
          },
          {
            title: 'Démarrez une instance, d’abord en préproduction',
            description:
              'Créez une instance Keycloak dans Autharie et reprenez la configuration de vos realms. Testez vos applications en préproduction avant la production.',
          },
          {
            title: 'Déplacez les utilisateurs, basculez les applications',
            description:
              'Reprenez les utilisateurs avec les données du realm. Puis basculez les applications une à une en changeant l’adresse de l’émetteur et les réglages du client.',
          },
          {
            title: 'Vérifiez, puis retirez l’ancien serveur',
            description:
              'Gardez l’ancien Keycloak disponible tant que la connexion, les jetons et les intégrations ne sont pas vérifiés. Éteignez-le une fois la bascule confirmée.',
          },
        ],
      },
    },
  },
  {
    slug: 'auth0',
    group: 'migrate',
    icon: 'rotate',
    products: ['deploy', 'regions', 'operate'],
    copy: {
      en: {
        name: 'Auth0',
        menu: 'Migrate from Auth0',
        tagline: 'Move to an identity provider you can read, on standard protocols',
        hero: {
          title: 'Move from Auth0',
          accent: 'to an identity provider you can read.',
          lead: 'Autharie runs managed Ferriskey or Keycloak, both open source. Your applications keep speaking OIDC and OAuth 2, so the move is mostly a change of address. We help plan and run it.',
        },
        challenges: [
          {
            title: 'Sign in lives in a service you cannot inspect',
            description:
              'When behaviour surprises you, the code behind it is not yours to read, and your data sits where the vendor decided.',
          },
          {
            title: 'Rules and customisations have piled up',
            description:
              'Years of tenant configuration shape how users sign in. Before moving, you need to know what exists and what depends on it.',
          },
          {
            title: 'A move looks like a rewrite of every application',
            description:
              'It does not have to be. Standard protocols mean most applications only need a new issuer address and updated client settings.',
          },
        ],
        benefits: [
          {
            icon: 'plug',
            title: 'Standard protocols',
            description:
              'OIDC and OAuth 2 on both sides. Applications connect by changing an address, not by adopting a new SDK model.',
          },
          {
            icon: 'database',
            title: 'Plain Postgres, no lock-in',
            description:
              'The providers are open source and the data is in plain Postgres. Leaving later is a plan you can write down.',
          },
          {
            icon: 'globe',
            title: 'You choose where data lives',
            description:
              'Run on Autharie clusters in a region you pick, or on a cluster you own, where the data stays.',
          },
          {
            icon: 'scroll',
            title: 'Logs and audit in the console',
            description:
              'Logs, usage and the audit log are in the console, with allow lists and roles per organisation and per deployment.',
          },
        ],
        steps: [
          {
            title: 'Inventory applications and flows',
            description:
              'List every application, its sign in flow, the social and enterprise connections, and the rules or hooks that run at sign in.',
          },
          {
            title: 'Stand up an instance, staging first',
            description:
              'Create a Ferriskey or Keycloak instance and recreate your clients and roles. Test the main flows on staging before touching production.',
          },
          {
            title: 'Move users',
            description:
              'Bring users across with the data your export allows. Password hash portability depends on what the source allows. When hashes cannot move, users set a new password at first sign in.',
          },
          {
            title: 'Switch applications, then retire the old tenant',
            description:
              'Move applications progressively by changing the issuer address and client settings. Keep the old tenant available until the cutover is verified.',
          },
        ],
      },
      fr: {
        name: 'Auth0',
        menu: 'Migrer depuis Auth0',
        tagline: 'Passez à un fournisseur d’identité lisible, sur des protocoles standards',
        hero: {
          title: 'Quittez Auth0',
          accent: 'pour un fournisseur d’identité que vous pouvez lire.',
          lead: 'Autharie exploite Ferriskey ou Keycloak, tous deux open source. Vos applications continuent de parler OIDC et OAuth 2 : le passage revient surtout à changer d’adresse. Nous vous aidons à le planifier et à le mener.',
        },
        challenges: [
          {
            title: 'La connexion vit dans un service que vous ne pouvez pas inspecter',
            description:
              'Quand un comportement vous surprend, le code derrière n’est pas à vous, et vos données se trouvent là où le fournisseur l’a décidé.',
          },
          {
            title: 'Règles et personnalisations se sont accumulées',
            description:
              'Des années de configuration du tenant façonnent la connexion. Avant de migrer, il faut savoir ce qui existe et ce qui en dépend.',
          },
          {
            title: 'Migrer ressemble à une réécriture de chaque application',
            description:
              'Ce n’est pas obligatoire. Avec des protocoles standards, la plupart des applications n’ont besoin que d’une nouvelle adresse d’émetteur et de réglages client à jour.',
          },
        ],
        benefits: [
          {
            icon: 'plug',
            title: 'Des protocoles standards',
            description:
              'OIDC et OAuth 2 des deux côtés. Les applications se connectent en changeant une adresse, sans adopter un nouveau modèle de SDK.',
          },
          {
            icon: 'database',
            title: 'Postgres classique, sans dépendance',
            description:
              'Les fournisseurs sont open source et les données sont dans un Postgres classique. Partir plus tard est un plan que l’on peut écrire.',
          },
          {
            icon: 'globe',
            title: 'Vous choisissez où vivent les données',
            description:
              'Exécutez sur les clusters d’Autharie dans la région de votre choix, ou sur un cluster qui vous appartient, où les données restent.',
          },
          {
            icon: 'scroll',
            title: 'Journaux et audit dans la console',
            description:
              'Journaux, usage et journal d’audit sont dans la console, avec listes d’autorisation et rôles par organisation et par déploiement.',
          },
        ],
        steps: [
          {
            title: 'Faites l’inventaire des applications et des parcours',
            description:
              'Listez chaque application, son parcours de connexion, les connexions sociales et d’entreprise, ainsi que les règles ou hooks exécutés à la connexion.',
          },
          {
            title: 'Démarrez une instance, d’abord en préproduction',
            description:
              'Créez une instance Ferriskey ou Keycloak et recréez vos clients et vos rôles. Testez les parcours principaux en préproduction avant de toucher à la production.',
          },
          {
            title: 'Déplacez les utilisateurs',
            description:
              'Reprenez les utilisateurs avec les données que permet votre export. La portabilité des empreintes de mot de passe dépend de ce que la source autorise. Lorsqu’elles ne peuvent pas être reprises, les utilisateurs définissent un nouveau mot de passe à leur première connexion.',
          },
          {
            title: 'Basculez les applications, puis retirez l’ancien tenant',
            description:
              'Déplacez les applications progressivement en changeant l’adresse de l’émetteur et les réglages du client. Gardez l’ancien tenant disponible jusqu’à la vérification de la bascule.',
          },
        ],
      },
    },
  },
  {
    slug: 'okta',
    group: 'migrate',
    icon: 'rotate',
    products: ['deploy', 'regions', 'secure', 'operate'],
    copy: {
      en: {
        name: 'Okta',
        menu: 'Migrate from Okta',
        tagline: 'Move to managed open source identity, with the location of your data in your hands',
        hero: {
          title: 'Move from Okta',
          accent: 'to open source identity, run for you.',
          lead: 'Autharie runs Ferriskey or Keycloak as a managed service. Applications that use OIDC or OAuth 2 connect by changing an address, and we help plan and run the move.',
        },
        challenges: [
          {
            title: 'Applications are tied in through many integrations',
            description:
              'Sign in is wired into internal tools, customer products and third party services. A move needs a list of what connects where.',
          },
          {
            title: 'Policies grew with the organisation',
            description:
              'Groups, sign on rules and access settings were added over time. Which ones still matter has to be decided before they are rebuilt.',
          },
          {
            title: 'Data location and exit were not part of the first choice',
            description:
              'Today you want to say where identity data lives and how you would move it, and the answer has to be concrete.',
          },
        ],
        benefits: [
          {
            icon: 'plug',
            title: 'OIDC and OAuth 2',
            description:
              'Applications that speak the standards need a new issuer address and updated client settings, not a rewrite.',
          },
          {
            icon: 'server',
            title: 'Your cluster or ours',
            description:
              'Run on Autharie clusters in a region you pick, or on a cluster you own. In that case the data stays there.',
          },
          {
            icon: 'shield',
            title: 'Roles and allow lists',
            description:
              'Roles per organisation and per deployment, allow lists on who can reach the console, and keys wrapped in a vault.',
          },
          {
            icon: 'terminal',
            title: 'Console, API and manifests',
            description:
              'Operate from the console, through the API, or from Kubernetes-style manifests kept next to your code.',
          },
        ],
        steps: [
          {
            title: 'Inventory applications and flows',
            description:
              'List applications, the protocols they use, the groups and policies attached to them, and the people who own each one.',
          },
          {
            title: 'Stand up an instance, staging first',
            description:
              'Create an instance, recreate clients and roles, and validate the main sign in flows on staging before production.',
          },
          {
            title: 'Move users',
            description:
              'Bring users across with what the source allows you to export. Password hash portability depends on the source. When hashes cannot move, users set a new password at first sign in.',
          },
          {
            title: 'Switch applications progressively',
            description:
              'Change the issuer address and client settings one application at a time. Keep Okta available until the cutover is verified, then retire it.',
          },
        ],
      },
      fr: {
        name: 'Okta',
        menu: 'Migrer depuis Okta',
        tagline: 'Passez à une identité open source managée, avec le lieu de vos données entre vos mains',
        hero: {
          title: 'Quittez Okta',
          accent: 'pour une identité open source, exploitée pour vous.',
          lead: 'Autharie exploite Ferriskey ou Keycloak en service managé. Les applications qui utilisent OIDC ou OAuth 2 se connectent en changeant une adresse, et nous vous aidons à planifier et à mener le passage.',
        },
        challenges: [
          {
            title: 'Les applications sont reliées par de nombreuses intégrations',
            description:
              'La connexion est câblée dans des outils internes, des produits clients et des services tiers. Migrer demande la liste de ce qui se connecte à quoi.',
          },
          {
            title: 'Les politiques ont grandi avec l’organisation',
            description:
              'Groupes, règles de connexion et réglages d’accès se sont ajoutés avec le temps. Il faut décider lesquels comptent encore avant de les recréer.',
          },
          {
            title: 'Le lieu des données et la sortie n’étaient pas dans le premier choix',
            description:
              'Aujourd’hui, vous voulez dire où vivent les données d’identité et comment vous les déplaceriez, et la réponse doit être concrète.',
          },
        ],
        benefits: [
          {
            icon: 'plug',
            title: 'OIDC et OAuth 2',
            description:
              'Les applications qui parlent ces standards ont besoin d’une nouvelle adresse d’émetteur et de réglages client à jour, pas d’une réécriture.',
          },
          {
            icon: 'server',
            title: 'Votre cluster ou le nôtre',
            description:
              'Exécutez sur les clusters d’Autharie dans la région de votre choix, ou sur un cluster qui vous appartient. Dans ce cas, les données y restent.',
          },
          {
            icon: 'shield',
            title: 'Rôles et listes d’autorisation',
            description:
              'Des rôles par organisation et par déploiement, des listes d’autorisation pour l’accès à la console, et des clés protégées dans un coffre.',
          },
          {
            icon: 'terminal',
            title: 'Console, API et manifestes',
            description:
              'Pilotez depuis la console, par l’API, ou depuis des manifestes de type Kubernetes conservés à côté de votre code.',
          },
        ],
        steps: [
          {
            title: 'Faites l’inventaire des applications et des parcours',
            description:
              'Listez les applications, les protocoles qu’elles utilisent, les groupes et politiques associés, et les personnes responsables de chacune.',
          },
          {
            title: 'Démarrez une instance, d’abord en préproduction',
            description:
              'Créez une instance, recréez clients et rôles, et validez les principaux parcours de connexion en préproduction avant la production.',
          },
          {
            title: 'Déplacez les utilisateurs',
            description:
              'Reprenez les utilisateurs avec ce que la source permet d’exporter. La portabilité des empreintes de mot de passe dépend de la source. Lorsqu’elles ne peuvent pas être reprises, les utilisateurs définissent un nouveau mot de passe à leur première connexion.',
          },
          {
            title: 'Basculez les applications progressivement',
            description:
              'Changez l’adresse de l’émetteur et les réglages du client application par application. Gardez Okta disponible jusqu’à la vérification de la bascule, puis retirez-le.',
          },
        ],
      },
    },
  },
  {
    slug: 'cognito',
    group: 'migrate',
    icon: 'rotate',
    products: ['deploy', 'regions', 'observe'],
    copy: {
      en: {
        name: 'AWS Cognito',
        menu: 'Migrate from AWS Cognito',
        tagline: 'Move to an identity provider you can read, outside a single cloud account',
        hero: {
          title: 'Move from AWS Cognito',
          accent: 'to identity that is not tied to one cloud.',
          lead: 'Autharie runs Ferriskey or Keycloak for you on standard protocols and plain Postgres. Your applications switch by changing an address, and we help plan and run the move.',
        },
        challenges: [
          {
            title: 'Sign in is tied to one cloud account',
            description:
              'User pools, triggers and IAM links make identity part of a single provider. Moving elsewhere feels like moving everything.',
          },
          {
            title: 'Behaviour is hard to see from the outside',
            description:
              'When a sign in fails, finding the reason means piecing together several services and their logs.',
          },
          {
            title: 'Customisation lives in functions around the pool',
            description:
              'Triggers and glue code shape the flow. They need to be listed and understood before they are replaced.',
          },
        ],
        benefits: [
          {
            icon: 'plug',
            title: 'Standard protocols',
            description:
              'OIDC and OAuth 2 mean applications connect by changing the issuer address and client settings.',
          },
          {
            icon: 'database',
            title: 'Plain Postgres, no lock-in',
            description:
              'Open source providers over plain Postgres. The data model is one you can read and take elsewhere.',
          },
          {
            icon: 'activity',
            title: 'Logs and usage in one place',
            description:
              'Logs, usage and the audit log are in the console, so tracing a sign in does not mean opening several services.',
          },
          {
            icon: 'globe',
            title: 'Your region, your cluster',
            description:
              'Pick a region on Autharie clusters, or run on a cluster you own. When you own it, the data stays on it.',
          },
        ],
        steps: [
          {
            title: 'Inventory pools, apps and triggers',
            description:
              'List user pools, app clients, federated providers and the triggers that run at each step of sign in.',
          },
          {
            title: 'Stand up an instance, staging first',
            description:
              'Create an instance, recreate clients and roles, and port the logic your triggers carried. Validate on staging.',
          },
          {
            title: 'Move users',
            description:
              'Bring users across with what the source lets you export. Password hash portability depends on what the source allows. When hashes cannot move, users set a new password at first sign in.',
          },
          {
            title: 'Switch applications, keep the old pool until verified',
            description:
              'Change the issuer address and client settings application by application. Keep the existing user pool available until the cutover is verified.',
          },
        ],
      },
      fr: {
        name: 'AWS Cognito',
        menu: 'Migrer depuis AWS Cognito',
        tagline: 'Passez à un fournisseur d’identité lisible, qui n’est plus lié à un seul compte cloud',
        hero: {
          title: 'Quittez AWS Cognito',
          accent: 'pour une identité qui ne dépend pas d’un seul cloud.',
          lead: 'Autharie exploite Ferriskey ou Keycloak pour vous, sur des protocoles standards et un Postgres classique. Vos applications basculent en changeant une adresse, et nous vous aidons à planifier et à mener le passage.',
        },
        challenges: [
          {
            title: 'La connexion est liée à un seul compte cloud',
            description:
              'User pools, triggers et liens IAM font de l’identité une partie d’un seul fournisseur. Aller ailleurs donne l’impression de tout déplacer.',
          },
          {
            title: 'Le comportement est difficile à observer de l’extérieur',
            description:
              'Quand une connexion échoue, trouver la raison oblige à recouper plusieurs services et leurs journaux.',
          },
          {
            title: 'La personnalisation vit dans des fonctions autour du pool',
            description:
              'Triggers et code de liaison façonnent le parcours. Il faut les lister et les comprendre avant de les remplacer.',
          },
        ],
        benefits: [
          {
            icon: 'plug',
            title: 'Des protocoles standards',
            description:
              'Avec OIDC et OAuth 2, les applications se connectent en changeant l’adresse de l’émetteur et les réglages du client.',
          },
          {
            icon: 'database',
            title: 'Postgres classique, sans dépendance',
            description:
              'Des fournisseurs open source au-dessus d’un Postgres classique. Un modèle de données que vous pouvez lire et emporter ailleurs.',
          },
          {
            icon: 'activity',
            title: 'Journaux et usage au même endroit',
            description:
              'Journaux, usage et journal d’audit sont dans la console : suivre une connexion n’oblige plus à ouvrir plusieurs services.',
          },
          {
            icon: 'globe',
            title: 'Votre région, votre cluster',
            description:
              'Choisissez une région sur les clusters d’Autharie, ou exécutez sur un cluster qui vous appartient. Dans ce cas, les données y restent.',
          },
        ],
        steps: [
          {
            title: 'Faites l’inventaire des pools, applications et triggers',
            description:
              'Listez les user pools, les clients d’application, les fournisseurs fédérés et les triggers exécutés à chaque étape de la connexion.',
          },
          {
            title: 'Démarrez une instance, d’abord en préproduction',
            description:
              'Créez une instance, recréez clients et rôles, et reportez la logique portée par vos triggers. Validez en préproduction.',
          },
          {
            title: 'Déplacez les utilisateurs',
            description:
              'Reprenez les utilisateurs avec ce que la source permet d’exporter. La portabilité des empreintes de mot de passe dépend de ce que la source autorise. Lorsqu’elles ne peuvent pas être reprises, les utilisateurs définissent un nouveau mot de passe à leur première connexion.',
          },
          {
            title: 'Basculez les applications, gardez l’ancien pool jusqu’à vérification',
            description:
              'Changez l’adresse de l’émetteur et les réglages du client application par application. Gardez le user pool existant disponible jusqu’à la vérification de la bascule.',
          },
        ],
      },
    },
  },
  {
    slug: 'firebase-auth',
    group: 'migrate',
    icon: 'rotate',
    products: ['deploy', 'regions', 'operate'],
    copy: {
      en: {
        name: 'Firebase Authentication',
        menu: 'Migrate from Firebase Authentication',
        tagline: 'Grow from app-level sign in to a full identity provider on standard protocols',
        hero: {
          title: 'Move from Firebase Authentication',
          accent: 'to a full identity provider.',
          lead: 'Autharie runs Ferriskey or Keycloak for you. Sign in moves from an SDK to OIDC and OAuth 2, with roles, organisations and an audit log. We help plan and run the move.',
        },
        challenges: [
          {
            title: 'Sign in is built into each client app',
            description:
              'Web and mobile apps call a vendor SDK directly. Changing the provider means touching every client and shipping new releases.',
          },
          {
            title: 'Needs outgrew simple accounts',
            description:
              'Organisations, roles, single sign on between products and an audit trail ask for more than a user list.',
          },
          {
            title: 'Mobile releases move slowly',
            description:
              'Users keep old app versions for a long time, so the move has to coexist with versions already installed.',
          },
        ],
        benefits: [
          {
            icon: 'plug',
            title: 'Standard protocols',
            description:
              'OIDC and OAuth 2 work with common libraries on web and mobile, and across the products you add later.',
          },
          {
            icon: 'users',
            title: 'Roles per organisation',
            description:
              'Roles per organisation and per deployment, with one identity provider shared across your products.',
          },
          {
            icon: 'scroll',
            title: 'Audit log and allow lists',
            description:
              'Administrative actions are recorded in the console, and allow lists restrict who can reach it.',
          },
          {
            icon: 'database',
            title: 'Plain Postgres, no lock-in',
            description:
              'Open source providers over plain Postgres, with TLS and daily archives included. Staging runs next to production.',
          },
        ],
        steps: [
          {
            title: 'Inventory apps and sign in methods',
            description:
              'List web and mobile apps, the methods users sign in with, and the app versions still in circulation.',
          },
          {
            title: 'Stand up an instance, staging first',
            description:
              'Create an instance, configure clients and roles, and validate each sign in method on staging.',
          },
          {
            title: 'Move users',
            description:
              'Bring users across with what the source lets you export. Password hash portability depends on what the source allows. When hashes cannot move, users set a new password at first sign in.',
          },
          {
            title: 'Switch apps progressively',
            description:
              'Move each app to OIDC by changing the issuer address and client settings. Keep Firebase Authentication available until the cutover is verified.',
          },
        ],
      },
      fr: {
        name: 'Firebase Authentication',
        menu: 'Migrer depuis Firebase Authentication',
        tagline: 'Passez d’une connexion intégrée à l’application à un fournisseur d’identité complet, sur des protocoles standards',
        hero: {
          title: 'Quittez Firebase Authentication',
          accent: 'pour un fournisseur d’identité complet.',
          lead: 'Autharie exploite Ferriskey ou Keycloak pour vous. La connexion passe d’un SDK à OIDC et OAuth 2, avec rôles, organisations et journal d’audit. Nous vous aidons à planifier et à mener le passage.',
        },
        challenges: [
          {
            title: 'La connexion est intégrée à chaque application cliente',
            description:
              'Les applications web et mobiles appellent directement le SDK d’un fournisseur. Changer de fournisseur oblige à toucher chaque client et à publier de nouvelles versions.',
          },
          {
            title: 'Les besoins dépassent de simples comptes',
            description:
              'Organisations, rôles, authentification unique entre produits et piste d’audit demandent plus qu’une liste d’utilisateurs.',
          },
          {
            title: 'Les versions mobiles évoluent lentement',
            description:
              'Les utilisateurs gardent longtemps d’anciennes versions de l’application : le passage doit coexister avec celles déjà installées.',
          },
        ],
        benefits: [
          {
            icon: 'plug',
            title: 'Des protocoles standards',
            description:
              'OIDC et OAuth 2 fonctionnent avec les bibliothèques courantes sur le web et le mobile, et avec les produits que vous ajouterez.',
          },
          {
            icon: 'users',
            title: 'Des rôles par organisation',
            description:
              'Des rôles par organisation et par déploiement, avec un seul fournisseur d’identité partagé entre vos produits.',
          },
          {
            icon: 'scroll',
            title: 'Journal d’audit et listes d’autorisation',
            description:
              'Les actions d’administration sont enregistrées dans la console et les listes d’autorisation limitent qui peut y accéder.',
          },
          {
            icon: 'database',
            title: 'Postgres classique, sans dépendance',
            description:
              'Des fournisseurs open source au-dessus d’un Postgres classique, avec TLS et archives quotidiennes inclus. La préproduction tourne à côté de la production.',
          },
        ],
        steps: [
          {
            title: 'Faites l’inventaire des applications et des modes de connexion',
            description:
              'Listez les applications web et mobiles, les modes de connexion des utilisateurs et les versions d’application encore en circulation.',
          },
          {
            title: 'Démarrez une instance, d’abord en préproduction',
            description:
              'Créez une instance, configurez clients et rôles, et validez chaque mode de connexion en préproduction.',
          },
          {
            title: 'Déplacez les utilisateurs',
            description:
              'Reprenez les utilisateurs avec ce que la source permet d’exporter. La portabilité des empreintes de mot de passe dépend de ce que la source autorise. Lorsqu’elles ne peuvent pas être reprises, les utilisateurs définissent un nouveau mot de passe à leur première connexion.',
          },
          {
            title: 'Basculez les applications progressivement',
            description:
              'Faites passer chaque application à OIDC en changeant l’adresse de l’émetteur et les réglages du client. Gardez Firebase Authentication disponible jusqu’à la vérification de la bascule.',
          },
        ],
      },
    },
  },
]
