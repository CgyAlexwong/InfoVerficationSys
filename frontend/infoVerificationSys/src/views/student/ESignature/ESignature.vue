<!--第五部分 电子签名加密-->

<template>
  <div id="ESignature">
    <mt-header fixed title="（5 / 5）电子签名加密">
      <router-link to="/stu/identity" slot="left">
        <mt-button icon="back" @click="warn">返回</mt-button>
      </router-link>
      <mt-button icon="field-error" slot="right" @click="close"></mt-button>
    </mt-header>
  </div>
</template>

<script>/* eslint-disable */
import MtHeader from "mint-ui/packages/header/src/header";
import MtButton from "mint-ui/packages/button/src/button";
import { MessageBox } from 'mint-ui'
export default {
  name: "ESignature",
  components: {MtButton, MtHeader},
  methods:{
    warn:function () {
      MessageBox.alert('',{
        title:"提示",
        message:"你已完成前阶段任务，无法返回"
      })
    },
    close: function () {
      window.opener = null;
      window.open('', '_self');
      window.close()
    }
  }
}
</script>

<style scoped>

</style>
