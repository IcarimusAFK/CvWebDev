import { getAllTechnicalSkills, getCvContent } from '~/data/cv'

export function useCvData() {
  const { locale } = useCvLocale()

  const content = computed(() => getCvContent(locale.value))
  const profile = computed(() => content.value.profile)
  const experiences = computed(() => content.value.experiences)
  const education = computed(() => content.value.education)
  const skills = computed(() => content.value.skills)
  const labels = computed(() => content.value.labels)
  const allTechnicalSkills = computed(() => getAllTechnicalSkills(skills.value))

  return {
    locale,
    content,
    profile,
    experiences,
    education,
    skills,
    labels,
    allTechnicalSkills,
  }
}
