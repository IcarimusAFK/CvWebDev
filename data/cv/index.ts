import { enCv } from './en'
import { frCv } from './fr'
import type { CvContent, CvLocale } from './types'

export type { CvContent, CvLocale, CvProfile, CvExperience, CvEducation, CvSkills, CvLabels } from './types'

const contentByLocale: Record<CvLocale, CvContent> = {
  fr: frCv,
  en: enCv,
}

export function getCvContent(locale: CvLocale = 'fr'): CvContent {
  return contentByLocale[locale]
}

export function parseCvLocale(value: unknown): CvLocale {
  return value === 'en' ? 'en' : 'fr'
}

export function getAllTechnicalSkills(skills: CvContent['skills']) {
  return [
    ...skills.frontend,
    ...skills.backend,
    ...skills.database,
    ...skills.tools,
  ]
}
