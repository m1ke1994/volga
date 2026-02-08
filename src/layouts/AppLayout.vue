<script setup>
import { onMounted } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'

const forceScrollTop = () => {
  if (typeof window === 'undefined') return
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

onMounted(() => {
  if (typeof window === 'undefined') return
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search)
  }
  forceScrollTop()
  requestAnimationFrame(forceScrollTop)
  setTimeout(forceScrollTop, 0)
})
</script>

<template>
  <div class="app-layout">
    <AppHeader />
    <main class="app-main">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.app-layout {
  --header-h: 72px;
  background: var(--bg);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-main {
  flex: 1;
  display: block;
}
</style>
