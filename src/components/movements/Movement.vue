<template>
  <div class="movement">
    <div>
      <h4>{{ title }}</h4>
      <p>{{ description }}</p>
    </div>
    <div class="action">
      <img @click="remove" src="@/assets/trash-icon.svg" alt="Borrar" />
      <p :class="[{ red: isNegative, green: !isNegative }]">{{ amountCurrency }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits, toRefs } from 'vue'

const props = defineProps({
  id: {
    type: Number,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  amount: {
    type: Number,
  },
})

const { id, title, description, amount } = toRefs(props)

const amountCurrency = computed(() => currencyFormatter.format(amount?.value ?? 0))

const isNegative = computed(() => (amount?.value ?? 0) < 0)

const emit = defineEmits(['remove'])

const remove = () => {
  emit('remove', id?.value)
}

const currencyFormatter = new Intl.NumberFormat('es-PE', {
  style: 'currency',
  currency: 'PEN',
})
</script>

<style scoped>
.movement {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px;
  background-color: #e6f9ff;
  border-radius: 8px;
  box-sizing: border-box;
}

.movement .content {
  width: 100%;
}

.movement .action {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: column;
}

h4,
p {
  margin: 0;
  padding: 0;
}

h4 {
  margin-bottom: 8px;
}

.movement .action svg {
  margin-bottom: 16px;
}

.red {
  color: red;
}

.green {
  color: green;
}
</style>
