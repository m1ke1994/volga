<script setup>
import PageTemplate from '../components/PageTemplate.vue'
import { usePageData } from '../composables/usePageData'

const { pageData } = usePageData('moose', {
  title: 'Братство лосей',
  subtitle: '',
  heroImage: '/2.jpeg',
  sections: [],
  gallery: [],
})
</script>

<template>
  <PageTemplate v-bind="pageData" />
</template>
