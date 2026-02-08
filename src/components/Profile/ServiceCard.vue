<template>
  <article class="card" :class="{ clickable: !!href }" v-reveal>
    <a v-if="href" class="card-link" :href="href" aria-label="Открыть услугу"></a>

    <div class="media">
      <img
        :src="image"
        :alt="title"
        loading="lazy"
        decoding="async"
        fetchpriority="low"
        width="800"
        height="450"
        class="media__img img-lazy"
        @load="markImageLoaded"
      />
      <div class="media-overlay"></div>
    </div>

    <div class="content">
      <header class="top">
        <h3 class="title">{{ title }}</h3>

        <div class="meta">
          <span v-if="duration" class="chip">{{ duration }}</span>
          <span v-if="price" class="price">{{ price }}</span>
        </div>
      </header>

      <p v-if="description" class="description">
        {{ description }}
      </p>

      <footer class="bottom">
        <button class="btn btn--ghost" type="button" @click="onMore">
          Подробнее
          <span class="arrow">→</span>
        </button>
      </footer>
    </div>
  </article>
</template>

<script setup>
defineProps({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  duration: { type: String, default: "" },
  price: { type: String, default: "" },
  href: { type: String, default: "" },
})

const emit = defineEmits(["more"])

const onMore = () => {
  emit("more")
}

const markImageLoaded = (event) => {
  event.target.classList.add("is-loaded")
}
</script>

<style scoped>
.card {
  position: relative;
  overflow: hidden;
  border-radius: 22px;
  background: var(--card);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid var(--border);
  box-shadow:
    0 18px 40px var(--shadow),
    inset 0 1px 0 rgba(255, 255, 255, 0.35);
  transition: transform 280ms ease, box-shadow 280ms ease, border-color 280ms ease;
  display: grid;
  grid-template-rows: 180px 1fr;
  min-height: 360px;
}

.card.clickable:hover {
  transform: translateY(-4px);
  border-color: var(--border);
  box-shadow:
    0 28px 60px var(--shadow),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.card-link {
  position: absolute;
  inset: 0;
  z-index: 2;
}

.media {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.06);
}

.media__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02);
  transition: transform 350ms ease;
  display: block;
}

.card.clickable:hover .media__img {
  transform: scale(1.06);
}

.media-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.0) 0%,
    rgba(0, 0, 0, 0.10) 55%,
    rgba(0, 0, 0, 0.18) 100%
  );
}

.content {
  position: relative;
  z-index: 3;
  padding: 16px 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.top {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.title {
  margin: 0;
  font-size: 18px;
  line-height: 1.2;
  color: var(--text-strong);
  letter-spacing: 0.2px;
}

.meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.chip {
  display: inline-flex;
  align-items: center;
  padding: 7px 10px;
  border-radius: 999px;
  font-size: 12.5px;
  color: var(--text);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  backdrop-filter: blur(10px);
}

.price {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-strong);
  padding: 7px 10px;
  border-radius: 999px;
  background: var(--primary-soft);
  border: 1px solid var(--border);
}

.description {
  margin: 0;
  font-size: 14px;
  line-height: 1.55;
  color: var(--muted);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bottom {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.btn {
  position: relative;
  z-index: 4;
  border: none;
  cursor: pointer;
  border-radius: 999px;
  padding: 10px 14px;
  font-size: 14px;
  color: #2b2520;
  background: var(--primary);
  box-shadow: 0 10px 22px var(--shadow);
  transition: transform 200ms ease, box-shadow 200ms ease, filter 200ms ease;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 30px var(--shadow);
  filter: brightness(1.02);
}

.btn:active {
  transform: translateY(0);
  box-shadow: 0 10px 22px var(--shadow);
}

.btn--ghost {
  background: transparent;
  color: var(--text-strong);
  border: 1px solid var(--border);
  box-shadow: none;
}

.btn--ghost:hover {
  background: var(--bg-elevated);
  transform: translateY(-1px);
}

.btn--ghost:active {
  transform: translateY(0);
}

.arrow {
  margin-left: 8px;
  opacity: 0.9;
}

@media (max-width: 480px) {
  .card {
    grid-template-rows: 160px 1fr;
    min-height: 330px;
    border-radius: 18px;
  }

  .media {
    height: 160px;
  }

  .title {
    font-size: 17px;
  }

  .description {
    font-size: 13.5px;
  }
}
</style>
