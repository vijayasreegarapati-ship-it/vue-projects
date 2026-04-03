<script setup>
defineProps({
  todo: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['toggle', 'delete']);
</script>

<template>
  <li class="todo-item">
    <label class="todo-label">
      <input 
        type="checkbox" 
        :checked="todo.completed" 
        @change="emit('toggle', todo.id)" 
      />
      <span :class="{ 'is-completed': todo.completed }">
        {{ todo.text }}
      </span>
    </label>
    
    <button class="delete-btn" @click="emit('delete', todo.id)">Delete</button>
  </li>
</template>

<style scoped>
.todo-item { display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #eee; }
.todo-label { display: flex; align-items: center; gap: 10px; cursor: pointer; }
.is-completed { text-decoration: line-through; color: #888; }
.delete-btn { background: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; }
.delete-btn:hover { background: #c0392b; }
</style>