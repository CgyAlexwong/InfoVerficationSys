<template>
<div id="hello">
  <mt-header fixed title="信息反馈">
    <router-link to="/stu" slot="left">
      <mt-button icon="back">首页</mt-button>
    </router-link>
  </mt-header>
  <img id='helloPic' src="../assets/da8e974dc.jpg" alt="welcome" height="100" width="100"/>
  <!-- 名字输入 -->
  <P>请输入你的名字：</P>
  <div id='nameInput'>
    <mt-field label="姓名：" placeholder="请输入你的姓名" v-model="stuName" @input="nameCheck"></mt-field>
    <dd v-if="!nameValid">{{nameMessage}}</dd>
  </div>
  <!-- 联系方式输入 -->
  <P>请选择并输入你的联系方式：</P>
  <div id="picker">
    <mt-actionsheet :actions="actions" v-model="sheetVisible" cancel-text=""></mt-actionsheet>
    <button id="choose" @click="openSheet">选择联系方式</button>
    <mt-field :label="pickerValue" placeholder="请输入你的联系方式" v-model="contact" @input="contactCheck"></mt-field>
    <dd v-if="!contactValid">{{contactMessage}}</dd>
  </div>
  <!-- 备注输入 -->
  <p>请输入你想反馈的信息（可选，不超过50字）：</p>
  <div>
    <textarea id="remark" placeholder="请输入备注内容" style="width: 90%;height: 100px" v-model="remark" @input="remarkCheck"></textarea>
    <dd v-if="!remarkValid">{{remarkMessage}}</dd>
  </div>
  <div id="commitBox">
    <button id="commit" @click="submit">提交</button>
  </div>
</div>
</template>

<script>
import MtButton from 'mint-ui/packages/button/src/button'
import MtHeader from 'mint-ui/packages/header/src/header'
import MtField from 'mint-ui/packages/field/src/field'
import { MessageBox ,Indicator} from 'mint-ui'
import {feedBack} from '../utils/stuAPI'
import {checkChinese, checkPhoneNumber, checkEMail, checkQQ, checkWeChat} from '../utils/checkList'

export default {
  name: 'end',
  components: {MtField, MtButton, MtHeader},
  data () {
    return {
      stuName: '',
      nameValid: true,
      nameMessage: '',
      contact: '',
      contactValid: true,
      contactMessage: '',
      remark: '',
      remarkValid: true,
      remarkMessage: '',
      sheetVisible: false,
      pickerValue: '移动电话：',
      actions: [{
        name: '移动电话',
        method: this.mobile
      },
      {
        name: 'e-mail',
        method: this.email
      },
      {
        name: 'QQ',
        method: this.QQ
      },
      {name: '微信号',
        method: this.WeChat
      }]
    }
  },
  methods: {
    openSheet () {
      this.sheetVisible = this.sheetVisible !== true
    },
    mobile () {
      this.pickerValue = '移动电话：';
      this.contact = ''
    },
    email () {
      this.pickerValue = 'e-mail：';
      this.contact = ''
    },
    QQ () {
      this.pickerValue = 'QQ：';
      this.contact = ''
    },
    WeChat () {
      this.pickerValue = '微信号：';
      this.contact = ''
    },
    nameCheck () {
      let result = checkChinese(this.stuName);
      this.nameValid = result.res;
      this.nameMessage = result.msg
    },
    contactCheck () {
      if (this.pickerValue === '移动电话：') {
        let result = checkPhoneNumber(this.contact);
        this.contactValid = result.res;
        this.contactMessage = result.msg
      } else if (this.pickerValue === 'e-mail：') {
        let result = checkEMail(this.contact);
        this.contactValid = result.res;
        this.contactMessage = result.msg
      } else if (this.pickerValue === 'QQ：') {
        let result = checkQQ(this.contact);
        this.contactValid = result.res;
        this.contactMessage = result.msg
      } else if (this.pickerValue === '微信号：') {
        let result = checkWeChat(this.contact);
        this.contactValid = result.res;
        this.contactMessage = result.msg
      }
    },
    remarkCheck () {
      if (this.remark.length > 50) {
        this.remarkValid = false;
        this.remarkMessage = '字数超过50字！'
      } else {
        this.remarkValid = true;
        this.remarkMessage = ''
      }
    },
    go () {
      this.$router.push('/')
    },
    submit () {
      if (this.stuName !== '' && this.contact !== '' && this.nameValid && this.contactValid) {
        Indicator.open({text:'反馈提交中，请稍等……',spinnerType:'fading-circle'});
        feedBack({
          stuName: this.stuName,
          contact: this.pickerValue + this.contact,
          remark: this.remark
        }).then(res => {
          Indicator.close();
          if (res.succeed === true) {
            MessageBox.alert('', {
              message: '反馈已提交，请耐心等待老师与你联系！',
              title: '反馈成功',
              confirmButtonText: '确认'
            }).then(action => {
              if (action === 'confirm') {
                this.$router.push('/stu')
              }
            }).catch(err => {
              if (err === 'cancel') {
                console.log("重试");
              }
            })
          }
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      } else if (this.stuName === '') {
        this.nameValid = false;
        this.nameMessage = '姓名不能为空！'
      } else if (this.contact === '') {
        this.contactValid = false;
        this.contactMessage = '联系方式不能为空！'
      }
    }
  }
}
</script>

<style scoped>
  #helloPic{
    border-radius: 50%;
    padding: 10px 10px 0;
  }
  p{
    font-size: 12px;
    margin: 9px;
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
  #nameInput{
    border: 1px dashed #ffffff;
    border-bottom-color: #888888;
  }
  #picker{
    text-align: left;
    border: 1px dashed #ffffff;
    border-bottom-color: #888888;
  }
  #choose{
    margin-left: 8px;
    border: 1px solid #3023ae;
    background: #3023ae;
    color: #fff;
    border-radius: 4px;
    padding: 5px 10px;
    font-size: 8px;
  }
  #remark{
    outline: none;
    border: 3px dashed #888888;
    font-family: SimHei,fantasy;
    font-size: 14px;
  }
  #remark::placeholder {
    opacity: 0.6;
  }
  #commitBox{
    text-align: right;
    margin: 3px;
  }
  #commit{
    border: 1px solid #3023ae;
    background: #3023ae;
    color: #fff;
    border-radius: 4px;
    padding: 5px 10px;
  }
</style>
