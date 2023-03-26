<template>
  <!-- //back button  -->
  <section class="d-flex justify-content-end align-items-center">
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
  <main v-if="detailsSingleProduct && !loading" class="container">
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

        <!-- // buy now and add to cart button -->
        <section class="d-flex justify-content-end gap-2">
          <!-- //buy now button -->
          <button class="btn btn-success d-flex align-items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-bag-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"
              />
            </svg>
            Buy Now
          </button>
          <!-- // add to cart button -->
          <button class="btn btn-primary" @click="addSingleProduct(detailsSingleProduct)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-cart-plus-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z"
              />
            </svg>
          </button>
        </section>
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

//get id from route
const router = useRoute()
const id = router.params.id

//all product store
const productStore = useProductStore()
const { loading, error } = storeToRefs(productStore)
const { singleProduct } = productStore

//add product store
const addProductStore = useAddProductStore()
const { increaseQuantity, decreaseQuantity, addSingleProduct } = addProductStore
const { detailsSingleProduct } = storeToRefs(addProductStore)

//mounted hook to fetch single product
onMounted(() => {
  singleProduct(id)
})
</script>
