<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

import {
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  resolveSeoByRoute,
} from '../seo/metadata'

const route = useRoute()

const normalizeImageUrl = (imagePath) => {
  if (!imagePath) return `${SITE_URL}${DEFAULT_OG_IMAGE}`
  if (/^https?:\/\//i.test(imagePath)) return imagePath
  return `${SITE_URL}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`
}

const absoluteUrl = (path = '/') => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${cleanPath}`
}

const seoHead = computed(() => {
  const seo = resolveSeoByRoute(route)
  const canonical = absoluteUrl(route.path || '/')
  const image = normalizeImageUrl(seo.image)
  const keywords = Array.isArray(seo.keywords) ? seo.keywords.join(', ') : ''
  const description = seo.description || SITE_DESCRIPTION
  const title = seo.title || SITE_NAME
  const ogType = seo.type || 'website'

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl('/avatar.png'),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: '+7-999-000-00-00',
        email: 'hello@novoe-konakovo.ru',
        areaServed: 'RU',
        availableLanguage: ['en', 'ru'],
      },
    ],
    sameAs: ['https://t.me/username'],
  }

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    url: SITE_URL,
    image,
    telephone: '+7-999-000-00-00',
    email: 'hello@novoe-konakovo.ru',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'RU',
      addressRegion: 'Tver Region',
      addressLocality: 'Konakovo',
    },
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'ru-RU',
  }

  return {
    title,
    link: [{ rel: 'canonical', href: canonical }],
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: canonical },
      { property: 'og:type', content: ogType },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:locale', content: 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(organizationJsonLd),
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify(localBusinessJsonLd),
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify(websiteJsonLd),
      },
    ],
  }
})

useHead(seoHead)
</script>

<template></template>
