<template>
  <nav class="scrollbar" aria-label="Навигация по разделам">
    <div class="scrollbar__track">
      <button
        v-for="item in items"
        :key="item.id"
        class="scrollbar__pill"
        :class="{ 'scrollbar__pill--active': item.id === activeId }"
        type="button"
        @click="scrollTo(item.id)"
      >
        {{ item.label }}
      </button>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  items: { type: Array, required: true },
})

const activeId = ref(props.items?.[0]?.id || "")
let observer = null

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}

onMounted(() => {
  const sections = props.items
    .map((item) => document.getElementById(item.id))
    .filter(Boolean)

  if (!("IntersectionObserver" in window) || sections.length === 0) {
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible?.target?.id) {
        activeId.value = visible.target.id
      }
    },
    {
      rootMargin: "-25% 0px -60% 0px",
      threshold: [0.2, 0.4, 0.6],
    }
  )

  sections.forEach((section) => observer.observe(section))
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.scrollbar {
  width: 100%;
  overflow: hidden;
  background: var(--bg-elevated);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.scrollbar__track {
  display: flex;
  gap: 10px;
  padding: 12px 20px;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: thin;
  scrollbar-color: var(--primary) transparent;
}

.scrollbar__track::-webkit-scrollbar {
  height: 8px;
}

.scrollbar__track::-webkit-scrollbar-thumb {
  background: var(--primary);
  border-radius: 999px;
}

.scrollbar__track::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar__pill {
  border: 1px solid var(--border);
  background: var(--card);
  color: var(--text);
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 13px;
  cursor: pointer;
  transition: transform 200ms ease, box-shadow 200ms ease, background 200ms ease;
}

.scrollbar__pill:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 14px var(--shadow);
}

.scrollbar__pill--active {
  background: var(--primary-soft);
  border-color: var(--primary);
  color: var(--text-strong);
}
</style>
