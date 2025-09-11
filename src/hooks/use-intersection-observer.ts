'use client'

import {useCallback, useEffect, useMemo, useRef, useState} from 'react'

type MaybeElement = Element | null

export type IntersectionOptions = Omit<IntersectionObserverInit, 'threshold'> & {
  threshold?: number | number[]
  once?: boolean
}

type ObserverKey = string

const makeKey = (opts: IntersectionObserverInit): ObserverKey => {
  const rootId = opts.root instanceof Element ? ((opts.root as Element).getAttribute('data-io-root-id') ?? '') : 'null'
  const margin = opts.rootMargin ?? '0px'
  const thresh = Array.isArray(opts.threshold) ? opts.threshold.join(',') : String(opts.threshold ?? 0)

  return `${rootId}|${margin}|${thresh}`
}

const observerRegistry = new Map<
  ObserverKey,
  {
    observer: IntersectionObserver
    elements: Map<Element, Set<(entry: IntersectionObserverEntry) => void>>
  }
>()

const getPooledObserver = (
  opts: IntersectionObserverInit
): {
  observer: IntersectionObserver
  elements: Map<Element, Set<(entry: IntersectionObserverEntry) => void>>
} => {
  const key = makeKey(opts)
  const cached = observerRegistry.get(key)

  if (cached) {
    return cached
  }

  const elements = new Map<Element, Set<(entry: IntersectionObserverEntry) => void>>()

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const cbs = elements.get(entry.target)

      if (!cbs) {
        continue
      }

      for (const cb of Array.from(cbs)) {
        cb(entry)
      }
    }
  }, opts)

  const record = {elements, observer}
  observerRegistry.set(key, record)
  return record
}

const isIOAvailable = (): boolean => {
  return typeof window !== 'undefined' && 'IntersectionObserver' in window
}

export const useIntersectionObserver = <T extends Element = Element>(
  options: IntersectionOptions = {}
): {
  ref: (node: T | null) => void
  inView: boolean
  entry: IntersectionObserverEntry | null
} => {
  const {root = null, rootMargin = '0px', threshold = 0, once = false} = options
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const [inView, setInView] = useState(false)

  const targetRef = useRef<T | null>(null)
  const frozenRef = useRef(false)

  const ioInit = useMemo<IntersectionObserverInit>(
    () => ({root: (root as MaybeElement) ?? null, rootMargin, threshold}),
    [root, rootMargin, threshold]
  )

  // biome-ignore lint/suspicious/noEmptyBlockStatements: Default value
  const cleanupRef = useRef<() => void>(() => {})

  const ref = useCallback((node: T | null) => {
    targetRef.current = node
  }, [])

  useEffect(() => {
    if (!isIOAvailable()) {
      return
    }

    const node = targetRef.current

    if (!node) {
      return
    }

    const {observer, elements} = getPooledObserver(ioInit)

    const handle = (e: IntersectionObserverEntry) => {
      if (once && frozenRef.current) {
        return
      }

      setEntry(e)
      const visible = e.isIntersecting && e.intersectionRatio > 0

      setInView(visible)

      if (once && visible) {
        frozenRef.current = true

        observer.unobserve(node)
        const subs = elements.get(node)

        if (subs) {
          subs.clear()
        }
      }
    }

    let subs = elements.get(node)

    if (!subs) {
      subs = new Set()
      elements.set(node, subs)
    }

    subs.add(handle)
    observer.observe(node)

    cleanupRef.current = () => {
      const set = elements.get(node)

      if (set) {
        set.delete(handle)

        if (set.size === 0) {
          elements.delete(node)
          observer.unobserve(node)
        }
      }
    }

    return () => cleanupRef.current()
  }, [ioInit, once])

  // biome-ignore lint/correctness/useExhaustiveDependencies: Update
  useEffect(() => {
    frozenRef.current = false
  }, [ioInit.root, ioInit.rootMargin, ioInit.threshold, once])

  return {entry, inView, ref}
}
