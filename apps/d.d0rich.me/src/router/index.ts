import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../pages/Home.vue')
    },
    {
      path: '/my-blogs',
      component: () => import('../pages/MyBlogs.vue')
    },
    {
      path: '/my-blogs/create',
      component: () => import('../pages/CreateBlog.vue')
    }
  ]
})

export default router
