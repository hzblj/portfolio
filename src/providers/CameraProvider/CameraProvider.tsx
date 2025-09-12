'use client'
import {gsap} from 'gsap'
import {CustomEase} from 'gsap/CustomEase'
import {ScrollSmoother} from 'gsap/ScrollSmoother'
import {SplitText} from 'gsap/SplitText'

import dynamic from 'next/dynamic'
import {Fragment, type ReactNode, useMemo} from 'react'
import {useHasHover} from '@/hooks'
import {Viewport} from './components'
import {Context, createCameraState, useCameraState} from './context'
import {DragControls, KeyboardControls, ScrollControls, ToucheControls} from './controls'

const Grid = dynamic(() => import('./components/Grid'), {ssr: false})

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollSmoother, CustomEase, SplitText)
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
      {!isModalOpen && <ScrollControls />}
      {!isModalOpen && <KeyboardControls />}
      <ToucheControls friction={0.9} speed={1.2} isModalOpen={isModalOpen} />
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
    </Context>
  )
}
