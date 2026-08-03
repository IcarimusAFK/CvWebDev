export type CvLocale = 'fr' | 'en'

export interface CvProfile {
  name: string
  title: string
  location: string
  email: string
  phone: string
  linkedin: string
  github: string
  about: string
  softSkills: { label: string }[]
  languages: { label: string, value: number, level: string }[]
}

export interface CvExperience {
  title: string
  company: string
  date: string
  items: string[]
}

export interface CvEducation {
  title: string
  school: string
  date: string
}

export interface CvSkills {
  frontend: string[]
  backend: string[]
  database: string[]
  tools: string[]
}

export interface CvLabels {
  sections: {
    info: string
    about: string
    softSkills: string
    languages: string
    experience: string
    education: string
    technicalSkills: string
    webProjects: string
  }
  skillCategories: Record<keyof CvSkills, string>
  ui: {
    downloadPdf: string
    downloadAtsPdf: string
    generatePdf: string
    generating: string
    pdfError: string
    atsPdfError: string
    switchToEnglish: string
    switchToFrench: string
    profilePhotoAlt: string
  }
  ats: {
    about: string
    experience: string
    education: string
    technicalSkills: string
    softSkills: string
    languages: string
  }
}

export interface CvContent {
  profile: CvProfile
  experiences: CvExperience[]
  education: CvEducation[]
  skills: CvSkills
  labels: CvLabels
}
