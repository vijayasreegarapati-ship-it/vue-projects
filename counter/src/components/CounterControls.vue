<script setup>
import { ref } from 'vue';

// LOCAL STATE: The step amount is only needed here
const step = ref(1);

// EMITS: Define the events we will send to the parent
const emit = defineEmits(['increment', 'decrement', 'reset']);

// Trigger events and pass the step value as a payload
const handleIncrement = () => emit('increment', step.value);
const handleDecrement = () => emit('decrement', step.value);
const handleReset = () => {
  step.value = 1;
  emit('reset');
};
</script>

<template>
  <div class="controls-box">
    <div class="step-input">
      <label for="step">Step Amount: </label>
      <input id="step" type="number" v-model.number="step" min="1" />
    </div>

    <div class="buttons">
      <button @click="handleDecrement">- Subtract</button>
      <button @click="handleReset">Reset</button>
      <button @click="handleIncrement">+ Add</button>
    </div>
  </div>
</template>

<style scoped>
.controls-box { display: flex; flex-direction: column; align-items: center; gap: 15px; }
.buttons { display: flex; gap: 10px; }
button { padding: 8px 16px; cursor: pointer; border-radius: 6px; border: none; font-weight: bold; background: #3498db; color: white; }
button:hover { background: #2980b9; }
input { padding: 5px; width: 60px; text-align: center; border-radius: 4px; border: 1px solid #ccc; }
</style>