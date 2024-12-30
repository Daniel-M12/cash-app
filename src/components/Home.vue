<template>
  <Layout>
    <template #header>
      <Header></Header>
    </template>
    <template #resume>
      <Resume :total-label="'Ahorro total'" :label="label" :total="100000" :amount="amount" />
    </template>
    <template #movements>
      <Movements />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import Layout from './Layout.vue'
import Header from './Header.vue'
import Resume from './resume/Index.vue'
import Movements from './Movements.vue'

const label: string | null = 'Etiqueta'
const amount: number | null = 1000
</script>
