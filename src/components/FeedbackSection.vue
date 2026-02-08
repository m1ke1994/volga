<template>
  <div class="feedback">
    <div class="feedback__surface">
      <form class="feedback__form">
        <ServiceBuilder @update="handleBuilderUpdate" />
      </form>
    </div>

    <div class="feedback__preview">
      <div class="feedback__preview-head">
        <h3>Мини-резюме плана</h3>
        <span class="feedback__preview-total">{{ formatPrice(preview.total) }}</span>
      </div>

      <div class="feedback__preview-grid">
        <div>
          <p class="feedback__preview-label">Дата визита</p>
          <p class="feedback__preview-value">{{ preview.date || "—" }}</p>
        </div>
        <div>
          <p class="feedback__preview-label">Гостей</p>
          <p class="feedback__preview-value">{{ preview.guests || "—" }}</p>
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

      <button class="feedback__preview-cta" type="button" @click="handleConfirm">
        Согласовать план
      </button>

      <p class="feedback__preview-hint">
        Ничего не отправляется — mock. TODO: backend integration.
      </p>
      </div>
    </div>
  
</template>

<script setup>
import { computed, ref } from "vue";
import ServiceBuilder from "./ServiceBuilder.vue";

const builderData = ref({
  services: [],
  total: 0,
  date: "",
  guests: 1,
  comment: "",
});

const preview = computed(() => builderData.value);

const handleBuilderUpdate = (payload) => {
  builderData.value = payload;
};

const formatPrice = (value) => `${Number(value || 0).toLocaleString("ru-RU")} ₽`;

const handleConfirm = () => {
  const payload = { ...builderData.value };
  // TODO: backend integration.
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

.feedback__preview-cta {
  border: 0;
  cursor: pointer;
  border-radius: 999px;
  padding: 8px 14px;
  width: auto;
  min-width: 240px;
  justify-self: end;
  font-weight: 650;
  background: color-mix(in srgb, var(--text-strong) 88%, transparent);
  color: color-mix(in srgb, var(--bg) 85%, white);
  box-shadow: 0 12px 22px var(--feedback-shadow);
  transition: transform 200ms ease, box-shadow 200ms ease;
}

@media (min-width: 900px) {
  .feedback__preview-cta {
    padding: 10px 22px;
    font-size: 13px;
  }
}

@media (max-width: 720px) {
  .feedback__preview-cta {
    width: 100%;
    min-width: 0;
  }
}

.feedback__preview-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 26px var(--feedback-shadow);
}

.feedback__preview-hint {
  margin: 0;
  font-size: 12px;
  color: var(--muted);
}

@media (max-width: 720px) {
  .feedback__surface {
    padding: 20px;
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
