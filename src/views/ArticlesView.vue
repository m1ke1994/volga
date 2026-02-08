<script setup>
import PageTemplate from '../components/PageTemplate.vue';

const pageData = {
    title: 'Статьи',
    subtitle:
        'Наблюдения, заметки и истории из «Нового Конаково»: про природу, путешествия, практики и небольшие открытия.',
    heroImage: '/6.jpeg',
    sections: [
        {
            title: 'Истории из природы',
            text: 'Короткие тексты о сезонных изменениях, встречах в лесу и тихих маршрутах.',
        },
        {
            title: 'Практики внимания',
            text: 'Простые упражнения для замедления, дыхания и восстановления внутреннего ритма.',
        },
        {
            title: 'Культурные заметки',
            text: 'Местные традиции, ремесла и людей, которые создают атмосферу в сообществе.',
        },
    ],
    gallery: ['/6.jpeg', '/2.jpeg', '/5.jpeg', '/7.jpeg'],
};
</script>

<template>
    <PageTemplate v-bind="pageData" />
</template>
