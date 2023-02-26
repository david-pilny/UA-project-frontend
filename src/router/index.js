import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminView from '../views/AdminView.vue'
import i18n from '../i18n'

const routes = [
  {
    path: '/',
    redirect: `/${i18n.locale}`,
  },
  {
    path: '/:lang',
    component: {
      template: `<router-view></router-view>`,
    },
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
