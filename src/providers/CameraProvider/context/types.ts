import type {Dispatch, SetStateAction} from 'react'

export type CameraScrollBehavior = 'natural' | 'backwards'

export type CameraOffset = {x: number; y: number}

export type CameraState = {
  camera: CameraOffset
  viewport: string
  x1: string
  x2: string
  x3: string
  x4: string
  origin: {x: number; y: number}
  scrollBehavior?: CameraScrollBehavior
}

export type CameraTransforms = Pick<CameraState, 'viewport' | 'x1' | 'x2' | 'x3' | 'x4'>

export type CameraAction = Dispatch<SetStateAction<CameraState>>
