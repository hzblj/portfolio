import {useFrame} from '@react-three/fiber'
import {useState} from 'react'

import {morph} from '../state'
import {type MorphTargets, measureTargets} from './targets'

export type MorphFrame = {targets: MorphTargets | null}

export const useMorphFrame = () => {
  const [frame] = useState<MorphFrame>(() => ({targets: null}))

  useFrame(() => {
    if (morph.stage !== 'dom') {
      frame.targets = measureTargets()
    }
  }, -0.4)

  return frame
}
