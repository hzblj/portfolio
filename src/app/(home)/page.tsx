import {Config} from '@/config'
import {CameraProvider} from '@/providers'

export default function Home() {
  return (
    <CameraProvider>
      {Config.areas.map(area => (
        <div
          key={area}
          className="w-full shrink-0 flex h-full contain-intrinsic bg-white rounded-xl ring-1 ring-black/5 overflow-hidden"
          style={{gridArea: area, transformStyle: 'preserve-3d'}}
        >
          <div className="flex flex-col w-full grow overflow-hidden rounded-xl relative z-40">{area}</div>
        </div>
      ))}
    </CameraProvider>
  )
}
