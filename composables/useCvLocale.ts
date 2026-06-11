import type { CvLocale } from '~/data/cv'
import { parseCvLocale } from '~/data/cv'

export function useCvLocale() {
  const route = useRoute()
  const locale = useState<CvLocale>('cv-locale', () => 'fr')

  function setLocale(nextLocale: CvLocale) {
    locale.value = nextLocale
  }

  watch(
    () => route.query.lang,
    (lang) => {
      if (lang !== undefined) {
        locale.value = parseCvLocale(lang)
      }
    },
    { immediate: true },
  )

  return {
    locale,
    setLocale,
  }
}
