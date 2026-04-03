<script setup>
import { ref, computed } from 'vue';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';

// 1. STATE: Array of objects
const todos = ref([
  { id: 1, text: 'Master Vue 3 Composition API', completed: false }
]);

// 2. METHODS: Modifying the array
const handleAdd = (text) => {
  todos.value.push({
    id: Date.now(), // Generate a unique ID
    text: text,
    completed: false
  });
};

const handleToggle = (id) => {
  // Find the exact object in the array
  const targetTodo = todos.value.find(todo => todo.id === id);
  if (targetTodo) {
    targetTodo.completed = !targetTodo.completed; // Flip the boolean
  }
};

const handleDelete = (id) => {
  // Overwrite the array with a new array that excludes the deleted ID
  todos.value = todos.value.filter(todo => todo.id !== id);
};

// 3. COMPUTED: Derived data for the UI
const remainingTasks = computed(() => {
  return todos.value.filter(todo => !todo.completed).length;
});
</script>

<template>
  <main class="app-wrapper">
    <h1>My Tasks</h1>
    
    <TodoInput @add="handleAdd" />
    
    <TodoList 
      :todos="todos" 
      @toggle="handleToggle" 
      @delete="handleDelete" 
    />

    <p class="summary" v-if="todos.length > 0">
      <strong>{{ remainingTasks }}</strong> task(s) left to do
    </p>
    <p class="summary" v-else>
      You have no tasks. Enjoy your day!
    </p>
  </main>
</template>

<style>
/* Global Layout Styles */
body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; display: flex; justify-content: center; padding-top: 50px; margin: 0; color: #333; }
.app-wrapper { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); width: 400px; }
h1 { margin-top: 0; text-align: center; color: #2c3e50; }
.summary { text-align: center; margin-top: 20px; font-size: 0.9rem; color: #7f8c8d; }
</style>