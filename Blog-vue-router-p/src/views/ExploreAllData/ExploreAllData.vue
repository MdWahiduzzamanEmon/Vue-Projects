<template>
  <section class="container mt-5">
    <!-- //back button -->
    <div class="d-flex justify-content-end my-2">
      <button type="button" class="btn btn-outline-secondary" @click="back">Back</button>
    </div>
    <div class="row g-4" v-if="!isloading">
      <div class="col-md-3" v-for="blog in blogData" :key="blog.id">
        <CardComponent :blog="blog" />
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
import { useRouter } from 'vue-router'
import getBlogData from '../../components/ApiCall/ApiCall'
import CardComponent from '../CardComponent/CardComponent.vue'

const blogData = ref([])
const isloading = ref(true)
const router = useRouter()
const getData = async () => {
  const data = await getBlogData()
  //   console.log(data)
  blogData.value = data.reverse()
  isloading.value = false
}

const back = () => {
  router.back()
}
onMounted(() => {
  getData()
})
onUnmounted(() => {
  blogData.value = []
})
</script>

<style scoped></style>
