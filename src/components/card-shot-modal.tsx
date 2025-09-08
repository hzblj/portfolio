import Image from 'next/image'
import {FC} from 'react'

import {EntryShotProperties, EntryShotProperty} from '@/db'

import {Modal} from './modal'

export type CardShotModalProps = {
  title: string
  image: string
  description: string
  isModalOpen: boolean
  onClose(): void
  properties: EntryShotProperties
}

const ShotProperty: FC<EntryShotProperty> = ({name, value}) => (
  <div className="flex flex-row py-6">
    <div className="flex-1">
      <span className="text-[15px] font-normal tracking-normal align-middle text-white/50 leading-[100%]">{name}</span>
    </div>
    <div>
      <span className="text-[15px] font-normal tracking-normal align-middle text-white leading-[100%]">{value}</span>
    </div>
  </div>
)

export const CardShotModal: FC<CardShotModalProps> = ({
  isModalOpen,
  onClose,
  properties,
  title,
  description,
  image,
}) => (
  <Modal isOpen={isModalOpen} onClose={onClose}>
    <div className="px-8 pt-8 pb-2">
      <div className="w-full h-[336px] rounded-[20px] flex justify-center items-center relative overflow-hidden">
        <Image src={image} alt="alt" fill objectFit="cover" />
      </div>
      <div>
        <div>
          <h2 className="text-[16px] font-normal tracking-normal align-middle mt-[40px] text-white leading-[100%]">
            {title}
          </h2>
          <p className="text-[16px] font-normal tracking-normal align-middle mt-[8px] mb-[24px] text-white/50 leading-[20px]">
            {description}
          </p>
        </div>
        <div>
          {properties.map((item, index) => (
            <div key={item.name}>
              <ShotProperty {...item} />
              {properties.length - 1 > index && <div className="h-[1px] w-full bg-white/15" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  </Modal>
)
