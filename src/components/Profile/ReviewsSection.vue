<template>
  <section
    class="reviews reveal"
    @mouseenter="pause"
    @mouseleave="resume"
    @focusin="pause"
    @focusout="resume"
  >
    <div class="reviews__header">
      <div class="reviews__eyebrow">ОТЗЫВЫ ГОСТЕЙ</div>
      <h2 class="reviews__title">Нам доверяют</h2>
      <p class="reviews__subtitle">
        Гости выбирают «Новое Конаково» за атмосферу, заботу и внимание к деталям.
      </p>
    </div>

    <div class="reviews__card-wrap">
      <Transition name="fade-rise" mode="out-in">
        <article
          class="reviews__card glass-card"
          :key="activeReview.id"
          tabindex="0"
        >
          <div class="reviews__avatar">
            <img :src="activeReview.avatarUrl" :alt="`Фото — ${activeReview.name}`" />
          </div>

          <div class="reviews__stars" aria-label="Рейтинг">
            <span
              v-for="n in 5"
              :key="n"
              :class="['star', { muted: n > activeReview.rating }]"
              aria-hidden="true"
            >
              ★
            </span>
          </div>

          <p class="reviews__text">«{{ activeReview.text }}»</p>

          <div class="reviews__name">{{ activeReview.name }}</div>
          <div class="reviews__meta">{{ activeReview.service }} · {{ activeReview.date }}</div>
        </article>
      </Transition>
    </div>

    <div class="reviews__nav">
      <button class="nav-btn" type="button" aria-label="Предыдущий отзыв" @click="prev">
        ‹
      </button>

      <div class="dots" role="tablist" aria-label="Слайды">
        <button
          v-for="(review, idx) in reviews"
          :key="review.id"
          class="dot"
          :class="{ active: idx === activeIndex }"
          type="button"
          @click="goTo(idx)"
          :aria-label="`Слайд ${idx + 1}`"
        ></button>
      </div>

      <button class="nav-btn" type="button" aria-label="Следующий отзыв" @click="next">
        ›
      </button>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const reviews = [
  {
    id: 1,
    name: 'Мария К.',
    text:
      'Экскурсия в «Братство лосей» — очень тёплый и спокойный опыт. Всё организовано бережно, без спешки, с вниманием к деталям.',
    rating: 5,
    service: 'Экскурсия',
    date: '15 октября 2024',
    avatarUrl: '/avatar.png',
  },
  {
    id: 2,
    name: 'Екатерина Д.',
    text:
      'Утренние практики помогли перезагрузиться и настроиться на день. После занятий появляется ясность и спокойствие — очень рекомендую.',
    rating: 5,
    service: 'Утренние практики',
    date: '28 сентября 2024',
    avatarUrl: '/avatar.png',
  },
  {
    id: 3,
    name: 'Алина Р.',
    text:
      'Чайная церемония — как маленький ритуал тишины и уюта. Атмосфера мягкая, уютная, хочется возвращаться снова.',
    rating: 5,
    service: 'Чайная церемония',
    date: '7 ноября 2024',
    avatarUrl: '/avatar.png',
  },
  {
    id: 4,
    name: 'Игорь С.',
    text:
      'Мастер-класс прошёл легко и интересно. Понравился подход: спокойно, дружелюбно и при этом очень содержательно.',
    rating: 4,
    service: 'Мастер-класс',
    date: '22 августа 2024',
    avatarUrl: '/avatar.png',
  },
  {
    id: 5,
    name: 'Ольга Н.',
    text:
      'Игра «Лила» оказалась глубже, чем я ожидала. Без давления, с уважением и поддержкой — очень ценный опыт.',
    rating: 5,
    service: 'Игра «Лила»',
    date: '2 июля 2024',
    avatarUrl: '/avatar.png',
  },
]

const activeIndex = ref(0)
const isPaused = ref(false)
let timerId = null

const activeReview = computed(() => reviews[activeIndex.value])

const next = () => {
  activeIndex.value = (activeIndex.value + 1) % reviews.length
  restart()
}

const prev = () => {
  activeIndex.value = (activeIndex.value - 1 + reviews.length) % reviews.length
  restart()
}

const goTo = (idx) => {
  activeIndex.value = idx
  restart()
}

const start = () => {
  stop()
  timerId = setInterval(() => {
    if (!isPaused.value) {
      activeIndex.value = (activeIndex.value + 1) % reviews.length
    }
  }, 4500)
}

const stop = () => {
  if (timerId) {
    clearInterval(timerId)
    timerId = null
  }
}

const pause = () => {
  isPaused.value = true
}

const resume = () => {
  isPaused.value = false
}

const restart = () => {
  stop()
  start()
}

onMounted(() => {
  start()
})

onUnmounted(() => {
  stop()
})
</script>

<style scoped>
.reviews {
  max-width: 1280px;
  margin: 24px auto 0;
 
}

.reviews__header {
  display: grid;
  gap: 10px;
  margin-bottom: 32px; /* ← вот этот отступ */
}

.reviews__eyebrow {
  font-size: 12px;
  letter-spacing: 2.4px;
  text-transform: uppercase;
  color: #6e5b45;
}

.reviews__title {
  margin: 0;
  font-size: 28px;
  color: #2b2520;
}

.reviews__subtitle {
  margin: 0;
  font-size: 14px;
  color: #3a2f27;
  max-width: 640px;
}

.reviews__card-wrap {
  display: flex;
  justify-content: center;
}

.reviews__card {
  width: min(900px, 100%);
  padding: 28px 30px;
  display: grid;
  justify-items: center;
  gap: 14px;
  text-align: center;
}

/* Если glass-card не определён глобально — добавь базу здесь */
.glass-card {
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.48);
  border: 1px solid rgba(255, 255, 255, 0.58);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 18px 40px rgba(20, 16, 12, 0.10);
}

.reviews__avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 10px 20px rgba(20, 16, 12, 0.12);
  overflow: hidden;
}

.reviews__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.reviews__stars {
  display: inline-flex;
  gap: 6px;
  font-size: 16px;
  color: #c8a96b;
}

.star.muted {
  color: rgba(200, 169, 107, 0.35);
}

.reviews__text {
  font-size: 16px;
  font-style: italic;
  color: #2b2520;
  margin: 0;
  line-height: 1.6;
}

.reviews__name {
  font-weight: 600;
  color: #2b2520;
}

.reviews__meta {
  font-size: 13px;
  color: #6e5b45;
}

.reviews__nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
   margin-top: 24px; /* отступ от карточки */
}


.nav-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(12px);
  cursor: pointer;
  color: #3a2f27;
  box-shadow: 0 10px 20px rgba(20, 16, 12, 0.12);
  transition: transform 200ms ease, box-shadow 200ms ease;
  font-size: 20px;
  line-height: 1;
}

.nav-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(20, 16, 12, 0.16);
}

.dots {
  display: inline-flex;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  border: none;
  background: rgba(200, 169, 107, 0.35);
  cursor: pointer;
  transition: width 200ms ease, background 200ms ease;
}

.dot.active {
  width: 18px;
  background: rgba(200, 169, 107, 0.9);
}

.fade-rise-enter-active,
.fade-rise-leave-active {
  transition: opacity 350ms ease, transform 350ms ease;
}

.fade-rise-enter-from,
.fade-rise-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}

@media (max-width: 720px) {
  .reviews__title {
    font-size: 24px;
  }

  .reviews__card {
    padding: 22px 18px;
  }
}
</style>
