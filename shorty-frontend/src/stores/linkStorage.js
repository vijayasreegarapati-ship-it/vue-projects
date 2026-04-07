import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLinkStore = defineStore('links', () => {
  const links = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const fetchLinks = async (showLoading = true) => {
    if (showLoading) isLoading.value = true
    error.value = null
    try {
      const response = await fetch('http://localhost:8080/api/links')
      if (!response.ok) throw new Error('Failed to fetch data')
      const data = await response.json()
      links.value = data || []
    } catch (err) {
      error.value = err.message
    } finally {
      if (showLoading) isLoading.value = false 
    }
  }


  const startAutoRefresh = () => {
    setInterval(() => {
      fetchLinks(false) 
    }, 5000)

    window.addEventListener('focus', () => {
      fetchLinks(false)
    })
  }

  const createLink = async (longUrl) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetch('http://localhost:8080/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl: longUrl })
      })
      if (!response.ok) throw new Error('Failed to create link')
      const newLink = await response.json()
      links.value.push(newLink) 
      return true 
    } catch (err) {
      error.value = err.message
      return false
    } finally {
      isLoading.value = false
    }
  }

  const updateLink = async (shortCode, newLongUrl) => {
    try {
      const response = await fetch(`http://localhost:8080/api/links/${shortCode}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl: newLongUrl })
      })
      if (!response.ok) throw new Error('Failed to update link')
      const updatedLink = await response.json()
      const index = links.value.findIndex(l => l.shortCode === shortCode)
      if (index !== -1) {
        links.value[index] = updatedLink
      }
    } catch (err) {
      error.value = err.message
    }
  }

  const deleteLink = async (shortCode) => {
    try {
      const response = await fetch(`http://localhost:8080/api/links/${shortCode}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete link')
      links.value = links.value.filter(link => link.shortCode !== shortCode)
    } catch (err) {
      error.value = err.message
    }
  }

  const totalLinks = computed(() => links.value.length)
  const totalClicks = computed(() => links.value.reduce((sum, link) => sum + link.clicks, 0))
  const mostPopularLink = computed(() => {
    if (links.value.length === 0) return null
    return links.value.reduce((max, link) => (link.clicks > max.clicks ? link : max), links.value[0])
  })

  return { 
    links, isLoading, error, 
    fetchLinks, startAutoRefresh, createLink, updateLink, deleteLink, 
    totalLinks, totalClicks, mostPopularLink 
  }
})