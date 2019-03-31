<!-- 第一部分 身份选择 -->

<template>
  <div id="identity">
    <!-- 新的header -->
    <mt-header fixed title="（1 / 5）身份选择">
      <router-link to="/stu" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>

    <!-- 地区选择 mt-radio -->
    <div id="box" >
      <mt-radio
        title="请选择你来自的地区："
        v-model="originPlace"
        :options="options">
      </mt-radio>
    </div>
    <!-- 填写身份证号 mt-field -->
    <p>请输入你的身份证号：</p>
    <div id='identityInput'>
      <mt-field label="身份证号：" placeholder="请输入你的身份证号" v-model="identityNum" ></mt-field>
    </div>
    <div id="checkButton">
      <button size="small" @click="go">确认</button>
    </div>
  </div>
</template>

<script>/* eslint-disable */
import MtButton from 'mint-ui/packages/button/src/button'
import MtHeader from "mint-ui/packages/header/src/header"
import MtRadio from "mint-ui/packages/radio/src/radio"
import { MessageBox } from 'mint-ui';
import { Field } from 'mint-ui';
import MtField from "mint-ui/packages/field/src/field";
import { userJuniorLogin } from "../../../utils/stuAPI";
import Cookies from 'js-cookie';
import MtCell from "mint-ui/packages/cell/src/cell";

export default {
  name: 'Identity',
  components: {MtCell, MtField, Field,MessageBox,MtRadio, MtHeader, MtButton },
  data () {
    return {
      originPlace:'',
      identityNum:'',
      options : [
        {
          label: '香港',
          value: '2'
        },
        {
          label: '澳门',
          value: '3'
        },
        {
          label: '台湾',
          value: '1'
        }
      ]
    }
  },
  methods:{
    // 测试方法，直接进入下一环节
    go:function(){
      Cookies.set('id','171250639')
      this.$router.push('/stu/faceVerify')
    },
    // 发送信息确认，弹框提示
    submit:function () {
      console.log({
        identityNum:this.identityNum,
        originPlace:this.originPlace
      });
      userJuniorLogin({
        identityNum:this.identityNum,
        region:parseInt(this.originPlace)
        }
      ).then(response =>{
        if(response.succeed === true){
          console.log(response.msg);
          Cookies.set('id',this.identityNum);
          this.$router.push('/stu/faceVerify')
        } else if(response.msg === '无照片信息'){
          MessageBox.alert('', {
            message: response.msg,
            title: '提示',
            confirmButtonText: '反馈'
          }).then(action => {
            if (action === 'confirm') {     //反馈的回调
              this.$router.push('/feedback')
            }
          }).catch(err => {
            if (err === 'cancel') {     //重试的回调
              console.log("重试");
            }
          })
        } else {
          MessageBox.confirm('', {
            message: response.msg,
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

  }
}
</script>

<style scoped>
  p{
    font-size: 12px;
    margin: 9px;
    padding-top: 3px;
    display: block;
    color: #888;
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
    border: 1px solid #26a2ff;
    background: #26a2ff;
    color: #fff;
    border-radius: 4px;
    padding: 5px 10px;
  }
</style>
