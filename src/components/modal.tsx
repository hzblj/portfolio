'use client'

import gsap from 'gsap'
import {type FC, type ReactNode, useCallback, useEffect, useLayoutEffect, useRef} from 'react'
import ReactDOM from 'react-dom'
import {Config} from '@/config'
import {useSound} from '@/hooks'
import {cn} from '@/utils'

import {ModalCloseButton} from './modal-close-button'
import {ModalControlsDock} from './modal-controls-dock'

export type ModalVariant = 'small' | 'large'

export type ModalProps = {
  isOpen: boolean
  children: ReactNode
  onClose(): void
  variant?: ModalVariant
  /** Opens at rest, no enter animation — for a modal restored rather than opened. */
  instant?: boolean
  /**
   * Controls rendered beside the card rather than inside it. The card carries a
   * GSAP transform, which makes it the containing block for anything `fixed`
   * within — so a control that has to stay pinned to the viewport has to live
   * out here, next to the close button.
   */
  overlay?: ReactNode
}

const modalVariants: Record<ModalVariant, string> = {
  large: 'max-w-[700px]',
  small: 'max-w-[512px]',
}

// Presence follows `isOpen` directly, with no state of its own in between. The
// extra commit that used to sit there was invisible in isolation, but a view
// transition captures the new page as soon as the route commits: one frame late
// and the modal is missing from the snapshot, and the morph back out of a
// project page has nothing to land on. Closing needs no such latch either —
// `onClose` only fires once the exit animation is done.
export const Modal: FC<ModalProps> = ({isOpen, onClose, children, variant = 'small', instant, overlay}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const sound = useSound('modal')

  const startClose = useCallback(() => {
    if (!cardRef.current || !backdropRef.current) {
      return
    }

    sound.close()

    gsap.killTweensOf([cardRef.current, backdropRef.current, closeButtonRef.current, overlayRef.current])

    gsap.to(cardRef.current, {duration: 0.25, ease: 'power2.in', scale: Config.controls.scale})

    // Both of these float over the card rather than sitting inside it, so they
    // leave on the shared control curve — fading out with the backdrop rather
    // than blinking off ahead of it.
    gsap.to([closeButtonRef.current, overlayRef.current], {
      autoAlpha: 0,
      duration: Config.controls.exitDuration,
      ease: Config.controls.exitEase,
    })

    gsap.to(backdropRef.current, {
      autoAlpha: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: onClose,
    })
  }, [onClose, sound])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const keyValue = e.key.toLowerCase()
      if (keyValue === 'esc' || keyValue === 'escape') {
        e.preventDefault()
        startClose()
      }
    },
    [startClose]
  )

  useLayoutEffect(() => {
    if (!isOpen) {
      return
    }

    if (!cardRef.current || !backdropRef.current || !closeButtonRef.current) {
      return
    }

    gsap.killTweensOf([cardRef.current, backdropRef.current, closeButtonRef.current, overlayRef.current])

    // Restored from the session: land on the finished frame instead of the
    // first one, so coming back reads as "still open" rather than "opening".
    gsap.set(backdropRef.current, {autoAlpha: instant ? 1 : 0})
    gsap.set([closeButtonRef.current, overlayRef.current], {autoAlpha: instant ? 1 : 0})
    gsap.set(cardRef.current, {scale: instant ? 1 : Config.controls.scale})
  }, [isOpen, instant])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    document.body.style.overflow = 'hidden'
    const abortController = new AbortController()
    document.addEventListener('keydown', handleKeyDown, {signal: abortController.signal})

    if (!instant && cardRef.current && backdropRef.current && closeButtonRef.current) {
      gsap.to([closeButtonRef.current, overlayRef.current], {
        autoAlpha: 1,
        delay: Config.controls.enterDelay,
        duration: Config.controls.enterDuration,
        ease: Config.controls.enterEase,
      })
      gsap.to(backdropRef.current, {autoAlpha: 1, duration: 0.25, ease: 'power2.out'})
      gsap.to(cardRef.current, {autoAlpha: 1, duration: 0.3, ease: 'power2.out', scale: 1})
    }

    return () => {
      document.body.style.overflow = ''
      abortController.abort()
    }
  }, [isOpen, instant, handleKeyDown])

  if (!isOpen) {
    return null
  }

  // Looked up past the guard, never during render on the server: `#main` is
  // rendered by the home layout and only ever exists in the browser.
  const modalRoot = document.getElementById('main')

  if (!modalRoot) {
    return null
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-40 w-screen h-screen overflow-auto block">
      <div ref={backdropRef} className="fixed inset-0 bg-black/50 will-change-[opacity]" />
      <div className="flex justify-center items-center w-full min-h-full mx-auto py-10 relative" onClick={startClose}>
        <div
          ref={cardRef}
          className={cn(
            'flex flex-col w-full z-40 overflow-hidden will-change-transform [backface-visibility:hidden] transform-gpu mx-[12px] md:mx-0 mb-[56px] md:mb-0',
            modalVariants[variant]
          )}
          onClick={e => e.stopPropagation()}
        >
          <div className="relative card-modal overflow-hidden rounded-[44px] md:rounded-[52px]">
            <div className="relative z-20">{children}</div>
          </div>
        </div>
      </div>
      {/* On a phone these two are one cluster at the bottom of the screen; on a
          desktop the dock dissolves and the expand pill takes its corner back.
          Each is wrapped so its fade can be driven from out here — opacity only,
          never a transform, which would make the wrapper the containing block
          for the `fixed` control inside and take the pill off its corner. */}
      <ModalControlsDock>
        <div ref={overlayRef}>{overlay}</div>
        <ModalCloseButton ref={closeButtonRef} onClose={startClose} />
      </ModalControlsDock>
    </div>,
    modalRoot
  )
}
