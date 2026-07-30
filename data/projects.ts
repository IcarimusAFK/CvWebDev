import type { CvLocale } from './cv/types'

export interface CvProject {
  title: string
  description: string
  image: string
  url?: string
  technologies: string[]
}

const projectsByLocale: Record<CvLocale, CvProject[]> = {
  fr: [
    {
      title: 'ALMA MATER',
      description: 'CRM/ERP utilisé par 500k utilisateurs dans une dizaine de pays. Développement fullstack, CI/CD et gestion d\'équipe Agile.',
      image: '/projects/almamater.png',
      technologies: ['Vue.js', 'Node.js', 'React', 'Docker'],
    },
    {
      title: 'Jeux de plateaux en ligne',
      description: 'Plateforme de jeux de plateaux en ligne pour 2 joueurs, de la conception Figma à la mise en production.',
      image: '/projects/tabletop.png',
      technologies: ['Vue.js', 'Node.js', 'GitLab CI/CD'],
    },
    {
      title: 'Plateforme Marché de skins Counter-Strike',
      description: 'Plateforme de gestion de marché de skins Counter-Strike, utilisant un LLM pour la récupération des données et l\'analyse des prix',
      image: '/projects/cs2.png',
      technologies: ['Vue.js', 'Node.js', 'OLLAMA', 'Steam API', 'PostgreSQL'],
    },
    {
      title: 'Plateforme Tournoi bar multisport',
      description: 'Plateforme de gestion de tournoi bar multisport, de la conception Figma à la mise en production.',
      image: '/projects/multi-sport-tournament.svg',
      technologies: ['HTML', 'CSS', 'JavaScript'],
    },
    {
      title: 'Sites vitrines pour PME',
      description: 'Sites vitrines pour PME avec design et fonctionnalités de base, de la conception Figma à la mise en production.',
      image: '/projects/ruggeri.png',
      technologies: ['HTML', 'CSS', 'JavaScript'],
    },
  ],
  en: [
    {
      title: 'ALMA MATER',
      description: 'CRM/ERP used by 500k users in a dozen countries. Fullstack development, CI/CD and Agile team management.',
      image: '/projects/almamater.png',
      technologies: ['Vue.js', 'Node.js', 'React', 'Docker'],
    },
    {
      title: 'Tabletop games online platform',
      description: 'Online platform for tabletop games for 2 players, from Figma design to production deployment.',
      image: '/projects/tabletop.png',
      technologies: ['Vue.js', 'Node.js', 'GitLab CI/CD'],
    },
    {
      title: 'Counter-Strike skins market platform',
      description: 'Platform for managing the Counter-Strike skins market, using an LLM to retrieve data and analyze prices',
      image: '/projects/cs2.png',
      technologies: ['Vue.js', 'Node.js', 'OLLAMA', 'Steam API', 'PostgreSQL', 'OpenAI API'],
    },
    {
      title: 'Bar multisport tournament platform',
      description: 'Platform for managing bar multisport tournaments, from Figma design to production deployment.',
      image: '/projects/multi-sport-tournament.svg',
      technologies: ['HTML', 'CSS', 'JavaScript'],
    },
    {
      title: 'SME website',
      description: 'Website for a SME with design and basic features, from Figma design to production deployment.',
      image: '/projects/ruggeri.png',
      technologies: ['HTML', 'CSS', 'JavaScript'],
    },
  ],
}

export function getProjects(locale: CvLocale = 'fr'): CvProject[] {
  return projectsByLocale[locale]
}
