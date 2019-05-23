<!--登录界面/默认界面/首页-->

<template>
  <div>
    <div id = "header">
      <mt-header fixed title="台港澳信息校验系统">
        <router-link to="/stu" slot="left">
          <mt-button icon="back">首页</mt-button>
        </router-link>
      </mt-header>
    </div>
    <div id="hello">
      <img id='helloPic' src="../assets/da8e974dc.jpg" alt="welcome" height="100" width="100"/>
      <p id="welcome">信息校验系统<br>欢迎使用</p>
        <div style="display: flex;justify-content: center" @click="begin">
          <img src = "../assets/form_logo.png" style="width: 10%;height: 10%">
          <div style="display: flex;justify-content:center;align-items:Center;padding: 10px"><span>开始校验</span></div>
        </div>

      <router-view></router-view>
    </div>
  </div>
</template>

<script>/* eslint-disable */
  import MtButton from 'mint-ui/packages/button/src/button'
  export default {
    name: 'HelloWorld',
    components: { MtButton },
    methods:{
      begin:function () {
        this.$router.push('/stu/OCRVerify')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./hello.css">

</style>
