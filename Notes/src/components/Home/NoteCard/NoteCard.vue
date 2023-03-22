<script setup>
import { computed } from 'vue'
const props = defineProps({
  note: {
    type: Object,
    required: true
  },
  editModal: {
    type: Function,
    required: true
  }
  //   deleteNote: {
  //     type: Function,
  //     required: true
  //   }
})

const emit = defineEmits(['deleteNote'])

const deleteNotes = computed(() => {
  return emit('deleteNote', props.note)
})

const note = computed(() => {
  return props.note
})

// console.log(note.value)

const backgroundColor = computed(() => {
  return note.value.backgroundColor
})

const title = computed(() => {
  return note.value.title
})

const description = computed(() => {
  return note.value.description
})

const date = computed(() => {
  return note.value.date
})

const category = computed(() => {
  return note.value.category
})
</script>

<template>
  <section class="notes">
    <div
      class="note"
      :style="{
        backgroundColor: backgroundColor
      }"
    >
      <h2>{{ title }}</h2>
      <p>
        {{ description }}
      </p>
      <label>
        Created on:
        <time>
          {{ date }}
        </time>
      </label>
      <div class="note_footer">
        <small>Category: {{ category }}</small>

        <div>
          <button @click="editModal(note)">Edit</button>
          <button @click="deleteNotes">Delete</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
