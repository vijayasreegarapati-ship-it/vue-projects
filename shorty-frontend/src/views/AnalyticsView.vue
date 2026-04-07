<script setup>
import { onMounted } from 'vue'
import { useLinkStore } from '../stores/linkStorage'

const store = useLinkStore()

onMounted(() => {
  if (store.links.length === 0) {
    store.fetchLinks()
  }
})
</script>

<template>
  <div class="analytics">
    <h2>Performance Analytics</h2>
    <p class="subtitle">See how your links are performing across the web.</p>

    <div v-if="store.isLoading" class="loading"> Crunching the numbers...</div>
    
    <div v-else-if="store.totalLinks === 0" class="empty">
      No data available. Create some links to see your stats!
    </div>

    <div v-else class="stats-grid">
      <div class="stat-card">
        <h3>Total Links Created</h3>
        <p class="big-number">{{ store.totalLinks }}</p>
      </div>

      <div class="stat-card">
        <h3>Total Clicks</h3>
        <p class="big-number text-purple">{{ store.totalClicks }}</p>
      </div>

      <div class="stat-card popular-card">
        <h3>Most Popular Link</h3>
        <div v-if="store.mostPopularLink">
          <p class="short-code">/{{ store.mostPopularLink.shortCode }}</p>
          <p class="click-count">{{ store.mostPopularLink.clicks }} clicks</p>
          <p class="long-url">{{ store.mostPopularLink.longUrl }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.analytics { display: flex; flex-direction: column; gap: 20px; }
h2 { color: #1f2937; margin-bottom: 5px; }
.subtitle { color: #6b7280; margin-top: 0; margin-bottom: 20px; }

.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }
.stat-card { background: white; padding: 25px; border-radius: 12px; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px rgba(0,0,0,0.02); text-align: center; }
.stat-card h3 { color: #6b7280; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 15px; }
.big-number { font-size: 3rem; font-weight: bold; color: #1f2937; margin: 0; }
.text-purple { color: #8b5cf6; }

.popular-card { grid-column: 1 / -1; background: #faf5ff; border-color: #e9d5ff; }
.short-code { font-size: 2rem; font-weight: bold; color: #7c3aed; margin: 0; }
.click-count { color: #6b7280; font-weight: 600; margin: 10px 0; }
.long-url { color: #9ca3af; font-size: 0.9rem; word-break: break-all; }

.loading { color: #8b5cf6; font-weight: bold; }
.empty { color: #6b7280; font-style: italic; background: #f9fafb; padding: 20px; border-radius: 8px; text-align: center; }
</style>