<script setup>
import PageTemplate from '../components/PageTemplate.vue';

const pageData = {
    title: 'Контакты',
    subtitle:
        'Мы на связи и рады помочь. Пишите или приезжайте в «Новое Конаково» — здесь всегда найдётся место для тёплой встречи.',
    heroImage: '/1.jpeg',
    sections: [
        {
            title: 'Адрес',
            text: 'Тверская область, Конаковский район, природный кластер «Новое Конаково».',
        },
        {
            title: 'Связаться с нами',
            text: 'Телефон: +7 (999) 000-00-00 · Email: hello@novoe-konakovo.ru',
            action: { label: 'Написать', href: 'mailto:hello@novoe-konakovo.ru' },
        },
        {
            title: 'Время работы',
            text: 'Ежедневно с 09:00 до 20:00, по предварительной записи.',
        },
        {
            title: 'Карта',
            text: 'Чтобы вам было проще нас найти, скоро добавим интерактивную карту.',
            isMap: true,
        },
    ],
    gallery: ['/1.jpeg', '/2.jpeg', '/3.jpeg', '/5.jpeg'],
};
</script>

<template>
    <PageTemplate v-bind="pageData" />
</template>
