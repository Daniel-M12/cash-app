<template>
  <div v-show="!showEdit" class="movement">
    <div>
      <h4>{{ pasedProps.title }}</h4>
      <p>{{ pasedProps.description }}</p>
    </div>
    <div class="action">
      <div class="flex flex-row justify-between w-16 pb-2">
        <img @click="edit" src="@/assets/pencil-icon.svg" alt="Editar" />
        <img @click="remove" src="@/assets/trash-icon.svg" alt="Borrar" />
      </div>
      <p :class="[{ red: isNegative, green: !isNegative }]">
        {{ amountCurrency }}
      </p>
    </div>
  </div>
  <EditMove
    :title="props.title"
    :description="props.description"
    :amount="props.amount"
    v-show="showEdit"
    @accept="acceptEdit"
    @cancel="showEdit = false"
  />
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits, toRefs, ref } from 'vue'
import EditMove from './EditMove.vue'
import type { MovementType } from '@/common/model/movement.model'

const showEdit = ref<boolean>(false)

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

const pasedProps = toRefs(props)

const amountCurrency = computed(() => currencyFormatter.format(pasedProps.amount?.value ?? 0))

const isNegative = computed(() => (pasedProps.amount?.value ?? 0) < 0)

const emit = defineEmits(['remove', 'update'])

const remove = () => {
  emit('remove', pasedProps.id?.value)
}

const edit = () => {
  showEdit.value = !showEdit.value
}

const acceptEdit = (editMove: Omit<MovementType, 'id' | 'date'>) => {
  showEdit.value = false
  const emitUpdatedMovement: Omit<MovementType, 'date'> = {
    id: props.id!,
    ...editMove,
  }
  emit('update', emitUpdatedMovement)
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
