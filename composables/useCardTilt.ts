const DEFAULT_MAX_TILT = 10

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useCardTilt(maxTilt = DEFAULT_MAX_TILT) {
  function onMouseMove(event: MouseEvent) {
    if (prefersReducedMotion()) return

    const card = event.currentTarget as HTMLElement
    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  }

  function onMouseLeave(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement
    card.style.transform = ''
  }

  return { onMouseMove, onMouseLeave }
}
