export const CV_WIDTH = 572
export const CV_PREVIEW_HEIGHT = 1600
const CV_SCALE = 0.576923
export const CV_BORDER_ANGLE = 134.62
export const CV_REVEAL_LINE = 0.92

export const cvPreviewRect = () => ({
  height: CV_PREVIEW_HEIGHT * CV_SCALE,
  width: CV_WIDTH * CV_SCALE,
  x: 1 + 50 * CV_SCALE,
  y: 1 + 64 * CV_SCALE,
})

export const cvPreviewClip = (width: number) => ({height: 681 - 4, width: width - 4, x: 3, y: 3})

export const RAMP = [
  [0, 'rgba(0, 0, 0, 0)'],
  [0.7283, 'rgba(0, 0, 0, 1)'],
  [1, 'rgba(0, 0, 0, 1)'],
] as const
