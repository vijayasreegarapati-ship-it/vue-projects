<script setup>
import { ref, watch, onMounted } from 'vue';
import CounterDisplay from './components/CounterDisplay.vue';
import CounterControls from './components/CounterControls.vue';

// MAIN STATE
const count = ref(0);

// EVENT HANDLERS
const addCount = (stepAmount) => { count.value += stepAmount; };
const subtractCount = (stepAmount) => { count.value -= stepAmount; };
const resetCount = () => { count.value = 0; };

// LIFECYCLE: Load saved data when app starts
onMounted(() => {
  const savedCount = localStorage.getItem('vue-advanced-counter');
  if (savedCount !== null) {
    count.value = parseInt(savedCount, 10);
  }
});

// WATCHER: Save data whenever 'count' changes
watch(count, (newValue) => {
  localStorage.setItem('vue-advanced-counter', newValue);
});
</script>

<template>
  <main class="app-wrapper">
    <CounterDisplay :count="count" />

    <CounterControls 
      @increment="addCount"
      @decrement="subtractCount"
      @reset="resetCount"
    />
  </main>
</template>

<style>
/* Global App Styles */
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #1a1a1a;
  color: #ffffff;
  font-family: Arial, sans-serif;
}

.app-wrapper {
  background: #2c3e50;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.5);
  width: 320px;
}
</style>