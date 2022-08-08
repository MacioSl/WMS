<template>
  <div class="cont">
    <div class="flex-container">
      <div>List</div>
      <div>Orders</div>
      <div>Inbound</div>
      <div>Outbound</div>
    </div>
    <footer>
      <br>WMS by Maciej Bartczak.
    </footer>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  components: {}
}
</script>

<style scoped>
.cont{
  border-top-style: solid;
  border-top-width: medium;
  border-top-color: #616161;
  text-align: center;
  height: 100%;
  min-height: 92.9vh;
  background-color: #333333;
  color: white;
  position: fixed;
  top: 7vh;
  left: 0;
  width: 10%;
}
.flex-container{
  display: flex;
  flex-direction: column;
  text-align: left;
  float: left;
}

footer{
  border-top-style: solid;
  border-top-width: medium;
  border-top-color: #616161;
  position: absolute;
  font-size: 75%;
  top: 85%;
  width: 100%;
}

</style>