import { defineStore } from 'pinia';
import { ref, reactive, computed, watch } from 'vue';

export const useFinanceStore = defineStore('finance', () => {
  // 1. STATE (Check localStorage first for existing data)
  const savedData = JSON.parse(localStorage.getItem('spendsmart-data')) || {};

  const transactions = ref(savedData.transactions || []);
  const settings = reactive(savedData.settings || { 
    name: 'User', 
    monthlyBudget: 1000 
  });

  // 2. GETTERS (Derived Data)
  const totalIncome = computed(() => {
    return transactions.value
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
  });

  const totalExpenses = computed(() => {
    return transactions.value
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0); 
  });

  const totalBalance = computed(() => totalIncome.value - totalExpenses.value);

  // 3. ACTIONS (Modifiers)
  const addTransaction = (newTransaction) => {
    transactions.value.push({
      ...newTransaction,
      id: Date.now() // Generate a unique ID
    });
  };

  const deleteTransaction = (id) => {
    transactions.value = transactions.value.filter(t => t.id !== id);
  };

  // 4. PERSISTENCE (Auto-save to browser)
  watch(
    [transactions, settings], 
    () => {
      const dataToSave = {
        transactions: transactions.value,
        settings: settings
      };
      localStorage.setItem('spendsmart-data', JSON.stringify(dataToSave));
    },
    { deep: true } // Tells Vue to watch inside arrays and objects!
  );

  return {
    transactions,
    settings,
    totalIncome,
    totalExpenses,
    totalBalance,
    addTransaction,
    deleteTransaction
  };
});