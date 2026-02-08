<script setup>
import { onMounted } from 'vue'
import AppHeader from '../components/AppHeader.vue'

onMounted(() => {
  if (typeof window === 'undefined') return
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search)
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
})
</script>

<template>
  <div class="app-layout">
    <AppHeader />
    <router-view />
  </div>
</template>

<style scoped>
.app-layout {
  --header-h: 72px;
  background: var(--bg);
  min-height: 100vh;
}
</style>
