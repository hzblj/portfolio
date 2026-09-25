/**
 * The nearest scrolling ancestor, or undefined when it is the document.
 *
 * Content here scrolls in more than one kind of place — a page's own scroller,
 * the document under the smoother, an open card's modal — and finding it beats
 * threading a ref down to whoever needs it.
 */
export const findScroller = (node: HTMLElement | null) => {
  let element = node?.parentElement ?? null

  while (element && element !== document.body) {
    const {overflowY} = getComputedStyle(element)

    if (overflowY === 'auto' || overflowY === 'scroll') {
      return element
    }

    element = element.parentElement
  }

  return undefined
}
