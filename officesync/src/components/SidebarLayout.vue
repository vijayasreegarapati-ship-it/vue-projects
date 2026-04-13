<template>
  <div class="flex h-screen bg-slate-50">
    <aside class="w-64 bg-slate-900 text-white flex flex-col justify-between">
      <div>
        <div class="h-16 flex items-center px-6 border-b border-slate-800">
          <span class="text-xl font-bold tracking-wide">OfficeSync</span>
        </div>
        <nav class="p-4 space-y-2">
          <router-link 
            to="/" 
            class="block px-4 py-2 rounded-md transition-colors hover:bg-slate-800"
            active-class="bg-indigo-600 hover:bg-indigo-600"
          >
            Dashboard
          </router-link>
          <router-link 
            to="/resources" 
            class="block px-4 py-2 rounded-md transition-colors hover:bg-slate-800"
            active-class="bg-indigo-600 hover:bg-indigo-600"
          >
            Resources
          </router-link>
        </nav>
      </div>

      <div class="p-4 border-t border-slate-800 bg-slate-950">
        <div class="text-xs text-slate-400 mb-2 uppercase tracking-wider font-semibold">Simulated User</div>
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium">Role: <span class="text-indigo-400">{{ authStore.currentRole }}</span></span>
          <button 
            @click="authStore.toggleRole"
            class="text-xs bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded transition-colors"
          >
            Toggle
          </button>
        </div>
      </div>
    </aside>

    <main class="flex-1 flex flex-col overflow-hidden">
      <div class="flex-1 overflow-y-auto p-8">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();
</script>