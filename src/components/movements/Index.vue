<template>
  <div class="movements">
    <h2 class="title">Historial</h2>
    <div class="content">
      <Movement
        v-for="movement in movements"
        :key="movement.id"
        :id="movement.id"
        :title="movement.title"
        :description="movement.description"
        :amount="movement.amount"
        @remove="remove"
        @update="update"
      >
      </Movement>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import Movement from './Movement.vue'
import MovementClass, { type MovementType } from '@/common/model/movement.model'
const props = defineProps({
  movements: {
    type: Array as () => MovementClass[],
    default: () => [],
  },
})

const { movements } = toRefs(props)

const emit = defineEmits(['remove', 'update'])

const remove = (id: number) => {
  emit('remove', id)
}

const update = (updatedMovemet: Omit<MovementType, 'date'>) => {
  emit('update', updatedMovemet)
}
</script>

<style scoped>
.movements {
  max-height: 100%;
  padding: 0 8px;
  margin-bottom: 14px;
}

.title {
  margin: 8px 16px 24px 16px;
  color: var(--brand-blue);
}

.content {
  max-height: 68vh;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: scroll;
}
</style>
