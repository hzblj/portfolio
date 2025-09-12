import Image from 'next/image'
import {forwardRef} from 'react'

export type ModalCloseButtonProps = {
  onClose(): void
}

export const ModalCloseButton = forwardRef<HTMLDivElement, ModalCloseButtonProps>(({onClose}, ref) => (
  <div
    ref={ref}
    onClick={onClose}
    role="button"
    className="md:hidden cursor-pointer touch-manipulation fixed z-[999] flex items-center justify-center w-16 h-16 rounded-[100px] bg-[linear-gradient(#2b2b2b,_#000)] left-1/2 top-auto bottom-6 -translate-x-1/2 transform-gpu shadow-[0_3px_8px_#0003,0_2px_3px_#0003]"
  >
    <Image priority src="/svg/close-icon.svg" alt="close" width={24} height={24} style={{objectFit: 'cover'}} />
  </div>
))
