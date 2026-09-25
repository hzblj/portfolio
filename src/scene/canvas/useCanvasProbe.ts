import {type RootState, useThree} from '@react-three/fiber'
import {useCallback, useEffect, useState} from 'react'
import {Vector2, WebGLRenderTarget} from 'three'

import {registerCanvasSampler} from '@/lib/backdrop'

import {glass} from '../graphics'

const PROBE_TEXEL = 8
const REFRESH = 120
const WANTED_FOR = 1000

const createProbe = () => ({
  data: new Uint8Array(4),
  height: 1,
  takenAt: Number.NEGATIVE_INFINITY,
  target: new WebGLRenderTarget(1, 1, {depthBuffer: false}),
  wantedAt: Number.NEGATIVE_INFINITY,
  width: 1,
})

type Probe = ReturnType<typeof createProbe>

const resolution = new Vector2()

const clampIndex = (value: number, size: number) => Math.min(size - 1, Math.max(0, Math.floor(value)))

const read = (probe: Probe, x: number, y: number) => {
  probe.wantedAt = performance.now()

  if (!Number.isFinite(probe.takenAt)) {
    return null
  }

  const column = clampIndex(x / PROBE_TEXEL, probe.width)
  const row = probe.height - 1 - clampIndex(y / PROBE_TEXEL, probe.height)
  const index = (row * probe.width + column) * 4

  return {b: probe.data[index + 2], g: probe.data[index + 1], r: probe.data[index]}
}

export const useCanvasProbe = () => {
  const canvas = useThree(state => state.gl.domElement)
  const [probe] = useState(createProbe)

  useEffect(() => registerCanvasSampler(canvas, (x, y) => read(probe, x, y)), [canvas, probe])

  useEffect(() => () => probe.target.dispose(), [probe])

  return useCallback(
    ({gl, scene, camera, size}: RootState) => {
      const now = performance.now()

      if (now - probe.wantedAt > WANTED_FOR || now - probe.takenAt < REFRESH) {
        return
      }

      const width = Math.max(1, Math.ceil(size.width / PROBE_TEXEL))
      const height = Math.max(1, Math.ceil(size.height / PROBE_TEXEL))

      if (probe.width !== width || probe.height !== height) {
        probe.target.setSize(width, height)
        probe.data = new Uint8Array(width * height * 4)
        probe.width = width
        probe.height = height
      }

      resolution.copy(glass.uResolution.value)
      glass.uResolution.value.set(width, height)

      gl.setRenderTarget(probe.target)
      gl.clear()
      gl.render(scene, camera)
      gl.readRenderTargetPixels(probe.target, 0, 0, width, height, probe.data)
      gl.setRenderTarget(null)
      glass.uResolution.value.copy(resolution)
      probe.takenAt = now
    },
    [probe]
  )
}
