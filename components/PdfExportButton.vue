<script setup lang="ts">
const loading = ref(false)
const error = ref('')

async function downloadPdf() {
  loading.value = true
  error.value = ''

  try {
    const response = await fetch('/api/cv/pdf')

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
    error.value = 'Impossible de générer le PDF. Réessayez.'
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="fixed top-6 right-6 z-50 flex flex-col items-end gap-2">
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
      :disabled="loading"
      @click="downloadPdf"
    >
      <span v-if="loading">Génération…</span>
      <span v-else>Télécharger en PDF</span>
    </button>

    <p
      v-if="error"
      class="rounded-lg bg-red-950/80 px-3 py-2 text-sm text-red-300"
    >
      {{ error }}
    </p>
  </div>
</template>
