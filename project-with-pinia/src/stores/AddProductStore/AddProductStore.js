import { defineStore } from 'pinia'
import { ref,computed } from 'vue'

const useAddProductStore = defineStore('addProduct', () => {
  const addProductList = ref([])

  const totalPrice = computed(() => {
    return addProductList.value.reduce((total, product) => {
        return Math.round((total + product.price * product.quantity) * 100) / 100
    }, 0)
})

  const addProduct = (product) => {
    //also add same product select quantity
    const index = addProductList.value.findIndex((item) => item.id === product.id)
    if (index !== -1) {
      addProductList.value[index].quantity += 1
    } else {
      addProductList.value.push({ 
        ...product,
        quantity: 1
       })
    }
  }

//   addition of price of same product
    
  const increaseQuantity = (product) => {
    const index = addProductList.value.findIndex((item) => item.id === product.id)
    addProductList.value[index].quantity += 1
  }

  const decreaseQuantity = (prodcut) => {
    const index = addProductList.value.findIndex((item) => item.id === prodcut.id)
    if (addProductList.value[index].quantity > 1) {
      addProductList.value[index].quantity -= 1
    } else {
      addProductList.value.splice(index, 1)
    }
  }

  const removeProduct = (index) => {
    addProductList.value.splice(index, 1)
  }

  return {
    addProductList,
    totalPrice,
    addProduct,
    removeProduct,
    increaseQuantity,
    decreaseQuantity
  }
})

export default useAddProductStore
