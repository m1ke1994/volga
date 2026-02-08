<template>
  <div class="schedule">
    <article v-for="item in schedule" :key="item.day" class="schedule__card">
      <div class="schedule__day">{{ item.day }}</div>
      <div class="schedule__time">{{ item.time }}</div>
      <div class="schedule__title">{{ item.title }}</div>
    </article>
  </div>
</template>

<script setup>
const schedule = [
  { day: "Понедельник", time: "08:00", title: "Утренняя практика и дыхание" },
  { day: "Среда", time: "19:00", title: "Чайная церемония и беседа" },
  { day: "Пятница", time: "07:30", title: "Энергетические практики" },
  { day: "Суббота", time: "11:00", title: "Семейные активности и прогулка" },
  { day: "Воскресенье", time: "10:00", title: "Тихий маршрут и mindfulness" },
]
</script>

<style scoped>
.schedule {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.schedule__card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 10px 18px var(--shadow);
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
