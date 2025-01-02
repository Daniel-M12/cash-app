<template>
  <div class="movement">
    <div>
      <h4>{{ title }}</h4>
      <p>{{ description }}</p>
    </div>
    <div class="action">
      <svg
        @click="remove"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.5 7.37193L5.625 22.5H18.375L19.5 7.37193M4.5 7.37193H3L4.125 3.48113H6.75M4.5 7.37193H19.5M19.5 7.37193H21L20.25 3.48113H17.25M17.25 3.48113H12.375H6.75M17.25 3.48113L15.75 1.5H8.25L6.75 3.48113M9 10.217V19.3302M15 19.3302V10.217M12 19.3302V10.217"
          stroke="#0689B0"
          stroke-width="2"
        />
      </svg>
      <p :class="[{ red: isNegative, green: !isNegative }]">{{ amountCurrency }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits, toRefs } from 'vue'
import trashIcon from '@/assets/trash-icon.svg'

const trash = trashIcon

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
