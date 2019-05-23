<!--第四部分 基本信息校验-->

<template>
  <div id="informationVerify">
    <div id = 'head'>
      <mt-header fixed title="（3 / 4）其他信息校验">
        <router-link to="/stu/basicInfoVerify" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
    </div>
    <div id="navbar">
      <!--<mt-navbar v-model="selected">-->
        <!--<mt-tab-item id="1" @click="tab1">必需校验信息</mt-tab-item>-->
        <!--<mt-tab-item id="2" @click="tab2">可修改信息</mt-tab-item>-->
      <!--</mt-navbar>-->
      <p id="word">以下信息若为空则必须填写</p>
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
          <mt-field label="通行证号：" v-model="mtpNumber" placeholder="请输入你的通行证号" @input="mtpNumberCheck" :disabled="changeablePart"></mt-field>
          <dd v-if="!mtpNumberValid"><div v-html="mtpNumberMessage"></div></dd>
        </div>
        <div id="b">
          <mt-field label="邮政编码：" v-model="postal" placeholder="请输入所在地区的邮政编码" @input="postalCheck" :disabled="changeablePart"></mt-field>
          <dd v-if="!postalValid">{{postalMessage}}</dd>
        </div>
        <div id="b">
          <mt-field label="通讯地址：" v-model="address" placeholder="用于录取通知书递送" @input="addressCheck" :disabled="changeablePart"></mt-field>
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

      <p id="word">以下信息自愿填写</p>
      <div id = 'voluntaryPart' style="height: 147px">
        <div id="b">
          <mt-field label="外文姓名：" v-model="foreignName" placeholder="请输入你的外文姓名" :disabled="changeablePart" @input="foreignNameCheck"></mt-field>
        </div>
        <div id="b">
          <mt-field label="毕业年份：" v-model="graduateDate" placeholder="请输入毕业年份，如：2019" :disabled="changeablePart" @input="graduateDateCheck"></mt-field>
        </div>
        <div id="bSpecial">
          <mt-field label="籍贯：" v-model="nativePlace" placeholder="请输入你的籍贯" :disabled="changeablePart" @input="nativePlaceCheck"></mt-field>
        </div>
      </div>
    </div>
    <div id="confirmButton">
      <!--<button id="feedback" @click="feedback">反馈</button>-->
      <button id='check' @click="submit">提交</button>
    </div>
  </div>
</template>

<script>/* eslint-disable */
import MtHeader from "mint-ui/packages/header/src/header"
import MtButton from "mint-ui/packages/button/src/button"
import { MessageBox ,Indicator} from 'mint-ui'
import MtNavbar from "mint-ui/packages/navbar/src/navbar"
import MtTabItem from "mint-ui/packages/tab-item/src/tab-item"
import MtTabContainer from "mint-ui/packages/tab-container/src/tab-container"
import MtTabContainerItem from "mint-ui/packages/tab-container-item/src/tab-container-item"
import MtCell from "mint-ui/packages/cell/src/cell";
import {getInfo, getStatus, setOtherInfo} from "../../../utils/stuAPI";
import MtField from "mint-ui/packages/field/src/field"
import {checkChinese,checkMtpNum} from "../../../utils/checkList";

export default {
  name: "informationVerify",
  data(){
    return {
      // selected: '1',
      // unchangeablePart:false,
      changeablePart:false,

      graduateSchoolValid: true,
      graduateSchoolMessage: '',
      mobileNumberValid: true,
      mobileNumberMessage: '',
      mtpNumberValid: true,
      mtpNumberMessage: '',
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

      foreignName:'',
      graduateDate:'',
      graduateSchool:'',
      mobileNumber:'',
      mtpNumber: '',
      postal:'',
      nativePlace:'',
      address:'',
      emergencyContact:{
        emergencyContactPerson:'',
        emergencyContactNumber:'',
        emergencyContactAddress:''
      }
    }
  },
  components: {MtField, MtCell, MtTabContainerItem, MtTabContainer, MtTabItem, MtNavbar, MtButton, MtHeader},
  mounted:function(){
    getInfo(
    ).then(response => {
      this.foreignName = response.foreignName;
      this.graduateDate = response.graduateDate;
      this.graduateSchool = response.graduateSchool;
      this.mobileNumber = response.mobileNumber;
      this.mtpNumber = response.mtpNumber;
      this.postal = response.postal;
      this.nativePlace = response.nativePlace;
      this.address = response.address;
      this.emergencyContact.emergencyContactPerson = response.emergencyContact.emergencyContactPerson;
      this.emergencyContact.emergencyContactNumber = response.emergencyContact.emergencyContactNumber;
      this.emergencyContact.emergencyContactAddress = response.emergencyContact.emergencyContactAddress
    });

    if(sessionStorage.getItem('foreignName') !== null && sessionStorage.getItem('foreignName')!==''){
      this.foreignName = sessionStorage.getItem('foreignName');
    }
    if(sessionStorage.getItem('graduateDate') !== null && sessionStorage.getItem('graduateDate')!==''){
      this.graduateDate = sessionStorage.getItem('graduateDate');
    }
    if(sessionStorage.getItem('graduateSchool') !== null && sessionStorage.getItem('graduateSchool')!==''){
      this.graduateSchool = sessionStorage.getItem('graduateSchool');
    }
    if(sessionStorage.getItem('mobileNumber') !== null && sessionStorage.getItem('mobileNumber')!==''){
      this.mobileNumber = sessionStorage.getItem('mobileNumber');
    }
    if(sessionStorage.getItem('mtpNumber') !== null && sessionStorage.getItem('mtpNumber')!==''){
      this.mtpNumber = sessionStorage.getItem('mtpNumber');
    }
    if(sessionStorage.getItem('postal') !== null && sessionStorage.getItem('postal')!==''){
      this.postal = sessionStorage.getItem('postal');
    }
    if(sessionStorage.getItem('nativePlace') !== null && sessionStorage.getItem('nativePlace')!==''){
      this.nativePlace = sessionStorage.getItem('nativePlace');
    }
    if(sessionStorage.getItem('address') !== null && sessionStorage.getItem('address')!==''){
      this.address = sessionStorage.getItem('address');
    }
    if(sessionStorage.getItem('emergencyContactPerson') !== null && sessionStorage.getItem('emergencyContactPerson')!==''){
      this.emergencyContact.emergencyContactPerson = sessionStorage.getItem('emergencyContactPerson');
    }
    if(sessionStorage.getItem('emergencyContactNumber') !== null && sessionStorage.getItem('emergencyContactNumber')!==''){
      this.emergencyContact.emergencyContactNumber = sessionStorage.getItem('emergencyContactNumber');
    }
    if(sessionStorage.getItem('emergencyContactAddress') !== null && sessionStorage.getItem('emergencyContactAddress')!==''){
      this.emergencyContact.emergencyContactAddress = sessionStorage.getItem('emergencyContactAddress');
    }
  },
  methods:{
    // warn:function () {
    //   MessageBox.alert('',{
    //     title:"提示",
    //     message:"你已完成前阶段任务，无法返回"
    //   })
    // },
    graduateSchoolCheck () {
      sessionStorage.setItem('graduateSchool',this.graduateSchool);
      let result = checkChinese(this.graduateSchool);
      this.graduateSchoolValid = result.res;
      this.graduateSchoolMessage = result.msg
    },
    mobileNumberCheck () {
      sessionStorage.setItem('mobileNumber',this.mobileNumber);
      this.mobileNumberValid = true;
      this.mobileNumberMessage = ''
    },
    mtpNumberCheck(){
      sessionStorage.setItem('mtpNumber',this.mtpNumber);
      let result = checkMtpNum(this.mtpNumber);
      this.mtpNumberValid = result.res;
      this.mtpNumberMessage = result.msg
    },
    postalCheck () {
      sessionStorage.setItem('postal',this.postal);
      this.postalValid = true;
      this.postalMessage = ''
    },
    addressCheck () {
      sessionStorage.setItem('address',this.address);
      this.addressValid = true;
      this.addressMessage = ''
    },
    emergencyContactPersonCheck () {
      sessionStorage.setItem('emergencyContactPerson',this.emergencyContact.emergencyContactPerson);
      let result = checkChinese(this.emergencyContact.emergencyContactPerson);
      this.emergencyContactPersonValid = result.res;
      this.emergencyContactPersonMessage = result.msg
    },
    emergencyContactNumberCheck () {
      sessionStorage.setItem('emergencyContactNumber',this.emergencyContact.emergencyContactNumber);
      this.emergencyContactNumberValid = true;
      this.emergencyContactNumberMessage = ''
    },
    emergencyContactAddressCheck () {
      sessionStorage.setItem('emergencyContactAddress',this.emergencyContact.emergencyContactAddress);
      this.emergencyContactAddressValid = true;
      this.emergencyContactAddressMessage = ''
    },
    foreignNameCheck(){
      sessionStorage.setItem('foreignName',this.foreignName)
    },
    graduateDateCheck(){
      sessionStorage.setItem('graduateDate',this.graduateDate)
    },
    nativePlaceCheck(){
      sessionStorage.setItem('nativePlace',this.nativePlace)
    },
    /*
    graduateDateCheck () {
      let result = checkDate(this.graduateDate);
      this.graduateDateValid = result.res;
      this.graduateDateMessage = result.msg
    },
    */
    go:function () {
      this.$router.push('/stu/ESignature')
    },
    feedback(){
      this.$router.push('/feedback')
    },
    submit:function(){
      if (this.graduateSchool!==''&&this.mobileNumber!==''&&this.mtpNumber!==''&&this.postal!==''&&this.address!==''
        &&this.emergencyContact.emergencyContactPerson!==''&&this.emergencyContact.emergencyContactNumber!==''&&this.emergencyContact.emergencyContactAddress!==''
        &&this.graduateSchoolValid&&this.emergencyContactPersonValid){
        console.log({
          foreignName: this.foreignName,
          graduateDate: this.graduateDate,
          graduateSchool: this.graduateSchool,
          mobileNumber: this.mobileNumber,
          mtpNumber: this.mtpNumber,
          postal: this.postal,
          nativePlace:this.nativePlace,
          address: this.address,
          emergencyContactPerson:this.emergencyContact.emergencyContactPerson,
          emergencyContactNumber:this.emergencyContact.emergencyContactNumber,
          emergencyContactAddress:this.emergencyContact.emergencyContactAddress
        });
        Indicator.open({text:'基本信息提交中，请稍等……',spinnerType:'fading-circle'});
        setOtherInfo({
          foreignName: this.foreignName,
          graduateDate: this.graduateDate,
          graduateSchool: this.graduateSchool,
          mobileNumber: this.mobileNumber,
          mtpNumber: this.mtpNumber,
          postal: this.postal,
          nativePlace:this.nativePlace,
          address: this.address,
          emergencyContactPerson:this.emergencyContact.emergencyContactPerson,
          emergencyContactNumber:this.emergencyContact.emergencyContactNumber,
          emergencyContactAddress:this.emergencyContact.emergencyContactAddress
        }).then(response =>{
          Indicator.close();
          if (response.succeed === true){
            sessionStorage.clear();
            getStatus().then( response =>{
              if (response.basicInfoCheck === 0){
                this.$router.push('/stu/basicInfoVerify')
              } else if (response.basicInfoCheck === 1 && response.otherInfoCheck === 0){
                this.$router.push('/stu/otherInfoVerify')
              } else if (response.basicInfoCheck === 1 && response.otherInfoCheck === 1){
                this.$router.push('/end')
              } else {
                this.$router.push('/stu/OCRVerify')
              }
            })
          }
        })
      }else if (this.graduateSchool === ''){
        this.graduateSchoolValid = false;
        this.graduateSchoolMessage = '毕业中学不能为空！'
      } else if (this.mobileNumber === ''){
        this.mobileNumberValid = false;
        this.mobileNumberMessage = '移动电话不能为空！'
      } else if(this.mtpNumber === ''){
        this.mtpNumberValid = false;
        this.mtpNumberMessage = '通行证号不能为空！'
      }else if (this.postal === ''){
        this.postalValid = false;
        this.postalMessage = '邮政编码不能为空！'
      } else if (this.address === ''){
        this.addressValid = false;
        this.addressMessage = '通讯地址不能为空！'
      } else if (this.emergencyContact.emergencyContactPerson === ''){
        this.emergencyContactPersonValid = false;
        this.emergencyContactPersonMessage = '紧急联系人不能为空！'
      } else if (this.emergencyContact.emergencyContactNumber === ''){
        this.emergencyContactNumberValid = false;
        this.emergencyContactNumberMessage = '紧急联系电话不能为空！'
      } else if (this.emergencyContact.emergencyContactAddress === ''){
        this.emergencyContactAddressValid = false;
        this.emergencyContactAddressMessage = '紧急联系地址不能为空！'
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
      this.selected = '2';
      console.log('不可修改基本信息已确认:'+this.unchangeablePart)
    },
    change2:function () {
      if (this.graduateSchool!==''&&this.mobileNumber!==''&&this.mtpNumber!==''&&this.postal!==''&&this.address!==''
        &&this.emergencyContact.emergencyContactPerson!==''&&this.emergencyContact.emergencyContactNumber!==''&&this.emergencyContact.emergencyContactAddress!==''
        &&this.graduateSchoolValid&&this.emergencyContactPersonValid) {
        this.changeablePart = true;
        console.log('可修改基本信息已确认:'+this.changeablePart)
      } else if (this.graduateSchool === '' && this.graduateSchoolValid){
        this.graduateSchoolValid = false;
        this.graduateSchoolMessage = '毕业中学不能为空！'
      } else if (this.mobileNumber === ''){
        this.mobileNumberValid = false;
        this.mobileNumberMessage = '移动电话不能为空！'
      } else if(this.mtpNumber === ''){
        this.mtpNumberValid = false;
        this.mtpNumberMessage = '通行证号不能为空！'
      }else if (this.postal === ''){
        this.postalValid = false;
        this.postalMessage = '邮政编码不能为空！'
      } else if (this.address === ''){
        this.addressValid = false;
        this.addressMessage = '通讯地址不能为空！'
      } else if (this.emergencyContact.emergencyContactPerson === '' && this.emergencyContactPersonValid){
        this.emergencyContactPersonValid = false;
        this.emergencyContactPersonMessage = '紧急联系人不能为空！'
      } else if (this.emergencyContact.emergencyContactNumber === ''){
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
    font-size: 14px;
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
    margin-top: 8px;
    margin-bottom: 100px;
  }
  #check:disabled{
    opacity: 0.6;
  }
</style>
