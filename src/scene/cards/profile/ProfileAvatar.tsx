'use client'

import {type FC, useMemo} from 'react'

import {Layer, type Motion} from '../../entity'
import {useImage} from '../../graphics'
import {AVATAR, ROW_TOP} from './styles'

const BLEED = 16

type ProfileAvatarProps = {
  x: number
  motion: Motion
}

export const ProfileAvatar: FC<ProfileAvatarProps> = ({x, motion}) => {
  const map = useImage('/png/profile@3x.png', 128)
  const rect = useMemo(() => ({...AVATAR, x, y: ROW_TOP}), [x])

  return <Layer rect={rect} radius={32} map={map} order={1} motion={motion} bleed={BLEED} />
}
