'use client'

import gsap from 'gsap'
import {type FC, type ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react'
import ReactDOM from 'react-dom'
import {cn} from '@/utils'

import {ModalCloseButton} from './modal-close-button'

export type ModalVariant = 'small' | 'large'

export type ModalProps = {
  isOpen: boolean
  children: ReactNode
  onClose(): void
  variant?: ModalVariant
}

const modalVariants: Record<ModalVariant, string> = {
  large: 'max-w-[700px]',
  small: 'max-w-[512px]',
}

export const Modal: FC<ModalProps> = ({isOpen, onClose, children, variant = 'small'}) => {
  const modalRoot = document.getElementById('main')!
  const cardRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLDivElement>(null)

  const [mounted, setMounted] = useState(isOpen)

  const startClose = useCallback(() => {
    if (!cardRef.current || !backdropRef.current) {
      return
    }

    gsap.killTweensOf([cardRef.current, backdropRef.current, closeButtonRef.current])

    gsap.to(cardRef.current, {duration: 0.25, ease: 'power2.in', scale: 0.95})

    gsap.to(closeButtonRef.current, {
      autoAlpha: 0,
      duration: 0.05,
      ease: 'power2.in',
    })

    gsap.to(backdropRef.current, {
      autoAlpha: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setMounted(false)
        onClose()
      },
    })
  }, [onClose])

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

  useEffect(() => {
    if (isOpen) {
      setMounted(true)
    }
  }, [isOpen])

  useLayoutEffect(() => {
    if (!mounted) {
      return
    }

    if (!cardRef.current || !backdropRef.current || !closeButtonRef.current) {
      return
    }

    gsap.killTweensOf([cardRef.current, backdropRef.current, closeButtonRef.current])
    gsap.set(backdropRef.current, {autoAlpha: 0})
    gsap.set(closeButtonRef.current, {autoAlpha: 0})
    gsap.set(cardRef.current, {scale: 0.95})
  }, [mounted])

  useEffect(() => {
    if (!mounted) {
      return
    }

    document.body.style.overflow = 'hidden'
    const abortController = new AbortController()
    document.addEventListener('keydown', handleKeyDown, {signal: abortController.signal})

    if (cardRef.current && backdropRef.current && closeButtonRef.current) {
      gsap.to(closeButtonRef.current, {autoAlpha: 1, delay: 0.1, duration: 0.25, ease: 'power2.out'})
      gsap.to(backdropRef.current, {autoAlpha: 1, duration: 0.25, ease: 'power2.out'})
      gsap.to(cardRef.current, {autoAlpha: 1, duration: 0.3, ease: 'power2.out', scale: 1})
    }

    return () => {
      document.body.style.overflow = ''
      abortController.abort()
    }
  }, [mounted, handleKeyDown])

  if (!mounted) {
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
      <ModalCloseButton ref={closeButtonRef} onClose={startClose} />
    </div>,
    modalRoot
  )
}
