<template>
  <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd">
    <div class="container">
      <a class="navbar-brand" href="/">Nimo</a>
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

          <li class="nav-item">
            <CartCanvas />
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import CartCanvas from '../../views/Home/CartCanavs/CartCanvas.vue'
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
