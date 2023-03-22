<template>
  <section class="container mt-5">
    <div class="row g-4" v-if="!isloading">
      <div class="col-md-3" v-for="blog in blogData" :key="blog.id">
        <CradComponent :blog="blog" />
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
import getBlogData from '../../components/ApiCall/ApiCall.js'
import CradComponent from '../../views/CardComponent/CardComponent.vue'
const blogData = ref([])
const isloading = ref(true)

const getData = async () => {
  const data = await getBlogData()
  //   console.log(data)
  blogData.value = data.splice(0, 8).reverse()
  isloading.value = false
}

onMounted(() => {
  getData()
})
onUnmounted(() => {
  blogData.value = []
})
</script>

<style scoped></style>
