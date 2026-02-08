<template>
  <div class="feedback">
    <form class="feedback__form" @submit.prevent="handleSubmit">
      <label class="feedback__label">
        Имя
        <input v-model="form.name" class="feedback__input" type="text" placeholder="Ваше имя" required />
      </label>
      <label class="feedback__label">
        Контакт (телефон/telegram)
        <input v-model="form.contact" class="feedback__input" type="text" placeholder="@nickname или +7..." required />
      </label>
      <label class="feedback__label">
        Комментарий
        <textarea v-model="form.comment" class="feedback__input feedback__textarea" rows="4" placeholder="Что важно учесть?"></textarea>
      </label>

      <div class="feedback__builder">
        <ServiceBuilder @update="handleBuilderUpdate" />
      </div>

      <button class="feedback__submit" type="submit">Отправить заявку</button>
    </form>

    <div v-if="preview" class="feedback__preview">
      <h3>Предпросмотр заявки</h3>
      <p><strong>Имя:</strong> {{ preview.name }}</p>
      <p><strong>Контакт:</strong> {{ preview.contact }}</p>
      <p><strong>Комментарий:</strong> {{ preview.comment || "—" }}</p>
      <p><strong>Дата:</strong> {{ preview.date || "—" }}</p>
      <p><strong>Гости:</strong> {{ preview.guests }}</p>
      <p><strong>Услуги:</strong> {{ preview.services.length ? preview.services.map((s) => s.name).join(", ") : "—" }}</p>
      <p><strong>Сумма:</strong> {{ preview.total }} ₽</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ServiceBuilder from './ServiceBuilder.vue'

const form = ref({
  name: "",
  contact: "",
  comment: "",
})

const builderData = ref({
  services: [],
  total: 0,
  date: "",
  guests: 1,
})

const preview = ref(null)

const handleBuilderUpdate = (payload) => {
  builderData.value = payload
}

const handleSubmit = () => {
  const payload = {
    ...form.value,
    ...builderData.value,
  }
  preview.value = payload
  console.log(payload)
}
</script>

<style scoped>
.feedback {
  display: grid;
  gap: 24px;
}

.feedback__form {
  display: grid;
  gap: 16px;
}

.feedback__label {
  display: grid;
  gap: 6px;
  font-size: 13px;
  color: var(--muted);
}

.feedback__input {
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  border-radius: 12px;
  padding: 10px 12px;
  color: var(--text);
}

.feedback__textarea {
  resize: vertical;
}

.feedback__builder {
  margin-top: 10px;
}

.feedback__submit {
  border: none;
  border-radius: 999px;
  padding: 12px 18px;
  background: var(--primary);
  color: #2b2520;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 10px 20px var(--shadow);
}

.feedback__preview {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 10px 18px var(--shadow);
  display: grid;
  gap: 6px;
}

.feedback__preview h3 {
  margin: 0 0 6px;
}

@media (max-width: 720px) {
  .feedback__submit {
    width: 100%;
  }
}
</style>
