<script setup lang="ts">
const route = useRoute()
const { locale } = useCvLocale()
const { isIntroComplete } = useCvIntro()
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
      cv-page
      min-h-screen
      bg-[#07111d]
      text-white
      px-4
      pt-6
      sm:px-6
      sm:pt-8
      lg:px-8
    "
    :class="{
      'pdf-mode': isPdfMode,
      'ats-pdf-mode': isAtsPdfMode,
      'cv-page--intro-pending': !isIntroComplete && !isExportMode,
    }"
  >
    <ClientOnly>
      <CvIntroLoader v-if="!isExportMode" />

      <template #fallback>
        <div
          class="cv-intro-fallback"
          aria-hidden="true"
        />
      </template>
    </ClientOnly>

    <PdfExportButton v-if="!isExportMode && isIntroComplete" />

    <AtsCvView v-if="isAtsPdfMode" />

    <div
      v-else
      class="
        cv-layout
        max-w-7xl
        mx-auto
        grid
        grid-cols-1
        lg:grid-cols-[350px_1fr]
        gap-6
        lg:gap-8
      "
    >
      <sidebar />

      <div class="cv-content space-y-8">
        <experienceSection />
        <educationSection />
        <skillsSection />
      </div>
    </div>

    <CvTypewriterTags v-if="!isExportMode" />

    <ProjectsSection v-if="!isExportMode" />
    <OngoingProjectsSection v-if="!isExportMode" />
  </main>
</template>

<style scoped>
.cv-intro-fallback {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: #07111d;
}

.cv-page--intro-pending :deep(.cv-layout),
.cv-page--intro-pending :deep(.cv-typewriter),
.cv-page--intro-pending :deep(.cv-web-projects),
.cv-page--intro-pending :deep(.cv-ongoing-projects) {
  opacity: 0;
}

.cv-page :deep(.cv-layout),
.cv-page :deep(.cv-typewriter),
.cv-page :deep(.cv-web-projects),
.cv-page :deep(.cv-ongoing-projects) {
  transition: opacity 0.5s ease;
}
</style>