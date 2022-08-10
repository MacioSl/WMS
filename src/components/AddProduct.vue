<template>
  <form @submit.prevent="addProduct">
    <input
        v-model="newName"
        type="text"
        placeholder="Name"/>
    <input
        v-model="newSerial"
        type="text"
        placeholder="Serial"/>
    <input
        v-model="newLot"
        type="text"
        placeholder="Lot"/>
    <input
        v-model="newQuantity"
        type="text"
        placeholder="Quantity"/>
    <input
        v-model="newPrice"
        type="text"
        placeholder="Price"/>
    <button
        class="inputButton"
        :disabled="!newSerial && !newName || !newQuantity || !newLot"
    >
      &#10003;
    </button>
    <button
        class="resetButton"
        type="reset"
        @click="clearInput"
        :disabled="!newSerial && !newName && !newQuantity && !newLot && !newPrice"
    >
      &#9850;
    </button>
  </form>
</template>

<script setup>

import db from "../firebase"
import {ref} from "vue";
import {collection, addDoc} from "firebase/firestore";

const newName = ref('')
const newSerial = ref('')
const newLot = ref('')
const newQuantity = ref('')
const newPrice = ref('')

const addProduct = () => {
  addDoc(collection(db, "products"), {
    name: newName.value,
    serial: newSerial.value,
    lot: newLot.value,
    quantity: newQuantity.value,
    price: newPrice.value,
  });
  newName.value = ""
  newSerial.value = ""
  newLot.value = ""
  newQuantity.value = ""
  newPrice.value = ""
}

const clearInput = () => {
  newName.value = ""
  newSerial.value = ""
  newLot.value = ""
  newQuantity.value = ""
  newPrice.value = ""
}

</script>

<script>

export default {
  name: "AddProduct"
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