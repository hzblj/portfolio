import {FC} from 'react'

import {CardExpandLink} from './card-expand-link'
import {CV} from './cv'
import {Modal} from './modal'

type CardCvModal = {
  isOpen: boolean
  instant?: boolean
  onClose: () => void
}

export const CardCVModal: FC<CardCvModal> = ({isOpen, instant, onClose}) => {
  return (
    <Modal
      isOpen={isOpen}
      instant={instant}
      onClose={onClose}
      variant="large"
      // Pinned to the viewport rather than the card's corner, unlike the shot
      // modals: the CV runs to some six thousand pixels, and an affordance you
      // scroll away from in the first screen is no affordance. Goes through
      // `overlay` because the card is transformed and would capture it. Lands on
      // the same spot the collapse control takes on /cv, so only the arrows move.
      overlay={<CardExpandLink href="/cv" label="the full CV" />}
    >
      <div className="flex flex-col items-center py-[32px] md:py-[56px] px-[32px] md:px-0">
        {/* The reveal finds the modal's own scroll container on its own, so the
            same component animates against whichever thing is scrolling. */}
        <CV animated instant={instant} />
      </div>
    </Modal>
  )
}
