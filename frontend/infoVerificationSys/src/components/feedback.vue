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
    <mt-field label="名字：" placeholder="请输入你的名字" v-model="stuName" ></mt-field>
  </div>
  <!-- 联系方式输入 -->
  <P>请选择并输入你的联系方式：</P>
  <div id="picker">
    <mt-actionsheet :actions="actions" v-model="sheetVisible" cancel-text=""></mt-actionsheet>
    <button id="choose" @click="openSheet">选择联系方式</button>
    <mt-field :label="pickerValue+'：'" placeholder="请输入你的联系方式" v-model="contact" ></mt-field>
  </div>
  <!-- 备注输入 -->
  <p>请输入你想备注的信息（可选）：</p>
  <div>
    <textarea id="remark" placeholder="请输入备注内容" style="width: 90%;height: 100px" v-model="remark"></textarea>
  </div>
  <div id="commitBox">
    <button id="commit" @click="commit">提交</button>
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
      stuName: '',
      contact: '',
      remark: '',
      sheetVisible: false,
      pickerValue: '移动电话',
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
      {name: '微信',
        method: this.WeChat
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
    },
    QQ () {
      this.pickerValue = 'QQ'
    },
    WeChat () {
      this.pickerValue = '微信'
    },
    commit () {
      console.log(this.remark)
    }
  }
}
</script>

<style scoped>
  #helloPic{
    border-radius: 50%;
  }
  p{
    font-size: 12px;
    margin: 9px;
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
    border: 1px dashed #ffffff;
    border-bottom-color: #888888;
  }
  #choose{
    margin-left: 5px;
    border: 1px solid #26a2ff;
    background: #26a2ff;
    color: #fff;
    border-radius: 4px;
    padding: 5px 10px;
  }
  #remark{
    border: 3px solid #26a2ff;
    font-family: SimHei,fantasy;
    font-size: 15px;
  }
  #commitBox{
    text-align: right;
    margin: 3px;
  }
  #commit{
    border: 1px solid #26a2ff;
    background: #26a2ff;
    color: #fff;
    border-radius: 4px;
    padding: 5px 10px;
  }
</style>
