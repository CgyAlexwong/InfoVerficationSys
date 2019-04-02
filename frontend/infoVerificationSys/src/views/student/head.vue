<template>
  <div id = "header">
    <mt-header fixed title="台港澳信息校验系统">
      <router-link to="/stu" slot="left">
        <mt-button icon="back">首页</mt-button>
      </router-link>
      <mt-button icon="field-error" slot="right" @click="close"></mt-button>
    </mt-header>
  </div>
</template>

// header界面
<script>/* eslint-disable */
import MtButton from "mint-ui/packages/button/src/button";
import MtHeader from "mint-ui/packages/header/src/header";

export default {
  components: {MtHeader, MtButton},
  methods: {
      // 关闭界面
      close: function () {
        window.opener=null;
        window.open('','_self');
        window.close()
      }
    },
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
