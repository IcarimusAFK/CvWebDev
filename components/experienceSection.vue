<script setup>

const experiences = [
    {
        title: "Développeur Fullstack",
        company: "TILD",
        date: "2021 - Aujourd'hui",
        items: [
            "Gestion développement et maintenance du projet ALMA MATER, outil CRM/ERP de 500k utilisateurs enregistrés, dans une dizaine de pays dans le monde",
            "Développement de fonctionnalités fullstack, en Vue.js, Node.js, React et utilisant un ORM Sequelize pour faciliter la gestion des données",
            "CI/CD Gitlab avec création d'un pipeline de déploiement automatique et des tests unitaires, pour une rapidité de correction et de déploiement des fonctionnalités en production",
            "Environnements développement, préproduction, production avec Docker",
            "Management Agile d'une équipe de 4 développeurs alternants"
        ]
    },
    {
        title: "Alternant Développeur Fullstack",
        company: "College de Paris",
        date: "2019 - 2021",
        items: [
            "Création d'un outil de gestion étudiant CRM/ERP pour le groupe d'école College de Paris, en Vue.js et Node.js",
            "Rédaction du cahier des charges, entretien client, établissement de maquettes Figma, rédaction de la base de données et de la documentation technique",
            "CI/CD Gitlab",
            "Docker",
        ]
    },
    {
        title: "Side projects pour PME et associations",
        company: "Auto-entrepreneur",
        date: "2018 - 2021",
        items: [
            "Créations de sites web pour PME locales et associations, en Vue.js, HTML, CSS, JavaScript et PHP",
            "Entretien client, établissement de maquettes Figma",
            "Mise à niveau technique, lecture de documentation, projets personnels divers"
        ]
    }
]

</script>

<template>

    <section class="bg-slate-900/70 rounded-3xl p-8 border border-accent">

        <h2 class="text-glow font-bold text-3xl mb-8">
            EXPÉRIENCES PROFESSIONNELLES
        </h2>

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