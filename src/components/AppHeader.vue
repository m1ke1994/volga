<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import BurgerMenuButton from './Profile/BurgerMenuButton.vue'
import ThemeToggle from './ThemeToggle.vue'

const route = useRoute()
const menuItems = [
  { label: 'Обо мне', to: '/about' },
  { label: 'Братство лосей', to: '/moose' },
  { label: 'Волонтерские программы', to: '/volunteer' },
  { label: 'Беговой клуб', to: '/running-club' },
  { label: 'Расписание занятий', to: '/schedule' },
  { label: 'Статьи', to: '/articles' },
  { label: 'Новости', to: '/news' },
  { label: 'Контакты', to: '/contacts' },
]

const isMenuOpen = ref(false)
const isSticky = ref(false)
const stickySentinel = ref(null)

const isHome = computed(() => route.path === '/')

let observer = null
let useScrollFallback = false

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleScroll = () => {
  isSticky.value = window.scrollY > 8
}

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    closeMenu()
  }
}

const setupStickyObserver = () => {
  if (!('IntersectionObserver' in window) || !stickySentinel.value) {
    useScrollFallback = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      isSticky.value = !entry.isIntersecting
    },
    { rootMargin: '-8px 0px 0px 0px', threshold: 0 }
  )
  observer.observe(stickySentinel.value)
}

onMounted(() => {
  setupStickyObserver()
  if (useScrollFallback) {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
  }
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  if (useScrollFallback) {
    window.removeEventListener('scroll', handleScroll)
  }
  observer?.disconnect()
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div v-if="!isHome" class="app-header">
    <div ref="stickySentinel" class="app-header__sentinel" aria-hidden="true"></div>
    <header class="app-header__bar" :class="{ 'app-header__bar--stuck': isSticky }">
      <div class="app-header__inner">
        <nav class="app-header__links">
          <router-link
            v-for="item in menuItems"
            :key="item.to"
            :to="item.to"
            class="app-header__link"
            active-class="app-header__link--active"
            @click="closeMenu"
          >
            {{ item.label }}
          </router-link>
        </nav>
        <div class="app-header__actions">
          <ThemeToggle icon-only />
          <BurgerMenuButton class="app-header__burger" @toggle="toggleMenu" />
        </div>
      </div>
    </header>

    <div class="app-header__spacer" aria-hidden="true"></div>

    <div class="app-header__overlay" :class="{ 'app-header__overlay--show': isMenuOpen }" @click="closeMenu"></div>
    <aside class="app-header__drawer" :class="{ 'app-header__drawer--open': isMenuOpen }">
      <div class="app-header__drawer-title">Меню</div>
      <router-link
        v-for="item in menuItems"
        :key="item.to"
        :to="item.to"
        class="app-header__drawer-link"
        active-class="app-header__drawer-link--active"
        @click="closeMenu"
      >
        {{ item.label }}
      </router-link>
    </aside>
  </div>
</template>

<style scoped>
.app-header {
  position: relative;
  z-index: 80;
}

.app-header__sentinel {
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
}

.app-header__bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 80;
  background: color-mix(in srgb, var(--nav-surface) 65%, transparent);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
  box-shadow: 0 10px 22px var(--shadow);
}

.app-header__bar--stuck {
  background: color-mix(in srgb, var(--nav-surface) 80%, transparent);
  box-shadow: 0 16px 30px var(--shadow);
}

.app-header__spacer {
  height: var(--header-h, 72px);
}

.app-header__inner {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-sizing: border-box;
}

.app-header__links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-right: auto;
}

.app-header__link {
  font-size: 14px;
  color: var(--text);
  text-decoration: none;
  position: relative;
  padding: 6px 4px;
  transition: color 200ms ease;
}

.app-header__link:hover,
.app-header__link--active {
  color: var(--text-strong);
}

.app-header__link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 2px;
  background: var(--primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 220ms ease;
}

.app-header__link:hover::after,
.app-header__link--active::after {
  transform: scaleX(1);
}

.app-header__actions {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.app-header__burger {
  display: none;
}

.app-header__overlay {
  position: fixed;
  inset: 0;
  background: rgba(16, 13, 10, 0.45);
  backdrop-filter: blur(2px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 200ms ease;
  z-index: 70;
}

.app-header__overlay--show {
  opacity: 1;
  pointer-events: auto;
}

.app-header__drawer {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: min(88vw, 360px);
  background: color-mix(in srgb, var(--nav-surface) 80%, transparent);
  border-left: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(18px);
  transform: translateX(100%);
  transition: transform 250ms ease;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 80;
  box-shadow: 0 24px 50px var(--shadow);
  border-radius: 18px 0 0 18px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  margin: 60px 0;
}

.app-header__drawer--open {
  transform: translateX(0);
}

.app-header__drawer-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-strong);
  margin-bottom: 10px;
  opacity: 0.7;
  letter-spacing: 0.2px;
}

.app-header__drawer-link {
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.06);
  border: none;
  color: var(--text);
  font-size: 14px;
  line-height: 1.3;
  position: relative;
  transition: color 200ms ease, background 200ms ease, transform 200ms ease;
}

.app-header__drawer-link:hover,
.app-header__drawer-link--active {
  color: var(--text-strong);
}

.app-header__drawer-link:active {
  transform: scale(0.99);
}

@media (max-width: 900px) {
  .app-header__links {
    display: none;
  }

  .app-header__inner {
    justify-content: flex-end;
  }

  .app-header__actions {
    margin-left: auto;
  }

  .app-header__burger {
    display: inline-flex;
  }
}
</style>
