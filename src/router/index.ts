import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const dynamicRoutes:RouteRecordRaw[] = [
  {
    // 主页
    path: '/',
    name: 'Home',
    component: () => import('@/layout/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: dynamicRoutes
})

export default router
