<script setup lang="ts">
import profilePhoto from '~/assets/profile.png'

const { labels } = useCvData()
const { profilePhotoEl, completeIntro, resetIntro } = useCvIntro()

const phase = ref<'entering' | 'welcome' | 'exit'>('entering')
const isVisible = ref(true)
const isFading = ref(false)
const welcomeVisible = ref(false)

const photoRef = ref<HTMLElement | null>(null)

function sleep(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms))
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function resetPhotoTransform(photo: HTMLElement) {
  photo.classList.remove('cv-intro__photo--entering')
  photo.style.transition = 'none'
  photo.style.transform = 'translate(-50%, -50%) scale(1)'
  photo.getBoundingClientRect()
}

function animatePhotoToTarget(photo: HTMLElement, target: HTMLElement) {
  resetPhotoTransform(photo)

  const photoRect = photo.getBoundingClientRect()
  const targetRect = target.getBoundingClientRect()

  const deltaX = (targetRect.left + targetRect.width / 2) - (photoRect.left + photoRect.width / 2)
  const deltaY = (targetRect.top + targetRect.height / 2) - (photoRect.top + photoRect.height / 2)
  const scale = targetRect.width / photoRect.width

  photo.style.transition = 'transform 0.85s cubic-bezier(0.4, 0, 0.2, 1)'
  photo.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(${scale})`
}

async function runIntroSequence() {
  if (prefersReducedMotion()) {
    completeIntro()
    isVisible.value = false
    return
  }

  await sleep(1200)

  phase.value = 'welcome'
  welcomeVisible.value = true

  await sleep(1200)

  welcomeVisible.value = false
  phase.value = 'exit'

  await nextTick()

  const photo = photoRef.value
  const target = profilePhotoEl.value

  if (!photo || !target) {
    completeIntro()
    isVisible.value = false
    return
  }

  animatePhotoToTarget(photo, target)

  await sleep(700)
  isFading.value = true

  await sleep(400)
  isVisible.value = false
  completeIntro()
}

onMounted(() => {
  resetIntro()
  runIntroSequence()
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isVisible"
      class="cv-intro"
      :class="{ 'cv-intro--fading': isFading }"
      aria-hidden="true"
    >
      <div
        ref="photoRef"
        class="cv-intro__photo border-4 border-accent-solid"
        :class="{ 'cv-intro__photo--entering': phase === 'entering' }"
      >
        <img
          :src="profilePhoto"
          :alt="labels.ui.profilePhotoAlt"
          class="cv-intro__photo-img"
        >
      </div>

      <Transition name="cv-intro-welcome">
        <p
          v-if="welcomeVisible"
          class="cv-intro__welcome text-glow"
        >
          {{ labels.ui.welcome }}
        </p>
      </Transition>
    </div>
  </Teleport>
</template>

<style scoped>
.cv-intro {
  position: fixed;
  inset: 0;
  z-index: 10000;
  background: #07111d;
  pointer-events: all;
  transition: opacity 0.4s ease;
}

.cv-intro--fading {
  opacity: 0;
}

.cv-intro__photo {
  position: fixed;
  top: 50%;
  left: 50%;
  width: clamp(10rem, 30vw, 13rem);
  height: clamp(10rem, 30vw, 13rem);
  border-radius: 9999px;
  overflow: hidden;
  z-index: 10001;
  transform: translate(-50%, -50%);
}

.cv-intro__photo--entering {
  animation: cv-intro-spin-in 1.2s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
}

.cv-intro__photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 28%;
}

.cv-intro__welcome {
  position: fixed;
  top: calc(50% + clamp(5.5rem, 16vw, 7.5rem));
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  font-size: clamp(2rem, 6vw, 3rem);
  font-weight: 700;
  z-index: 10001;
}

.cv-intro-welcome-enter-active,
.cv-intro-welcome-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.cv-intro-welcome-enter-from,
.cv-intro-welcome-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(0.75rem);
}

@keyframes cv-intro-spin-in {
  0% {
    transform: translate(-50%, -50%) scale(0.35) rotate(0deg);
    opacity: 0;
  }

  100% {
    transform: translate(-50%, -50%) scale(1) rotate(720deg);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cv-intro__photo--entering {
    animation: none;
  }
}
</style>
