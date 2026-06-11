<script setup lang="ts">
import profilePhoto from '~/assets/profile.png'

const { profile, labels } = useCvData()
</script>

<template>
  <aside
    class="
      bg-slate-900/70
      border
      border-accent
      rounded-3xl
      overflow-hidden
      backdrop-blur
    "
  >
    <div class="p-8">

      <div class="profile-photo mx-auto border-4 border-accent-solid">
        <img
          :src="profilePhoto"
          :alt="labels.ui.profilePhotoAlt"
          class="profile-photo__img"
        />
      </div>

      <h1
        class="
          text-4xl
          font-bold
          mt-6
          text-center
        "
      >
        {{ profile.name }}
      </h1>

      <p
        class="
          text-glow
          text-xl
          text-center
          mt-2
        "
      >
        {{ profile.title }}
      </p>

      <div class="mt-10 space-y-4">

        <CvSectionTitle
          icon="info"
          tag="h3"
          class="text-glow font-bold"
        >
          {{ labels.sections.info }}
        </CvSectionTitle>

        <CvContactItem icon="location">
          {{ profile.location }}
        </CvContactItem>
        <CvContactItem icon="email">
          {{ profile.email }}
        </CvContactItem>
        <CvContactItem icon="phone">
          {{ profile.phone }}
        </CvContactItem>
        <CvContactItem icon="link">
          {{ profile.linkedin }}
        </CvContactItem>
        <CvContactItem icon="globe">
          {{ profile.github }}
        </CvContactItem>

      </div>

      <div class="mt-10">

        <CvSectionTitle
          icon="about"
          tag="h3"
          class="text-glow font-bold mb-4"
        >
          {{ labels.sections.about }}
        </CvSectionTitle>

        <p class="leading-8 text-slate-300">
          {{ profile.about }}
        </p>

      </div>

      <div class="mt-10">

        <CvSectionTitle
          icon="soft-skills"
          tag="h3"
          class="text-glow font-bold mb-5"
        >
          {{ labels.sections.softSkills }}
        </CvSectionTitle>

        <div
          v-for="skill in profile.softSkills"
          :key="skill.label"
          class="mb-5"
        >
          <div class="mb-2">
            {{ skill.label }}
          </div>

        </div>

      </div>

      <div class="mt-10">

        <CvSectionTitle
          icon="languages"
          tag="h3"
          class="text-glow font-bold mb-5"
        >
          {{ labels.sections.languages }}
        </CvSectionTitle>

        <div
          v-for="language in profile.languages"
          :key="language.label"
          class="mb-5"
        >
          <div class="mb-2">
            {{ language.label }}
          </div>

          <div
            v-if="language.level"
            class="text-slate-400"
          >
            {{ language.level }}
          </div>

          <div class="h-2 bg-slate-700 rounded-full">
            <div
              class="
                h-2
                rounded-full
                bg-accent
              "
              :style="{
                width: `${language.value}%`,
              }"
            />
          </div>

        </div>

      </div>

    </div>
  </aside>
</template>
