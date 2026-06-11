<script setup lang="ts">
import { education } from '~/data/education'
</script>

<template>

    <section class="bg-slate-900/70 rounded-3xl p-8 border border-accent">
        <CvSectionTitle
            icon="education"
            class="text-glow text-3xl font-bold mb-8"
        >
            FORMATIONS
        </CvSectionTitle>

        <div v-for="item in education" :key="item.title" class="flex justify-between mb-6">

            <div>

                <h3 class="text-2xl font-semibold">
                    {{ item.title }}
                </h3>

                <p class="text-glow">
                    {{ item.school }}
                </p>

            </div>

            <div class="text-slate-400">
                {{ item.date }}
            </div>

        </div>

    </section>

</template>