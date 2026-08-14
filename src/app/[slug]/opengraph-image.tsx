import {readFile} from 'node:fs/promises'
import path from 'node:path'

import {ImageResponse} from 'next/og'
// The renderer reads PNG and JPEG and nothing else, and a third of the shots are
// WebP — so every one of them is decoded here first. Declared in this project's
// own devDependencies rather than leant on through Next's optional one, on the
// same range, so the lockfile already covers it.
import sharp from 'sharp'

import {entries, getEntryBySlug} from '@/db'

export const size = {height: 630, width: 1200}
export const contentType = 'image/png'

// 4:3, the ratio every shot is shot at, as tall as the card can be and still
// keep air above and below it.
const FRAME = {height: 546, width: 728}

export function generateStaticParams() {
  return entries.filter(entry => entry.variant === 'shot').map(entry => ({slug: entry.slug}))
}

type Props = {
  params: Promise<{slug: string}>
}

/**
 * Only here for the alt text, which has to name the shot it is showing and so
 * cannot be the one static string the `alt` export would allow.
 */
export async function generateImageMetadata({params}: Props) {
  const {slug} = await params
  const entry = getEntryBySlug(slug)

  return [
    {
      alt: entry && entry.variant === 'shot' ? `${entry.title} — case study` : 'Case study',
      contentType,
      id: 'og',
      size,
    },
  ]
}

/**
 * The shot's own artwork, laid on the ambient the site is lit by.
 *
 * The photography is 4:3 and a social card is 1.91:1, so handing the file over
 * as the preview would have every platform crop the phone's head and feet off.
 * Held inside the frame instead, on the same dark the pages sit on, so the
 * picture arrives whole and the card reads as part of the site.
 *
 * No type is drawn here on purpose: the title and the description travel as
 * `og:title` and `og:description`, which every platform sets in its own UI
 * beneath the image — printing them again would only say it twice, and it keeps
 * the renderer off fonts it would have to fetch at build time.
 */
export default async function OpengraphImage({params}: Props) {
  const {slug} = await params
  const entry = getEntryBySlug(slug)

  if (!entry || entry.variant !== 'shot') {
    return new ImageResponse(<div style={{background: '#08080b', height: '100%', width: '100%'}} />, size)
  }

  // Resized to the box it lands in as well as re-encoded: the sources are
  // 1600 wide and the frame is 728, and carrying four times the pixels through
  // a base64 string only to throw them away costs the build time and nothing
  // else.
  const file = await readFile(path.join(process.cwd(), 'public', entry.image))
  const frame = await sharp(file).resize(FRAME.width, FRAME.height, {fit: 'cover'}).jpeg({quality: 88}).toBuffer()
  const artwork = `data:image/jpeg;base64,${frame.toString('base64')}`

  return new ImageResponse(
    <div
      style={{
        alignItems: 'center',
        backgroundColor: '#08080b',
        // The three lights the pages carry, flattened to the one pose a still
        // can hold.
        backgroundImage: [
          'radial-gradient(46% 58% at 14% 6%, rgba(27, 63, 181, 0.34) 0%, rgba(27, 63, 181, 0) 100%)',
          'radial-gradient(42% 62% at 92% 34%, rgba(91, 43, 201, 0.28) 0%, rgba(91, 43, 201, 0) 100%)',
          'radial-gradient(48% 54% at 40% 108%, rgba(15, 111, 140, 0.22) 0%, rgba(15, 111, 140, 0) 100%)',
        ].join(', '),
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {/* 4:3 at this height, so the frame is the picture rather than a box
          around it — same corner and same hairline the artwork wears on the
          page it came from. */}
      <img
        src={artwork}
        alt=""
        width={FRAME.width}
        height={FRAME.height}
        style={{
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: 28,
          objectFit: 'cover',
        }}
      />
    </div>,
    size
  )
}
