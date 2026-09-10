interface TypewriterOptions {
  phrases: MaybeRef<string[]>
  typeSpeed?: number
  deleteSpeed?: number
  pauseDuration?: number
}

export function useTypewriter(options: TypewriterOptions) {
  const {
    phrases,
    typeSpeed = 85,
    deleteSpeed = 45,
    pauseDuration = 1800,
  } = options

  const displayedText = ref('')
  const phraseIndex = ref(0)
  const isDeleting = ref(false)

  let timeoutId: ReturnType<typeof setTimeout> | undefined

  function clearTimer() {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId)
      timeoutId = undefined
    }
  }

  function schedule(next: () => void, delay: number) {
    clearTimer()
    timeoutId = setTimeout(next, delay)
  }

  function tick() {
    const phraseList = toValue(phrases)

    if (phraseList.length === 0) {
      displayedText.value = ''
      return
    }

    const currentPhrase = phraseList[phraseIndex.value % phraseList.length] ?? ''

    if (!isDeleting.value) {
      displayedText.value = currentPhrase.slice(0, displayedText.value.length + 1)

      if (displayedText.value === currentPhrase) {
        schedule(() => {
          isDeleting.value = true
          tick()
        }, pauseDuration)
        return
      }

      schedule(tick, typeSpeed)
      return
    }

    displayedText.value = currentPhrase.slice(0, displayedText.value.length - 1)

    if (displayedText.value === '') {
      isDeleting.value = false
      phraseIndex.value = (phraseIndex.value + 1) % phraseList.length
      schedule(tick, 350)
      return
    }

    schedule(tick, deleteSpeed)
  }

  function start() {
    clearTimer()
    displayedText.value = ''
    phraseIndex.value = 0
    isDeleting.value = false
    tick()
  }

  function stop() {
    clearTimer()
  }

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const phraseList = toValue(phrases)
      displayedText.value = phraseList[0] ?? ''
      return
    }

    start()
  })

  onUnmounted(stop)

  watch(
    () => toValue(phrases),
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const phraseList = toValue(phrases)
        displayedText.value = phraseList[0] ?? ''
        stop()
        return
      }

      start()
    },
  )

  return {
    displayedText,
  }
}
