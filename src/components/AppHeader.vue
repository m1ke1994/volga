<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BurgerMenuButton from './Profile/BurgerMenuButton.vue'
import ThemeToggle from './ThemeToggle.vue'

const route = useRoute()
const router = useRouter()

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

const isHome = computed(() => route.path === '/')

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

const handleBack = () => {
  if (window.history.length > 1) {
    router.back()
    return
  }
  router.push('/')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('keydown', handleKeydown)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div v-if="!isHome" class="app-header">
    <header class="app-header__bar" :class="{ 'app-header__bar--stuck': isSticky }">
      <div class="app-header__inner">
        <button class="app-header__back" type="button" @click="handleBack" aria-label="Назад">
          ←
        </button>
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

.app-header__bar {
  position: sticky;
  top: 0;
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

.app-header__inner {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-sizing: border-box;
}

.app-header__back {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: none;
  background: color-mix(in srgb, var(--card) 70%, transparent);
  color: var(--text);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
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
  width: min(320px, 90vw);
  background: var(--nav-surface);
  border-left: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(16px);
  transform: translateX(100%);
  transition: transform 250ms ease;
  padding: 24px 20px;
  display: grid;
  gap: 10px;
  z-index: 80;
  box-shadow: 0 24px 50px var(--shadow);
}

.app-header__drawer--open {
  transform: translateX(0);
}

.app-header__drawer-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-strong);
  margin-bottom: 8px;
}

.app-header__drawer-link {
  padding: 10px 12px;
  border-radius: 12px;
  background: transparent;
  border: none;
  color: var(--text);
  font-size: 14px;
  position: relative;
  transition: color 200ms ease;
}

.app-header__drawer-link:hover,
.app-header__drawer-link--active {
  color: var(--text-strong);
}

.app-header__drawer-link::after {
  content: '';
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 6px;
  height: 2px;
  background: var(--primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 220ms ease;
}

.app-header__drawer-link:hover::after,
.app-header__drawer-link--active::after {
  transform: scaleX(1);
}

@media (max-width: 900px) {
  .app-header__links {
    display: none;
  }

  .app-header__burger {
    display: inline-flex;
  }
}
</style>
