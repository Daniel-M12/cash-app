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
        @edit="edit"
      >
      </Movement>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import Movement from './Movement.vue'
import MovementClass from '@/common/model/movement.model'
const props = defineProps({
  movements: {
    type: Array as () => MovementClass[],
    default: () => [],
  },
})

const { movements } = toRefs(props)

const emit = defineEmits(['remove', 'edit'])

const remove = (id: number) => {
  console.log('Remove en Index')
  emit('remove', id)
}

const edit = (id: number) => {
  console.log('Edit en Index')
  emit('edit', id)
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
