<!--第三部分 OCR信息校验-->

<template>
  <div id="OCRVerify">
    <mt-header fixed title="（1 / 4）OCR身份识别">
      <router-link to="/stu" slot="left">
        <mt-button icon="back">首页</mt-button>
      </router-link>
    </mt-header>

    <p id="word3">提示：<br>
      &nbsp;&nbsp;&nbsp;&nbsp;如果你使用的是本式台胞证，请点击<router-link to="/stu/oldOCRVerify">前往此处</router-link>验证</p>
    <hr/>
    <!--<div id="box" v-if="typeChoose">-->
      <!--<mt-radio title="请选择你的通行证新旧类型：" v-model="type" :options="options"></mt-radio>-->
    <!--</div>-->

    <p id="word1">请拍摄你的通行证正面：</p>
    <div id="front" >
      <div class="front-upload" id="frontCamera">
        <input id='cam1' type="file" accept="image/*" capture="camera" @change="previewFront">
        点击拍照
      </div>
      <!--<mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>-->
      <p id="word2">预览：
        <!--<br>-->
        <!--&nbsp;&nbsp;（点击可旋转照片，提交时请确保通行证端正）-->
      </p>
      <div id="loadFront">
        <img :src="img1" alt="人脸照片" style="width: 80%" id='photo1' @click="rotateFront">
      </div>
      <div id="commitFrontBox">
        <button id='commitFront' @click="checkFront" v-bind:disabled="!frontCommitAble">提交</button>
      </div>
    </div>

    <!--<p id="word3">请拍摄你的通行证反面：</p>
    <div id="back" >
      <div class="back-upload" id="backCamera">
        <input id='cam2' type="file" accept="image/*" capture="camera" @change="previewBack" v-bind:disabled="!backCommitState">
        点击拍照
      </div>
      <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
      <p id="word4">预览：
        <br>
        &nbsp;&nbsp;（点击可旋转照片，提交时请确保通行证端正）
      </p>
      <div id="loadBack">
        <img :src="img2" alt="人脸照片" style="width: 80%" id='photo2' @click="rotateBack">
      </div>
      <div id="commitBackBox">
        <button id='commitBack' @click="checkBack" v-bind:disabled="!backCommitState||!backCommitAble">提交</button>
      </div>
    </div>-->
  </div>
</template>

<script>/* eslint-disable */
import MtButton from 'mint-ui/packages/button/src/button'
import MtHeader from "mint-ui/packages/header/src/header"
import {MessageBox,Indicator} from 'mint-ui'
import {userOCRLogin, getStatus} from "../../../utils/stuAPI";
import lrz from 'lrz';
import Cookies from 'js-cookie'
import MtRadio from "mint-ui/packages/radio/src/radio";

export default {
  name: 'OCRVerify',
  components: {MtRadio, MtButton },
  data () {
    return {
      //actions:[{
        //name: '拍照',
        //method : this.getCamera	// 调用methods中的函数
      //}],
      typeChoose:false,
      // options : [
      //   {
      //     label: '新版',
      //     value: 'new'
      //   },
      //   {
      //     label: '旧版',
      //     value: 'old'
      //   }
      // ],
      type:'new',
      frontCommitState: true,
      frontCommitAble: false,
      backCommitState: false,
      backCommitAble:false,
      sheetVisible:false,
      img1:'https://github.com/CgyAlexwong/InfoVerficationSys/blob/uc1/frontend/infoVerificationSys/src/assets/da8e974dc.jpg?raw=true',
      // img2:'https://github.com/CgyAlexwong/InfoVerficationSys/blob/uc1/frontend/infoVerificationSys/src/assets/default.jpg?raw=true',
      formData1 : new FormData(),
      // formData2 : new FormData(),
      r1: 0,
      // r2: 0,
      rotateTimesFront: 0,
      // rotateTimesBack: 0
    }
  },
  // mounted:function(){
  //   let place = Cookies.get('place')
  //   this.typeChoose = true;
  //   MessageBox.confirm('', {
  //     message: '如果你使用的是本式台胞证，请点击反馈。如果不是，请点击忽略。',
  //     title: '提示',
  //     confirmButtonText: '反馈',
  //     cancelButtonText: '忽略'
  //   }).then(action => {
  //     if (action === 'confirm') {     //反馈的回调
  //       this.$router.push('/feedback')
  //     }
  //   }).catch(err => {
  //     if (err === 'cancel') {     //忽略的回调
  //       console.log("忽略");
  //    }
  //   })
  // },
  methods:{
    appear:function () {
      this.sheetVisible = this.sheetVisible!== true;
    },
    go1(){
      this.frontCommitState = true;
      this.backCommitState = true;
      let button = document.getElementById('backCamera');
      button.style.opacity = 1;
      let button2 = document.getElementById('frontCamera');
      button2.style.opacity = 0.6
    },
    go2:function () {
      MessageBox.alert('', {
        message: 'OCR信息校验成功，点击进入基本信息校验！',
        title: '成功',
        confirmButtonText: '下一步'
      }).then(action => {
        if (action === 'confirm') {
          this.$router.push('/stu/informationVerify')
        }
      })
    },
    // warn:function () {
    //   MessageBox.alert('',{
    //     title:"提示",
    //     message:"你已完成前阶段任务，无法返回"
    //   })
    // },
    checkFront () {
      console.log(this.formData1);
      Indicator.open({text:'通行证正面校验中，请稍等……',spinnerType:'fading-circle'});
      userOCRLogin(this.formData1,this.type).then(res =>{
        Indicator.close();
        //if (res.succeed === true){
          //MessageBox.alert('', {
            //message: '通行证正面校验成功，点击继续校验通行证反面！',
            //title: '成功',
            //confirmButtonText: '继续'
          //}).then(action => {
            //if (action === 'confirm') {
              //this.frontCommitState = false;
              //this.backCommitState = true;
              //let button1 = document.getElementById('backCamera');
              //button1.style.opacity = 1;
              //let button2 = document.getElementById('frontCamera');
              //button2.style.opacity = 0.6
            //}
          //})
        if (res.succeed === true){
          Cookies.set('id',res.msg);
          MessageBox.alert('', {
            message: '成功匹配信息，点击进入下一步！',
            title: '找到你啦！',
            confirmButtonText: '下一步'
          }).then(action => {
            if (action === 'confirm') {
              getStatus().then( response =>{
                if (response.basicInfoCheck === 0){
                  this.$router.push('/stu/basicInfoVerify')
                } else if (response.basicInfoCheck >= 1 && response.otherInfoCheck === 0){
                  this.$router.push('/stu/otherInfoVerify')
                } else if (response.basicInfoCheck >= 1 && response.otherInfoCheck === 1){
                  this.$router.push('/end')
                } else {
                  this.$router.push('/stu/OCRVerify')
                }
              })
            }
          })
        }else {
          MessageBox.confirm('', {
            message: res.msg,
            title: '哎呀没认出你！',
            confirmButtonText: '手动输入识别',
            cancelButtonText: '重试'
          }).then(action => {
            if (action === 'confirm') {     //手动输入的回调
              this.$router.push('/stu/identity')
            }
          }).catch(err => {
            if (err === 'cancel') {     //重试的回调
              console.log("重试");
            }
          })
        }
      })
    },
    // checkBack () {
    //   Indicator.open({text:'通行证反面校验中，请稍等……',spinnerType:'fading-circle'});
    //   doOCRNegative(this.formData2,this.rotateTimesBack).then(res =>{
    //     if (res.succeed === true){
    //       Indicator.close();
    //       MessageBox.alert('', {
    //         message: 'OCR信息校验成功，点击进入下一步！',
    //         title: '成功',
    //         confirmButtonText: '下一步'
    //       }).then(action => {
    //         if (action === 'confirm') {
    //           getStatus().then( response =>{
    //             if (response.faceCheck === false){
    //               this.$router.push('/stu/faceVerify')
    //             } else if (response.faceCheck === true && response.ocrCheck === false){
    //               this.$router.push('/stu/OCRVerify')
    //             } else if (response.faceCheck === true && response.ocrCheck === true && response.infoCheck === false){
    //               this.$router.push('/stu/informationVerify')
    //             } else if (response.faceCheck === true && response.ocrCheck === true && response.infoCheck === true && response.signCheck === false){
    //               this.$router.push('/stu/ESignature')
    //             } else if (response.faceCheck === true && response.ocrCheck === true && response.infoCheck === true && response.signCheck === true){
    //               this.$router.push('/end')
    //             } else {
    //               this.$router.push('/stu/identity')
    //             }
    //           })
    //         }
    //       })
    //     }else {
    //       MessageBox.confirm('', {
    //         message: res.msg,
    //         title: '提示',
    //         confirmButtonText: '反馈',
    //         cancelButtonText: '重试'
    //       }).then(action => {
    //         if (action === 'confirm') {     //反馈的回调
    //           this.$router.push('/feedback')
    //         }
    //       }).catch(err => {
    //         if (err === 'cancel') {     //重试的回调
    //           console.log("重试");
    //         }
    //       })
    //     }
    //   })
    // },
    compressFront(){
      let file = document.getElementById('cam1').files[0];
      if(file.size < 500000){
        this.formData1.delete('file');
        this.formData1.append('file',file,file.name);
        setTimeout(() => Indicator.close(), 0);
      }else {
        lrz(file,{
          quality:0.7
        }).then(rst =>{
          console.log(file)
          let newFile = rst.file;
          newFile.name = file.name;
          this.formData1.delete('file');
          this.formData1.append('file',newFile,file.name);
          Indicator.close();
        }).error(err=>{
          console.log(err);
          Indicator.close();
        })
      }
    },
    // compressBack(){
    //   let file = document.getElementById('cam2').files[0];
    //   if (file.size<300000){
    //     this.formData2.delete('file');
    //     this.formData2.append('file',file);
    //     Indicator.close();
    //   }else{
    //     lrz(file,{
    //       quality:0.7
    //     }).then(rst =>{
    //       let newFile = rst.file;
    //       newFile.name = file.name;
    //       this.formData2.delete('file');
    //       this.formData2.append('file',newFile,file.name);
    //       Indicator.close();
    //     })
    //   }
    // },
    previewFront(){
      Indicator.open({text:'图片加载中，请稍等……',spinnerType:'fading-circle'});
      let file = document.getElementById('cam1').files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      let that = this;
      reader.onloadend = function () {
        that.img1 = this.result;
      };
      this.rotateTimesFront = 0;
      this.frontCommitAble = true;
      this.compressFront();
    },
    // previewBack(){
    //   Indicator.open({text:'图片加载中，请稍等……',spinnerType:'fading-circle'});
    //   let file = document.getElementById('cam2').files[0];
    //   let reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   let that = this;
    //   reader.onloadend = function () {
    //     that.img2 = this.result;
    //   };
    //   this.rotateTimesBack = 0;
    //   this.backCommitAble = true;
    //   this.compressBack();
    // },
    rotateFront(){
      let pic = document.getElementById('photo1');
      this.r1 += 90;
      pic.style.transform = 'rotate(' + this.r1 + 'deg)';
      this.rotateTimesFront += 1;
    },
    // rotateBack(){
    //   let pic = document.getElementById('photo2');
    //   this.r2 += 90;
    //   pic.style.transform = 'rotate(' + this.r2 + 'deg)';
    //   this.rotateTimesBack += 1;
    // },
  }
}
</script>

<style scoped>
  #box{
    border: 1px dashed #ffffff;
    border-top-width: 5px;
    border-bottom-color: #888888;
  }
  #word1,#word2{
    font-size: 14px;
    margin: 4px 9px 9px;
    padding: 4px 0 4px;
    display: block;
    color: #888;
    text-align: left;
  }
  #word3{
    font-size: 14px;
    margin: 9px 9px 2px;
    padding: 8px 0 0;
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
    opacity: 1;
    outline: none;
  }
  .front-upload input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    /*cursor: pointer;*/
    outline: none;
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
    outline: none;
  }
  .back-upload input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer;
    outline: none;
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
    margin-bottom: 100px;
  }
  #commitFront:disabled{
    opacity: 0.6;
  }
  #commitBack:disabled{
    opacity: 0.6;
  }
  /*#photo1{*/
    /*transform: rotate(90deg);*/
  /*}*/
</style>
