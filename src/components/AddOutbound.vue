<template>
  <form @submit.prevent="addProduct">
    <input
        v-model="newSurname"
        type="text"
        placeholder="Surname"/>
    <input
        v-model="newName"
        type="text"
        placeholder="Name"/>
    <input
        v-model="newOrder"
        type="text"
        placeholder="Order"/>
    <input
        v-model="newCountry"
        type="text"
        placeholder="Country"/>
    <input
        v-model="newTown"
        type="text"
        placeholder="Town"/>
    <input
        v-model="newAddr"
        type="text"
        placeholder="Address"/>
    <input
        v-model="newZip"
        type="text"
        placeholder="Zip Code"/>
    <input
        v-model="newDesc"
        type="text"
        placeholder="Description"/>
    <button
        class="inputButton"
        :disabled="!newOrder || !newSurname && !newDesc || !newTown || !newAddr || !newZip"
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
const newSurname = ref('')
const newZip = ref('')
const newTown = ref('')
const newAddr = ref('')
const newCountry = ref('')

//Declare and define functions

//Add document to the database
const addProduct = () => {
  const date = new Date();
  addDoc(collection(db, "outbound"), {
    name: newName.value,
    order: newOrder.value,
    zip: newZip.value,
    addr: newAddr.value,
    country: newCountry.value,
    town: newTown.value,
    surname: newSurname.value,
    desc: newDesc.value,
    date: date.toLocaleString("en-GB", { dateStyle: 'medium', timeStyle: 'long'}),
  });
  newSurname.value = ""
  newName.value = ""
  newOrder.value = ""
  newDesc.value = ""
  newZip.value = ""
  newAddr.value = ""
  newCountry.value = ""
  newTown.value = ""
}

//Clear values
const clearInput = () => {
  newSurname.value = ""
  newName.value = ""
  newOrder.value = ""
  newDesc.value = ""
  newZip.value = ""
  newAddr.value = ""
  newCountry.value = ""
  newTown.value = ""
}

</script>

<script>
export default {
  name: "AddOutbound"
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