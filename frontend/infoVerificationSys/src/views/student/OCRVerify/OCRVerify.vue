<!--第三部分 OCR信息校验-->

<template>
  <div id="OCRVerify">
    <mt-header fixed title="（3 / 5）OCR信息校验">
      <router-link to="/stu/identity" slot="left">
        <mt-button icon="back" @click="warn">返回</mt-button>
      </router-link>
    </mt-header>
    <p id="word1">请拍摄你的通行证正面：</p>
    <div id="front" >
      <div class="front-upload">
        <input id='cam1' type="file" accept="image/*" capture="camera" @change="previewFront">
        点击拍照
      </div>
      <!--<mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>-->
      <p id="word2">预览：</p>
      <div id="loadFront">
        <img :src="img1" alt="人脸照片" style="width: 80%" id='photo1' @click="rotateFront">
      </div>
      <div id="commitFrontBox">
        <button id='commitFront' @click="checkFront" v-bind:disabled="frontCommitState">提交</button>
      </div>
    </div>

    <p id="word3">请拍摄你的通行证反面：</p>
    <div id="back" >
      <div class="back-upload" id="backCamera">
        <input id='cam2' type="file" accept="image/*" capture="camera" @change="previewBack" v-bind:disabled="backCommitAble">
        点击拍照
      </div>
      <!--<mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>-->
      <p id="word4">预览：</p>
      <div id="loadBack">
        <img :src="img2" alt="人脸照片" style="width: 80%" id='photo2' @click="rotateBack">
      </div>
      <div id="commitBackBox">
        <button id='commitBack' @click="checkBack" v-bind:disabled="backCommitAble">提交</button>
      </div>
    </div>
  </div>
</template>

<script>/* eslint-disable */
import MtButton from 'mint-ui/packages/button/src/button'
import MtHeader from "mint-ui/packages/header/src/header"
import {MessageBox} from 'mint-ui'
import {doOCR,doOCRNegative} from "../../../utils/stuAPI";

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
      sheetVisible:false,
      img1:'https://github.com/CgyAlexwong/InfoVerficationSys/blob/uc1/frontend/infoVerificationSys/src/assets/da8e974dc.jpg?raw=true',
      img2:'https://github.com/CgyAlexwong/InfoVerficationSys/blob/uc1/frontend/infoVerificationSys/src/assets/da8e974dc.jpg?raw=true',
      r1: 0,
      r2: 0,
      rotateTimesFront: 0,
      rotateTimesBack: 0
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
    checkFront () {
      let front = document.getElementById('cam1').files[0];
      let formData1 = new FormData();
      formData1.append('file',front);
      doOCR(formData1,this.rotateTimesFront).then(res =>{
        if (res.succeed === true){
          this.frontCommitState = true;
          this.backCommitAble = false;
          let button = document.getElementById('backCamera');
          button.style.opacity = 1
        }else {
          MessageBox.confirm('', {
            message: res.msg,
            title: '提示',
            confirmButtonText: '反馈',
            cancelButtonText: '重试'
          }).then(action => {
            if (action === 'confirm') {     //反馈的回调
              this.$router.push('/feedback')
            }
          }).catch(err => {
            if (err === 'cancel') {     //重试的回调
              console.log("重试");
            }
          })
        }
      })
    },
    checkBack () {
      let back = document.getElementById('cam2').files[0];
      let formData2 = new FormData();
      formData2.append('file',back);
      doOCRNegative(formData2,this.rotateTimesBack).then(res =>{
        if (res.succeed === true){
          this.$router.push('/stu/informationVerify')
        }else {
          MessageBox.confirm('', {
            message: res.msg,
            title: '提示',
            confirmButtonText: '反馈',
            cancelButtonText: '重试'
          }).then(action => {
            if (action === 'confirm') {     //反馈的回调
              this.$router.push('/feedback')
            }
          }).catch(err => {
            if (err === 'cancel') {     //重试的回调
              console.log("重试");
            }
          })
        }
      })
    },
    previewFront(){
      let file = document.getElementById('cam1').files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      let that = this;
      reader.onloadend = function () {
        that.img1 = this.result;
      };
      this.rotateTimesFront = 0
    },
    previewBack(){
      let file = document.getElementById('cam2').files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      let that = this;
      reader.onloadend = function () {
        that.img2 = this.result;
      };
      this.rotateTimesBack = 0
    },
    rotateFront(){
      let pic = document.getElementById('photo1');
      this.r1 += 90;
      pic.style.transform = 'rotate(' + this.r1 + 'deg)';
      this.rotateTimesFront += 1;
    },
    rotateBack(){
      let pic = document.getElementById('photo2');
      this.r2 += 90;
      pic.style.transform = 'rotate(' + this.r2 + 'deg)';
      this.rotateTimesBack += 1;
    },
  }
}
</script>

<style scoped>
  #word1,#word2,#word3,#word4{
    font-size: 12px;
    margin: 9px;
    padding-top: 9px;
    display: block;
    color: #888;
    text-align: left;
  }
  .front-upload {
    position: relative;
    display: inline-block;
    background: #7645c1;
    box-shadow: 0 0 1px #b8bbbf;
    border-radius: 4px;
    padding: 2px 12px;
    overflow: hidden;
    color: #ffffff;
    text-decoration: none;
    text-indent: 0;
    line-height: 36px;
  }
  .front-upload input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
  }
  .back-upload {
    position: relative;
    display: inline-block;
    background: #7645c1;
    box-shadow: 0 0 1px #b8bbbf;
    border-radius: 4px;
    padding: 2px 12px;
    overflow: hidden;
    color: #ffffff;
    text-decoration: none;
    text-indent: 0;
    line-height: 36px;
    opacity: 0.6;
  }
  .back-upload input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
  }
  #commitFrontBox,#commitBackBox{
    margin: 10px 5px 5px;
    text-align: right;
  }
  #commitFront,#commitBack{
    border: 1px solid #3023ae;
    background: #3023ae;
    color: #fff;
    border-radius: 4px;
    padding: 5px 10px;
  }
  #commitBack:disabled{
    opacity: 0.6;
  }
</style>
