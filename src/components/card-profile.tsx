import {EntryProfile} from '@/db'

export const CardProfile = ({area}: EntryProfile) => (
  <div
    className="w-full shrink-0 flex h-full contain-intrinsic overflow-hidden card-border-gradient items-center justify-center"
    style={{gridArea: area, transformStyle: 'preserve-3d'}}
  >
    <div className="flex flex-col w-full grow overflow-hidden h-full items-center justify-center">{area}</div>
  </div>
)
