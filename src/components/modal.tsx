'use client'

// https://github.com/koirodev/liquid-web
// https://liquid.prismify.in/
import {LiquidWeb} from 'liquid-web/react'
import {type FC, type ReactNode, useCallback, useEffect, useRef} from 'react'
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
  const ref = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const keyValue = e.key.toLowerCase()

      if (keyValue === 'esc' || keyValue === 'escape') {
        e.preventDefault()
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'

    const abortController = new AbortController()

    document.addEventListener('keydown', handleKeyDown, {signal: abortController.signal})

    return () => {
      document.body.style.overflow = ''
      abortController.abort()
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen) {
    return null
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-40 w-screen h-screen overflow-auto block">
      <div className="flex justify-center items-center w-full min-h-full mx-auto py-10 relative">
        <div className={cn('flex flex-col w-full max-w-[512px] z-40 overflow-hidden', modalVariants[variant])}>
          <LiquidWeb
            options={{
              aberration: 50,
              blur: 50,
              mode: 'standard',
              saturation: 170,
              scale: 22,
            }}
          >
            <div ref={ref} className="relative card-modal overflow-hidden">
              <div className="relative z-20">{children}</div>
            </div>
          </LiquidWeb>
        </div>
        <div className="absolute bg-black/50 inset-0" onClick={onClose} />
      </div>
    </div>,
    modalRoot
  )
}
