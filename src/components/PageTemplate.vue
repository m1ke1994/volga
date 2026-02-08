<template>
    <section class="page">
        <header class="page__hero" :style="heroStyle">
            <div class="page__hero-inner">
                <h1 class="page__title">{{ title }}</h1>
            </div>
        </header>

        <div class="page__body">
            <p class="page__subtitle">{{ subtitle }}</p>

            <div class="page__sections">
                <article v-for="section in sections" :key="section.title" class="page__section">
                    <h3 class="page__section-title">{{ section.title }}</h3>
                    <p class="page__section-text">{{ section.text }}</p>
                    <ul v-if="section.items?.length" class="page__list">
                        <li v-for="item in section.items" :key="item">{{ item }}</li>
                    </ul>
                    <div v-if="section.isMap" class="page__map-placeholder">Карта будет здесь</div>
                    <a
                        v-if="section.action"
                        class="page__action"
                        :href="section.action.href"
                        :aria-label="section.action.label"
                    >
                        {{ section.action.label }}
                    </a>
                </article>
            </div>

            <div class="page__gallery">
                <button
                    v-for="(img, idx) in gallery"
                    :key="`${img}-${idx}`"
                    class="page__thumb"
                    type="button"
                    @click="openImage(img)"
                >
                    <img :src="img" :alt="`Галерея ${title}`" />
                </button>
            </div>
        </div>

        <div v-if="activeImage" class="page__modal" @click="closeImage">
            <div class="page__modal-inner" @click.stop>
                <button class="page__modal-close" type="button" @click="closeImage" aria-label="Закрыть">
                    ×
                </button>
                <img :src="activeImage" :alt="`Галерея ${title}`" />
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    heroImage: { type: String, required: true },
    sections: { type: Array, required: true },
    gallery: { type: Array, required: true },
});

const activeImage = ref(null);

const heroStyle = computed(() => ({
    backgroundImage: `linear-gradient(180deg, rgba(19, 16, 12, 0.55), rgba(19, 16, 12, 0.15)), url(${props.heroImage})`,
}));

const openImage = (img) => {
    activeImage.value = img;
};

const closeImage = () => {
    activeImage.value = null;
};

const handleKeydown = (event) => {
    if (event.key === 'Escape') {
        closeImage();
    }
};

onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
});
</script>

<style scoped>
.page {
    background: #f6efe5;
    min-height: 100vh;
    color: #2b2520;
}

.page__hero {
    min-height: 320px;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: flex-end;
    padding: 48px 24px;
    box-sizing: border-box;
}

.page__hero-inner {
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
}

.page__title {
    margin: 0;
    font-size: 32px;
    color: #f7f2ea;
    letter-spacing: 0.5px;
}

.page__body {
    max-width: 1280px;
    margin: 0 auto;
    padding: 28px 32px 60px;
    box-sizing: border-box;
}

.page__subtitle {
    margin: 0 0 24px;
    font-size: 15px;
    color: #3a2f27;
    max-width: 720px;
}

.page__sections {
    display: grid;
    gap: 18px;
    margin-bottom: 32px;
}

.page__section {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 18px;
    padding: 18px 20px;
    border: 1px solid rgba(255, 255, 255, 0.7);
    box-shadow: 0 10px 20px rgba(20, 16, 12, 0.08);
}

.page__section-title {
    margin: 0 0 10px;
    font-size: 18px;
}

.page__section-text {
    margin: 0 0 12px;
    font-size: 14px;
    color: #3a2f27;
    line-height: 1.6;
}

.page__list {
    margin: 0;
    padding-left: 18px;
    color: #3a2f27;
    display: grid;
    gap: 6px;
    font-size: 14px;
}

.page__map-placeholder {
    margin-top: 10px;
    padding: 18px;
    border-radius: 14px;
    border: 1px dashed rgba(43, 37, 32, 0.3);
    color: #5b4c3e;
    text-align: center;
    background: rgba(255, 255, 255, 0.45);
}

.page__action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    padding: 10px 18px;
    border-radius: 999px;
    background: linear-gradient(135deg, #c8b89f, #b7a58c);
    color: #2b2520;
    text-decoration: none;
    font-size: 13px;
    font-weight: 600;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
    transition: transform 200ms ease, box-shadow 200ms ease;
}

.page__action:hover {
    transform: translateY(-1px) scale(1.02);
    box-shadow: 0 10px 18px rgba(0, 0, 0, 0.18);
}

.page__gallery {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
}

.page__thumb {
    border: none;
    padding: 0;
    background: transparent;
    cursor: pointer;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(20, 16, 12, 0.12);
}

.page__thumb img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    display: block;
    transition: transform 250ms ease;
}

.page__thumb:hover img {
    transform: scale(1.03);
}

.page__modal {
    position: fixed;
    inset: 0;
    background: rgba(15, 12, 10, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    z-index: 20;
}

.page__modal-inner {
    position: relative;
    max-width: 960px;
    width: min(960px, 100%);
    background: rgba(255, 255, 255, 0.95);
    border-radius: 18px;
    padding: 18px;
    box-sizing: border-box;
}

.page__modal-inner img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    display: block;
}

.page__modal-close {
    position: absolute;
    top: 10px;
    right: 12px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    font-size: 22px;
    line-height: 1;
    color: #2b2520;
}

@media (max-width: 980px) {
    .page__gallery {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 720px) {
    .page__title {
        font-size: 26px;
    }

    .page__body {
        padding: 24px 18px 48px;
    }
}

@media (max-width: 560px) {
    .page__gallery {
        grid-template-columns: 1fr;
    }

    .page__thumb img {
        height: 200px;
    }
}
</style>
