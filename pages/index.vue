<script setup lang="ts">
const route = useRoute()
const isPdfMode = computed(() => route.query.pdf === '1')

useHead({
  htmlAttrs: {
    class: computed(() => (isPdfMode.value ? 'pdf-export' : undefined)),
  },
  bodyAttrs: {
    class: computed(() => (isPdfMode.value ? 'pdf-export' : undefined)),
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
    :class="{ 'pdf-mode': isPdfMode }"
  >
    <PdfExportButton v-if="!isPdfMode" />

    <div
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
  </main>
</template>