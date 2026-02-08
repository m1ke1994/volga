<template>
  <div class="builder">
    <div class="builder__grid">
      <article v-for="service in services" :key="service.id" class="builder__card">
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
            {{ selectedIds.includes(service.id) ? "Убрать" : "Добавить" }}
          </button>
        </div>
      </article>
    </div>

    <div class="builder__aside">
      <div class="builder__block">
        <h4>Ваш план</h4>
        <ul v-if="selectedServices.length" class="builder__list">
          <li v-for="service in selectedServices" :key="service.id">
            {{ service.name }} — {{ formatPrice(service.price) }}
          </li>
        </ul>
        <p v-else class="builder__empty">Выберите услуги, чтобы собрать план.</p>
        <div class="builder__total">Итого: {{ formatPrice(total) }}</div>
      </div>

      <div class="builder__block">
        <label class="builder__label">
          Дата
          <input class="builder__input" type="date" v-model="date" />
        </label>
        <label class="builder__label">
          Гости
          <input class="builder__input" type="number" min="1" max="10" v-model.number="guests" />
        </label>
      </div>
    </div>
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

const formatPrice = (value) => `от ${value.toLocaleString("ru-RU")} ₽`

watchEffect(() => {
  emit("update", {
    services: selectedServices.value,
    total: total.value,
    date: date.value,
    guests: guests.value,
  })
})
</script>

<style scoped>
.builder {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  gap: 20px;
}

.builder__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.builder__card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  box-shadow: 0 10px 18px var(--shadow);
}

.builder__title {
  margin: 0 0 8px;
  font-size: 16px;
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
}

.builder__toggle {
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  color: var(--text);
  border-radius: 999px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 12.5px;
}

.builder__toggle--active {
  background: var(--primary-soft);
  border-color: var(--primary);
}

.builder__aside {
  display: grid;
  gap: 16px;
}

.builder__block {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 16px;
  display: grid;
  gap: 12px;
  box-shadow: 0 10px 18px var(--shadow);
}

.builder__list {
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 6px;
  color: var(--muted);
  font-size: 13px;
}

.builder__empty {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
}

.builder__total {
  font-weight: 700;
}

.builder__label {
  display: grid;
  gap: 6px;
  font-size: 13px;
  color: var(--muted);
}

.builder__input {
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  border-radius: 10px;
  padding: 8px 10px;
  color: var(--text);
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
}
</style>
