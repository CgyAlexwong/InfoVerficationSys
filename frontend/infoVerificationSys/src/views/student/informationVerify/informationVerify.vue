<!--第四部分 基本信息校验-->

<template>
  <div id="informationVerify">
    <div id = 'head'>
      <mt-header fixed title="（4 / 5）基本信息校验">
        <router-link to="/stu/identity" slot="left">
          <mt-button icon="back" @click="warn">返回</mt-button>
        </router-link>
      </mt-header>
    </div>
    <div id="navbar">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1" @click="tab1">必须校验信息</mt-tab-item>
        <mt-tab-item id="2" @click="tab2">可修改信息</mt-tab-item>
      </mt-navbar>

      <mt-tab-container id='pageOne' v-model="selected">
        <mt-tab-container-item id="1">
          <p>以下信息不可修改，请仔细确认！<br>如无误请点击确认，如有误请点击底部反馈</p>
          <div id="unchangeablePart">
          <mt-cell id="a" title="考生号：" v-model="examNum"/>
          <mt-cell id="a" title="姓名：" v-model="stuName"/>
          <mt-cell id="a" title="性别：" v-model="sex"/>
          <mt-cell id="a" title="民族：" v-model="nation"/>
          <mt-cell id="a" title="出生日期：" v-model="birthdate"/>
          <mt-cell id="a" title="报考科类：" v-model="subject"/>
          <mt-cell id="a" title="电子邮件：" v-model="email"/>
          <mt-cell id="a" title="联系电话：" v-model="phoneNumber"/>
          <mt-cell id="aSpecial" title="身份证：" v-model="identityNum"/>
          </div>
          <br>
          <button id = 'check1' v-bind:disabled="unchangeablePart" @click="change1">确认</button>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <p>以下信息可修改但必须填写</p>
          <div id = 'changeablePart'>
          <mt-field id='b' label="毕业中学：" v-model="graduateSchool" placeholder="请输入你的毕业中学名称"></mt-field>
          <mt-field id='b' label="移动电话：" v-model="mobileNumber" placeholder="请输入你的移动电话"></mt-field>
          <mt-field id='b' label="邮政编码：" v-model="postal" placeholder="请输入你的邮政编码"></mt-field>
          <mt-field id='b' label="通讯地址：" v-model="address" placeholder="请输入你的通讯地址"></mt-field>
          <mt-field id='b' label="紧急联系人：" v-model="emergencyContact.emergencyContactPerson" placeholder="请输入你的紧急联系人"></mt-field>
          <mt-field id='b' label="紧急联系电话：" v-model="emergencyContact.emergencyContactNumber" placeholder="请输入你的紧急联系电话"></mt-field>
          <mt-field id='bSpecial' label="紧急联系地址：" v-model="emergencyContact.emergencyContactAddress" placeholder="请输入你的紧急联系地址"></mt-field>
          </div>
          <p>以下信息可修改且自愿填写</p>
          <div id = 'voluntaryPart' style="height: 147px">
          <mt-field id='b' label="外文姓名：" v-model="foreignName" placeholder="请输入你的外文姓名"></mt-field>
          <mt-field id='b' label="毕业时间：" v-model="graduateDate" placeholder="毕业时间格式为“YYYY-MM-DD”"></mt-field>
          <mt-field id='bSpecial' label="籍贯：" v-model="nativePlace" placeholder="请输入你的籍贯"></mt-field>
          </div>
          <br>
          <div id="voluntaryButton">
            <button id="check2" v-bind:disabled="changeablePart" @click="change2">确认</button>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <div id="confirmButton">
      <button id="feedback" @click="feedback">反馈</button>
      <button id='check' @click="go">提交</button>
    </div>
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
import student from '../identitySelect/identitySelect'

export default {
  name: "informationVerify",
  data(){
    return {
      selected: '1',
      unchangeablePart:false,
      changeablePart:false,

      examNum:'171250606',
      stuName:'魏进',
      foreignName:'cat',
      sex:'男',
      nation:'汉',
      birthdate:'1999-08-12',
      subject:'理科',
      graduateDate:'2017-07-01',
      graduateSchool:'莲塘一中',
      email:'1455236662@qq.com',
      phoneNumber:'18907087985',
      mobileNumber:'18852002519',
      identityNum:'360121199908120038',
      postal:'330200',
      nativePlace:'',
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
      if (response.subject === 0){
        this.subject = '文科'
      }else if (response.subject === 1) {
        this.subject = '理科'
      }else{
        this.subject = ''
      }
      this.graduateDate = response.graduateDate;
      this.graduateSchool = response.graduateSchool;
      this.email = response.email;
      this.phoneNumber = response.phoneNumber;
      this.mobileNumber = response.mobileNumber;
      this.identityNum = response.identityNum;
      this.postal = response.postal;
      this.nativePlace = response.nativePlace;
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
      this.$router.push('/stu/ESignature')
    },
    feedback(){
      this.$router.push('/feedback')
    },
    submit:function(){
      if (this.unchangeablePart && this.changeablePart){
        console.log({
          foreignName: this.foreignName,
          graduateDate: this.graduateDate,
          graduateSchool: this.graduateSchool,
          mobileNumber: this.mobileNumber,
          postal: this.postal,
          nativePlace:this.nativePlace,
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
          nativePlace:this.nativePlace,
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
      }
      else{
        if(!this.unchangeablePart && !this.changeablePart){
          console.log('还未确认信息')
        }
        else if(!this.unchangeablePart){
          console.log('还未确认必须校验信息')
        }
        else{
          console.log('还未确认可修改信息')
        }
      }
    },
    tab1:function () {
      this.selected = '1'
    },
    tab2:function () {
      this.selected = '2'
    },
    change1:function () {
      this.unchangeablePart = true;
      console.log('不可修改基本信息已确认:'+this.unchangeablePart)
    },
    change2:function () {
      this.changeablePart = true;
      console.log('可修改基本信息已确认:'+this.changeablePart)
    }
  }
}
</script>

<style scoped>
  #head{
    height: 0
  }
  #navbar {
    height: 590px;
  }
  #a{
    text-align: left;
    min-height: 41px;
    border: 1px dashed #ffffff;
    border-bottom-color: #888888;
  }
  #a:first-child{
  }
  #a:last-child{
    text-align: left;
  }
  #aSpecial{
    text-align: left;
    min-height: 41px;
  }
  #b{
    min-height: 41px;
    border: 1px dashed #ffffff;
    border-bottom-color: #888888;
  }
  #bSpecial{
    min-height: 41px;
  }
  p{
    font-size: 12px;
    margin: 8px;
    display: block;
    color: #888;
    text-align: left;
  }
  br{
    max-height: 3px;
  }
  #unchangeablePart{
    border: 3px dotted #26a2ff;
  }
  #changeablePart{
    border: 3px dotted #26a2ff;
  }
  #voluntaryPart{
    border: 3px dotted #26a2ff;
    max-height: 126px;
  }
  #check1,#check2,#feedback{
    border: 1px solid #26a2ff;
    background: transparent;
    border-radius: 4px;
    padding: 5px 10px;
  }
  #confirmButton{
    text-align:right
  }
  #check{
    border: 1px solid #26a2ff;
    background: #26a2ff;
    color: #fff;
    border-radius: 4px;
    padding: 5px 10px;
  }
</style>
