import {Card} from '@/components'
import {Entries, Entry} from '@/db'
import {CameraProvider} from '@/providers'

const renderCard = (props: Entry) => {
  switch (props.variant) {
    case 'contact':
      return (
        <Card>
          <div>Contact</div>
        </Card>
      )
    case 'profile':
      return (
        <Card>
          <div>Profile</div>
        </Card>
      )
    case 'map':
      return (
        <Card>
          <div>Map</div>
        </Card>
      )
    case 'cv':
      return (
        <Card>
          <div>CV</div>
        </Card>
      )
    case 'shot':
      return (
        <Card>
          <div>Shot {props.title}</div>
        </Card>
      )
    case 'gallery':
      return (
        <Card>
          <div>Gallery</div>
        </Card>
      )
    case 'technologies':
      return (
        <Card>
          <div>Technologies</div>
        </Card>
      )
  }
}

export default async function Home() {
  const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`)
  const res = (await req.json()) as {data: Entries}

  return (
    <CameraProvider>
      {res.data.map(entry => (
        <div
          key={entry.area}
          className="w-full shrink-0 flex h-full contain-intrinsic bg-white rounded-xl ring-1 ring-black/5 overflow-hidden"
          style={{gridArea: entry.area, transformStyle: 'preserve-3d'}}
        >
          {renderCard(entry)}
        </div>
      ))}
    </CameraProvider>
  )
}
