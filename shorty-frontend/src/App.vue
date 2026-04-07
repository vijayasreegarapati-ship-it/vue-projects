<script setup>
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useLinkStore } from './stores/linkStorage'

const store = useLinkStore()

onMounted(() => {
  store.startAutoRefresh()
})
</script>

<template>
  <div class="app-container">
    <header class="navbar">
      <h1>Shorty</h1>
      <nav>
        <RouterLink to="/">Create Link</RouterLink>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
        <RouterLink to="/analytics">Analytics</RouterLink>
      </nav>
    </header>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Inter', sans-serif; background-color: #f3f4f6; color: #1f2937; }
.app-container { max-width: 900px; margin: 40px auto; padding: 0 20px; }
.navbar { display: flex; justify-content: space-between; align-items: center; background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 20px; }
h1 { color: #8b5cf6; font-size: 1.5rem; margin: 0; }
nav { display: flex; gap: 15px; }
nav a { text-decoration: none; color: #6b7280; font-weight: 600; padding: 8px 12px; border-radius: 6px; }
nav a.router-link-active { background: #ede9fe; color: #8b5cf6; }
.content { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); min-height: 400px; }
</style>