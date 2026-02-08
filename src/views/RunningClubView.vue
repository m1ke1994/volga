<script setup>
import PageTemplate from '../components/PageTemplate.vue';

const pageData = {
    title: 'Беговой Клуб',
    subtitle:
        'Лёгкие пробежки, прогулочный темп и поддержка участников — беговой клуб «Нового Конаково» про движение без давления.',
    heroImage: '/5.jpeg',
    sections: [
        {
            title: 'Уровни участия',
            text: 'Подходит новичкам и тем, кто давно бегает — выбираем комфортный темп и дистанцию.',
        },
        {
            title: 'Маршруты',
            text: 'Лесные тропы, береговые дорожки и круги для разогрева — в живописных местах.',
        },
        {
            title: 'Сообщество',
            text: 'После пробежки остаёмся на чай и общение, делимся опытом и планируем новые встречи.',
        },
    ],
    gallery: ['/5.jpeg', '/6.jpeg', '/7.jpeg', '/2.jpeg'],
};
</script>

<template>
    <PageTemplate v-bind="pageData" />
</template>
