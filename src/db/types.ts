export type EntryVariant = 'shot' | 'contact' | 'map' | 'cv' | 'profile' | 'gallery' | 'technologies'

export type ShotSize = 's' | 'l'
export type ShotArea = `${ShotSize}${number}`

export type AnimationConfig = {
  origin: string
  from: {
    x: number
    y: number
    scale: number
    opacity: number
  }
  to: {
    x: number
    y: number
    scale: number
    opacity: number
    duration: number
    delay: number
    ease: string
  }
}

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
  slug: string
  animation?: AnimationConfig
}

export type Contact = {
  type: string
  url: string
  name?: string
}

export type EntryContact = {
  area: 'contact'
  contacts: Contact[]
  variant: Extract<EntryVariant, 'contact'>
  slug: string
  animation?: AnimationConfig
}

export type EntryMap = {
  area: 'map'
  variant: Extract<EntryVariant, 'map'>
  slug: string
  animation?: AnimationConfig
}

export type EntryCV = {
  area: 'cv'
  variant: Extract<EntryVariant, 'cv'>
  slug: string
  animation?: AnimationConfig
}

export type EntryProfile = {
  area: 'profile'
  variant: Extract<EntryVariant, 'profile'>
  slug: string
  animation?: AnimationConfig
}

export type EntryGallery = {
  area: 'gallery'
  variant: Extract<EntryVariant, 'gallery'>
  slug: string
  animation?: AnimationConfig
}

export type EntryTechnologies = {
  area: 'technologies'
  variant: Extract<EntryVariant, 'technologies'>
  slug: string
  animation?: AnimationConfig
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

export type CVPosition = {
  company?: string
  title: string
  url?: string
}

export type CVSection = {
  year: string
  positions: CVPosition[]
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
  connect: Contact[]
}
