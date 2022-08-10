<template>
  <form @submit.prevent="updateProduct">
    <input
        v-model="uName"
        type="text"
        placeholder="Name"/>
    <input
        v-model="uSerial"
        type="text"
        placeholder="Serial"/>
    <input
        v-model="uLot"
        type="text"
        placeholder="Lot"/>
    <input
        v-model="uQuantity"
        type="text"
        placeholder="Quantity"/>
    <input
        v-model="uPrice"
        type="text"
        placeholder="Price"/>
    <button
        class="inputButton"
    >
      &#10003;
    </button>
    <button
        class="resetButton"
        type="reset"

        :disabled="!uSerial && !uName && !uQuantity && !uLot && !uPrice"
    >
      &#9850;
    </button>
  </form>
</template>

<script setup>

import db from "../firebase"
import {ref, watch} from "vue";
import {doc, updateDoc} from "firebase/firestore";

const uID = ref('')
const uName = ref('')
const uSerial = ref('')
const uLot = ref('')
const uQuantity = ref('')
const uPrice = ref('')

const props = defineProps({
  modelValue: {
  },
});

watch(() => props.modelValue, (n,o) =>{
  console.log("Watcher: ")
  console.log(n)
  uID.value = n.id;
  uName.value = n.name;
  uSerial.value = n.serial;
  uLot.value = n.lot;
  uQuantity.value = n.quantity;
  uPrice.value = n.price;
})

const updateProduct = () => {
  updateDoc(doc(db, "products", uID.value), {
    name: uName.value,
    serial: uSerial.value,
    lot: uLot.value,
    quantity: uQuantity.value,
    price: uPrice.value,
  });
  uID.value = ""
  uName.value = ""
  uSerial.value = ""
  uLot.value = ""
  uQuantity.value = ""
  uPrice.value = ""
}

</script>

<script>

export default {
  name: "UpdateProduct",
}
</script>

<style scoped>
input {
  margin: 0.1em 0.2em;
  padding: 0.5em;
  border-radius: 2em;
  border: 2px solid #E1E1E1;
}

/*:disabled {*/
/*  opacity: 0;*/
/*}*/

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
</style>