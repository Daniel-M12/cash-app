<template>
  <Layout>
    <template #header>
      <Header></Header>
    </template>
    <template #resume>
      <Resume :total-label="'Ahorro total'" :label="label" :total="100000" :amount="amount">
        <template #graphic>
          <Graphic :amounts="amounts" />
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
import { computed, ref } from 'vue'

const label: string | null = 'Etiqueta'
const amount: number | null = 1001

const amounts = computed(() => {
  const lastDaysMovements = movements.value
    .filter((m: MovementClass) => {
      const today: Date = new Date()
      const oldDate: Date = new Date(today.setDate(today.getDate() - 30)) // Create a new Date object
      return m.date > oldDate
    })
    .map((m: MovementClass) => m.amount)

  return lastDaysMovements.map((m, i) => {
    const lastMovements = lastDaysMovements.slice(0, i)

    return lastMovements.reduce((sum, movement) => {
      return sum + movement
    }, 0)
  })
})

const create = (movement: MovementClass) => {
  console.log('Create movement:', movement)
  console.log('movements before', movements)
  movements.value.push(movement)
  console.log('movements after', movements)
}

const remove = (id: number) => {
  const index = movements.value.findIndex((m) => m.id === id)
  console.log('movements before', movements)
  movements.value.splice(index, 1)
  console.log('movements after', movements)
}

let movements = ref<MovementClass[]>([
  {
    id: 1,
    title: 'Move 1',
    description: 'Lorem ipsum',
    amount: 1000,
    date: new Date('11-30-2024'),
  },
  {
    id: 2,
    title: 'Move 2',
    description: 'Lorem ipsum dolor',
    amount: -100,
    date: new Date('12-01-2024'),
  },
  {
    id: 3,
    title: 'Move 3',
    description: 'Lorem ipsum dolor',
    amount: 300,
    date: new Date('12-06-2024'),
  },
  {
    id: 4,
    title: 'Move 4',
    description: 'Lorem ipsum',
    amount: 1000,
    date: new Date('12-07-2024'),
  },
  {
    id: 5,
    title: 'Move 5',
    description: 'Lorem ipsum dolor',
    amount: -100,
    date: new Date('12-07-2024'),
  },
  {
    id: 6,
    title: 'Move 6',
    description: 'Lorem ipsum dolor',
    amount: 300,
    date: new Date('12-07-2024'),
  },
  {
    id: 7,
    title: 'Move 7',
    description: 'Lorem ipsum',
    amount: -1000,
    date: new Date('12-08-2024'),
  },
  {
    id: 8,
    title: 'Move 8',
    description: 'Lorem ipsum dolor',
    amount: -100,
    date: new Date('12-08-2024'),
  },
  {
    id: 9,
    title: 'Move 9',
    description: 'Lorem ipsum dolor',
    amount: 300,
    date: new Date('12-09-2024'),
  },
  {
    id: 10,
    title: 'Move 10',
    description: 'Lorem ipsum dolor',
    amount: 300,
    date: new Date('12-09-2024'),
  },
])
</script>
