import {type ReactNode} from 'react'

import {ControlsDock, PersonJsonLd} from '@/components'
import {Config} from '@/config'
import {IntroProvider, SoundProvider} from '@/providers'
import {toPx} from '@/utils'

type Props = Readonly<{
  children: ReactNode
}>

export default function RootLayout({children}: Props) {
  return (
    <SoundProvider>
      <IntroProvider>
        <PersonJsonLd />
        <main id="main" className="bg-black block relative">
          <div
            className="overflow-hidden responsive-scale will-change-[transform,opacity] origin-[0px_0px]"
            style={{
              height: toPx(Config.layout.height),
              width: toPx(Config.layout.width),
            }}
          >
            {children}
          </div>
        </main>
        <ControlsDock />
      </IntroProvider>
    </SoundProvider>
  )
}
