<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd">
    <div class="container">
      <router-link class="navbar-brand" to="/" style="font-family: 'Pacifico', cursive"
        >@NimoProducts</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav ms-auto d-flex align-items-center">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">Home</RouterLink>
          </li>

          <li class="nav-item" v-if="!isLoggedIn">
            <RouterLink to="/login" class="nav-link">Login</RouterLink>
          </li>
          <li class="nav-item" v-else>
            <RouterLink class="nav-link" to="/login" @click="userLogout"> Logout </RouterLink>
          </li>
        </ul>
      </div>
      <CartCanvas :isLoggedIn="isLoggedIn" />
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import CartCanvas from '../../views/Home/CartCanavs/CartCanvas.vue'
import { useAuthenticationStore } from '@/stores/AuthenticationStore/AuthenticationStore.js'
import { storeToRefs } from 'pinia'

const store = useAuthenticationStore()

const { isLoggedIn } = storeToRefs(store)

const userLogout = () => {
  store.logout()
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
