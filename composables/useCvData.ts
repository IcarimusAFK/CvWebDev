import { getAllTechnicalSkills, getCvContent } from '~/data/cv'
import { getOngoingProjects } from '~/data/ongoingProjects'
import { getProjects } from '~/data/projects'

export function useCvData() {
  const { locale } = useCvLocale()

  const content = computed(() => getCvContent(locale.value))
  const profile = computed(() => content.value.profile)
  const experiences = computed(() => content.value.experiences)
  const education = computed(() => content.value.education)
  const skills = computed(() => content.value.skills)
  const labels = computed(() => content.value.labels)
  const projects = computed(() => getProjects(locale.value))
  const ongoingProjects = computed(() => getOngoingProjects(locale.value))
  const allTechnicalSkills = computed(() => getAllTechnicalSkills(skills.value))

  return {
    locale,
    content,
    profile,
    experiences,
    education,
    skills,
    labels,
    projects,
    ongoingProjects,
    allTechnicalSkills,
  }
}
