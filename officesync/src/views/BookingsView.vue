<template>
  <div>
    <h1 class="text-3xl font-bold text-slate-800 mb-6">My Bookings</h1>

    <LoadingSpinner v-if="bookingStore.isLoading" />

    <div v-else-if="bookingStore.error" class="text-red-500 font-medium">
      {{ bookingStore.error }}
    </div>

    <div v-else-if="bookingStore.bookings.length === 0" class="text-center py-16 bg-white rounded-lg border border-dashed border-slate-300">
      <h3 class="text-sm font-semibold text-slate-900">No active bookings</h3>
      <p class="mt-1 text-sm text-slate-500">You haven't reserved any resources yet.</p>
      <router-link to="/resources" class="mt-4 inline-block text-indigo-600 font-medium hover:text-indigo-800">
        Browse Resources &rarr;
      </router-link>
    </div>

    <div v-else class="space-y-4">
      <div 
        v-for="booking in bookingStore.bookings" 
        :key="booking.ID"
        class="bg-white border border-slate-200 rounded-lg p-5 flex justify-between items-center shadow-sm"
      >
        <div>
          <h3 class="text-lg font-bold text-slate-800">{{ booking.Resource.Name }}</h3>
          <span class="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 capitalize">
            {{ booking.Resource.ResourceType.replace('_', ' ') }}
          </span>
        </div>
        
        <div class="text-right">
          <div class="text-sm font-medium text-slate-900">
            {{ formatDate(booking.start_time) }}
          </div>
          <div class="text-sm text-slate-500">
            {{ formatTime(booking.start_time) }} - {{ formatTime(booking.end_time) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useBookingStore } from '../stores/bookingStore';
import LoadingSpinner from '../components/LoadingSpinner.vue';

const bookingStore = useBookingStore();

onMounted(() => {
  bookingStore.fetchUserBookings();
});

const formatDate = (isoString) => {
  return new Date(isoString).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
};

const formatTime = (isoString) => {
  return new Date(isoString).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
};
</script>