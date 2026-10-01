import {AppLegal} from '@/components'
import {klipito} from '@/db'

import {klipitoMetadata} from '../metadata'

export const metadata = klipitoMetadata({
  description: klipito.terms.description,
  path: `/${klipito.slug}/terms`,
  title: `${klipito.terms.title} · ${klipito.name}`,
})

export default function KlipitoTerms() {
  return <AppLegal app={klipito} document="terms" />
}
