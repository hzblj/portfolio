import { promises as fs } from 'node:fs'
import path from 'node:path'

const entriesDir = path.join(process.cwd(), 'src/db/entries')
const indexFile = path.join(process.cwd(), 'src/db/index.ts')

const files = (await fs.readdir(entriesDir))
  .filter(f => f.endsWith('.ts'))

function toVarName(file) {
  const base = file.replace(/\.ts$/, '')
  const parts = base.split('-')

  if (parts[0] === 'shot') {
    parts.shift()
  }

  return parts
    .map((p, i) =>
      i === 0
        ? p.toLowerCase()
        : p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()
    )
    .join('')
}

let imports = ''
let arrayItems = ''

files.forEach(f => {
  const varName = toVarName(f)
  const importPath = `./entries/${f.replace(/\.ts$/, '')}`
  imports += `import ${varName} from '${importPath}'\n`
  arrayItems += `  ${varName},\n`
})

const content = `${imports}
import type {Entries} from './types'

export const entries: Entries[] = [
${arrayItems}]

export * from './cv'
export * from './types'
`

await fs.writeFile(indexFile, content, 'utf8')
console.log('✅ index.ts updated')
