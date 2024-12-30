<template>
  <main>
    <p>{{ visualLabel }}</p>
    <h1>{{ visualAmount }}</h1>
  </main>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'

const { totalLabel, label, total, amount } = defineProps({
  totalLabel: {
    type: String,
  },
  label: {
    type: String,
  },
  total: {
    type: Number,
  },
  amount: {
    type: Number,
    default: null,
  },
})

const visualLabel = computed(() => (label != null ? label : totalLabel))
const visualAmount = computed(() => (amount != null ? amount : total))
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

h1,
p {
  margin: 0;
  text-align: center;
}

h1 {
  margin-top: 14px;
  color: var(--brand-green);
}

.graphic {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 48px 24px;
  box-sizing: border-box;
}
</style>
