<script setup lang="ts">
type SectionIcon =
  | 'info'
  | 'about'
  | 'soft-skills'
  | 'languages'
  | 'experience'
  | 'education'
  | 'technical-skills'
  | 'web-projects'

const props = withDefaults(defineProps<{
  icon: SectionIcon
  tag?: 'h2' | 'h3'
}>(), {
  tag: 'h2',
})
</script>

<template>
  <component
    :is="props.tag"
    class="cv-section-title"
  >
    <span
      class="cv-section-title__icon"
      aria-hidden="true"
    >
      <svg
        v-if="props.icon === 'info'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 13V17M12 7H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
          stroke="#2EE6C5"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <svg
        v-else-if="props.icon === 'about'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
          stroke="#2EE6C5"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <svg
        v-else-if="props.icon === 'soft-skills'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z"
          stroke="#2EE6C5"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <svg
        v-else-if="props.icon === 'languages'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M5 8L11 14M4 14L10 8L12 5M2 5H14M7 2H8"
          stroke="#2EE6C5"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M22 22L17 12L12 22M14 18H20"
          stroke="#2EE6C5"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <svg
        v-else-if="props.icon === 'experience'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M4 7H20V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V7Z"
          stroke="#2EE6C5"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M4 11H20"
          stroke="#2EE6C5"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>

      <svg
        v-else-if="props.icon === 'education'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M22 10L12 5L2 10L12 15L22 10Z"
          stroke="#2EE6C5"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6 12V17C6 17 9 20 12 20C15 20 18 17 18 17V12"
          stroke="#2EE6C5"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <svg
        v-else-if="props.icon === 'technical-skills'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M16 18L22 12L16 6M8 6L2 12L8 18"
          stroke="#2EE6C5"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <svg
        v-else-if="props.icon === 'web-projects'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M3 7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7Z"
          stroke="#2EE6C5"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3 9H21"
          stroke="#2EE6C5"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          d="M7 13H10M7 16H14"
          stroke="#2EE6C5"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </span>

    <span class="cv-section-title__text">
      <slot />
    </span>
  </component>
</template>
