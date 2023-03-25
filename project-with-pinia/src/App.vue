<script setup>
import { RouterView } from 'vue-router'
import Nav from './components/Nav/Nav-bar.vue'
</script>

<template>
  <header class="mb-4">
    <Nav />
  </header>
  <main class="container">
    <RouterView />
  </main>
</template>
