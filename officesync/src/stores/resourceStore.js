// src/stores/resourceStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import resourceApi from '../api/resource.api';

export const useResourceStore = defineStore('resource', () => {
  const resources = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  async function fetchResources() {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await resourceApi.getResources();
      resources.value = response.data || []; 
    } catch (err) {
      error.value = err.response?.data?.error || 'Failed to fetch resources';
    } finally {
      isLoading.value = false;
    }
  }

  async function createResource(resourceData) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await resourceApi.createResource(resourceData);
      resources.value.push(response.data);
      return true; 
    } catch (err) {
      error.value = err.response?.data?.error || 'Failed to create resource';
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  async function editResource(id, resourceData) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await resourceApi.updateResource(id, resourceData);
      
      const index = resources.value.findIndex(r => r.ID === id);
      if (index !== -1) {
        resources.value[index] = response.data;
      }
      return true; 
    } catch (err) {
      error.value = err.response?.data?.error || 'Failed to update resource';
      return false; 
    } finally {
      isLoading.value = false;
    }
  }

  return { resources, isLoading, error, fetchResources, createResource, editResource };
});