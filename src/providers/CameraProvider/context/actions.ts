import {toPx} from '@/utils'

import {HEIGHT, ORIGIN_X, ORIGIN_Y, WIDTH} from '../const'
import {CameraAction, CameraOffset, CameraState, CameraTransforms} from './types'

const recalculateTransforms = (state: CameraState): CameraTransforms => {
  const camera = state.camera

  const baseX = Math.floor((camera.x - ORIGIN_X) / WIDTH)
  const baseY = Math.floor((camera.y - ORIGIN_Y) / HEIGHT)

  const viewport = `translate3d(${toPx(-camera.x)}, ${toPx(-camera.y)}, 0px)`

  const x1 = `translate3d(${toPx(ORIGIN_X + baseX * WIDTH)}, ${toPx(ORIGIN_Y + baseY * HEIGHT)}, 0px)`

  const x2 = `translate3d(${toPx(ORIGIN_X + (baseX + 1) * WIDTH)}, ${toPx(ORIGIN_Y + baseY * HEIGHT)}, 0px)`

  const x3 = `translate3d(${toPx(ORIGIN_X + baseX * WIDTH)}, ${toPx(ORIGIN_Y + (baseY + 1) * HEIGHT)}, 0px)`

  const x4 = `translate3d(${toPx(ORIGIN_X + (baseX + 1) * WIDTH)}, ${toPx(ORIGIN_Y + (baseY + 1) * HEIGHT)}, 0px)`

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
