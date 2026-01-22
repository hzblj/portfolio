import {promises as fs} from 'node:fs'
import path from 'node:path'

const entriesDir = path.join(process.cwd(), 'src/db/entries')

function slugify(input) {
  return input
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function extractProductValueFromProperties(source) {
  const m = source.match(/\{\s*name:\s*'Product',\s*value:\s*'([^']+)'\s*\}/m)
  return m?.[1] ?? null
}

function extractTitle(source) {
  const m = source.match(/\btitle:\s*'([^']+)'/)
  return m?.[1] ?? null
}

function computeSlug(source) {
  const product = extractProductValueFromProperties(source)
  const title = extractTitle(source)

  if (!title) return null

  const titleProject = title.includes(' - ') ? title.split(' - ')[0] : null
  const project = titleProject || product || ''
  let rest = title
  if (titleProject) rest = title.slice(titleProject.length).replace(/^\s*-\s*/, '')

  const raw = project && rest ? `${project} ${rest}` : title
  return slugify(raw)
}

function injectSlug(source, slug) {
  if (source.includes('slug:')) return source

  // Insert slug right after size
  const replaced = source.replace(
    /\n\s*size:\s*'[^']+',\n/g,
    match => `${match}  slug: '${slug}',\n`,
  )

  if (replaced === source) {
    throw new Error('Could not find size field to insert slug')
  }

  return replaced
}

const files = (await fs.readdir(entriesDir))
  .filter(f => f.startsWith('shot-small-') && f.endsWith('.ts'))

let changed = 0

for (const file of files) {
  const fullPath = path.join(entriesDir, file)
  const source = await fs.readFile(fullPath, 'utf8')
  if (source.includes('slug:')) continue

  const slug = computeSlug(source)
  if (!slug) {
    throw new Error(`Cannot compute slug for ${file}`)
  }

  const next = injectSlug(source, slug)
  await fs.writeFile(fullPath, next, 'utf8')
  changed++
  console.log(`updated ${file} -> ${slug}`)
}

console.log(`done, changed ${changed} file(s)`)
