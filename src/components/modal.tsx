'use client'

import gsap from 'gsap'
import {LiquidWeb} from 'liquid-web/react'
import {type FC, type ReactNode, useCallback, useEffect, useRef, useState} from 'react'
import ReactDOM from 'react-dom'
import {cn} from '@/utils'

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

  const [mounted, setMounted] = useState(isOpen)

  const startClose = useCallback(() => {
    if (!cardRef.current || !backdropRef.current) {
      return
    }

    gsap.to(cardRef.current, {
      duration: 0.3,
      ease: 'power2.in',
      scale: 0.95,
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

  useEffect(() => {
    if (!mounted) {
      return
    }

    document.body.style.overflow = 'hidden'

    const abortController = new AbortController()
    document.addEventListener('keydown', handleKeyDown, {signal: abortController.signal})

    if (cardRef.current && backdropRef.current) {
      gsap.fromTo(backdropRef.current, {autoAlpha: 0}, {autoAlpha: 1, duration: 0.25, ease: 'power2.out'})

      gsap.fromTo(cardRef.current, {scale: 0.95}, {duration: 0.35, ease: 'power2.out', scale: 1})
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
      <div ref={backdropRef} className="block fixed bg-black/50 inset-0" />
      <div className="flex justify-center items-center w-full min-h-full mx-auto py-10 relative" onClick={startClose}>
        <div
          ref={cardRef}
          className={cn('flex flex-col w-full max-w-[512px] z-40 overflow-hidden', modalVariants[variant])}
          onClick={e => e.stopPropagation()}
        >
          <LiquidWeb
            options={{
              aberration: 50,
              blur: 50,
              mode: 'standard',
              saturation: 170,
              scale: 22,
            }}
          >
            <div className="relative card-modal overflow-hidden">
              <div className="relative z-20">{children}</div>
            </div>
          </LiquidWeb>
        </div>
      </div>
    </div>,
    modalRoot
  )
}
