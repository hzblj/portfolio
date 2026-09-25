'use client'

import type {FC} from 'react'

import {cn} from '@/utils'

import {usePageAmbient} from './usePageAmbient'
import {AMBIENT_VARIANTS} from './variants'

export const PageAmbient: FC = () => {
  const {attach, initialOpacity, variant} = usePageAmbient()
  const {lights, vignettes} = AMBIENT_VARIANTS[variant]

  return (
    <div
      ref={attach}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden bg-[#08080b]"
      style={{opacity: initialOpacity}}
    >
      {lights.map(light => (
        <div
          key={light.color}
          className={cn('scene-light', light.className)}
          style={{color: light.color, opacity: light.opacity}}
        />
      ))}
      <div className="scene-grain absolute inset-0 opacity-[0.05]" />
      {vignettes.map(vignette => (
        <div key={vignette} className={cn('absolute inset-0', vignette)} />
      ))}
    </div>
  )
}
