<script setup lang="ts">
const { ongoingProjects, labels } = useCvData()

const activeImageIndexes = ref<number[]>([])

watch(
  ongoingProjects,
  (projects) => {
    activeImageIndexes.value = projects.map(() => 0)
  },
  { immediate: true },
)

function setActiveImage(projectIndex: number, imageIndex: number) {
  activeImageIndexes.value[projectIndex] = imageIndex
}

function goToPreviousImage(projectIndex: number, imageCount: number) {
  const current = activeImageIndexes.value[projectIndex] ?? 0
  activeImageIndexes.value[projectIndex] = (current - 1 + imageCount) % imageCount
}

function goToNextImage(projectIndex: number, imageCount: number) {
  const current = activeImageIndexes.value[projectIndex] ?? 0
  activeImageIndexes.value[projectIndex] = (current + 1) % imageCount
}

function getActiveImage(projectIndex: number, images: string[]) {
  if (images.length === 0) return null
  return images[activeImageIndexes.value[projectIndex] ?? 0] ?? images[0]
}
</script>

<template>
  <CvSectionCard
    class="
      cv-ongoing-projects
      max-w-7xl
      mx-auto
      mt-8
      sm:mt-12
    "
  >
    <CvSectionTitle
      icon="ongoing-projects"
      class="text-glow font-bold text-2xl sm:text-3xl mb-6 sm:mb-8"
    >
      {{ labels.sections.ongoingProjects }}
    </CvSectionTitle>

    <div class="ongoing-projects__list">
      <article
        v-for="(project, projectIndex) in ongoingProjects"
        :key="`${project.title}-${projectIndex}`"
        class="ongoing-project"
      >
        <div class="ongoing-project__media">
          <div class="ongoing-project__frame">
            <CvImage
              v-if="getActiveImage(projectIndex, project.images)"
              :src="getActiveImage(projectIndex, project.images)!"
              :alt="`${project.title} — image ${(activeImageIndexes[projectIndex] ?? 0) + 1}`"
              :fallback-label="project.title"
              img-class="ongoing-project__image"
              fallback-class="ongoing-project__image-fallback"
            />

            <div
              v-else
              class="ongoing-project__placeholder"
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 12H10M8 10V14M14.5 13C14.5 13.2761 14.2761 13.5 14 13.5C13.7239 13.5 13.5 13.2761 13.5 13C13.5 12.7239 13.7239 12.5 14 12.5C14.2761 12.5 14.5 12.7239 14.5 13ZM18.5 13C18.5 13.2761 18.2761 13.5 18 13.5C17.7239 13.5 17.5 13.2761 17.5 13C17.5 12.7239 17.7239 12.5 18 12.5C18.2761 12.5 18.5 12.7239 18.5 13ZM8 17C10.2091 19.2091 13.7909 19.2091 16 17M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>{{ labels.ui.ongoingScreenshotsSoon }}</span>
            </div>

            <template v-if="project.images.length > 1">
              <button
                type="button"
                class="ongoing-project__nav ongoing-project__nav--prev"
                :aria-label="`Image précédente — ${project.title}`"
                @click="goToPreviousImage(projectIndex, project.images.length)"
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

              <button
                type="button"
                class="ongoing-project__nav ongoing-project__nav--next"
                :aria-label="`Image suivante — ${project.title}`"
                @click="goToNextImage(projectIndex, project.images.length)"
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
            </template>
          </div>

          <div
            v-if="project.images.length > 1"
            class="ongoing-project__thumbs"
            role="tablist"
            :aria-label="`Galerie ${project.title}`"
          >
            <button
              v-for="(image, imageIndex) in project.images"
              :key="`${project.title}-thumb-${imageIndex}`"
              type="button"
              class="ongoing-project__thumb"
              :class="{ 'ongoing-project__thumb--active': activeImageIndexes[projectIndex] === imageIndex }"
              role="tab"
              :aria-selected="activeImageIndexes[projectIndex] === imageIndex"
              :aria-label="`Voir l'image ${imageIndex + 1}`"
              @click="setActiveImage(projectIndex, imageIndex)"
            >
              <CvImage
                :src="image"
                :alt="`${project.title} — miniature ${imageIndex + 1}`"
                :fallback-label="`${imageIndex + 1}`"
                img-class="ongoing-project__thumb-image"
                fallback-class="ongoing-project__thumb-fallback"
              />
            </button>
          </div>
        </div>

        <div class="ongoing-project__body">
          <div class="ongoing-project__header">
            <span class="ongoing-project__status">
              {{ project.status }}
            </span>

            <div class="ongoing-project__title-row">
              <CvImage
                v-if="project.logo"
                :src="project.logo"
                :alt="`Logo ${project.title}`"
                :fallback-label="project.title"
                img-class="ongoing-project__logo"
                fallback-class="ongoing-project__logo-fallback"
              />

              <h3 class="ongoing-project__title text-glow">
                {{ project.title }}
              </h3>
            </div>
          </div>

          <p class="ongoing-project__description">
            {{ project.description }}
          </p>

          <ul class="ongoing-project__tags">
            <li
              v-for="tech in project.technologies"
              :key="tech"
              class="ongoing-project__tag"
            >
              {{ tech }}
            </li>
          </ul>

          <a
            v-if="project.url"
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
            class="ongoing-project__link"
          >
            {{ labels.ui.viewProject }}
          </a>
        </div>
      </article>
    </div>
  </CvSectionCard>
</template>

<style scoped>
.ongoing-projects__list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.ongoing-project {
  display: grid;
  gap: 1.5rem;
  padding: 1.25rem;
  border-radius: 1rem;
  border: 1px solid rgba(46, 230, 197, 0.2);
  background: linear-gradient(135deg, rgba(7, 17, 29, 0.85) 0%, rgba(15, 23, 42, 0.75) 100%);
}

@media (min-width: 900px) {
  .ongoing-project {
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
    align-items: stretch;
    gap: 1.75rem;
    padding: 1.5rem;
  }
}

.ongoing-project__media {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 0;
}

.ongoing-project__frame {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 0.85rem;
  border: 1px solid rgba(46, 230, 197, 0.25);
  background: #07111d;
}

.ongoing-project__image,
.ongoing-project__image-fallback {
  width: 100%;
  height: 100%;
  display: block;
}

.ongoing-project__image {
  object-fit: contain;
  object-position: center;
  background: #07111d;
}

.ongoing-project__thumb-image,
.ongoing-project__thumb-fallback {
  width: 100%;
  height: 100%;
  display: block;
}

.ongoing-project__thumb-image {
  object-fit: contain;
  object-position: center;
  background: #07111d;
}

.ongoing-project__thumb-fallback {
  min-height: 0;
  padding: 0.25rem;
  font-size: 0.7rem;
}

.ongoing-project__placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  height: 100%;
  color: rgba(46, 230, 197, 0.7);
  font-size: 0.9rem;
  letter-spacing: 0.02em;
}

.ongoing-project__placeholder svg {
  width: 3rem;
  height: 3rem;
  opacity: 0.85;
}

.ongoing-project__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 9999px;
  border: 1px solid rgba(46, 230, 197, 0.35);
  background: rgba(15, 23, 42, 0.85);
  color: #2ee6c5;
  transition: background-color 0.2s ease;
}

.ongoing-project__nav:hover {
  background: rgba(46, 230, 197, 0.12);
}

.ongoing-project__nav--prev {
  left: 0.65rem;
}

.ongoing-project__nav--next {
  right: 0.65rem;
}

.ongoing-project__nav svg {
  width: 1.1rem;
  height: 1.1rem;
}

.ongoing-project__thumbs {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  scrollbar-width: none;
}

.ongoing-project__thumbs::-webkit-scrollbar {
  display: none;
}

.ongoing-project__thumb {
  flex: 0 0 4.5rem;
  height: 2.75rem;
  padding: 0;
  overflow: hidden;
  border-radius: 0.5rem;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: rgba(15, 23, 42, 0.8);
  opacity: 0.7;
  transition: opacity 0.2s ease, border-color 0.2s ease;
}

.ongoing-project__thumb--active,
.ongoing-project__thumb:hover {
  opacity: 1;
  border-color: rgba(46, 230, 197, 0.55);
}

.ongoing-project__body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.ongoing-project__header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.ongoing-project__status {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid rgba(46, 230, 197, 0.4);
  background: rgba(46, 230, 197, 0.1);
  color: #2ee6c5;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.ongoing-project__title-row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  min-width: 0;
}

.ongoing-project__logo,
.ongoing-project__logo-fallback {
  flex-shrink: 0;
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 0.85rem;
  background: #ffffff;
  object-fit: contain;
}

.ongoing-project__logo-fallback {
  min-height: 0;
  padding: 0.35rem;
  font-size: 0.65rem;
}

.ongoing-project__title {
  margin: 0;
  font-size: clamp(1.35rem, 3vw, 1.85rem);
  font-weight: 700;
  line-height: 1.2;
}

.ongoing-project__description {
  margin: 0 0 1.25rem;
  color: #e2e8f0;
  font-size: 0.95rem;
  line-height: 1.65;
}

.ongoing-project__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.ongoing-project__tag {
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  border: 1px solid rgba(46, 230, 197, 0.35);
  background: rgba(46, 230, 197, 0.08);
  color: #2ee6c5;
  font-size: 0.75rem;
}

.ongoing-project__link {
  display: inline-flex;
  align-items: center;
  margin-top: 1.25rem;
  color: #2ee6c5;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.ongoing-project__link:hover {
  opacity: 0.8;
}

@media (max-width: 639px) {
  .ongoing-project {
    padding: 1rem;
  }

  .ongoing-project__nav {
    width: 2rem;
    height: 2rem;
  }
}
</style>
