import {type CSSProperties, type ReactNode} from 'react'

import {Config} from '@/config'
import {toPx} from '@/utils'

type GridProps = {
  children?: ReactNode
  transform?: CSSProperties['transform']
}

const Grid = ({children, transform}: GridProps) => (
  <div
    className="absolute flex shrink-0"
    style={{
      height: toPx(Config.layout.height),
      transform,
      width: toPx(Config.layout.width),
    }}
  >
    <section className="grid gap-[16px] min-h-0 min-w-0 content-grid">{children}</section>
  </div>
)

export default Grid
