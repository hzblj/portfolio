'use client'

import dynamic from 'next/dynamic'
import {type ReactNode, useMemo} from 'react'

import {Viewport} from './components'
import {Context, createCameraState, useCameraState} from './context'
import {KeyboardControls, ScrollControls, ToucheControls} from './controls'

const Grid = dynamic(() => import('./components/Grid'), {ssr: false})

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

export const CameraProvider = (props: CameraProviderProps) => {
  const camera = useMemo(() => createCameraState(), [])

  return (
    <Context defaultState={camera}>
      <Provider {...props} />
      <ScrollControls />
      <KeyboardControls />
      <ToucheControls friction={0.9} speed={2.0} />
    </Context>
  )
}
