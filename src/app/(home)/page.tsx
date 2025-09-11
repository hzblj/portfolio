import {CardContact, CardCV, CardGallery, CardMap, CardProfile, CardShot, CardTechnologies} from '@/components'
import {entries} from '@/db'
import {CameraProvider} from '@/providers'

export default async function Home() {
  return (
    <CameraProvider>
      {entries.map(entry => {
        switch (entry.variant) {
          case 'contact':
            return <CardContact key={entry.area} {...entry} />
          case 'cv':
            return <CardCV key={entry.area} {...entry} />
          case 'gallery':
            return <CardGallery key={entry.area} {...entry} />
          case 'map':
            return <CardMap key={entry.area} {...entry} />
          case 'profile':
            return <CardProfile key={entry.area} {...entry} />
          case 'shot':
            return <CardShot key={entry.area} {...entry} />
          case 'technologies':
            return <CardTechnologies key={entry.area} {...entry} />
        }
      })}
    </CameraProvider>
  )
}
