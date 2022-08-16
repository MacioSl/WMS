<template>
  <form @submit.prevent="updateProduct">
    <input
        v-model="uSurname"
        type="text"
        placeholder="Surname"
        :disabled="!enable"
    />
    <input
        v-model="uName"
        type="text"
        placeholder="Name"
        :disabled="!enable"
    />
    <input
        v-model="uOrder"
        type="text"
        placeholder="Order"
        :disabled="!enable"
    />
    <input
        v-model="uCountry"
        type="text"
        placeholder="Country"
        :disabled="!enable"
    />
    <input
        v-model="uTown"
        type="text"
        placeholder="Town"
        :disabled="!enable"
    />
    <input
        v-model="uAddr"
        type="text"
        placeholder="Address"
        :disabled="!enable"
    />
    <input
        v-model="uZip"
        type="text"
        placeholder="Zip Code"
        :disabled="!enable"
    />
    <input
        v-model="uDesc"
        type="text"
        placeholder="Description"
        :disabled="!enable"
    />
    <button
        class="inputButton"
        :disabled="!enable"
    >
      &#10003;
    </button>
    <button
        class="resetButton"
        type="reset"
        @click="hideInputs"
        :disabled="!enable"
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
const uID = ref("");
const uName = ref("");
const uOrder = ref("");
const uZip = ref("");
const uAddr = ref("");
const uCountry = ref("");
const uTown = ref("");
const uSurname = ref("");
const uDesc = ref("");
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
  uOrder.value = n.order;
  uZip.value = n.zip;
  uAddr.value = n.addr;
  uCountry.value = n.country;
  uTown.value = n.town;
  uSurname.value = n.surname;
  uDesc.value = n.desc;
})

//Emit value change
const hideInputs = () => {
  emit('update:enable',false)
}

//Update the document
const updateProduct = () => {
  updateDoc(doc(db, "outbound", uID.value), {
    name: uName.value,
    order: uOrder.value,
    zip: uZip.value,
    addr: uAddr.value,
    country: uCountry.value,
    town: uTown.value,
    surname: uSurname.value,
    desc: uDesc.value,
  });
  uID.value = "";
  uName.value = "";
  uOrder.value = "";
  uZip.value = "";
  uAddr.value = "";
  uCountry.value = "";
  uTown.value = "";
  uSurname.value = "";
  uDesc.value = "";
  hideInputs()
}

</script>

<script>
export default {
  name: "UpdateOutbound"
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