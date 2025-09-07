'use client'

import {createContext, type ReactNode, useContext, useState} from 'react'

import {Config} from '@/config'
import {toPx} from '@/utils'

import {calculateScale, HEIGHT, WIDTH} from '../const'
import {CameraAction, CameraState} from './types'

const calculateCenterOfViewport = () => {
  if (typeof window === 'undefined') {
    return {x: 0, y: 0}
  }

  const height = window?.visualViewport?.height || window?.innerHeight
  const width = window?.visualViewport?.width || window?.innerWidth

  const scale = calculateScale(width)
  const scaledWidth = width / scale
  const scaledHeight = height / scale

  const x = -((Config.viewport.width - scaledWidth) / 2)
  const y = -((Config.viewport.height - scaledHeight) / 2)

  return {
    x,
    y,
  }
}

export const createCameraState = (): CameraState => {
  const {x, y} = calculateCenterOfViewport()

  return {
    camera: {x: 0, y: 0},
    origin: {x, y},
    scrollBehavior: 'natural',
    viewport: 'translate3d(0px, 0px, 0px)',
    x1: `translate3d(${toPx(x)}, ${toPx(y)}, 0px)`,
    x2: `translate3d(${toPx(WIDTH + x)}, ${toPx(y)}, 0px)`,
    x3: `translate3d(${toPx(x)}, ${toPx(HEIGHT + y)}, 0px)`,
    x4: `translate3d(${toPx(WIDTH + x)}, ${toPx(HEIGHT + y)}, 0px)`,
  }
}

const CameraStateContext = createContext<CameraState | undefined>(undefined)
const CameraDispatchContext = createContext<CameraAction | undefined>(undefined)

export type CameraProviderProps = {
  children: ReactNode
  defaultState: CameraState
}

export const Context = ({children, defaultState}: CameraProviderProps) => {
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
