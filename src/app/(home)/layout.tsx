import {type ReactNode} from 'react'

import {Config} from '@/config'
import {toPx} from '@/utils'

type Props = Readonly<{
  children: ReactNode
}>

export default function RootLayout({children}: Props) {
  return (
    <main id="main" className="bg-black block relative">
      <div
        className="overflow-hidden responsive-scale"
        style={{
          height: toPx(Config.layout.height),
          transformOrigin: '0px 0px',
          width: toPx(Config.layout.width),
        }}
      >
        {children}
      </div>
    </main>
  )
}
