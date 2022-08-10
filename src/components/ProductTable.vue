<template>
  <div class="formContainer">
    <AddProduct/>
    <UpdateProduct v-model="uProduct"/>
  </div>
  <div class="container">
    <v-table>
      <thead>
      <tr>
        <th class="text-left">
          Name
        </th>
        <th class="text-left">
          Quantity
        </th>
        <th class="text-left">
          Serial
        </th>
        <th class="text-left">
          Lot
        </th>
        <th class="text-left">
          Price
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="product in products"
          :key="product.serial"
      >
        <td>{{ product.name }}</td>
        <td>{{ product.quantity }}</td>
        <td>{{ product.serial }}</td>
        <td>{{ product.lot }}</td>
        <td>{{ product.price }}</td>
        <td>
          <button
              @click="updateUP(product)"
              class="editButton">
            &#9998;
          </button>
          <button
              @click="deleteProd(product.id)"
              class="deleteButton">
            &#9587;
          </button>
        </td>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import db from "../firebase"
import {collection, onSnapshot, doc, deleteDoc} from "firebase/firestore";
import {ref, onMounted} from "vue";
import UpdateProduct from "@/components/UpdateProduct";

const products = ref([])
const uProduct = ref([])

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

const deleteProd = id => {
  deleteDoc(doc(db, "products", id))
}

const updateUP = product => {
  console.log(product)
  const Product = {
    id: product.id,
    name: product.name,
    price: product.price,
    lot: product.lot,
    quantity: product.quantity,
    serial: product.serial,
  }
  uProduct.value = Product;
  console.log(uProduct)
}

</script>

<script>

import AddProduct from "@/components/AddProduct";

export default {
  name: "ProductTable",
  components: {
    AddProduct,
  }
}
</script>

<style scoped>
v-table {
  border-collapse: separate;
}

th {
  padding-bottom: 1em;
  padding-top: 1em;
  font-size: 1.5em;
}

tbody tr:nth-child(odd) {
  background-color: #616161;
  color: #fff;
}

tbody tr:nth-child(even) {
  background-color: #E1E1E1;
  color: #000;
}

tbody td {
  padding: 15px 2em;
}

td {
  overflow: auto;
}

.editButton {
  background-color: azure;
  border: none;
  padding: 0.2em 0.5em 0.5em;
  border-radius: 1em;
  margin: 0.2em;
  width: 2em;
  height: 2em;
}

.editButton:hover {
  background-color: #b5c2c2;
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

input {
  margin: 0.1em 0.2em;
  padding: 0.5em;
  border-radius: 2em;
  border: 2px solid #E1E1E1;
}

</style>