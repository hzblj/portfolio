'use client'

import type {FC} from 'react'

import {Config} from '@/config'

import {type Motion, SplitTextLayer} from '../../entity'
import type {Rect} from '../../grid'
import {UnderlineLayer} from '../shared'
import {NAME, POSITION, ROW_TOP} from './styles'

type ProfileIdentityProps = {
  x: number
  company: Rect
  underline: Rect
  underlineMotion: Motion
  name: readonly Motion[]
  role: readonly Motion[]
  companyName: readonly Motion[]
}

export const ProfileIdentity: FC<ProfileIdentityProps> = ({
  x,
  company,
  underline,
  underlineMotion,
  name,
  role,
  companyName,
}) => {
  return (
    <>
      <SplitTextLayer text={Config.fullName} style={NAME} x={x} top={ROW_TOP + 8} order={1} motions={name} />
      <SplitTextLayer text={Config.company.position} style={POSITION} x={x} top={company.y} order={1} motions={role} />
      <SplitTextLayer
        text={Config.company.name}
        style={NAME}
        x={company.x}
        top={company.y}
        order={1}
        motions={companyName}
      />
      <UnderlineLayer rect={underline} motion={underlineMotion} order={2} />
    </>
  )
}
