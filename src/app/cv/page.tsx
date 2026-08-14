import {CardCollapseLink, CV, PersonJsonLd, SmoothScroll} from '@/components'

export default async function Cv() {
  return (
    <>
      <PersonJsonLd />
      {/* Both of these stay outside the smoother: it moves its content with a
          transform, and anything `fixed` inside would ride along with it.

          Same ambient as the project pages, held back a stop — this one is a
          wall of body copy rather than a card, so the light stays at the edges. */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden bg-[#08080b]">
        {/* The colour is the text colour: the glow is a gradient of
            `currentColor`, not a fill — see `.scene-light` in app.css. */}
        <div className="scene-light scene-light-a -top-[26%] -left-[8%] h-[46vmax] w-[64vmax] text-[#1b3fb5] opacity-[0.16]" />
        <div className="scene-light scene-light-b top-[22%] -right-[22%] h-[56vmax] w-[44vmax] text-[#5b2bc9] opacity-[0.13]" />
        <div className="scene-light scene-light-c -bottom-[30%] left-[10%] h-[40vmax] w-[58vmax] text-[#0f6f8c] opacity-[0.10]" />
        <div className="scene-grain absolute inset-0 opacity-[0.05]" />
        <div className="absolute inset-0 bg-[radial-gradient(52%_60%_at_50%_50%,rgba(0,0,0,0.86)_0%,transparent_82%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(92%_80%_at_50%_45%,transparent_38%,rgba(0,0,0,0.6)_100%)]" />
      </div>
      {/* Same spot the expand control occupies in the modal, so crossing over
          only turns the arrows round. Fixed, because the page is long. */}
      <CardCollapseLink />

      <SmoothScroll>
        <div className="relative flex w-full justify-center pt-[116px]">
          <div className="max-w-[572px] w-full flex flex-col items-center px-5">
            <CV animated>
              <div className="flex h-[116px] w-full flex-shrink-0" />
            </CV>
          </div>
        </div>
      </SmoothScroll>
    </>
  )
}
