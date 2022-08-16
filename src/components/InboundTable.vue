<template>
  <div class="formContainer">
    <AddInbound />
    <UpdateInbound v-model="uIns" v-model:enable="Enabled"/>
  </div>
  <div class="container">
    <!--      Loop to create data rows in the range of provided data array      -->
    <div
        v-for="pack in ins"
        :key="pack.date">
      <div class="card">
        <div class="cardItems">
          <div>
            <h3 class="cardTitle">{{ pack.name }}</h3>
            <h4 class="cardSubtitle">{{ pack.order }}</h4>
          </div>
          <div class="cardContent">
            Date: {{ pack.date }}<br>
            Description: {{ pack.desc }}<br>
          </div>
        </div>
        <div class="cardButtons">
          <button
              @click="updateIn(pack)"
              class="editButton">
            &#9998;
          </button>
          <br>
          <button
              @click="deleteIn(pack.id)"
              class="deleteButton">
            &#9587;
          </button>
        </div>
      </div>
      <br>
    </div>
  </div>
</template>

<script setup>
//Import Firestore reference
import db from "../firebase"

//Import functions
import {collection, deleteDoc, doc, onSnapshot} from "firebase/firestore";
import {onMounted, ref} from "vue";

//Import components
import AddInbound from "@/components/AddInbound";
import UpdateInbound from "@/components/UpdateInbound";

//Declare variables and constants
const ins = ref([])
const uIns = ref([])
const Enabled = ref("")

//Declare and define functions

//Get data and data updates
onMounted(async () => {
  onSnapshot(collection(db, "inbound"), (querySnapshot) => {
    let fbIn = []
    querySnapshot.forEach((doc) => {
      const pack = {
        id: doc.id,
        name: doc.data().name,
        order: doc.data().order,
        date: doc.data().date,
        desc: doc.data().desc
      }
      fbIn.push(pack)
    });
    ins.value = fbIn
  });
})

//Delete the document
const deleteIn = id => {
  deleteDoc(doc(db, "inbound", id))
}

//Prepare data for prop
const updateIn = pack => {
  uIns.value = {
    id: pack.id,
    name: pack.name,
    order: pack.order,
    desc: pack.desc
  };
  Enabled.value = true
  console.log(uIns)
}

</script>

<script>
//Export name
export default {
  name: "InboundTable"
}
</script>

<style scoped>
.card {
  text-align: left;
  margin: auto;
  padding: 0.1em 0.1em .3em;
  border-radius: 2em;
  border: 2px solid #E1E1E1;
  width: 30%;
  overflow: auto;
}

.cardItems {
  float: left;
  padding-bottom: 1em;
}

.cardTitle {
  margin: 0.5em 0;
  position: relative;
  left: 1em;
  font-size: 2em;
}

.cardSubtitle {
  margin: 0.25em 0;
  position: relative;
  font-size: 1.2em;
  color: #6b6b6b;
  left: 2em;

}

.cardContent {
  margin: 0.5em 0;
  position: relative;
  left: 4em;
}

.cardButtons {
  float: right;
  position: relative;
  top: 3.5em;
  right: 1em;
}

.editButton {
  background-color: #6c6c6c;
  border: none;
  padding: 0.2em 0.5em 0.5em;
  border-radius: 1em;
  margin: 0.2em;
  width: 2em;
  height: 2em;
  font-size: 1em;
  color: white;
}

.editButton:hover {
  background-color: #464646;
}

.deleteButton {
  color: white;
  background-color: red;
  border: none;
  padding: 0.2em 0.5em 0.5em;
  border-radius: 1em;
  margin: 0.2em;
  width: 2em;
  height: 2em;
  font-size: 1em;
}

.deleteButton:hover {
  background-color: #d50000;
}

button {
  transition-duration: 0.2s;
}

.container {
  width: 100%;
}

.formContainer {
  text-align: left;
}

</style>