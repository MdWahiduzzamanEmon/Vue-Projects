<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import Nav from './components/Nav/Nav-bar.vue'
import { useAuthenticationStore } from './stores/AuthenticationStore/AuthenticationStore'

const store = useAuthenticationStore()
const router = useRouter()
const route = useRoute()
const { isLoggedIn } = storeToRefs(store)

watch(isLoggedIn, (value) => {
  // console.log(isLoggedIn)
  if (value) {
    router.push(route.query.redirect || '/')
  }
})

onMounted(() => {
  store.checkAuth()
  // if (!isLoggedIn.value) {
  //   router.push('/login')
  // }
})
</script>

<template>
  <header class="mb-4">
    <Nav />
  </header>
  <main class="container">
    <RouterView />
  </main>
</template>
