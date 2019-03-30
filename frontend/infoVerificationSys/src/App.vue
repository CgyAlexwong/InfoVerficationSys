<template>
  <div id="app">
    <myHeader></myHeader>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './views/student/head.vue'
export default {
  name: 'App',
  components: {
    'myHeader': Header
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 42px;
  }
</style>
