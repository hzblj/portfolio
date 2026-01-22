import {Inter} from 'next/font/google'

import './app.css'

import type {Metadata} from 'next'
import {type ReactNode} from 'react'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
  authors: [{name: 'Jan Blazej', url: 'https://janblazej.dev'}],
  creator: 'Jan Blazej',
  description:
    'Experienced Lead Mobile Developer specializing in React Native, Expo, and TypeScript. Building high-performance mobile applications for iOS and Android. Based in Prague, Czechia.',
  icons: {
    icon: '/favicon.ico',
  },
  keywords: [
    'Jan Blazej',
    'Lead Mobile Developer',
    'React Native Developer',
    'Expo Developer',
    'TypeScript',
    'iOS Development',
    'Android Development',
    'Mobile App Development',
    'Prague Developer',
    'Footshop',
    'visionOS',
    'Swift',
    'RealityKit',
  ],
  metadataBase: new URL('https://janblazej.dev'),
  openGraph: {
    description:
      'Experienced Lead Mobile Developer specializing in React Native, Expo, and TypeScript. Building high-performance mobile applications for iOS and Android.',
    images: [
      {
        alt: 'Jan Blazej - Lead Mobile Developer',
        height: 192,
        url: '/png/profile@3x.png',
        width: 192,
      },
    ],
    locale: 'en_US',
    siteName: 'Jan Blazej Portfolio',
    title: 'Jan Blazej - Lead Mobile Developer & Founder',
    type: 'website',
    url: 'https://janblazej.dev',
  },
  publisher: 'Jan Blazej',
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    index: true,
  },
  title: {
    default: 'Jan Blazej - Lead Mobile Developer & Founder',
    template: '%s | Jan Blazej',
  },
  twitter: {
    card: 'summary',
    description:
      'Experienced Lead Mobile Developer specializing in React Native, Expo, and TypeScript. Building high-performance mobile applications.',
    // TODO - Better twitter image
    images: ['/png/profile@3x.png'],
    title: 'Jan Blazej - Lead Mobile Developer & Founder',
  },
}

type Props = Readonly<{
  children: ReactNode
}>

export default function RootLayout({children}: Props) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CZ',
      addressLocality: 'Prague',
    },
    email: 'hello@janblazej.dev',
    image: 'https://janblazej.dev/png/profile@3x.png',
    jobTitle: 'Lead Mobile Developer & Founder',
    knowsAbout: [
      'React Native',
      'Expo',
      'TypeScript',
      'iOS Development',
      'Android Development',
      'Mobile App Development',
      'Swift',
      'visionOS',
      'RealityKit',
    ],
    name: 'Jan Blazej',
    sameAs: ['https://www.linkedin.com/in/hzblj', 'https://github.com/hzblj', 'https://www.instagram.com/hzblj'],
    url: 'https://janblazej.dev',
    worksFor: {
      '@type': 'Organization',
      name: 'Footshop',
      url: 'https://footshop.com',
    },
  }

  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
