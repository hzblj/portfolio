'use client'

import {useCallback, useEffect} from 'react'

import {actionOnScroll, useCameraDispatch} from '../context'

export const ScrollControls = () => {
  const dispatch = useCameraDispatch()

  const wheelHandler = useCallback(
    (e: WheelEvent) => {
      e.preventDefault()
      actionOnScroll(dispatch, {x: e.deltaX, y: e.deltaY})
    },
    [dispatch]
  )

  useEffect(() => {
    const controller = new AbortController()

    window.addEventListener('wheel', wheelHandler, {passive: false, signal: controller.signal})

    return () => {
      controller.abort()
    }
  }, [wheelHandler])

  return null
}
