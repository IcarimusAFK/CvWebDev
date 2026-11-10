import type { CvLocale } from './cv/types'
import logoMyBusinessSchool from '~/assets/infoProjects/logoMybusinessSchool.png'
import pagescreen from '~/assets/infoProjects/pagescreen.png'
import screenjeu1 from '~/assets/infoProjects/screenjeu1.png'
import screenjeu2 from '~/assets/infoProjects/screenjeu2.png'
import screenjeu3 from '~/assets/infoProjects/screenjeu3.png'

export interface CvOngoingProject {
  title: string
  description: string
  status: string
  logo?: string
  images: string[]
  technologies: string[]
  url?: string
}

const projectImages = [
  pagescreen,
  screenjeu1,
  screenjeu2,
  screenjeu3,
]

const ongoingProjectsByLocale: Record<CvLocale, CvOngoingProject[]> = {
  fr: [
    {
      title: 'My Business School Simulator',
      description: 'Un mois, un défi, un premier jeu PC. Inspiré de mon expérience dans l\'univers des écoles de commerce, My Business School Simulator vous met à la tête de votre propre école supérieure. Recrutez, facturez, encaissez : ici, le diplôme compte moins que le chiffre d\'affaires.',
      status: 'En cours',
      logo: logoMyBusinessSchool,
      images: projectImages,
      technologies: ['Unity', 'C#'],
    },
    {
      title: 'Coach Vocalis',
      description: 'Application permettant de choisir une musique, puis de chanter au micro. Le chant est analysé en temps réel pour indiquer si la note est trop haute ou trop basse. Un projet pensé pour apprendre Rust, un langage qui m\'intéresse beaucoup et qui s\'impose de plus en plus malgré sa jeunesse.',
      status: 'En cours',
      images: [],
      technologies: ['Rust'],
    },
  ],
  en: [
    {
      title: 'My Business School Simulator',
      description: 'One month, one challenge, a first PC game. Inspired by my experience in the world of business schools, My Business School Simulator puts you at the head of your own higher education school. Recruit, invoice, collect: here, the diploma matters less than the revenue.',
      status: 'In progress',
      logo: logoMyBusinessSchool,
      images: projectImages,
      technologies: ['Unity', 'C#'],
    },
    {
      title: 'Vocal Coach',
      description: 'An app that lets you pick a song, then sing into your microphone. Your voice is analyzed in real time to show whether the note is too high or too low. A project built to learn Rust, a language I am very interested in and that is gaining ground fast despite being relatively young.',
      status: 'In progress',
      images: [],
      technologies: ['Rust'],
    },
  ],
}

export function getOngoingProjects(locale: CvLocale = 'fr'): CvOngoingProject[] {
  return ongoingProjectsByLocale[locale]
}
