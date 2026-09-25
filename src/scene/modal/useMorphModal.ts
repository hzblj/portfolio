import gsap from 'gsap'
import {CustomEase} from 'gsap/CustomEase'
import {useRouter} from 'next/navigation'
import {useCallback, useEffect, useLayoutEffect, useRef} from 'react'

import {Config} from '@/config'
import {useSound} from '@/hooks/use-sound'
import {actionToggleModal, useCameraDispatch} from '@/providers/CameraProvider/context'

import {setCursor} from '../interaction'
import {
  closeCard,
  leaveForPage,
  MODAL_BACKDROP,
  morph,
  morphTargets,
  type OpenCard,
  PAGE_BACKDROP,
  PAGE_TOP,
  prepareAmbient,
  returnFromPage,
  useSceneActive,
  useSceneStore,
} from '../state'
import {alignPill, isDesktop, pageAlignment, turnGlyph} from './pill'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(CustomEase)
  CustomEase.create('card-morph', 'M0,0 C0.32,0.72 0,1 1,1')
}

const OPEN = {duration: 0.6, ease: 'card-morph'}
const CLOSE = {duration: 0.5, ease: 'card-morph'}
const PAGE = {duration: 0.7, ease: 'card-morph'}

const CONTROLS_IN = {
  autoAlpha: 1,
  delay: Config.controls.enterDelay,
  duration: Config.controls.enterDuration,
  ease: Config.controls.enterEase,
}

const CONTROLS_OUT = {autoAlpha: 0, duration: Config.controls.exitDuration, ease: Config.controls.exitEase}

const isElement = (element: HTMLElement | null): element is HTMLElement => element !== null

const focusFirstControl = (container: HTMLElement | null) => {
  container?.querySelector<HTMLElement>('a, button')?.focus({preventScroll: true})
}

const restoreFocus = (element: HTMLElement | null) => {
  if (element?.isConnected && element !== document.body) {
    element.focus({preventScroll: true})
  }
}

const offsetToPage = () => PAGE_TOP - (morphTargets.media?.getBoundingClientRect().top ?? PAGE_TOP)

export const useMorphModal = (card: OpenCard) => {
  const router = useRouter()
  const dispatch = useCameraDispatch()
  const sound = useSound('modal')
  const active = useSceneActive()
  const away = useSceneStore(state => state.away)

  const surfaceRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLElement | null>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const busyRef = useRef(false)
  const openedRef = useRef(false)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const wasActiveRef = useRef(active)

  const reflowsOnPage = card.kind === 'cv'

  useLayoutEffect(() => {
    const surface = surfaceRef.current

    if (!surface) {
      return
    }

    const media = surface.querySelector<HTMLElement>('[data-morph="media"]')
    const details = surface.querySelector<HTMLElement>('[data-morph="details"]')
    const swapsContent = card.kind === 'cv' && isDesktop()
    const swap = [card.kind === 'shot' ? media : null, swapsContent ? details : null].filter(isElement)

    setCursor(false)
    detailsRef.current = details
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    morphTargets.surface = surface
    morphTargets.media = media
    morphTargets.swap = swap
    morph.swapsContent = swapsContent
    morph.stage = 'webgl'
    morph.page = 0

    for (const element of swap) {
      element.style.visibility = 'hidden'
    }

    if (!swapsContent) {
      gsap.set(details, {autoAlpha: 0})
    }

    gsap.set([overlayRef.current, closeRef.current], {autoAlpha: 0})

    return () => {
      morphTargets.surface = null
      morphTargets.media = null
      morphTargets.swap = []
    }
  }, [card])

  useEffect(() => {
    actionToggleModal(dispatch, true)

    if (!openedRef.current) {
      openedRef.current = true
      sound.open()
    }

    const timeline = gsap
      .timeline()
      .to(morph, {backdrop: MODAL_BACKDROP, duration: 0.35, ease: 'power2.out'}, 0)
      .to(morph, {...OPEN, progress: 1}, 0)
      .call(() => {
        morph.stage = 'dom'
        focusFirstControl(overlayRef.current)
      })
      .to([overlayRef.current, closeRef.current], CONTROLS_IN, 0)

    if (!morph.swapsContent) {
      timeline.to(detailsRef.current, {autoAlpha: 1, duration: 0.3, ease: 'power2.out'}, OPEN.duration)
    }

    timelineRef.current = timeline

    return () => {
      timeline.kill()
    }
  }, [dispatch, sound])

  useEffect(() => {
    const returning = active && !wasActiveRef.current && away
    wasActiveRef.current = active

    if (!returning) {
      return
    }

    timelineRef.current?.kill()

    const timeline = gsap
      .timeline()
      .to(surfaceRef.current, {...PAGE, y: 0}, 0)
      .to(morph, {...PAGE, page: 0}, 0)
      .to(morphTargets.ambient, {...PAGE, opacity: 0}, 0)
      .to(morph, {backdrop: MODAL_BACKDROP, duration: PAGE.duration, ease: 'power2.out'}, 0)
      .to(closeRef.current, CONTROLS_IN, 0.2)
      .call(() => {
        morph.stage = 'dom'
        busyRef.current = false
        returnFromPage()
      })

    turnGlyph(timeline, overlayRef.current, 'expand')
    alignPill(timeline, overlayRef.current, 0)

    if (reflowsOnPage) {
      timeline.to(detailsRef.current, {autoAlpha: 1, duration: 0.35, ease: 'power2.out'}, 0.25)
    }

    timelineRef.current = timeline
  }, [active, away, reflowsOnPage])

  const expand = useCallback(
    (href: string) => {
      if (busyRef.current) {
        return
      }

      busyRef.current = true
      timelineRef.current?.kill()
      morph.stage = 'glass'
      prepareAmbient(card.kind)

      const timeline = gsap
        .timeline()
        .to(closeRef.current, CONTROLS_OUT, 0)
        .to(surfaceRef.current, {...PAGE, y: offsetToPage()}, 0)
        .to(morph, {...PAGE, page: 1}, 0)
        .to(morphTargets.ambient, {...PAGE, opacity: 1}, 0)
        .to(morph, {backdrop: PAGE_BACKDROP, duration: PAGE.duration, ease: 'power2.inOut'}, 0)
        .call(() => {
          leaveForPage()
          router.push(href)
        })

      turnGlyph(timeline, overlayRef.current, 'collapse')
      alignPill(timeline, overlayRef.current, pageAlignment(overlayRef.current))

      if (reflowsOnPage) {
        timeline.to(detailsRef.current, {autoAlpha: 0, duration: 0.25, ease: 'power2.in'}, 0)
      }

      timelineRef.current = timeline
    },
    [card.kind, reflowsOnPage, router]
  )

  const startClose = useCallback(() => {
    if (busyRef.current) {
      return
    }

    busyRef.current = true
    sound.close()
    timelineRef.current?.kill()

    const fade = morph.swapsContent ? 0 : 0.15
    const timeline = gsap.timeline()

    if (!morph.swapsContent) {
      timeline.to(detailsRef.current, {autoAlpha: 0, duration: fade, ease: 'power2.in'}, 0)
    }

    timeline
      .to([overlayRef.current, closeRef.current], CONTROLS_OUT, 0)
      .call(
        () => {
          morph.stage = 'webgl'
        },
        undefined,
        fade
      )
      .to(morph, {...CLOSE, progress: 0}, fade)
      .to(morph, {backdrop: 0, duration: 0.4, ease: 'power2.inOut'}, fade + 0.1)
      .call(() => {
        actionToggleModal(dispatch, false)
        closeCard()
        restoreFocus(returnFocusRef.current)
      })

    timelineRef.current = timeline
  }, [dispatch, sound])

  return {closeRef, expand, overlayRef, startClose, surfaceRef}
}
