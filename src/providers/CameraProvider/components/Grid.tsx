import {type CSSProperties, type ReactNode} from 'react'

import {Config} from '@/config'
import {toPx} from '@/utils'

type GridProps = {
  children?: ReactNode
  transform?: CSSProperties['transform']
}

const Grid = ({children, transform}: GridProps) => (
  <div
    className="absolute flex shrink-0 max-w-none transform-gpu will-change-transform"
    style={{
      height: toPx(Config.layout.height),
      transform,
      transformStyle: 'preserve-3d',
      width: toPx(Config.layout.width),
    }}
  >
    <section className="grid gap-[16px] min-h-0 min-w-0 content-grid p-[2px]">{children}</section>
  </div>
)

export default Grid
