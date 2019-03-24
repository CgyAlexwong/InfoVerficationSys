<!--登录界面/默认界面/首页-->

<template>
  <div id="hello">
    <img src="../assets/form_logo.png" alt="welcome" height="100" width="100"/>
    <h1>{{ msg }}</h1>
    <mt-button size = "normal" type = "default" @click="begin">
      <img src="../assets/logo.png" alt="begin" height="20" width="20"/>
      开始验证
    </mt-button>

    <router-view></router-view>
  </div>
</template>

<script>/* eslint-disable */
  import MtButton from 'mint-ui/packages/button/src/button'
  export default {
    name: 'HelloWorld',
    components: { MtButton },
    data () {
      return {
        msg: 'Welcome to infoVerificationSys !'
      }
    },
    methods:{
      begin:function () {
        this.$router.push('/stu/identity')
      },
      close: function () {
        window.close()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   @import "hello.css";
</style>
