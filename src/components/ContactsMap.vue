<template>
  <section class="contacts-map">
    <div class="contacts-map__head">
      <h2 class="contacts-map__title">Контакты</h2>
      <p class="contacts-map__subtitle">Как нас найти и связаться.</p>
    </div>

    <div class="contacts-map__grid">
      <div class="contacts-map__card">
        <iframe
          class="contacts-map__frame"
          src="https://yandex.com/map-widget/v1/?ll=4.892559%2C52.373059&z=10"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen
          title="Карта — Коноково"
        ></iframe>

        <a
          class="contacts-map__cta"
          href="https://yandex.com/maps/-/CCU05ZxoWA"
          target="_blank"
          rel="noopener"
        >
          Открыть в Яндекс Картах
        </a>
      </div>

      <div class="contacts-map__info">
        <div class="contacts-map__info-block">
          <p class="contacts-map__label">Адрес</p>
          <p class="contacts-map__value">
            Тверская область, Конаковский район, природный кластер «Новое Коноково».
          </p>
        </div>
        <div class="contacts-map__info-block">
          <p class="contacts-map__label">Телефон</p>
          <p class="contacts-map__value">+7 (999) 000-00-00</p>
        </div>
        <div class="contacts-map__info-block">
          <p class="contacts-map__label">Email</p>
          <p class="contacts-map__value">hello@novoe-konakovo.ru</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contacts-map {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 24px 80px;
  display: grid;
  gap: 18px;
  color: var(--text);
}

.contacts-map__head {
  display: grid;
  gap: 6px;
}

.contacts-map__title {
  margin: 0;
  font-size: 22px;
  color: var(--text-strong);
}

.contacts-map__subtitle {
  margin: 0;
  font-size: 13px;
  color: var(--muted);
}

.contacts-map__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  gap: 18px;
}

.contacts-map__card {
  background: color-mix(in srgb, var(--card) 78%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 85%, rgba(255, 255, 255, 0.2));
  border-radius: 18px;
  padding: 14px;
  display: grid;
  gap: 12px;
  box-shadow: 0 16px 30px var(--shadow);
  backdrop-filter: blur(16px);
}

.contacts-map__frame {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 0;
  border-radius: 16px;
}

.contacts-map__cta {
  justify-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 999px;
  background: var(--primary-soft);
  color: var(--text-strong);
  text-decoration: none;
  font-size: 13px;
  border: 1px solid var(--border);
  transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
}

.contacts-map__cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 18px var(--shadow);
  background: color-mix(in srgb, var(--primary) 18%, var(--primary-soft));
}

.contacts-map__info {
  background: color-mix(in srgb, var(--card) 70%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 85%, rgba(255, 255, 255, 0.2));
  border-radius: 18px;
  padding: 16px;
  display: grid;
  gap: 14px;
  box-shadow: 0 14px 26px var(--shadow);
  backdrop-filter: blur(16px);
}

.contacts-map__info-block {
  display: grid;
  gap: 4px;
}

.contacts-map__label {
  margin: 0;
  font-size: 12px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.contacts-map__value {
  margin: 0;
  font-size: 14px;
  color: var(--text);
  line-height: 1.5;
}

@media (max-width: 900px) {
  .contacts-map__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .contacts-map__frame {
    aspect-ratio: 4 / 5;
  }
}
</style>
