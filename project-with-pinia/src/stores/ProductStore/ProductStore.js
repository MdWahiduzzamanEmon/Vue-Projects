import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { instance } from '../../Api/ApiConfig'

export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchProducts = async () => {
    try {
      loading.value = true
      const response = await axios.get(`${instance.baseURL}/products/`)
      products.value = response.data
      // console.log(state.value.products)
    } catch (er) {
      error.value = er
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts
  }
})
