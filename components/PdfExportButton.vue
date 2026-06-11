<script setup lang="ts">
import type { CvLocale } from '~/data/cv'

const { locale, labels } = useCvData()
const { setLocale } = useCvLocale()

const loading = ref<'design' | 'ats' | null>(null)
const error = ref('')

async function downloadPdf(endpoint: '/api/cv/pdf' | '/api/cv/pdf-ats', type: 'design' | 'ats') {
  loading.value = type
  error.value = ''

  try {
    const response = await fetch(`${endpoint}?lang=${locale.value}`)

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
    error.value = type === 'ats'
      ? labels.value.ui.atsPdfError
      : labels.value.ui.pdfError
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
  <div class="fixed top-6 right-6 z-50 flex flex-col items-end gap-2">
    <div class="flex gap-2">
      <button
        type="button"
        class="
          rounded-xl
          border
          px-4
          py-2
          text-sm
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
          rounded-xl
          border
          px-4
          py-2
          text-sm
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

    <button
      type="button"
      class="
        flex
        items-center
        gap-2
        rounded-xl
        border
        border-accent
        bg-slate-900/90
        px-5
        py-3
        text-sm
        font-semibold
        text-glow
        backdrop-blur
        transition
        hover:bg-slate-800
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
      :disabled="loading !== null"
      @click="downloadPdf('/api/cv/pdf', 'design')"
    >
      <span v-if="loading === 'design'">{{ labels.ui.generating }}</span>
      <span v-else>{{ labels.ui.downloadPdf }}</span>
    </button>

    <button
      type="button"
      class="
        flex
        items-center
        gap-2
        rounded-xl
        border
        border-slate-600
        bg-slate-900/90
        px-5
        py-3
        text-sm
        font-semibold
        text-slate-200
        backdrop-blur
        transition
        hover:bg-slate-800
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
      :disabled="loading !== null"
      @click="downloadPdf('/api/cv/pdf-ats', 'ats')"
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
