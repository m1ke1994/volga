import { computed } from 'vue'

import { normalizeImageUrl, parseJsonField } from '../api/client'
import { usePage } from './usePage'

export const usePageData = (slug, fallbackData = {}) => {
  const { data, loading, error, refresh } = usePage(slug)

  const pageData = computed(() => {
    const content = parseJsonField(data.value?.content, {})
    const title = data.value?.title || fallbackData.title || ''
    const subtitle = content.subtitle || fallbackData.subtitle || ''

    const heroCandidate = data.value?.cover_image || content.heroImage || fallbackData.heroImage || ''
    const heroImage = normalizeImageUrl(heroCandidate)

    const sections = Array.isArray(content.sections) ? content.sections : (fallbackData.sections || [])
    const galleryRaw = Array.isArray(content.gallery) ? content.gallery : (fallbackData.gallery || [])
    const gallery = galleryRaw.map((image) => normalizeImageUrl(image))

    return {
      ...fallbackData,
      ...content,
      title,
      subtitle,
      heroImage,
      sections,
      gallery,
    }
  })

  return { pageData, loading, error, refresh }
}
