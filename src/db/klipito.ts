import {ico} from './ico'
import type {AppListing} from './types'

const email = 'hello@janblazej.dev'

const operator = `${ico.name}, a self-employed developer registered in ${ico.location} (IČO ${ico.ico})`

/**
 * What TikTok reviews before it lets Klipito Uploader publish through its
 * Content Posting API: a page saying what the app does, and its terms and
 * privacy policy. The uploader is an internal Mac tool posting to Klipito's own
 * accounts, and every line here has to stay true to that — TikTok checks the
 * pages against the app.
 */
export const klipito: AppListing = {
  about:
    'Klipito posts short clips from Czech and Slovak live streams. Klipito Uploader is the tool it uses to get each clip ready and publish it to Klipito’s own TikTok account. The uploader itself runs on a Mac, so there is nothing to use here: this page describes what it does.',
  contact: email,
  description: 'A tool for preparing and uploading short videos to Klipito’s accounts.',
  logo: '/png/klipito-logo.png',
  name: 'Klipito Uploader',
  privacy: {
    description:
      'What Klipito Uploader collects when it connects a TikTok account, why it needs it, and how to have it deleted.',
    intro:
      'This policy explains what Klipito Uploader collects, what it is used for and how to have it deleted. In short: it keeps only what it needs to publish Klipito’s videos, it never sells anything, and it does not track anyone.',
    sections: [
      {
        body: [
          `Klipito Uploader is run by ${operator}, who is the data controller for the personal data described here. You can reach me at ${email}.`,
        ],
        title: 'Who is responsible',
      },
      {
        body: [
          'When a Klipito account is connected and a video is published, the uploader handles:',
          [
            'Basic profile information TikTok shares at sign-in: the account ID, display name and avatar.',
            'The access and refresh tokens TikTok issues, so the uploader can publish to that account.',
            'The videos, covers and captions it uploads, and the publishing status TikTok reports back.',
          ],
          'It never sees a TikTok password, does not read messages, followers or contacts, and uses no advertising cookies or trackers.',
        ],
        title: 'What it collects',
      },
      {
        body: [
          'The clips come from public live streams. Each one credits the creator it comes from and links to the original stream. If you appear in a clip and want it taken down, email me and it will be removed.',
        ],
        title: 'People in the videos',
      },
      {
        body: [
          'The data is used only to connect Klipito’s account, to upload and publish its videos, and to confirm whether a post went through. The legal basis is a legitimate interest in running Klipito’s own accounts (Art. 6(1)(f) GDPR).',
        ],
        title: 'Why',
      },
      {
        body: [
          'Videos, captions and the account details are sent to TikTok, because publishing to TikTok is the point of the tool. TikTok handles them under its own privacy policy: https://www.tiktok.com/legal/privacy-policy',
          'Nothing is sold, rented or shared with advertisers or anyone else, unless the law requires it.',
        ],
        title: 'Who it is shared with',
      },
      {
        body: [
          'Tokens are kept on the Mac that runs Klipito Uploader, and only while the account stays connected. They are deleted when the account is disconnected. Once a video is on TikTok, it is managed in the TikTok account.',
        ],
        title: 'Where it is kept and for how long',
      },
      {
        body: [
          `Access can be revoked at any time in the TikTok settings, under the apps connected to the account. To have anything the uploader holds about you deleted, email ${email} and it will be gone within 30 days.`,
          'Under the GDPR you also have the right to access, correct, restrict, export or object to the processing of your data, and to complain to the Czech data protection authority (Úřad pro ochranu osobních údajů): https://uoou.gov.cz',
        ],
        title: 'Your rights',
      },
      {
        body: [
          'Everything is sent over encrypted connections, and the tokens never leave the machine except to talk to TikTok. No system is perfectly secure, but keeping only what the tool needs keeps the risk small.',
        ],
        title: 'Security',
      },
      {
        body: [
          'These pages are hosted on janblazej.dev, which counts visits with Google Analytics. That is the website, not Klipito Uploader, and nothing from it is linked to a TikTok account.',
        ],
        title: 'This website',
      },
      {
        body: ['If this policy changes, the new version will be posted on this page with a new date.'],
        title: 'Changes',
      },
    ],
    title: 'Privacy Policy',
  },
  scope:
    'Klipito Uploader is an internal tool. Only Klipito uses it, only to publish to its own accounts. It is not offered to the public, and there is nothing to sign up for.',
  slug: 'klipito',
  steps: [
    {
      description:
        'Sign in with TikTok to connect a Klipito account. The uploader asks only for the permissions it needs to publish.',
      title: 'Connect the account',
    },
    {
      description:
        'Before anything goes out, the video and its caption get checked: the final cut, the cover, the caption with its hashtags, and the credit to the creator the clip comes from.',
      title: 'Review the video and caption',
    },
    {
      description:
        'Only then is the video uploaded through TikTok’s official Content Posting API and published to the connected account.',
      title: 'Upload',
    },
  ],
  terms: {
    description:
      'The terms for Klipito Uploader, an internal tool that publishes short videos to Klipito’s own TikTok accounts.',
    intro:
      'Klipito Uploader is an internal tool for preparing and uploading short videos to Klipito’s own TikTok accounts through TikTok’s official Content Posting API. These terms apply to anyone who connects an account to it or uses it.',
    sections: [
      {
        body: [
          `Klipito Uploader is run by ${operator}. “I” and “me” below mean the operator, and “you” means whoever connects an account to the uploader or uses it.`,
        ],
        title: 'Who runs it',
      },
      {
        body: [
          'It connects a TikTok account, lets the video and its caption be checked, and then uploads and publishes it. It only publishes when asked to, and everything goes through TikTok’s official API. It runs on a Mac and is not offered to the public.',
        ],
        title: 'What it does',
      },
      {
        body: [
          'Only Klipito and the people it authorises may use the uploader, and only with accounts that belong to Klipito. Anyone using it must be at least 18 and allowed to use TikTok, and agrees to:',
          [
            'Publish only content Klipito owns or has permission to publish, crediting the creator a clip comes from.',
            'Follow TikTok’s Terms of Service and Community Guidelines: https://www.tiktok.com/legal/terms-of-service and https://www.tiktok.com/community-guidelines',
            'Not use the uploader for spam, for anything illegal, or to infringe anyone else’s rights.',
          ],
        ],
        title: 'Who can use it',
      },
      {
        body: [
          'Klipito Uploader is an independent tool. It is not affiliated with, endorsed or sponsored by TikTok, and using TikTok remains subject to TikTok’s own terms.',
        ],
        title: 'TikTok',
      },
      {
        body: [
          'The uploader is provided “as is”. It may change, pause or stop, and a post can fail for reasons outside my control, such as TikTok’s limits or review. As far as the law allows, I am not liable for indirect damages, lost content or actions TikTok takes on an account.',
        ],
        title: 'Availability and liability',
      },
      {
        body: [
          'Access can be revoked at any time in the TikTok settings. If these terms change, the new version will be posted here with a new date.',
        ],
        title: 'Ending and changes',
      },
      {
        body: [
          'These terms are governed by the laws of the Czech Republic, and disputes go to the Czech courts, without taking away any mandatory protection the law of your country gives you.',
        ],
        title: 'Governing law',
      },
    ],
    title: 'Terms of Service',
  },
  updatedAt: '1 October 2026',
}
