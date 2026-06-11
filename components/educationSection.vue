<script setup>

const education = [
    {
        title: "Master Informatique & Gestion de Projet",
        school: "Keyce Informatique Montpellier",
        date: "2019 - 2021"
    },
    {
        title: "Licence Informatique",
        school: "SUPINFO International University Montpellier",
        date: "2016 - 2019"
    }
]

</script>

<template>

    <section class="bg-slate-900/70 rounded-3xl p-8 border border-accent">
        <h2 class="text-glow text-3xl font-bold mb-8">
            FORMATIONS
        </h2>

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