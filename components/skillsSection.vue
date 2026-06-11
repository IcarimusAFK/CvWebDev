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
</script>

<template>
  <section class="cv-skills-section bg-slate-900/70 rounded-3xl p-8 border border-accent">
    <CvSectionTitle
      icon="technical-skills"
      class="text-glow text-3xl font-bold mb-8"
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
              v-if="getSkillIconUrl(skill)"
              :src="getSkillIconUrl(skill)!"
              :alt="`${skill} logo`"
              class="skill-chip__icon"
              width="16"
              height="16"
              loading="lazy"
            >
            {{ skill }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
