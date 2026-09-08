<script setup lang="ts">
type Props = {
  tag?: 'section' | 'aside'
  padded?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'section',
  padded: true,
})

const { onMouseMove, onMouseLeave } = useCardTilt(6)
</script>

<template>
  <div class="cv-section-card-wrapper">
    <component
      :is="tag"
      class="cv-section-card bg-slate-900/70 border border-accent"
      :class="[
        padded ? 'rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8' : '',
        props.class,
      ]"
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave"
    >
      <slot />
    </component>
  </div>
</template>

<style scoped>
.cv-section-card-wrapper {
  perspective: 1200px;
}

.cv-section-card {
  transform-style: preserve-3d;
  transition: transform 0.15s ease-out, box-shadow 0.15s ease-out;
  will-change: transform;
}

.cv-section-card:hover {
  box-shadow: 0 12px 40px rgba(46, 230, 197, 0.12);
}

@media (prefers-reduced-motion: reduce) {
  .cv-section-card {
    transition: none;
  }
}
</style>
