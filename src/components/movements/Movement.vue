<template>
  <div class="movement">{{ title }}</div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue'

const props = defineProps({
  title: {
    type: String,
  },
})

const { title } = toRefs(props)
</script>
