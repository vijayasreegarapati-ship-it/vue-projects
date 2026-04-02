<script setup>
import { computed } from 'vue';

// PROPS: Receive the count from App.vue
const props = defineProps({
  count: {
    type: Number,
    required: true
  }
});

// COMPUTED: Automatically recalculate when props.count changes
const doubleCount = computed(() => props.count * 2);
const isEven = computed(() => props.count % 2 === 0);
</script>

<template>
  <div class="display-box">
    <h2>Current Count</h2>
    
    <h1 :class="{ 'text-red': count < 0, 'text-green': count > 10 }">
      {{ count }}
    </h1>

    <div class="math-facts">
      <p><strong>Double:</strong> {{ doubleCount }}</p>
      <p><strong>Even/Odd:</strong> {{ isEven ? 'Even' : 'Odd' }}</p>
    </div>
  </div>
</template>

<style scoped>
.display-box { text-align: center; margin-bottom: 20px; }
h1 { font-size: 4rem; margin: 10px 0; transition: color 0.2s; }
.text-red { color: #e74c3c; }
.text-green { color: #2ecc71; }
.math-facts { background: rgba(255, 255, 255, 0.1); padding: 10px; border-radius: 8px; }
</style>