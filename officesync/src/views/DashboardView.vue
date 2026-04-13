<template>
  <div>
    <h1 class="text-3xl font-bold text-slate-800 mb-6">Dashboard Overview</h1>

    <div v-if="resourceStore.isLoading" class="flex justify-center p-12">
      <svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        <div class="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex items-center space-x-4">
          <div class="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          </div>
          <div>
            <p class="text-sm font-medium text-slate-500">Total Resources</p>
            <h3 class="text-2xl font-bold text-slate-800">{{ totalResources }}</h3>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex items-center space-x-4">
          <div class="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          </div>
          <div>
            <p class="text-sm font-medium text-slate-500">Desks</p>
            <h3 class="text-2xl font-bold text-slate-800">{{ totalDesks }}</h3>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex items-center space-x-4">
          <div class="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </div>
          <div>
            <p class="text-sm font-medium text-slate-500">Meeting Rooms</p>
            <h3 class="text-2xl font-bold text-slate-800">{{ totalMeetingRooms }}</h3>
          </div>
        </div>

      </div>

      <div class="bg-white p-8 rounded-lg border border-slate-200 shadow-sm">
        <h2 class="text-xl font-bold text-slate-800 mb-2">Welcome back to OfficeSync</h2>
        <p class="text-slate-600 mb-6 max-w-2xl">
          Your centralized command center for managing office real estate. Ensure your team has the space they need by keeping the inventory up to date.
        </p>
        <router-link 
          to="/resources" 
          class="inline-flex items-center bg-indigo-600 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          Manage Inventory
          <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useResourceStore } from '../stores/resourceStore';

const resourceStore = useResourceStore();

onMounted(() => {
  if (resourceStore.resources.length === 0) {
    resourceStore.fetchResources();
  }
});

const totalResources = computed(() => resourceStore.resources.length);

const totalDesks = computed(() => 
  resourceStore.resources.filter(r => r.ResourceType === 'desk').length
);

const totalMeetingRooms = computed(() => 
  resourceStore.resources.filter(r => r.ResourceType === 'meeting_room').length
);
</script>