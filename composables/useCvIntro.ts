export function useCvIntro() {
  const isIntroComplete = useState('cv-intro-complete', () => false)
  const profilePhotoEl = shallowRef<HTMLElement | null>(null)

  function completeIntro() {
    isIntroComplete.value = true
  }

  function resetIntro() {
    isIntroComplete.value = false
  }

  return {
    isIntroComplete,
    profilePhotoEl,
    completeIntro,
    resetIntro,
  }
}
