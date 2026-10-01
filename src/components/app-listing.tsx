import Image from 'next/image'
import Link from 'next/link'
import {type FC, Fragment, type ReactNode} from 'react'

import {type AppListing, ico, type LegalBlock, type LegalDocument} from '@/db'
import {cn} from '@/utils'

const BODY = 'text-[14px] font-normal leading-[22px] tracking-[0px] text-white/50 text-pretty'
const LINK =
  'text-white/70 underline decoration-white/20 decoration-[1.5px] underline-offset-4 transition-colors duration-500 ease-out hover:decoration-white/40'
const TITLE_INK =
  'bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0.48)_100%)] bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]'

// URLs and emails written straight into the copy, so the documents stay plain
// strings. The URL stops short of trailing punctuation.
const LINKABLE = /(https?:\/\/\S*[^\s.,:;)]|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g

const RichText: FC<{children: string}> = ({children}) => (
  <>
    {children.split(LINKABLE).map((part, index) => {
      if (index % 2 === 0) {
        return <Fragment key={`${index}-${part}`}>{part}</Fragment>
      }

      const isEmail = !part.startsWith('http')

      return (
        <a
          key={`${index}-${part}`}
          href={isEmail ? `mailto:${part}` : part}
          target={isEmail ? undefined : '_blank'}
          rel={isEmail ? undefined : 'noreferrer'}
          className={cn(LINK, 'break-words')}
        >
          {part.replace(/^https?:\/\//, '')}
        </a>
      )
    })}
  </>
)

const Block: FC<{block: LegalBlock}> = ({block}) => {
  if (typeof block === 'string') {
    return (
      <p className={BODY}>
        <RichText>{block}</RichText>
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-[10px]">
      {block.map(item => (
        <li key={item} className={cn(BODY, 'relative pl-[16px]')}>
          <span aria-hidden="true" className="absolute top-[9px] left-0 size-[4px] rounded-full bg-white/20" />
          <RichText>{item}</RichText>
        </li>
      ))}
    </ul>
  )
}

/**
 * The CV's row: a quiet label in a fixed left column, the content beside it.
 * Stacked on phones, like the CV's years.
 */
const Row: FC<{label: string; children: ReactNode}> = ({label, children}) => (
  <section className="flex w-full flex-col items-start gap-[12px] md:flex-row md:gap-[44px]">
    <span className="block w-[88px] flex-shrink-0 text-[14px] leading-[22px] tracking-[0px] text-white/40 tabular-nums">
      {label}
    </span>
    <div className="flex min-w-0 flex-1 flex-col gap-[8px]">{children}</div>
  </section>
)

const RowTitle: FC<{children: string}> = ({children}) => (
  <h2 className="text-[14px] font-normal leading-[22px] tracking-[0px] text-white">{children}</h2>
)

const Heading: FC<{children: string}> = ({children}) => (
  <h2 className="text-[14px] font-normal leading-[100%] tracking-[0px] text-white">{children}</h2>
)

const ordinal = (index: number) => (index + 1).toString().padStart(2, '0')

const Brand: FC<{app: AppListing}> = ({app}) => (
  <Link href={`/${app.slug}`} className="group inline-flex items-center gap-[12px] self-start">
    <Image src={app.logo} alt="" width={36} height={36} className="size-[36px]" />
    <span className="text-[14px] leading-[100%] tracking-[0px] text-white/70 transition-colors duration-300 ease-out group-hover:text-white">
      {app.name}
    </span>
  </Link>
)

const Contact: FC<{app: AppListing; links: {href: string; label: string}[]}> = ({app, links}) => (
  <div className="flex flex-col gap-[56px] border-t border-white/10 pt-[56px]">
    <Row label="Contact">
      <p className={BODY}>
        <RichText>{app.contact}</RichText>
      </p>
      <p className={BODY}>
        {ico.name} ·{' '}
        <Link href="/ico" className={LINK}>
          IČO {ico.ico}
        </Link>{' '}
        · {ico.location}
      </p>
    </Row>
    <Row label="More">
      <ul className="flex flex-col gap-[10px]">
        {links.map(link => (
          <li key={link.href} className={BODY}>
            <Link href={link.href} className={LINK}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </Row>
  </div>
)

/** What the app is and how it is used — the page a platform reviews it by. */
export const AppOverview: FC<{app: AppListing}> = ({app}) => (
  <>
    <header className="flex flex-col items-start gap-[24px]">
      <Image
        src={app.logo}
        alt={`${app.name} logo`}
        width={112}
        height={112}
        preload
        className="size-[112px] drop-shadow-[0_12px_40px_rgba(255,110,31,0.28)]"
      />
      <div className="flex flex-col gap-[16px]">
        <h1
          className={cn('text-[40px] font-medium leading-[1.05] tracking-[0px] text-balance md:text-[48px]', TITLE_INK)}
        >
          {app.name}
        </h1>
        <p className="text-[18px] leading-[26px] tracking-[0px] text-white/70 text-pretty">{app.description}</p>
      </div>
      <p className={BODY}>{app.about}</p>
    </header>

    <div className="flex flex-col gap-[44px]">
      <Heading>How it works</Heading>
      {app.steps.map((step, index) => (
        <Row key={step.title} label={ordinal(index)}>
          <RowTitle>{step.title}</RowTitle>
          <p className={BODY}>{step.description}</p>
        </Row>
      ))}
    </div>

    <Row label="Internal">
      <p className={BODY}>{app.scope}</p>
    </Row>

    <Contact
      app={app}
      links={[
        {href: `/${app.slug}/terms`, label: app.terms.title},
        {href: `/${app.slug}/privacy`, label: app.privacy.title},
      ]}
    />
  </>
)

/** Terms or privacy policy, numbered the way the CV dates its sections. */
export const AppLegal: FC<{app: AppListing; document: 'terms' | 'privacy'}> = ({app, document}) => {
  const legal: LegalDocument = app[document]
  const other = document === 'terms' ? 'privacy' : 'terms'

  return (
    <>
      <header className="flex flex-col items-start gap-[32px]">
        <Brand app={app} />
        <div className="flex flex-col gap-[16px]">
          <h1
            className={cn(
              'text-[40px] font-medium leading-[1.05] tracking-[0px] text-balance md:text-[48px]',
              TITLE_INK
            )}
          >
            {legal.title}
          </h1>
          <span className="text-[14px] leading-[22px] tracking-[0px] text-white/40">Last updated {app.updatedAt}</span>
        </div>
        <p className={BODY}>{legal.intro}</p>
      </header>

      <div className="flex flex-col gap-[44px]">
        {legal.sections.map((section, index) => (
          <Row key={section.title} label={ordinal(index)}>
            <RowTitle>{section.title}</RowTitle>
            <div className="flex flex-col gap-[16px]">
              {section.body.map(block => (
                <Block key={typeof block === 'string' ? block : block.join()} block={block} />
              ))}
            </div>
          </Row>
        ))}
      </div>

      <Contact
        app={app}
        links={[
          {href: `/${app.slug}/${other}`, label: app[other].title},
          {href: `/${app.slug}`, label: `About ${app.name}`},
        ]}
      />
    </>
  )
}
