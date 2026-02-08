<template>
    <div class="hero reveal">

        <div class="hero-nav__overlay" :class="{ 'hero-nav__overlay--show': isMenuOpen }" @click="closeMenu"></div>
        <aside class="hero-nav__drawer" :class="{ 'hero-nav__drawer--open': isMenuOpen }">
            <div class="hero-nav__drawer-title">Меню</div>
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

        <div class="hero__top">
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
            <div class="avatar">
                <img src="/avatar.png" alt="ФОТО">
            </div>
            <div class="info">
                <div class="info__name">Елизавета Стручкова</div>
                <div class="info__row">
                    <div class="info__about">Делюсь событиями, тишиной и теплыми практиками в Конаково. Я переехала из Москвы в Конаково и создала здесь пространство для осознанного отдыха, живых встреч и глубокого контакта с природой. Это место про замедление, внимание к себе и теплые человеческие связи — вдали от суеты и спешки. Я провожу экскурсии по природным местам, утренние практики, чайные церемонии и мастер-классы, объединяя их в цельный опыт. Для гостей Конаково становлюсь проводником, помогаю собрать день или путешествие под ваш ритм и интересы. А для местных создаю сообщество, где есть движение, поддержка, общение и ощущение «своего места».</div>
                    <button class="info__btn">Связаться со мной</button>
                </div>
            </div>
        </div>
    </div>
   
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import BurgerMenuButton from './BurgerMenuButton.vue'
import ThemeToggle from '../ThemeToggle.vue'

defineProps({
    menuItems: { type: Array, required: true },
})

const isMenuOpen = ref(false)
const isSticky = ref(false)

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

<style scoped>
.hero {
    position: relative;
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
    background: rgba(16, 13, 10, 0.45);
    backdrop-filter: blur(2px);
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

.hero-nav__drawer--open {
    transform: translateX(0);
}

.hero-nav__drawer-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-strong);
    margin-bottom: 8px;
}

.hero-nav__drawer-link {
    padding: 10px 12px;
    border-radius: 12px;
    background: transparent;
    border: none;
    color: var(--text);
    font-size: 14px;
    position: relative;
    transition: color 200ms ease;
}

.hero-nav__drawer-link:hover {
    color: var(--text-strong);
}

.hero-nav__drawer-link--active {
    color: var(--text-strong);
}

.hero-nav__drawer-link::after {
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

.hero-nav__drawer-link:hover::after,
.hero-nav__drawer-link--active::after {
    transform: scaleX(1);
}

.hero__top {
    position: relative;
    background: url('/konakovo_lenta.JPG') center/cover no-repeat;
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
    top: -82px;
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
        width: 170px;
        height: 170px;
    }

    .info {
        margin-left: 300px;
    }
}

@media (max-width: 768px) {
    .hero-nav {
        width: calc(100% - 24px);
    }

    .hero-nav__links {
        display: none;
    }

    .hero-nav__burger {
        display: inline-flex;
    }
}

@media (max-width: 820px) {
    .hero__bottom {
        padding: 130px 20px 28px;
    }

    .avatar {
        left: 50%;
        transform: translateX(-50%);
    }

    .info {
        margin-left: 0;
        text-align: center;
    }

    .info__btn {
        justify-self: center;
    }
}
</style>
