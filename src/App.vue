
<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script lang="ts">
import { RouterView } from 'vue-router'

export default {
  name: 'App',
  components: {
    RouterView
  }
}
</script>
<style>
#app {
  font-size: 15px !important;
  color: #64676A !important;
  font-family: 'Jersey10', sans-serif !important;
  background: url("./assets/images/wallpaper.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  overflow-y: hidden;
  max-height: 100vh;
}
p{
  font-family: 'Jersey10', sans-serif !important;
}

@font-face {
  font-family: "Jersey10";
  src: url(../src/assets/fonts/Jersey10-Regular.ttf);
}
</style>
