<!--第二部分 人脸识别校验-->

<template>
  <div id="faceVerify">
    <mt-header fixed title="（2 / 5）人脸识别验证">
      <router-link to="/stu/identity" slot="left">
        <mt-button icon="back" @click="warn">返回</mt-button>
      </router-link>
    </mt-header>
    <p>请拍摄你的正脸照：</p>
    <div id="camera">
      <mt-button @click="appear">点击拍照</mt-button>
    </div>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    <p>预览：</p>
    <div id="load">
      <img :src="img" alt="人脸照片" style="width: 80%">
    </div>
    <div id="commitBox">
      <button id="commit" @click="go">提交</button>
    </div>
  </div>
</template>

<script>/* eslint-disable */
import MtButton from "mint-ui/packages/button/src/button";
import MtHeader from "mint-ui/packages/header/src/header";
import {MessageBox} from 'mint-ui'
    export default {
      name: "faceVerify",
      components: {MtHeader, MtButton},
      data(){
        return{
          actions:[{
            name: '拍照',
            method : this.getCamera	// 调用methods中的函数
          }],
          sheetVisible:false,
          img:'https://github.com/CgyAlexwong/InfoVerficationSys/blob/uc1/frontend/infoVerificationSys/src/assets/da8e974dc.jpg?raw=true'
        }
      },
      methods:{
        appear:function () {
          this.sheetVisible = this.sheetVisible!== true;
          console.log(this.sheetVisible.closeOnClickModal);
        },
        go:function () {
          this.$router.push('/stu/OCRVerify')
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
  p{
    font-size: 12px;
    margin: 9px;
    padding-top: 9px;
    display: block;
    color: #888;
    text-align: left;
  }
  #camera{
    margin: 10px;
    padding: 9px;
  }
  #commitBox{
    margin: 10px 5px 5px;
    text-align: right;
  }
  #commit{
    border: 1px solid #26a2ff;
    background: #26a2ff;
    color: #fff;
    border-radius: 4px;
    padding: 5px 10px;
  }
</style>
