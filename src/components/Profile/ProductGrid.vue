<template>
  <div class="services">
    <article v-for="card in cards" :key="card.id" class="card" v-reveal>
      <div class="media">
        <img
          :src="card.image"
          :alt="card.title"
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
          <h3 class="title">{{ card.title }}</h3>

          <div class="meta">
            <span v-if="card.duration" class="chip">{{ card.duration }}</span>
            <span v-if="card.price" class="price">{{ card.price }}</span>
          </div>
        </header>

        <p v-if="card.desc" class="description">
          {{ card.desc }}
        </p>

        <footer class="bottom">
          <button class="btn-outline product-grid__more" type="button" @click="openDetails(card)">
            Подробнее
            <span class="arrow">→</span>
          </button>
        </footer>
      </div>
    </article>
  </div>

  <AppModal
    v-model="isModalOpen"
    :title="activeServiceTitle"
    panel-width="min(1120px, 95vw)"
    panel-max-height="92vh"
  >
    <div v-if="activeService" class="service-modal">
      <section class="service-modal__intro">
        <h2 class="service-modal__h2">{{ activeService.title }}</h2>
        <p class="service-modal__intro-text">{{ activeService.intro }}</p>
      </section>

      <section class="service-modal__section service-modal__section--gallery">
        <h3 class="service-modal__h3">Галерея</h3>

        <div class="service-modal__viewer glass-card">
          <img
            v-if="activeGalleryItem?.type === 'image'"
            :src="activeGalleryItem.src"
            :alt="activeService.title"
            class="service-modal__viewer-image"
            loading="lazy"
            decoding="async"
          />
          <iframe
            v-else
            :src="activeGalleryItem?.src"
            class="service-modal__viewer-video"
            title="Видео услуги"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>

        <div class="service-modal__thumbs">
          <button
            v-for="(item, index) in activeService.gallery"
            :key="`${activeService.id}-${index}`"
            class="service-modal__thumb"
            :class="{ 'service-modal__thumb--active': index === activeMediaIndex }"
            type="button"
            @click="selectGalleryMedia(index)"
          >
            <img
              v-if="item.type === 'image'"
              :src="item.src"
              :alt="`Превью ${index + 1}`"
              loading="lazy"
              decoding="async"
            />
            <span v-else class="service-modal__thumb-video">▶ Видео</span>
          </button>
        </div>
      </section>

      <section class="service-modal__section">
        <h3 class="service-modal__h3">Описание услуги</h3>
        <div
          v-for="(block, blockIndex) in activeService.contentSections"
          :key="`${activeService.id}-content-${blockIndex}`"
          class="service-modal__content-block"
        >
          <h4 class="service-modal__h4">{{ block.title }}</h4>
          <p v-for="(paragraph, pIndex) in block.paragraphs" :key="`${blockIndex}-p-${pIndex}`" class="service-modal__paragraph">
            {{ paragraph }}
          </p>
          <div v-if="block.list?.length" class="service-modal__list-wrap">
            <p v-if="block.listTitle" class="service-modal__list-title">{{ block.listTitle }}</p>
            <ul class="service-modal__list">
              <li v-for="(item, lIndex) in block.list" :key="`${blockIndex}-l-${lIndex}`">{{ item }}</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="service-modal__section">
        <h3 class="service-modal__h3">Тарифы</h3>
        <div class="service-modal__tariffs">
          <article
            v-for="(tariff, index) in activeService.tariffs"
            :key="`${activeService.id}-tariff-${index}`"
            class="service-modal__tariff-card"
          >
            <h4 class="service-modal__tariff-title">{{ tariff.name }}</h4>
            <p class="service-modal__tariff-price">{{ tariff.price }}</p>
            <p class="service-modal__tariff-duration">{{ tariff.duration }}</p>
            <ul class="service-modal__list">
              <li v-for="(item, itemIndex) in tariff.includes" :key="`${index}-i-${itemIndex}`">{{ item }}</li>
            </ul>
          </article>
        </div>
      </section>

      <p v-if="activeService.note" class="service-modal__note">
        {{ activeService.note }}
      </p>

      <div class="service-modal__cta">
        <button class="service-modal__btn btn-outline" type="button" @click="closeDetails">Закрыть</button>
      </div>
    </div>
  </AppModal>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import AppModal from "../ui/AppModal.vue";

const isModalOpen = ref(false);
const activeService = ref(null);
const activeMediaIndex = ref(0);

const cards = [
  {
    id: "moose",
    title: "Экскурсия в «Братство Лосей»",
    fullTitle: "Экскурсия в «Братство Лосей»",
    desc: "Заповедный маршрут, живые истории о природе и глубокое погружение в ритм местности.",
    duration: "3-4 часа",
    price: "от 3 500 ₽",
    image: "/images/service-moose-cover.jpg",
    intro:
      "Авторская экскурсия для тех, кто хочет не просто пройти по маршруту, а прочувствовать пространство: от тишины леса до живого диалога с проводником и группой.",
    gallery: [
      { type: "image", src: "/images/service-moose-1.jpg" },
      { type: "image", src: "/images/service-moose-2.jpg" },
      { type: "video", src: "https://www.youtube.com/embed/ScMzIvxBSi4" },
      { type: "image", src: "/images/service-moose-3.jpg" },
    ],
    contentSections: [
      {
        title: "Как проходит программа",
        paragraphs: [
          "Мы начинаем встречу с короткого знакомства и настройки темпа. Важно, чтобы каждый участник сразу почувствовал себя комфортно и понял структуру маршрута.",
          "Первая часть экскурсии проходит по лесной зоне: спокойный шаг, остановки в ключевых точках, наблюдение за ландшафтом и короткие комментарии проводника.",
          "Во второй части маршрут выходит к воде. Здесь мы делаем длинную паузу: чай, обсуждение впечатлений и практики на внимание к телу и дыханию.",
        ],
        listTitle: "Внутри маршрута есть:",
        list: [
          "Три смысловые точки с разным ритмом",
          "Адаптация темпа под группу",
          "Простые практики без специальной подготовки",
          "Финальный круг с персональными рекомендациями",
        ],
      },
      {
        title: "Кому подходит",
        paragraphs: [
          "Экскурсия подходит тем, кто чувствует перегруз и хочет выйти из интенсивного городского ритма в более устойчивое состояние.",
          "Формат открыт для новичков: не требуется спортивный опыт или особая подготовка. Вся программа построена мягко и с запасом по нагрузке.",
          "Для небольших команд и семей можно провести закрытую версию маршрута с фокусом на ваши задачи и интересы.",
        ],
      },
    ],
    tariffs: [
      {
        name: "Базовый",
        price: "3 500 ₽",
        duration: "3 часа",
        includes: ["Маршрут с проводником", "Чай на привале", "Групповой формат до 8 человек"],
      },
      {
        name: "Расширенный",
        price: "5 200 ₽",
        duration: "4 часа",
        includes: ["Дополнительные практики", "Фото-точки и разбор маршрута", "Персональные рекомендации"],
      },
    ],
    note: "Рекомендуем удобную обувь и ветровку по погоде. Детали встречи направляем после подтверждения.",
  },
  {
    id: "tea",
    title: "Чайная церемония",
    fullTitle: "Чайная церемония в камерном формате",
    desc: "Медленный ритм, качественный чай и пространство для восстановления внимания.",
    duration: "1,5 часа",
    price: "от 2 200 ₽",
    image: "/images/service-tea-cover.jpg",
    intro: "Формат для тех, кто хочет остановиться, восстановить внутренний темп и провести вечер в спокойной, тёплой атмосфере.",
    gallery: [
      { type: "image", src: "/images/service-tea-1.jpg" },
      { type: "video", src: "https://www.youtube.com/embed/ysz5S6PUM-U" },
      { type: "image", src: "/images/service-tea-2.jpg" },
      { type: "image", src: "/images/service-tea-3.jpg" },
    ],
    contentSections: [
      {
        title: "Структура встречи",
        paragraphs: [
          "Встреча начинается с мягкой вводной: мы снимаем внешнюю спешку, выравниваем дыхание и переходим к церемонии в спокойном ритме.",
          "Далее — несколько проливов чая с пояснениями по вкусу, состоянию и этапам раскрытия. Наша задача — дать участникам не информацию, а проживание процесса.",
          "Завершаем коротким кругом наблюдений. Это помогает зафиксировать эффект и перенести его в обычный ритм жизни.",
        ],
      },
      {
        title: "Что вы получаете",
        paragraphs: [
          "После церемонии у участников обычно появляется больше ясности и устойчивости, снижается внутреннее напряжение, легче переключается внимание.",
          "Формат также хорошо работает как точка восстановления для команд и небольших групп.",
        ],
        listTitle: "Дополнительно доступны:",
        list: ["Парная церемония", "Закрытый формат для компании", "Тематика встречи под запрос"],
      },
    ],
    tariffs: [
      {
        name: "Камерный круг",
        price: "2 200 ₽",
        duration: "1,5 часа",
        includes: ["Чайная церемония", "Группа до 6 человек", "Сопровождение ведущего"],
      },
      {
        name: "Индивидуальный",
        price: "4 000 ₽",
        duration: "2 часа",
        includes: ["Персональный формат", "Чайная карта под запрос", "Рекомендации после встречи"],
      },
    ],
    note: "Лучше не употреблять крепкий кофе за 2-3 часа до встречи, чтобы глубже почувствовать состояние церемонии.",
  },
  {
    id: "energy",
    title: "Утренние энергетические практики",
    fullTitle: "Утренние энергетические практики",
    desc: "Мягкий старт дня: дыхание, движение и настрой на устойчивое состояние.",
    duration: "60 минут",
    price: "от 1 500 ₽",
    image: "/images/service-energy-cover.jpg",
    intro: "Утренняя программа для мягкого включения тела и внимания, без перегруза и с акцентом на устойчивость в течение дня.",
    gallery: [
      { type: "image", src: "/images/service-energy-1.jpg" },
      { type: "image", src: "/images/service-energy-2.jpg" },
      { type: "video", src: "https://www.youtube.com/embed/jNQXAC9IVRw" },
    ],
    contentSections: [
      {
        title: "Формат занятия",
        paragraphs: [
          "Практика делится на три блока: дыхание, движение и короткая интеграция в тишине. Такой порядок помогает включиться в день без резких нагрузок.",
          "Мы даем несколько уровней сложности, поэтому формат подходит и начинающим, и тем, кто уже регулярно занимается.",
          "После занятия участники получают короткие инструкции для самостоятельной практики на 10-15 минут.",
        ],
      },
      {
        title: "Результат и эффект",
        paragraphs: [
          "Участники чаще всего отмечают бодрость без суеты, более ровный эмоциональный фон и лучшее удержание внимания в течение рабочего дня.",
          "При регулярной практике улучшается ощущение ритма и легче восстанавливаться после интенсивных периодов.",
        ],
      },
    ],
    tariffs: [
      {
        name: "Группа",
        price: "1 500 ₽",
        duration: "60 минут",
        includes: ["Занятие в группе", "Мат для практики", "Чек-лист для самостоятельной работы"],
      },
      {
        name: "Персонально",
        price: "3 200 ₽",
        duration: "75 минут",
        includes: ["Индивидуальная адаптация", "Разбор техники", "Программа на неделю"],
      },
    ],
    note: "Берите удобную одежду и воду. При необходимости занятие можно провести в мягком восстановительном режиме.",
  },
];

const activeServiceTitle = computed(() => activeService.value?.fullTitle || activeService.value?.title || "Подробнее");

const activeGalleryItem = computed(() => {
  if (!activeService.value?.gallery?.length) return null;
  return activeService.value.gallery[activeMediaIndex.value] || activeService.value.gallery[0];
});

const selectGalleryMedia = (index) => {
  activeMediaIndex.value = index;
};

const openDetails = (service) => {
  activeService.value = service;
  activeMediaIndex.value = 0;
  isModalOpen.value = true;
};

const closeDetails = () => {
  isModalOpen.value = false;
};

watch(isModalOpen, (value) => {
  if (!value) {
    activeService.value = null;
    activeMediaIndex.value = 0;
  }
});

const markImageLoaded = (event) => {
  event.target.classList.add("is-loaded");
};
</script>

<style scoped>
.services {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
}

.card {
  position: relative;
  overflow: hidden;
  border-radius: 22px;
  background: var(--card);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid var(--border);
  box-shadow: 0 18px 40px var(--shadow), inset 0 1px 0 rgba(255, 255, 255, 0.35);
  transition: transform 280ms ease, box-shadow 280ms ease, border-color 280ms ease;
  display: grid;
  grid-template-rows: 180px 1fr;
  min-height: 360px;
}

.card:hover {
  transform: translateY(-4px);
  border-color: var(--border);
  box-shadow: 0 28px 60px var(--shadow), inset 0 1px 0 rgba(255, 255, 255, 0.4);
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

.card:hover .media__img {
  transform: scale(1.06);
}

.media-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 55%, rgba(0, 0, 0, 0.18) 100%);
}

.content {
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
}

.product-grid__more {
  font-size: 14px;
}

.arrow {
  margin-left: 8px;
}

.service-modal {
  display: grid;
  gap: 22px;
  color: var(--text);
}

.service-modal__section {
  padding-top: 18px;
  border-top: 1px solid color-mix(in srgb, var(--border) 85%, transparent);
}

.service-modal__section--gallery {
  display: grid;
  gap: 14px;
}

.service-modal__h2 {
  margin: 0;
  font-size: clamp(24px, 4vw, 34px);
  line-height: 1.15;
  color: var(--text-strong);
}

.service-modal__h3 {
  margin: 0 0 12px;
  font-size: 18px;
  color: var(--text-strong);
}

.service-modal__h4 {
  margin: 0 0 8px;
  font-size: 16px;
  color: var(--text-strong);
}

.service-modal__intro-text {
  margin: 10px 0 0;
  color: var(--muted);
  line-height: 1.7;
  font-size: 15px;
}

.service-modal__viewer {
  border-radius: 18px;
  overflow: hidden;
}

.service-modal__viewer-image,
.service-modal__viewer-video {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 0;
  display: block;
  object-fit: cover;
}

.service-modal__thumbs {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.service-modal__thumb {
  border: 1px solid color-mix(in srgb, var(--border) 80%, transparent);
  border-radius: 12px;
  padding: 0;
  overflow: hidden;
  background: var(--bg-elevated);
  cursor: pointer;
  min-height: 72px;
}

.service-modal__thumb img {
  width: 100%;
  height: 100%;
  min-height: 72px;
  object-fit: cover;
  display: block;
}

.service-modal__thumb-video {
  width: 100%;
  height: 100%;
  min-height: 72px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--text-strong);
  font-size: 13px;
  background: color-mix(in srgb, var(--bg-elevated) 85%, transparent);
}

.service-modal__thumb--active {
  border-color: color-mix(in srgb, var(--primary) 55%, var(--border));
  box-shadow: 0 8px 18px var(--shadow);
}

.service-modal__content-block + .service-modal__content-block {
  margin-top: 16px;
}

.service-modal__paragraph {
  margin: 0 0 10px;
  font-size: 15px;
  line-height: 1.72;
  color: var(--text);
}

.service-modal__list-wrap {
  margin-top: 8px;
}

.service-modal__list-title {
  margin: 0 0 6px;
  font-size: 14px;
  color: var(--text-strong);
}

.service-modal__list {
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 6px;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.6;
}

.service-modal__tariffs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.service-modal__tariff-card {
  background: color-mix(in srgb, var(--bg-elevated) 84%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 80%, transparent);
  border-radius: 14px;
  padding: 14px;
}

.service-modal__tariff-title {
  margin: 0;
  font-size: 16px;
  color: var(--text-strong);
}

.service-modal__tariff-price {
  margin: 6px 0 2px;
  font-size: 18px;
  color: var(--color-dark-deep);
  font-weight: 700;
}

.service-modal__tariff-duration {
  margin: 0 0 8px;
  font-size: 13px;
  color: var(--muted);
}

.service-modal__note {
  margin: 0;
  padding: 12px 14px;
  border-radius: 12px;
  background: var(--primary-soft);
  border: 1px solid var(--border);
  color: var(--text-strong);
  font-size: 14px;
  line-height: 1.6;
}

.service-modal__cta {
  display: flex;
  justify-content: flex-end;
}

.service-modal__btn {
  font-size: 14px;
}

@media (max-width: 980px) {
  .services {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .service-modal__thumbs {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 780px) {
  .service-modal__tariffs {
    grid-template-columns: 1fr;
  }

  .service-modal__thumbs {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 620px) {
  .services {
    grid-template-columns: 1fr;
  }
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
