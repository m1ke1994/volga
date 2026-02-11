<script setup>
import PageTemplate from '../components/PageTemplate.vue'
import { usePageData } from '../composables/usePageData'

const { pageData } = usePageData('running-club', {
  title: 'Беговой клуб',
  subtitle: '',
  heroImage: '/5.jpeg',
  sections: [],
  gallery: [],
})
</script>

<template>
  <PageTemplate v-bind="pageData" />
</template>
