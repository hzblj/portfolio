import {isBool, toPx} from '@/utils'

import {calculateScale, clampZoom, HEIGHT, WIDTH} from '../const'
import {CameraAction, CameraOffset, CameraState, CameraTransforms, CameraZoom} from './types'

export const recalculateTransforms = (state: CameraState): CameraTransforms => {
  const camera = state.camera
  const origin = state.origin

  const baseX = Math.floor((camera.x - origin.x) / WIDTH)
  const baseY = Math.floor((camera.y - origin.y) / HEIGHT)

  const viewport = `scale(${state.scale}) translate3d(${toPx(-camera.x)}, ${toPx(-camera.y)}, 0px)`

  const x1 = `translate3d(${toPx(origin.x + baseX * WIDTH)}, ${toPx(origin.y + baseY * HEIGHT)}, 0px)`

  const x2 = `translate3d(${toPx(origin.x + (baseX + 1) * WIDTH)}, ${toPx(origin.y + baseY * HEIGHT)}, 0px)`

  const x3 = `translate3d(${toPx(origin.x + baseX * WIDTH)}, ${toPx(origin.y + (baseY + 1) * HEIGHT)}, 0px)`

  const x4 = `translate3d(${toPx(origin.x + (baseX + 1) * WIDTH)}, ${toPx(origin.y + (baseY + 1) * HEIGHT)}, 0px)`

  return {
    viewport,
    x1,
    x2,
    x3,
    x4,
  }
}

export const actionOnScroll = (dispatch: CameraAction, offset: CameraOffset) =>
  dispatch(draft => {
    const {x, y} = offset
    const direction = draft.scrollBehavior === 'backwards' ? -1 : 1

    // Pan happens in unscaled grid space, but the viewport is rendered at
    // `scale`. Dividing by it keeps panning 1:1 with on-screen pixels while
    // zoomed in (at scale 1 this is a no-op, so existing behavior is untouched).
    const scale = draft.scale

    const newState: CameraState = {
      ...draft,
      camera: {
        x: draft.camera.x + (direction * x) / scale,
        y: draft.camera.y + (direction * y) / scale,
      },
    }

    return {
      ...newState,
      ...recalculateTransforms(newState),
    }
  })

// Zoom toward a fixed screen point (`focal`, in client pixels): keep the grid
// content under `focal` anchored while `scale` changes. Solving
// `screen = base * scale * (world - camera)` for a constant `world` under
// `focal` gives `camera' = camera + focal / base * (1 / scale - 1 / scale')`,
// where `base` is the responsive CSS breakpoint scale applied by the ancestor.
export const actionOnZoom = (dispatch: CameraAction, {focal, minScale, scaleBy, scaleTo}: CameraZoom) =>
  dispatch(draft => {
    const scale = draft.scale
    const target = typeof scaleTo === 'number' ? scaleTo : scale * (scaleBy ?? 1)
    const nextScale = clampZoom(target, minScale)

    if (nextScale === scale) {
      return draft
    }

    const base = typeof window === 'undefined' ? 1 : calculateScale(window.innerWidth)
    const factor = (1 / scale - 1 / nextScale) / base

    const newState: CameraState = {
      ...draft,
      camera: {
        x: draft.camera.x + focal.x * factor,
        y: draft.camera.y + focal.y * factor,
      },
      scale: nextScale,
    }

    return {
      ...newState,
      ...recalculateTransforms(newState),
    }
  })

export const actionToggleModal = (dispatch: CameraAction, isOpen?: boolean) =>
  dispatch(draft => {
    return {
      ...draft,
      isModalOpen: isBool(isOpen) ? isOpen : !draft.isModalOpen,
    }
  })
