'use client'

import {type ReactNode} from 'react'

import {Grid, Viewport} from './components'
import {Context, useCameraState} from './context'
import {KeyboardControls, ScrollControls, ToucheControls} from './controls'

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

export const CameraProvider = (props: CameraProviderProps) => (
  <Context>
    <Provider {...props} />
    <ScrollControls />
    <KeyboardControls />
    <ToucheControls friction={0.9} speed={2.0} />
  </Context>
)
