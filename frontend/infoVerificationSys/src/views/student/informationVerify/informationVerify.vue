<!--第四部分 基本信息校验-->

<template>
  <div id="informationVerify">
    <mt-header fixed title="（4 / 5）基本信息校验">
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

      <mt-tab-container id='pageOne' v-model="selected">
        <mt-tab-container-item id="1">
          <mt-cell title="考生号:" v-model="examNum"/>
          <mt-cell title="姓名:" v-model="stuName"/>
          <mt-cell title="性别:" v-model="sex"/>
          <mt-cell title="民族:" v-model="nation"/>
          <mt-cell title="出生日期:" v-model="birthdate"/>
          <mt-cell title="报考科类:" v-model="subject"/>
          <mt-cell title="电子邮件:" v-model="email"/>
          <mt-cell title="联系电话:" v-model="phoneNumber"/>
          <mt-cell title="身份证:" v-model="identityNum"/>
          <mt-button v-model="unchangeablePart" @click="change1">确认</mt-button>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <mt-field label="毕业中学:" v-model="graduateSchool"></mt-field>
          <mt-field label="移动电话:" v-model="mobileNumber"></mt-field>
          <mt-field label="邮政编码:" v-model="postal"></mt-field>
          <mt-field label="通讯地址:" v-model="address"></mt-field>
          <mt-field label="紧急联系人:" v-model="emergencyContact.emergencyContactPerson"></mt-field>
          <mt-field label="紧急联系电话:" v-model="emergencyContact.emergencyContactNumber"></mt-field>
          <mt-field label="紧急联系地址:" v-model="emergencyContact.emergencyContactAddress"></mt-field>
          <mt-field label="外文姓名:" v-model="foreignName"></mt-field>
          <mt-field label="毕业年份:" v-model="graduateDate"></mt-field>
          <mt-button v-model="changeablePart" @click="change2">确认</mt-button>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <mt-button @click="go">确认</mt-button>
  </div>
</template>

<script>/* eslint-disable */
import MtHeader from "mint-ui/packages/header/src/header"
import MtButton from "mint-ui/packages/button/src/button"
import { MessageBox } from 'mint-ui'
import MtNavbar from "mint-ui/packages/navbar/src/navbar"
import MtTabItem from "mint-ui/packages/tab-item/src/tab-item"
import MtTabContainer from "mint-ui/packages/tab-container/src/tab-container"
import MtTabContainerItem from "mint-ui/packages/tab-container-item/src/tab-container-item"
import MtCell from "mint-ui/packages/cell/src/cell";
import { getInfo , setUserInfo} from "../../../utils/stuAPI";
import MtField from "mint-ui/packages/field/src/field"
import student from '../stuIdentitySelect/stuIdentitySelect'

export default {
  name: "informationVerify",
  data(){
    return {
      selected: '1',
      unchangeablePart:0,
      changeablePart:0,

      examNum:'171250606',
      stuName:'魏进',
      foreignName:'cat',
      sex:'男',
      nation:'汉',
      birthdate:'1999-08-12',
      subject:'理科',
      graduateDate:'2017',
      graduateSchool:'莲塘一中',
      email:'1455236662@qq.com',
      phoneNumber:'18907087985',
      mobileNumber:'18852002519',
      identityNum:'360121199908120038',
      postal:'330200',
      address:'江西省南昌市南昌县莲塘玺园6栋一单元104室',
      emergencyContact:{
        emergencyContactPerson:'魏良华',
        emergencyContactNumber:'13330065719',
        emergencyContactAddress:'江西省南昌市南昌县莲塘玺园6栋一单元104室'
      }
    }
  },
  components: {MtField, MtCell, MtTabContainerItem, MtTabContainer, MtTabItem, MtNavbar, MtButton, MtHeader},
  mounted:function(){
    getInfo(
    ).then(response => {
      this.examNum = response.examNum;
      this.stuName = response.stuName;
      this.foreignName = response.foreignName;
      this.sex = response.sex===1 ? '男':'女';
      this.nation = response.nation;
      this.birthdate = response.birthdate;
      this.subject = response.subject;
      this.graduateDate = response.graduateDate;
      this.graduateSchool = response.graduateSchool;
      this.email = response.email;
      this.phoneNumber = response.phoneNumber;
      this.mobileNumber = response.mobileNumber;
      this.identityNum = response.identityNum;
      this.postal = response.postal;
      this.address = response.address;
      this.emergencyContact.emergencyContactPerson = response.emergencyContact.emergencyContactPerson;
      this.emergencyContact.emergencyContactNumber = response.emergencyContact.emergencyContactNumber;
      this.emergencyContact.emergencyContactAddress = response.emergencyContact.emergencyContactAddress
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
        graduateDate: this.graduateDate,
        graduateSchool: this.graduateSchool,
        mobileNumber: this.mobileNumber,
        postal: this.postal,
        address: this.address,
        UserEmergencyContact: {
          emergencyContactPerson:this.emergencyContact.emergencyContactPerson,
          emergencyContactNumber:this.emergencyContact.emergencyContactNumber,
          emergencyContactAddress:this.emergencyContact.emergencyContactAddress
        }
      });
      setUserInfo({
        foreignName: this.foreignName,
        graduateDate: this.graduateDate,
        graduateSchool: this.graduateSchool,
        mobileNumber: this.mobileNumber,
        postal: this.postal,
        address: this.address,
        UserEmergencyContact: {
          emergencyContactPerson:this.emergencyContact.emergencyContactPerson,
          emergencyContactNumber:this.emergencyContact.emergencyContactNumber,
          emergencyContactAddress:this.emergencyContact.emergencyContactAddress
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
      console.log('不可修改基本信息已确认:'+student.identityNum)
    },
    change2:function () {
      this.changeablePart = 1
      console.log('可修改基本信息已确认:'+this.changeablePart)
    }
  }
}
</script>

<style scoped>
  #pageOne{
    text-align: left;
  }
</style>
