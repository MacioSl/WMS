<template>
  <HeaderBar/>
  <div class="sidebar">
    <SideBar/>
  </div>
  <div class="main">
    <OutboundTable/>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import HeaderBar from "@/components/Header";
import OutboundTable from "@/components/OutboundTable";

export default {
  name: 'App',
  components: {
    OutboundTable,
    HeaderBar,
    SideBar,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.sidebar {
  float: left;
}

.main {
  display: inline-block;
  position: absolute;
  float: left;
  top: 7vh;
  left: 10%;
  right: 1%;
  color: black;
  margin: 0;
}
</style>
