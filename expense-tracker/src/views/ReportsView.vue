<script setup>
import { computed } from 'vue';
import { useFinanceStore } from '../stores/financeStore';

const store = useFinanceStore();

// 1. BUDGET CALCULATION
// Calculate what percentage of the budget has been spent
const budgetPercentage = computed(() => {
  if (store.settings.monthlyBudget <= 0) return 0;
  
  const rawPercentage = (store.totalExpenses / store.settings.monthlyBudget) * 100;
  return Math.min(rawPercentage, 100); // Cap it at 100% so our CSS bar doesn't break
});

// 2. ADVANCED ARRAY METHODS (.filter and .reduce)
// Find the single largest expense in the transactions array
const highestExpense = computed(() => {
  // First, isolate only the expenses (amount < 0)
  const expenses = store.transactions.filter(t => t.amount < 0);
  
  if (expenses.length === 0) return null;
  
  // Then, use reduce to compare them and find the biggest one
  return expenses.reduce((max, current) => {
    return Math.abs(current.amount) > Math.abs(max.amount) ? current : max;
  });
});
</script>

<template>
  <div class="reports-container">
    <h2>Financial Reports</h2>
    <p class="subtitle">Insights based on your spending habits.</p>

    <div class="report-section">
      <div class="budget-header">
        <h3>Monthly Budget Tracker</h3>
        <span>${{ store.totalExpenses.toFixed(2) }} / ${{ store.settings.monthlyBudget }}</span>
      </div>
      
      <div class="progress-track">
        <div 
          class="progress-fill" 
          :style="{ width: budgetPercentage + '%' }"
          :class="{ 'over-budget': budgetPercentage >= 90 }"
        ></div>
      </div>
      
      <p class="warning-text" v-if="budgetPercentage >= 100">
        You have exceeded your monthly budget!
      </p>
    </div>

    <div class="report-section">
      <h3>Spending Insights</h3>
      <div class="insight-cards">
        <div class="card">
          <h4>Total Transactions</h4>
          <p class="big-number">{{ store.transactions.length }}</p>
        </div>
        
        <div class="card">
          <h4>Highest Single Expense</h4>
          <div v-if="highestExpense">
            <p class="text-red big-number">
              ${{ Math.abs(highestExpense.amount).toFixed(2) }}
            </p>
            <p class="item-name">{{ highestExpense.title }}</p>
          </div>
          <p v-else class="empty">No expenses recorded yet.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reports-container { display: flex; flex-direction: column; gap: 30px; }
h2 { color: #1f2937; margin-bottom: 5px; }
.subtitle { color: #6b7280; margin-top: 0; }

.report-section { background: white; padding: 25px; border-radius: 12px; border: 1px solid #e5e7eb; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
.report-section h3 { color: #374151; margin-bottom: 15px; border-bottom: 1px solid #f3f4f6; padding-bottom: 10px; }

/* Progress Bar Styles */
.budget-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 10px; font-weight: 600; color: #4b5563; }
.progress-track { height: 20px; background-color: #e5e7eb; border-radius: 10px; overflow: hidden; }
.progress-fill { height: 100%; background-color: #3b82f6; transition: width 0.5s ease, background-color 0.3s; }
.progress-fill.over-budget { background-color: #ef4444; }
.warning-text { color: #ef4444; font-weight: bold; margin-top: 10px; font-size: 0.9rem; }

/* Insight Cards */
.insight-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
.card { background: #f9fafb; padding: 20px; border-radius: 8px; text-align: center; border: 1px solid #f3f4f6; }
.card h4 { color: #6b7280; font-size: 0.9rem; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
.big-number { font-size: 2rem; font-weight: bold; color: #1f2937; margin: 0; }
.text-red { color: #ef4444; }
.item-name { color: #4b5563; font-size: 0.9rem; margin-top: 5px; }
.empty { color: #9ca3af; font-style: italic; margin-top: 10px; }
</style>