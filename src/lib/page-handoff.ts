/**
 * Where an open card's content was scrolled to, carried across the hand-over
 * between its modal and the page it expands into.
 *
 * The modal expands into the page with the content held exactly where it is on
 * screen, so whatever the modal had been scrolled to, the page has to open
 * scrolled to the same place — and on the way back the modal picks up wherever
 * the page was left. Each side leaves a note for the other; the receiving side
 * reads it once.
 */

type Handoff = {scroll: number}

let toPage: Handoff | null = null
let toModal: Handoff | null = null

export const handOffToPage = (scroll: number) => {
  toPage = {scroll}
}

export const pageArrival = () => toPage

export const settlePageArrival = () => {
  toPage = null
}

export const handBackToModal = (scroll: number) => {
  toModal = {scroll}
}

export const takeModalReturn = () => {
  const handoff = toModal
  toModal = null

  return handoff
}
