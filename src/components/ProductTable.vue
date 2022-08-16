<template>
  <div class="formContainer">
    <AddProduct/>
    <UpdateProduct v-model="uProduct" v-model:enable="Enabled"/>
  </div>
  <br><br><br>
  <div class="container">
    <!--      Loop to create data rows in the range of provided data array      -->
    <div
        v-for="product in products"
        :key="product.serial">
      <div class="card">
        <div class="cardItems">
          <div>
            <h3 class="cardTitle">{{ product.name }}</h3>
            <h4 class="cardSubtitle">{{ product.serial }}</h4>
          </div>
          <div class="cardContent">
            Lot: {{ product.lot }}<br>
            Quantity: {{ product.quantity }}<br>
            Price: {{ product.price }}
          </div>
        </div>
        <div class="cardButtons">
          <button
              @click="updateUP(product)"
              class="editButton">
            &#9998;
          </button>
          <br>
          <button
              @click="deleteProd(product.id)"
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
import AddProduct from "@/components/AddProduct";
import UpdateProduct from "@/components/UpdateProduct";

//Declare variables and constants
const products = ref([])
const uProduct = ref([])
const Enabled = ref("")

//Declare and define functions

//Get data and data updates
onMounted(async () => {
  onSnapshot(collection(db, "products"), (querySnapshot) => {
    const fbProd = [];
    querySnapshot.forEach((doc) => {
      const product = {
        id: doc.id,
        name: doc.data().name,
        price: doc.data().price,
        lot: doc.data().lot,
        quantity: doc.data().quantity,
        serial: doc.data().serial
      }
      fbProd.push(product)
    });
    products.value = fbProd
  });
})

//Delete the document
const deleteProd = id => {
  deleteDoc(doc(db, "products", id))
}

//Prepare data for prop
const updateUP = product => {
  uProduct.value = {
    id: product.id,
    name: product.name,
    price: product.price,
    lot: product.lot,
    quantity: product.quantity,
    serial: product.serial,
  };
  Enabled.value = true
  console.log(uProduct)
}

</script>

<script>
//Export name
export default {
  name: "ProductTable",

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