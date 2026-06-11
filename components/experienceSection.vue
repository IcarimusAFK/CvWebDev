<script setup lang="ts">
import { experiences } from '~/data/experiences'
</script>

<template>

    <section class="bg-slate-900/70 rounded-3xl p-8 border border-accent">

        <CvSectionTitle
            icon="experience"
            class="text-glow font-bold text-3xl mb-8"
        >
            EXPÉRIENCES PROFESSIONNELLES
        </CvSectionTitle>

        <div v-for="job in experiences" :key="job.title" class="border-l-2 border-accent-solid pl-8 pb-8 ml-3">

            <div class="flex justify-between items-start">

                <div>
                    <h3 class="text-2xl font-bold">
                        {{ job.title }}
                    </h3>

                    <p class="text-glow">
                        {{ job.company }}
                    </p>

                </div>

                <span class="text-slate-400">
                    {{ job.date }}
                </span>

            </div>

            <ul class="mt-4 space-y-2">

                <li v-for="item in job.items" :key="item">
                    • {{ item }}
                </li>

            </ul>

        </div>

    </section>

</template>