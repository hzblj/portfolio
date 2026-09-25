import {useFrame} from '@react-three/fiber'
import {type RefObject, useRef} from 'react'
import type {Group} from 'three'

import {morph, morphTargets} from '../state'

const setShown = (element: HTMLElement, shown: boolean) => {
  const visibility = shown ? 'visible' : 'hidden'

  if (element.style.visibility !== visibility) {
    element.style.visibility = visibility
  }
}

export const useHandover = (): RefObject<Group | null> => {
  const group = useRef<Group>(null)

  useFrame(() => {
    const dom = morph.stage === 'dom'

    for (const element of morphTargets.swap) {
      setShown(element, morph.stage !== 'webgl')
    }

    morphTargets.surface?.classList.toggle('card-modal', dom)

    if (group.current) {
      group.current.visible = !dom
    }
  }, -0.5)

  return group
}
