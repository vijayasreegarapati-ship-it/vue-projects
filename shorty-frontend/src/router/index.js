import { createRouter, createWebHistory } from 'vue-router'
import CreatorView from '../views/CreatorView.vue'
import DashboardView from '../views/DashboardView.vue'
import AnalyticsView from '../views/AnalyticsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'creator', component: CreatorView },
    { path: '/dashboard', name: 'dashboard', component: DashboardView },
    { path: '/analytics', name: 'analytics', component: AnalyticsView }
  ]
})

export default router