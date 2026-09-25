/**
 * One video, carried from a card into its modal and page.
 *
 * A card starts playing its clip on hover. Opening it would otherwise mount a
 * fresh `<video>` in the modal that starts again from zero, so the card lends
 * out the element it is already playing instead and every frame that shows the
 * clip — the modal, then the page it expands into — adopts that same element.
 * Playback never restarts because it never stops.
 *
 * Whoever adopted it last shows it; letting go hands it back to the one before.
 * Once nobody holds it, it goes back to the card, which decides whether it
 * keeps playing.
 */

type Lease = {
  element: HTMLVideoElement
  holders: HTMLElement[]
  onReturn: () => void
}

let lease: Lease | null = null

const plays = (element: HTMLVideoElement, src: string) =>
  [...element.querySelectorAll('source')].some(source => source.getAttribute('src') === src)

const endLease = () => {
  if (!lease) {
    return
  }

  const {element, onReturn} = lease
  lease = null
  element.remove()
  onReturn()
}

export const lendVideo = (element: HTMLVideoElement, onReturn: () => void) => {
  endLease()
  lease = {element, holders: [], onReturn}
}

export const isLent = (element: HTMLVideoElement) => lease?.element === element

export const hasLentVideo = (src: string) => lease !== null && plays(lease.element, src)

export const borrowVideo = (src: string, holder: HTMLElement) => {
  const current = lease

  if (!current || !plays(current.element, src)) {
    return null
  }

  current.holders.push(holder)
  holder.append(current.element)
  current.element.play().catch(() => undefined)

  return () => {
    current.holders = current.holders.filter(item => item !== holder)
    const previous = current.holders.at(-1)

    if (previous) {
      previous.append(current.element)
      current.element.play().catch(() => undefined)
      return
    }

    // Deferred, so a holder that lets go and takes it straight back in the same
    // commit — Strict Mode does exactly that — keeps it.
    queueMicrotask(() => {
      if (lease === current && current.holders.length === 0) {
        endLease()
      }
    })
  }
}
