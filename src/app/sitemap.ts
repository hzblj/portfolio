import {Config} from '@/config'
import {entries} from '@/db'

export default function sitemap() {
  const baseUrl = Config.site

  const routes = [
    {
      changeFrequency: 'monthly' as const,
      lastModified: new Date(),
      priority: 1,
      url: baseUrl,
    },
    {
      changeFrequency: 'monthly' as const,
      lastModified: new Date(),
      priority: 0.6,
      url: `${baseUrl}/cv`,
    },
    {
      changeFrequency: 'yearly' as const,
      lastModified: new Date(),
      priority: 0.4,
      url: `${baseUrl}/ico`,
    },
  ]

  const shotRoutes = entries
    .filter(entry => entry.variant === 'shot')
    .map(entry => ({
      changeFrequency: 'monthly' as const,
      lastModified: new Date(),
      priority: 0.8,
      url: `${baseUrl}/${entry.slug}`,
    }))

  return [...routes, ...shotRoutes]
}
