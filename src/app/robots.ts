export default function robots() {
  return {
    rules: [
      {
        allow: '/',
        disallow: ['/api/', '/_next/'],
        userAgent: '*',
      },
    ],
    sitemap: 'https://janblazej.dev/sitemap.xml',
  }
}
