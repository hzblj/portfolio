'use client'

import Image from 'next/image'
import {type FC, useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react'
import ReactDOM from 'react-dom'

import {cn} from '@/utils'

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

const GalleryItem: FC<GalleryItemProps> = ({index, columnIndex, rowIndex, columns}) => {
  const invertedColumnIndex = columns - 1 - columnIndex

  return (
    <div
      className={cn(
        'w-full max-w-[356px] h-auto aspect-[356/630] pointer-events-auto',
        rowIndex === 0 && `mt-[${indexShifter[columnIndex]}px]`,
        rowIndex > 0 && `mt-[-${indexShifter[invertedColumnIndex]}px]`
      )}
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
}

export type GalleryProps = {
  isOpen: boolean
  onClose(): void
}

export const Gallery: FC<GalleryProps> = ({isOpen, onClose}) => {
  const modalRoot = document.getElementById('main')!
  const cardRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLDivElement>(null)

  const [mounted, setMounted] = useState(isOpen)
  const [columns, setColumns] = useState(3)

  const startClose = useCallback(() => {
    if (!cardRef.current || !backdropRef.current) {
      return
    }

    setMounted(false)
    onClose()
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
  }, [mounted])

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
      <div ref={backdropRef} className="fixed inset-0 bg-black/80 will-change-[opacity]" />
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
