import {Config} from '@/config'

export default function robots() {
  return {
    rules: [
      {
        allow: '/',
        disallow: ['/api/', '/_next/'],
        userAgent: '*',
      },
    ],
    sitemap: `${Config.site}/sitemap.xml`,
  }
}
