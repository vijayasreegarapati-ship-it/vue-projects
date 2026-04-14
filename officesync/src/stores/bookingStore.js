import { defineStore } from 'pinia';
import { ref } from 'vue';
import bookingApi from '../api/booking.api';

export const useBookingStore = defineStore('booking', () => {
  const bookings = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  async function fetchUserBookings() {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await bookingApi.getBookings();
      bookings.value = response.data || [];
    } catch (err) {
      error.value = err.response?.data?.error || 'Failed to fetch bookings';
    } finally {
      isLoading.value = false;
    }
  }

  return { bookings, isLoading, error, fetchUserBookings };
});