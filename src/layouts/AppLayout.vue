<script setup>
import AppHeader from '../components/AppHeader.vue'
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
