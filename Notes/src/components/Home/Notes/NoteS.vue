<template>
  <main>
    <header class="notes_header">
      <h1>Notes {{ notes.length > 0 ? -notes.length : '' }}</h1>
      <button @click="showOverlay">+</button>
    </header>
    <!-- overlay section  -->
    <NoteModal
      :overlay="overlay"
      :data="data"
      :errorMessage="errorMessage"
      :noteEdit="noteEdit"
      :notes="notes"
      @show-overlay="showOverlay"
      @hide-overlay="hideOverlay"
      @add-note="addNote"
      @edit-note="editNote"
    />
    <!-- notes section  -->
    <NoteCard
      v-for="note in notes"
      :key="note.id"
      :note="note"
      :editModal="editModal"
      @delete-note="deleteNote"
    />
  </main>
</template>

// script setup
<script setup>
import { ref } from 'vue'
import NoteCard from '../NoteCard//NoteCard.vue'
import NoteModal from '../NoteModal/NoteModal.vue'
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

  if (data.value.title.length < 10) {
    return (errorMessage.value = 'Title must be at least 10 characters')
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
  noteEdit.value = true
  showOverlay()
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
  // console.log(note)
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
</style>
