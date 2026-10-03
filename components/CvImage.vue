<script setup lang="ts">
const props = withDefaults(defineProps<{
  src: string
  alt: string
  imgClass?: string
  fallbackClass?: string
  loading?: 'lazy' | 'eager'
  width?: number | string
  height?: number | string
  fallbackLabel?: string
}>(), {
  loading: 'lazy',
})

const hasError = ref(false)

watch(
  () => props.src,
  () => {
    hasError.value = false
  },
)

function onError() {
  hasError.value = true
}
</script>

<template>
  <img
    v-if="!hasError"
    :src="src"
    :alt="alt"
    :class="imgClass"
    :loading="loading"
    :width="width"
    :height="height"
    @error="onError"
  >

  <div
    v-else
    class="cv-image-fallback"
    :class="fallbackClass"
    role="img"
    :aria-label="alt"
  >
    <span class="cv-image-fallback__label">
      {{ fallbackLabel || alt }}
    </span>
  </div>
</template>

<style scoped>
.cv-image-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 3rem;
  padding: 0.75rem;
  box-sizing: border-box;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(7, 17, 29, 0.95) 100%);
  border: 1px dashed rgba(46, 230, 197, 0.35);
  color: #2ee6c5;
  text-align: center;
}

.cv-image-fallback__label {
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: 0.02em;
  opacity: 0.9;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
