<template>
  <section>
    <div class="d-flex justify-content-between my-2 border-bottom p-2">
      <div class="d-flex align-items-center gap-2">
        <section>
          <p class="mb-0">Quantity: {{ product?.quantity }}</p>
          <div class="d-flex align-items-center gap-2">
            <button class="btn btn-outline-success btn-sm" @click="increaseQuantity(product)">
              +
            </button>
            <button class="btn btn-outline-danger btn-sm" @click="decreaseQuantity(product)">
              -
            </button>
          </div>
        </section>
        <img :src="product.image" class="img-fluid" style="height: 50px; object-fit: contain" />

        <div>
          <p class="mb-0">{{ product.title.slice(0, 20) + '...' + ' ' }}</p>
          <p class="mb-0">Price: ${{ Number(product.price * product.quantity)?.toFixed(2) }}</p>
        </div>
      </div>
      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-outline-danger btn-sm" @click="removeProduct(product)">X</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps, toRefs } from 'vue'
import useAddProductStore from '@/stores/AddProductStore/AddProductStore.js'
// import { storeToRefs } from 'pinia'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const { product } = toRefs(props)

const addProductStore = useAddProductStore()
const { removeProduct, increaseQuantity, decreaseQuantity } = addProductStore
</script>

<style scoped></style>
