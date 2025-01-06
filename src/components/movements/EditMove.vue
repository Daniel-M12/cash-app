<template>
  <form class="movement">
    <div class="w-42 flex flex-col justify-between">
      <input type="text" v-model="editMovement.title" class="rounded" />
      <span class="h-4"></span>
      <textarea rows="1" v-model="editMovement.description" class="rounded" />
    </div>
    <div class="action">
      <div class="flex flex-row justify-between w-16">
        <img @click="accept" src="@/assets/check-icon.svg" alt="Aceptar" class="h-7 w-7" />
        <img @click="cancel" src="@/assets/close-icon.svg" alt="Cancelar" class="h-6 w-6" />
      </div>
      <input
        type="number"
        v-model="editMovement.amount"
        :class="[{ red: isNegative, green: !isNegative }]"
        class="rounded mt-3 w-[70%] inline-block"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import type { MovementType } from '@/common/model/movement.model'
import type MovementClass from '@/common/model/movement.model'
import { computed, onMounted, ref, toRefs } from 'vue'

const props = defineProps<{
  title?: string
  description?: string
  amount?: number
}>()

const editMovement = ref<Omit<MovementType, 'id' | 'date'>>({
  title: '',
  description: '',
  amount: 0,
})
const isNegative = computed(() => editMovement.value.amount < 0)

onMounted(() => {
  editMovement!.value.title = props.title ?? ''
  editMovement!.value.description = props.description ?? ''
  editMovement!.value.amount = props.amount ?? 0
})

const emit = defineEmits(['accept', 'cancel'])

const accept = () => {
  emit('accept', editMovement.value)
}

const cancel = () => {
  editMovement!.value.title = props.title ?? ''
  editMovement!.value.description = props.description ?? ''
  editMovement!.value.amount = props.amount ?? 0
  emit('cancel')
}
</script>

<style>
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

.action {
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

.action svg {
  margin-bottom: 16px;
}

.red {
  color: red;
}

.green {
  color: green;
}
</style>
