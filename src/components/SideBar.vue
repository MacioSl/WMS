<template>
  <div class="cont">

    <div class="flex-container">
      <a href="/">List</a>
      <a href="/inbound">Inbound</a>
      <a href="/outbound">Outbound</a>
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
a {
  color: white;
  text-decoration: none;
  background-color: #333333;
  padding: 0.5em 1em 0.5em;
  border-radius: 2em;
  margin-bottom: 0.5em;
  width: 70%;
}

a:hover {
  background-color: #616161;
}

.cont {
  text-align: center;
  height: 100%;
  min-height: 92.9vh;
  color: white;
  position: fixed;
  top: 7vh;
  left: 0;
  width: 10%;
}

.flex-container {
  margin: 1em 0;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  float: left;
  width: 100%;
}

footer {
  align-items: center;
  justify-content: center;
  background-color: #333333;
  position: absolute;
  font-size: 0.6em;
  top: 85%;
  left: 7.5%;
  width: 80%;
  margin: 0;
  padding: 0.25em 0.5em 1.25em;
  border-radius: 2em;
}

</style>