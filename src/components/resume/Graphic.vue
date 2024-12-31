<template>
  <div>
    <svg @touchstart="tap" @touchmove="tap" @touchend="untap" viewBox="0 0 300 200">
      <line stroke="#c4c4c4" stroke-width="2" x1="0" :y1="zero" x2="300" :y2="zero" />
      <polyline fill="none" stroke="#0689B0" stroke-width="2" :points="points" />
      <line
        v-show="showPointer"
        stroke="#04b500"
        stroke-width="2"
        :x1="pointer"
        y1="0"
        :x2="pointer"
        y2="200"
      />
    </svg>
    <p>Últimos 30 días</p>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, ref, toRefs } from 'vue'

const props = defineProps({
  amounts: {
    type: Array as () => number[],
    default: () => [],
  },
})

const { amounts } = toRefs(props)

const amountToPixels = (amount: number) => {
  const min = Math.min(...amounts.value)
  const max = Math.max(...amounts.value)

  const absoluteAmount = amount + Math.abs(min)
  const minMax = Math.abs(max) + Math.abs(min)

  const pixels = 200 - ((absoluteAmount * 100) / minMax) * 2

  return pixels
}

const zero = computed(() => {
  return amountToPixels(0)
})

const points = computed(() => {
  const total = amounts.value.length
  return amounts.value.reduce((points, amount, i) => {
    const x = (300 / total) * (i + 1)
    const y = amountToPixels(amount)
    return `${points} ${x},${y}`
  }, '0,100')
})

const showPointer = ref(false)
const pointer = ref(0)

const tap = (event: TouchEvent) => {
  const { currentTarget, touches } = event
  showPointer.value = true
  const elementWidth = (currentTarget as HTMLElement).getBoundingClientRect().width
  const elementX = (currentTarget as HTMLElement).getBoundingClientRect().x
  const touchX = touches[0].clientX

  const graphPixels = ((touchX - elementX) * 300) / elementWidth

  pointer.value = graphPixels
}

const untap = () => {
  showPointer.value = false
}
</script>

<style scoped>
svg {
  width: 100%;
}
p {
  text-align: center;
}
</style>
