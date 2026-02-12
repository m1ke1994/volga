import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { newsItems } from '../src/data/news.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const SITE_URL = (process.env.VITE_SITE_URL || 'http://localhost').replace(/\/$/, '')
const DIST_DIR = resolve(__dirname, '../dist')
const DIST_INDEX = resolve(DIST_DIR, 'index.html')

const DEFAULT_IMAGE = `${SITE_URL}/images/avatar.png`

const staticPages = [
  {
    path: '/',
    title: 'Novoe Konakovo - Guided Tours and Wellness Practices',
    description: 'Main page of Novoe Konakovo: services, schedule, feedback, and contact.',
    keywords: 'Novoe Konakovo, Konakovo, guided tours, wellness practices, schedule',
    type: 'website',
    image: `${SITE_URL}/images/1.jpeg`,
  },
  {
    path: '/about',
    title: 'About - Novoe Konakovo',
    description: 'About the author, values, and approach of Novoe Konakovo.',
    keywords: 'Novoe Konakovo, about, values, project mission',
    type: 'profile',
    image: `${SITE_URL}/images/1.jpeg`,
  },
  {
    path: '/moose',
    title: 'Brotherhood of Moose - Novoe Konakovo',
    description: 'Nature experiences and guided routes in Brotherhood of Moose.',
    keywords: 'Novoe Konakovo, brotherhood of moose, nature tours',
    type: 'article',
    image: `${SITE_URL}/images/6.jpeg`,
  },
  {
    path: '/volunteer',
    title: 'Volunteer Programs - Novoe Konakovo',
    description: 'Volunteer opportunities and participation details.',
    keywords: 'Novoe Konakovo, volunteer programs, community',
    type: 'article',
    image: `${SITE_URL}/images/7.jpeg`,
  },
  {
    path: '/running-club',
    title: 'Running Club - Novoe Konakovo',
    description: 'Regular running sessions and community in Konakovo.',
    keywords: 'Novoe Konakovo, running club, Konakovo',
    type: 'article',
    image: `${SITE_URL}/images/8.webp`,
  },
  {
    path: '/schedule',
    title: 'Schedule - Novoe Konakovo',
    description: 'Updated schedule of practices and events.',
    keywords: 'Novoe Konakovo, schedule, practices',
    type: 'website',
    image: `${SITE_URL}/images/9.jpeg`,
  },
  {
    path: '/articles',
    title: 'Articles - Novoe Konakovo',
    description: 'Articles about mindfulness, rhythm, and wellbeing.',
    keywords: 'Novoe Konakovo, articles, mindfulness',
    type: 'article',
    image: `${SITE_URL}/images/4.jpeg`,
  },
  {
    path: '/news',
    title: 'News - Novoe Konakovo',
    description: 'Announcements and updates from Novoe Konakovo.',
    keywords: 'Novoe Konakovo, news, announcements',
    type: 'website',
    image: `${SITE_URL}/images/5.jpeg`,
  },
  {
    path: '/contacts',
    title: 'Contacts - Novoe Konakovo',
    description: 'Contact details, map, and request form.',
    keywords: 'Novoe Konakovo, contacts, request form',
    type: 'website',
    image: `${SITE_URL}/images/new_konakovo.png`,
  },
  {
    path: '/privacy',
    title: 'Privacy Policy - Novoe Konakovo',
    description: 'Privacy and personal data processing policy.',
    keywords: 'Novoe Konakovo, privacy policy',
    type: 'article',
    image: DEFAULT_IMAGE,
  },
  {
    path: '/terms',
    title: 'Terms of Use - Novoe Konakovo',
    description: 'Terms and conditions for using the website.',
    keywords: 'Novoe Konakovo, terms of use',
    type: 'article',
    image: DEFAULT_IMAGE,
  },
]

const newsPages = Array.isArray(newsItems)
  ? newsItems
      .map((item) => (typeof item?.slug === 'string' ? item.slug.trim() : ''))
      .filter(Boolean)
      .map((slug) => ({
        path: `/news/${slug}`,
        title: `${slug.replace(/-/g, ' ')} - News - Novoe Konakovo`,
        description: `News detail page for ${slug.replace(/-/g, ' ')} in Novoe Konakovo.`,
        keywords: 'Novoe Konakovo, news item',
        type: 'article',
        image: `${SITE_URL}/images/5.jpeg`,
      }))
  : []

const pages = [...staticPages, ...newsPages]

const setOrInsertMeta = (html, selectorPattern, tag) => {
  if (selectorPattern.test(html)) {
    return html.replace(selectorPattern, tag)
  }
  return html.replace('</head>', `  ${tag}\n</head>`)
}

const applyMeta = (htmlTemplate, page) => {
  const canonical = `${SITE_URL}${page.path}`
  let html = htmlTemplate

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${page.title}</title>`)

  html = setOrInsertMeta(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${page.description}" />`
  )
  html = setOrInsertMeta(
    html,
    /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="keywords" content="${page.keywords}" />`
  )
  html = setOrInsertMeta(
    html,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${page.title}" />`
  )
  html = setOrInsertMeta(
    html,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${page.description}" />`
  )
  html = setOrInsertMeta(
    html,
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${page.image}" />`
  )
  html = setOrInsertMeta(
    html,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${canonical}" />`
  )
  html = setOrInsertMeta(
    html,
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:type" content="${page.type}" />`
  )
  html = setOrInsertMeta(
    html,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${page.title}" />`
  )
  html = setOrInsertMeta(
    html,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${page.description}" />`
  )
  html = setOrInsertMeta(
    html,
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${page.image}" />`
  )
  html = setOrInsertMeta(
    html,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${canonical}" />`
  )

  return html
}

const htmlTemplate = readFileSync(DIST_INDEX, 'utf8')

for (const page of pages) {
  const rendered = applyMeta(htmlTemplate, page)
  const targetDir = page.path === '/' ? DIST_DIR : resolve(DIST_DIR, page.path.slice(1))
  mkdirSync(targetDir, { recursive: true })
  writeFileSync(resolve(targetDir, 'index.html'), rendered, 'utf8')
}

console.log(`[seo] Prerendered ${pages.length} routes into ${DIST_DIR}`)


