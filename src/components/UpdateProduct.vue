<template>
  <form @submit.prevent="updateProduct">
    <input
        v-model="uName"
        type="text"
        placeholder="Name"
        :disabled="!enable"
    />
    <input
        v-model="uSerial"
        type="text"
        placeholder="Serial"
        :disabled="!enable"
    />
    <input
        v-model="uLot"
        type="text"
        placeholder="Lot"
        :disabled="!enable"
    />
    <input
        v-model="uQuantity"
        type="text"
        placeholder="Quantity"
        :disabled="!enable"
    />
    <input
        v-model="uPrice"
        type="text"
        placeholder="Price"
        :disabled="!enable"
    />
    <button
        class="inputButton"
        :disabled="!uSerial && !uName || !uQuantity || !uLot || !enable"
    >
      &#10003;
    </button>
    <button
        class="resetButton"
        type="reset"
        @click="hideInputs"
        :disabled="!uSerial && !uName && !uQuantity && !uLot && !uPrice || !enable"
    >
      &#9850;
    </button>
  </form>
</template>

<script setup>
//Import Firestore reference
import db from "../firebase"

//Import functions
import {ref, watch} from "vue";
import {doc, updateDoc} from "firebase/firestore";

//Declare constants
const uID = ref('')
const uName = ref('')
const uSerial = ref('')
const uLot = ref('')
const uQuantity = ref('')
const uPrice = ref('')
const emit = defineEmits(['update:enable'])

//Declare props - get data from parent
const props = defineProps({
  modelValue: {
  },
  enable: {

  },
});

//Declare and define functions

//Watch for prop data change and update references
watch(() => props.modelValue, (n,o) =>{
  uID.value = n.id;
  uName.value = n.name;
  uSerial.value = n.serial;
  uLot.value = n.lot;
  uQuantity.value = n.quantity;
  uPrice.value = n.price;
})

//Emit value change
const hideInputs = () => {
  emit('update:enable',false)
}

//Update the document
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
  hideInputs()
}

</script>

<script>
//Export name
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

:disabled {
  opacity: 0;
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
</style>