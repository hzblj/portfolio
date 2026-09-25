import {getAreaRect} from '../grid'
import {nearestScreenRect, view} from './view'

const profile = getAreaRect('profile')

export const introTarget = () => {
  if (view.width === 0) {
    return null
  }

  const {x, y, width, height} = nearestScreenRect(profile)

  return {height, left: x, top: y, width}
}
