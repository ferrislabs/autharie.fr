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
]
