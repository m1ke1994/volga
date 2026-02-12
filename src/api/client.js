import api from '../services/api'

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '')
const isAbsoluteUrl = (value) => /^https?:\/\//i.test(value || '')

export const buildApiUrl = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  if (normalizedPath.startsWith('/api/')) return normalizedPath
  return `${apiBaseUrl}${normalizedPath}`
}

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

const requestJson = async (path, _options = {}) => {
  void _options
  const normalizedPath = path.startsWith('/api/') ? path.slice('/api'.length) : path
  const response = await api.get(normalizedPath)
  return response.data
}

export const getSection = (slug, options = {}) => requestJson(`/api/sections/${slug}/`, options)

export const getPage = (slug, options = {}) => requestJson(`/api/pages/${slug}/`, options)

export const API_BASE_URL = apiBaseUrl
