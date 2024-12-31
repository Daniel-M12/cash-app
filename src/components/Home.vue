<template>
  <Layout>
    <template #header>
      <Header></Header>
    </template>
    <template #resume>
      <Resume :total-label="'Ahorro total'" :label="label" :total="100000" :amount="amount">
        <template #graphic>
          <Graphic />
        </template>
        <template #action>
          <Action />
        </template>
      </Resume>
    </template>
    <template #movements>
      <Movements :movements="movements" />
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

const label: string | null = 'Etiqueta'
const amount: number | null = 1001

const movements: MovementClass[] = [
  {
    id: 1,
    title: 'Move 1',
    description: 'Lorem ipsum',
    amount: 1000,
  },
  {
    id: 2,
    title: 'Move 2',
    description: 'Lorem ipsum dolor',
    amount: -100,
  },
  {
    id: 3,
    title: 'Move 3',
    description: 'Lorem ipsum dolor',
    amount: 300,
  },
]
</script>
