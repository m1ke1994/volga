<template>
  <div class="schedule">
    <article v-for="item in schedule" :key="`${item.day}-${item.time}`" class="schedule__card glass-card" v-reveal>
      <div class="schedule__day">{{ item.day }}</div>
      <div class="schedule__time">{{ item.time }}</div>
      <div class="schedule__title">{{ item.title }}</div>
    </article>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import { parseJsonField } from '../api/client'
import { useSection } from '../composables/useSection'

const { data: scheduleSection } = useSection('schedule')

const fallbackSchedule = [
  { day: 'Понедельник', time: '08:00', title: 'Утренняя практика и дыхание' },
  { day: 'Среда', time: '19:00', title: 'Чайная церемония и беседа' },
  { day: 'Пятница', time: '07:30', title: 'Энергетические практики' },
]

const schedule = computed(() => {
  const items = parseJsonField(scheduleSection.value?.schedule_items_json, fallbackSchedule)
  return Array.isArray(items) && items.length ? items : fallbackSchedule
})
</script>

<style scoped>
.schedule {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.schedule__card {
  padding: 16px;
  display: grid;
  gap: 8px;
}

.schedule__day {
  font-weight: 600;
  font-size: 14px;
}

.schedule__time {
  font-size: 13px;
  color: var(--muted);
}

.schedule__title {
  font-size: 14px;
  color: var(--text);
}

@media (max-width: 980px) {
  .schedule {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 620px) {
  .schedule {
    grid-template-columns: 1fr;
  }
}
</style>
