<template>
  <div class="card p-2 mb-2" style="height: 100%">
    <img
      :src="blog?.image"
      class="card-img-top img-fluid"
      :alt="blog?.title"
      :style="{
        height: '200px',
        objectFit: 'contain'
      }"
    />
    <div class="card-body">
      <h5 class="card-title">
        {{
          blog.title.length > 20 && !fromSingleDetails
            ? blog.title.slice(0, 20) + '...'
            : blog.title
        }}
      </h5>
      <p class="card-text">
        {{
          blog.description.length > 50 && !fromSingleDetails
            ? blog.description.slice(0, 50) + '...'
            : blog.description
        }}
      </p>
      <p class="card-text">Category: {{ blog?.category }}</p>
      <p class="card-text">Price: {{ blog?.price }}</p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="rating">
          <p class="card-text">{{ blog?.rating?.rate }} &#9733;</p>
        </div>
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
          @click="getSingleBlog(blog?.id)"
          v-if="!fromSingleDetails"
        >
          Get Detail
        </button>
        <!-- //back button -->
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
          @click="router.go(-1)"
          v-if="fromSingleDetails"
        >
          Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { defineProps, computed } from 'vue'
const router = useRouter()

const props = defineProps(['blog', 'fromSingleDetails'])
const blog = computed(() => {
  return props.blog
})

const fromSingleDetails = computed(() => {
  return props.fromSingleDetails
})
const getSingleBlog = (id) => {
  router.push(`/details/${id}`)
}
</script>
