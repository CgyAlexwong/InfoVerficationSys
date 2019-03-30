<!--第三部分 OCR信息校验-->

<template>
  <div id="OCRVerify">
    <mt-header fixed title="（3 / 5）OCR信息校验">
      <router-link to="/stu/identity" slot="left">
        <mt-button icon="back" @click="warn">返回</mt-button>
      </router-link>
    </mt-header>
    <p>请拍摄你的通行证正面：</p>
    <div id="front" >
      <div>
        <mt-button @click="appear">点击拍照</mt-button>
      </div>
      <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
      <div>
        <button id='commitFront' @click="changeBackState" v-bind:disabled="frontCommitState">提交</button>
      </div>
    </div>
    <p>请拍摄你的通行证反面：</p>
    <div id="back" >
      <div>
        <mt-button @click="appear" v-bind:disabled="backCommitAble">点击拍照</mt-button>
      </div>
      <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
      <div>
        <button id='commitBack' @click="go" v-bind:disabled="backCommitAble">提交</button>
      </div>
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
      frontCommitState:false,
      backCommitAble:true,
      sheetVisible:false
    }
  },
  methods:{
    appear:function () {
      this.sheetVisible = this.sheetVisible!== true;
    },
    go:function () {
      this.$router.push('/stu/informationVerify')
    },
    warn:function () {
      MessageBox.alert('',{
        title:"提示",
        message:"你已完成前阶段任务，无法返回"
      })
    },
    changeBackState () {
      this.frontCommitState = true;
      this.backCommitAble = false;

    }
  }
}
</script>

<style scoped>
  p{
    font-size: 12px;
    margin: 9px;
    padding-top: 9px;
    display: block;
    color: #888;
    text-align: left;
  }
  #commitFront,#commitBack{
    border: 1px solid #26a2ff;
    background: #26a2ff;
    color: #fff;
    border-radius: 4px;
    padding: 5px 10px;
  }
</style>
