'use client'

import {type FC, useMemo} from 'react'

import {Config} from '@/config'

import {FocusRing, Surface} from '../../entity'
import {openExternal, useHotspots} from '../../interaction'
import {focusIds} from '../../state'
import {useUnderlines} from '../shared'
import {ProfileAvatar} from './ProfileAvatar'
import {ProfileHints} from './ProfileHints'
import {ProfileIdentity} from './ProfileIdentity'
import {useProfileEntrance} from './useProfileEntrance'
import {useProfileLayout} from './useProfileLayout'

export const ProfileContent: FC = () => {
  const layout = useProfileLayout()
  const entrance = useProfileEntrance()
  const [underline] = useUnderlines(1)

  const hotspots = useMemo(
    () => [
      {
        onClick: () => openExternal(Config.company.url),
        onEnter: underline.enter,
        onLeave: underline.leave,
        rect: layout.company,
      },
    ],
    [layout, underline]
  )
  const pointer = useHotspots(hotspots)

  return (
    <>
      <Surface {...pointer} />
      <ProfileAvatar x={layout.rowX} motion={entrance.avatar} />
      <ProfileIdentity
        x={layout.textX}
        company={layout.company}
        underline={layout.underline}
        underlineMotion={underline.motion}
        name={entrance.name}
        role={entrance.role}
        companyName={entrance.company}
      />
      <ProfileHints xs={layout.hintX} motions={entrance.hints} />
      <FocusRing id={focusIds.company} rect={layout.company} radius={6} />
    </>
  )
}
