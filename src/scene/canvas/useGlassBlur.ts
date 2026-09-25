import type {RootState} from '@react-three/fiber'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {WebGLRenderTarget} from 'three'
import {FullScreenQuad} from 'three/examples/jsm/postprocessing/Pass.js'

import {worldToScreen} from '../camera'
import {gridVersion} from '../entity'
import {createBlurMaterial, GRID_LAYER, glass, OVERLAY_LAYER, useDisposable} from '../graphics'
import {morph} from '../state'

const BLUR_RADIUS = 136
const BLUR_TEXEL = 16

const createTarget = () => new WebGLRenderTarget(1, 1, {depthBuffer: false})

export const useGlassBlur = () => {
  const [targets] = useState(() => [createTarget(), createTarget(), createTarget()] as const)
  const [grid] = useState(() => ({version: -1}))
  const blur = useDisposable(useMemo(() => createBlurMaterial(), []))
  const quad = useDisposable(useMemo(() => new FullScreenQuad(blur), [blur]))

  useEffect(
    () => () => {
      for (const target of targets) {
        target.dispose()
      }
    },
    [targets]
  )

  return useCallback(
    ({gl, scene, camera, size}: RootState) => {
      const [captured, first, second] = targets
      const width = Math.max(1, Math.ceil(size.width / BLUR_TEXEL))
      const height = Math.max(1, Math.ceil(size.height / BLUR_TEXEL))
      const bounds = morph.glassRect ? worldToScreen(morph.glassRect) : {...size, x: 0, y: 0}

      if (captured.width !== width || captured.height !== height) {
        for (const target of targets) {
          target.setSize(width, height)
        }

        grid.version = -1
      }

      if (grid.version !== gridVersion()) {
        glass.uBackdrop.value = null
        camera.layers.set(GRID_LAYER)
        gl.setRenderTarget(captured)
        gl.clear()
        gl.render(scene, camera)
        camera.layers.enable(OVERLAY_LAYER)
        grid.version = gridVersion()
      }

      blur.uniforms.uBounds.value.set(
        bounds.x / size.width,
        1 - (bounds.y + bounds.height) / size.height,
        (bounds.x + bounds.width) / size.width,
        1 - bounds.y / size.height
      )
      blur.uniforms.uSigma.value = BLUR_RADIUS / BLUR_TEXEL

      blur.uniforms.uInput.value = captured.texture
      blur.uniforms.uStep.value.set(1 / width, 0)
      gl.setRenderTarget(second)
      quad.render(gl)

      blur.uniforms.uInput.value = second.texture
      blur.uniforms.uStep.value.set(0, 1 / height)
      gl.setRenderTarget(first)
      quad.render(gl)

      glass.uBackdrop.value = first.texture
    },
    [blur, grid, quad, targets]
  )
}
