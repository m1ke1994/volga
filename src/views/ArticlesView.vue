<script setup>
import PageTemplate from '../components/PageTemplate.vue'
import { usePageData } from '../composables/usePageData'

const { pageData } = usePageData('articles', {
  title: 'Статьи',
  subtitle: '',
  heroImage: '/6.jpeg',
  sections: [],
  gallery: [],
})
</script>

<template>
  <PageTemplate v-bind="pageData" />
</template>
