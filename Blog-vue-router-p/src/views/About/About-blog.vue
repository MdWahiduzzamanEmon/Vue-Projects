<template>
  <!-- //write something about the blog using bootstrap accordion -->
  <section class="mt-5">
    <!--id ==1 then accordion will be expanded by default-->
    <div class="accordion" id="accordionExample">
      <div class="accordion-item" v-for="blog in blogs" :key="blog.id">
        <h2 class="accordion-header" id="headingOne">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="'#collapse' + blog.id"
            aria-expanded="true"
            :aria-controls="'collapse' + blog.id"
          >
            {{ blog.title }}
          </button>
        </h2>
        <div
          :id="'collapse' + blog.id"
          class="accordion-collapse collapse"
          :class="{ show: blog.id === 1 }"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <p>{{ blog.body }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const blogs = ref([
  {
    id: 1,
    title: 'Blog #1',
    body: "This is the first item's accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow."
  },
  {
    id: 2,
    title: 'Blog #2',
    body: "This is the second item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow."
  },
  {
    id: 3,
    title: 'Blog #3',
    body: "This is the third item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow."
  }
])
</script>

<style scoped></style>
