import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import FormView from '../views/FormView.vue'

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
    component: FormView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
