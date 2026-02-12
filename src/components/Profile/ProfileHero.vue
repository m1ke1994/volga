<template>
  <div class="hero">
    <div class="hero-nav__overlay" :class="{ 'hero-nav__overlay--show': isMenuOpen }" @click="closeMenu"></div>
    <aside class="hero-nav__drawer" :class="{ 'hero-nav__drawer--open': isMenuOpen }">
      <div class="hero-nav__drawer-head">
        <div class="hero-nav__drawer-title">Меню</div>
        <button class="hero-nav__drawer-close" type="button" aria-label="Закрыть меню" @click="closeMenu">×</button>
      </div>
      <router-link
        v-for="item in menuItems"
        :key="item.to"
        :to="item.to"
        class="hero-nav__drawer-link"
        active-class="hero-nav__drawer-link--active"
        @click="closeMenu"
      >
        {{ item.label }}
      </router-link>
    </aside>

    <div class="hero__top" :style="heroTopStyle">
      <div ref="stickySentinel" class="hero__sentinel" aria-hidden="true"></div>
      <header class="hero-nav" :class="{ 'hero-nav--stuck': isSticky }">
        <div class="hero-nav__inner">
          <nav class="hero-nav__links">
            <router-link
              v-for="item in menuItems"
              :key="item.to"
              :to="item.to"
              class="hero-nav__link"
              active-class="hero-nav__link--active"
            >
              {{ item.label }}
            </router-link>
          </nav>
          <div class="hero-nav__actions">
            <ThemeToggle icon-only />
            <BurgerMenuButton class="hero-nav__burger" @toggle="toggleMenu" />
          </div>
        </div>
      </header>
    </div>
    <div class="hero__bottom">
      <div class="avatar" v-reveal>
        <img
          :src="avatarImage"
          alt="Фото"
          loading="lazy"
          decoding="async"
          width="190"
          height="190"
          class="img-lazy"
          @load="markImageLoaded"
        >
      </div>
      <div class="info" v-reveal.delay="120">
        <div class="info__name">{{ heroName }}</div>
        <div class="info__row">
          <div class="info__about">
            {{ heroAbout }}
          </div>
          <router-link class="info__btn" :to="heroButtonLink">{{ heroButtonText }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

import { normalizeImageUrl } from '../../api/client'
import { useSection } from '../../composables/useSection'
import ThemeToggle from '../ThemeToggle.vue'
import BurgerMenuButton from './BurgerMenuButton.vue'

const { menuItems } = defineProps({
  menuItems: { type: Array, required: true },
})

const { data: heroSection } = useSection('hero')

const isMenuOpen = ref(false)
const isSticky = ref(false)
const stickySentinel = ref(null)

let observer = null
let preloadLink = null
let useScrollFallback = false

const fallbackHeroTop = '/images/8.webp'
const fallbackAvatar = '/images/9.jpeg'

const heroTopImage = computed(() => normalizeImageUrl(heroSection.value?.top_background_image || fallbackHeroTop))
const avatarImage = computed(() => normalizeImageUrl(heroSection.value?.avatar_image || fallbackAvatar))
const heroName = computed(() => heroSection.value?.name || 'Лиза Стручкова')
const heroAbout = computed(
  () =>
    heroSection.value?.about ||
    'Делюсь событиями, тишиной и теплыми практиками в Конаково. Я переехала из Москвы в Конаково и создала здесь пространство для осознанного отдыха.'
)
const heroButtonText = computed(() => heroSection.value?.button_text || 'Связаться со мной')
const heroButtonLink = computed(() => heroSection.value?.button_link || '/contacts')

const heroTopStyle = computed(() => ({
  backgroundImage: `url('${heroTopImage.value}')`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
}))

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const setBodyScrollLock = (locked) => {
  if (typeof document === 'undefined') return
  const overflowValue = locked ? 'hidden' : ''
  document.body.style.overflow = overflowValue
  document.documentElement.style.overflow = overflowValue
}

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    closeMenu()
  }
}

const handleScroll = () => {
  isSticky.value = window.scrollY > 8
}

const markImageLoaded = (event) => {
  event.target.classList.add('is-loaded')
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

const setupHeroPreload = () => {
  if (typeof document === 'undefined' || !heroTopImage.value) return
  preloadLink = document.createElement('link')
  preloadLink.rel = 'preload'
  preloadLink.as = 'image'
  preloadLink.href = heroTopImage.value
  document.head.appendChild(preloadLink)
}

onMounted(() => {
  setupHeroPreload()
  setupStickyObserver()
  if (useScrollFallback) {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
  }
  window.addEventListener('keydown', handleKeydown)
})

watch(isMenuOpen, (opened) => {
  setBodyScrollLock(opened)
})

watch(heroTopImage, (nextImage) => {
  if (typeof document === 'undefined' || !nextImage) return
  preloadLink?.remove()
  preloadLink = document.createElement('link')
  preloadLink.rel = 'preload'
  preloadLink.as = 'image'
  preloadLink.href = nextImage
  document.head.appendChild(preloadLink)
})

onUnmounted(() => {
  observer?.disconnect()
  if (useScrollFallback) {
    window.removeEventListener('scroll', handleScroll)
  }
  window.removeEventListener('keydown', handleKeydown)
  preloadLink?.remove()
  setBodyScrollLock(false)
})
</script>

<style scoped>
.hero {
  position: relative;
}

.hero__sentinel {
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
}

.hero-nav {
  position: sticky;
  top: 16px;
  z-index: 60;
  width: min(1100px, calc(100% - 32px));
  margin: 16px auto 0;
  border-radius: 12px;
  background: color-mix(in srgb, var(--nav-surface) 60%, transparent);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
  box-shadow: 0 12px 26px var(--shadow);
  transition: box-shadow 200ms ease, background 200ms ease, transform 200ms ease;
}

.hero-nav--stuck {
  background: color-mix(in srgb, var(--nav-surface) 75%, transparent);
  box-shadow: 0 18px 36px var(--shadow);
}

.hero-nav__inner {
  padding: 10px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  box-sizing: border-box;
}

.hero-nav__links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.hero-nav__link {
  font-size: 14px;
  color: var(--text);
  padding: 6px 6px;
  border-radius: 0;
  background: transparent;
  border: none;
  position: relative;
  transition: color 200ms ease;
}

.hero-nav__link:hover {
  color: var(--text-strong);
}

.hero-nav__link--active {
  color: var(--text-strong);
}

.hero-nav__link::after {
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

.hero-nav__link:hover::after,
.hero-nav__link--active::after {
  transform: scaleX(1);
}

.hero-nav__actions {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.hero-nav__burger {
  display: none;
}

.hero-nav__overlay {
  position: fixed;
  inset: 0;
  background: rgba(16, 13, 10, 0.54);
  backdrop-filter: blur(3px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 200ms ease;
  z-index: 70;
}

.hero-nav__overlay--show {
  opacity: 1;
  pointer-events: auto;
}

.hero-nav__drawer {
  position: fixed;
  top: 12px;
  left: 12px;
  right: 12px;
  width: auto;
  max-height: calc(100dvh - 24px);
  background: color-mix(in srgb, var(--nav-surface) 86%, transparent);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(18px);
  transform: translateY(-10px) scale(0.98);
  opacity: 0;
  transition: transform 240ms ease, opacity 240ms ease;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 80;
  box-shadow: 0 24px 50px var(--shadow);
  border-radius: 18px;
  overflow-y: auto;
  margin: 0;
  pointer-events: none;
}

.hero-nav__drawer--open {
  transform: translateY(0) scale(1);
  opacity: 1;
  pointer-events: auto;
}

.hero-nav__drawer-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.hero-nav__drawer-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-strong);
  margin-bottom: 10px;
  opacity: 0.7;
  letter-spacing: 0.2px;
}

.hero-nav__drawer-close {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: color-mix(in srgb, var(--card) 76%, transparent);
  color: var(--text);
  font-size: 20px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.hero-nav__drawer-link {
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

.hero-nav__drawer-link:hover {
  color: var(--text-strong);
}

.hero-nav__drawer-link--active {
  color: var(--text-strong);
}

.hero-nav__drawer-link:active {
  transform: scale(0.99);
}

.hero__top {
  position: relative;
  height: 420px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0 16px;
  box-sizing: border-box;
  overflow: hidden;
}

.hero__top::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(12, 9, 7, 0.65), rgba(12, 9, 7, 0.1));
}

.hero__top > * {
  position: relative;
  z-index: 1;
}

.hero__title {
  font-size: 28px;
  color: #f7f2ea;
  letter-spacing: 0.6px;
  background: rgba(36, 30, 24, 0.45);
  padding: 10px 22px;
  border-radius: 999px;
  text-align: center;
}

.hero__bottom {
  background: var(--bg-elevated);
  padding: 72px 32px 32px;
  position: relative;
  box-sizing: border-box;
}

.avatar {
  position: absolute;
  top: 0;
  left: 140px;
  width: 190px;
  height: 190px;
  border-radius: 50%;
  background: var(--card);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 24px 40px var(--shadow);
  border: 3px solid rgba(255, 255, 255, 0.75);
  transform: translateY(-50%);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.info {
  margin-left: 360px;
  padding-top: 8px;
}

.info__name {
  font-size: 26px;
  color: var(--text-strong);
  margin-bottom: 12px;
  font-weight: 600;
  letter-spacing: 0.2px;
}

.info__row {
  display: grid;
  gap: 14px;
}

.info__about {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.6;
  white-space: pre-line;
}

.info__btn {
  background: linear-gradient(135deg, #c8b89f, #b7a58c);
  border: none;
  padding: 10px 18px;
  font-size: 13px;
  color: #2b2520;
  cursor: pointer;
  border-radius: 999px;
  box-shadow: 0 8px 16px var(--shadow);
  transition: transform 200ms ease, box-shadow 200ms ease;
  justify-self: flex-start;
}

.info__btn:hover {
  transform: translateY(-1px) scale(1.02);
  box-shadow: 0 10px 18px var(--shadow);
}

@media (max-width: 1100px) {
  .avatar {
    left: 90px;
    width: 200px;
    height: 200px;
  }

  .info {
    margin-left: 300px;
  }
}

@media (max-width: 768px) {
  .hero-nav {
    width: calc(100% - 24px);
  }

  .hero-nav__inner {
    justify-content: flex-end;
  }

  .hero-nav__actions {
    margin-left: auto;
  }

  .hero-nav__links {
    display: none;
  }

  .hero-nav__burger {
    display: inline-flex;
  }

  .hero-nav__drawer {
    top: 10px;
    left: 10px;
    right: 10px;
    max-height: calc(100dvh - 20px);
  }
}

@media (max-width: 820px) {
  .hero__bottom {
    padding: 130px 20px 28px;
  }

  .avatar {
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .info {
    margin-left: 0;
    text-align: center;
  }

  .info__btn {
    justify-self: center;
  }
}

@media (max-width: 520px) {
  .avatar {
    left: calc(50% - 54px);
  }

  .hero__top {
    background-position: calc(50% - clamp(8px, 3vw, 16px)) center;
  }
}
</style>

