<template>
  <button @click="showModal = true">Agregar movimiento</button>
  <Teleport defer to="#app">
    <Modal v-show="showModal" @close="showModal = false">
      <form @submit.prevent="submit">
        <div class="field">
          <label>Título</label>
          <input type="text" v-model="title" />
        </div>
        <div class="field">
          <label>Monto</label>
          <input type="number" v-model="amount" step="0.01" />
        </div>
        <div class="field">
          <label>Descripción</label>
          <textarea rows="4" v-model="description" />
        </div>
        <div class="field">
          <label class="radio-label">
            <input type="radio" v-model="movementType" value="Ingreso" />
            <span>Ingreso</span>
          </label>
          <label class="radio-label">
            <input type="radio" v-model="movementType" value="Gasto" />
            <span>Gasto</span>
          </label>
        </div>
        <div class="action">
          <button>Agregar movimiento</button>
        </div>
      </form>
    </Modal>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import Modal from './Modal.vue'

const showModal: Ref<boolean> = ref(false)
const title = ref<string>('')
const amount = ref<number>(0.0)
const description = ref<string>('')
const movementType = ref<'Ingreso' | 'Gasto'>('Ingreso')

const emit = defineEmits(['create'])

const submit = () => {
  showModal.value = !showModal.value
  emit('create', {
    title: title.value,
    description: description.value,
    amount: movementType.value === 'Ingreso' ? amount.value : -amount.value,
    date: new Date(),
    id: Math.round(Math.random() * new Date().getMilliseconds()),
  })
  cleanform()
}

function cleanform() {
  title.value = ''
  description.value = ''
  amount.value = 0
  movementType.value = 'Ingreso'
}
</script>

<style scoped>
button {
  color: white;
  font-size: 1rem;
  background-color: var(--brand-blue);
  border: none;
  width: 100%;
  padding: 12px 40px;
  border-radius: 60px;
  box-sizing: border-box;
}

form {
  font-size: 1.24rem;
  width: 100%;
}

form .action {
  padding: 0 24px;
}

.field {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 16px 24px;
}

label {
  margin-bottom: 8px;
}

input,
textarea {
  font-size: 1.24rem;
  border: 2px solid var(--brand-blue);
  border-radius: 8px;
  padding: 8px;
}

input[type='number'] {
  text-align: right;
}

.radio-label {
  display: flex;
  align-items: center;
  margin-top: 8px;
}

.radio-label span {
  margin-top: 4px;
  margin-left: 8px;
}

input[type='radio'] {
  appearance: none;
  width: 1.24rem;
  height: 1.24rem;
  color: var(--brand-blue);
  border: 2px solid var(--brand-blue);
  border-radius: 50%;
}

input[type='radio']:checked {
  background-color: var(--brand-blue);
}
</style>
