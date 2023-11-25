import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/Home.vue')
    },
    {
      path: '/create-blog',
      name: 'create-blog',
      component: () => import('../pages/CreateBlog.vue')
    }
  ]
})

export default router
