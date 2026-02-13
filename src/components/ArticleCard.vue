<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  showDescription: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <article class="article-card glass-card">
    <div class="article-card__media">
      <img class="article-card__image" :src="item.image" :alt="item.title" loading="lazy" decoding="async" />
      <span v-if="item.type === 'video'" class="article-card__video-badge" aria-hidden="true">▶</span>
    </div>
    <div class="article-card__content">
      <h3 class="article-card__title">{{ item.title }}</h3>
      <p v-if="showDescription" class="article-card__description">{{ item.description }}</p>
      <router-link class="article-card__action" :to="`/articles/${item.id}`">Читать далее</router-link>
    </div>
  </article>
</template>

<style scoped>
.article-card {
  overflow: hidden;
  border-radius: 20px;
}

.article-card__media {
  position: relative;
}

.article-card__image {
  width: 100%;
  height: 210px;
  object-fit: cover;
  display: block;
}

.article-card__video-badge {
  position: absolute;
  right: 12px;
  top: 12px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(17, 17, 17, 0.78);
  color: #fff;
  font-size: 14px;
}

.article-card__content {
  padding: 16px;
  display: grid;
  gap: 12px;
}

.article-card__title {
  margin: 0;
  font-size: 20px;
  line-height: 1.25;
  color: var(--text-strong);
}

.article-card__description {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: var(--muted);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-card__action {
  justify-self: start;
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, #b7a58c 40%, var(--border));
  background: linear-gradient(135deg, #c8b89f, #b7a58c);
  color: #2b2520;
  font-size: 13px;
  font-weight: 600;
  transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease;
}

.article-card__action:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 22px var(--shadow);
  filter: brightness(1.03);
}

@media (max-width: 768px) {
  .article-card__image {
    height: 190px;
  }

  .article-card__title {
    font-size: 18px;
  }
}
</style>
