import {assertUniqueSlugs, assertValidSlug} from '../src/db/utils/slug.js'
import {entries} from '../src/db/index.js'

const slugs = entries.map(e => e.slug)

for (const e of entries) {
  assertValidSlug(e.slug, `${e.variant}:${e.area}`)
}

assertUniqueSlugs(slugs, 'src/db/entries')

console.log(`✅ DB ok (${entries.length} entries, ${slugs.length} slugs)`)
