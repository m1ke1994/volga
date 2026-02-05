<template>
    <a class="card" href="#">
        <div class="card__title">{{ title }}</div>
        <div class="card__desc">{{ description }}</div>
    </a>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});
</script>

<style scoped>
.card {
    background: #9fcf9b;
    padding: 12px 12px;
    font-size: 12px;
    color: #1d1d1d;
    min-height: 90px;
    line-height: 1.25;
    text-decoration: none;
    border-radius: 8px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
    display: block;
    transition: transform 150ms ease, box-shadow 150ms ease;
}

.card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 18px rgba(0, 0, 0, 0.12);
}

.card__title {
    font-weight: 600;
    margin-bottom: 6px;
    font-size: 13px;
}

.card__desc {
    font-size: 12px;
    color: #2b2b2b;
}
</style>
