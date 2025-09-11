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
      <div className="flex flex-col items-center py-[56px]">
        <CV />
      </div>
    </Modal>
  )
}
