<script setup>
import { ref } from 'vue'
import { useLinkStore } from '../stores/linkStorage'
import { useRouter } from 'vue-router'

const store = useLinkStore()
const router = useRouter()

const urlInput = ref('')

const handleSubmit = async () => {
  if (!urlInput.value) return
  
  const success = await store.createLink(urlInput.value)
  
  if (success) {
    urlInput.value = '' 
    router.push('/dashboard') 
  }
}
</script>

<template>
  <div class="creator-container">
    <div class="creator-card">
      <h2>Shorten a new URL</h2>
      <p class="subtitle">Paste your long link below to generate a clean and trackable short code.</p>

      <form @submit.prevent="handleSubmit" class="link-form">
        <div class="input-group">
          <input 
            type="url" 
            v-model="urlInput" 
            placeholder="https://example.com/very/long/path..." 
            required
            :disabled="store.isLoading"
          />
        </div>
        
        <button type="submit" :disabled="store.isLoading" class="submit-btn">
          <span v-if="store.isLoading">Shortening...</span>
          <span v-else>Shorten URL</span>
        </button>
      </form>
      
      <div v-if="store.error" class="error-banner">
        {{ store.error }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.creator-container { display: flex; justify-content: center; padding-top: 40px; }
.creator-card { background: white; padding: 40px; border-radius: 12px; border: 1px solid #e5e7eb; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05); text-align: center; max-width: 550px; width: 100%; }

h2 { color: #1f2937; margin-bottom: 10px; font-size: 1.8rem; }
.subtitle { color: #6b7280; margin-bottom: 30px; font-size: 1.05rem; }

.link-form { display: flex; flex-direction: column; gap: 20px; }
.input-group { display: flex; flex-direction: column; text-align: left; }

input { padding: 16px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 1.1rem; outline: none; transition: border-color 0.2s, box-shadow 0.2s; background: #f9fafb; color: #1f2937; }
input:focus { border-color: #8b5cf6; background: white; box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1); }
input:disabled { opacity: 0.6; cursor: not-allowed; }

.submit-btn { background: #8b5cf6; color: white; border: none; padding: 16px; border-radius: 8px; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: background 0.2s, transform 0.1s; }
.submit-btn:hover:not(:disabled) { background: #7c3aed; }
.submit-btn:active:not(:disabled) { transform: scale(0.98); }
.submit-btn:disabled { background: #a78bfa; cursor: not-allowed; }

.error-banner { margin-top: 20px; background: #fef2f2; color: #ef4444; padding: 12px; border-radius: 8px; font-weight: 600; font-size: 0.95rem; border: 1px solid #fecaca; }
</style>