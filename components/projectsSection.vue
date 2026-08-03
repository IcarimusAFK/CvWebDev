<script setup lang="ts">
const { projects, labels } = useCvData()

const carouselRef = ref<HTMLElement | null>(null)
const activeIndex = ref(0)

function getSlideWidth() {
  const carousel = carouselRef.value
  if (!carousel) return 0

  const slide = carousel.querySelector<HTMLElement>('.projects-carousel__slide')
  if (!slide) return 0

  const styles = getComputedStyle(carousel)
  const gap = Number.parseFloat(styles.columnGap || styles.gap || '0')

  return slide.offsetWidth + gap
}

function scrollToIndex(index: number) {
  const carousel = carouselRef.value
  if (!carousel) return

  const boundedIndex = Math.max(0, Math.min(index, projects.value.length - 1))
  activeIndex.value = boundedIndex

  carousel.scrollTo({
    left: boundedIndex * getSlideWidth(),
    behavior: 'smooth',
  })
}

function goToPrevious() {
  scrollToIndex(activeIndex.value - 1)
}

function goToNext() {
  scrollToIndex(activeIndex.value + 1)
}

function onCarouselScroll() {
  const carousel = carouselRef.value
  const slideWidth = getSlideWidth()
  if (!carousel || slideWidth === 0) return

  activeIndex.value = Math.round(carousel.scrollLeft / slideWidth)
}

const canGoPrevious = computed(() => activeIndex.value > 0)
const canGoNext = computed(() => activeIndex.value < projects.value.length - 1)

function isSvgImage(src: string) {
  return src.toLowerCase().endsWith('.svg')
}
</script>

<template>
  <section
    class="
      cv-web-projects
      max-w-7xl
      mx-auto
      mt-8
      sm:mt-12
      bg-slate-900/70
      rounded-2xl
      sm:rounded-3xl
      p-5
      sm:p-6
      lg:p-8
      border
      border-accent
    "
  >
    <CvSectionTitle
      icon="web-projects"
      class="text-glow font-bold text-2xl sm:text-3xl mb-6 sm:mb-8"
    >
      {{ labels.sections.webProjects }}
    </CvSectionTitle>

    <div class="projects-carousel relative">
      <button
        type="button"
        class="
          projects-carousel__nav
          projects-carousel__nav--prev
        "
        :disabled="!canGoPrevious"
        aria-label="Projet précédent"
        @click="goToPrevious"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <div
        ref="carouselRef"
        class="projects-carousel__track"
        @scroll="onCarouselScroll"
      >
        <article
          v-for="(project, index) in projects"
          :key="`${project.title}-${index}`"
          class="projects-carousel__slide"
        >
          <div class="project-card group">
            <img
              v-if="isSvgImage(project.image)"
              :src="project.image"
              :alt="project.title"
              class="project-card__image project-card__image--native"
              loading="lazy"
            >

            <div
              v-else
              class="project-card__shell"
            >
              <div class="project-card__frame">
                <p class="project-card__eyebrow">
                  {{ project.title }}
                </p>

                <div class="project-card__media">
                  <img
                    :src="project.image"
                    :alt="project.title"
                    class="project-card__image"
                    loading="lazy"
                  >
                </div>
              </div>
            </div>

            <div
              class="project-card__overlay"
              aria-hidden="true"
            >
              <div class="project-card__content">
                <h3 class="project-card__title">
                  {{ project.title }}
                </h3>

                <p class="project-card__description">
                  {{ project.description }}
                </p>

                <ul class="project-card__tags">
                  <li
                    v-for="tech in project.technologies"
                    :key="tech"
                    class="project-card__tag"
                  >
                    {{ tech }}
                  </li>
                </ul>
              </div>
            </div>

            <a
              v-if="project.url"
              :href="project.url"
              target="_blank"
              rel="noopener noreferrer"
              class="project-card__link"
              :aria-label="`Visiter ${project.title}`"
            />
          </div>
        </article>
      </div>

      <button
        type="button"
        class="
          projects-carousel__nav
          projects-carousel__nav--next
        "
        :disabled="!canGoNext"
        aria-label="Projet suivant"
        @click="goToNext"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <div
      class="projects-carousel__dots"
      role="tablist"
      aria-label="Navigation des projets"
    >
      <button
        v-for="(project, index) in projects"
        :key="`dot-${project.title}-${index}`"
        type="button"
        class="projects-carousel__dot"
        :class="{ 'projects-carousel__dot--active': activeIndex === index }"
        :aria-label="`Aller au projet ${project.title}`"
        :aria-selected="activeIndex === index"
        role="tab"
        @click="scrollToIndex(index)"
      />
    </div>
  </section>
</template>

<style scoped>
.projects-carousel {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1rem;
}

.projects-carousel__track {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 0.25rem 0;
  min-width: 0;
}

.projects-carousel__track::-webkit-scrollbar {
  display: none;
}

.projects-carousel__slide {
  flex: 0 0 min(100%, 520px);
  scroll-snap-align: center;
  min-width: 0;
}

.project-card {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 1rem;
  border: 1px solid rgba(46, 230, 197, 0.2);
  background: linear-gradient(135deg, #07111d 0%, #0f172a 100%);
  isolation: isolate;
}

.project-card__link {
  position: absolute;
  inset: 0;
  z-index: 2;
  border-radius: inherit;
  cursor: pointer;
}

.project-card__link:focus-visible {
  outline: 2px solid #2ee6c5;
  outline-offset: 3px;
}

.project-card__shell {
  position: absolute;
  inset: 0;
  padding: 5%;
}

.project-card__frame {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 1rem;
  border: 1px solid rgba(46, 230, 197, 0.25);
  background: rgba(30, 41, 59, 0.55);
  overflow: hidden;
}

.project-card__eyebrow {
  flex-shrink: 0;
  margin: 0;
  padding: 0.85rem 1rem 0.35rem;
  text-align: center;
  font-size: clamp(0.7rem, 1.6vw, 0.9rem);
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #2ee6c5;
  text-transform: uppercase;
  line-height: 1.2;
}

.project-card__media {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.35rem 1rem 1rem;
}

.project-card__image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  transition: filter 0.35s ease, transform 0.35s ease;
}

.project-card__image--native {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;
  object-fit: cover;
}

.project-card__overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(7, 17, 29, 0.55);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.35s ease;
}

.project-card__content {
  text-align: center;
  transform: translateY(0.75rem);
  transition: transform 0.35s ease;
}

.project-card__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2ee6c5;
  margin-bottom: 0.75rem;
}

.project-card__description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #e2e8f0;
  margin-bottom: 1rem;
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.project-card__tag {
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  border: 1px solid rgba(46, 230, 197, 0.35);
  background: rgba(46, 230, 197, 0.08);
  color: #2ee6c5;
  font-size: 0.75rem;
}

.group:hover .project-card__image,
.group:focus-within .project-card__image {
  filter: blur(6px);
  transform: scale(1.03);
}

.group:hover .project-card__overlay,
.group:focus-within .project-card__overlay {
  opacity: 1;
}

.group:has(.project-card__link):hover {
  cursor: pointer;
}

.group:hover .project-card__content,
.group:focus-within .project-card__content {
  transform: translateY(0);
}

.projects-carousel__nav {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 9999px;
  border: 1px solid rgba(46, 230, 197, 0.35);
  background: rgba(15, 23, 42, 0.9);
  color: #2ee6c5;
  transition: background-color 0.2s ease, opacity 0.2s ease;
}

.projects-carousel__nav:hover:not(:disabled) {
  background: rgba(46, 230, 197, 0.12);
}

.projects-carousel__nav:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.projects-carousel__nav svg {
  width: 1.25rem;
  height: 1.25rem;
}

.projects-carousel__dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.projects-carousel__dot {
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 9999px;
  border: none;
  background: rgba(148, 163, 184, 0.45);
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.projects-carousel__dot--active {
  background: #2ee6c5;
  transform: scale(1.15);
}

@media (max-width: 768px) {
  .projects-carousel {
    grid-template-columns: 1fr;
  }

  .projects-carousel__nav {
    display: none;
  }

  .projects-carousel__slide {
    flex-basis: 100%;
  }
}
</style>
