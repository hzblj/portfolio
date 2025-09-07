import {type ReactNode} from 'react'

import {Config} from '@/config'
import {toPx} from '@/utils'

type Props = Readonly<{
  children: ReactNode
}>

export default function RootLayout({children}: Props) {
  return (
    <main>
      <div
        className="overflow-hidden"
        style={{
          height: toPx(Config.layout.height),
          transformOrigin: 'left top 0px',
          width: toPx(Config.layout.width),
        }}
      >
        {children}
      </div>
    </main>
  )
}
