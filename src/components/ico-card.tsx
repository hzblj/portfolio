'use client'

import gsap from 'gsap'
import {MetalFx} from 'metal-fx'
import Link from 'next/link'
import {type FC, type PointerEvent, useCallback, useEffect, useLayoutEffect, useRef} from 'react'

import {type IcoRecord, ico} from '@/db'
import {cn} from '@/utils'

import {CopyButton} from './copy-button'

const TILT = {
  lerp: 0.11,
  rotate: 14,
  scale: 1.016,
  z: 40,
}

/** Flowing organic waves — deterministic so server and client agree. */
const WAVE_VIEWBOX = {height: 260, width: 480}
const WAVE_SEGMENTS = 5
const WAVE_COUNT = 9

const buildWave = (index: number) => {
  const step = WAVE_VIEWBOX.width / WAVE_SEGMENTS
  const handle = step / 2.6
  const amplitude = 9 + index * 1.7
  const phase = index * 0.78
  const base = -14 + index * 34

  let path = ''
  let previous = {x: 0, y: 0}

  for (let segment = 0; segment <= WAVE_SEGMENTS; segment += 1) {
    const x = segment * step
    const y =
      base + Math.sin(segment * 1.15 + phase) * amplitude + Math.cos(segment * 0.62 + phase * 1.7) * amplitude * 0.45

    if (segment === 0) {
      path = `M${x.toFixed(1)},${y.toFixed(1)}`
    } else {
      path += ` C${(previous.x + handle).toFixed(1)},${previous.y.toFixed(1)} ${(x - handle).toFixed(1)},${y.toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`
    }

    previous = {x, y}
  }

  return path
}

const WAVES = Array.from({length: WAVE_COUNT}, (_, index) => ({
  d: buildWave(index),
  delay: `${(index * -1.9).toFixed(1)}s`,
  duration: `${(13 + index * 1.4).toFixed(1)}s`,
  width: 1.1 - index * 0.05,
}))

const Waves = () => (
  <div aria-hidden="true" className="ico-waves pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
    <svg
      className="ico-waves-drift absolute inset-0 size-full"
      viewBox={`0 0 ${WAVE_VIEWBOX.width} ${WAVE_VIEWBOX.height}`}
      preserveAspectRatio="none"
    >
      <title>Organic waves</title>
      <defs>
        <linearGradient id="ico-wave" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="34%" stopColor="#8fd3ff" stopOpacity="0.34" />
          <stop offset="72%" stopColor="#ffffff" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#c0a5ff" stopOpacity="0.16" />
        </linearGradient>
      </defs>
      {WAVES.map(wave => (
        <path
          key={wave.d}
          className="ico-wave"
          d={wave.d}
          fill="none"
          stroke="url(#ico-wave)"
          strokeWidth={wave.width}
          strokeLinecap="round"
          style={{animationDelay: wave.delay, animationDuration: wave.duration}}
        />
      ))}
    </svg>
  </div>
)

const Blobs = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
    <div className="ico-blob ico-blob-a absolute -top-[30%] -left-[16%] size-[74%] bg-[#2f6bff]" />
    <div className="ico-blob ico-blob-b absolute top-[18%] -right-[20%] size-[70%] bg-[#7a3cff]" />
    <div className="ico-blob ico-blob-c absolute -bottom-[34%] left-[22%] size-[64%] bg-[#00d0b0]" />
  </div>
)

const Label: FC<{children: string; className?: string}> = ({children, className}) => (
  <span
    className={cn('block text-[9px] font-medium uppercase leading-[100%] tracking-[0.16em] text-white/45', className)}
  >
    {children}
  </span>
)

const Field: FC<{label: string; value: string; className?: string}> = ({label, value, className}) => (
  <div className={cn('flex min-w-0 flex-col gap-[6px]', className)}>
    <Label>{label}</Label>
    <span className="block truncate bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0.72)_100%)] bg-clip-text text-[13px] font-normal leading-[16px] tracking-[0.01em] text-transparent drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]">
      {value}
    </span>
  </div>
)

const Record: FC<IcoRecord> = ({label, hint, value, url}) => (
  <div data-ico-reveal="true" className="flex flex-col gap-[7px]">
    <Label>{hint ? `${label} · ${hint}` : label}</Label>
    {url ? (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-fit text-[13px] font-normal leading-[18px] tracking-[0px] text-white/60 underline decoration-white/20 decoration-[1.5px] underline-offset-[5px] transition-colors duration-500 ease-out hover:text-white hover:decoration-white/45"
      >
        {value}
      </a>
    ) : (
      <span className="block text-[13px] font-normal leading-[18px] tracking-[0px] text-white/60">{value}</span>
    )}
  </div>
)

export const IcoCard: FC = () => {
  const refStage = useRef<HTMLDivElement>(null)
  const refIntro = useRef<HTMLDivElement>(null)
  const refCard = useRef<HTMLDivElement>(null)
  const target = useRef({hover: 0, x: 0, y: 0})
  const state = useRef({hover: 0, x: 0, y: 0})

  // The entrance runs on the wrapper so the tilt ticker keeps sole ownership of
  // the card's own transform — two writers on one property fight each other.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({defaults: {ease: 'power3.out'}})
        .fromTo(refIntro.current, {autoAlpha: 0, scale: 0.94, y: 26}, {autoAlpha: 1, duration: 1.1, scale: 1, y: 0})
        .fromTo('[data-ico-reveal]', {autoAlpha: 0, y: 12}, {autoAlpha: 1, duration: 0.7, stagger: 0.05}, 0.3)
    }, refStage)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const card = refCard.current

    if (!card || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const update = () => {
      const time = gsap.ticker.time
      const to = target.current
      const at = state.current

      at.x += (to.x - at.x) * TILT.lerp
      at.y += (to.y - at.y) * TILT.lerp
      at.hover += (to.hover - at.hover) * 0.07

      // Idle breathing keeps the card alive when nobody is pointing at it.
      const idleY = (Math.sin(time * 0.42) * 2.6 + Math.sin(time * 0.17) * 1.2) * (1 - at.hover)
      const idleX = (Math.cos(time * 0.35) * 1.8 + Math.cos(time * 0.23) * 0.9) * (1 - at.hover)

      const rotateY = at.x * TILT.rotate * at.hover + idleY
      const rotateX = -at.y * TILT.rotate * 0.7 * at.hover + idleX
      const scale = 1 + (TILT.scale - 1) * at.hover

      card.style.setProperty('--mx', `${(50 + at.x * 46).toFixed(2)}%`)
      card.style.setProperty('--my', `${(50 + at.y * 46).toFixed(2)}%`)
      card.style.setProperty('--glare', at.hover.toFixed(3))
      card.style.setProperty('--shift', at.x.toFixed(3))
      card.style.setProperty(
        '--tilt',
        `translate3d(0,0,${(TILT.z * at.hover).toFixed(2)}px) rotateX(${rotateX.toFixed(3)}deg) rotateY(${rotateY.toFixed(3)}deg) scale(${scale.toFixed(4)})`
      )
    }

    gsap.ticker.add(update)

    return () => gsap.ticker.remove(update)
  }, [])

  const handleMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || !refCard.current) {
      return
    }

    const rect = refCard.current.getBoundingClientRect()

    target.current.hover = 1
    target.current.x = gsap.utils.clamp(-1, 1, ((event.clientX - rect.left) / rect.width - 0.5) * 2)
    target.current.y = gsap.utils.clamp(-1, 1, ((event.clientY - rect.top) / rect.height - 0.5) * 2)
  }, [])

  const handleLeave = useCallback(() => {
    target.current.hover = 0
    target.current.x = 0
    target.current.y = 0
  }, [])

  return (
    <div ref={refStage} className="flex w-full max-w-[456px] flex-col items-center gap-[38px]">
      <div ref={refIntro} className="w-full [perspective:1400px] [perspective-origin:50%_45%]">
        {/*
          The metal ring lives on the tilting wrapper so it rotates with the card.
          Only the ring is wanted here: the wandering halo is off, and reflections
          stay off by never passing `reflectionTargets`.
        */}
        <MetalFx
          ref={refCard}
          onPointerMove={handleMove}
          onPointerLeave={handleLeave}
          onPointerCancel={handleLeave}
          preset="chromatic"
          theme="dark"
          borderRadius={24}
          ringCssPx={2.5}
          scale={1.8}
          strength={0.9}
          disableGlow
          normalizeHostStyles={false}
          className="ico-card !flex w-full will-change-transform"
        >
          <div className="relative aspect-[1.5858] w-full rounded-3xl" style={{transformStyle: 'preserve-3d'}}>
            <div
              aria-hidden="true"
              className="ico-halo absolute -inset-8 -z-10"
              style={{transform: 'translateZ(-80px)'}}
            />

            <div aria-hidden="true" className="card card-radius-24 absolute inset-0 shadow-[0_40px_110px_-34px_#000]" />
            <Blobs />
            <Waves />
            <div aria-hidden="true" className="ico-holo pointer-events-none absolute inset-0 rounded-3xl" />
            <div aria-hidden="true" className="ico-glare pointer-events-none absolute inset-0 rounded-3xl" />
            <div
              aria-hidden="true"
              className="ico-sheen pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
            />
            <div aria-hidden="true" className="ico-grain pointer-events-none absolute inset-0 rounded-3xl" />

            <div
              className="relative flex h-full flex-col justify-between p-[20px] sm:p-[28px]"
              style={{transform: 'translateZ(26px)', transformStyle: 'preserve-3d'}}
            >
              <div className="flex items-start justify-between">
                <Label>Business details</Label>
                <div className="flex items-center gap-[7px]">
                  <span className="ico-pulse size-[5px] rounded-full bg-[#4ade80]" />
                  <Label>Active · CZ</Label>
                </div>
              </div>

              <div className="flex items-end justify-between gap-4" style={{transform: 'translateZ(14px)'}}>
                <div className="flex flex-col gap-[9px]">
                  <Label>IČO · Business ID</Label>
                  <span className="block bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0.68)_100%)] bg-clip-text text-[26px] font-medium leading-[100%] tracking-[0.06em] text-transparent tabular-nums drop-shadow-[0_0_12px_rgba(120,180,255,0.28)] sm:text-[32px]">
                    {ico.ico}
                  </span>
                </div>
                <CopyButton value={ico.ico} label="Copy business ID" className="mb-[2px]" />
              </div>

              <div className="flex items-end justify-between gap-5">
                <Field label="Name" value={ico.name} />
                <Field label="Since" value={ico.since} className="items-center text-center" />
                <Field label="VAT" value={ico.vat} className="items-end text-right" />
              </div>
            </div>
          </div>
        </MetalFx>
      </div>

      <div className="flex w-full flex-col gap-[26px] px-[2px]">
        <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2">
          {ico.records.map(record => (
            <Record key={record.label} {...record} />
          ))}
        </div>

        <div data-ico-reveal="true" className="flex flex-wrap items-center justify-between gap-3">
          <a
            href={ico.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] font-normal leading-[16px] tracking-[0px] text-white/35 underline decoration-white/15 decoration-[1.5px] underline-offset-4 transition-colors duration-500 ease-out hover:text-white/60 hover:decoration-white/35"
          >
            Verified in {ico.source.name}
          </a>
          <span className="text-[12px] font-normal leading-[16px] tracking-[0px] text-white/25">
            Updated {ico.source.updatedAt}
          </span>
        </div>
      </div>

      <Link
        href="/"
        data-ico-reveal="true"
        className="text-[13px] font-normal leading-[100%] tracking-[0px] text-white/35 transition-colors duration-500 ease-out hover:text-white/70"
      >
        ← Back to portfolio
      </Link>
    </div>
  )
}
