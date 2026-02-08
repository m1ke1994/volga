<template>
    <section class="profile-page">
        <header class="site-header" :class="{ 'site-header--stuck': isSticky }">
            <div class="site-header__inner">
                <div class="site-header__title">Новое Конаково</div>
                <div class="site-header__actions">
                    <ThemeToggle />
                    <BurgerMenuButton class="site-header__burger" @toggle="toggleMenu" />
                </div>
            </div>
            <SectionScrollBar :items="scrollItems" />
        </header>

        <aside class="side-menu" :class="{ 'side-menu--open': isMenuOpen }">
            <div class="side-menu__title">Новое Конаково</div>
            <ul>
                <li v-for="item in menuItems" :key="item.to">
                    <router-link
                        class="side-menu__link"
                        active-class="side-menu__link--active"
                        :to="item.to"
                        @click="closeMenu"
                    >
                        {{ item.label }}
                    </router-link>
                </li>
            </ul>
        </aside>
        <div class="side-menu__overlay" :class="{ 'side-menu__overlay--show': isMenuOpen }" @click="closeMenu"></div>

        <div class="site-shell">
            <div class="profile-content">
                <ProfileHero />
                <AppSection id="services" title="Услуги и форматы">
                    <ProductGrid />
                </AppSection>
                <AppSection id="schedule" title="Расписание занятий">
                    <ScheduleSection />
                </AppSection>
                <AppSection id="reviews" title="Отзывы">
                    <ReviewsSection />
                </AppSection>
                <AppSection id="feedback" title="Обратная связь">
                    <FeedbackSection />
                </AppSection>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import AppSection from '../ui/AppSection.vue';
import SectionScrollBar from '../SectionScrollBar.vue';
import ThemeToggle from '../ThemeToggle.vue';
import ProfileHero from './ProfileHero.vue';
import BurgerMenuButton from './BurgerMenuButton.vue';
import ProductGrid from './ProductGrid.vue';
import ReviewsSection from './ReviewsSection.vue';
import ScheduleSection from '../ScheduleSection.vue';
import FeedbackSection from '../FeedbackSection.vue';

const isMenuOpen = ref(false);
const isSticky = ref(false);
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};
const closeMenu = () => {
    isMenuOpen.value = false;
};

const menuItems = [
    { label: 'Обо мне', to: '/about' },
    { label: 'Братство Лосей', to: '/brotherhood' },
    { label: 'Волонтерские программы', to: '/volunteer' },
    { label: 'Беговой Клуб', to: '/running-club' },
    { label: 'Расписание занятий', to: '/schedule' },
    { label: 'Статьи', to: '/articles' },
    { label: 'Новости', to: '/news' },
    { label: 'Контакты', to: '/contacts' },
];

const scrollItems = [
    { id: 'services', label: 'Услуги' },
    { id: 'schedule', label: 'Расписание' },
    { id: 'reviews', label: 'Отзывы' },
    { id: 'feedback', label: 'Обратная связь' },
];

const handleScroll = () => {
    isSticky.value = window.scrollY > 8;
};

const handleKeydown = (event) => {
    if (event.key === 'Escape') {
        closeMenu();
    }
};

const handleReveal = () => {
    const elements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
        elements.forEach((el) => el.classList.add('is-visible'));
        return;
    }
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        },
        { threshold: 0.15 }
    );
    elements.forEach((el) => observer.observe(el));
};

onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleReveal();
    handleScroll();
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
    window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.profile-page {
    background: var(--bg);
    width: 100%;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
    padding: 0 0 60px;
    box-sizing: border-box;
    --header-offset: 124px;
}

.site-header {
    position: sticky;
    top: 0;
    z-index: 50;
    background: var(--bg);
    transition: box-shadow 200ms ease, background 200ms ease;
}

.site-header--stuck {
    box-shadow: 0 10px 20px var(--shadow);
}

.site-header__inner {
    max-width: var(--container-max);
    margin: 0 auto;
    padding: 14px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
}

.site-header__title {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-strong);
    letter-spacing: 0.4px;
}

.site-header__actions {
    display: inline-flex;
    align-items: center;
    gap: 10px;
}

.site-shell {
    width: 100%;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    background: var(--bg);
}

.profile-content {
    padding: 0;
    box-sizing: border-box;
}

.side-menu {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 280px;
    background: var(--bg-elevated);
    box-shadow: 12px 0 30px var(--shadow);
    transform: translateX(-100%);
    transition: transform 250ms ease;
    padding: 24px 18px;
    box-sizing: border-box;
    z-index: 60;
    backdrop-filter: blur(14px);
}

.side-menu--open {
    transform: translateX(0);
}

.side-menu__title {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-strong);
    margin-bottom: 16px;
}

.side-menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 10px;
}

.side-menu__link {
    display: block;
    font-size: 13px;
    color: var(--text);
    background: var(--card);
    border-radius: 12px;
    padding: 10px 12px;
    border: 1px solid var(--border);
    text-decoration: none;
    transition: transform 200ms ease, box-shadow 200ms ease, background 200ms ease;
}

.side-menu__link:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 20px var(--shadow);
}

.side-menu__link--active {
    background: var(--primary-soft);
    border-color: var(--primary);
}

.side-menu__overlay {
    position: fixed;
    inset: 0;
    background: rgba(20, 16, 12, 0.35);
    opacity: 0;
    pointer-events: none;
    transition: opacity 200ms ease;
    z-index: 55;
}

.side-menu__overlay--show {
    opacity: 1;
    pointer-events: auto;
}

@media (max-width: 900px) {
    .site-header__inner {
        padding: 12px 18px;
    }
}

@media (max-width: 600px) {
    .site-header__inner {
        padding: 10px 14px;
    }
}
</style>
