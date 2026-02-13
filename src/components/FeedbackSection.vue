<template>
  <div class="feedback">
    <div class="feedback__surface">
      <form class="feedback__form">
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
                :class="{ 'builder__card--selected': isServiceSelected(service) }"
              >
                <div class="builder__card-top">
                  <h3 class="builder__title">{{ service.title }}</h3>
                  <p class="builder__desc">{{ service.description }}</p>
                </div>

                <div class="builder__tariffs">
                  <article
                    v-for="tariff in service.tariffs"
                    :key="tariff.id"
                    class="builder__tariff"
                    :class="{ 'builder__tariff--active': selectedTariffIds.includes(tariff.id) }"
                  >
                    <div class="builder__tariff-head">
                      <h4 class="builder__tariff-title">{{ tariff.title }}</h4>
                      <span class="builder__price">{{ formatPrice(tariff.price) }}</span>
                    </div>
                    <p class="builder__tariff-desc">{{ tariff.description }}</p>

                    <button
                      class="builder__toggle"
                      type="button"
                      :class="{ 'builder__toggle--active': selectedTariffIds.includes(tariff.id) }"
                      @click="toggleTariff(tariff.id)"
                    >
                      <span class="builder__toggle-icon" aria-hidden="true">
                        {{ selectedTariffIds.includes(tariff.id) ? "✓" : "+" }}
                      </span>
                      <span class="builder__toggle-text">
                        {{ selectedTariffIds.includes(tariff.id) ? "Убрать" : "Выбрать" }}
                      </span>
                    </button>
                  </article>
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
            </div>
          </aside>
        </div>
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
        <p class="feedback__preview-label">Тарифы</p>
        <p class="feedback__preview-value">
          {{ preview.tariffs.length ? preview.tariffs.map((t) => `${t.serviceTitle} — ${t.title}`).join(", ") : "—" }}
        </p>
      </div>

      <div>
        <p class="feedback__preview-label">Комментарий</p>
        <p class="feedback__preview-value">{{ preview.comment || "—" }}</p>
      </div>

      <button class="feedback__preview-cta btn-primary" type="button" @click="handleConfirm">
        Согласовать план
      </button>

      <p class="feedback__preview-hint">
        Ничего не отправляется — mock. TODO: backend integration.
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { services } from "../data/services";

const selectedTariffIds = ref([]);
const date = ref("");
const guests = ref(1);
const comment = ref("");

const selectedTariffs = computed(() =>
  services.flatMap((service) =>
    service.tariffs
      .filter((tariff) => selectedTariffIds.value.includes(tariff.id))
      .map((tariff) => ({
        tariffId: tariff.id,
        title: tariff.title,
        price: tariff.price,
        serviceId: service.id,
        serviceTitle: service.title,
      }))
  )
);

const total = computed(() => selectedTariffs.value.reduce((sum, tariff) => sum + tariff.price, 0));

const isServiceSelected = (service) => service.tariffs.some((tariff) => selectedTariffIds.value.includes(tariff.id));

const preview = computed(() => ({
  tariffs: selectedTariffs.value,
  total: total.value,
  date: date.value,
  guests: guests.value,
  comment: comment.value,
}));

const toggleTariff = (tariffId) => {
  selectedTariffIds.value = selectedTariffIds.value.includes(tariffId)
    ? selectedTariffIds.value.filter((id) => id !== tariffId)
    : [...selectedTariffIds.value, tariffId];
};

const formatPrice = (value) => `${Number(value || 0).toLocaleString("ru-RU")} ₽`;

const handleConfirm = () => {
  const payload = { ...preview.value };
  // TODO: backend integration.
  console.log(payload);
};

onMounted(() => {
  if (typeof window === "undefined") return;
  const rawTariffId = window.localStorage.getItem("preferredTariffId");
  if (!rawTariffId) return;
  const tariffId = Number(rawTariffId);
  const hasTariff = services.some((service) => service.tariffs.some((tariff) => tariff.id === tariffId));
  if (hasTariff && !selectedTariffIds.value.includes(tariffId)) {
    selectedTariffIds.value = [...selectedTariffIds.value, tariffId];
  }
  window.localStorage.removeItem("preferredTariffId");
});
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
  padding: 8px 14px;
  width: auto;
  min-width: 240px;
  justify-self: end;
  font-weight: 650;
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

.feedback__preview-hint {
  margin: 0;
  font-size: 12px;
  color: var(--muted);
}

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

.builder__tariffs {
  display: grid;
  gap: 10px;
}

.builder__tariff {
  border-radius: 14px;
  padding: 12px;
  border: 1px solid color-mix(in srgb, var(--border) 75%, transparent);
  background: color-mix(in srgb, var(--bg-elevated) 70%, transparent);
  display: grid;
  gap: 8px;
}

.builder__tariff--active {
  border-color: color-mix(in srgb, var(--primary) 55%, var(--border));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--primary) 30%, transparent);
}

.builder__tariff-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.builder__tariff-title {
  margin: 0;
  font-size: 14px;
  color: var(--text-strong);
}

.builder__tariff-desc {
  margin: 0;
  font-size: 12.5px;
  line-height: 1.45;
  color: var(--muted);
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

@media (max-width: 980px) {
  .builder {
    grid-template-columns: 1fr;
  }

  .panel__grid {
    grid-template-columns: 1fr;
  }
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

  .builder__grid {
    grid-template-columns: 1fr;
  }
}
</style>
