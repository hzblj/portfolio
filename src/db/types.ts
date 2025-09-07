export type EntryVariant = 'shot' | 'contact' | 'map' | 'cv' | 'profile' | 'gallery' | 'technologies'

export type ShotSize = 's' | 'l'
export type ShotArea = `${ShotSize}${number}`

export type EntryShot = {
  title: string
  area: ShotArea
  variant: Extract<EntryVariant, 'shot'>
}

export type EntryContact = {
  area: 'contact'
  variant: Extract<EntryVariant, 'contact'>
}

export type EntryMap = {
  area: 'map'
  variant: Extract<EntryVariant, 'map'>
}

export type EntryCV = {
  area: 'cv'
  variant: Extract<EntryVariant, 'cv'>
}

export type EntryProfile = {
  area: 'profile'
  variant: Extract<EntryVariant, 'profile'>
}

export type EntryGallery = {
  area: 'gallery'
  variant: Extract<EntryVariant, 'gallery'>
}

export type EntryTechnologies = {
  area: 'technologies'
  variant: Extract<EntryVariant, 'technologies'>
}

export type Entry = EntryShot | EntryContact | EntryMap | EntryCV | EntryProfile | EntryGallery | EntryTechnologies

export type Entries = Entry[]
