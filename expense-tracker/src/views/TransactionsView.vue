<script setup>
import { reactive } from 'vue';
import { useFinanceStore } from '../stores/financeStore';

// Initialize the global store
const store = useFinanceStore();

// Local State: Just for the input form
const newTx = reactive({
  title: '',
  amount: null,
  type: 'expense' // default to expense
});

// Handle Form Submission
const handleAdd = () => {
  if (!newTx.title || !newTx.amount) return;

  // Calculate final amount (negative for expenses, positive for income)
  const finalAmount = newTx.type === 'expense' ? -Math.abs(newTx.amount) : Math.abs(newTx.amount);

  // Send to Pinia Store
  store.addTransaction({
    title: newTx.title,
    amount: finalAmount,
    category: newTx.type // Simple category for now
  });

  // Reset local form
  newTx.title = '';
  newTx.amount = null;
};
</script>

<template>
  <div class="transactions-container">
    <h2>Manage Transactions</h2>

    <form class="tx-form" @submit.prevent="handleAdd">
      <input type="text" v-model="newTx.title" placeholder="What was it for?" required />
      <input type="number" v-model="newTx.amount" placeholder="Amount ($)" min="0.01" step="0.01" required />
      
      <select v-model="newTx.type">
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <button type="submit">Add</button>
    </form>

    <div class="tx-list">
      <div v-if="store.transactions.length === 0" class="empty-state">
        No transactions yet. Add one above!
      </div>

      <div 
        v-for="tx in store.transactions" 
        :key="tx.id" 
        class="tx-item"
        :class="tx.amount > 0 ? 'border-green' : 'border-red'"
      >
        <div class="tx-info">
          <strong>{{ tx.title }}</strong>
          <span class="tx-type">{{ tx.category }}</span>
        </div>
        <div class="tx-actions">
          <span :class="tx.amount > 0 ? 'text-green' : 'text-red'">
            ${{ Math.abs(tx.amount).toFixed(2) }}
          </span>
          <button @click="store.deleteTransaction(tx.id)" class="delete-btn">✕</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transactions-container { display: flex; flex-direction: column; gap: 20px; }

/* Form Styles */
.tx-form { display: flex; gap: 10px; background: #f9fafb; padding: 15px; border-radius: 8px; flex-wrap: wrap; }
.tx-form input, .tx-form select { flex: 1; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; min-width: 120px; }
.tx-form button { padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
.tx-form button:hover { background: #1d4ed8; }

/* List Styles */
.tx-list { display: flex; flex-direction: column; gap: 10px; }
.empty-state { text-align: center; color: #6b7280; padding: 20px; font-style: italic; }
.tx-item { display: flex; justify-content: space-between; align-items: center; padding: 15px; background: white; border: 1px solid #e5e7eb; border-left: 5px solid #ccc; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
.border-green { border-left-color: #10b981; }
.border-red { border-left-color: #ef4444; }

.tx-info { display: flex; flex-direction: column; }
.tx-type { font-size: 0.8rem; color: #6b7280; text-transform: capitalize; }
.tx-actions { display: flex; align-items: center; gap: 15px; }

.text-green { color: #10b981; font-weight: bold; }
.text-red { color: #ef4444; font-weight: bold; }

.delete-btn { background: #fee2e2; color: #ef4444; border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
.delete-btn:hover { background: #ef4444; color: white; }
</style>