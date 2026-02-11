'use client'

import {FC, useCallback, useState} from 'react'

import {EntryGallery} from '@/db'
import {actionToggleModal, useCameraDispatch} from '@/providers'

import {CardGalleryStrip} from './card-gallery-strip'
import {Gallery} from './gallery'

export const CardGallery: FC<EntryGallery> = ({area}) => {
  const dispatch = useCameraDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOnClose = useCallback(() => {
    setIsModalOpen(false)
    actionToggleModal(dispatch, false)
  }, [dispatch])

  const handleOnOpen = useCallback(() => {
    setIsModalOpen(true)
    actionToggleModal(dispatch, true)
  }, [dispatch])

  return (
    <div
      className="w-full shrink-0 flex h-full contain-intrinsic overflow-hidden card"
      style={{gridArea: area, transformStyle: 'preserve-3d'}}
    >
      <div
        className="flex flex-col w-full grow overflow-hidden h-full items-center justify-center relative"
        onClick={handleOnOpen}
      >
        <CardGalleryStrip />
        <div
          className="absolute bottom-[0px] overflow-hidden flex justify-end items-end rounded-2xl h-full w-full pointer-events-none"
          style={{clipPath: 'inset(1px round 16px)'}}
        >
          <div className="h-[146px] w-full rounded-br-2xl rounded-bl-2xl bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] flex items-end justify-center">
            <span className="text-[14px] opacity-70 font-normal tracking-[0px] bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0.72)_100%)] bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(0,0,0,0.25)] pb-[32px]">
              Personal Gallery
            </span>
          </div>
        </div>
      </div>
      <Gallery isOpen={isModalOpen} onClose={handleOnClose} />
    </div>
  )
}
