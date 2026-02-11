<template>
  <div class="services">
    <ServiceCard
      v-for="card in cards"
      :key="card.id"
      :title="card.title"
      :description="card.desc"
      :duration="card.duration"
      :price="card.price"
      :image="card.image"
      :href="card.href"
      @more="openDetails(card)"
    />
  </div>

  <AppModal v-model="isModalOpen" :title="activeServiceTitle">
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
import { computed, ref, watch } from 'vue'

import { normalizeImageUrl, parseJsonField } from '../../api/client'
import { useSection } from '../../composables/useSection'
import AppModal from '../ui/AppModal.vue'
import ServiceCard from './ServiceCard.vue'

const isModalOpen = ref(false)
const activeService = ref(null)

const { data: servicesSection } = useSection('services')

const fallbackCards = [
  {
    id: 'moose',
    title: 'Экскурсия в «Братство лосей»',
    fullTitle: 'Экскурсия в «Братство лосей»',
    desc: 'Заповедный маршрут, истории о лесах и живые встречи с природой.',
    duration: '3-4 часа',
    price: 'от 3 500 ₽',
    image: '/1.jpeg',
    href: '',
    longDescription: ['Маршрут выстроен как мягкое погружение в ритм леса.'],
    details: ['Небольшая группа до 8 человек'],
    includes: ['Проводник', 'Теплый чай'],
    note: 'Рекомендуем удобную обувь.',
  },
]

const cards = computed(() => {
  const items = parseJsonField(servicesSection.value?.items_json, fallbackCards)
  if (!Array.isArray(items)) return fallbackCards
  return items.map((item) => ({
    ...item,
    image: normalizeImageUrl(item.image || ''),
    longDescription: Array.isArray(item.longDescription) ? item.longDescription : [],
    details: Array.isArray(item.details) ? item.details : [],
    includes: Array.isArray(item.includes) ? item.includes : [],
  }))
})

const activeServiceTitle = computed(() => {
  return activeService.value?.fullTitle || activeService.value?.title || 'Подробнее'
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
</script>

<style scoped>
.services {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
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
</style>
