import {type CSSProperties, type ReactNode} from 'react'

import {Config} from '@/config'
import {toPx} from '@/utils'

type GridProps = {
  children?: ReactNode
  transform?: CSSProperties['transform']
}

export const Grid = ({children, transform}: GridProps) => (
  <div className="absolute flex shrink-0" style={{height: toPx(Config.height), transform, width: toPx(Config.width)}}>
    <section className="grid p-2 gap-4 min-h-0 min-w-0 content-grid">{children}</section>
  </div>
)
