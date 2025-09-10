import {CV} from '@/components'

export default async function Cv() {
  return (
    <div className="flex w-full h-full justify-center overflow-y-scroll pt-[116px]">
      <div className="max-w-[572px] w-full h-full flex flex-col items-center">
        <CV />
      </div>
    </div>
  )
}
