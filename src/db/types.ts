export type EntryVariant = 'shot' | 'contact' | 'map' | 'cv' | 'profile' | 'gallery' | 'technologies'

export type ShotSize = 's' | 'l'
export type ShotArea = `${ShotSize}${number}`

export type EntryShotProperty = {
  name: string
  value: string
  url?: string
}

export type EntryShotProperties = EntryShotProperty[]

export type EntryShotVideos = {
  mp4: string
  webm: string
}

export type EntryShotSize = 'large' | 'small'

export type EntryShot = {
  title: string
  description: string
  image: string
  videos?: EntryShotVideos
  area: ShotArea
  properties: EntryShotProperties
  variant: Extract<EntryVariant, 'shot'>
  size: EntryShotSize
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

export type CVSectionProject = {
  name: string
  url: string
  position: string
  technologies: string[]
  paragraphs: string[]
}

export type CVSectionLink = {
  name: string
  url: string
}

export type CVSection = {
  year: string
  positions: string[]
  location: string | null
  technologies: string[]
  paragraphs: string[]
  projects?: CVSectionProject[]
  links: CVSectionLink[]
}

export type CVSections = CVSection[]

export type CV = {
  workExperience: CVSections
  sideProjects: CVSections
  education: CVSections
}
