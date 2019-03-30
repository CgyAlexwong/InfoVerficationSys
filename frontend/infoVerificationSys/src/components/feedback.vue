<template>
<div id="hello">
  <mt-header fixed title="信息反馈">
    <router-link to="/stu" slot="left">
      <mt-button icon="back">首页</mt-button>
    </router-link>
  </mt-header>
  <img src="../assets/form_logo.png" alt="welcome" height="100" width="100"/>
  <h1>反馈！</h1>
  <P>请输入你的名字：</P>
  <div id='nameInput'>
    <mt-field label="身份证号：" placeholder="请输入你的身份证号" v-model="identityNum" ></mt-field>
  </div>
  <P>请选择并输入你的联系方式：</P>
  <div id="picker">
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
    <mt-button @click="openSheet">{{pickerValue}}</mt-button>
  </div>
</div>
</template>

<script>
import MtButton from 'mint-ui/packages/button/src/button'
import MtHeader from 'mint-ui/packages/header/src/header'
import MtField from 'mint-ui/packages/field/src/field'
export default {
  name: 'end',
  components: {MtField, MtButton, MtHeader},
  data () {
    return {
      sheetVisible: false,
      pickerValue: '联系方式',
      actions: [{
        name: '移动电话',
        method: this.mobile
      },
      {
        name: 'e-mail',
        method: this.email
      }]
    }
  },
  methods: {
    openSheet () {
      this.sheetVisible = this.sheetVisible !== true
    },
    mobile () {
      this.pickerValue = '移动电话'
    },
    email () {
      this.pickerValue = 'email'
    }
  }
}
</script>

<style scoped>
  p{
    font-size: 12px;
    margin: 8px;
    display: block;
    color: #888;
    text-align: left;
  }
  #nameInput{
    border: 1px dashed #ffffff;
    border-bottom-color: #888888;
  }
  #picker{
    text-align: left;
  }
</style>
