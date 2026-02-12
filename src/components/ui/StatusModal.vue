<template>
  <AppModal :model-value="modelValue" :title="title" @update:model-value="emit('update:modelValue', $event)">
    <div class="status-modal">
      <div class="status-modal__icon" :class="`status-modal__icon--${variant}`" aria-hidden="true">
        <svg v-if="variant === 'success'" viewBox="0 0 24 24" width="28" height="28" fill="none">
          <path d="M20 7 10 17l-6-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <svg v-else viewBox="0 0 24 24" width="28" height="28" fill="none">
          <path d="M12 8v5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
          <circle cx="12" cy="16.5" r="1.2" fill="currentColor" />
          <path d="M12 3 2.7 19a1 1 0 0 0 .86 1.5h16.88a1 1 0 0 0 .86-1.5L12 3Z" stroke="currentColor" stroke-width="1.8" />
        </svg>
      </div>

      <p class="status-modal__text">{{ message }}</p>

      <button class="status-modal__button" type="button" @click="emit('update:modelValue', false)">ОК</button>
    </div>
  </AppModal>
</template>

<script setup>
import AppModal from './AppModal.vue'

defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
  message: { type: String, default: '' },
  variant: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error'].includes(value),
  },
})

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.status-modal {
  display: grid;
  gap: 16px;
}

.status-modal__icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
}

.status-modal__icon--success {
  background: color-mix(in srgb, #3ba76d 14%, var(--bg-elevated));
  color: #2f8d5a;
  border-color: color-mix(in srgb, #3ba76d 35%, var(--border));
}

.status-modal__icon--error {
  background: color-mix(in srgb, #d56a5a 13%, var(--bg-elevated));
  color: #c05041;
  border-color: color-mix(in srgb, #d56a5a 35%, var(--border));
}

.status-modal__text {
  margin: 0;
  color: var(--text);
  line-height: 1.5;
  font-size: 15px;
}

.status-modal__button {
  justify-self: start;
  border: none;
  border-radius: 999px;
  padding: 10px 16px;
  cursor: pointer;
  background: linear-gradient(135deg, #c8b89f, #b7a58c);
  color: #2b2520;
  font-size: 13px;
  box-shadow: 0 12px 24px var(--shadow);
}
</style>
