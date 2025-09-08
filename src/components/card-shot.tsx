'use client'

import Image from 'next/image'
import {Fragment, useCallback, useState} from 'react'

import {EntryShot} from '@/db'

import {CardShotModal} from './card-shot-modal'

export const CardShot = ({area, properties, title, description, image}: EntryShot) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onOpen = useCallback(() => setIsModalOpen(true), [])
  const onClose = useCallback(() => setIsModalOpen(false), [])

  return (
    <Fragment>
      <div
        className="w-full shrink-0 flex h-full contain-intrinsic overflow-hidden bg-card-surface rounded-2xl border border-solid border-white/15"
        style={{gridArea: area, transformStyle: 'preserve-3d'}}
      >
        <div
          onClick={onOpen}
          className="flex flex-col w-full grow overflow-hidden relative items-center justify-center rounded-2xl cursor-pointer"
        >
          <div className="w-full h-full flex justify-center items-center relative overflow-hidden">
            <Image src={image} alt="alt" fill objectFit="cover" />
          </div>
        </div>
      </div>
      <CardShotModal
        isModalOpen={isModalOpen}
        onClose={onClose}
        properties={properties}
        title={title}
        description={description}
        image={image}
      />
    </Fragment>
  )
}
