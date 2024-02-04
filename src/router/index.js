import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '',
    redirect: 'home',
  },
  {
    name: 'home',
    path: '/:section',
    component: HomeView,
  },
  {
    name: 'form',
    path: '/form',
    component: () => import('../views/FormView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
