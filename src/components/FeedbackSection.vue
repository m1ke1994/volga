<template>
  <div class="feedback">
    <div class="feedback__surface">
      <form class="feedback__form" @submit.prevent="handleSubmit">
        <ServiceBuilder @update="handleBuilderUpdate" />

        <!-- Контакты для связи -->
        <div class="feedback__contact">
          <div class="feedback__contact-head">
            <h3 class="feedback__contact-title">Контакт для связи</h3>
            <p class="feedback__contact-subtitle">
              Оставьте имя и удобный способ связи — чтобы мы могли уточнить детали.
            </p>
          </div>

          <div class="feedback__contact-grid">
            <label class="field">
              <span class="field__label">Имя</span>
              <input
                v-model.trim="builderData.name"
                class="field__input"
                type="text"
                placeholder="Например: Елизавета"
                autocomplete="name"
              />
            </label>

            <label class="field">
              <span class="field__label">Телефон или Telegram</span>
              <input
                v-model.trim="builderData.contact"
                class="field__input"
                type="text"
                placeholder="+7 (999) 000-00-00 или @username"
                autocomplete="tel"
                inputmode="tel"
              />
            </label>
          </div>

          <div class="feedback__actions">
            <button class="btn btn--compact" type="submit">
              Сформировать план
            </button>

            <p class="feedback__hint">
              Ничего не отправляется — это mock. Мы просто соберём мини-резюме.
            </p>
          </div>
        </div>
      </form>
    </div>

    <div v-if="preview" class="feedback__preview">
      <div class="feedback__preview-head">
        <h3>Мини-резюме плана</h3>
        <span class="feedback__preview-total">{{ formatPrice(preview.total) }}</span>
      </div>

      <div class="feedback__preview-grid">
        <div>
          <p class="feedback__preview-label">Имя</p>
          <p class="feedback__preview-value">{{ preview.name || "—" }}</p>
        </div>
        <div>
          <p class="feedback__preview-label">Контакт</p>
          <p class="feedback__preview-value">{{ preview.contact || "—" }}</p>
        </div>
      </div>

      <div class="feedback__preview-grid">
        <div>
          <p class="feedback__preview-label">Дата визита</p>
          <p class="feedback__preview-value">{{ preview.date || "—" }}</p>
        </div>
        <div>
          <p class="feedback__preview-label">Гостей</p>
          <p class="feedback__preview-value">{{ preview.guests }}</p>
        </div>
      </div>

      <div>
        <p class="feedback__preview-label">Услуги</p>
        <p class="feedback__preview-value">
          {{ preview.services.length ? preview.services.map((s) => s.name).join(", ") : "—" }}
        </p>
      </div>

      <div>
        <p class="feedback__preview-label">Комментарий</p>
        <p class="feedback__preview-value">{{ preview.comment || "—" }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ServiceBuilder from "./ServiceBuilder.vue";

const builderData = ref({
  services: [],
  total: 0,
  date: "",
  guests: 1,
  comment: "",
  name: "",
  contact: "",
});

const preview = ref(null);

const handleBuilderUpdate = (payload) => {
  // сохраняем всё, что пришло от билдера, но не теряем name/contact
  builderData.value = {
    ...builderData.value,
    ...payload,
  };
};

const formatPrice = (value) => `${Number(value || 0).toLocaleString("ru-RU")} ₽`;

const handleSubmit = () => {
  const payload = { ...builderData.value };
  preview.value = payload;

  // TODO: remove before production.
  console.log(payload);
};
</script>

<style scoped>
.feedback {
  --feedback-gradient: linear-gradient(
    135deg,
    color-mix(in srgb, var(--card) 65%, transparent),
    color-mix(in srgb, var(--bg) 55%, transparent)
  );
  --feedback-border: color-mix(in srgb, var(--border) 70%, rgba(255, 255, 255, 0.2));
  --feedback-surface: color-mix(in srgb, var(--card) 70%, transparent);
  --feedback-input: color-mix(in srgb, var(--bg-elevated) 70%, transparent);
  --feedback-shadow: rgba(20, 15, 10, 0.1);
  display: grid;
  gap: 24px;
}

.feedback__surface {
  background: var(--feedback-gradient);
  border-radius: 24px;
  padding: 28px;
  border: 1px solid var(--feedback-border);
  box-shadow: 0 18px 40px var(--feedback-shadow);
}

.feedback__form {
  margin: 0;
  display: grid;
  gap: 18px;
}

/* Контактный блок */
.feedback__contact {
  border-radius: 18px;
  padding: 16px;
  background: var(--feedback-surface);
  border: 1px solid var(--feedback-border);
  backdrop-filter: blur(10px);
  box-shadow: 0 12px 24px var(--feedback-shadow);
}

.feedback__contact-head {
  margin-bottom: 12px;
}

.feedback__contact-title {
  margin: 0;
  font-size: 16px;
  color: var(--text-strong);
}

.feedback__contact-subtitle {
  margin: 6px 0 0;
  font-size: 13px;
  color: var(--muted);
  line-height: 1.45;
}

.feedback__contact-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

/* Поля */
.field {
  display: grid;
  gap: 6px;
}

.field__label {
  font-size: 12px;
  color: var(--muted);
}

.field__input {
  height: 42px;
  padding: 0 12px;
  border-radius: 12px;
  border: 1px solid var(--feedback-border);
  background: var(--feedback-input);
  color: var(--text);
  outline: none;
}

.field__input:focus {
  border-color: color-mix(in srgb, var(--primary) 45%, var(--feedback-border));
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 18%, transparent);
}

/* Кнопка */
.feedback__actions {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
  flex-wrap: wrap;
}

.btn {
  border: 0;
  cursor: pointer;
  border-radius: 999px;
  padding: 10px 14px;
  font-weight: 650;
  background: color-mix(in srgb, var(--text-strong) 88%, transparent);
  color: color-mix(in srgb, var(--bg) 85%, white);
}

.btn--compact {
  padding: 9px 14px; /* меньше, чем было */
  font-size: 13px;
  letter-spacing: 0.01em;
}

.feedback__hint {
  margin: 0;
  font-size: 12px;
  color: var(--muted);
}

/* Preview */
.feedback__preview {
  background: color-mix(in srgb, var(--card) 78%, transparent);
  border: 1px solid var(--feedback-border);
  border-radius: 20px;
  padding: 20px 22px;
  display: grid;
  gap: 12px;
  box-shadow: 0 14px 26px var(--feedback-shadow);
  backdrop-filter: blur(12px);
}

:global([data-theme="dark"]) .feedback {
  --feedback-gradient: linear-gradient(
    135deg,
    color-mix(in srgb, var(--card) 80%, transparent),
    color-mix(in srgb, var(--bg) 70%, transparent)
  );
  --feedback-border: color-mix(in srgb, var(--border) 85%, rgba(0, 0, 0, 0.4));
  --feedback-surface: color-mix(in srgb, var(--card) 85%, transparent);
  --feedback-input: color-mix(in srgb, var(--bg-elevated) 85%, transparent);
  --feedback-shadow: rgba(0, 0, 0, 0.35);
}

.feedback__preview-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.feedback__preview-head h3 {
  margin: 0;
  font-size: 18px;
}

.feedback__preview-total {
  font-weight: 700;
  font-size: 18px;
  color: var(--text-strong);
}

.feedback__preview-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.feedback__preview-label {
  margin: 0 0 4px;
  font-size: 12px;
  color: var(--muted);
}

.feedback__preview-value {
  margin: 0;
  font-size: 14px;
  color: var(--text);
}

@media (max-width: 720px) {
  .feedback__surface {
    padding: 20px;
  }

  .feedback__contact-grid {
    grid-template-columns: 1fr;
  }

  .feedback__preview-grid {
    grid-template-columns: 1fr;
  }

  .feedback__preview-head {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
