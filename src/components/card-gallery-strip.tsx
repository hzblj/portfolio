'use client'

import gsap from 'gsap'
import Image from 'next/image'
import {createRef, FC, forwardRef, useCallback, useMemo, useRef} from 'react'

const items: string[] = [
  'https://picsum.photos/200/300',
  'https://picsum.photos/id/237/200/300',
  'https://picsum.photos/id/23/200/300',
  'https://picsum.photos/id/27/200/300',
  'https://picsum.photos/id/29/200/300',
  'https://picsum.photos/id/297/200/300',
]

const UN_HOVERED_OPACITY = 0.5
const HOVERED_OPACITY = 1.0
const HOVERED_FLEX_GROW = 2.0
const UN_HOVERED_FLEX_GROW = 0.6

type CardGalleryStripeItemProps = {
  url: string
  index: number
  expand: (index: number) => void
  onLoad: () => void
}

const CardGalleryStripeItem = forwardRef<HTMLDivElement, CardGalleryStripeItemProps>(
  ({url, expand, index, onLoad}, ref) => {
    const onHover = useCallback(() => expand(index), [expand, index])

    return (
      <div
        ref={ref}
        className="group relative flex-[1_1_0%] min-w-0 cursor-pointer"
        onMouseEnter={onHover}
        onFocus={onHover}
        onLoad={onLoad}
        role="button"
      >
        <Image
          src={url}
          alt="image"
          priority
          width={276.93}
          height={445}
          className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-auto object-cover will-change-[flex-grow,opacity]"
          style={{objectFit: 'cover'}}
          draggable={false}
        />
      </div>
    )
  }
)

export const CardGalleryStrip: FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const panelRefs = useMemo(() => items.map(() => createRef<HTMLDivElement>()), [])

  const reset = useCallback(() => {
    gsap.to(panelRefs.map(r => r.current).filter(Boolean), {
      duration: 0.5,
      ease: 'power3.out',
      flexGrow: 1,
      opacity: UN_HOVERED_OPACITY,
    })
  }, [panelRefs])

  const expand = useCallback(
    (index: number) => {
      const allPanels = panelRefs.map(r => r.current).filter(Boolean)

      gsap.to(allPanels, {
        duration: 0.5,
        ease: 'power3.out',
        flexGrow: UN_HOVERED_FLEX_GROW,
        opacity: UN_HOVERED_OPACITY,
      })

      const target = panelRefs[index]?.current

      if (target) {
        gsap.to(target, {duration: 0.5, ease: 'power3.out', flexGrow: HOVERED_FLEX_GROW, opacity: HOVERED_OPACITY})
      }
    },
    [panelRefs]
  )

  const onLoad = useCallback(
    (index: number) => () => {
      const target = panelRefs[index]?.current

      if (target) {
        gsap.set(target, {opacity: UN_HOVERED_OPACITY})
      }
    },
    [panelRefs]
  )

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden flex grow w-full h-full"
      style={{clipPath: 'inset(1px round 16px)'}}
      onMouseLeave={reset}
      onFocus={reset}
    >
      <div className="absolute inset-0 flex">
        {items.map((item, index) => (
          <CardGalleryStripeItem
            key={index}
            ref={panelRefs[index]}
            expand={expand}
            url={item}
            index={index}
            onLoad={onLoad(index)}
          />
        ))}
      </div>
    </div>
  )
}
