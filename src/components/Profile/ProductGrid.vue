<template>
  <div class="services">
    <article v-for="card in cards" :key="card.id" class="card" :class="{ clickable: !!card.href }" v-reveal>
      <a v-if="card.href" class="card-link" :href="card.href" aria-label="РћС‚РєСЂС‹С‚СЊ СѓСЃР»СѓРіСѓ"></a>

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
          <button class="btn btn--ghost" type="button" @click="openDetails(card)">
            РџРѕРґСЂРѕР±РЅРµРµ
            <span class="arrow">в†’</span>
          </button>
        </footer>
      </div>
    </article>
  </div>

  <AppModal
    v-model="isModalOpen"
    :title="activeServiceTitle"
  >
    <div v-if="activeService" class="service-modal">
      <div class="service-modal__lead">
        <p
          v-for="(paragraph, index) in activeService.longDescription"
          :key="index"
          class="service-modal__paragraph"
        >
          {{ paragraph }}
        </p>
      </div>

      <div class="service-modal__grid">
        <section class="service-modal__section">
          <h3 class="service-modal__title">Детали</h3>
          <ul class="service-modal__list">
            <li v-for="(item, index) in activeService.details" :key="index">
              {{ item }}
            </li>
          </ul>
        </section>

        <section class="service-modal__section">
          <h3 class="service-modal__title">Длительность</h3>
          <p class="service-modal__text">{{ activeService.duration }}</p>

          <h3 class="service-modal__title service-modal__title--spaced">Что входит</h3>
          <ul class="service-modal__list">
            <li v-for="(item, index) in activeService.includes" :key="index">
              {{ item }}
            </li>
          </ul>
        </section>
      </div>

      <p v-if="activeService.note" class="service-modal__note">
        {{ activeService.note }}
      </p>

      <div class="service-modal__cta">
        <button class="service-modal__btn service-modal__btn--ghost" type="button" @click="closeDetails">
          Закрыть
        </button>
      </div>
    </div>
  </AppModal>
</template>

<script setup>
import { computed, ref, watch } from "vue"
import AppModal from "../ui/AppModal.vue"

const isModalOpen = ref(false)
const activeService = ref(null)

const cards = [
  {
    id: "moose",
    title: "Экскурсия в «Братство лосей»",
    fullTitle: "Экскурсия в «Братство лосей»",
    desc: "Заповедный маршрут, истории о лесах и живые встречи с природой.",
    duration: "3–4 часа",
    price: "от 3 500 ₽",
    image: "/1.jpeg",
    href: "",
    longDescription: [
      "Маршрут выстроен как мягкое погружение в ритм леса: мы идём неторопливо, слушаем тишину, читаем следы и узнаём историю местности через природные знаки.",
      "Экскурсия сочетает наблюдение, созерцание и спокойные беседы. Формат подходит тем, кто ценит живой контакт с природой и хочет почувствовать присутствие без суеты.",
    ],
    details: [
      "Небольшая группа до 8 человек",
      "Маршрут с остановками для наблюдений и фото",
      "Лёгкий темп с возможностью пауз",
      "Сопровождение проводника и рассказ о местной экосистеме",
      "Подходит для новичков, специальная подготовка не нужна",
    ],
    includes: [
      "Проводник и навигация по маршруту",
      "Тёплый чай на привале",
      "Короткие практики на внимание и дыхание",
    ],
    note: "Рекомендуем удобную обувь и слой по погоде.",
  },
  {
    id: "tea",
    title: "Чайная церемония",
    fullTitle: "Чайная церемония в тихом пространстве",
    desc: "Спокойный ритуал, вкус момента и пространство для тишины.",
    duration: "1,5 часа",
    price: "от 2 200 ₽",
    image: "/2.jpeg",
    href: "",
    longDescription: [
      "Церемония строится вокруг качества присутствия: мы замедляем темп, наблюдаем вкус и аромат, слышим тонкие переходы настоя.",
      "Это формат для восстановления и ясности. Подходит тем, кто хочет на час-полтора выйти из потока и вернуть внимание к себе.",
    ],
    details: [
      "Камерная группа до 6 человек",
      "Традиционная подача и пояснения к каждому проливу",
      "Спокойный темп без спешки",
      "Возможность тихой беседы или полного молчания",
    ],
    includes: [
      "Отборный чай и посуда",
      "Вода правильной температуры",
      "Небольшие авторские сладости",
    ],
    note: "Лучше прийти без сильного кофеина за 2–3 часа до церемонии.",
  },
  {
    id: "energy",
    title: "Утренние энергетические практики",
    fullTitle: "Утренние энергетические практики",
    desc: "Мягкое включение тела, дыхание и настрой на день.",
    duration: "60 минут",
    price: "от 1 500 ₽",
    image: "/3.jpeg",
    href: "",
    longDescription: [
      "Комплекс выстроен так, чтобы мягко пробудить тело и дыхание, снять утреннюю инерцию и включить внимание.",
      "Практики не требуют особой подготовки: темп спокойный, акцент на ощущениях и корректной технике.",
    ],
    details: [
      "Работа с дыханием и мобильностью",
      "Нежная суставная разминка",
      "Фокус на осанке и лёгкости",
      "Короткая медитация в конце",
    ],
    includes: [
      "Коврики и пледы",
      "Небольшой чай после практики",
      "Рекомендации для самостоятельного повторения",
    ],
    note: "Формат подходит для любого уровня, приходите в удобной одежде.",
  },
  {
    id: "workshop",
    title: "Мастер-класс",
    fullTitle: "Авторский мастер-класс",
    desc: "Разбор темы, обмен опытом и спокойная практика в группе.",
    duration: "2 часа",
    price: "от 2 000 ₽",
    image: "/4.jpeg",
    href: "",
    longDescription: [
      "Каждый мастер-класс — это короткая теория и аккуратная практика, где важны ясность и ощущение безопасности в группе.",
      "Формат подходит тем, кто хочет осмыслить тему глубже, задать вопросы и получить конкретные техники.",
    ],
    details: [
      "Небольшая группа до 10 человек",
      "Комбинация объяснений и практики",
      "Время на вопросы и обсуждения",
      "Материалы для самостоятельной работы",
    ],
    includes: [
      "Методические заметки",
      "Чай/вода во время встречи",
      "Поддержка после занятия в чате",
    ],
    note: "Если есть запрос на конкретную тему — напишите заранее.",
  },
  {
    id: "mindfulness",
    title: "Mindfulness",
    fullTitle: "Mindfulness-сессия",
    desc: "Простые техники для фокуса, дыхания и внутренней устойчивости.",
    duration: "60–75 минут",
    price: "от 1 800 ₽",
    image: "/5.jpeg",
    href: "",
    longDescription: [
      "Сессия выстроена вокруг наблюдения, дыхания и тонкой настройки внимания. Мы учимся видеть процесс мыслей и возвращаться в настоящее.",
      "Формат поддерживает спокойную концентрацию и устойчивость, помогает мягко разгружать нервную систему.",
    ],
    details: [
      "Пошаговое ведение практики",
      "Упражнения на концентрацию и мягкую регуляцию",
      "Тёплое завершение с интеграцией",
      "Подходит для начинающих",
    ],
    includes: [
      "Гайд с практиками на неделю",
      "Запись короткой медитации",
    ],
    note: "Можно прийти после рабочего дня — практика будет мягкой и восстанавливающей.",
  },
  {
    id: "leela",
    title: "Игра «Лила»",
    fullTitle: "Игра самопознания «Лила»",
    desc: "Глубокий диалог с собой в мягком и поддерживающем формате.",
    duration: "3 часа",
    price: "от 2 800 ₽",
    image: "/6.jpeg",
    href: "",
    longDescription: [
      "Лила — это медитативная игра, которая помогает увидеть внутренние сценарии и почувствовать, где сейчас находится ваш фокус.",
      "Мы играем в атмосфере уважения и тишины, где есть место внимательному исследованию и честности к себе.",
    ],
    details: [
      "Пошаговое ведение и безопасное пространство",
      "Возможность индивидуального разбора",
      "Темп без давления и спешки",
      "Небольшая группа до 5 человек",
    ],
    includes: [
      "Игровое поле и материалы",
      "Чай и лёгкие закуски",
      "Короткие рекомендации по интеграции опыта",
    ],
    note: "Лучше приходить с намерением или вопросом, который сейчас важен.",
  },
  {
    id: "custom",
    title: "Авторские программы",
    fullTitle: "Авторские программы под ваш запрос",
    desc: "Индивидуальные форматы под ваш запрос и глубину опыта.",
    duration: "по запросу",
    price: "по запросу",
    image: "/7.jpeg",
    href: "",
    longDescription: [
      "Программы создаются под конкретный запрос: от мягких ретритов до персональных маршрутов на природе.",
      "Мы согласуем цели, длительность и желаемую глубину, чтобы формат работал именно на ваш ритм.",
    ],
    details: [
      "Индивидуальный сценарий и согласование деталей",
      "Возможность закрытого формата 1:1",
      "Подбор пространства и времени",
      "Поддержка до и после встречи",
    ],
    includes: [
      "Персональная консультация перед стартом",
      "Материалы и практики для самостоятельной работы",
      "Индивидуальные рекомендации",
    ],
    note: "Оптимально, если вы заранее сформулируете цель или состояние, к которому хотите прийти.",
  },
]

const activeServiceTitle = computed(() => {
  return activeService.value?.fullTitle || activeService.value?.title || "Подробнее"
})

const openDetails = (service) => {
  activeService.value = service
  isModalOpen.value = true
}

const closeDetails = () => {
  isModalOpen.value = false
}

watch(isModalOpen, (value) => {
  if (!value) {
    activeService.value = null
  }
})

const markImageLoaded = (event) => {
  event.target.classList.add("is-loaded")
}
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

.service-modal {
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: var(--text);
}

.service-modal__lead {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.service-modal__paragraph {
  margin: 0;
  font-size: 15px;
  line-height: 1.7;
  color: var(--text);
}

.service-modal__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.service-modal__section {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 16px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35);
}

.service-modal__title {
  margin: 0 0 10px;
  font-size: 15px;
  color: var(--text-strong);
}

.service-modal__title--spaced {
  margin-top: 16px;
}

.service-modal__list {
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.6;
}

.service-modal__text {
  margin: 0;
  font-size: 14px;
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
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;
}

.service-modal__btn--ghost {
  border: 1px solid var(--border);
  cursor: pointer;
  border-radius: 999px;
  padding: 11px 16px;
  font-size: 14px;
  color: var(--text-strong);
  background: transparent;
  box-shadow: none;
  transition: transform 200ms ease, background 200ms ease;
}

.service-modal__btn--ghost:hover {
  background: var(--bg-elevated);
  transform: translateY(-1px);
}

.service-modal__btn--ghost:active {
  transform: translateY(0);
}

@media (max-width: 980px) {
  .services {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 780px) {
  .service-modal__grid {
    grid-template-columns: 1fr;
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
