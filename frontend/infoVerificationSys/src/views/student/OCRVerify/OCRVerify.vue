<!--第三部分 OCR信息校验-->

<template>
  <div id="OCRVerify">
    <mt-header fixed title="（3 / 5）OCR信息校验">
      <router-link to="/stu/identity" slot="left">
        <mt-button icon="back" @click="warn">返回</mt-button>
      </router-link>
      <mt-button icon="field-error" slot="right" @click="close"></mt-button>
    </mt-header>
    <div>
      <mt-button @click="appear">点击拍照</mt-button>
    </div>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    <div>
      <mt-button @click="go">提交</mt-button>
    </div>
  </div>
</template>

<script>/* eslint-disable */
import MtButton from 'mint-ui/packages/button/src/button'
import MtHeader from "mint-ui/packages/header/src/header"
import {MessageBox} from 'mint-ui'
export default {
  name: 'OCRVerify',
  components: { MtButton },
  data () {
    return {
      actions:[{
        name: '拍照',
        method : this.getCamera	// 调用methods中的函数
      }],
      sheetVisible:false
    }
  },
  methods:{
    appear:function () {
      this.sheetVisible = this.sheetVisible!== true;
      console.log(this.sheetVisible.closeOnClickModal);
    },
    go:function () {
      this.$router.push('/stu/informationVerify')
    },
    close: function () {
      window.opener=null;
      window.open('','_self');
      window.close()
    },
    warn:function () {
      MessageBox.alert('',{
        title:"提示",
        message:"你已完成前阶段任务，无法返回"
      })
    }
  }
}
</script>

<style scoped>

</style>
