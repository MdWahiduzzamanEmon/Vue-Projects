<template>
  <main class="my-2">
    <section class="d-flex justify-content-between align-items-center my-3">
      <!-- //category filter by dropdown -->
      <div class="dropdown">
        <button
          class="btn btn-outline-primary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
         Product Category
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <a class="dropdown-item" href="#" @click="filterByCategory('All')">All</a>
          <li v-for="category in categoryList" :key="category" @click="filterByCategory(category)">
            <a class="dropdown-item" href="#">{{ category }}</a>
          </li>
        </ul>
      </div>
      <!-- //search  -->
      <input
        type="text"
        class="form-control w-25"
        placeholder="Search Products"
        aria-label="Search Products"
        v-model="search"
      />

      <!-- //backButton  -->
      <button
        class="btn btn-outline-primary d-flex align-items-center gap-2"
        @click="router.push('/')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-left-short"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
          />
        </svg>
      </button>
    </section>
    <!-- //loading  -->
    <section v-if="loading" class="text-center d-flex justify-content-center">
      <div class="spinner-grow text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </section>
    <!-- //error  -->
    <section v-else-if="error" class="text-center">
      <h1 class="text-danger">{{ error }}</h1>
    </section>
    <!-- //all products  -->
    <section v-else>
      <div class="row row-cols-1 row-cols-md-4 g-4">
        <div class="col" v-for="product in products" :key="product.id">
          <ProductCard :product="product" />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useProductStore } from '@/stores/ProductStore/ProductStore'
import ProductCard from '@/components/ProductCard/ProductCard.vue'

const router = useRouter()

const productStore = useProductStore()
const { products, loading, error, categoryList } = storeToRefs(productStore)
const { fetchProducts, fetchCategoryList, filterByCategory } = productStore

//search
const search = ref('')

watch(search, (value) => {
  productStore.$patch((state) => {
    state.products = state.products
      .filter((product) => product.title.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 6)
  })

  if (value === '') {
    fetchProducts()
  }
})

onMounted(() => {
  fetchProducts()
  fetchCategoryList()
})
</script>
