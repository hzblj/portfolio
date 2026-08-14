'use client'

import classNames from 'classnames'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {FC, ReactNode, type RefObject, useLayoutEffect, useRef} from 'react'

import {CVPosition, CVSection, CVSectionLink, CVSectionProject, cv} from '@/db'
import {cn} from '@/utils'

import {LinkExternal} from './link-external'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const SectionLeft: FC<{year: string}> = ({year}) => (
  <div className="w-[88px] h-[17px] flex-shrink-0">
    <span data-cv-reveal="true" className="block font-normal text-[14px] leading-[100%] tracking-[0px] text-white/40">
      {year}
    </span>
  </div>
)

const Dot = () => <div className="w-[4px] h-[4px] bg-white/20 rounded-full" />
const Line = () => <div className="w-[1.5px] h-[18.75px] bg-white/15 rounded-[2px]" />

const Segments: FC<Pick<CVSection, 'positions'>> = ({positions}) => {
  if (positions.length - 1 === 0) {
    return null
  }

  return (
    // Revealed with the positions it runs alongside. Left out of the reveal it
    // sat there fully drawn next to labels that had not arrived yet, which read
    // as broken rather than as a rail waiting to be filled. One node, not one
    // per dot: sliding a dotted rail in piece by piece draws the eye to the
    // rail, and the rail is not the content.
    <div
      data-cv-reveal="true"
      className="absolute left-[-13px] top-[7px] flex flex-col items-center justify-center gap-[2px]"
    >
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

const PositionLabel: FC<CVPosition & {className?: string}> = ({title, company, url, className}) => {
  const label = company ? `${title} at ` : title

  if (company && url) {
    return (
      <span className={className}>
        {label}
        <LinkExternal url={url} variant="muted">
          <span className={className}>{company}</span>
        </LinkExternal>
      </span>
    )
  }

  if (company) {
    return (
      <span className={className}>
        {label}
        {company}
      </span>
    )
  }

  return <span className={className}>{title}</span>
}

const SectionPositions: FC<Pick<CVSection, 'positions'>> = props => (
  <div className="flex flex-col flex-shrink-0 h-full gap-[10px] relative">
    <Segments positions={props.positions} />
    {props.positions.map((position, index) => (
      <div key={index.toString()} data-cv-reveal="true" className="h-[17px]">
        <PositionLabel
          {...position}
          className={cn(
            'font-normal text-[14px] leading-[100%] tracking-[0px]',
            variant[index === 0 ? 'active' : 'inactive']
          )}
        />
      </div>
    ))}
  </div>
)

const SectionLocation: FC<Pick<CVSection, 'location'>> = props => {
  if (!props.location) {
    return null
  }

  return (
    <div>
      <span
        data-cv-reveal="true"
        className="block font-normal text-[14px] leading-[100%] tracking-[0px] text-white/60 h-[17px]"
      >
        {props.location}
      </span>
    </div>
  )
}

const SectionTechnologies: FC<Pick<CVSection, 'technologies'> & {className?: string}> = props => {
  if (!props.technologies || props.technologies.length === 0) {
    return null
  }

  return (
    <div>
      <span
        data-cv-reveal="true"
        className={classNames(
          'block font-normal text-[14px] leading-[100%] tracking-[0px] text-white/50 h-[17px]',
          props.className
        )}
      >
        {props.technologies.join(', ')}
      </span>
    </div>
  )
}

const SectionParagraph: FC<{children: ReactNode}> = ({children}) => (
  <p className="block font-normal text-[14px] leading-[22px] tracking-[0px] text-white/50">{children}</p>
)

const SectionLink: FC<CVSectionLink> = ({name, url}) => (
  <div>
    <a
      href={url}
      target="_blank"
      data-cv-reveal="true"
      className="block font-normal text-[14px] leading-[22px] tracking-[0px] text-white/50 underline decoration-white/20 decoration-[1.5px] underline-offset-4 hover:decoration-white/40 transition-colors duration-500 ease-out"
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
          data-cv-reveal="true"
          className="block font-normal text-[14px] leading-[22px] tracking-[0px] text-white/80 h-[22px] underline decoration-white/20 decoration-[1.5px] underline-offset-4 hover:decoration-white/40 transition-colors duration-300 ease-in-out"
        >
          {name}
        </a>
      </div>
      <div>
        <span
          data-cv-reveal="true"
          className="block font-normal text-[14px] leading-[100%] tracking-[0px] text-white/60 h-[17px]"
        >
          {position}
        </span>
      </div>
      <div>
        <SectionTechnologies technologies={technologies} />
      </div>
    </div>
    <div className="flex flex-col gap-[24px]">
      {paragraphs.map((paragraph, index) => (
        <div key={index.toString()} data-cv-reveal="true">
          <SectionParagraph>{paragraph}</SectionParagraph>
        </div>
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
        <span
          data-cv-reveal="true"
          className="block font-normal text-[14px] leading-[22px] tracking-[0px] text-white h-[22px]"
        >
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
        <div key={index.toString()} data-cv-reveal="true">
          <SectionParagraph>{paragraph}</SectionParagraph>
        </div>
      ))}
    </div>
    <SectionProjects projects={projects} />
    <SectionLinks links={links} />
  </div>
)

const Section = ({year, ...props}: CVSection) => (
  <div className="flex flex-col md:flex-row w-full items-start gap-[24px] md:gap-[44px]" data-cv-section="true">
    <SectionLeft year={year} />
    <SectionRight {...props} />
  </div>
)

const SectionItem: FC<{name?: string; url?: string; type: string}> = ({name, url, type}) => {
  return (
    <div data-cv-reveal="true" className="flex items-center">
      <span className="block font-normal text-[14px] leading-[100%] tracking-[0px] text-white/40 w-[70.37px] mr-[35.98px]">
        {type}
      </span>
      {url ? (
        <LinkExternal url={url}>
          <span className="text-[14px] font-normal tracking-[0px] bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0.72)_100%)] bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]">
            {name}
          </span>
        </LinkExternal>
      ) : (
        <span className="text-[14px] font-normal tracking-[0px] bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0.72)_100%)] bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]">
          {name}
        </span>
      )}
    </div>
  )
}

const SectionConnect: FC = () => (
  <div className="flex flex-col gap-[19.19px]">
    {cv.connect.map(connect => (
      <SectionItem key={connect.type} {...connect} />
    ))}
  </div>
)

const SectionLanguagesAndLocations: FC = () => (
  <div className="flex flex-row gap-[51px] flex-wrap">
    <div className="flex flex-col gap-[56px]">
      <div className="h-[17px]">
        <h1 data-cv-reveal="true" className="block font-normal text-[14px] leading-[100%] tracking-[0px] text-white">
          Languages
        </h1>
      </div>
      <div className="flex flex-col gap-[19.19px]">
        <SectionItem type="Native" name="Czech" />
        <SectionItem type="B2" name="English" />
      </div>
    </div>
    <div className="flex flex-1" />
    <div className="flex flex-col gap-[56px]">
      <div className="h-[17px]">
        <h1 data-cv-reveal="true" className="block font-normal text-[14px] leading-[100%] tracking-[0px] text-white">
          Locations
        </h1>
      </div>
      <div className="flex flex-col gap-[19.19px]">
        <SectionItem type="Based in" name="Prague, Czechia" />
        <SectionItem type="Raised in" name="Ostrava, Czechia" />
      </div>
    </div>
  </div>
)

type RevealOptions = {
  root: RefObject<HTMLElement | null>
  nodeSelector?: string
  nodeStagger?: number
  introStagger?: number
  nodeDuration?: number
  ease?: gsap.EaseString
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  enable?: boolean
  skipIntro?: boolean
}

/** Fraction of the viewport a line has to reach before it reveals. */
const REVEAL_LINE = 0.92

/**
 * The nearest scrolling ancestor, or undefined for the document.
 *
 * The CV shows up in two places that scroll differently: its own page, where
 * the document scrolls, and the modal, which scrolls a container of its own.
 * ScrollTrigger has to be told which, and finding it beats threading a ref down
 * through the modal for the component's benefit.
 */
const findScroller = (node: HTMLElement | null) => {
  let element = node?.parentElement ?? null

  while (element && element !== document.body) {
    const {overflowY} = getComputedStyle(element)

    if (overflowY === 'auto' || overflowY === 'scroll') {
      return element
    }

    element = element.parentElement
  }

  return undefined
}

/**
 * Reveals the CV line by line, as each line arrives.
 *
 * It used to chain every section onto one timeline that started at mount. With
 * this much CV that timeline runs the best part of a minute, so scrolling down
 * landed you on lines still queued behind the ones above — reading exactly like
 * content loading in slowly, when it was already there and nothing was waiting
 * on the scroll at all.
 *
 * Per-line triggers, then. `batch` is what keeps that from turning into sixty
 * separate pops: it collects the lines that cross the line together and gives
 * them one staggered tween, so a screenful arrives in sequence while the
 * sequence itself is still driven by where you have scrolled to.
 *
 * The first screenful is handled apart from it. Everything up there is already
 * past the reveal line on arrival, so `batch` would take it as one wave and
 * drop the whole top of the page in at once — the opposite of the point. It
 * gets its own staggered tween instead, and the batching starts below the fold.
 */
const useCvSequentialReveal = ({
  root,
  nodeSelector = '[data-cv-reveal]',
  nodeStagger = 0.05,
  introStagger = 0.055,
  nodeDuration = 0.5,
  ease = 'power2.out',
  from = {autoAlpha: 0, y: 20},
  to = {autoAlpha: 1, y: 0},
  enable = true,
  skipIntro = false,
}: RevealOptions) => {
  useLayoutEffect(() => {
    if (!enable || !root.current) {
      return
    }

    const scroller = findScroller(root.current)

    const ctx = gsap.context(() => {
      const nodes = gsap.utils.toArray<HTMLElement>(nodeSelector)

      if (!nodes.length) {
        return
      }

      gsap.set(nodes, {...from})

      // Both rects are viewport-relative, so this works the same whether the
      // scrolling thing is a container part-way down the screen or the document.
      const bounds = scroller?.getBoundingClientRect()
      const revealLine = (bounds?.top ?? 0) + (scroller?.clientHeight ?? window.innerHeight) * REVEAL_LINE

      const onScreen: HTMLElement[] = []
      const belowFold: HTMLElement[] = []

      nodes.forEach(node => {
        ;(node.getBoundingClientRect().top < revealLine ? onScreen : belowFold).push(node)
      })

      if (onScreen.length) {
        // A modal restored from the session is not being opened, so its first
        // screen is simply already there.
        gsap.to(onScreen, {
          ...to,
          duration: skipIntro ? 0 : nodeDuration,
          ease,
          force3D: true,
          stagger: skipIntro ? 0 : introStagger,
        })
      }

      if (!belowFold.length) {
        return
      }

      ScrollTrigger.batch(belowFold, {
        // Caps how long one wave can run: without it, a dense screenful would
        // trail on well after you had scrolled past it.
        batchMax: 8,
        interval: 0.08,
        // A line that has arrived has arrived — replaying it on the way back up
        // would fight the reader.
        once: true,
        onEnter: batch =>
          gsap.to(batch, {
            ...to,
            duration: nodeDuration,
            ease,
            force3D: true,
            overwrite: true,
            stagger: nodeStagger,
          }),
        scroller,
        start: `top ${REVEAL_LINE * 100}%`,
      })
    }, root)

    return () => ctx.revert()
  }, [root, nodeSelector, nodeStagger, introStagger, nodeDuration, ease, from, to, enable, skipIntro])
}

export type CVProps = {
  children?: ReactNode
  animated?: boolean
  /** Restored rather than opened: show the first screen without replaying it. */
  instant?: boolean
}

export const CV: FC<CVProps> = ({children, animated = false, instant = false}) => {
  const ref = useRef<HTMLDivElement>(null)

  const workExperience = cv.workExperience
  const sideProjects = cv.sideProjects
  const education = cv.education

  useCvSequentialReveal({enable: animated, root: ref, skipIntro: instant})

  return (
    <div className="h-full w-full flex flex-col max-w-[572px]">
      <div ref={ref} className="w-full h-full flex flex-col gap-[44px] md:gap-[56px]">
        <div className="h-[17px]">
          <h1 data-cv-reveal="true" className="block font-normal text-[14px] leading-[100%] tracking-[0px] text-white">
            Work Experience
          </h1>
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
            <h1
              data-cv-reveal="true"
              className="block font-normal text-[14px] leading-[100%] tracking-[0px] text-white"
            >
              Side Projects
            </h1>
          </div>
          {sideProjects.map((section, index) => (
            <div key={index.toString()} className="flex flex-col w-full">
              <Section {...section} />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-[56px]">
          <div className="h-[17px]">
            <h1
              data-cv-reveal="true"
              className="block font-normal text-[14px] leading-[100%] tracking-[0px] text-white"
            >
              Education
            </h1>
          </div>
          {education.map((section, index) => (
            <div key={index.toString()} className="flex flex-col w-full">
              <Section {...section} />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-[56px]">
          <div className="h-[17px]">
            <h1
              data-cv-reveal="true"
              className="block font-normal text-[14px] leading-[100%] tracking-[0px] text-white"
            >
              Connect
            </h1>
          </div>
          <SectionConnect />
        </div>

        <SectionLanguagesAndLocations />

        <div data-cv-section="true" className="flex justify-center">
          <LinkExternal url="/pdf/cv.pdf">
            <span
              data-cv-reveal="true"
              className="text-[14px] font-normal tracking-[0px] bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0.72)_100%)] bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]"
            >
              Download CV in PDF
            </span>
          </LinkExternal>
        </div>

        {children && children}
      </div>
    </div>
  )
}
