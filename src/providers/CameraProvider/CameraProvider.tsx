'use client'

import {gsap} from 'gsap'
import {CustomEase} from 'gsap/CustomEase'
import {ScrollSmoother} from 'gsap/ScrollSmoother'
import {SplitText} from 'gsap/SplitText'
import dynamic from 'next/dynamic'
import {Fragment, type ReactNode, useMemo} from 'react'

// Straight from the module rather than `@/components`: the barrel reaches back
// into this provider through the cards, and the import would come full circle.
import {IcoLink} from '@/components/ico-link'
import {SoundControls} from '@/components/sound-controls'
import {useHasHover} from '@/hooks'

import {CameraSession, Viewport} from './components'
import {Context, createCameraState, useCameraState} from './context'
import {DragControls, KeyboardControls, ScrollControls, ToucheControls, ZoomControls} from './controls'

const Grid = dynamic(() => import('./components/Grid'), {ssr: false})

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollSmoother, CustomEase, SplitText)
  CustomEase.create('bezier-out-back', 'M0,0 C0.47,1.69 0.63,0.99 1,1')
}

export type CameraProviderProps = {
  children: ReactNode
}

const Provider = ({children}: CameraProviderProps) => {
  const {x1, x2, x3, x4, viewport} = useCameraState()

  return (
    <Viewport transform={viewport}>
      <Grid transform={x1}>{children}</Grid>
      <Grid transform={x2}>{children}</Grid>
      <Grid transform={x3}>{children}</Grid>
      <Grid transform={x4}>{children}</Grid>
    </Viewport>
  )
}

const Controls = () => {
  const hasHover = useHasHover()
  const {isModalOpen} = useCameraState()

  return (
    <Fragment>
      {hasHover && !isModalOpen && <ScrollControls />}
      {hasHover && !isModalOpen && <KeyboardControls />}
      {/* The three with a pill in the dock stay mounted through an open modal and
          fade themselves out instead, so they leave on the same curve the modal
          arrives on rather than blinking out from under it. */}
      <SoundControls />
      {hasHover && <ZoomControls />}
      <IcoLink />
      {!hasHover && !isModalOpen && <ToucheControls friction={0.9} speed={1.2} />}
      {hasHover && !isModalOpen && <DragControls />}
    </Fragment>
  )
}

export const CameraProvider = (props: CameraProviderProps) => {
  const camera = useMemo(() => createCameraState(), [])

  return (
    <Context defaultState={camera}>
      <Provider {...props} />
      <Controls />
      <CameraSession />
    </Context>
  )
}
