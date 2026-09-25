export type AmbientVariant = 'shot' | 'cv'

type Light = {className: string; color: string; opacity: number}

type Variant = {
  lights: readonly [Light, Light, Light]
  vignettes: readonly [string, string]
}

export const AMBIENT_VARIANTS: Record<AmbientVariant, Variant> = {
  cv: {
    lights: [
      {className: 'scene-light-a -top-[26%] -left-[8%] h-[46vmax] w-[64vmax]', color: '#1b3fb5', opacity: 0.16},
      {className: 'scene-light-b top-[22%] -right-[22%] h-[56vmax] w-[44vmax]', color: '#5b2bc9', opacity: 0.13},
      {className: 'scene-light-c -bottom-[30%] left-[10%] h-[40vmax] w-[58vmax]', color: '#0f6f8c', opacity: 0.1},
    ],
    vignettes: [
      'bg-[radial-gradient(52%_60%_at_50%_50%,rgba(0,0,0,0.86)_0%,transparent_82%)]',
      'bg-[radial-gradient(92%_80%_at_50%_45%,transparent_38%,rgba(0,0,0,0.6)_100%)]',
    ],
  },
  shot: {
    lights: [
      {className: 'scene-light-a -top-[24%] left-[2%] h-[46vmax] w-[64vmax]', color: '#1b3fb5', opacity: 0.2},
      {className: 'scene-light-b top-[26%] -right-[18%] h-[56vmax] w-[44vmax]', color: '#5b2bc9', opacity: 0.16},
      {className: 'scene-light-c -bottom-[28%] left-[16%] h-[40vmax] w-[58vmax]', color: '#0f6f8c', opacity: 0.13},
    ],
    vignettes: [
      'bg-[radial-gradient(46%_38%_at_50%_50%,rgba(0,0,0,0.8)_0%,transparent_80%)]',
      'bg-[radial-gradient(88%_74%_at_50%_45%,transparent_34%,rgba(0,0,0,0.62)_100%)]',
    ],
  },
}

export const variantOfPath = (pathname: string): AmbientVariant => (pathname === '/cv' ? 'cv' : 'shot')
