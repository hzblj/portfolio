import {Config} from '@/config'

export const WIDTH = Config.viewport.width
export const HEIGHT = Config.viewport.height

export const calculateScale = (width: number) => {
  if (width <= 767) {
    return 0.86 // Mobile
  } else if (width >= 768 && width <= 1023) {
    return 1.0 // Tablet
  } else if (width >= 1024 && width < 1920) {
    return 1.0 // Small desktop
  } else if (width >= 1920 && width < 2560) {
    return 1.0 // Full HD
  } else if (width >= 2560 && width < 3440) {
    return 1.1 // QHD / 4xl
  } else if (width >= 3440 && width < 3840) {
    return 1.5 // Ultrawide
  } else if (width >= 3840 && width < 5120) {
    return 1.75 // 5xl / 4K
  } else if (width >= 5120) {
    return 2.0 // 6xl / 5K+
  }

  return 1.0
}
