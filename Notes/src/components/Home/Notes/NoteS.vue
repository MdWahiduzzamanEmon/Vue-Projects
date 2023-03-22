<template>
  <main>
    <header class="notes_header">
      <h1>Notes {{ notes.length > 0 ? -notes.length : '' }}</h1>
      <!-- <p>Notes is a simple note taking app.</p> -->
      <button @click="showOverlay">+</button>
    </header>
    <!-- overlay section  -->
    <section class="overlay" v-if="overlay">
      <div class="overlay_modal">
        <h2>Add Note</h2>
        <form @submit.prevent="addNote">
          <label for="title">Title</label>
          <input type="text" name="title" id="title" v-model.trim="data.title" />

          <label for="description">Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            v-model.trim="data.description"
          />

          <label for="category">Category</label>
          <select name="category" id="category" v-model="data.category">
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

    <!-- notes section  -->
    <section class="notes">
      <div
        class="note"
        v-for="note in notes"
        :key="note.id"
        :style="{
          backgroundColor: note.backgroundColor
        }"
      >
        <h2>{{ note.title }}</h2>
        <p>
          {{ note.description }}
        </p>
        <label>
          Created on:
          <time>
            {{ note.date }}
          </time>
        </label>
        <div class="note_footer">
          <small>Category: {{ note.category }}</small>

          <div>
            <button @click="editModal(note)">Edit</button>
            <button @click="deleteNote(note)">Delete</button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

// script setup
<script setup>
import { ref } from 'vue'

//states
const overlay = ref(false)
const notes = ref([])
const data = ref({
  title: '',
  description: '',
  category: ''
})
const errorMessage = ref('')
const noteEdit = ref(false)

//show modal
const showOverlay = () => {
  overlay.value = true
}

//hide modal
const hideOverlay = () => {
  overlay.value = false
  errorMessage.value = ''
  data.value.title = ''
  data.value.description = ''
  data.value.category = ''
  editModal.value = false
  noteEdit.value = false
}

//random color
const getRandomColor = () => {
  ///maker rgba color
  return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
    Math.random() * 255
  )}, 0.5)`
}

//add new note
const addNote = () => {
  noteEdit.value = false
  if (data.value.title === '' || data.value.description === '' || data.value.category === '') {
    return (errorMessage.value = 'Please fill all the fields')
  } else {
    errorMessage.value = ''
  }

  notes.value.push({
    id: Math.floor(Math.random() * 100000000),
    title: data.value.title,
    description: data.value.description,
    category: data.value.category,
    date: new Date().toISOString().split('T')[0],
    backgroundColor: getRandomColor()
  })
  hideOverlay()
  data.value.title = ''
  data.value.description = ''
  data.value.category = ''
  errorMessage.value = ''
}

//note edit modal
const editModal = (note) => {
  overlay.value = true
  noteEdit.value = true
  // console.log(note)
  data.value.title = note.title
  data.value.description = note.description
  data.value.category = note.category
}

//note edit
const editNote = () => {
  if (data.value.title === '' || data.value.description === '' || data.value.category === '') {
    return (errorMessage.value = 'Please fill all the fields')
  } else {
    errorMessage.value = ''
  }
  if (notes.value.length > 0) {
    notes.value = notes.value.filter((note) => note.title !== data.value.title)

    notes.value.push({
      id: Math.floor(Math.random() * 100000000),
      title: data.value.title,
      description: data.value.description,
      category: data.value.category,
      date: new Date().toISOString().split('T')[0],
      backgroundColor: getRandomColor()
    })
  }
  hideOverlay()
  data.value.title = ''
  data.value.description = ''
  data.value.category = ''
  errorMessage.value = ''
}

//note delete
const deleteNote = (note) => {
  notes.value = notes.value.filter((n) => n.id !== note.id) // this is the best way to delete an item from an array
  // notes.value.splice(notes.value.indexOf(note), 1)// this is the second best way to delete an item from an array
}
</script>

// css file
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

/* // notes section */

.notes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.note {
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.note h2 {
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
}

.note p {
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
}

.note label {
  font-size: 0.7rem;
  font-weight: 600;
  margin: 0;
}

.note .note_footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.note .note_footer small {
  font-size: 1rem;
  font-weight: 400;
  color: #747373;
}

.note .note_footer button:not(:last-child) {
  margin-right: 1rem;
  background-color: green;
}
.note .note_footer button:not(:first-child) {
  margin-right: 1rem;
  background-color: red;
}

.note .note_footer button {
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  background-color: black;
  color: #fff;
  cursor: pointer;
}

.note .note_footer button:hover {
  opacity: 0.9;
}

.note .note_footer button:focus {
  outline: none;
}

@media (max-width: 768px) {
  .notes {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 576px) {
  .notes {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

@media (max-width: 400px) {
  .notes {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}

@media (max-width: 300px) {
  .notes {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
}

@media (max-width: 200px) {
  .notes {
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  }
}

@media (max-width: 100px) {
  .notes {
    grid-template-columns: repeat(auto-fit, minmax(25px, 1fr));
  }
}

@media (max-width: 50px) {
  .notes {
    grid-template-columns: repeat(auto-fit, minmax(10px, 1fr));
  }
}
</style>
