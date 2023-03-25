<template>
  <div>
    <h1>Count: {{ count }}</h1>
    <h1>Double Count: {{ doubleCount }}</h1>
    <button @click="increment">Increment</button>
  </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {useCounterStore} from '@/stores'
const counterStore = useCounterStore()
const { count, doubleCount } = storeToRefs(counterStore)

const { increment } = counterStore
</script>

<style scoped></style>
