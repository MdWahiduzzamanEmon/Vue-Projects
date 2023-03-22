import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () =>import('../views/Home/Home-blog.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ '../views/About/About-blog.vue')
    },
    {
      path: '/details/:id',
      name: 'blog',
      component: () => import(/* webpackChunkName: "blog" */ '../views/Details-Blog/Details-Blog.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import(/* webpackChunkName: "not-found" */ '../views/Not-Found/Not-Found.vue')

    }
  ]
})

export default router
