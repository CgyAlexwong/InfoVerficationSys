<!--第二部分 人脸识别校验-->

<template>
  <div id="faceVerify">
    <mt-header fixed title="（2 / 5）人脸识别验证">
      <router-link to="/stu/identity" slot="left">
        <mt-button icon="back" @click="warn">返回</mt-button>
      </router-link>
    </mt-header>
    <p id="word1">请拍摄你的正脸照：</p>
    <div id="camera">
      <div class="a-upload">
        <input id='cam' type="file" accept="image/*" capture="camera" @change="preview">
        点击拍照
      </div>
    </div>
    <!--<mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>-->
    <p id="word2">预览：
    <br>
      &nbsp;&nbsp;（点击可旋转照片，提交时请确保人脸端正）</p>
    <div id="load">
      <img :src="img" alt="人脸照片" style="width: 80%" id='photo' @click="rotate">
    </div>
    <div id="commitBox">
      <button id="commit" @click="submit">提交</button>
    </div>
  </div>
</template>

<script>/* eslint-disable */
import MtButton from "mint-ui/packages/button/src/button";
import MtHeader from "mint-ui/packages/header/src/header";
import {MessageBox} from 'mint-ui'
import {recognize} from "../../../utils/stuAPI";

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
          img:'https://github.com/CgyAlexwong/InfoVerficationSys/blob/uc1/frontend/infoVerificationSys/src/assets/da8e974dc.jpg?raw=true',
          r : 0,
          rotateTimes: 0
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
        },
        getCamera(){
          const  video  =  document.getElementById('video');
          const videoConstraints = {
            facingMode: 'environment'
          };
          const constraints = {
            video: videoConstraints,
            audio: false
          };
          navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
              video.srcObject = stream;
            })
            .catch(error => {
              console.error(error);
            });
        },
        /* show(){
          let a = document.getElementById('cam').files[0];
          console.log('name:'+a.name)
          console.log('size:'+a.size)
          console.log('type:'+a.type)
          console.log('file:'+a)
        }, */
        preview(){
          let file = document.getElementById('cam').files[0];
          let reader = new FileReader();
          reader.readAsDataURL(file);
          let that = this;
          reader.onloadend = function () {
            that.img = this.result;
          };
          this.rotateTimes = 0
        },
        rotate(){
          let pic = document.getElementById('photo');
          this.r += 90;
          pic.style.transform = 'rotate(' + this.r + 'deg)';
          this.rotateTimes += 1
        },
        submit(){
          let photo = document.getElementById('cam').files[0];
          let formData = new FormData();
          formData.append('file',photo);
          recognize(formData,this.rotateTimes).then(res => {
            if(res.succeed === true){
              MessageBox.alert('', {
                message: '人脸识别验证成功，点击进入OCR信息校验！',
                title: '成功',
                confirmButtonText: '下一步'
              }).then(action => {
                if (action === 'confirm') {
                  this.$router.push('/stu/OCRVerify')
                }
              })
            }
            else{
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
        }
      }
    }
</script>

<style scoped>
  #word1,#word2 {
    font-size: 12px;
    margin: 9px;
    padding-top: 9px;
    display: block;
    color: #888;
    text-align: left;
  }
  .a-upload {
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
  .a-upload input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
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
    border: 1px solid #3023ae;
    background: #3023ae;
    color: #fff;
    border-radius: 4px;
    padding: 5px 10px;
  }
</style>
