import {EntryMap} from '@/db'

export const CardMap = ({area}: EntryMap) => (
  <div
    className="w-full shrink-0 flex h-full contain-intrinsic overflow-hidden bg-card-surface rounded-2xl border border-solid border-white/15"
    style={{gridArea: area, transformStyle: 'preserve-3d'}}
  >
    <div className="flex flex-col w-full grow overflow-hidden relative z-40 items-center justify-center rounded-2xl">
      {area}
    </div>
  </div>
)
