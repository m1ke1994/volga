<template>
  <form class="builder" method="post" action="/api/day-scenario-request/" @submit.prevent="handleSubmit">
    <section class="builder__column">
      <header class="builder__header">
        <p class="builder__eyebrow">Выбор форматов</p>
        <h3 class="builder__headline">{{ sectionTitle }}</h3>
        <p class="builder__subhead">Комбинируйте активности, чтобы получить идеальный ритм.</p>
      </header>

      <div class="builder__grid">
        <article
          v-for="service in services"
          :key="service.id"
          class="builder__card"
          :class="{ 'builder__card--selected': selectedIds.includes(service.id) }"
        >
          <div class="builder__card-top">
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
                {{ selectedIds.includes(service.id) ? '✓' : '+' }}
              </span>
              <span class="builder__toggle-text">
                {{ selectedIds.includes(service.id) ? 'Убрать' : 'Добавить' }}
              </span>
            </button>
          </div>
        </article>
      </div>
    </section>

    <aside class="builder__aside">
      <div class="panel">
        <div class="panel__head">
          <p class="panel__eyebrow">Параметры визита</p>
          <h4 class="panel__title">Детали</h4>
        </div>

        <div class="panel__grid">
          <label class="field">
            <span class="field__label">Дата визита</span>
            <div class="field__control">
              <input class="field__input" type="date" v-model="date" />
            </div>
          </label>

          <label class="field">
            <span class="field__label">Гостей</span>
            <div class="field__control">
              <input class="field__input" type="number" min="1" max="10" v-model.number="guests" />
            </div>
          </label>
        </div>

        <label class="field field--full">
          <span class="field__label">Имя</span>
          <div class="field__control">
            <input
              class="field__input"
              type="text"
              v-model.trim="name"
              placeholder="Как к вам обращаться"
              autocomplete="name"
            />
          </div>
        </label>

        <label class="field field--full">
          <span class="field__label">Почта или телефон</span>
          <div class="field__control">
            <input
              class="field__input"
              type="text"
              v-model.trim="contact"
              placeholder="name@example.com или +7..."
              autocomplete="email"
            />
          </div>
        </label>

        <label class="field field--full">
          <span class="field__label">Комментарий</span>
          <div class="field__control">
            <textarea
              class="field__input field__textarea"
              rows="4"
              v-model="comment"
              placeholder="Например: хотим спокойный ритм, без спешки. Важно учесть…"
            ></textarea>
          </div>
        </label>

        <p class="panel__note">План обновляется автоматически — ничего нажимать не нужно.</p>

        <button class="panel__submit" type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Отправка...' : 'Отправить сценарий' }}
        </button>
      </div>
    </aside>

    <StatusModal
      v-model="isStatusModalOpen"
      title="Заявка отправлена"
      message="Спасибо, ваш сценарий дня отправлен."
      variant="success"
    />
  </form>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'

import { parseJsonField } from '../api/client'
import { useSection } from '../composables/useSection'
import StatusModal from './ui/StatusModal.vue'

const emit = defineEmits(['update'])

const { data: dayScenarioSection } = useSection('day-scenario')

const fallbackServices = [
  { id: 1, name: 'Экскурсия в «Братство лосей»', desc: 'Тихий маршрут и живые истории природы.', price: 3500 },
  { id: 2, name: 'Чайная церемония', desc: 'Неспешный ритуал и вкус момента.', price: 2200 },
  { id: 3, name: 'Утренние практики', desc: 'Дыхание, внимание и мягкий старт дня.', price: 1500 },
]

const sectionTitle = computed(() => dayScenarioSection.value?.title || 'Собери сценарий дня')

const services = computed(() => {
  const items = parseJsonField(dayScenarioSection.value?.scenario_items_json, fallbackServices)
  if (!Array.isArray(items) || !items.length) return fallbackServices
  return items.map((item) => ({
    id: item.id,
    name: item.name || item.title || 'Формат',
    desc: item.desc || item.description || '',
    price: Number(item.price || 0),
  }))
})

const selectedIds = ref([])
const date = ref('')
const guests = ref(1)
const name = ref('')
const contact = ref('')
const comment = ref('')
const isSubmitting = ref(false)
const isStatusModalOpen = ref(false)

const selectedServices = computed(() => services.value.filter((s) => selectedIds.value.includes(s.id)))
const total = computed(() => selectedServices.value.reduce((sum, s) => sum + Number(s.price || 0), 0))

const toggleService = (id) => {
  selectedIds.value = selectedIds.value.includes(id)
    ? selectedIds.value.filter((x) => x !== id)
    : [...selectedIds.value, id]
}

const formatPrice = (value) => `${Number(value || 0).toLocaleString('ru-RU')} ₽`
const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const handleSubmit = async () => {
  const normalizedName = name.value.trim()
  const normalizedContact = contact.value.trim()

  if (!normalizedName) {
    console.error('Failed to submit day scenario request: name is required')
    return
  }

  if (!normalizedContact) {
    console.error('Failed to submit day scenario request: email or phone is required')
    return
  }

  const payload = {
    name: normalizedName,
    email: isEmail(normalizedContact) ? normalizedContact : null,
    phone: isEmail(normalizedContact) ? null : normalizedContact,
    services: selectedServices.value.map((service) => ({
      id: service.id,
      name: service.name,
      desc: service.desc,
      price: Number(service.price || 0),
    })),
    total: Number(total.value || 0),
    date: date.value || null,
    guests: Number(guests.value || 1),
    comment: comment.value || '',
  }

  isSubmitting.value = true

  try {
    const response = await fetch('/api/day-scenario-request/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    isStatusModalOpen.value = true
    reset()
  } catch (error) {
    console.error('Failed to submit day scenario request', error)
  } finally {
    isSubmitting.value = false
  }
}

const reset = () => {
  selectedIds.value = []
  date.value = ''
  guests.value = 1
  name.value = ''
  contact.value = ''
  comment.value = ''
}

defineExpose({ reset })

watchEffect(() => {
  emit('update', {
    services: selectedServices.value,
    total: total.value,
    date: date.value,
    guests: guests.value,
    name: name.value,
    contact: contact.value,
    comment: comment.value,
  })
})
</script>

<style scoped>
.builder {
  --glass: color-mix(in srgb, var(--card) 62%, transparent);
  --border: rgba(255, 255, 255, 0.22);
  --shadow: rgba(16, 12, 8, 0.12);
  --shadow-strong: rgba(16, 12, 8, 0.16);
  --glow: rgba(202, 183, 157, 0.35);

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
  background: var(--glass);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  box-shadow: 0 10px 20px var(--shadow);
  backdrop-filter: blur(16px);
  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
}

.builder__card:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--primary) 35%, var(--border));
  box-shadow: 0 14px 24px var(--shadow-strong);
}

.builder__card--selected {
  border-color: color-mix(in srgb, var(--primary) 55%, transparent);
  box-shadow:
    inset 0 0 0 1px color-mix(in srgb, var(--primary) 45%, transparent),
    inset 0 0 18px var(--glow),
    0 12px 22px var(--shadow);
}

.builder__title {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 650;
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
  font-weight: 650;
  font-size: 13px;
  color: var(--text-strong);
}

.builder__toggle {
  border: 1px solid rgba(255, 255, 255, 0.32);
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
  border-color: color-mix(in srgb, var(--primary) 35%, rgba(255, 255, 255, 0.32));
}
.builder__toggle--active {
  background: color-mix(in srgb, var(--primary) 22%, rgba(255, 255, 255, 0.1));
  border-color: color-mix(in srgb, var(--primary) 50%, rgba(255, 255, 255, 0.32));
}
.builder__toggle-icon {
  font-size: 14px;
  line-height: 1;
}

.builder__aside {
  display: grid;
  gap: 16px;
}

.panel {
  background: var(--glass);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 16px;
  display: grid;
  gap: 14px;
  box-shadow: 0 12px 22px var(--shadow);
  backdrop-filter: blur(16px);
}

.panel__head {
  display: grid;
  gap: 4px;
}
.panel__eyebrow {
  margin: 0;
  font-size: 11.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}
.panel__title {
  margin: 0;
  font-size: 14px;
  color: var(--text-strong);
  font-weight: 650;
}

.panel__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 120px;
  gap: 12px;
}

.field {
  display: grid;
  gap: 6px;
  min-width: 0;
}
.field--full {
  margin-top: 2px;
}

.field__label {
  font-size: 12px;
  color: var(--muted);
}

.field__control {
  position: relative;
}

.field__input {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.32);
  background: rgba(255, 255, 255, 0.10);
  border-radius: 12px;
  padding: 10px 12px;
  color: var(--text);
  font-size: 13px;
  outline: none;
  transition: border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
}

.field__input:focus {
  border-color: color-mix(in srgb, var(--primary) 38%, rgba(255, 255, 255, 0.32));
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 18%, transparent);
  background: rgba(255, 255, 255, 0.12);
}

.field__textarea {
  resize: vertical;
  min-height: 104px;
  line-height: 1.45;
}

.panel__note {
  margin: 0;
  font-size: 12px;
  color: var(--muted);
}

.panel__submit {
  border: 0;
  border-radius: 999px;
  padding: 10px 16px;
  cursor: pointer;
  justify-self: start;
  font-size: 13px;
  font-weight: 650;
  background: color-mix(in srgb, var(--text-strong) 88%, transparent);
  color: color-mix(in srgb, var(--bg) 85%, white);
  box-shadow: 0 12px 22px var(--shadow);
  transition: transform 200ms ease, box-shadow 200ms ease, opacity 200ms ease;
}

.panel__submit:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 14px 24px var(--shadow-strong);
}

.panel__submit:disabled {
  opacity: 0.72;
  cursor: default;
}

@media (max-width: 980px) {
  .builder {
    grid-template-columns: 1fr;
  }
  .panel__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .builder__grid {
    grid-template-columns: 1fr;
  }
}
</style>
