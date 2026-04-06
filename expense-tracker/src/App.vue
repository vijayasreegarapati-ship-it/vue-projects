<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
    <header class="navbar">
      <h1>SpendSmart</h1>
      <nav>
        <RouterLink to="/">Dashboard</RouterLink>
        <RouterLink to="/transactions">Transactions</RouterLink>
        <RouterLink to="/reports">Reports</RouterLink>
        <RouterLink to="/settings">Settings</RouterLink>
      </nav>
    </header>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style>
/* Global App Styles */
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f3f4f6; color: #1f2937; }

.app-container { max-width: 800px; margin: 40px auto; padding: 0 20px; }
.navbar { display: flex; justify-content: space-between; align-items: center; background: white; padding: 20px 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 20px; }
h1 { color: #2563eb; font-size: 1.5rem; margin: 0; }
nav { display: flex; gap: 15px; }
nav a { text-decoration: none; color: #6b7280; font-weight: 600; padding: 8px 12px; border-radius: 6px; transition: all 0.2s; }
nav a:hover { background: #f3f4f6; color: #1f2937; }

/* Vue Router automatically applies this class to the active link */
nav a.router-link-active { background: #eff6ff; color: #2563eb; }

.content { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); min-height: 400px; }
</style>