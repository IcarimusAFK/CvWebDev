import { getAllTechnicalSkills } from './cv'
import { frCv } from './cv/fr'

export const skills = frCv.skills
export const allTechnicalSkills = getAllTechnicalSkills(frCv.skills)
