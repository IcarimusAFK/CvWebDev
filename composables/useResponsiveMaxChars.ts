function getMaxCharsForWidth(width: number) {
  if (width < 640) return 22
  if (width < 1024) return 36
  return 999
}

export function useResponsiveMaxChars() {
  const maxCharsPerLine = ref(
    import.meta.client ? getMaxCharsForWidth(window.innerWidth) : 22,
  )

  function updateMaxChars() {
    maxCharsPerLine.value = getMaxCharsForWidth(window.innerWidth)
  }

  onMounted(() => {
    updateMaxChars()
    window.addEventListener('resize', updateMaxChars)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateMaxChars)
  })

  return { maxCharsPerLine }
}
