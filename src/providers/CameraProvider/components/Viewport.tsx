import {type CSSProperties, type ReactNode} from 'react'

type ViewportProps = {
  children?: ReactNode
  transform?: CSSProperties['transform']
}

export const Viewport = ({children, transform}: ViewportProps) => (
  <div
    className="flex justify-center shrink-0 items-center w-full h-full relative"
    style={{transform: transform, willChange: 'transform'}}
  >
    <div className="flex justify-center items-center w-full h-full">{children}</div>
  </div>
)
