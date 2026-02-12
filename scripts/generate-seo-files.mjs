import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { newsItems } from '../src/data/news.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const SITE_URL = (process.env.VITE_SITE_URL || 'http://localhost:5173').replace(/\/$/, '')

const staticRoutes = [
  '/',
  '/about',
  '/moose',
  '/volunteer',
  '/running-club',
  '/schedule',
  '/articles',
  '/news',
  '/contacts',
  '/privacy',
  '/terms',
]

const dynamicNewsRoutes = Array.isArray(newsItems)
  ? newsItems
      .map((item) => (typeof item?.slug === 'string' ? item.slug.trim() : ''))
      .filter(Boolean)
      .map((slug) => `/news/${slug}`)
  : []

const routes = [...new Set([...staticRoutes, ...dynamicNewsRoutes])]

const today = new Date().toISOString().slice(0, 10)
const normalizePath = (path) => (path.startsWith('/') ? path : `/${path}`)
const toAbsoluteUrl = (path) => `${SITE_URL}${normalizePath(path)}`

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (path) => `  <url>
    <loc>${toAbsoluteUrl(path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${path === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${path === '/' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${toAbsoluteUrl('/sitemap.xml')}
`

const publicDir = resolve(__dirname, '../public')
mkdirSync(publicDir, { recursive: true })
writeFileSync(resolve(publicDir, 'sitemap.xml'), sitemapXml, { encoding: 'utf8' })
writeFileSync(resolve(publicDir, 'robots.txt'), robotsTxt, { encoding: 'utf8' })

console.log(`[seo] Generated sitemap.xml and robots.txt for ${SITE_URL}`)

