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
          <p id="word">以下信息不可修改，请仔细确认！<br>如无误请点击确认，如有误请点击底部反馈</p>
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
          <button id = 'check1' v-bind:disabled="unchangeablePart" @click="change1">确认</button>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <p id="word">以下信息可修改但必须填写</p>
          <div id = 'changeablePart'>
            <div id="b">
              <mt-field label="毕业中学：" v-model="graduateSchool" placeholder="请输入你的毕业中学名称" @input="graduateSchoolCheck" :disabled="changeablePart"></mt-field>
              <dd v-if="!graduateSchoolValid">{{graduateSchoolMessage}}</dd>
            </div>
            <div id="b">
              <mt-field label="移动电话：" v-model="mobileNumber" placeholder="请输入你的移动电话" @input="mobileNumberCheck" :disabled="changeablePart"></mt-field>
              <dd v-if="!mobileNumberValid">{{mobileNumberMessage}}</dd>
            </div>
            <div id="b">
              <mt-field label="邮政编码：" v-model="postal" placeholder="请输入你的邮政编码" @input="postalCheck" :disabled="changeablePart"></mt-field>
              <dd v-if="!postalValid">{{postalMessage}}</dd>
            </div>
            <div id="b">
             <mt-field label="通讯地址：" v-model="address" placeholder="请输入你的通讯地址" @input="addressCheck" :disabled="changeablePart"></mt-field>
              <dd v-if="!addressValid">{{addressMessage}}</dd>
            </div>
            <div id="b">
              <mt-field label="紧急联系人：" v-model="emergencyContact.emergencyContactPerson" placeholder="请输入你的紧急联系人"  @input="emergencyContactPersonCheck" :disabled="changeablePart"></mt-field>
              <dd v-if="!emergencyContactPersonValid">{{emergencyContactPersonMessage}}</dd>
            </div>
            <div id="b">
              <mt-field label="紧急联系电话：" v-model="emergencyContact.emergencyContactNumber" placeholder="请输入你的紧急联系电话" @input="emergencyContactNumberCheck" :disabled="changeablePart"></mt-field>
              <dd v-if="!emergencyContactNumberValid">{{emergencyContactNumberMessage}}</dd>
            </div>
            <div id="bSpecial">
              <mt-field label="紧急联系地址：" v-model="emergencyContact.emergencyContactAddress" placeholder="请输入你的紧急联系地址" @input="emergencyContactAddressCheck" :disabled="changeablePart"></mt-field>
              <dd v-if="!emergencyContactAddressValid">{{emergencyContactAddressMessage}}</dd>
            </div>
          </div>
          <p id="word">以下信息可修改且自愿填写</p>
          <div id = 'voluntaryPart' style="height: 147px">
            <div id="b">
              <mt-field label="外文姓名：" v-model="foreignName" placeholder="请输入你的外文姓名" :disabled="changeablePart"></mt-field>
            </div>
            <div id="b">
              <mt-field label="毕业时间：" v-model="graduateDate" placeholder="毕业时间格式为“YYYY-MM-DD”" @input="graduateDateCheck"  :disabled="changeablePart"></mt-field>
              <dd v-if="!graduateDateValid">{{graduateDateMessage}}</dd>
            </div>
            <div id="bSpecial">
             <mt-field label="籍贯：" v-model="nativePlace" placeholder="请输入你的籍贯" :disabled="changeablePart"></mt-field>
            </div>
          </div>
          <div id="voluntaryButton">
            <button id="check2" v-bind:disabled="changeablePart" @click="change2">确认</button>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <div id="confirmButton">
      <button id="feedback" @click="feedback">反馈</button>
      <button id='check' @click="go" :disabled="!unchangeablePart || !changeablePart" >提交</button>
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
import {checkChinese, checkPhoneNumber, checkPostal, checkDate} from "../../../utils/checkList";

export default {
  name: "informationVerify",
  data(){
    return {
      selected: '1',
      unchangeablePart:false,
      changeablePart:false,

      graduateSchoolValid: true,
      graduateSchoolMessage: '',
      mobileNumberValid: true,
      mobileNumberMessage: '',
      postalValid: true,
      postalMessage: '',
      addressValid: true,
      addressMessage: '',
      emergencyContactPersonValid: true,
      emergencyContactPersonMessage: '',
      emergencyContactNumberValid: true,
      emergencyContactNumberMessage: '',
      emergencyContactAddressValid: true,
      emergencyContactAddressMessage: '',
      graduateDateValid: true,
      graduateDateMessage: '',

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
      this.sex = response.sex === 1 ? '男':'女';
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
    graduateSchoolCheck () {
      let result = checkChinese(this.graduateSchool);
      this.graduateSchoolValid = result.res;
      this.graduateSchoolMessage = result.msg
    },
    mobileNumberCheck () {
      let result = checkPhoneNumber(this.mobileNumber);
      this.mobileNumberValid = result.res;
      this.mobileNumberMessage = result.msg
    },
    postalCheck () {
      let result = checkPostal(this.postal);
      this.postalValid = result.res;
      this.postalMessage = result.msg
    },
    addressCheck () {
      this.addressValid = true;
      this.addressMessage = ''
    },
    emergencyContactPersonCheck () {
      let result = checkChinese(this.emergencyContact.emergencyContactPerson);
      this.emergencyContactPersonValid = result.res;
      this.emergencyContactPersonMessage = result.msg
    },
    emergencyContactNumberCheck () {
      let result = checkPhoneNumber(this.emergencyContact.emergencyContactNumber);
      this.emergencyContactNumberValid = result.res;
      this.emergencyContactNumberMessage = result.msg
    },
    emergencyContactAddressCheck () {
      this.emergencyContactAddressValid = true;
      this.emergencyContactAddressMessage = ''
    },
    graduateDateCheck () {
      let result = checkDate(this.graduateDate);
      this.graduateDateValid = result.res;
      this.graduateDateMessage = result.msg
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
          emergencyContactPerson:this.emergencyContact.emergencyContactPerson,
          emergencyContactNumber:this.emergencyContact.emergencyContactNumber,
          emergencyContactAddress:this.emergencyContact.emergencyContactAddress
        });
        setUserInfo({
          foreignName: this.foreignName,
          graduateDate: this.graduateDate,
          graduateSchool: this.graduateSchool,
          mobileNumber: this.mobileNumber,
          postal: this.postal,
          nativePlace:this.nativePlace,
          address: this.address,
          emergencyContactPerson:this.emergencyContact.emergencyContactPerson,
          emergencyContactNumber:this.emergencyContact.emergencyContactNumber,
          emergencyContactAddress:this.emergencyContact.emergencyContactAddress
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
      if (this.graduateSchool!==''&&this.mobileNumber!==''&&this.postal!==''&&this.address!==''
        &&this.emergencyContact.emergencyContactPerson!==''&&this.emergencyContact.emergencyContactNumber!==''&&this.emergencyContact.emergencyContactAddress!==''
        &&this.graduateSchoolValid&&this.mobileNumberValid&&this.postalValid &&this.emergencyContactPersonValid&&this.emergencyContactNumberValid) {
        this.changeablePart = true;
        console.log('可修改基本信息已确认:'+this.changeablePart)
      } else if (this.graduateSchool === '' && this.graduateSchoolValid){
        this.graduateSchoolValid = false;
        this.graduateSchoolMessage = '毕业中学不能为空！'
      } else if (this.mobileNumber === '' && this.mobileNumberValid){
        this.mobileNumberValid = false;
        this.mobileNumberMessage = '移动电话不能为空！'
      } else if (this.postal === '' && this.postalValid){
        this.postalValid = false;
        this.postalMessage = '邮政编码不能为空！'
      } else if (this.address === ''){
        this.addressValid = false;
        this.addressMessage = '通讯地址不能为空！'
      } else if (this.emergencyContact.emergencyContactPerson === '' && this.emergencyContactPersonValid){
        this.emergencyContactPersonValid = false;
        this.emergencyContactPersonMessage = '紧急联系人不能为空！'
      } else if (this.emergencyContact.emergencyContactNumber === '' && this.emergencyContactNumberValid){
        this.emergencyContactNumberValid = false;
        this.emergencyContactNumberMessage = '紧急联系电话不能为空！'
      } else if (this.emergencyContact.emergencyContactAddress === ''){
        this.emergencyContactAddressValid = false;
        this.emergencyContactAddressMessage = '紧急联系地址不能为空！'
      }
    }
  }
}
</script>

<style scoped>
  #head{
    height: 0
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
  #word{
    font-size: 12px;
    margin: 9px;
    padding-top: 2px;
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
  #unchangeablePart{
    border: 3px dotted #7645c1;
  }
  #changeablePart{
    border: 3px dotted #7645c1;
  }
  #voluntaryPart{
    border: 3px dotted #7645c1;
  }
  #check1,#check2,#feedback{
    border: 1px solid #3023ae;
    background: transparent;
    border-radius: 4px;
    margin-top: 8px;
    padding: 5px 10px;
  }
  #confirmButton{
    margin: 0 2px 0;
    text-align:right
  }
  #check{
    border: 1px solid #3023ae;
    background: #3023ae;
    color: #fff;
    border-radius: 4px;
    padding: 5px 10px;
  }
  #check:disabled{
    opacity: 0.6;
  }
</style>
