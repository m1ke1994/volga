<template>
    <section class="profile-page">
        <aside class="side-menu" :class="{ 'side-menu--open': isMenuOpen }">
            <div class="side-menu__title">Новое Конаково</div>
            <ul>
                <li v-for="item in menuItems" :key="item">{{ item }}</li>
            </ul>
        </aside>
        <div class="side-menu__overlay" :class="{ 'side-menu__overlay--show': isMenuOpen }" @click="isMenuOpen = false"></div>

        <div class="profile-content">
            <ProfileHero />
            <BurgerMenuButton class="profile-burger" @toggle="toggleMenu" />
            <ProductGrid />
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import ProfileHero from './ProfileHero.vue';
import BurgerMenuButton from './BurgerMenuButton.vue';
import ProductGrid from './ProductGrid.vue';

const isMenuOpen = ref(false);
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const menuItems = [
        '«Братство лосей»',
        '«Волонтерская программа»',
        '«Беговая»',
        '«Беговой клуб»',
        '«Расписание ежедневных практик»',
];
</script>

<style scoped>
.profile-page {
    background: #d9d9d9;
    width: 100%;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
}

.profile-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 18px 40px;
    box-sizing: border-box;
    position: relative;
    z-index: 2;
}

.profile-burger {
    margin-top: 18px;
    margin-left: 6px;
}

.side-menu {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 280px;
    background: #efe4e4;
    box-shadow: 12px 0 30px rgba(0, 0, 0, 0.18);
    transform: translateX(-100%);
    transition: transform 250ms ease;
    padding: 24px 18px;
    box-sizing: border-box;
    z-index: 5;
}

.side-menu--open {
    transform: translateX(0);
}

.side-menu__title {
    font-size: 16px;
    font-weight: 600;
    color: #2b2b2b;
    margin-bottom: 16px;
}

.side-menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 10px;
}

.side-menu li {
    font-size: 13px;
    color: #2b2b2b;
    background: #f7eded;
    border-radius: 8px;
    padding: 10px 12px;
}

.side-menu__overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.18);
    opacity: 0;
    pointer-events: none;
    transition: opacity 200ms ease;
    z-index: 4;
}

.side-menu__overlay--show {
    opacity: 1;
    pointer-events: auto;
}
</style>
