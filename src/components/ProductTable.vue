<template>
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
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import db from "../firebase"
import {collection, onSnapshot} from "firebase/firestore";
import {ref, onMounted} from "vue";

const products = ref([])

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

</script>

<script>
export default {
  name: "ProductTable"
}
</script>

<style scoped>
td {
  min-width: 20vh;
}
</style>