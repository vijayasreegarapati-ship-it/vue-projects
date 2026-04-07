<script setup>
import { onMounted } from 'vue'
import { useLinkStore } from '../stores/linkStorage'

const store = useLinkStore()

onMounted(() => {
  store.fetchLinks()
})

const handleEdit = async (link) => {

  const newUrl = prompt('Update the destination URL:', link.longUrl)
  
  if (newUrl && newUrl !== link.longUrl) {
    await store.updateLink(link.shortCode, newUrl)
  }
}
</script>

<template>
  <div class="dashboard">
    <div class="header-row">
      <h2>Your Links</h2>
      <button @click="store.fetchLinks" class="refresh-btn">Refresh</button>
    </div>
    
    <p v-if="store.isLoading" class="loading"> Fetching your links...</p>
    <p v-else-if="store.error" class="error"> {{ store.error }}</p>
    
    <div v-else-if="store.links.length > 0" class="table-container">
      <table class="links-table">
        <thead>
          <tr>
            <th>Short Link</th>
            <th>Original URL</th>
            <th>Clicks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="link in store.links" :key="link.id">
            <td class="short-col">
              <a :href="'http://localhost:8080/' + link.shortCode" target="_blank" class="short-link">
                localhost:8080/{{ link.shortCode }}
              </a>
            </td>
            <td class="long-col" :title="link.longUrl">{{ link.longUrl }}</td>
            <td class="clicks-col"><span class="badge">{{ link.clicks }}</span></td>
            <td class="actions-col">
              <button @click="handleEdit(link)" class="action-btn" title="Edit URL">Edit</button>
              <button @click="store.deleteLink(link.shortCode)" class="action-btn" title="Delete">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div v-else class="empty-state">
      <p>You haven't created any links yet!</p>
      <router-link to="/" class="create-btn">Create one now</router-link>
    </div>
  </div>
</template>

<style scoped>
.header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
h2 { color: #1f2937; margin: 0; }
.refresh-btn { background: #f3f4f6; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; color: #4b5563; font-weight: 600; }
.refresh-btn:hover { background: #e5e7eb; }
.table-container { overflow-x: auto; background: white; border: 1px solid #e5e7eb; border-radius: 8px; }
.links-table { width: 100%; border-collapse: collapse; text-align: left; }
th { background: #f9fafb; padding: 12px 15px; font-weight: 600; color: #4b5563; border-bottom: 2px solid #e5e7eb; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.5px; }
td { padding: 15px; border-bottom: 1px solid #e5e7eb; color: #1f2937; }
tr:last-child td { border-bottom: none; }
tr:hover { background-color: #f9fafb; }
.short-link { color: #8b5cf6; text-decoration: none; font-weight: bold; }
.short-link:hover { text-decoration: underline; }
.long-col { max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #6b7280; font-size: 0.9rem; }
.badge { background: #ede9fe; color: #7c3aed; padding: 4px 10px; border-radius: 999px; font-weight: bold; font-size: 0.85rem; }
.actions-col { text-align: right; display: flex; gap: 10px; justify-content: flex-end; }
.action-btn { background: none; border: none; font-size: 1.2rem; cursor: pointer; opacity: 0.6; transition: all 0.2s; }
.action-btn:hover { opacity: 1; transform: scale(1.1); }
.loading { color: #3b82f6; font-weight: bold; }
.error { color: #ef4444; font-weight: bold; }
.empty-state { text-align: center; padding: 40px; background: #f9fafb; border-radius: 8px; border: 2px dashed #d1d5db; }
.empty-state p { color: #6b7280; margin-bottom: 15px; }
.create-btn { background: #8b5cf6; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; }
</style>