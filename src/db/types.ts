export type EntryVariant = 'shot' | 'contact' | 'map' | 'cv' | 'profile' | 'gallery' | 'technologies'

export type EntryShot = {
  title: string
  variant: Extract<EntryVariant, 'shot'>
}

export type EntryContact = {
  variant: Extract<EntryVariant, 'contact'>
}

export type EntryMap = {
  variant: Extract<EntryVariant, 'map'>
}

export type EntryCV = {
  variant: Extract<EntryVariant, 'cv'>
}

export type EntryProfile = {
  variant: Extract<EntryVariant, 'profile'>
}

export type EntryGallery = {
  variant: Extract<EntryVariant, 'gallery'>
}

export type EntryTechnologies = {
  variant: Extract<EntryVariant, 'technologies'>
}

export type Entry = EntryShot | EntryContact | EntryMap | EntryCV | EntryProfile | EntryGallery | EntryTechnologies
