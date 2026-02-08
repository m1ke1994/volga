<template>
    <section class="profile-page">
        <div class="site-shell">
            <div class="profile-content">
                <ProfileHero :menu-items="menuItems" />
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
import { onMounted, onUnmounted } from 'vue';
import AppSection from '../ui/AppSection.vue';
import ProfileHero from './ProfileHero.vue';
import ProductGrid from './ProductGrid.vue';
import ReviewsSection from './ReviewsSection.vue';
import ScheduleSection from '../ScheduleSection.vue';
import FeedbackSection from '../FeedbackSection.vue';

const menuItems = [
    { label: 'Обо мне', to: '/about' },
    { label: 'Братство лосей', to: '/moose' },
    { label: 'Волонтерские программы', to: '/volunteer' },
    { label: 'Беговой клуб', to: '/running-club' },
    { label: 'Расписание занятий', to: '/schedule' },
    { label: 'Статьи', to: '/articles' },
    { label: 'Новости', to: '/news' },
    { label: 'Контакты', to: '/contacts' },
];


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
    handleReveal();
});

onUnmounted(() => {
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

@media (max-width: 900px) {
}

@media (max-width: 600px) {
}
</style>
