import Image from 'next/image'
import {FC} from 'react'

import {EntryTechnologies} from '@/db'
import {cn} from '@/utils/cn'

type TechnologyVariant = 'white' | 'blue'

type TechnologyProps = {
  title: string
  image: string
  url: string
  variant: TechnologyVariant
}

const variantClasses: Record<TechnologyVariant, string> = {
  blue: `
    bg-[linear-gradient(180deg,#1CEDFC_0%,rgba(28,237,252,0.72)_100%)]
    drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]
  `,
  white: `
    bg-[linear-gradient(180deg,#FFFFFF_0%,rgba(255,255,255,0.72)_100%)]
    drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]
  `,
}

const Technology: FC<TechnologyProps> = ({title, image, variant, url}) => (
  <a href={url} target="_blank">
    <div className="flex flex-col items-center">
      <div className="w-[96px] h-[84px] relative mb-3">
        <Image
          src={image}
          priority
          alt={title}
          fill
          sizes="84px"
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
      <h3
        className={cn(
          'text-[14px] font-normal leading-[100%] tracking-[0px] bg-clip-text text-transparent',
          variantClasses[variant]
        )}
      >
        {title}
      </h3>
    </div>
  </a>
)

export const CardTechnologies = ({area}: EntryTechnologies) => (
  <div
    className="w-full shrink-0 flex h-full contain-intrinsic overflow-hidden card-border-gradient"
    style={{gridArea: area, transformStyle: 'preserve-3d'}}
  >
    <div className="flex flex-row w-full grow overflow-hidden h-full items-center justify-center gap-[43.33px]">
      <Technology title="React Native" image="/svg/react-native.svg" variant="blue" url="https://reactnative.dev" />
      <Technology title="Expo" image="/svg/expo.svg" variant="white" url="https://expo.dev" />
      <Technology title="React" image="/svg/react.svg" variant="blue" url="https://react.dev" />
      <Technology title="Next.js" image="/svg/next-js.svg" variant="white" url="https://nextjs.org" />
    </div>
  </div>
)
