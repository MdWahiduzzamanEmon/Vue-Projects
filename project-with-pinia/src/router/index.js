import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home/Products/ProductAllList.vue')
    },
    {
      path: '/productDetails/:id',
      name: 'productDetails',
      component: () => import('../views/Home/ProductDetails/DetailsProduct.vue')
    },
    {
      path: '/exploreAll',
      name: 'exploreAll',
      component: () => import('../views/ExploreAllProducts/ExploreAllProducts.vue')
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: "" }
  ]
})

export default router
