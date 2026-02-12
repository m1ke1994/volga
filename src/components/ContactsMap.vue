<script setup>
import { computed, ref } from 'vue'

import { parseJsonField } from '../api/client'
import { usePage } from '../composables/usePage'
import { useSection } from '../composables/useSection'
import api from '../services/api'
import StatusModal from './ui/StatusModal.vue'

const { data: contactsPage } = usePage('contacts')
const { data: footerSection } = useSection('footer')

const fallbackContacts = {
  title: 'Контакты',
  subtitle: 'Как нас найти и связаться.',
  address: 'Тверская область, Конаковский район, природный кластер «Новое Конаково».',
  phone: '+7 (999) 000-00-00',
  email: 'hello@novoe-konakovo.ru',
  telegram: '@username',
  mapEmbed: 'https://yandex.com/map-widget/v1/?ll=4.892559%2C52.373059&z=10',
  mapLink: 'https://yandex.com/maps/-/CCU05ZxoWA',
}

const contactsContent = computed(() => {
  const pageContent = parseJsonField(contactsPage.value?.content, {})
  const contacts = pageContent.contacts || {}
  return {
    ...fallbackContacts,
    title: contactsPage.value?.title || fallbackContacts.title,
    subtitle: pageContent.subtitle || fallbackContacts.subtitle,
    address: contacts.address || fallbackContacts.address,
    phone: footerSection.value?.phone || contacts.phone || fallbackContacts.phone,
    email: footerSection.value?.email || contacts.email || fallbackContacts.email,
    telegram: footerSection.value?.telegram || contacts.telegram || fallbackContacts.telegram,
    mapEmbed: contacts.mapEmbed || fallbackContacts.mapEmbed,
    mapLink: contacts.mapLink || fallbackContacts.mapLink,
  }
})

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const isStatusModalOpen = ref(false)
const statusModalTitle = ref('')
const statusModalMessage = ref('')
const statusModalVariant = ref('success')

const openStatusModal = (title, message, variant = 'success') => {
  statusModalTitle.value = title
  statusModalMessage.value = message
  statusModalVariant.value = variant
  isStatusModalOpen.value = true
}

const handleSubmit = async (event) => {
  const form = event.target
  form.classList.add('is-submitted')
  if (!form.checkValidity()) return

  const formData = new FormData(form)
  const name = String(formData.get('name') || '').trim()
  const contact = String(formData.get('contact') || '').trim()
  const message = String(formData.get('message') || '').trim()

  const payload = {
    name,
    phone: null,
    email: null,
    message,
  }

  if (isEmail(contact)) {
    payload.email = contact
  } else if (contact) {
    payload.phone = contact
  }

  if (!payload.phone && !payload.email) return

  try {
    await api.post('/contact-requests/', payload)

    form.reset()
    form.classList.remove('is-submitted')
    openStatusModal('Заявка отправлена', 'Ваша заявка отправлена', 'success')
  } catch {
    openStatusModal('Ошибка отправки', 'Не удалось отправить заявку. Попробуйте еще раз.', 'error')
  }
}
</script>

<template>
  <section class="contacts">
    <div class="contacts__head">
      <h2 class="contacts__title">{{ contactsContent.title }}</h2>
      <p class="contacts__subtitle">{{ contactsContent.subtitle }}</p>
    </div>

    <div class="contacts__grid">
      <div class="contacts__column">
        <div class="contacts__card glass-card">
          <div class="contacts__list">
            <div class="contacts__item">
              <span class="contacts__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </span>
              <div>
                <p class="contacts__label">Адрес</p>
                <p class="contacts__value">{{ contactsContent.address }}</p>
              </div>
            </div>

            <div class="contacts__item">
              <span class="contacts__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M4.5 6.5c0 6.6 5.4 12 12 12h2.5a1 1 0 0 0 1-1v-3.2a1 1 0 0 0-.76-.97l-3.1-.78a1 1 0 0 0-1.05.43l-1 1.5a10.7 10.7 0 0 1-4.6-4.6l1.5-1a1 1 0 0 0 .43-1.05l-.78-3.1A1 1 0 0 0 9 4.5H5.5a1 1 0 0 0-1 1v1z" />
                </svg>
              </span>
              <div>
                <p class="contacts__label">Телефон</p>
                <p class="contacts__value">{{ contactsContent.phone }}</p>
              </div>
            </div>

            <div class="contacts__item">
              <span class="contacts__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
                  <path d="m22 8-10 6L2 8" />
                </svg>
              </span>
              <div>
                <p class="contacts__label">Email</p>
                <p class="contacts__value">{{ contactsContent.email }}</p>
              </div>
            </div>

            <div class="contacts__item">
              <span class="contacts__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M21.5 4.5 3.3 11.5c-.8.3-.8 1.4.1 1.6l4.6 1.3 1.6 4.9c.2.9 1.4 1 1.8.2l2.5-4.2 4.8 3.4c.8.5 1.8.1 2-.8l2.6-11.6c.2-.9-.7-1.6-1.6-1.3z" />
                </svg>
              </span>
              <div>
                <p class="contacts__label">Telegram</p>
                <p class="contacts__value">{{ contactsContent.telegram }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="contacts__card contacts__card--map glass-card">
          <iframe
            class="contacts__frame"
            :src="contactsContent.mapEmbed"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
            title="Карта — Конаково"
          ></iframe>

          <a class="contacts__cta" :href="contactsContent.mapLink" target="_blank" rel="noopener">
            Открыть в Яндекс Картах
          </a>
        </div>
      </div>

      <form class="contacts__form glass-card" novalidate @submit.prevent="handleSubmit">
        <label class="contacts__field">
          <span class="contacts__field-label">Имя</span>
          <input class="contacts__input" type="text" name="name" placeholder=" " autocomplete="name" required />
        </label>

        <label class="contacts__field">
          <span class="contacts__field-label">Телефон или Email</span>
          <input class="contacts__input" type="text" name="contact" placeholder=" " autocomplete="email" required />
        </label>

        <label class="contacts__field">
          <span class="contacts__field-label">Сообщение</span>
          <textarea class="contacts__input contacts__input--area" name="message" rows="5" placeholder=" " required></textarea>
        </label>

        <button class="contacts__submit" type="submit">Отправить</button>
      </form>
    </div>

    <StatusModal
      v-model="isStatusModalOpen"
      :title="statusModalTitle"
      :message="statusModalMessage"
      :variant="statusModalVariant"
    />
  </section>
</template>

<style scoped>
.contacts {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 24px 80px;
  display: grid;
  gap: 20px;
  color: var(--text);
}

.contacts__head {
  display: grid;
  gap: 6px;
}

.contacts__title {
  margin: 0;
  font-size: 22px;
  color: var(--text-strong);
}

.contacts__subtitle {
  margin: 0;
  font-size: 13px;
  color: var(--muted);
}

.contacts__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 20px;
  align-items: start;
}

.contacts__column {
  display: grid;
  gap: 18px;
}

.contacts__card {
  padding: 18px;
  display: grid;
  gap: 16px;
}

.contacts__list {
  display: grid;
  gap: 14px;
}

.contacts__item {
  display: grid;
  grid-template-columns: 36px 1fr;
  gap: 12px;
  align-items: start;
}

.contacts__icon {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in srgb, var(--bg-elevated) 65%, transparent);
  color: var(--text-strong);
  border: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35);
}

.contacts__label {
  margin: 0 0 4px;
  font-size: 12px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.contacts__value {
  margin: 0;
  font-size: 14px;
  color: var(--text);
  line-height: 1.5;
}

.contacts__card--map {
  padding: 14px;
}

.contacts__frame {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 0;
  border-radius: 16px;
}

.contacts__cta {
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

.contacts__cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 18px var(--shadow);
  background: color-mix(in srgb, var(--primary) 18%, var(--primary-soft));
}

.contacts__form {
  padding: 22px;
  display: grid;
  gap: 16px;
}

.contacts__field {
  display: grid;
  gap: 8px;
}

.contacts__field-label {
  font-size: 12px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.contacts__input {
  width: 100%;
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
  background: color-mix(in srgb, var(--bg-elevated) 70%, transparent);
  padding: 12px 14px;
  font-size: 14px;
  color: var(--text);
  outline: none;
  transition: border-color 200ms ease, box-shadow 200ms ease, background 200ms ease;
}

.contacts__input--area {
  resize: vertical;
  min-height: 130px;
}

.contacts__input:focus-visible {
  border-color: color-mix(in srgb, var(--primary) 60%, var(--border));
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 20%, transparent);
  background: color-mix(in srgb, var(--bg-elevated) 82%, transparent);
}

.contacts__form.is-submitted .contacts__input:invalid {
  border-color: color-mix(in srgb, #c46a5f 60%, var(--border));
  box-shadow: 0 0 0 3px color-mix(in srgb, #c46a5f 20%, transparent);
}

.contacts__submit {
  justify-self: flex-start;
  border: none;
  border-radius: 999px;
  padding: 10px 18px;
  background: linear-gradient(135deg, #c8b89f, #b7a58c);
  color: #2b2520;
  cursor: pointer;
  font-size: 13px;
  box-shadow: 0 12px 24px var(--shadow);
  transition: transform 200ms ease, box-shadow 200ms ease, filter 200ms ease;
}

.contacts__submit:hover {
  transform: translateY(-1px);
  box-shadow: 0 16px 30px var(--shadow);
  filter: brightness(1.02);
}

@media (max-width: 900px) {
  .contacts__grid {
    grid-template-columns: 1fr;
  }

  .contacts__submit {
    width: 100%;
    justify-self: stretch;
  }
}

@media (max-width: 640px) {
  .contacts__frame {
    aspect-ratio: 4 / 5;
  }
}
</style>
