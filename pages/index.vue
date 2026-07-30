<script setup lang="ts">
const route = useRoute()
const { locale } = useCvLocale()
const isPdfMode = computed(() => route.query.pdf === '1')
const isAtsPdfMode = computed(() => route.query.pdf === 'ats')
const isExportMode = computed(() => isPdfMode.value || isAtsPdfMode.value)

useHead({
  htmlAttrs: {
    lang: computed(() => locale.value),
    class: computed(() => {
      if (isAtsPdfMode.value) return 'pdf-export ats-export'
      if (isPdfMode.value) return 'pdf-export'
      return undefined
    }),
  },
  bodyAttrs: {
    class: computed(() => {
      if (isAtsPdfMode.value) return 'pdf-export ats-export'
      if (isPdfMode.value) return 'pdf-export'
      return undefined
    }),
  },
})
</script>

<template>
  <main
    class="
      min-h-screen
      bg-[#07111d]
      text-white
      p-8
    "
    :class="{
      'pdf-mode': isPdfMode,
      'ats-pdf-mode': isAtsPdfMode,
    }"
  >
    <PdfExportButton v-if="!isExportMode" />

    <AtsCvView v-if="isAtsPdfMode" />

    <div
      v-else
      class="
        cv-layout
        max-w-7xl
        mx-auto
        grid
        lg:grid-cols-[350px_1fr]
        gap-8
      "
    >
      <sidebar />

      <div class="cv-content space-y-8">
        <experienceSection />
        <educationSection />
        <skillsSection />
      </div>
    </div>

    <ProjectsSection v-if="!isExportMode" />
  </main>
</template>