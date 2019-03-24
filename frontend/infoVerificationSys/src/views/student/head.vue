<template>
  <div id = "header">
    <mt-header fixed title="港澳台信息校验系统">
      <router-link to="/stu" slot="left">
        <mt-button icon="back">首页</mt-button>
      </router-link>
      <mt-button icon="field-error" slot="right" @click="close"></mt-button>
    </mt-header>
  </div>
</template>

// header界面
<script>/* eslint-disable */
  import Vue from 'vue'
  import { Button } from 'mint-ui'
  import { Header } from 'mint-ui'
  Vue.component(Header.name, Header)
  Vue.component(Button.name, Button)

  export default {
    methods: {
      // 关闭界面
      close: function () {
        window.opener=null;
        window.open('','_self');
        window.close()
      }
    },
    // 组件
    components: {
      'mt-button': Button,
      'mt-header': Header
    }
  }
</script>

<style scoped>
  Button {
    font-weight: normal;
    list-style-type: none;
    padding: 0;
    display: inline-block;
    margin: 0 10px;
    color: #000000;
  }
</style>
