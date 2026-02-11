<script setup>
import PageTemplate from '../components/PageTemplate.vue'
import { usePageData } from '../composables/usePageData'

const { pageData } = usePageData('about', {
  title: 'Обо мне',
  subtitle: '',
  heroImage: '/1.jpeg',
  sections: [],
  gallery: [],
})
</script>

<template>
  <PageTemplate v-bind="pageData" />
</template>
