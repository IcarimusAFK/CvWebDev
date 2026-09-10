<script setup lang="ts">
import { wrapTextAtWords } from '~/utils/wrapText'

const { labels } = useCvData()
const { maxCharsPerLine } = useResponsiveMaxChars()

const phrases = computed(() => labels.value.ui.typewriterPhrases)
const { displayedText } = useTypewriter({ phrases })

const longestPhrase = computed(() => {
  const list = phrases.value
  if (list.length === 0) return ''

  return list.reduce((longest, phrase) => (
    phrase.length > longest.length ? phrase : longest
  ), list[0] ?? '')
})

const wrappedDisplayedText = computed(() => (
  wrapTextAtWords(displayedText.value, maxCharsPerLine.value)
))

const wrappedLongestPhrase = computed(() => (
  wrapTextAtWords(longestPhrase.value, maxCharsPerLine.value)
))
</script>

<template>
  <div
    class="cv-typewriter"
    aria-live="polite"
    aria-atomic="true"
  >
    <div class="cv-typewriter__slot">
      <span
        class="cv-typewriter__measure"
        aria-hidden="true"
      >{{ wrappedLongestPhrase }}</span>

      <span class="cv-typewriter__content">
        <span class="cv-typewriter__text text-glow">
          {{ wrappedDisplayedText }}<span
            class="cv-typewriter__cursor"
            aria-hidden="true"
          />
        </span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.cv-typewriter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 80rem;
  margin: 2rem auto;
  padding: 0 1rem;
  font-size: clamp(1.35rem, 4.5vw, 2.75rem);
  font-weight: 700;
  letter-spacing: 0.01em;
  line-height: 1.35;
}

@media (min-width: 640px) {
  .cv-typewriter {
    margin: 3rem auto;
    font-size: clamp(1.75rem, 5vw, 2.75rem);
  }
}

.cv-typewriter__slot {
  position: relative;
  width: 100%;
  max-width: 100%;
}

.cv-typewriter__measure {
  visibility: hidden;
  display: block;
  width: 100%;
  white-space: pre-line;
  text-align: center;
  user-select: none;
  pointer-events: none;
  padding-right: 5px;
}

.cv-typewriter__content {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-right: 5px;
}

.cv-typewriter__text {
  max-width: 100%;
  white-space: pre-line;
  text-align: center;
}

.cv-typewriter__cursor {
  display: inline-block;
  width: 3px;
  height: 0.9em;
  margin-left: 2px;
  background-color: #2ee6c5;
  animation: cv-typewriter-blink 1s step-end infinite;
  vertical-align: baseline;
  flex-shrink: 0;
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
