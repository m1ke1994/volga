<script setup>
import { computed } from "vue";
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
import ProfileHero from "../components/Profile/ProfileHero.vue";
import ProductGrid from "../components/Profile/ProductGrid.vue";
import ScheduleSection from "../components/ScheduleSection.vue";
import FeedbackSection from "../components/FeedbackSection.vue";
import ReviewsSection from "../components/Profile/ReviewsSection.vue";
import ArticleCard from "../components/ArticleCard.vue";
import { materials } from "../data/articles";

const menuItems = [
  { label: "Обо мне", to: "/about" },
  { label: "Братство Лосей", to: "/moose" },
  { label: "Волонтерские программы", to: "/volunteer" },
  { label: "Беговой клуб", to: "/running-club" },
  { label: "Статьи / Видео", to: "/articles" },
  { label: "Новости", to: "/news" },
  { label: "Расписание", to: "/schedule" },
  { label: "Контакты", to: "/contacts" },
];

const latestMaterials = computed(() =>
  [...materials]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4)
);
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

        <section id="articles" class="app-section" v-reveal>
          <div class="app-section__inner">
            <div class="articles-home__head">
              <h2 class="app-section__title articles-home__title">Статьи</h2>
              <router-link class="articles-home__link" to="/articles">Смотреть все материалы</router-link>
            </div>

            <div class="articles-home__grid">
              <ArticleCard
                v-for="item in latestMaterials"
                :key="item.id"
                :item="item"
                :show-description="false"
              />
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

.articles-home__head {
  display: grid;
  gap: 12px;
  justify-items: center;
}

.articles-home__title {
  margin-bottom: 0;
}

.articles-home__link {
  padding: 10px 16px;
  border-radius: 999px;
  font-size: 13px;
  border: 1px solid var(--border);
  background: var(--primary-soft);
  color: var(--text-strong);
  transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
}

.articles-home__link:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 18px var(--shadow);
  background: color-mix(in srgb, var(--primary) 18%, var(--primary-soft));
}

.articles-home__grid {
  margin-top: 22px;
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

@media (max-width: 1200px) {
  .articles-home__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
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

  .articles-home__grid {
    grid-template-columns: 1fr;
  }
}
</style>
