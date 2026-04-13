<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-slate-800">Office Resources</h1>
      <button 
        @click="openCreateModal" 
        class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
      >
        + Add Resource
      </button>
    </div>

    <ResourceFormModal 
      :isOpen="isModalOpen" 
      :title="selectedResource ? 'Edit Resource' : 'Add New Resource'" 
      :initialData="selectedResource"
      @close="closeModal" 
      @submit="handleFormSubmit"
    />

    <BookingModal 
      :isOpen="isBookingModalOpen" 
      :resource="resourceToBook"
      @close="isBookingModalOpen = false"
      @success="() => { /* TODO: show a success toast here later! */ }"
    />

    <div v-if="resourceStore.error" class="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-md">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-red-700 font-medium">{{ resourceStore.error }}</p>
        </div>
      </div>
    </div>

    <LoadingSpinner v-if="resourceStore.isLoading" />

    <div v-else-if="resourceStore.resources.length === 0 && !resourceStore.error" class="text-center py-16 bg-white rounded-lg border border-dashed border-slate-300">
      <svg class="mx-auto h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
      <h3 class="mt-4 text-sm font-semibold text-slate-900">No resources</h3>
      <p class="mt-1 text-sm text-slate-500">Get started by creating a new desk or meeting room.</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ResourceCard 
        v-for="res in resourceStore.resources" 
        :key="res.ID" 
        :resource="res" 
        @edit="openEditModal"
        @book="openBookingModal"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useResourceStore } from '../stores/resourceStore';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import ResourceCard from '../components/ResourceCard.vue';
import ResourceFormModal from '../components/ResourceFormModel.vue'; 
import BookingModal from '../components/BookingModal.vue';

const resourceStore = useResourceStore();
const isModalOpen = ref(false); 
const selectedResource = ref(null); // Track the resource being edited

const isBookingModalOpen = ref(false);
const resourceToBook = ref(null);

const openBookingModal = (resource) => {
  resourceToBook.value = resource;
  isBookingModalOpen.value = true;
};

onMounted(() => {
  resourceStore.fetchResources();
});

const openCreateModal = () => {
  selectedResource.value = null;
  isModalOpen.value = true;
}

const openEditModal = (resource) => {
  selectedResource.value = resource; 
  isModalOpen.value = true; 
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedResource.value = null;
};

const handleFormSubmit = async (formData) => {
  let success = false;

  if (selectedResource.value) {
    success = await resourceStore.editResource(selectedResource.value.ID, formData);
  } else {
    success = await resourceStore.createResource(formData);
  }

  if (success) {
    closeModal();
  }
};
</script>