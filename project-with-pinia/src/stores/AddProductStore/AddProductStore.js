import { defineStore, storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import NotifyToast from '@/Utility/NotifyToast/NotifyToast.js'
import { useAuthenticationStore } from '../AuthenticationStore/AuthenticationStore'
import { useRouter } from 'vue-router'

const useAddProductStore = defineStore('addProduct', () => {

  const store = useAuthenticationStore()
  const router = useRouter()
    const { isLoggedIn } = storeToRefs(store)

  //state for add product
  const addProductList = ref([])
  const detailsSingleProduct = ref({})

  //getter for total price
  const totalPrice = computed(() => {
    return addProductList.value.reduce((total, product) => {
      return Math.round((total + product.price * product.quantity) * 100) / 100
    }, 0)
  })

  //actions for add product
  const addProduct = (product) => {
    if(!isLoggedIn.value){
      NotifyToast('Please login first', 'error')
      // add query to redirect to the current page
      router.push({name: 'login', query: { redirect: router.currentRoute.value.fullPath }})
      return
    }

    //also add same product select quantity
    const index = addProductList.value.findIndex((item) => item.id === product.id)
    if (index !== -1) {
      NotifyToast('Product already in cart', 'error')
    } else {
      addProductList.value.push({
        ...product,
        quantity: 1
      })
      NotifyToast('Product added to cart', 'success')
    }
  }

  //  add single product
  const addSingleProduct = (product) => {
    // if product already in cart show alert
    const index = addProductList.value.findIndex((item) => item.id === product.id)
    if (index !== -1) {
      NotifyToast('Product already in cart', 'error')
    } else {
      addProductList.value.push({
        ...product
      })
      NotifyToast('Product added to cart', 'success')
    }
  }

  //  addition of price of same product
  const increaseQuantity = (product) => {
    // console.log(product)
    if (addProductList.value.length > 0) {
      const index = addProductList.value.findIndex((item) => item.id === product.id)
      addProductList.value[index].quantity += 1
    }

    detailsSingleProduct.value.quantity += 1
  }

  //  subtraction of price of same product
  const decreaseQuantity = (prodcut) => {
    if (addProductList.value.length > 0) {
      const index = addProductList.value.findIndex((item) => item.id === prodcut.id)
      if (addProductList.value[index].quantity > 1) {
        addProductList.value[index].quantity -= 1
      } else {
        addProductList.value.splice(index, 1)
      }
    }
    if (detailsSingleProduct.value.quantity > 1) {
      detailsSingleProduct.value.quantity -= 1
    }
  }

  //  remove product from cart
  const removeProduct = (index) => {
    addProductList.value.splice(index, 1)
  }

  return {
    addProductList,
    detailsSingleProduct,
    totalPrice,
    addProduct,
    removeProduct,
    increaseQuantity,
    decreaseQuantity,
    addSingleProduct
  }
})

export default useAddProductStore
