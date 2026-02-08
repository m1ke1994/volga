<template>
  <div class="builder">
    <section class="builder__column">
      <header class="builder__header">
        <p class="builder__eyebrow">Выбор форматов</p>
        <h3 class="builder__headline">Соберите сценарий дня</h3>
        <p class="builder__subhead">Комбинируйте активности, чтобы получить идеальный ритм.</p>
      </header>

      <div class="builder__grid">
        <article
          v-for="service in services"
          :key="service.id"
          class="builder__card"
          :class="{ 'builder__card--selected': selectedIds.includes(service.id) }"
        >
          <div>
            <h3 class="builder__title">{{ service.name }}</h3>
            <p class="builder__desc">{{ service.desc }}</p>
          </div>
          <div class="builder__footer">
            <span class="builder__price">{{ formatPrice(service.price) }}</span>
            <button
              class="builder__toggle"
              type="button"
              :class="{ 'builder__toggle--active': selectedIds.includes(service.id) }"
              @click="toggleService(service.id)"
            >
              <span class="builder__toggle-icon" aria-hidden="true">
                {{ selectedIds.includes(service.id) ? "✓" : "+" }}
              </span>
              <span class="builder__toggle-text">
                {{ selectedIds.includes(service.id) ? "Убрать" : "Добавить" }}
              </span>
            </button>
          </div>
        </article>
      </div>
    </section>

    <aside class="builder__aside">
      <div class="builder__block builder__block--plan">
        <div class="builder__block-head">
          <h4>Твой план</h4>
          <span class="builder__total">{{ formatPrice(total) }}</span>
        </div>
        <ul v-if="selectedServices.length" class="builder__list">
          <li v-for="service in selectedServices" :key="service.id" class="builder__list-item">
            <span>{{ service.name }}</span>
            <span class="builder__list-meta">
              {{ formatPrice(service.price) }}
              <button
                class="builder__remove"
                type="button"
                @click="removeService(service.id)"
                aria-label="Убрать услугу"
              >
                ×
              </button>
            </span>
          </li>
        </ul>
        <p v-else class="builder__empty">Выберите услуги, чтобы собрать план.</p>

        <div class="builder__row">
          <label class="builder__label">
            Дата визита
            <input class="builder__input" type="date" v-model="date" />
          </label>
          <label class="builder__label">
            Гостей
            <input class="builder__input" type="number" min="1" max="10" v-model.number="guests" />
          </label>
        </div>

        <label class="builder__label">
          Комментарий
          <textarea class="builder__input builder__textarea" rows="3" v-model="comment" placeholder="Что важно учесть?"></textarea>
        </label>

        <button class="builder__submit" type="submit">Сформировать план</button>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'

const emit = defineEmits(["update"])

const services = [
  { id: 1, name: "Экскурсия в «Братство лосей»", desc: "Тихий маршрут и живые истории природы.", price: 3500 },
  { id: 2, name: "Чайная церемония", desc: "Неспешный ритуал и вкус момента.", price: 2200 },
  { id: 3, name: "Утренние практики", desc: "Дыхание, внимание и мягкий старт дня.", price: 1500 },
  { id: 4, name: "Мастер-класс", desc: "Тёплая групповая практика.", price: 2000 },
  { id: 5, name: "Mindfulness", desc: "Фокус, устойчивость, восстановление.", price: 1800 },
  { id: 6, name: "Игра «Лила»", desc: "Глубокий диалог с собой.", price: 2800 },
]

const selectedIds = ref([])
const date = ref("")
const guests = ref(1)
const comment = ref("")

const selectedServices = computed(() =>
  services.filter((service) => selectedIds.value.includes(service.id))
)

const total = computed(() =>
  selectedServices.value.reduce((sum, service) => sum + service.price, 0)
)

const toggleService = (id) => {
  if (selectedIds.value.includes(id)) {
    selectedIds.value = selectedIds.value.filter((item) => item !== id)
  } else {
    selectedIds.value = [...selectedIds.value, id]
  }
}

const removeService = (id) => {
  selectedIds.value = selectedIds.value.filter((item) => item !== id)
}

const formatPrice = (value) => `${value.toLocaleString("ru-RU")} ₽`

watchEffect(() => {
  emit("update", {
    services: selectedServices.value,
    total: total.value,
    date: date.value,
    guests: guests.value,
    comment: comment.value,
  })
})
</script>

<style scoped>
.builder {
  --builder-glass: color-mix(in srgb, var(--card) 60%, transparent);
  --builder-border: rgba(255, 255, 255, 0.24);
  --builder-glow: rgba(202, 183, 157, 0.35);
  display: grid;
  grid-template-columns: minmax(0, 2.2fr) minmax(0, 1fr);
  gap: 24px;
}

.builder__header {
  margin-bottom: 18px;
}

.builder__eyebrow {
  margin: 0 0 6px;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.builder__headline {
  margin: 0 0 6px;
  font-size: 20px;
  color: var(--text-strong);
}

.builder__subhead {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
}

.builder__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.builder__card {
  background: var(--builder-glass);
  border: 1px solid var(--builder-border);
  border-radius: 18px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  box-shadow: 0 10px 20px rgba(16, 12, 8, 0.12);
  backdrop-filter: blur(16px);
  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
}

.builder__card:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--primary) 35%, var(--builder-border));
  box-shadow: 0 14px 24px rgba(16, 12, 8, 0.14);
}

.builder__card--selected {
  border-color: color-mix(in srgb, var(--primary) 55%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--primary) 45%, transparent), inset 0 0 18px var(--builder-glow), 0 12px 22px rgba(16, 12, 8, 0.12);
}

.builder__title {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 600;
}

.builder__desc {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.5;
}

.builder__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.builder__price {
  font-weight: 600;
  font-size: 13px;
  color: var(--text-strong);
}

.builder__toggle {
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.08);
  color: var(--text);
  border-radius: 999px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 12.5px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: border-color 200ms ease, background 200ms ease, transform 200ms ease;
}

.builder__toggle:hover {
  transform: translateY(-1px);
  border-color: color-mix(in srgb, var(--primary) 35%, rgba(255, 255, 255, 0.35));
}

.builder__toggle--active {
  background: color-mix(in srgb, var(--primary) 22%, rgba(255, 255, 255, 0.1));
  border-color: color-mix(in srgb, var(--primary) 50%, rgba(255, 255, 255, 0.35));
}

.builder__toggle-icon {
  font-size: 14px;
  line-height: 1;
}

.builder__aside {
  display: grid;
  gap: 16px;
}

.builder__block {
  background: var(--builder-glass);
  border: 1px solid var(--builder-border);
  border-radius: 18px;
  padding: 18px;
  display: grid;
  gap: 14px;
  box-shadow: 0 12px 22px rgba(16, 12, 8, 0.12);
  backdrop-filter: blur(16px);
}

.builder__block-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.builder__block-head h4 {
  margin: 0;
  font-size: 16px;
}

.builder__list {
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
  list-style: none;
  color: var(--muted);
  font-size: 13px;
}

.builder__list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.builder__list-meta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-strong);
  font-size: 12.5px;
}

.builder__remove {
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.08);
  color: var(--text);
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  line-height: 1;
  transition: border-color 200ms ease, background 200ms ease, transform 200ms ease;
}

.builder__remove:hover {
  transform: translateY(-1px);
  border-color: color-mix(in srgb, var(--primary) 40%, rgba(255, 255, 255, 0.35));
}

.builder__empty {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
}

.builder__total {
  font-weight: 700;
  font-size: 18px;
  color: var(--text-strong);
}

.builder__row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.builder__label {
  display: grid;
  gap: 6px;
  font-size: 13px;
  color: var(--muted);
}

.builder__input {
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 9px 12px;
  color: var(--text);
  font-size: 13px;
}

.builder__textarea {
  resize: vertical;
}

.builder__submit {
  border: none;
  border-radius: 999px;
  padding: 12px 16px;
  background: linear-gradient(135deg, #c8b89f, #b7a58c);
  color: #2b2520;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
  box-shadow: 0 10px 18px rgba(20, 15, 10, 0.16);
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.builder__submit:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 22px rgba(20, 15, 10, 0.18);
}

@media (max-width: 980px) {
  .builder {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .builder__grid {
    grid-template-columns: 1fr;
  }

  .builder__row {
    grid-template-columns: 1fr;
  }
}
</style>
