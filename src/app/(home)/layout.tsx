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
        className="overflow-hidden scale-[0.7] md:scale-100"
        style={{
          height: toPx(Config.height),
          transformOrigin: 'left top 0px',
          width: toPx(Config.width),
        }}
      >
        {children}
      </div>
    </main>
  )
}
