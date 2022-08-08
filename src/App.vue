<template>
  <HeaderBar />
  <div class="sidebar">
    <SideBar />
  </div>
  <div class="main">

  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import HeaderBar from "@/components/Header";



export default {
  name: 'App',
  components: {
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
  position: absolute;
  float: left;
  top: 7vh;
  left: 10%;
  min-height: 120vh;
  color: black;
}
</style>
