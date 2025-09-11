import Image from 'next/image'
import {FC} from 'react'

import {Config} from '@/config'
import {EntryProfile} from '@/db'

import {CardProfileControls} from './card-profile-controls'
import {LinkExternal} from './link-external'

const Avatar = () => (
  <div className="relative flex items-center justify-center rounded-[48px] overflow-hidden w-[64px] h-[64px] shadow-[inset_0_0_0_1px_#ffffff1a]">
    <Image
      src="/png/profile@3x.png"
      alt="profile-avatar"
      fill
      sizes="64px"
      style={{
        objectFit: 'cover',
      }}
    />
  </div>
)

const Name = () => (
  <div>
    <h1 className="text-[18px] font-medium leading-[24px] tracking-[0px] bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0.48)_100%)] bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]">
      {Config.fullName}
    </h1>
  </div>
)

const Position = () => (
  <div className="flex flex-row gap-[7px]">
    <h2 className="text-[18px] font-medium leading-[24px] tracking-[0px] text-white/50">{Config.company.position}</h2>
    <LinkExternal url={Config.company.url}>
      <h2 className="text-[18px] font-medium leading-[24px] tracking-[0px] bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0.48)_100%)] bg-clip-text text-transparent drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]">
        {Config.company.name}
      </h2>
    </LinkExternal>
  </div>
)

export const CardProfile: FC<EntryProfile> = ({area}) => (
  <div
    className="w-full shrink-0 flex h-full contain-intrinsic overflow-hidden card items-center justify-center"
    style={{gridArea: area, transformStyle: 'preserve-3d'}}
  >
    <div className="flex flex-col w-full grow overflow-hidden h-full items-center">
      <div className="flex flex-row items-center gap-4 pt-[61px]">
        <Avatar />
        <div>
          <Name />
          <Position />
        </div>
      </div>
      <CardProfileControls />
    </div>
  </div>
)
