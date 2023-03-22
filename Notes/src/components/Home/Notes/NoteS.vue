<template>
  <main>
    <header class="notes_header">
      <h1>Notes</h1>
      <!-- <p>Notes is a simple note taking app.</p> -->
      <button @click="showOverlay">+</button>
    </header>
    <!-- overlay section  -->
    <section class="overlay" v-if="overlay">
      <div class="overlay_modal">
        <h2>Add Note</h2>
        <form>
          <label for="title">Title</label>
          <input type="text" name="title" id="title" />

          <label for="description">Description</label>
          <textarea name="description" id="description" cols="30" rows="10"></textarea>

          <label for="category">Category</label>
          <select name="category" id="category">
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="shopping">Shopping</option>
            <option value="others">Others</option>
          </select>

          <button type="submit">Add Note</button>
          <button type="button" @click="hideOverlay">Cancel</button>
        </form>
      </div>
    </section>

    <!-- notes section  -->
    
  </main>
</template>

<script setup>
import { ref } from 'vue'

const overlay = ref(false)

const showOverlay = () => {
  overlay.value = true
}

const hideOverlay = () => {
  overlay.value = false
}
</script>

<style scoped>
.notes_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
}

.notes_header h1 {
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
}

.notes_header button {
  font-size: 1.5rem;
  font-weight: 500;
  background-color: black;
  border: none;
  cursor: pointer;
  color: #fff;
  border-radius: 100%;
  width: 2rem;
  height: 2rem;
}

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
