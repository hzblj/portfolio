'use client'

import {useFrame} from '@react-three/fiber'
import {type FC, useState} from 'react'
import {Vector2} from 'three'

import {glass} from '../graphics'
import {morph, useSceneStore} from '../state'
import {useCanvasProbe} from './useCanvasProbe'
import {useGlassBlur} from './useGlassBlur'

export const Renderer: FC = () => {
  const renderGlass = useGlassBlur()
  const probeCanvas = useCanvasProbe()
  const [buffer] = useState(() => new Vector2())

  useFrame(state => {
    const {gl, scene, camera} = state
    glass.uResolution.value.copy(gl.getDrawingBufferSize(buffer))

    if (useSceneStore.getState().card && morph.stage !== 'dom') {
      renderGlass(state)
    }

    gl.setRenderTarget(null)
    gl.render(scene, camera)
    probeCanvas(state)
  }, 1)

  return null
}
