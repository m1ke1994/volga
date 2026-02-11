<script setup>
import PageTemplate from '../components/PageTemplate.vue'
import ContactsMap from '../components/ContactsMap.vue'
import { usePageData } from '../composables/usePageData'

const { pageData } = usePageData('contacts', {
  title: 'Контакты',
  subtitle: '',
  heroImage: '/1.jpeg',
  sections: [],
  gallery: [],
})
</script>

<template>
  <PageTemplate v-bind="pageData" />
  <ContactsMap />
</template>
