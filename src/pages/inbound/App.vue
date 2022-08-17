<template>
  <HeaderBar />
  <div class="sidebar">
    <SideBar />
  </div>
  <div class="main">
  <InboundTable/>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import HeaderBar from "@/components/Header";
import InboundTable from "@/components/InboundTable";

export default {
  name: 'App',
  components: {
    InboundTable,
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

.sidebar{
float: left;
}
.main{
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
