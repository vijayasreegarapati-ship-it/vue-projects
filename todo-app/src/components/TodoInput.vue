<script setup>
import { ref } from 'vue';

const newTask = ref('');
const emit = defineEmits(['add']);

const submitTask = () => {
  // Prevent emitting empty tasks by trimming whitespace
  if (newTask.value.trim()) {
    emit('add', newTask.value.trim());
    newTask.value = ''; // Clear the input after adding
  }
};
</script>

<template>
  <form class="todo-form" @submit.prevent="submitTask">
    <input 
      type="text" 
      v-model="newTask" 
      placeholder="What needs to be done?" 
    />
    <button type="submit">Add</button>
  </form>
</template>

<style scoped>
.todo-form { display: flex; gap: 10px; margin-bottom: 20px; }
input { flex: 1; padding: 10px; border: 1px solid #ccc; border-radius: 4px; }
button { padding: 10px 15px; background: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
button:hover { background: #2ecc71; }
</style>