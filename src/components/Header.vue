<template>
  <header>
    <div class="flex-container">
<!--      <img alt="WMS logo" src="@/assets/WMSLogo.png">-->
      <div>
        WMS
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderBar"
}
</script>

<style scoped>
header {
  border-bottom-style: solid;
  border-bottom-width: medium;
  border-bottom-color: #616161;
  text-align: left;
  height: 7vh;
  background-color: #333333;
  color: azure;
  font-size: 4vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}
.flex-container{
  padding: 0.25em 0.5em 0em;
  opacity: 100%;
/*display: flex;*/
}
img {
  float: left;
  height: 100%;
  max-height: 10vh;
}
</style>