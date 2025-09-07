'use client'
import {createContext, type ReactNode, useContext, useState} from 'react'

import {toPx} from '@/utils'

import {HEIGHT, ORIGIN_X, ORIGIN_Y, WIDTH} from '../const'
import {CameraAction, CameraState} from './types'

const defaultState: CameraState = {
  camera: {x: 0, y: 0},
  scrollBehavior: 'natural',
  viewport: 'translate3d(0px, 0px, 0px)',
  x1: `translate3d(${toPx(ORIGIN_X)}, ${toPx(ORIGIN_Y)}, 0px)`,
  x2: `translate3d(${toPx(WIDTH + ORIGIN_X)}, ${toPx(ORIGIN_Y)}, 0px)`,
  x3: `translate3d(${toPx(ORIGIN_X)}, ${toPx(HEIGHT + ORIGIN_Y)}, 0px)`,
  x4: `translate3d(${toPx(WIDTH + ORIGIN_X)}, ${toPx(HEIGHT + ORIGIN_Y)}, 0px)`,
}

const CameraStateContext = createContext<CameraState>(defaultState)
const CameraDispatchContext = createContext<CameraAction | undefined>(undefined)

export type CameraProviderProps = {
  children: ReactNode
}

export const Context = ({children}: CameraProviderProps) => {
  const [state, dispatch] = useState<CameraState>(defaultState)

  return (
    <CameraStateContext.Provider value={state}>
      <CameraDispatchContext.Provider value={dispatch}>{children}</CameraDispatchContext.Provider>
    </CameraStateContext.Provider>
  )
}

export const useCameraState = () => {
  const state = useContext(CameraStateContext)

  if (typeof state === 'undefined') {
    throw new Error('useCameraState must be used within a CameraProvider')
  }

  return state
}

export const useCameraDispatch = () => {
  const dispatch = useContext(CameraDispatchContext)

  if (typeof dispatch === 'undefined') {
    throw new Error('useCameraDispatch must be used within a CameraProvider')
  }

  return dispatch
}
