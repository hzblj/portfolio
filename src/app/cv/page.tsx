import {CV} from '@/components'

export default async function Home() {
  return (
    <div className="flex w-full h-full justify-center overflow-y-scroll pt-[116px]">
      <div className="max-w-[700px] h-full flex flex-col items-center py-[56px] px-[64px]">
        <CV />
      </div>
    </div>
  )
}
