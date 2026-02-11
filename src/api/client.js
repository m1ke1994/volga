const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/$/, '')

const responseCache = new Map()

const isAbsoluteUrl = (value) => /^https?:\/\//i.test(value || '')

export const buildApiUrl = (path) => `${apiBaseUrl}${path.startsWith('/') ? path : `/${path}`}`

export const normalizeImageUrl = (value) => {
  if (!value) return ''
  if (isAbsoluteUrl(value)) return value

  if (value.startsWith('/media/') || value.startsWith('media/')) {
    return buildApiUrl(value)
  }

  if (value.startsWith('/')) {
    return value
  }

  return buildApiUrl(value)
}

export const parseJsonField = (value, fallback = []) => {
  if (value === null || value === undefined || value === '') return fallback
  if (Array.isArray(value) || (typeof value === 'object' && value !== null)) return value
  if (typeof value !== 'string') return fallback
  try {
    const parsed = JSON.parse(value)
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

const requestJson = async (path, { useCache = true } = {}) => {
  const url = buildApiUrl(path)
  if (useCache && responseCache.has(url)) {
    return responseCache.get(url)
  }

  const promise = fetch(url).then(async (response) => {
    if (!response.ok) {
      const text = await response.text()
      throw new Error(`HTTP ${response.status}: ${text || 'Ошибка запроса'}`)
    }
    return response.json()
  })

  if (useCache) {
    responseCache.set(url, promise)
  }

  try {
    return await promise
  } catch (error) {
    responseCache.delete(url)
    throw error
  }
}

export const getSection = (slug, options = {}) => requestJson(`/api/sections/${slug}/`, options)

export const getPage = (slug, options = {}) => requestJson(`/api/pages/${slug}/`, options)

export const API_BASE_URL = apiBaseUrl
