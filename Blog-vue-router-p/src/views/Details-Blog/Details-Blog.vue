<template>
  <div class="mt-2">
    <CardComponent :blog="singleBlogData" v-if="!Loading" fromSingleDetails="true" />
    <div v-else class="d-flex justify-content-center mt-5">
      <div class="spinner-grow" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { singleBlog } from '../../components/ApiCall/ApiCall.js'
import CardComponent from '../CardComponent/CardComponent.vue'
const singleBlogData = ref({})
const route = useRoute()
const id = route.params.id
const Loading = ref(true)

const getData = async (id) => {
  const data = await singleBlog(id)
  //   console.log(data)
  singleBlogData.value = data
  Loading.value = false
}
onMounted(() => {
  getData(id)
})

onUnmounted(() => {
  singleBlogData.value = {}
})
</script>
