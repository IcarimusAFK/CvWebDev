<script setup lang="ts">
type ContactIcon = 'location' | 'email' | 'phone' | 'link' | 'globe'

defineProps<{
  icon: ContactIcon
}>()
</script>

<template>
  <p class="cv-contact-item">
    <span
      class="cv-contact-item__icon"
      aria-hidden="true"
    >
      <svg
        v-if="icon === 'location'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 21C12 21 19 14.5 19 9.5C19 6.46243 16.5376 4 13.5 4C10.4624 4 8 6.46243 8 9.5C8 14.5 12 21 12 21Z"
          stroke="#2EE6C5"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 11.5C13.3807 11.5 14.5 10.3807 14.5 9C14.5 7.61929 13.3807 6.5 12 6.5C10.6193 6.5 9.5 7.61929 9.5 9C9.5 10.3807 10.6193 11.5 12 11.5Z"
          stroke="#2EE6C5"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <svg
        v-else-if="icon === 'email'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M3 7L12 13L21 7M4 19H20C20.5523 19 21 18.5523 21 18V6C21 5.44772 20.5523 5 20 5H4C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19Z"
          stroke="#2EE6C5"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <svg
        v-else-if="icon === 'phone'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M8 3H16C17.1046 3 18 3.89543 18 5V19C18 20.1046 17.1046 21 16 21H8C6.89543 21 6 20.1046 6 19V5C6 3.89543 6.89543 3 8 3Z"
          stroke="#2EE6C5"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11 18H13"
          stroke="#2EE6C5"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>

      <svg
        v-else-if="icon === 'link'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M9 17H7C4.79086 17 3 15.2091 3 13C3 10.7909 4.79086 9 7 9H9"
          stroke="#2EE6C5"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15 7H17C19.2091 7 21 8.79086 21 11C21 13.2091 19.2091 15 17 15H15"
          stroke="#2EE6C5"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8 12H16"
          stroke="#2EE6C5"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <svg
        v-else-if="icon === 'globe'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
          stroke="#2EE6C5"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3 12H21"
          stroke="#2EE6C5"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          d="M12 3C14.5 5.5 16 8.5 16 12C16 15.5 14.5 18.5 12 21C9.5 18.5 8 15.5 8 12C8 8.5 9.5 5.5 12 3Z"
          stroke="#2EE6C5"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>

    <span class="cv-contact-item__text">
      <slot />
    </span>
  </p>
</template>
