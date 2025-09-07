import {toPx} from '@/utils'

import {HEIGHT, WIDTH} from '../const'
import {CameraAction, CameraOffset, CameraState, CameraTransforms} from './types'

const recalculateTransforms = (state: CameraState): CameraTransforms => {
  const camera = state.camera
  const origin = state.origin

  const baseX = Math.floor((camera.x - origin.x) / WIDTH)
  const baseY = Math.floor((camera.y - origin.y) / HEIGHT)

  const viewport = `translate3d(${toPx(-camera.x)}, ${toPx(-camera.y)}, 0px)`

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

    const newState: CameraState = {
      ...draft,
      camera: {
        x: draft.camera.x + direction * x,
        y: draft.camera.y + direction * y,
      },
    }

    return {
      ...newState,
      ...recalculateTransforms(newState),
    }
  })
