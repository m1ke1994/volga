<script setup>
import PageTemplate from '../components/PageTemplate.vue';

const pageData = {
    title: 'Волонтерские программы',
    subtitle:
        'Добрые дела на природе, совместные проекты и ощущение, что вы вносите вклад в живое пространство «Нового Конаково».',
    heroImage: '/3.jpeg',
    sections: [
        {
            title: 'Забота о территории',
            text: 'Уборка берегов, уход за тропами и помощь в подготовке площадок для встреч.',
        },
        {
            title: 'Творческие проекты',
            text: 'Совместное оформление пространств, мастерские и небольшие арт-инициативы.',
        },
        {
            title: 'Обучение и поддержка',
            text: 'Каждый участник получает понятные инструкции и тёплую команду рядом.',
        },
    ],
    gallery: ['/3.jpeg', '/4.jpeg', '/5.jpeg', '/1.jpeg'],
};
</script>

<template>
    <PageTemplate v-bind="pageData" />
</template>
