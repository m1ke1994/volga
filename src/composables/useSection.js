import { onMounted, ref, watch } from 'vue'

import { getSection } from '../api/client'

export const useSection = (slugRef, fallback = {}) => {
  const data = ref({ ...fallback })
  const loading = ref(false)
  const error = ref(null)

  const resolveSlug = () => (typeof slugRef === 'string' ? slugRef : slugRef?.value)

  const load = async ({ useCache = true } = {}) => {
    const slug = resolveSlug()
    if (!slug) return
    loading.value = true
    error.value = null

    try {
      const payload = await getSection(slug, { useCache })
      data.value = payload || { ...fallback }
    } catch (err) {
      error.value = err
      data.value = { ...fallback }
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    load()
  })

  if (typeof slugRef !== 'string') {
    watch(slugRef, () => {
      load({ useCache: false })
    })
  }

  return { data, loading, error, refresh: () => load({ useCache: false }) }
}
