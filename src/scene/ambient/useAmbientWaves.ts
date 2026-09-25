import {type RefObject, useEffect, useRef} from 'react'

import wavesFragment from '../graphics/shaders/waves.frag.glsl'
import wavesVertex from '../graphics/shaders/waves.vert.glsl'
import {WAVE_FRAME, WAVE_MAX_DPR, WAVE_MIRROR, WAVE_SPEED, WAVE_START, type WaveVariant} from './waves'

const compile = (gl: WebGL2RenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type)

  if (!shader) {
    return null
  }

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null
}

const createProgram = (gl: WebGL2RenderingContext) => {
  const vertex = compile(gl, gl.VERTEX_SHADER, wavesVertex)
  const fragment = compile(gl, gl.FRAGMENT_SHADER, wavesFragment)
  const program = gl.createProgram()

  if (!vertex || !fragment || !program) {
    return null
  }

  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  gl.deleteShader(vertex)
  gl.deleteShader(fragment)

  return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null
}

const bindTriangle = (gl: WebGL2RenderingContext, program: WebGLProgram) => {
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)

  const position = gl.getAttribLocation(program, 'aPosition')
  // biome-ignore lint/correctness/useHookAtTopLevel: WebGL's useProgram, not a React hook
  gl.useProgram(program)
  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

  return buffer
}

const isShown = (host: HTMLElement | null) => Number.parseFloat(host?.style.opacity || '1') > 0.001

export const useAmbientWaves = (variant: WaveVariant): RefObject<HTMLCanvasElement | null> => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const variantRef = useRef(variant)

  useEffect(() => {
    variantRef.current = variant
  }, [variant])

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas?.getContext('webgl2', {alpha: false, antialias: false, powerPreference: 'low-power'})
    const program = gl ? createProgram(gl) : null

    if (!canvas || !gl || !program) {
      return
    }

    const buffer = bindTriangle(gl, program)

    const uniforms = {
      mirror: gl.getUniformLocation(program, 'uMirror'),
      resolution: gl.getUniformLocation(program, 'uResolution'),
      time: gl.getUniformLocation(program, 'uTime'),
    }

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const host = canvas.parentElement
    const start = performance.now()
    let frame = 0
    let next = 0
    let drawn = false

    const draw = (now: number) => {
      const scale = Math.min(window.devicePixelRatio, WAVE_MAX_DPR)
      const width = Math.max(1, Math.round(canvas.clientWidth * scale))
      const height = Math.max(1, Math.round(canvas.clientHeight * scale))
      const resized = canvas.width !== width || canvas.height !== height

      if (resized) {
        canvas.width = width
        canvas.height = height
        gl.viewport(0, 0, width, height)
      }

      if (still && drawn && !resized) {
        return
      }

      gl.uniform2f(uniforms.resolution, width, height)
      gl.uniform1f(uniforms.mirror, WAVE_MIRROR[variantRef.current])
      gl.uniform1f(uniforms.time, WAVE_START + (still ? 0 : ((now - start) / 1000) * WAVE_SPEED))
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      drawn = true
    }

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop)

      if (now < next - 1 || !isShown(host)) {
        return
      }

      next = now + WAVE_FRAME
      draw(now)
    }

    frame = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frame)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
    }
  }, [])

  return canvasRef
}
