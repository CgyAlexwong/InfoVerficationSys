<!--第四部分 基本信息校验-->

<template>
  <div id="informationVerify">
    <mt-header fixed title="（4 / 5）基本信息校验" @load="">
      <router-link to="/stu/identity" slot="left">
        <mt-button icon="back" @click="warn">返回</mt-button>
      </router-link>
      <mt-button icon="field-error" slot="right" @click="close"></mt-button>
    </mt-header>
    <div id="navbar" style="height: 550px">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1" @click="tab1">选项一</mt-tab-item>
        <mt-tab-item id="2" @click="tab2">选项二</mt-tab-item>
      </mt-navbar>

      <mt-tab-container v-model="selected" slot>
        <mt-tab-container-item id="1">
          <mt-cell title="考生号：" v-model="candidateNum"/>
          <mt-cell title="姓名：" v-model="name"/>
          <mt-cell title="性别：" v-model="sex"/>
          <mt-cell title="民族：" v-model="nation"/>
          <mt-cell title="出生日期：" v-model="birthDate"/>
          <mt-cell title="报考科类：" v-model="type"/>
          <mt-cell title="电子邮件：" v-model="email"/>
          <mt-cell title="联系电话：" v-model="tel"/>
          <mt-cell title="身份证：" v-model="identityNum"/>
          <mt-button v-model="unchangeablePart" @click="change1">确认</mt-button>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <mt-field label="毕业中学：" v-model="graduateSchool"></mt-field>
          <mt-field label="移动电话：" v-model="mobileTel"></mt-field>
          <mt-field label="邮政编码：" v-model="postalCode"></mt-field>
          <mt-field label="通讯地址：" v-model="address"></mt-field>
          <mt-field label="紧急联系人：" v-model="emergencyContact.name"></mt-field>
          <mt-field label="紧急联系人电话：" v-model="emergencyContact.tel"></mt-field>
          <mt-field label="紧急联系人地址：" v-model="emergencyContact.address"></mt-field>
          <mt-field label="外文姓名：" v-model="foreignName"></mt-field>
          <mt-field label="毕业年份：" v-model="graduateYear"></mt-field>
          <mt-button v-model="changeablePart" @click="change2">确认</mt-button>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <mt-button @click="submit">确认</mt-button>
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
import MtField from "mint-ui/packages/field/src/field";

export default {
  name: "informationVerify",
  data(){
    return {
      selected: '1',
      unchangeablePart:0,
      changeablePart:0,

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
      identityNum:'',
      postalCode:'',
      address:'',
      emergencyContact:{
        name:'',
        tel:'',
        address:''
      }
    }
  },
  components: {MtField, MtCell, MtTabContainerItem, MtTabContainer, MtTabItem, MtNavbar, MtButton, MtHeader},
  mounted:function(){
    getInfo(
    ).then(response => {
      this.candidateNum = response.candidateNum;
      this.name = response.name;
      this.foreignName = response.foreignName;
      this.sex = response.sex;
      this.nation = response.nation;
      this.birthDate = response.birthDate;
      this.type = response.type;
      this.graduateYear = response.graduateYear;
      this.graduateSchool = response.graduateSchool;
      this.email = response.email;
      this.tel = response.tel;
      this.mobileTel = response.mobileTel;
      this.identityNum = response.identityNum;
      this.postalCode = response.postalCode;
      this.address = response.address;
      this.emergencyContact.name = response.emergencyContact.name;
      this.emergencyContact.tel = response.emergencyContact.tel;
      this.emergencyContact.address = response.emergencyContact.address
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
      if(this.unchangeablePart && this.changeablePart){

        this.$router.push('/stu/ESignature')
      }
    },
    submit:function(){
      console.log({
        foreignName: this.foreignName,
        graduateYear: this.graduateYear,
        graduateSchool: this.graduateSchool,
        mobileTel: this.mobileTel,
        postalCode: this.postalCode,
        address: this.address,
        UserEmergencyContact: {
          name:this.emergencyContact.name,
          tel:this.emergencyContact.tel,
          address:this.emergencyContact.address
        }
      });
      setUserInfo({
        foreignName: this.foreignName,
        graduateYear: this.graduateYear,
        graduateSchool: this.graduateSchool,
        mobileTel: this.mobileTel,
        postalCode: this.postalCode,
        address: this.address,
        emergencyContact: {
          name:this.emergencyContact.name,
          tel:this.emergencyContact.tel,
          address:this.emergencyContact.address
        }
      }).then(response =>{
        if (response.succeed === true){
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
    change1:function () {
      this.unchangeablePart = 1
      console.log('可修改基本信息已确认:'+this.unchangeablePart)
    },
    change2:function () {
      this.changeablePart = 1
      console.log('不可修改基本信息已确认:'+this.changeablePart)
    }
  }
}
</script>

<style scoped>

</style>
