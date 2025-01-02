<template>
  <Layout>
    <template #header>
      <Header></Header>
    </template>
    <template #resume>
      <Resume
        :total-label="'Monto total hasta hoy'"
        :label="label"
        :total="totalAmount"
        :amount="amount"
      >
        <template #graphic>
          <Graphic :amounts="amounts" @select="select" @unselect="unselect" />
        </template>
        <template #action>
          <Action @create="create" />
        </template>
      </Resume>
    </template>
    <template #movements>
      <Movements :movements="movements" @remove="remove" />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import Layout from './Layout.vue'
import Header from './Header.vue'
import Resume from './resume/Index.vue'
import Movements from './movements/Index.vue'
import type MovementClass from '@/common/model/movement.model'
import Action from './Action.vue'
import Graphic from './resume/Graphic.vue'
import { computed, onMounted, ref } from 'vue'

const label = ref<string | undefined>(undefined)
const amount = ref<number | undefined>(undefined)
const movements = ref<MovementClass[]>([])

onMounted(() => {
  const storedMovements = localStorage.getItem('movements')
  const parsedMovements: MovementClass[] = storedMovements ? JSON.parse(storedMovements) : []
  if (Array.isArray(parsedMovements)) {
    movements.value = parsedMovements?.map((m) => {
      return {
        ...m,
        date: new Date(m.date),
      }
    })
  }
})

const amounts = computed(() => {
  const lastDaysMovements = movements.value
    .filter((m: MovementClass) => {
      const today: Date = new Date()
      const oldDate: Date = new Date(today.setDate(today.getDate() - 30)) // Create a new Date object
      return m.date > oldDate
    })
    .map((m: MovementClass) => m.amount)

  return lastDaysMovements.map((m, i) => {
    const lastMovements = lastDaysMovements.slice(0, i + 1)

    return lastMovements.reduce((sum, movement) => {
      return sum + movement
    }, 0)
  })
})

const totalAmount = computed(() => {
  return movements.value.reduce((sum, m) => {
    return sum + m.amount
  }, 0)
})

const select = (index: number) => {
  amount.value = amounts.value[index - 1]
  label.value = movements.value[index - 1].date.toDateString()
}

const unselect = () => {
  amount.value = undefined
  label.value = undefined
}

const create = (movement: MovementClass) => {
  movements.value.push(movement)
  save()
}

const remove = (id: number) => {
  const index = movements.value.findIndex((m) => m.id === id)
  movements.value.splice(index, 1)
  save()
}

const save = () => {
  localStorage.setItem('movements', JSON.stringify(movements.value))
}
</script>
