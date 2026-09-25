import {type ReactNode} from 'react'

import {ControlsDock} from '@/components'
import {IntroProvider, SoundProvider} from '@/providers'
import {Scene} from '@/scene'

type Props = Readonly<{
  children: ReactNode
}>

export default function HomeLayout({children}: Props) {
  return (
    <SoundProvider>
      <IntroProvider>
        <div id="main" className="relative block h-full w-full bg-black">
          <Scene />
          {children}
        </div>
        <ControlsDock />
      </IntroProvider>
    </SoundProvider>
  )
}
