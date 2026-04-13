import apiClient from './axios';

export default {
  getResources() {
    return apiClient.get('/resources');
  },

  createResource(data) {
    return apiClient.post('/resources', data);
  },

  updateResource(id, data) {
    return apiClient.put(`/resources/${id}`, data);
  }
};