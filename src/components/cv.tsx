import {FC} from 'react'

import {cv} from '@/db'

const SectionLeft = () => {
  return (
    <div className="w-[88px] h-[17px] flex-shrink-0">
      <span className="font-normal text-[14px] leading-[100%] tracking-[0px] text-white/40">2022 - Now</span>
    </div>
  )
}

const SectionPositions = () => {
  return (
    <div>
      <span className="font-normal text-[14px] leading-[100%] tracking-[0px] text-white h-[17px]">
        Lead Mobile Developer at Footshop
      </span>
    </div>
  )
}

const SectionLocation = () => {
  return (
    <div>
      <span className="font-normal text-[14px] leading-[100%] tracking-[0px] text-white/60 h-[17px]">
        Prague, CZ / Remote
      </span>
    </div>
  )
}

const SectionTechnologies = () => {
  return (
    <div>
      <span className="font-normal text-[14px] leading-[100%] tracking-[0px] text-white/50 h-[17px]">
        React Native, Expo, Turbo Monorepo, TypeScript, Maestro
      </span>
    </div>
  )
}

type SectionParagraphProps = {
  text: string
}

const SectionParagraph: FC<SectionParagraphProps> = ({text}) => {
  return (
    <div>
      <span className="font-normal text-[14px] leading-[24px] tracking-[0px] text-white/50">{text}</span>
    </div>
  )
}

const SectionTitle = () => {
  return (
    <div>
      <SectionPositions />
      <SectionLocation />
      <SectionTechnologies />
    </div>
  )
}

const SectionRight = () => {
  return (
    <div>
      <SectionTitle />
      <SectionParagraph text="Joined Footshop to lead the development of a brand-new mobile app for iOS and Android, drawing on my experience building performant, cross-platform apps." />
      <SectionParagraph text="I designed and built the mobile architecture using React Native with Expo, implementing a Turbo Monorepo setup to enable efficient code sharing across multiple projects. I led the full development lifecycle of the Footshop mobile app, guiding it from initial prototyping through to production release and deployment on app stores. In parallel, I developed the Queens mobile app, Footshop’s sister brand, leveraging the same shared architecture to accelerate delivery and maintain consistency. To ensure quality and reliability, I established end-to-end testing workflows using Maestro, achieving high test coverage across key user flows. Throughout the project, I worked closely with product managers, designers, and backend developers to deliver seamless, branded shopping experiences. A strong emphasis was placed on scalability, performance, and developer experience, supported by a clean and maintainable architecture." />
    </div>
  )
}

const Section = () => {
  return (
    <div className="flex flex-row w-full items-start gap-[44px]">
      <SectionLeft />
      <SectionRight />
    </div>
  )
}

export const CV = () => {
  const workExperience = cv.workExperience

  return (
    <div className="flex w-full justify-center">
      <div className="max-w-[700px] flex flex-col items-center py-[56px] px-[64px]">
        {workExperience.map((section, index) => (
          <div key={index.toString()} className="flex flex-col w-full">
            <Section />
          </div>
        ))}
      </div>
    </div>
  )
}
