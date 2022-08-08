<template>
  <div class="container">
    <v-table>
      <thead>
      <tr>
        <th class="text-left">
          Name
        </th>
        <th class="text-left">
          Order
        </th>
        <th class="text-left">
          Date
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="pack in ins"
          :key="pack.date"
      >
        <td>{{ pack.name }}</td>
        <td>{{ pack.order }}</td>
        <td>{{ pack.date }}</td>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import db from "../firebase"
import {collection, onSnapshot} from "firebase/firestore";
import {ref, onMounted} from "vue";

const ins = ref([])

onMounted(async () => {
  onSnapshot(collection(db, "inbound"), (querySnapshot) => {
    let fbIn = []
    querySnapshot.forEach((doc) => {
      const pack = {
        id: doc.id,
        name: doc.data().name,
        order: doc.data().order,
        date: doc.data().date.toDate().toDateString(),
      }
      fbIn.push(pack)
    });
    ins.value = fbIn
  });
})

</script>

<script>
export default {
  name: "InboundTable"
}
</script>

<style scoped>
td {
  min-width: 20vh;
}
</style>