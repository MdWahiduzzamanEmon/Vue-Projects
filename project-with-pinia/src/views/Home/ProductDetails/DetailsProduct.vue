<template>
  <section class="d-flex justify-content-end align-items-center">
    <!-- //back button  -->
    <router-link to="/">
      <button class="btn btn-outline-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          fill="currentColor"
          class="bi bi-arrow-left"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
          />
        </svg>
      </button>
    </router-link>
  </section>
  <!-- loading  -->
  <div v-if="loading" class="d-flex justify-content-center align-items-center">
    <div class="spinner-grow" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <!-- error  -->
  <div v-if="error" class="d-flex justify-content-center align-items-center">
    <h1>{{ error }}</h1>
  </div>

  <!-- main details  -->
  <main v-if="detailsSingleProduct" class="container">
    <div class="row align-items-center">
      <div class="col-md-6 d-flex justify-content-center align-items-center">
        <img
          :src="detailsSingleProduct.image"
          :alt="detailsSingleProduct.title"
          class="img-fluid"
          style="width: 50%; height: 100%; object-fit: contain"
        />
      </div>
      <div class="col-md-6">
        <h1>{{ detailsSingleProduct.title }}</h1>
        <p>{{ detailsSingleProduct.description }}</p>
        <p class="d-flex align-items-center justify-content-end border-bottom py-2">
          Quantity: {{ detailsSingleProduct?.quantity }}
        </p>

        <div class="d-flex align-items-center justify-content-between border-bottom py-2 mb-3">
          <section class="d-flex align-items-center gap-2">
            <button
              class="btn btn-outline-success btn-sm"
              @click="increaseQuantity(detailsSingleProduct)"
            >
              +
            </button>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="decreaseQuantity(detailsSingleProduct)"
            >
              -
            </button>
          </section>
          <p>
            Price: ${{
              Number(detailsSingleProduct?.price * detailsSingleProduct?.quantity)?.toFixed(2)
            }}
          </p>
        </div>

        <button class="btn btn-primary" @click="addSingleProduct(detailsSingleProduct)">
          Add to cart
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../../../stores/ProductStore/ProductStore'

import useAddProductStore from '../../../stores/AddProductStore/AddProductStore'

const router = useRoute()
const id = router.params.id

const productStore = useProductStore()
const { loading, error } = storeToRefs(productStore)
const { singleProduct } = productStore

const addProductStore = useAddProductStore()
const { increaseQuantity, decreaseQuantity, addSingleProduct } = addProductStore
const { detailsSingleProduct } = storeToRefs(addProductStore)

// console.log(detailsSingleProduct.value)
onMounted(() => {
  singleProduct(id)
})
</script>

<style scoped></style>
