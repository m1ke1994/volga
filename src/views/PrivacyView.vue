<script setup>
import PageTemplate from '../components/PageTemplate.vue'

const sections = [
  {
    title: 'Политика конфиденциальности',
    text: 'Это заглушка страницы политики. Здесь будет описание того, как мы работаем с персональными данными.',
  },
]
</script>

<template>
  <PageTemplate
    title="Политика конфиденциальности"
    subtitle="Мы бережно относимся к данным и используем их только для улучшения сервиса."
    :sections="sections"
  />
</template>
