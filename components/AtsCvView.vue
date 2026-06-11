<script setup lang="ts">
import { profile } from '~/data/profile'
import { experiences } from '~/data/experiences'
import { education } from '~/data/education'
import { allTechnicalSkills } from '~/data/skills'
</script>

<template>
  <article class="ats-cv">
    <header class="ats-cv__header">
      <h1 class="ats-cv__name">
        {{ profile.name }}
      </h1>
      <p class="ats-cv__title">
        {{ profile.title }}
      </p>
      <p class="ats-cv__contact">
        {{ profile.location }} | {{ profile.email }} | {{ profile.phone }} | {{ profile.linkedin }} | {{ profile.github }}
      </p>
    </header>

    <section class="ats-cv__section">
      <h2>À propos</h2>
      <p>{{ profile.about.trim() }}</p>
    </section>

    <section class="ats-cv__section">
      <h2>Expériences professionnelles</h2>
      <div
        v-for="job in experiences"
        :key="`${job.title}-${job.company}`"
        class="ats-cv__entry"
      >
        <p class="ats-cv__entry-title">
          {{ job.title }} — {{ job.company }} ({{ job.date }})
        </p>
        <ul>
          <li
            v-for="item in job.items"
            :key="item"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </section>

    <section class="ats-cv__section">
      <h2>Formations</h2>
      <div
        v-for="item in education"
        :key="item.title"
        class="ats-cv__entry"
      >
        <p class="ats-cv__entry-title">
          {{ item.title }} — {{ item.school }} ({{ item.date }})
        </p>
      </div>
    </section>

    <section class="ats-cv__section">
      <h2>Compétences techniques</h2>
      <ul>
        <li
          v-for="skill in allTechnicalSkills"
          :key="skill"
        >
          {{ skill }}
        </li>
      </ul>
    </section>

    <section class="ats-cv__section">
      <h2>Compétences clés</h2>
      <ul>
        <li
          v-for="skill in profile.softSkills"
          :key="skill.label"
        >
          {{ skill.label }}
        </li>
      </ul>
    </section>

    <section class="ats-cv__section">
      <h2>Langues</h2>
      <ul>
        <li
          v-for="language in profile.languages"
          :key="language.label"
        >
          {{ language.label }} — {{ language.level }}
        </li>
      </ul>
    </section>
  </article>
</template>
