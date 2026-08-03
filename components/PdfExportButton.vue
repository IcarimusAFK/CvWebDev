<script setup lang="ts">
import type { CvLocale } from '~/data/cv'

const { locale, labels } = useCvData()
const { setLocale } = useCvLocale()

const CV_PDF_PATH = '/cv-colin-van-migom.pdf'

const loading = ref<'design' | 'ats' | null>(null)
const error = ref('')
const showAtsButton = ref(false)

function updateAtsVisibility() {
  showAtsButton.value = window.location.hash === '#ats'
}

onMounted(() => {
  updateAtsVisibility()
  window.addEventListener('hashchange', updateAtsVisibility)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', updateAtsVisibility)
})

async function downloadDesignPdf() {
  loading.value = 'design'
  error.value = ''

  try {
    const response = await fetch(`/api/cv/pdf?lang=${locale.value}`)

    if (!response.ok) {
      throw new Error('Échec de la génération')
    }

    const blob = await response.blob()
    const disposition = response.headers.get('Content-Disposition')
    const filename = disposition?.match(/filename="(.+)"/)?.[1] ?? 'cv.pdf'

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  }
  catch {
    error.value = labels.value.ui.pdfError
  }
  finally {
    loading.value = null
  }
}

async function downloadAtsPdf() {
  loading.value = 'ats'
  error.value = ''

  try {
    const response = await fetch(`/api/cv/pdf-ats?lang=${locale.value}`)

    if (!response.ok) {
      throw new Error('Échec de la génération')
    }

    const blob = await response.blob()
    const disposition = response.headers.get('Content-Disposition')
    const filename = disposition?.match(/filename="(.+)"/)?.[1] ?? 'cv-ats.pdf'

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  }
  catch {
    error.value = labels.value.ui.atsPdfError
  }
  finally {
    loading.value = null
  }
}

function switchLocale(nextLocale: CvLocale) {
  setLocale(nextLocale)
}
</script>

<template>
  <div class="cv-toolbar">
    <div class="cv-toolbar__locales flex gap-2">
      <button
        type="button"
        class="
          cv-toolbar__locale
          rounded-xl
          border
          px-3
          py-2
          text-xs
          sm:text-sm
          font-semibold
          backdrop-blur
          transition
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
        :class="locale === 'fr'
          ? 'border-accent bg-slate-800 text-glow'
          : 'border-slate-600 bg-slate-900/90 text-slate-300 hover:bg-slate-800'"
        :disabled="loading !== null"
        @click="switchLocale('fr')"
      >
        {{ labels.ui.switchToFrench }}
      </button>

      <button
        type="button"
        class="
          cv-toolbar__locale
          rounded-xl
          border
          px-3
          py-2
          text-xs
          sm:text-sm
          font-semibold
          backdrop-blur
          transition
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
        :class="locale === 'en'
          ? 'border-accent bg-slate-800 text-glow'
          : 'border-slate-600 bg-slate-900/90 text-slate-300 hover:bg-slate-800'"
        :disabled="loading !== null"
        @click="switchLocale('en')"
      >
        {{ labels.ui.switchToEnglish }}
      </button>
    </div>

    <a
      :href="CV_PDF_PATH"
      download="cv-colin-van-migom-1.pdf"
      class="
        cv-toolbar__btn
        cv-toolbar__btn--primary
        flex
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        border-accent
        bg-slate-900/90
        px-4
        py-2.5
        text-sm
        font-semibold
        text-glow
        backdrop-blur
        transition
        hover:bg-slate-800
        sm:px-5
        sm:py-3
      "
    >
      {{ labels.ui.downloadPdf }}
    </a>

    <button
      v-if="showAtsButton"
      type="button"
      class="
        cv-toolbar__btn
        flex
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        border-slate-600
        bg-slate-900/90
        px-4
        py-2.5
        text-sm
        font-semibold
        text-slate-200
        backdrop-blur
        transition
        hover:bg-slate-800
        disabled:cursor-not-allowed
        disabled:opacity-60
        sm:px-5
        sm:py-3
      "
      :disabled="loading !== null"
      @click="downloadDesignPdf"
    >
      <span v-if="loading === 'design'">{{ labels.ui.generating }}</span>
      <span v-else>{{ labels.ui.generatePdf }}</span>
    </button>

    <button
      v-if="showAtsButton"
      type="button"
      class="
        cv-toolbar__btn
        flex
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        border-slate-600
        bg-slate-900/90
        px-4
        py-2.5
        text-sm
        font-semibold
        text-slate-200
        backdrop-blur
        transition
        hover:bg-slate-800
        disabled:cursor-not-allowed
        disabled:opacity-60
        sm:px-5
        sm:py-3
      "
      :disabled="loading !== null"
      @click="downloadAtsPdf"
    >
      <span v-if="loading === 'ats'">{{ labels.ui.generating }}</span>
      <span v-else>{{ labels.ui.downloadAtsPdf }}</span>
    </button>

    <p
      v-if="error"
      class="rounded-lg bg-red-950/80 px-3 py-2 text-sm text-red-300"
    >
      {{ error }}
    </p>
  </div>
</template>
