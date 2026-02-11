<template>
  <footer class="footer">
    <div class="footer__glass">
      <div class="footer__inner">
        <div class="footer__grid">
          <div class="footer__brand">
            <div class="footer__logo">{{ footerLogo }}</div>
            <p class="footer__tagline">{{ footerTagline }}</p>
          </div>

          <nav class="footer__nav" aria-label="Навигация">
            <router-link v-for="item in navLinks" :key="item.to" class="footer__link" :to="item.to">{{ item.label }}</router-link>
          </nav>

          <div class="footer__contacts">
            <div class="footer__contact-item">
              <span class="footer__label">Телефон</span>
              <span>{{ phone }}</span>
            </div>
            <div class="footer__contact-item">
              <span class="footer__label">Email</span>
              <span>{{ email }}</span>
            </div>
            <div class="footer__contact-item">
              <span class="footer__label">Telegram</span>
              <span>{{ telegram }}</span>
            </div>
          </div>
        </div>

        <div class="footer__bottom">
          <span>{{ copyrightText || `© ${year} ${footerLogo}. Все права защищены.` }}</span>
          <div class="footer__bottom-links">
            <router-link class="footer__link footer__link--small" :to="privacyTo">Политика</router-link>
            <router-link class="footer__link footer__link--small" :to="termsTo">Условия</router-link>
            <button class="footer__to-top" type="button" @click="scrollToTop">↑</button>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

import { parseJsonField } from '../api/client'
import { useSection } from '../composables/useSection'

const year = new Date().getFullYear()

const { data: footerSection } = useSection('footer')

const footerLogo = computed(() => footerSection.value?.logo_text || 'Новое Конаково')
const footerTagline = computed(() => footerSection.value?.tagline || 'Тихий отдых • Природа • Внимание к деталям')
const phone = computed(() => footerSection.value?.phone || '+7 (999) 000-00-00')
const email = computed(() => footerSection.value?.email || 'hello@example.com')
const telegram = computed(() => footerSection.value?.telegram || '@username')
const copyrightText = computed(() => footerSection.value?.copyright_text || '')
const privacyTo = computed(() => footerSection.value?.privacy_to || '/privacy')
const termsTo = computed(() => footerSection.value?.terms_to || '/terms')

const navLinks = computed(() => {
  const fallback = [
    { label: 'Обо мне', href: '/about' },
    { label: 'Братство лосей', href: '/moose' },
    { label: 'Волонтерские программы', href: '/volunteer' },
    { label: 'Беговой клуб', href: '/running-club' },
    { label: 'Расписание занятий', href: '/schedule' },
    { label: 'Статьи', href: '/articles' },
    { label: 'Новости', href: '/news' },
    { label: 'Контакты', href: '/contacts' },
  ]
  const links = parseJsonField(footerSection.value?.nav_links_json, fallback)
  if (!Array.isArray(links) || !links.length) {
    return fallback.map((item) => ({ label: item.label, to: item.href }))
  }
  return links.map((item) => ({
    label: item.label || item.title || 'Раздел',
    to: item.href || item.to || '/',
  }))
})

const scrollToTop = () => {
  if (typeof window === 'undefined') return
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.footer {
  width: 100%;
  padding: 56px 16px 32px;
  background: var(--bg);
  color: var(--text);
}

.footer__glass {
  background: linear-gradient(
      140deg,
      color-mix(in srgb, var(--card) 82%, transparent),
      color-mix(in srgb, var(--bg) 35%, transparent),
      color-mix(in srgb, var(--card) 68%, transparent)
    );
  border: 1px solid color-mix(in srgb, var(--border) 72%, transparent);
  border-radius: 24px;
  box-shadow: 0 -16px 34px color-mix(in srgb, var(--shadow) 85%, transparent);
  backdrop-filter: blur(18px);
  position: relative;
  overflow: hidden;
}

.footer__glass::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 12% 0%, rgba(255, 255, 255, 0.16), transparent 55%),
    radial-gradient(circle at 90% 20%, rgba(255, 255, 255, 0.08), transparent 50%);
  opacity: 0.6;
  pointer-events: none;
}

.footer__glass::after {
  content: '';
  position: absolute;
  left: 8%;
  right: 8%;
  top: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    color-mix(in srgb, var(--border) 60%, transparent),
    transparent
  );
  pointer-events: none;
}

.footer__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 28px;
  display: grid;
  gap: 28px;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

.footer__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 36px;
  align-items: start;
}

.footer__logo {
  font-size: 26px;
  font-weight: 650;
  letter-spacing: -0.01em;
  color: var(--text-strong);
  margin-bottom: 8px;
}

.footer__tagline {
  margin: 0;
  color: var(--muted);
  font-size: 13.5px;
}

.footer__nav {
  display: grid;
  gap: 10px 18px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.footer__link {
  position: relative;
  color: var(--text);
  font-size: 12.5px;
  line-height: 1.65;
  padding-bottom: 2px;
  width: fit-content;
  opacity: 0.9;
}

.footer__link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 2px;
  background: color-mix(in srgb, var(--primary) 75%, transparent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 220ms ease;
}

.footer__link:hover::after,
.footer__link:focus-visible::after {
  transform: scaleX(1);
}

.footer__contacts {
  display: grid;
  gap: 12px;
  color: var(--text);
  font-size: 12.5px;
}

.footer__contact-item {
  display: grid;
  gap: 4px;
}

.footer__label {
  font-size: 11px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.footer__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: var(--muted);
  font-size: 12px;
  border-top: 1px solid color-mix(in srgb, var(--border) 55%, transparent);
  padding-top: 20px;
}

.footer__bottom-links {
  display: inline-flex;
  align-items: center;
  gap: 14px;
}

.footer__link--small {
  font-size: 12px;
}

.footer__to-top {
  border: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
  background: color-mix(in srgb, var(--card) 70%, transparent);
  color: var(--text);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  transition: box-shadow 200ms ease, background 200ms ease;
}

.footer__to-top:hover {
  box-shadow: 0 8px 16px var(--shadow);
  background: color-mix(in srgb, var(--card) 85%, transparent);
}

@media (max-width: 900px) {
  .footer__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .footer {
    padding: 32px 12px 24px;
  }

  .footer__inner {
    padding: 24px 18px;
  }

  .footer__grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .footer__bottom {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer__nav {
    grid-template-columns: 1fr;
  }
}
</style>
