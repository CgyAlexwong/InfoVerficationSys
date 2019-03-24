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
  },
  methods:{
    getData () {
      var that = this.$http.get('api/sysuser/list')
        .then(function (response) {
          console.log(response.data)
          console.log(this)
          that.serverData = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    }
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
    margin-top: 60px;
  }
</style>
