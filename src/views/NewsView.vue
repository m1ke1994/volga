<script setup>
import PageTemplate from '../components/PageTemplate.vue';

const pageData = {
    title: 'Новости',
    subtitle:
        'Актуальные события «Нового Конаково»: новые форматы, сезонные программы и ближайшие встречи сообщества.',
    heroImage: '/7.jpeg',
    sections: [
        {
            title: 'Ближайшие события',
            text: 'Собираем в одном месте всё, что будет происходить в течение месяца.',
        },
        {
            title: 'Сезонные обновления',
            text: 'Осенью — прогулки и чайные церемонии, летом — больше практик у воды.',
        },
        {
            title: 'Жизнь сообщества',
            text: 'Делимся историями участников, чтобы оставаться на связи.',
        },
    ],
    gallery: ['/7.jpeg', '/3.jpeg', '/4.jpeg', '/1.jpeg'],
};
</script>

<template>
    <PageTemplate v-bind="pageData" />
</template>
