'use client'

import type {FC, ReactNode} from 'react'

import type {Entry} from '@/db'

import {EntityContext} from './EntityContext'
import {SLOTS, useSlots} from './useSlots'

type EntityProps = {
  entry: Entry
  children: ReactNode
}

export const Entity: FC<EntityProps> = ({entry, children}) => {
  const {contexts, setInner, setOuter} = useSlots(entry)

  return SLOTS.map(slot => (
    <group key={slot} ref={node => setOuter(slot, node)}>
      <group ref={node => setInner(slot, node)}>
        <EntityContext value={contexts[slot]}>{children}</EntityContext>
      </group>
    </group>
  ))
}
