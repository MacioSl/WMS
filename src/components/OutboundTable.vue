<template>
  <div class="formContainer">
      <AddOutbound />
      <UpdateOutbound v-model="uOuts" v-model:enable="Enabled"/>
  </div>
  <br><br><br>
  <div class="container">
    <div
        v-for="pack in outs"
        :key="pack.date">
      <div class="card">
        <div class="cardItems">
          <div>
            <h3 class="cardTitle">{{ pack.order }}</h3>
            <h4 class="cardSubtitle">{{pack.date}}</h4>
          </div>
          <div class="cardContent">
            Description: {{pack.desc}}<br><br>
            Recipient: {{pack.surname}} {{pack.name}}<br><br>
            Address:<br>
            {{pack.addr}}<br>
            {{pack.town}}, {{pack.zip}}<br>
            {{pack.country}}
          </div>
        </div>
        <div class="cardButtons">
          <button
              @click="updateOut(pack)"
              class="editButton">
            &#9998;
          </button>
          <br>
          <button
              @click="deleteOut(pack.id)"
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
import {ref, onMounted} from "vue";
import AddOutbound from "@/components/AddOutbound";
import UpdateOutbound from "@/components/UpdateOutbound";

//Import components

//Declare variables and constants
const outs = ref([])
const uOuts = ref([])
const Enabled = ref("")

//Declare and define functions

//Get data and data updates
onMounted(async () => {
  onSnapshot(collection(db, "outbound"), (querySnapshot) => {
    let fbOuts = []
    querySnapshot.forEach((doc) => {
      const pack = {
        id: doc.id,
        name: doc.data().name,
        order: doc.data().order,
        date: doc.data().date,
        zip: doc.data().zip,
        addr: doc.data().addr,
        country: doc.data().country,
        town: doc.data().town,
        surname: doc.data().surname,
        desc: doc.data().desc,
      }
      fbOuts.push(pack)
    });
    outs.value = fbOuts
  });
})

//Delete the document
const deleteOut = id => {
  deleteDoc(doc(db, "outbound", id))
}

//Prepare data for prop
const updateOut = pack => {
  uOuts.value = {
    id: pack.id,
    name: pack.name,
    order: pack.order,
    zip: pack.zip,
    addr: pack.addr,
    country: pack.country,
    town: pack.town,
    surname: pack.surname,
    desc: pack.desc,
  }
  Enabled.value = true
  console.log(uOuts)
}

</script>

<script>
//Export name
export default {
  name: "OutboundTable"
}
</script>

<style scoped>
.card {
  text-align: left;
  margin: auto;
  padding: 0.1em 0.1em .3em;
  border-radius: 2em;
  border: 2px solid #E1E1E1;
  width: 50%;
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
  left: 5em;
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