<script setup lang="ts">
import type { CvSkills } from '~/data/cv'

const { skills, labels } = useCvData()

const skillIcons: Record<string, string> = {
  'Vue.js': 'vuedotjs',
  'React': 'react',
  'Nuxt': 'nuxt',
  'JavaScript': 'javascript',
  'TypeScript': 'typescript',
  'HTML5': 'html5',
  'CSS3': 'css',
  'Node.js': 'nodedotjs',
  'Express': 'express/white',
  'Laravel': 'laravel',
  'PHP': 'php',
  'Python': 'python',
  'MySQL': 'mysql',
  'PostgreSQL': 'postgresql',
  'MongoDB': 'mongodb',
  'Git': 'git',
  'GitHub': 'github',
  'Docker': 'docker',
  'VS Code': 'vscodium',
  'Cursor': 'cursor',
  'Linux': 'linux/black',
  'Figma': 'figma',
  'Photoshop': 'photopea/red',
  'REST/API': 'gitconnected',
}

function getSkillIconUrl(skill: string) {
  const slug = skillIcons[skill]
  if (!slug) return null
  return `https://cdn.simpleicons.org/${slug}`
}

function getCategoryLabel(category: keyof CvSkills) {
  return labels.value.skillCategories[category]
}

const failedSkillIcons = ref(new Set<string>())

function onSkillIconError(skill: string) {
  failedSkillIcons.value = new Set(failedSkillIcons.value).add(skill)
}

function hasSkillIcon(skill: string) {
  return Boolean(getSkillIconUrl(skill)) && !failedSkillIcons.value.has(skill)
}
</script>

<template>
  <CvSectionCard class="cv-skills-section">
    <CvSectionTitle
      icon="technical-skills"
      class="text-glow text-2xl sm:text-3xl font-bold mb-6 sm:mb-8"
    >
      {{ labels.sections.technicalSkills }}
    </CvSectionTitle>

    <div class="space-y-8">
      <div
        v-for="(items, category) in skills"
        :key="category"
      >
        <h3 class="uppercase text-glow mb-4 font-semibold">
          {{ getCategoryLabel(category) }}
        </h3>

        <div class="flex flex-wrap gap-3">
          <span
            v-for="skill in items"
            :key="skill"
            class="skill-chip inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700"
          >
            <img
              v-if="hasSkillIcon(skill)"
              :src="getSkillIconUrl(skill)!"
              :alt="`${skill} logo`"
              class="skill-chip__icon"
              width="16"
              height="16"
              loading="lazy"
              @error="onSkillIconError(skill)"
            >
            {{ skill }}
          </span>
        </div>
      </div>
    </div>
  </CvSectionCard>
</template>
