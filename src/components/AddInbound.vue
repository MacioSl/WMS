<template>
  <form @submit.prevent="addInbound">
    <input
        v-model="newName"
        type="text"
        placeholder="Name"/>
    <input
        v-model="newOrder"
        type="text"
        placeholder="Order"/>
    <input
        v-model="newDesc"
        type="text"
        placeholder="Description"/>
    <button
        class="inputButton"
        :disabled="!newOrder || !newName"
    >
      &#10003;
    </button>
    <button
        class="resetButton"
        type="reset"
        @click="clearInput"
        :disabled="!newOrder && !newName && !newDesc"
    >
      &#9850;
    </button>
  </form>
</template>

<script setup>
//Import Firestore reference
import db from "../firebase"

//Import functions
import {ref} from "vue";
import {collection, addDoc} from "firebase/firestore";

//Declare constants
const newName = ref('')
const newOrder = ref('')
const newDesc = ref('')


//Declare and define functions

//Add document to the database
const addInbound = () => {
  const date = new Date();
  addDoc(collection(db, "inbound"), {
    name: newName.value,
    order: newOrder.value,
    date: date.toLocaleString("en-GB", { dateStyle: 'medium', timeStyle: 'long'}),
    desc: newDesc.value,
  });
  newName.value = ""
  newOrder.value = ""
  newDesc.value = ""
}

//Clear values
const clearInput = () => {
  newName.value = ""
  newOrder.value = ""
  newDesc.value = ""
}

</script>

<script>
export default {
  name: "AddInbound"
}
</script>

<style scoped>
input {
  margin: 0.5em 0.2em;
  padding: 0.5em;
  border: 2px solid #E1E1E1;
  border-radius: 2em;
}

.inputButton {
  color: white;
  background-color: #333333;
  border: none;
  padding: 0.25em 0.5em 0.5em;
  border-radius: 1em;
  margin: 0.2em;
  width: 2em;
  height: 2em;
}

.resetButton {
  color: white;
  background-color: red;
  border: none;
  padding: 0.2em 0.5em 0.5em;
  border-radius: 1em;
  margin: 0.2em;
  width: 2em;
  height: 2em;
}

button {
  transition-duration: 0.2s;
}

:disabled {
  opacity: 50%;
}
</style>