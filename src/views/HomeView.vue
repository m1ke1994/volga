<script setup>
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
import ProfileHero from "../components/Profile/ProfileHero.vue";
import ProductGrid from "../components/Profile/ProductGrid.vue";
import ScheduleSection from "../components/ScheduleSection.vue";
import FeedbackSection from "../components/FeedbackSection.vue";
import ReviewsSection from "../components/Profile/ReviewsSection.vue";

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
</script>

<template>
  <div class="profile-page">
    <AppHeader />
    <section class="site-shell">
      <div class="profile-content">
        <ProfileHero :menu-items="menuItems" />

        <section id="services" class="app-section" v-reveal>
          <div class="app-section__inner">
            <h2 class="app-section__title">Услуги и форматы</h2>
            <div class="app-section__content">
              <ProductGrid />
            </div>
          </div>
        </section>

        <section id="schedule" class="app-section" v-reveal>
          <div class="app-section__inner">
            <h2 class="app-section__title">Расписание занятий</h2>
            <div class="app-section__content">
              <ScheduleSection />
            </div>
          </div>
        </section>

        <section id="feedback" class="app-section" v-reveal>
          <div class="app-section__inner">
            <h2 class="app-section__title">Собери сценарий дня</h2>
            <div class="app-section__content">
              <FeedbackSection />
            </div>
          </div>
        </section>

        <section id="reviews" class="app-section" v-reveal>
          <div class="app-section__inner">
            <h2 class="app-section__title">Отзывы</h2>
            <div class="app-section__content">
              <ReviewsSection />
            </div>
          </div>
        </section>
      </div>
    </section>
    <AppFooter />
  </div>
</template>

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

.app-section {
  width: 100%;
  padding: var(--section-padding, 64px) 0;
  background: var(--bg);
  scroll-margin-top: var(--header-offset, 120px);
}

.app-section__inner {
  max-width: var(--container-max, 1200px);
  margin: 0 auto;
  padding: 0 28px;
  box-sizing: border-box;
}

.app-section__title {
  margin: 0 0 28px;
  text-align: center;
  font-size: 28px;
  color: var(--text);
}

.app-section__content {
  width: 100%;
}

@media (max-width: 720px) {
  .app-section {
    padding: var(--section-padding-mobile, 40px) 0;
  }

  .app-section__inner {
    padding: 0 18px;
  }

  .app-section__title {
    font-size: 24px;
  }
}
</style>

