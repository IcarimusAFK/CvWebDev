<script setup lang="ts">
const { labels } = useCvData()

const phrases = computed(() => labels.value.ui.typewriterPhrases)
const { displayedText } = useTypewriter({ phrases })
</script>

<template>
  <div
    class="cv-typewriter"
    aria-live="polite"
    aria-atomic="true"
  >
    <span class="cv-typewriter__text text-glow">{{ displayedText }}</span><span
      class="cv-typewriter__cursor"
      aria-hidden="true"
    />
  </div>
</template>

<style scoped>
.cv-typewriter {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 3rem;
  max-width: 80rem;
  margin: 2rem auto;
  padding: 0 1rem;
  font-size: clamp(1.75rem, 5vw, 2.75rem);
  font-weight: 700;
  letter-spacing: 0.01em;
}

@media (min-width: 640px) {
  .cv-typewriter {
    margin: 3rem auto;
  }
}

.cv-typewriter__text {
  white-space: pre;
}

.cv-typewriter__cursor {
  display: inline-block;
  width: 3px;
  height: 0.9em;
  margin-left: 2px;
  background-color: #2ee6c5;
  animation: cv-typewriter-blink 1s step-end infinite;
  vertical-align: baseline;
}

@keyframes cv-typewriter-blink {
  50% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cv-typewriter__cursor {
    animation: none;
  }
}
</style>
