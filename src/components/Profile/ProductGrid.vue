<template>
    <div class="grid">
        <ProductCard
            v-for="card in cards"
            :key="card.title"
            :title="card.title"
            :description="card.description"
        />
    </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue';

const cards = [
        { title: "Экскурсии в «Братство лосей»", description: "Заповедный маршрут и встречи с природой." },
        { title: "Чайная церемония", description: "Спокойный ритуал и вкус момента." },
        { title: "Mindfulness-практики", description: "Простые техники для фокуса и тишины." },
        { title: "Утренние энергетические практики", description: "Мягкое включение тела и энергии." },
        { title: "Мастер-классы", description: "Разбор тем, обмен опытом, практика." },
        { title: "Игра самопознания «Лила»", description: "Мягкий формат и внутренний диалог." },
];
</script>

<style scoped>
.grid {
    margin-top: 16px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px 20px;
}

@media (max-width: 900px) {
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 520px) {
    .grid {
        grid-template-columns: 1fr;
    }
}
</style>
