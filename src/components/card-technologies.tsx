'use client'

import {useRef} from 'react'

import {EntryTechnologies} from '@/db'
import {useEntranceAnimation} from '@/hooks'

import {CardTechnologiesTechnology} from './card-technologies-technology'

export const CardTechnologies = ({area, animation}: EntryTechnologies) => {
  const refCard = useRef<HTMLDivElement>(null)
  useEntranceAnimation(refCard, animation)

  return (
    <div
      ref={refCard}
      className="w-full shrink-0 flex h-full contain-intrinsic overflow-hidden card"
      style={{gridArea: area, transformStyle: 'preserve-3d'}}
    >
      <div className="flex flex-row w-full grow overflow-hidden h-full items-center justify-center gap-[43.33px]">
        <CardTechnologiesTechnology
          title="React Native"
          image="/svg/react-native.svg"
          variant="blue"
          url="https://reactnative.dev"
        />
        <CardTechnologiesTechnology title="Expo" image="/svg/expo.svg" variant="white" url="https://expo.dev" />
        <CardTechnologiesTechnology title="React" image="/svg/react.svg" variant="blue" url="https://react.dev" />
        <CardTechnologiesTechnology title="Next.js" image="/svg/next-js.svg" variant="white" url="https://nextjs.org" />
      </div>
    </div>
  )
}
