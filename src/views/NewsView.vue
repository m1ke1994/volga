<script setup>
import { newsItems } from '../data/news'
</script>

<template>
  <section class="news">
    <header class="news__hero">
      <h1 class="news__title">Новости</h1>
      <p class="news__subtitle">
        Актуальные события «Нового Конаково»: новые форматы, сезонные обновления и важные анонсы.
      </p>
    </header>

    <div class="news__grid">
      <router-link
        v-for="item in newsItems"
        :key="item.id"
        :to="`/news/${item.slug}`"
        class="news__card glass-card"
        v-reveal
      >
        <div class="news__media">
          <img :src="item.image" :alt="item.title" loading="lazy" decoding="async" class="news__image" />
        </div>

        <div class="news__content">
          <div class="news__meta">
            <span class="news__chip">{{ item.category }}</span>
            <span class="news__date">{{ item.date }}</span>
          </div>
          <h2 class="news__card-title">{{ item.title }}</h2>
          <p class="news__excerpt">{{ item.excerpt }}</p>
          <span class="news__more">Открыть новость</span>
        </div>
      </router-link>
    </div>
  </section>
</template>

<style scoped>
.news {
  min-height: 100vh;
  padding: calc(var(--header-h, 72px) + 28px) 24px 80px;
  max-width: var(--container-max);
  margin: 0 auto;
}

.news__hero {
  margin-bottom: 22px;
}

.news__title {
  margin: 0 0 10px;
  color: var(--text-strong);
  font-size: 34px;
  line-height: 1.2;
}

.news__subtitle {
  margin: 0;
  color: var(--muted);
  font-size: 16px;
  max-width: 860px;
}

.news__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.news__card {
  display: grid;
  grid-template-rows: 220px 1fr;
  color: inherit;
  text-decoration: none;
  overflow: hidden;
}

.news__media {
  overflow: hidden;
  background: rgba(0, 0, 0, 0.06);
}

.news__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 320ms ease;
}

.news__card:hover .news__image {
  transform: scale(1.04);
}

.news__content {
  padding: 16px;
  display: grid;
  gap: 10px;
}

.news__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.news__chip {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--card) 74%, transparent);
  padding: 5px 10px;
  font-size: 12px;
}

.news__date {
  font-size: 12px;
  color: var(--muted);
}

.news__card-title {
  margin: 0;
  font-size: 20px;
  color: var(--text-strong);
  line-height: 1.3;
}

.news__excerpt {
  margin: 0;
  color: var(--text);
  line-height: 1.6;
}

.news__more {
  margin-top: 2px;
  color: var(--text-strong);
  font-size: 13px;
  opacity: 0.9;
}

@media (max-width: 900px) {
  .news__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .news {
    padding: calc(var(--header-h, 72px) + 20px) 16px 56px;
  }

  .news__title {
    font-size: 28px;
  }
}
</style>
