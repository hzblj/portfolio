import {CardProfileControlsArrows} from './card-profile-controls-arrows'
import {CardProfileControlsKeyboard} from './card-profile-controls-keyboard'

export const CardProfileControls = () => (
  <div className="flex flex-row items-center justify-center pt-11">
    <div className="pr-1.5">
      <CardProfileControlsArrows />
    </div>
    <div className="pr-1.5">
      <span className="text-[12px] font-normal leading-[100%] tracking-[0px] text-white/50">Scroll</span>
    </div>
    <div className="pr-1.5">
      <span className="text-[12px] font-normal leading-[100%] tracking-[0px] text-white/30">or use</span>
    </div>
    <div className="pr-1">
      <CardProfileControlsKeyboard />
    </div>
    <div className="pr-1.5">
      <span className="text-[12px] font-normal leading-[100%] tracking-[0px] text-white/50">WSAD keys</span>
    </div>
    <div className="pr-1.5">
      <span className="text-[12px] font-normal leading-[100%] tracking-[0px] text-white/30">to explore...</span>
    </div>
  </div>
)
