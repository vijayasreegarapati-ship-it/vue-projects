<script setup>
import { computed } from 'vue';
import { useFinanceStore } from '../stores/financeStore';

// 1. Connect to the global store
const store = useFinanceStore();

// 2. Local computed property: Grab only the 3 most recent transactions
const recentTransactions = computed(() => {
  // .slice().reverse() creates a copy, flips it so newest is first, and grabs the top 3
  return store.transactions.slice().reverse().slice(0, 3);
});
</script>

<template>
  <div class="dashboard">
    <h2>Welcome back, {{ store.settings.name }}!</h2>

    <div class="summary-cards">
      <div class="card balance">
        <h3>Total Balance</h3>
        <p :class="store.totalBalance >= 0 ? 'text-green' : 'text-red'">
          ${{ store.totalBalance.toFixed(2) }}
        </p>
      </div>
      <div class="card income">
        <h3>Income</h3>
        <p class="text-green">+${{ store.totalIncome.toFixed(2) }}</p>
      </div>
      <div class="card expenses">
        <h3>Expenses</h3>
        <p class="text-red">-${{ store.totalExpenses.toFixed(2) }}</p>
      </div>
    </div>

    <div class="recent-section">
      <h3>Recent Activity</h3>
      <div v-if="recentTransactions.length === 0" class="empty">
        No recent activity.
      </div>
      
      <ul class="recent-list" v-else>
        <li 
          v-for="tx in recentTransactions" 
          :key="tx.id"
          :class="tx.amount > 0 ? 'border-green' : 'border-red'"
        >
          <span>{{ tx.title }}</span>
          <span :class="tx.amount > 0 ? 'text-green' : 'text-red'">
            {{ tx.amount > 0 ? '+' : '' }}${{ Math.abs(tx.amount).toFixed(2) }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.dashboard { display: flex; flex-direction: column; gap: 30px; }
h2 { color: #1f2937; }

/* Summary Cards */
.summary-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
.card { padding: 20px; border-radius: 12px; background: white; border: 1px solid #e5e7eb; box-shadow: 0 2px 4px rgba(0,0,0,0.05); text-align: center; }
.card h3 { font-size: 1rem; color: #6b7280; margin-bottom: 10px; }
.card p { font-size: 2rem; font-weight: bold; margin: 0; }

.text-green { color: #10b981; }
.text-red { color: #ef4444; }

/* Recent List */
.recent-section h3 { margin-bottom: 15px; color: #374151; }
.recent-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.recent-list li { display: flex; justify-content: space-between; padding: 15px; background: #f9fafb; border-radius: 8px; border-left: 4px solid #ccc; }
.border-green { border-left-color: #10b981 !important; }
.border-red { border-left-color: #ef4444 !important; }
.empty { color: #6b7280; font-style: italic; }
</style>