<template>
    <section class="services reveal">
        <div class="services__header">
            <h2 class="services__title">Услуги и форматы</h2>
            <p class="services__subtitle">Выберите формат, который подходит вашему ритму и настроению.</p>
        </div>

        <div class="services__grid">
            <ServiceCard
                v-for="card in cards"
                :key="card.title"
                :title="card.title"
                :description="card.description"
                :duration="card.duration"
                :price="card.price"
                :image="card.image"
                :href="card.href"
            />
        </div>
    </section>
</template>

<script setup>
import ServiceCard from './ServiceCard.vue';

const cards = [
        { title: 'Экскурсия в «Братство лосей»', description: 'Заповедный маршрут, истории о лесах и живые встречи с природой.', duration: '3–4 часа', price: 'от 3 500 ₽', image: '/1.jpeg', href: '#' },
        { title: 'Чайная церемония', description: 'Спокойный ритуал, вкус момента и пространство для тишины.', duration: '1,5 часа', price: 'от 2 200 ₽', image: '/2.jpeg', href: '#' },
        { title: 'Утренние энергетические практики', description: 'Мягкое включение тела, дыхание и настрой на день.', duration: '60 мин', price: 'от 1 500 ₽', image: '/3.jpeg', href: '#' },
        { title: 'Мастер‑классы', description: 'Разбор тем, обмен опытом и спокойная практика в группе.', duration: '2 часа', price: 'от 2 000 ₽', image: '/4.jpeg', href: '#' },
        { title: 'Mindfulness', description: 'Простые техники для фокуса, дыхания и внутренней устойчивости.', duration: '60–75 мин', price: 'от 1 800 ₽', image: '/5.jpeg', href: '#' },
        { title: 'Игра самопознания «Лила»', description: 'Глубокий диалог с собой в мягком и поддерживающем формате.', duration: '3 часа', price: 'от 2 800 ₽', image: '/6.jpeg', href: '#' },
        { title: 'Авторские программы', description: 'Индивидуальные форматы под ваш запрос и глубину опыта.', duration: 'по запросу', price: 'по запросу', image: '/7.jpeg', href: '#' },
];
</script>

<style scoped>
.services {
    max-width: 1280px;
    margin: 24px auto 0;
}


.services__header {
    display: grid;
    gap: 8px;
    margin-bottom: 18px;
}

.services__title {
    margin: 0;
    font-size: 22px;
    color: #2b2520;
}

.services__subtitle {
    margin: 0;
    font-size: 14px;
    color: #3a2f27;
    max-width: 560px;
}

.services__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 50px;
}

@media (max-width: 980px) {
    .services__grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 620px) {
    .services__grid {
        grid-template-columns: 1fr;
    }
}
</style>
