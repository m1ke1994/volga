<script setup>
import PageTemplate from '../components/PageTemplate.vue';

const pageData = {
    title: 'Беговой клуб',
    subtitle:
        'Клуб для регулярных встреч, тёплых практик и участия в жизни «Нового Конаково» без спешки и лишнего формализма.',
    heroImage: '/5.jpeg',
    sections: [
        {
            title: 'Уровни участия',
            text: 'Выбираем подходящий формат: короткие встречи, сезонные программы или регулярные события.',
        },
        {
            title: 'Клубные форматы',
            text: 'Прогулки, практики и камерные встречи в живописных местах у воды и в лесу.',
        },
        {
            title: 'Сообщество',
            text: 'Общение, поддержка и чувство «своего места» — ключевая часть клуба.',
        },
    ],
    gallery: ['/5.jpeg', '/6.jpeg', '/7.jpeg', '/2.jpeg'],
};
</script>

<template>
    <PageTemplate v-bind="pageData" />
</template>
