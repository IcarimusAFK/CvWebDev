<script setup lang="ts">
const { experiences, labels } = useCvData()
</script>

<template>
  <section class="bg-slate-900/70 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 border border-accent">
    <CvSectionTitle
      icon="experience"
      class="text-glow font-bold text-2xl sm:text-3xl mb-6 sm:mb-8"
    >
      {{ labels.sections.experience }}
    </CvSectionTitle>

    <div
      v-for="job in experiences"
      :key="`${job.title}-${job.company}`"
      class="border-l-2 border-accent-solid pl-4 sm:pl-8 pb-6 sm:pb-8 ml-1 sm:ml-3"
    >
      <div class="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-start sm:gap-4">
        <div class="min-w-0">
          <h3 class="text-xl sm:text-2xl font-bold break-words">
            {{ job.title }}
          </h3>

          <p class="text-glow">
            {{ job.company }}
          </p>
        </div>

        <span class="text-slate-400 shrink-0 text-sm sm:text-base">
          {{ job.date }}
        </span>
      </div>

      <ul class="mt-4 space-y-2 break-words">
        <li
          v-for="item in job.items"
          :key="item"
        >
          • {{ item }}
        </li>
      </ul>
    </div>
  </section>
</template>
