import {AppOverview} from '@/components'
import {klipito} from '@/db'

import {klipitoMetadata} from './metadata'

export const metadata = klipitoMetadata({
  description: klipito.description,
  path: `/${klipito.slug}`,
  title: klipito.name,
})

export default function Klipito() {
  return <AppOverview app={klipito} />
}
