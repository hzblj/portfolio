import {FC, ReactNode} from 'react'

import {CVSection, CVSectionLink, CVSectionProject, cv} from '@/db'
import {cn} from '@/utils'

const SectionLeft: FC<{year: string}> = ({year}) => (
  <div className="w-[88px] h-[17px] flex-shrink-0">
    <span className="block font-normal text-[14px] leading-[100%] tracking-[0px] text-white/40">{year}</span>
  </div>
)

const Dot = () => <div className="w-[4px] h-[4px] bg-white/20 rounded-full" />
const Line = () => <div className="w-[1.5px] h-[18.75px] bg-white/15 rounded-[2px]" />

const Segments: FC<Pick<CVSection, 'positions'>> = ({positions}) => {
  if (positions.length - 1 === 0) {
    return null
  }

  return (
    <div className="absolute left-[-13px] top-[7px] flex flex-col items-center justify-center gap-[2px]">
      {positions.map((_, index) => (
        <div key={index.toString()} className="flex flex-col items-center justify-center gap-[2px]">
          <Dot />
          {index !== positions.length - 1 && <Line />}
        </div>
      ))}
    </div>
  )
}

const variant: Record<'active' | 'inactive', string> = {
  active: 'text-white',
  inactive: 'text-white/60',
}

const SectionPositions: FC<Pick<CVSection, 'positions'>> = props => (
  <div className="flex flex-col flex-shrink-0 h-full gap-[10px] relative">
    <Segments positions={props.positions} />
    {props.positions.map((position, index) => (
      <span
        key={index.toString()}
        className={cn(
          'block font-normal text-[14px] leading-[100%] tracking-[0px] h-[17px]',
          variant[index === 0 ? 'active' : 'inactive']
        )}
      >
        {position}
      </span>
    ))}
  </div>
)

const SectionLocation: FC<Pick<CVSection, 'location'>> = props => {
  if (!props.location) {
    return null
  }

  return (
    <div>
      <span className="block font-normal text-[14px] leading-[100%] tracking-[0px] text-white/60 h-[17px]">
        {props.location}
      </span>
    </div>
  )
}

const SectionTechnologies: FC<Pick<CVSection, 'technologies'>> = props => {
  if (!props.technologies || props.technologies.length === 0) {
    return null
  }

  return (
    <div>
      <span className="block font-normal text-[14px] leading-[100%] tracking-[0px] text-white/50 h-[17px]">
        {props.technologies.join(', ')}
      </span>
    </div>
  )
}

const SectionParagraph: FC<{children: ReactNode}> = ({children}) => (
  <div>
    <p className="block font-normal text-[14px] leading-[22px] tracking-[0px] text-white/50">{children}</p>
  </div>
)

const SectionLink: FC<CVSectionLink> = ({name, url}) => (
  <div>
    <a
      href={url}
      target="_blank"
      className="block font-normal text-[14px] leading-[22px] tracking-[0px] text-white/50 underline decoration-white/20 decoration-[1.5px] underline-offset-4 hover:decoration-white/40 transition-colors duration-300 ease-in-out"
    >
      {name}
    </a>
  </div>
)

const SectionLinks: FC<Pick<CVSection, 'links'>> = ({links}) => {
  if (!links || links.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-[24px] pt-[24px]">
      {links.map((link, index) => (
        <SectionLink key={index.toString()} {...link} />
      ))}
    </div>
  )
}

const SectionTitle: FC<Pick<CVSection, 'positions' | 'location' | 'technologies'>> = ({
  positions,
  location,
  technologies,
}) => (
  <div className="flex flex-col gap-[6px] pb-[24px]">
    <SectionPositions positions={positions} />
    <SectionLocation location={location} />
    <SectionTechnologies technologies={technologies} />
  </div>
)

const SectionProject: FC<CVSectionProject> = ({name, position, technologies, paragraphs, url}) => (
  <div>
    <div className="flex flex-col gap-[8px] pb-[24px]">
      <div>
        <a
          href={url}
          target="_blank"
          className="block font-normal text-[14px] leading-[22px] tracking-[0px] text-white/80 h-[22px] underline decoration-white/20 decoration-[1.5px] underline-offset-4 hover:decoration-white/40 transition-colors duration-300 ease-in-out"
        >
          {name}
        </a>
      </div>
      <div>
        <span className="block font-normal text-[14px] leading-[100%] tracking-[0px] text-white/60 h-[17px]">
          {position}
        </span>
      </div>
      <div>
        <SectionTechnologies technologies={technologies} />
      </div>
    </div>
    <div className="flex flex-col gap-[24px]">
      {paragraphs.map((paragraph, index) => (
        <SectionParagraph key={index.toString()}>{paragraph}</SectionParagraph>
      ))}
    </div>
  </div>
)

const SectionProjects: FC<Pick<CVSection, 'projects'>> = ({projects}) => {
  if (!projects || projects?.length === 0) {
    return null
  }

  return (
    <div>
      <div className="py-[24px]">
        <span className="block font-normal text-[14px] leading-[22px] tracking-[0px] text-white h-[22px]">
          Projects
        </span>
      </div>
      <div className="flex flex-col gap-[24px]">
        {projects.map((project, index) => (
          <SectionProject key={index.toString()} {...project} />
        ))}
      </div>
    </div>
  )
}

const SectionRight: FC<Omit<CVSection, 'year'>> = ({
  paragraphs,
  positions,
  location,
  technologies,
  projects,
  links,
}) => (
  <div>
    <SectionTitle positions={positions} location={location} technologies={technologies} />
    <div className="flex flex-col gap-[24px]">
      {paragraphs.map((paragraph, index) => (
        <SectionParagraph key={index.toString()}>{paragraph}</SectionParagraph>
      ))}
    </div>
    <SectionProjects projects={projects} />
    <SectionLinks links={links} />
  </div>
)

const Section = ({year, ...props}: CVSection) => (
  <div className="flex flex-row w-full items-start gap-[44px]">
    <SectionLeft year={year} />
    <SectionRight {...props} />
  </div>
)

export const CV = () => {
  const workExperience = cv.workExperience
  const sideProjects = cv.sideProjects
  const education = cv.education

  return (
    <div className="h-full w-full flex flex-col max-w-[572px]">
      <div className="w-full h-full flex flex-col gap-[64px]">
        <div className="h-[17px]">
          <h1 className="block font-normal text-[14px] leading-[100%] tracking-[0px] text-white">Work Experience</h1>
        </div>
        <div className="flex flex-col gap-[56px]">
          {workExperience.map((section, index) => (
            <div key={index.toString()} className="flex flex-col w-full">
              <Section {...section} />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-[56px]">
          <div className="h-[17px]">
            <h1 className="block font-normal text-[14px] leading-[100%] tracking-[0px] text-white">Side Projects</h1>
          </div>
          {sideProjects.map((section, index) => (
            <div key={index.toString()} className="flex flex-col w-full">
              <Section {...section} />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-[56px]">
          <div className="h-[17px]">
            <h1 className="block font-normal text-[14px] leading-[100%] tracking-[0px] text-white">Education</h1>
          </div>
          {education.map((section, index) => (
            <div key={index.toString()} className="flex flex-col w-full">
              <Section {...section} />
            </div>
          ))}
        </div>

        <div className="flex h-[300px] w-full flex-shrink-0"></div>
      </div>
    </div>
  )
}
