import apiClient from './axios';

export default {
  createBooking(bookingData) {
    return apiClient.post('/bookings', bookingData, {
      headers: {
        'X-User-Id': '1' 
      }
    });
  }
};