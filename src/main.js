import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import './assets/css/main.css'
import App from './App.vue'
import router from './router'
import { revealDirective } from './composables/useRevealOnScroll'

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}


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

const app = createApp(App)
const head = createHead()

app.use(head).use(router).directive('reveal', revealDirective).mount('#app')
