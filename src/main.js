import { createApp } from 'vue'
import './assets/css/main.css'
import App from './App.vue'
import router from './router'

const initTheme = () => {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') {
    document.documentElement.dataset.theme = stored
    return
  }
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches
  document.documentElement.dataset.theme = prefersDark ? 'dark' : 'light'
}

initTheme()

createApp(App).use(router).mount('#app')
