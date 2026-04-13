<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
      
      <div class="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <h3 class="text-lg font-bold text-slate-800">Book {{ resource?.Name }}</h3>
        <button @click="$emit('close')" class="text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6">
        
        <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
          {{ errorMessage }}
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-slate-700 mb-1">Date</label>
          <input 
            v-model="form.date" 
            type="date" 
            required 
            class="w-full border-slate-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2.5" 
          />
        </div>

        <div class="grid grid-cols-2 gap-4 mb-8">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Start Time</label>
            <input 
              v-model="form.startTime" 
              type="time" 
              required 
              class="w-full border-slate-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2.5" 
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">End Time</label>
            <input 
              v-model="form.endTime" 
              type="time" 
              required 
              class="w-full border-slate-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2.5" 
            />
          </div>
        </div>

        <div class="flex justify-end space-x-3">
          <button 
            type="button" 
            @click="$emit('close')" 
            class="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            :disabled="isSubmitting"
            class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50"
          >
            {{ isSubmitting ? 'Booking...' : 'Confirm Booking' }}
          </button>
        </div>
      </form>
      
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import bookingApi from '../api/booking.api';

const props = defineProps({
  isOpen: Boolean,
  resource: Object
});

const emit = defineEmits(['close', 'success']);

const form = ref({
  date: '',
  startTime: '09:00',
  endTime: '10:00'
});

const isSubmitting = ref(false);
const errorMessage = ref('');


watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    form.value = { date: '', startTime: '09:00', endTime: '10:00' };
    errorMessage.value = '';
  }
});

const handleSubmit = async () => {
  isSubmitting.value = true;
  errorMessage.value = '';

  try {
    const startISO = new Date(`${form.value.date}T${form.value.startTime}`).toISOString();
    const endISO = new Date(`${form.value.date}T${form.value.endTime}`).toISOString();

    const payload = {
      resource_id: props.resource.ID,
      start_time: startISO,
      end_time: endISO
    };

    await bookingApi.createBooking(payload);
    emit('success'); 
    emit('close');
  } catch (err) {
    errorMessage.value = err.response?.data?.error || 'An error occurred while booking.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>