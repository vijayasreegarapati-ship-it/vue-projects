<template>
  <div class="bg-white rounded-lg border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="text-lg font-bold text-slate-800">{{ resource.Name }}</h3>
        <span class="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 capitalize">
          {{ resource.ResourceType.replace('_', ' ') }}
        </span>
      </div>
      <span 
        class="flex items-center text-xs font-medium px-2 py-1 rounded capitalize"
        :class="resource.Status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
      >
        <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="resource.Status === 'active' ? 'bg-green-500' : 'bg-red-500'"></span>
        {{ resource.Status }}
      </span>
    </div>
    
    <div class="pt-4 border-t border-slate-100 flex justify-end space-x-2">
      <button 
        @click="$emit('book', resource)" 
        class="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded transition-colors shadow-sm"
      >
        Book
      </button>
      
      <button
       @click="$emit('edit', resource)" 
       class="text-sm font-medium text-indigo-600 hover:text-indigo-800 px-3 py-1.5 rounded hover:bg-indigo-50 transition-colors">
        Edit
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  resource: {
    type: Object,
    required: true
  }
});
defineEmits(['edit', 'book']);
</script>