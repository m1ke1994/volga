<template>
    <button class="burger" type="button" aria-label="меню" @click="emit('toggle')">
        <span class="burger__icon">
            <span></span>
            <span></span>
            <span></span>
        </span>
    </button>
</template>

<script setup>
const emit = defineEmits(['toggle']);
</script>

<style scoped>
.burger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 34px;
    background: #e6a9a9;
    border: none;
    cursor: pointer;
    border-radius: 6px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);
}

.burger__icon {
    display: inline-flex;
    flex-direction: column;
    gap: 3px;
}

.burger__icon span {
    display: block;
    width: 16px;
    height: 2px;
    background: #2b2b2b;
}
</style>
