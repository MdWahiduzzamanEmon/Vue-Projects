<script setup>
import { computed } from 'vue'

const props = defineProps({
  overlay: {
    type: Boolean,
    required: true
  },
  data: {
    type: Object,
    required: true
  },
  errorMessage: {
    type: String,
    required: true
  },
  noteEdit: {
    type: Boolean,
    required: true
  },
  notes: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['showOverlay', 'hideOverlay', 'addNote', 'editNote'])

// const showOverlay = computed(() => {
//   return emit('showOverlay')
// })

const hideOverlay = computed(() => {
  return emit('hideOverlay')
})

const addNote = computed(() => {
  return emit('addNote')
})

const editNote = computed(() => {
  return emit('editNote')
})

const data = computed(() => {
  return props.data
})

const title = computed({
  get() {
    return data.value.title
  },
  set(value) {
    data.value.title = value
  }
})

const description = computed({
  get() {
    return data.value.description
  },
  set(value) {
    data.value.description = value
  }
})

const category = computed({
  get() {
    return data.value.category
  },
  set(value) {
    data.value.category = value
  }
})

</script>
<template>
  <main>
    <section class="overlay" v-if="overlay">
      <div class="overlay_modal">
        <h2>Add Note</h2>
        <form @submit.prevent="addNote">
          <label for="title">Title</label>
          <input type="text" name="title" id="title" v-model.trim="title" />

          <label for="description">Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            v-model.trim="description"
          />

          <label for="category">Category</label>
          <select name="category" id="category" v-model="category">
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="shopping">Shopping</option>
            <option value="others">Others</option>
          </select>
          <small style="color: red">{{ errorMessage }}</small>
          <button type="submit" v-if="!noteEdit">Add Note</button>
          <button type="submit" @click="editNote" v-if="noteEdit">Edit Note</button>
          <button type="button" @click="hideOverlay">Cancel</button>
        </form>
      </div>
    </section>
  </main>
</template>
<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  transition: all 0.3s ease-in-out;
}

.overlay_modal {
  background-color: #fff;
  padding: 1rem;
  border-radius: 5px;
  width: 35rem;
  max-width: 100%;
}

.overlay_modal h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.overlay_modal form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.overlay_modal form label {
  font-size: 1.2rem;
  font-weight: 500;
}

.overlay_modal form input,
.overlay_modal form textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.overlay_modal form select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.overlay_modal form button {
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  background-color: black;
  color: #fff;
  cursor: pointer;
}

.overlay_modal form button[type='submit'] {
  background-color: green;
}

.overlay_modal form button[type='button'] {
  background-color: red;
}

.overlay_modal form button:hover {
  opacity: 0.8;
}

.overlay_modal form button[type='submit']:hover {
  background-color: green;
}

.overlay_modal form button[type='button']:hover {
  background-color: red;
}

.overlay_modal form button[type='submit']:active {
  background-color: green;
}

.overlay_modal form button[type='button']:active {
  background-color: red;
}

.overlay_modal form button[type='submit']:focus {
  outline: none;
}
</style>
