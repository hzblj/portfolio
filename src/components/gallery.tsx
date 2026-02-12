'use client'

import {gsap} from 'gsap'
import Image from 'next/image'
import {createRef, type FC, forwardRef, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'
import ReactDOM from 'react-dom'

import {ModalCloseButton} from './modal-close-button'

const indexShifter: Record<number, number> = {
  0: 0,
  1: 315,
  2: 630,
}

const DATA = ['1', '2', '4', '5', '6', '1', '2', '4', '5']

type GalleryItemProps = {
  columnIndex: number
  rowIndex: number
  index: number
  columns: number
}

const GalleryItem = forwardRef<HTMLDivElement, GalleryItemProps>(({index, columnIndex, rowIndex, columns}, ref) => {
  const marginTop = useMemo(() => {
    const invertedColumnIndex = columns - 1 - columnIndex

    return rowIndex === 0 ? indexShifter[columnIndex] : -indexShifter[invertedColumnIndex]
  }, [columnIndex, rowIndex, columns])

  return (
    <div
      ref={ref}
      className="w-full max-w-[356px] h-auto aspect-[356/630] pointer-events-auto opacity-0 will-change-[opacity,transform] transform-gpu"
      style={{marginTop: `${marginTop}px`}}
    >
      <Image
        src={`https://picsum.photos/id/${index}/630/630`}
        alt="image"
        priority
        width={356}
        height={630}
        className="h-full w-full object-cover"
        style={{objectFit: 'cover'}}
        draggable={false}
      />
    </div>
  )
})

export type GalleryProps = {
  isOpen: boolean
  onClose(): void
}

export const Gallery: FC<GalleryProps> = ({isOpen, onClose}) => {
  const modalRoot = document.getElementById('main')!
  const cardRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLDivElement>(null)
  const itemRefs = useMemo(() => DATA.map(() => createRef<HTMLDivElement>()), [])

  const [mounted, setMounted] = useState(isOpen)
  const [columns, setColumns] = useState(3)

  const startClose = useCallback(() => {
    if (!cardRef.current || !backdropRef.current || !closeButtonRef.current) {
      return
    }

    const items = itemRefs.map(ref => ref.current).filter(Boolean) as HTMLDivElement[]

    gsap.to(items, {
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => {
        setMounted(false)
        onClose()
      },
      opacity: 0,
      scale: 0.95,
      stagger: {
        amount: 0.3,
        from: 'end',
      },
      y: 40,
    })

    gsap.to(backdropRef.current, {
      duration: 0.7 * (DATA.length - 1),
      ease: 'power2.inOut',
      opacity: 0,
    })
  }, [onClose, itemRefs])

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

    const items = itemRefs.map(ref => ref.current).filter(Boolean) as HTMLDivElement[]

    if (items.length === 0) {
      return
    }

    gsap.set(backdropRef.current, {
      opacity: 0,
    })

    gsap.to(backdropRef.current, {
      duration: 0.4,
      ease: 'power2.inOut',
      opacity: 1,
    })

    gsap.set(closeButtonRef.current, {
      opacity: 0,
      scale: 0.8,
    })

    gsap.to(closeButtonRef.current, {
      delay: 0.2,
      duration: 0.4,
      ease: 'power3.out',
      opacity: 1,
      scale: 1,
    })

    gsap.set(items, {
      opacity: 0,
      scale: 0.95,
      y: 40,
    })

    gsap.to(items, {
      delay: 0.1,
      duration: 0.6,
      ease: 'power3.out',
      opacity: 1,
      scale: 1,
      stagger: {
        amount: 0.4,
        from: 'start',
      },
      y: 0,
    })
  }, [mounted, itemRefs])

  useEffect(() => {
    if (!mounted) {
      return
    }

    const updateColumns = () => {
      const width = window.innerWidth
      if (width < 768) {
        setColumns(1)
      } else if (width < 1024) {
        setColumns(2)
      } else {
        setColumns(3)
      }
    }

    updateColumns()
    document.body.style.overflow = 'hidden'

    const abortController = new AbortController()

    window.addEventListener('resize', updateColumns, {signal: abortController.signal})
    document.addEventListener('keydown', handleKeyDown, {signal: abortController.signal})

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
      <div className="flex w-full min-h-full mx-auto py-10 relative justify-center" onClick={startClose}>
        <div
          ref={cardRef}
          className="flex flex-col w-full items-center justify-center z-40 overflow-hidden will-change-transform [backface-visibility:hidden] transform-gpu mx-[12px] md:mx-0 mb-[56px] md:mb-0 pointer-events-none px-4 md:px-8 lg:px-[44px]"
          onClick={e => e.stopPropagation()}
        >
          <div className="relative overflow-hidden w-full">
            <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[48px] justify-items-center mx-auto w-full max-w-[356px] md:max-w-[760px] lg:max-w-[1252px]">
              {DATA.map((_, index) => (
                <GalleryItem
                  key={index.toString()}
                  ref={itemRefs[index]}
                  columnIndex={index % columns}
                  rowIndex={Math.floor(index / columns)}
                  columns={columns}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <ModalCloseButton ref={closeButtonRef} onClose={startClose} />
    </div>,
    modalRoot
  )
}
