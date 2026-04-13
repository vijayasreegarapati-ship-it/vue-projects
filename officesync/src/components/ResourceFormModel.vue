<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
      
      <div class="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
        <h3 class="text-lg font-bold text-slate-800">{{ title }}</h3>
        <button @click="$emit('close')" class="text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6">
        <div class="mb-4">
          <label class="block text-sm font-medium text-slate-700 mb-1">Resource Name</label>
          <input 
            v-model="formData.name" 
            type="text" 
            required 
            class="w-full border-slate-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2.5" 
            placeholder="e.g. Executive Boardroom" 
          />
        </div>

        <div class="mb-8">
          <label class="block text-sm font-medium text-slate-700 mb-1">Resource Type</label>
          <select 
            v-model="formData.resource_type" 
            required 
            class="w-full border-slate-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2.5 bg-white"
          >
            <option value="desk">Desk</option>
            <option value="meeting_room">Meeting Room</option>
          </select>
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
            class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Save Resource
          </button>
        </div>
      </form>
      
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  title: String,
  initialData: {    
    type: Object,
    default: null
  }
});

const emit = defineEmits(['close', 'submit']);

const formData = ref({
  name: '',
  resource_type: 'desk'
});

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    if (props.initialData) {
      formData.value = { 
        name: props.initialData.Name, 
        resource_type: props.initialData.ResourceType 
      };
    } else {
      formData.value = { name: '', resource_type: 'desk' };
    }
  }
});

const handleSubmit = () => {
  emit('submit', formData.value);
};
</script>