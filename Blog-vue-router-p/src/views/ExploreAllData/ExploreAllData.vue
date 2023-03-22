<template>
  <section class="container mt-5">
    <!-- //back button -->
    <section class="d-flex justify-content-between my-2 align-items-center mb-4">
      <h4>Total Blogs: {{ blogData.length }}</h4>
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
      <button type="button" class="btn btn-outline-secondary" @click="back">Back</button>
    </section>
    <!-- //card component -->
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
import { ref, onMounted, onUnmounted ,watch} from 'vue'
import { useRouter } from 'vue-router'
import getBlogData from '../../components/ApiCall/ApiCall'
import CardComponent from '../CardComponent/CardComponent.vue'

const blogData = ref([])
const search = ref('')
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
