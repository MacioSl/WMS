<template>
  <div class="container">
    <v-table>
      <thead>
      <tr>
        <th class="text-left">Surname</th>
        <th class="text-left">Name</th>
        <th class="text-left">Order</th>
        <th class="text-left">Date</th>
        <th class="text-left">Country</th>
        <th class="text-left">Town</th>
        <th class="text-left">Address</th>
        <th class="text-left">Zip code</th>
        <th class="text-left">Description</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="pack in outs"
          :key="pack.date"
      >
        <td>{{ pack.surname }}</td>
        <td>{{ pack.name }}</td>
        <td>{{ pack.order }}</td>
        <td>{{ pack.date }}</td>
        <td>{{ pack.country }}</td>
        <td>{{ pack.town }}</td>
        <td>{{ pack.addr }}</td>
        <td>{{ pack.zip }}</td>
        <td>{{ pack.desc }}</td>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import db from "../firebase"
import {collection, onSnapshot} from "firebase/firestore";
import {ref, onMounted} from "vue";

const outs = ref([])

onMounted(async () => {
  onSnapshot(collection(db, "outbound"), (querySnapshot) => {
    let fbOuts = []
    querySnapshot.forEach((doc) => {
      const pack = {
        id: doc.id,
        name: doc.data().name,
        order: doc.data().order,
        date: doc.data().date.toDate().toDateString(),
        zip: doc.data().zip,
        addr: doc.data().address,
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

</script>

<script>
export default {
  name: "OutboundTable"
}
</script>

<style scoped>
v-table th td{
  border: 1px solid;
}
td {
  min-width: 20vh;
}
</style>