<template>
  <section>
    <div class="card h-100 p-2">
      <img
        :src="image"
        class="card-img-top img-fluid card_cursor"
        :alt="title"
        style="height: 200px; object-fit: contain"
        @click="showProductDetails(product)"
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
        <div class="d-flex justify-content-between">
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
          <button class="btn btn-outline-primary btn-sm" @click="addProduct(product)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-cart-plus-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import useAddProductStore from '@/stores/AddProductStore/AddProductStore.js'

const addProductStore = useAddProductStore()

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
const { addProduct } = addProductStore

const { title, image, description, category, price, rating } = toRefs(props.product)
const router= useRouter()

const showProductDetails = (product) => {
  router.push(`/productDetails/${product.id}`)
}

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
  background: transparent;
}

.card-title {
  transition: all 0.3s ease-in-out;
}

p {
  color: #561414;
}
.card_cursor {
  cursor: pointer;

}
</style>
