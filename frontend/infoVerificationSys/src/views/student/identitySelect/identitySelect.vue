<!-- 第一部分 身份选择 -->

<template>
  <div id="identitySelect">
    <!-- 新的header -->
    <div id = 'head'>
      <mt-header fixed title="（1 / 4）身份选择">
        <router-link to="/stu" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
    </div>
    <!-- 地区选择 mt-radio -->
    <div id="box" >
      <mt-radio title="请选择你来自的地区：" v-model="originPlace" :options="options"></mt-radio>
    </div>
    <!-- 填写通行证号 mt-field -->
    <p  id="word">请输入你的通行证号：</p>
    <div id='mtpInput'>
      <mt-field label="通行证号：" placeholder="请输入你的通行证号" v-model="mtpNum" @input="mtpNumCheck"></mt-field>
      <dd v-if="!mtpNumValid"><div v-html="mtpNumMessage"></div></dd>
    </div>
    <div id="checkButton">
      <button size="small" @click="submit">确认</button>
    </div>
  </div>
</template>

<script>/* eslint-disable */
import MtButton from 'mint-ui/packages/button/src/button'
import MtHeader from "mint-ui/packages/header/src/header"
import MtRadio from "mint-ui/packages/radio/src/radio"
import { MessageBox , Indicator} from 'mint-ui';
import { Field } from 'mint-ui';
import MtField from "mint-ui/packages/field/src/field";
import { userJuniorLogin ,getStatus } from "../../../utils/stuAPI";
import Cookies from 'js-cookie';
import MtCell from "mint-ui/packages/cell/src/cell";
import {checkMtpNum} from "../../../utils/checkList";

export default {
  name: 'Identity',
  components: {MtCell, MtField, Field,MessageBox,MtRadio, MtHeader, MtButton },
  data () {
    return {
      originPlace: '',
      mtpNum: '',
      mtpNumValid: false,
      mtpNumMessage: '请输入正确格式的通行证号！例如：<br>' +
        '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp香港：H12345678<br>' +
        '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp澳门：M12345678<br>' +
        '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp台湾：12345678',
      options : [
        {
          label: '台湾',
          value: '1'
        },
        {
          label: '香港',
          value: '2'
        },
        {
          label: '澳门',
          value: '3'
        }
      ]
    }
  },
  mounted:function(){
    Cookies.set('id','');
  },
  methods:{
    mtpNumCheck () {
      let result = checkMtpNum(this.mtpNum);
      this.mtpNumValid = result.res;
      this.mtpNumMessage = result.msg
    },
    // 测试方法，直接进入下一环节
    go:function(){
      Cookies.set('id','171250639');
      // this.$router.push('/stu/faceVerify')
    },
    // 发送信息确认，弹框提示
    submit:function () {
      if (this.mtpNum !== '' && this.mtpNumValid && this.originPlace !== ''){
        console.log({
          mtpNum:this.mtpNum,
          originPlace:parseInt(this.originPlace)
        });
        Indicator.open({text:'匹配中，请稍等……',spinnerType:'fading-circle'});
        userJuniorLogin({
          mtpNum:this.mtpNum,
          originPlace:parseInt(this.originPlace)
          }
        ).then(response =>{
          Indicator.close();
          if(response.succeed === true){
            Cookies.set('id',response.msg);
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
          }
          // else if(response.msg === '无照片信息'){
          //   MessageBox.alert('', {
          //     message: response.msg,
          //     title: '提示',
          //     confirmButtonText: '反馈'
          //   }).then(action => {
          //     if (action === 'confirm') {     //反馈的回调
          //       this.$router.push('/feedback')
          //     }
          //   })
          // }
          else {
            MessageBox.confirm('', {
              message: response.msg,
              title: '哎呀没找到你！',
              confirmButtonText: 'OCR识别',
              cancelButtonText: '重试'
            }).then(action => {
              if (action === 'confirm') {     //反馈的回调
                this.$router.push('/stu/OCRVerify')
              }
            }).catch(err => {
              if (err === 'cancel') {     //重试的回调
                console.log("重试");
              }
            })
          }
        })
      } else if (this.mtpNum === '') {
        this.mtpNumValid = false;
        this.mtpNumMessage = '请输入身份证号！'
      }
    },
  }
}
</script>

<style scoped>
  #word {
    font-size: 12px;
    margin: 9px;
    padding-top: 3px;
    display: block;
    color: #888;
    text-align: left;
  }
  dd{
    font-size: 12px;
    padding-left: 110px;
    margin:0 0 9px;
    display: block;
    color: #f44336;
    text-align: left;
  }
  #box{
    border: 1px dashed #ffffff;
    border-top-width: 5px;
    border-bottom-color: #888888;
  }
  #identityInput{
    border: 1px dashed #ffffff;
    border-bottom-color: #888888;
  }
  #checkButton{
    text-align: right;
  }
  button{
    margin: 8px 3px 3px;
    border: 1px solid #3023ae;
    background: #3023ae;
    color: #fff;
    border-radius: 4px;
    padding: 5px 10px;
  }
</style>
