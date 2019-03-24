<!--第四部分 基本信息校验-->

<template>
  <div id="informationVerify">
    <mt-header fixed title="（4 / 5）基本信息校验" @load="">
      <router-link to="/stu/identity" slot="left">
        <mt-button icon="back" @click="warn">返回</mt-button>
      </router-link>
      <mt-button icon="field-error" slot="right" @click="close"></mt-button>
    </mt-header>
    <div id="navbar" style="height: 500px">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1" @click="tab1">选项一</mt-tab-item>
        <mt-tab-item id="2" @click="tab2">选项二</mt-tab-item>
        <mt-tab-item id="3" @click="tab3">选项三</mt-tab-item>
      </mt-navbar>

      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <mt-cell title="考生号：" v-model="candidateNum"/>
          <mt-cell title="姓名：" v-model="name"/>
          <mt-cell title="性别：" v-model="sex"/>
          <mt-cell title="民族：" v-model="nation"/>
          <mt-cell title="出生日期：" v-model="birthDate"/>
          <mt-cell title="报考科类：" v-model="type"/>
          <mt-cell title="电子邮件：" v-model="email"/>
          <mt-cell title="联系电话：" v-model="tel"/>
          <mt-cell title="身份证：" v-model="indentityNum"/>
          <mt-button v-model="unchangeablePart" @click="change1">确认</mt-button>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <mt-cell title="毕业中学：" v-model="graduateSchool"/>
          <mt-cell title="移动电话：" v-model="mobileTel"/>
          <mt-cell title="邮政编码：" v-model="postalCode"/>
          <mt-cell title="通讯地址：" v-model="address"/>
          <mt-button v-model="changeablePart" @click="change2">确认</mt-button>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <mt-cell title="外文姓名：" v-model="foreignName"/>
          <mt-cell title="毕业年份：" v-model="graduateYear"/>
          <mt-button v-model="voluntaryPart" @click="change3">确认</mt-button>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <mt-button @click="go">确认</mt-button>
  </div>
</template>

<script>/* eslint-disable */
import MtHeader from "mint-ui/packages/header/src/header";
import MtButton from "mint-ui/packages/button/src/button";
import { MessageBox } from 'mint-ui'
import MtNavbar from "mint-ui/packages/navbar/src/navbar";
import MtTabItem from "mint-ui/packages/tab-item/src/tab-item";
import MtTabContainer from "mint-ui/packages/tab-container/src/tab-container";
import MtTabContainerItem from "mint-ui/packages/tab-container-item/src/tab-container-item";
import MtCell from "mint-ui/packages/cell/src/cell";
import { getInfo , setUserInfo} from "../../../utils/stuAPI";


export default {
  name: "informationVerify",
  data(){
    return {
      selected: '1',
      unchangeablePart:0,
      changeablePart:0,
      voluntaryPart:0,
      candidateNum:'',
      name:'',
      foreignName:'',
      sex:'',
      nation:'',
      birthDate:'',
      type:'',
      graduateYear:'',
      graduateSchool:'',
      email:'',
      tel:'',
      mobileTel:'',
      indentityNum:'',
      postalCode:'',
      address:''
    }
  },
  components: {MtCell, MtTabContainerItem, MtTabContainer, MtTabItem, MtNavbar, MtButton, MtHeader},
  mounted:function(){
    getInfo(''
    ).then(response => {
      this.User = response.data.User
    })
  },
  methods:{
    warn:function () {
      MessageBox.alert('',{
        title:"提示",
        message:"你已完成前阶段任务，无法返回"
      })
    },
    go:function () {
      if(this.unchangeablePart && this.changeablePart && this.voluntaryPart){

        this.$router.push('/stu/ESignature')
      }
    },
    submit:function(){
      setUserInfo({
        foreignName: this.foreignName,
        graduateYear: this.graduateYear,
        graduateSchool: this.graduateSchool,
        mobileTel: this.mobileTel,
        postalCode: this.postalCode,
        address: this.address
      }).then(response =>{
        if (response.data == true){
          this.$router.push('/stu/ESignature')
        }
      })
    },
    close:function () {
      window.opener = null;
      window.open('', '_self');
      window.close()
    },
    tab1:function () {
      this.selected = '1'
    },
    tab2:function () {
      this.selected = '2'
    },
    tab3:function () {
      this.selected = '3'
    },
    change1:function () {
      this.unchangeablePart = 1
    },
    change2:function () {
      this.changeablePart = 1
    },
    change3:function () {
      this.voluntaryPart = 1
    }
  }
}
</script>

<style scoped>

</style>
