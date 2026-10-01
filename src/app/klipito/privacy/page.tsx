import {AppLegal} from '@/components'
import {klipito} from '@/db'

import {klipitoMetadata} from '../metadata'

export const metadata = klipitoMetadata({
  description: klipito.privacy.description,
  path: `/${klipito.slug}/privacy`,
  title: `${klipito.privacy.title} · ${klipito.name}`,
})

export default function KlipitoPrivacy() {
  return <AppLegal app={klipito} document="privacy" />
}
