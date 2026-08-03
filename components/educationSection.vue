<script setup lang="ts">
const { education, labels } = useCvData()
</script>

<template>
  <section class="bg-slate-900/70 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 border border-accent">
    <CvSectionTitle
      icon="education"
      class="text-glow text-2xl sm:text-3xl font-bold mb-6 sm:mb-8"
    >
      {{ labels.sections.education }}
    </CvSectionTitle>

    <div
      v-for="item in education"
      :key="item.title"
      class="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4 mb-6"
    >
      <div class="min-w-0">
        <h3 class="text-xl sm:text-2xl font-semibold break-words">
          {{ item.title }}
        </h3>

        <p class="text-glow">
          {{ item.school }}
        </p>
      </div>

      <div class="text-slate-400 shrink-0 text-sm sm:text-base">
        {{ item.date }}
      </div>
    </div>
  </section>
</template>
