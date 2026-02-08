<template>
  <section :id="id" class="app-section reveal">
    <div class="app-section__inner">
      <h2 class="app-section__title">{{ title }}</h2>
      <div class="app-section__content">
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  title: { type: String, required: true },
  id: { type: String, default: "" },
})
</script>

<style scoped>
.app-section {
  width: 100%;
  padding: var(--section-padding, 64px) 0;
  background: var(--bg);
  scroll-margin-top: var(--header-offset, 120px);
}

.app-section__inner {
  max-width: var(--container-max, 1200px);
  margin: 0 auto;
  padding: 0 28px;
  box-sizing: border-box;
}

.app-section__title {
  margin: 0 0 28px;
  text-align: center;
  font-size: 28px;
  color: var(--text);
}

.app-section__content {
  width: 100%;
}

@media (max-width: 720px) {
  .app-section {
    padding: var(--section-padding-mobile, 40px) 0;
  }

  .app-section__inner {
    padding: 0 18px;
  }

  .app-section__title {
    font-size: 24px;
  }
}
</style>
