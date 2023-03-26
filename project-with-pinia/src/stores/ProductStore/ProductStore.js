import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { instance } from '../../Api/ApiConfig'
import useAddProductStore from '../AddProductStore/AddProductStore'

export const useProductStore = defineStore('product', () => {
  // call another store for single product
  const addProductStore = useAddProductStore()

  //state
  const products = ref([])
  // const product = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // actions

  // /all products
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

  // /single product
  const singleProduct = async (id) => {
    try {
      loading.value = true
      const response = await axios.get(`${instance.baseURL}/products/${id}`)
      addProductStore.$patch((state)=>{
        state.detailsSingleProduct = {
          ...response.data,
          quantity: 1
        }
      })
      // console.log(addProductStore.detailsSingleProduct)
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
    fetchProducts,
    singleProduct
  }
})
