import {FC} from 'react'

import {CV} from './cv'
import {Modal} from './modal'

type CardCvModal = {
  isOpen: boolean
  onClose: () => void
}

export const CardCVModal: FC<CardCvModal> = ({isOpen, onClose}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="large">
      <div className="flex flex-col items-center py-[32px] md:py-[56px] px-[32px] md:px-0">
        <CV />
      </div>
    </Modal>
  )
}
