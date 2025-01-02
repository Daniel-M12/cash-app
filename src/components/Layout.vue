<template>
  <header class="header">
    <slot name="header"></slot>
  </header>
  <main class="resume">
    <slot name="resume"></slot>
  </main>
  <section class="movements">
    <div class="head" @click="showMovements = !showMovements">
      <div class="grip"></div>
    </div>
    <div class="body" v-show="showMovements">
      <slot name="movements"></slot>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showMovements = ref(false)
</script>

<style scoped>
.header,
.resume,
.movements {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 14px 0;
  box-sizing: border-box;
}

.header {
  position: fixed;
  top: 0;
  width: 100vw;
  background-color: white;
}

.resume {
  min-height: 100vh;
}

.movements {
  z-index: 1;
  position: sticky;
  flex-direction: column;
  bottom: 0;
  width: 100vw;
  background-color: white;
  box-shadow: 0 -4px 10px #e5e5e5;
  border-radius: 24px;
}

.movements .head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 18px;
  width: 100%;
  box-sizing: border-box;
}

.movements .body {
  height: 75vh;
  width: 100%;
}

.movements .head .grip {
  width: 120px;
  height: 8px;
  background-color: #e5e5e5;
  border-radius: 4px;
}
</style>
