'use client'

import type {FC} from 'react'
import {createPortal} from 'react-dom'

import {ModalCloseButton} from '@/components/modal-close-button'
import {ModalControlsDock} from '@/components/modal-controls-dock'
import {cn} from '@/utils'

import {type OpenCard, useSceneActive} from '../state'
import {CardExpand} from './CardExpand'
import {CardModalBody} from './CardModalBody'
import {useEscape} from './useEscape'
import {useMorphModal} from './useMorphModal'

type MorphModalViewProps = {
  card: OpenCard
}

const HIDDEN = {opacity: 0, pointerEvents: 'none'} as const

export const MorphModalView: FC<MorphModalViewProps> = ({card}) => {
  const active = useSceneActive()
  const {closeRef, expand, overlayRef, startClose, surfaceRef} = useMorphModal(card)
  const root = document.getElementById('main')

  useEscape(startClose, active)

  if (!root) {
    return null
  }

  return createPortal(
    <div
      className="fixed inset-0 z-40 w-screen h-screen overflow-auto block"
      style={active ? undefined : HIDDEN}
      inert={!active}
    >
      <div className="flex justify-center items-center w-full min-h-full mx-auto py-10 relative" onClick={startClose}>
        <div
          className={cn(
            'flex flex-col w-full z-40 mx-[12px] md:mx-0 mb-[56px] md:mb-0',
            card.kind === 'cv' ? 'max-w-[700px]' : 'max-w-[512px]'
          )}
          onClick={event => event.stopPropagation()}
        >
          <div ref={surfaceRef} className="relative overflow-hidden rounded-[44px] md:rounded-[52px]">
            <div className="relative z-20">
              <CardModalBody card={card} />
            </div>
          </div>
        </div>
      </div>
      <ModalControlsDock>
        <div ref={overlayRef}>
          <CardExpand card={card} onExpand={expand} />
        </div>
        <ModalCloseButton ref={closeRef} onClose={startClose} />
      </ModalControlsDock>
    </div>,
    root
  )
}
