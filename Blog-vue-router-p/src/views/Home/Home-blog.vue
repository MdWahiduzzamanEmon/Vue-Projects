<template>
  <section class="container mt-5">
    <section class="d-flex justify-content-center my-2 align-items-center mb-4">
      <!-- //search  -->
      <div class="input-group w-50">
        <input
          type="text"
          class="form-control"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon2"
          v-model="search"
        />
        <button class="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
      </div>
    </section>
    <div class="row g-4" v-if="!isloading">
      <div class="col-md-3" v-for="blog in blogData" :key="blog.id">
        <CardComponent :blog="blog" />
      </div>
      <!-- //Explore more button -->
      <div class="d-flex justify-content-center my-5">
        <button type="button" class="btn btn-outline-secondary" @click="allData">
          Explore More
        </button>
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
import { ref, onMounted, onUnmounted,watch } from 'vue'
import { useRouter } from 'vue-router'
import getBlogData from '../../components/ApiCall/ApiCall.js'
import CardComponent from '../../views/CardComponent/CardComponent.vue'
const blogData = ref([])
const isloading = ref(true)
const router = useRouter()
const search = ref('')
const getData = async () => {
  const data = await getBlogData()
  //   console.log(data)
  blogData.value = data.splice(0, 8).reverse()
  isloading.value = false
}

const allData = () => {
  router.push('/allData')
}

watch(search, (newValue) => {
  if (newValue === '') {
    getData()
  } else {
    blogData.value = blogData.value.filter((blog) => {
      return blog.title.toLowerCase().includes(newValue.toLowerCase())
    })
  }
})

onMounted(() => {
  getData()
})
onUnmounted(() => {
  blogData.value = []
})
</script>

<style scoped></style>
