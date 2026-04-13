// src/stores/authStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const isAdmin = ref(false);

  const currentRole = computed(() => isAdmin.value ? 'admin' : 'employee');

  function toggleRole() {
    isAdmin.value = !isAdmin.value;
  }

  return { isAdmin, currentRole, toggleRole };
});