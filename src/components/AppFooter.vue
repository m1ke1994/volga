<template>
  <footer class="footer">
    <div class="footer__glass">
      <div class="footer__inner">
        <div class="footer__grid">
          <div class="footer__brand">
            <div class="footer__logo">Volga</div>
            <p class="footer__tagline">Тихий отдых • Природа • Внимание к деталям</p>
          </div>

          <nav class="footer__nav" aria-label="Навигация">
            <router-link class="footer__link" to="/about">Обо мне</router-link>
            <router-link class="footer__link" to="/moose">Братство лосей</router-link>
            <router-link class="footer__link" to="/volunteer">Волонтерские программы</router-link>
            <router-link class="footer__link" to="/running-club">Беговой клуб</router-link>
            <router-link class="footer__link" to="/schedule">Расписание занятий</router-link>
            <router-link class="footer__link" to="/articles">Статьи</router-link>
            <router-link class="footer__link" to="/news">Новости</router-link>
            <router-link class="footer__link" to="/contacts">Контакты</router-link>
          </nav>

          <div class="footer__contacts">
            <div class="footer__contact-item">
              <span class="footer__label">Телефон</span>
              <span>+7 (999) 000-00-00</span>
            </div>
            <div class="footer__contact-item">
              <span class="footer__label">Email</span>
              <span>hello@example.com</span>
            </div>
            <div class="footer__contact-item">
              <span class="footer__label">Telegram</span>
              <span>@username</span>
            </div>
          </div>
        </div>

        <div class="footer__bottom">
          <span>© {{ year }} Volga. Все права защищены.</span>
          <div class="footer__bottom-links">
            <router-link class="footer__link footer__link--small" to="/privacy">Политика</router-link>
            <router-link class="footer__link footer__link--small" to="/terms">Условия</router-link>
            <button class="footer__to-top" type="button" @click="scrollToTop">↑</button>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()

const scrollToTop = () => {
  if (typeof window === 'undefined') return
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.footer {
  width: 100%;
  padding: 40px 16px 28px;
  background: var(--bg);
  color: var(--text);
}

.footer__glass {
  background: color-mix(in srgb, var(--card) 70%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 80%, transparent);
  border-radius: 24px;
  box-shadow: 0 -12px 30px var(--shadow);
  backdrop-filter: blur(16px);
}

.footer__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 28px 24px;
  display: grid;
  gap: 24px;
  box-sizing: border-box;
}

.footer__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.footer__logo {
  font-size: 22px;
  font-weight: 600;
  color: var(--text-strong);
  margin-bottom: 8px;
}

.footer__tagline {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
}

.footer__nav {
  display: grid;
  gap: 8px;
}

.footer__link {
  position: relative;
  color: var(--text);
  font-size: 13px;
  padding-bottom: 2px;
  width: fit-content;
}

.footer__link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 2px;
  background: var(--primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 220ms ease;
}

.footer__link:hover::after {
  transform: scaleX(1);
}

.footer__contacts {
  display: grid;
  gap: 10px;
  color: var(--text);
  font-size: 13px;
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
  border-top: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
  padding-top: 16px;
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
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.footer__to-top:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 16px var(--shadow);
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
  }

  .footer__bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
