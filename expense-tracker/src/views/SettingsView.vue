<script setup>
import { useFinanceStore } from '../stores/financeStore';

const store = useFinanceStore();
</script>

<template>
  <div class="settings-container">
    <h2>User Settings</h2>
    <p class="subtitle">Customize your SpendSmart experience.</p>

    <div class="settings-form">
      <div class="form-group">
        <label for="username">Display Name</label>
        <input 
          id="username" 
          type="text" 
          v-model="store.settings.name" 
        />
      </div>

      <div class="form-group">
        <label for="budget">Monthly Budget Limit ($)</label>
        <input 
          id="budget" 
          type="number" 
          v-model="store.settings.monthlyBudget" 
          min="0" 
        />
      </div>
    </div>

    <div class="save-notice">
      <p>Changes are saved automatically.</p>
    </div>
  </div>
</template>

<style scoped>
.settings-container { display: flex; flex-direction: column; gap: 20px; max-width: 500px; }
.subtitle { color: #6b7280; margin-top: -15px; margin-bottom: 10px; }

.settings-form { display: flex; flex-direction: column; gap: 20px; background: #f9fafb; padding: 25px; border-radius: 12px; border: 1px solid #e5e7eb; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label { font-weight: 600; color: #374151; font-size: 0.95rem; }
.form-group input { padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem; transition: border-color 0.2s; }
.form-group input:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }

.save-notice { background: #ecfdf5; color: #065f46; padding: 12px; border-radius: 8px; font-size: 0.9rem; text-align: center; }
</style>