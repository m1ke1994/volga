<template>
  <section class="profile-page">
    <div class="site-shell">
      <div class="profile-content">
        <ProfileHero :menu-items="menuItems" />
        <AppSection id="services" :title="servicesTitle">
          <ProductGrid />
        </AppSection>
        <AppSection id="schedule" :title="scheduleTitle">
          <ScheduleSection />
        </AppSection>
        <AppSection id="feedback" :title="dayScenarioTitle">
          <FeedbackSection />
        </AppSection>
        <AppSection id="reviews" :title="reviewsTitle">
          <ReviewsSection />
        </AppSection>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'

import { parseJsonField } from '../../api/client'
import { useSection } from '../../composables/useSection'
import AppSection from '../ui/AppSection.vue'
import ProfileHero from './ProfileHero.vue'
import ProductGrid from './ProductGrid.vue'

const ReviewsSection = defineAsyncComponent(() => import('./ReviewsSection.vue'))
const ScheduleSection = defineAsyncComponent(() => import('../ScheduleSection.vue'))
const FeedbackSection = defineAsyncComponent(() => import('../FeedbackSection.vue'))

const { data: headerSection } = useSection('header')
const { data: servicesSection } = useSection('services')
const { data: scheduleSection } = useSection('schedule')
const { data: dayScenarioSection } = useSection('day-scenario')
const { data: reviewsSection } = useSection('reviews')

const defaultMenu = [
  { label: 'Обо мне', href: '/about' },
  { label: 'Братство лосей', href: '/moose' },
  { label: 'Волонтерские программы', href: '/volunteer' },
  { label: 'Беговой клуб', href: '/running-club' },
  { label: 'Расписание занятий', href: '/schedule' },
  { label: 'Статьи', href: '/articles' },
  { label: 'Новости', href: '/news' },
  { label: 'Контакты', href: '/contacts' },
]

const menuItems = computed(() => {
  const links = parseJsonField(headerSection.value?.nav_links_json, defaultMenu)
  if (!Array.isArray(links) || !links.length) {
    return defaultMenu.map((item) => ({ label: item.label, to: item.href }))
  }
  return links.map((item) => ({
    label: item.label || item.title || 'Раздел',
    to: item.href || item.to || '/',
  }))
})

const servicesTitle = computed(() => servicesSection.value?.title || 'Услуги и форматы')
const scheduleTitle = computed(() => scheduleSection.value?.title || 'Расписание занятий')
const dayScenarioTitle = computed(() => dayScenarioSection.value?.title || 'Собери сценарий дня')
const reviewsTitle = computed(() => reviewsSection.value?.title || 'Отзывы')
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
</style>
