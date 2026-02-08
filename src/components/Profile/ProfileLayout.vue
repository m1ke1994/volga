<template>
    <section class="profile-page">
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
                <ProfileHero @toggle-menu="toggleMenu" />
                <ProductGrid />
                <ReviewsSection />
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import ProfileHero from './ProfileHero.vue';
import ProductGrid from './ProductGrid.vue';
import ReviewsSection from './ReviewsSection.vue';

const isMenuOpen = ref(false);
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
    handleReveal();
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.profile-page {
    background: #ffffff;
    width: 100%;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
    padding: 0 0 60px;
    box-sizing: border-box;
}

.site-shell {
    background: #f6efe5;
    width: 100%;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
}

.profile-content {
    padding: 28px 32px 48px;
    box-sizing: border-box;
}

.side-menu {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 280px;
    background: rgba(245, 236, 224, 0.98);
    box-shadow: 12px 0 30px rgba(0, 0, 0, 0.18);
    transform: translateX(-100%);
    transition: transform 250ms ease;
    padding: 24px 18px;
    box-sizing: border-box;
    z-index: 10;
    backdrop-filter: blur(14px);
}

.side-menu--open {
    transform: translateX(0);
}

.side-menu__title {
    font-size: 16px;
    font-weight: 600;
    color: #2b2520;
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
    color: #2b2520;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 12px;
    padding: 10px 12px;
    border: 1px solid rgba(255, 255, 255, 0.6);
    text-decoration: none;
    transition: transform 200ms ease, box-shadow 200ms ease, background 200ms ease;
}

.side-menu__link:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 20px rgba(20, 16, 12, 0.12);
}

.side-menu__link--active {
    background: rgba(200, 169, 107, 0.28);
    border-color: rgba(200, 169, 107, 0.5);
}

.side-menu__overlay {
    position: fixed;
    inset: 0;
    background: rgba(20, 16, 12, 0.25);
    opacity: 0;
    pointer-events: none;
    transition: opacity 200ms ease;
    z-index: 9;
}

.side-menu__overlay--show {
    opacity: 1;
    pointer-events: auto;
}

@media (max-width: 900px) {
    .profile-content {
        padding: 24px 20px 40px;
    }
}

@media (max-width: 600px) {
    .profile-content {
        padding: 20px 16px 36px;
    }
}
</style>
