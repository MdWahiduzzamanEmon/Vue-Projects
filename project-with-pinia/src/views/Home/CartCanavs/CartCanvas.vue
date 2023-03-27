<template>
  <section>
    <div class="dropdown">
      <button
        class="dropdown-toggle position-relative btn border-0"
        id="dropdownMenuClickableInside"
        data-bs-toggle="dropdown"
        data-bs-auto-close="false"
        data-bs-display="static"
        aria-expanded="false"
        :disabled="!isLoggedIn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-cart cursor-pointer ms-3"
          viewBox="0 0 16 16"
        >
          <path
            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
          />
        </svg>
        <span
          class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          v-if="addProductList.length > 0"
        >
          {{ addProductList.length }}
          <span class="visually-hidden">unread messages</span>
        </span>
      </button>
      <ul
        class="dropdown-menu dropdown-menu-end p-3 dropDown_Style"
        aria-labelledby="dropdownMenuClickableInside"
      >
        <section v-if="addProductList.length > 0" class="list-group">
          <!-- send also index -->
          <li v-for="(product, index) in addProductList" :key="index">
            <AddCardList :product="product" :index="index" />
          </li>

          <div class="d-flex justify-content-between">
            <button class="btn btn-danger btn-sm" @click="clearCart">Clear Cart</button>
            <p class="mb-0">Total Price: {{ totalPrice }}</p>
          </div>
        </section>
        <section v-else>
          <p class="text-center">No products in cart</p>
        </section>
      </ul>
    </div>
  </section>
</template>

<script setup>
import useAddProductStore from '@/stores/AddProductStore/AddProductStore.js'
import { storeToRefs } from 'pinia'
import AddCardList from '@/components/AddCardList/AddCardList.vue'
import { defineProps, toRefs } from 'vue'

const props = defineProps(['isLoggedIn'])

const { isLoggedIn } = toRefs(props)

const addProductStore = useAddProductStore()

const { addProductList, totalPrice } = storeToRefs(addProductStore)

const clearCart = () => {
  addProductStore.$patch((state) => {
    state.addProductList = []
  })
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.dropDown_Style {
  width: 28.125rem;
}
@media (max-width: 767px) {
  .dropDown_Style {
    width: 18.5rem;
  }
}
</style>
