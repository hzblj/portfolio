'use client'

import gsap from 'gsap'
import {useEffect, useLayoutEffect, useRef, useState} from 'react'
import ReactDOM from 'react-dom'

import {useIntro} from '@/providers'

export const IntroOverlay = () => {
  const {setIntroComplete} = useIntro()
  const overlayRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useLayoutEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) {
      return
    }

    let cancelled = false

    const run = () => {
      const profileCard = document.querySelector('[data-area="profile"]')

      if (!profileCard || !overlayRef.current || !lineRef.current) {
        if (!cancelled) {
          requestAnimationFrame(run)
        }
        return
      }

      const rect = profileCard.getBoundingClientRect()
      const line = lineRef.current
      const overlay = overlayRef.current

      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      gsap.set(line, {
        height: 2,
        left: centerX,
        position: 'fixed',
        top: centerY - 1,
        width: 0,
      })

      const tl = gsap.timeline()

      // Width: 0 → card width
      tl.to(line, {
        duration: 0.5,
        ease: 'power3.inOut',
        left: rect.left,
        width: rect.width,
      })

      // Height: 2px → card height
      tl.to(line, {
        duration: 0.3,
        ease: 'power3.inOut',
        height: rect.height,
        top: rect.top,
      })

      tl.call(
        () => {
          setIntroComplete(true)
        },
        undefined,
        '-=0.2'
      )

      tl.to(overlay, {
        duration: 0.4,
        ease: 'power2.out',
        opacity: 0,
      })

      tl.to(
        line,
        {
          duration: 0.3,
          ease: 'power2.out',
          opacity: 0,
        },
        '<'
      )

      tl.call(() => {
        setMounted(false)
      })
    }

    requestAnimationFrame(run)

    return () => {
      cancelled = true
    }
  }, [mounted, setIntroComplete])

  if (!mounted) {
    return null
  }

  const portalRoot = typeof document !== 'undefined' ? document.getElementById('main') : null

  if (!portalRoot) {
    return null
  }

  return ReactDOM.createPortal(
    <div ref={overlayRef} className="fixed inset-0 z-50 bg-black" style={{pointerEvents: 'none'}}>
      <div
        ref={lineRef}
        className="fixed rounded-2xl"
        style={{
          background: 'var(--card-bg)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      />
    </div>,
    portalRoot
  )
}
