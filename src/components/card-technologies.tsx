import {EntryTechnologies} from '@/db'

import {CardTechnologiesTechnology} from './card-technologies-technology'

export const CardTechnologies = ({area}: EntryTechnologies) => (
  <div
    className="w-full shrink-0 flex h-full contain-intrinsic overflow-hidden card-border-gradient"
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
