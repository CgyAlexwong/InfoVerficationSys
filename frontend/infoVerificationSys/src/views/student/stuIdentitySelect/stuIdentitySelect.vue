<!--第一部分 身份选择-->

<template>
  <div id="identity">
    <!--新的header-->
    <mt-header fixed title="（1 / 5）身份选择">
      <router-link to="/stu" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="field-error" slot="right" @click="close"></mt-button>
    </mt-header>

    <!--地区选择 mt-radio -->
    <div class="box">
      <mt-radio
        title="请选择你来自的地区"
        v-model="value"
        :options="['香港', '澳门', '台湾']" >
      </mt-radio>
    </div>

    <!--填写身份证号 mt-field -->
    <div>
      <mt-field label="身份证号" placeholder="请输入你的身份证号" v-model="username" slot="right"></mt-field>
      <mt-button size="small" @click="go">确认</mt-button>
      <router-view></router-view>
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

export default {
  name: 'Identity',
  components: {MtField, Field,MessageBox,MtRadio, MtHeader, MtButton },
  data () {
    return {
    }
  },
  methods:{
    // 测试方法，直接进入下一环节
    go:function(){
      this.$router.push('/stu/faceVerify')
    },

    // 关闭界面
    close: function () {
      window.opener=null;
      window.open('','_self');
      window.close()
    },

    // 发送信息确认，弹框提示
    submit:function () {
      userJuniorLogin({
        identityNum:this.username,
        origin:this.value
        }
      ).then(response =>{
        if(response.data == true){
          this.$router.push('/stu/faceVerify')
        }else{
          MessageBox.confirm('', {
            message: '地区或身份证号错误',
            title: '提示',
            confirmButtonText: '反馈',
            cancelButtonText: '重试'
          }).then(action => {
            if (action == 'confirm') {     //反馈的回调
              this.feedBack()
            }
          }).catch(err => {
            if (err == 'cancel') {     //重试的回调
              console.log("重试");
            }
          })
        }
      })
    },

    // 反馈
    feedBack:function () {
      MessageBox.prompt('', {
        title: '反馈',
        message: '负责老师的地址为:……<br>请尽快与老师联系并留下你的联系方式<br>请输入你的联系方式:'
      }).then(({value, action}) => {

      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
