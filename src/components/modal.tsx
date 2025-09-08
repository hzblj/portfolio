'use client'

import {type FC, type ReactNode, useEffect} from 'react'
import ReactDOM from 'react-dom'

type ModalProps = {
  isOpen: boolean
  children: ReactNode
  onClose(): void
}

export const Modal: FC<ModalProps> = ({isOpen, onClose, children}) => {
  const modalRoot = document.getElementById('main')!

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-40 w-screen h-screen overflow-auto block">
      <div className="flex justify-center items-center w-full min-h-full mx-auto py-10 relative">
        <div className="flex flex-col w-full max-w-[512px] rounded-[52px] bg-black z-40">{children}</div>
        <div className="absolute bg-black/50 inset-0" onClick={onClose} />
      </div>
    </div>,
    modalRoot
  )
}
