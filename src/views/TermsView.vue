<script setup>
import PageTemplate from '../components/PageTemplate.vue'

const sections = [
  {
    title: 'Условия использования',
    text: 'Это заглушка страницы условий. Здесь появятся правила сервиса и общие положения.',
  },
]
</script>

<template>
  <PageTemplate
    title="Условия использования"
    subtitle="Пока это черновик. Мы добавим финальные условия позже."
    :sections="sections"
  />
</template>
