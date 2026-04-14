import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';
import ResourcesView from '../views/ResourcesView.vue';
import BookingsView from '../views/BookingsView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/resources',
      name: 'resources',
      component: ResourcesView
    },
    {
      path: '/bookings',
      name: 'bookings',
      component: BookingsView
    }
  ]
});

export default router;