import {entries} from '@/db'

export default function sitemap() {
  const baseUrl = 'https://janblazej.dev'

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
