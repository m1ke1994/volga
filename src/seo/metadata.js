export const SITE_NAME = 'Novoe Konakovo'
export const SITE_DESCRIPTION =
  'Author project in Konakovo with guided tours, wellness practices, weekly schedule, and direct contact.'
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL ||
  (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173')
).replace(/\/$/, '')
export const DEFAULT_OG_IMAGE = '/avatar.png'

const COMMON_KEYWORDS = [
  'Novoe Konakovo',
  'Konakovo',
  'guided tours',
  'wellness practices',
  'tea ceremony',
  'mindfulness',
  'volunteer programs',
  'running club',
]

const ROUTE_SEO = {
  home: {
    title: 'Novoe Konakovo - Guided Tours and Wellness Practices',
    description:
      'Main page of Novoe Konakovo: services, schedule, feedback, and fast contact for participation.',
    keywords: [...COMMON_KEYWORDS, 'author project', 'mindful retreat'],
    image: '/1.jpeg',
    type: 'website',
  },
  about: {
    title: 'About - Novoe Konakovo',
    description:
      'About the author, project values, and approach to experiential formats in Novoe Konakovo.',
    keywords: [...COMMON_KEYWORDS, 'about', 'project mission'],
    image: '/1.jpeg',
    type: 'profile',
  },
  moose: {
    title: 'Brotherhood of Moose - Novoe Konakovo',
    description:
      'Nature routes and experiences in Brotherhood of Moose: calm pace, safe format, and local stories.',
    keywords: [...COMMON_KEYWORDS, 'brotherhood of moose', 'nature tours'],
    image: '/6.jpeg',
    type: 'article',
  },
  volunteer: {
    title: 'Volunteer Programs - Novoe Konakovo',
    description:
      'Volunteer opportunities in Novoe Konakovo: how to join, current programs, and participation details.',
    keywords: [...COMMON_KEYWORDS, 'volunteer', 'community'],
    image: '/7.jpeg',
    type: 'article',
  },
  'running-club': {
    title: 'Running Club - Novoe Konakovo',
    description:
      'Running club in Konakovo: regular sessions, supportive community, and practice in natural surroundings.',
    keywords: [...COMMON_KEYWORDS, 'running club', 'training sessions'],
    image: '/8.webp',
    type: 'article',
  },
  schedule: {
    title: 'Schedule - Novoe Konakovo',
    description:
      'Updated weekly schedule of practices and meetings in Novoe Konakovo with clear time-based navigation.',
    keywords: [...COMMON_KEYWORDS, 'schedule', 'weekly plan'],
    image: '/9.jpeg',
    type: 'website',
  },
  articles: {
    title: 'Articles - Novoe Konakovo',
    description:
      'Articles about mindfulness, nature rhythm, practical wellbeing, and sustainable community formats.',
    keywords: [...COMMON_KEYWORDS, 'articles', 'wellbeing'],
    image: '/4.jpeg',
    type: 'article',
  },
  news: {
    title: 'News - Novoe Konakovo',
    description:
      'Project news: announcements, updates, and upcoming events in Novoe Konakovo.',
    keywords: [...COMMON_KEYWORDS, 'news', 'announcements'],
    image: '/5.jpeg',
    type: 'website',
  },
  contacts: {
    title: 'Contacts - Novoe Konakovo',
    description:
      'Contacts page with phone, email, address, map, and a request form for Novoe Konakovo.',
    keywords: [...COMMON_KEYWORDS, 'contacts', 'request form'],
    image: '/new_konakovo.png',
    type: 'website',
  },
  privacy: {
    title: 'Privacy Policy - Novoe Konakovo',
    description:
      'Privacy policy of Novoe Konakovo: data collection, processing rules, and user rights.',
    keywords: [...COMMON_KEYWORDS, 'privacy policy', 'personal data'],
    image: '/avatar.png',
    type: 'article',
  },
  terms: {
    title: 'Terms of Use - Novoe Konakovo',
    description:
      'Terms of use for Novoe Konakovo website, including legal conditions and user responsibilities.',
    keywords: [...COMMON_KEYWORDS, 'terms of use', 'legal terms'],
    image: '/avatar.png',
    type: 'article',
  },
}

const fromSlug = (slug) => {
  if (!slug || typeof slug !== 'string') return 'News item'
  const text = slug.replace(/-/g, ' ').trim()
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const resolveSeoByRoute = (route) => {
  const name = route?.name ? String(route.name) : 'home'

  if (name === 'news-detail') {
    const titleFromSlug = fromSlug(route?.params?.slug)
    return {
      title: `${titleFromSlug} - News - ${SITE_NAME}`,
      description: `News detail page for ${titleFromSlug} in ${SITE_NAME}.`,
      keywords: [...COMMON_KEYWORDS, 'news item', titleFromSlug.toLowerCase()],
      image: '/5.jpeg',
      type: 'article',
    }
  }

  return (
    ROUTE_SEO[name] || {
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      keywords: COMMON_KEYWORDS,
      image: DEFAULT_OG_IMAGE,
      type: 'website',
    }
  )
}
