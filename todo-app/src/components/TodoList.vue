<script setup>
import TodoItem from './TodoItem.vue';

defineProps({
  todos: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['toggle', 'delete']);
</script>

<template>
  <ul class="todo-list">
    <TodoItem 
      v-for="todo in todos" 
      :key="todo.id" 
      :todo="todo" 
      @toggle="(id) => emit('toggle', id)" 
      @delete="(id) => emit('delete', id)" 
    />
  </ul>
</template>

<style scoped>
.todo-list { list-style: none; padding: 0; margin: 0; }
</style>