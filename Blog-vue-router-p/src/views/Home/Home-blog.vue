<template>
  <section class="container mt-5">
    <!-- //use grid card to display blog data -->

    <!-- {
  "id": 1,
  "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  "price": 109.95,
  "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  "category": "men's clothing",
  "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  "rating": {
    "rate": 3.9,
    "count": 120
  }
} -->
    <div class="row g-4" v-if="!isloading">
      <div class="col-md-3" v-for="blog in blogData" :key="blog.id">
        <div class="card p-2 mb-2" style="height: 100%">
          <img
            :src="blog.image"
            class="card-img-top img-fluid"
            :alt="blog.title"
            :style="{
              height: '200px',
              objectFit: 'contain'
            }"
          />
          <div class="card-body">
            <h5 class="card-title">
              {{ blog.title.length > 20 ? blog.title.slice(0, 20) + '...' : blog.title }}
            </h5>
            <p class="card-text">
              {{
                blog.description.length > 50
                  ? blog.description.slice(0, 50) + '...'
                  : blog.description
              }}
            </p>
            <p class="card-text">Category: {{ blog.category }}</p>
            <p class="card-text">Price: {{ blog.price }}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="rating">
                <p class="card-text"><i class="bi bi-star-fill"></i> {{ blog.rating.rate }}</p>
              </div>
              <button type="button" class="btn btn-sm btn-outline-secondary">Get Detail</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="d-flex justify-content-center">
      <div class="spinner-grow" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const blogData = ref([])
const isloading = ref(true)

const getBlogData = async () => {
  try {
    const res = await fetch('https://fakestoreapi.com/products')
    const data = await res.json()

    if (data) {
      blogData.value = data.slice(0, 8).reverse()
      isloading.value = false
    }
  } catch (err) {
    console.log(err)
    isloading.value = false
  }
}

onMounted(() => {
  getBlogData()
})
onUnmounted(() => {
  blogData.value = []
})
</script>

<style scoped></style>
