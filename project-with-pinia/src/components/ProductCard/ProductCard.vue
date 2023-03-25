<template>
  <section>
    <div class="card h-100 p-2">
      <img
        :src="image"
        class="card-img-top img-fluid"
        :alt="title"
        style="height: 200px; object-fit: contain"
      />
      <div class="card-body">
        <h5 class="card-title" :title="title">
          {{ title?.length > 20 ? title?.slice(0, 20) + '...' : title }}
        </h5>
        <p class="card-text" :title="description">
          {{
            description
              ? description?.length > 100
                ? description?.slice(0, 100) + '...'
                : description
              : 'No description'
          }}
        </p>
        <div class="d-flex justify-content-between">
          <p class="card-text">Category: {{ category }}</p>
          <p class="card-text">Price: {{ price }}</p>
        </div>
        <p class="card-text d-flex align-items-center gap-2">
          Rating: {{ rating?.rate }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-star-fill text-warning"
            viewBox="0 0 16 16"
          >
            <path
              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
            />
          </svg>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps, toRefs } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const { title, image, description, category, price, rating } = toRefs(props.product)
</script>

<style scoped>
.card {
  transition: all 0.3s ease-in-out;
}
.card:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.092);
}

.card-img-top {
  transition: all 0.3s ease-in-out;
}

.card:hover .card-img-top {
  transform: scale(1.1);
}

.card-title {
  transition: all 0.3s ease-in-out;
}

p {
  color: #561414;
}
</style>
