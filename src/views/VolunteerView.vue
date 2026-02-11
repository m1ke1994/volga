<script setup>
import PageTemplate from '../components/PageTemplate.vue'
import { usePageData } from '../composables/usePageData'

const { pageData } = usePageData('volunteering', {
  title: 'Волонтерские программы',
  subtitle: '',
  heroImage: '/3.jpeg',
  sections: [],
  gallery: [],
})
</script>

<template>
  <PageTemplate v-bind="pageData" />
</template>
