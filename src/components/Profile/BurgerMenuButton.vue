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
    width: 44px;
    height: 38px;
    background: rgba(214, 198, 178, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.6);
    cursor: pointer;
    border-radius: 12px;
    box-shadow: 0 10px 18px rgba(0, 0, 0, 0.12);
    backdrop-filter: blur(10px);
    transition: transform 200ms ease, box-shadow 200ms ease;
}

.burger:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.18);
}

.burger__icon {
    display: inline-flex;
    flex-direction: column;
    gap: 3px;
}

.burger__icon span {
    display: block;
    width: 18px;
    height: 2px;
    background: #3a2f27;
}
</style>
