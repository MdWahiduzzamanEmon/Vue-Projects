<template>
  <section class="d-flex justify-content-between align-items-center mb-4">
    <h5>Total Products: {{ products?.length }}</h5>
    <!-- search  -->
    <div class="input-group w-50">
      <input
        type="text"
        class="form-control"
        placeholder="Search Products"
        aria-label="Search Products"
        aria-describedby="button-addon2"
        v-model.trim="search"
      />
    </div>
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
  <!-- //products  -->
  <section v-else>
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="product in products" :key="product.id">
        <ProductCard :product="product" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useProductStore } from '../../../stores/ProductStore/ProductStore'
import ProductCard from '@/components/ProductCard/ProductCard.vue'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, ref, watchEffect, watch } from 'vue'

const productStore = useProductStore()
const { products, loading, error } = storeToRefs(productStore)
const { fetchProducts } = productStore

watchEffect(() => {
  productStore.$patch((state) => {
    state.products = state.products.slice(0, 6)
  })
})

//search
const search = ref('')

watch(search, (value) => {
  productStore.$patch((state) => {
    state.products = state.products.filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase())
    ).slice(0, 6)
  })

  if (value === '') {
    fetchProducts()
  }
})

onMounted(() => {
  fetchProducts()
})

onUnmounted(() => {
  productStore.$reset()
})
</script>

<style scoped></style>
