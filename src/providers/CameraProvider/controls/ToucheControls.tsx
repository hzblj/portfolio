'use client'

import {useCallback, useEffect, useRef} from 'react'

import {actionOnScroll, useCameraDispatch} from '../context'

type ToucheControlsProps = {
  speed: number
  friction: number
}

export const ToucheControls = ({friction, speed}: ToucheControlsProps) => {
  const dispatch = useCameraDispatch()

  const isDragging = useRef(false)
  const lastTouch = useRef<{x: number; y: number; time: number} | null>(null)
  const velocity = useRef<{x: number; y: number}>({x: 0, y: 0})
  const rafId = useRef<number | null>(null)

  const startInertia = useCallback(() => {
    const step = () => {
      actionOnScroll(dispatch, {x: velocity.current.x, y: velocity.current.y})

      velocity.current.x *= friction
      velocity.current.y *= friction

      if (Math.abs(velocity.current.x) > 0.1 || Math.abs(velocity.current.y) > 0.1) {
        rafId.current = requestAnimationFrame(step)
      } else {
        rafId.current = null
      }
    }

    if (rafId.current == null) {
      rafId.current = requestAnimationFrame(step)
    }
  }, [dispatch, friction])

  const onTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length === 1) {
      isDragging.current = true

      if (rafId.current != null) {
        cancelAnimationFrame(rafId.current)
        rafId.current = null
      }

      const t = e.touches[0]
      lastTouch.current = {time: e.timeStamp, x: t.clientX, y: t.clientY}
    }
  }, [])

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) {
        return
      }

      const t = e.touches[0]
      const last = lastTouch.current

      if (last) {
        const dt = e.timeStamp - last.time

        if (dt > 0) {
          const dx = (last.x - t.clientX) * speed
          const dy = (last.y - t.clientY) * speed

          actionOnScroll(dispatch, {x: dx, y: dy})

          velocity.current.x = dx / (dt / 16.67) // normalize to ~60fps
          velocity.current.y = dy / (dt / 16.67)
        }

        lastTouch.current = {time: e.timeStamp, x: t.clientX, y: t.clientY}
      }
    },
    [dispatch, speed]
  )

  const onTouchEnd = useCallback(() => {
    isDragging.current = false
    lastTouch.current = null
    startInertia()
  }, [startInertia])

  useEffect(() => {
    const controller = new AbortController()

    window.addEventListener('touchstart', onTouchStart, {passive: false, signal: controller.signal})
    window.addEventListener('touchmove', onTouchMove, {passive: false, signal: controller.signal})
    window.addEventListener('touchend', onTouchEnd, {signal: controller.signal})

    return () => {
      controller.abort()

      if (rafId.current != null) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [onTouchStart, onTouchMove, onTouchEnd])

  return null
}
