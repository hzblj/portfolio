'use client'

import {useEffect, useLayoutEffect, useRef} from 'react'

import {recalculateTransforms, useCameraDispatch, useCameraState} from '../context'

type ParkedCamera = {
  camera: {x: number; y: number}
  scale: number
}

// Module scope, so it lasts exactly as long as the document: a route change
// keeps it, a refresh drops it. That is the same line the intro draws — coming
// back should land you where you were, reloading should start you centred.
let parked: ParkedCamera | null = null

/**
 * Keeps where you were looking across a route change. The camera lives in state
 * inside the home layout, so opening a project unmounts it — without this,
 * coming back drops you at the centre of the grid at 100 %, which reads as the
 * site having reloaded under you.
 *
 * Renders nothing; it only parks and restores.
 */
export const CameraSession = () => {
  const {camera, scale} = useCameraState()
  const dispatch = useCameraDispatch()
  const hasRestoredRef = useRef(false)

  useLayoutEffect(() => {
    // Once per mount. React re-runs effects in development to smoke out missing
    // cleanup, and a second pass would read back the default position that the
    // parking effect below writes on the first commit.
    if (hasRestoredRef.current || !parked) {
      return
    }

    hasRestoredRef.current = true

    // Restored after hydration rather than seeded into the initial state: the
    // viewport transform is server-rendered, and a stored position would not
    // match what came off the server. A layout effect still lands it before the
    // first paint, so there is no jump to see.
    const {camera: parkedCamera, scale: parkedScale} = parked

    dispatch(draft => {
      const restored = {...draft, camera: parkedCamera, scale: parkedScale}

      return {...restored, ...recalculateTransforms(restored)}
    })
  }, [dispatch])

  useEffect(() => {
    parked = {camera, scale}
  }, [camera, scale])

  return null
}
