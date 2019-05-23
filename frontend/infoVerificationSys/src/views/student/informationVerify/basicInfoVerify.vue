<!--第四部分 基本信息校验-->

<template>
  <div id="informationVerify">
    <div id = 'head'>
      <mt-header fixed title="（2 / 4）基本信息校验">
        <router-link to="/stu/OCRVerify" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
    </div>
    <div id="navbar">
      <!--<mt-navbar v-model="selected">-->
        <!--<mt-tab-item id="1" @click="tab1">必需校验信息</mt-tab-item>-->
        <!--<mt-tab-item id="2" @click="tab2">可修改信息</mt-tab-item>-->
      <!--</mt-navbar>-->

      <p id="word">请仔细确认以下信息！<br>如无误请点击提交，如有误请点击底部修改</p>
      <div style="display: flex">
        <p id="word">当前状态：
        <img :src="img" alt="" style="width: 15px;height: 15px">
        {{msg}}</p>
      </div>
      <div id="unchangeablePart">
        <div id="b">
          <mt-field label="考生号：" v-model="examNum" placeholder="若无考生号则无须填写" @input="examNumCheck" :disabled="!changeable"></mt-field>
        </div>
        <div id="b">
          <mt-field label="姓名：" v-model="stuName" placeholder="请输入你的姓名" @input="stuNameCheck" :disabled="!changeable"></mt-field>
          <dd v-if="!stuNameValid">{{stuNameMessage}}</dd>
        </div>
        <div id="b">
          <mt-field label="性别：" v-model="sex" placeholder="请输入你的性别" @input="sexCheck" :disabled="!changeable"></mt-field>
          <dd v-if="!sexValid">{{sexMessage}}</dd>
        </div>
        <div id="b">
          <mt-field label="民族：" v-model="nation" placeholder="若无民族则无须填写" @input="nationCheck" :disabled="!changeable"></mt-field>
        </div>
        <div id="b">
          <mt-field label="出生日期：" v-model="birthdate" placeholder="格式“YYYY-MM-DD”" @input="birthdateCheck" :disabled="!changeable"></mt-field>
          <dd v-if="!birthdateValid">{{birthdateMessage}}</dd>
        </div>
        <div id="b">
          <mt-field label="报考科类：" v-model="subject" placeholder="请输入文科或理科或不分文理" @input="subjectCheck" :disabled="!changeable"></mt-field>
          <dd v-if="!subjectValid">{{subjectMessage}}</dd>
        </div>
        <div id="b">
          <mt-field label="电子邮件：" v-model="email" placeholder="请输入你的电子邮件" @input="emailCheck" :disabled="!changeable"></mt-field>
          <dd v-if="!emailValid">{{emailMessage}}</dd>
        </div>
        <div id="b">
          <mt-field label="联系电话：" v-model="phoneNumber" placeholder="请输入你的联系电话" @input="phoneNumberCheck" :disabled="!changeable"></mt-field>
          <dd v-if="!phoneNumberValid">{{phoneNumberMessage}}</dd>
        </div>
        <div id="b">
          <mt-field label="身份证：" v-model="identityNum" placeholder="请输入你的身份证" @input="identityNumCheck" :disabled="!changeable"></mt-field>
          <dd v-if="!identityNumValid"><div v-html="identityNumMessage"></div></dd>
        </div>
      </div>
    </div>
    <div id="confirmButton">
      <button id="feedback" @click="change" :disabled="!changeableButton">修改</button>
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
import {getInfo, getStatus, setBasicInfo} from "../../../utils/stuAPI";
import MtField from "mint-ui/packages/field/src/field"
import student from '../identitySelect/identitySelect'
import {checkChinese,checkEMail,checkIdentityNum,checkDate} from "../../../utils/checkList";

export default {
  name: "informationVerify",
  data(){
    return {
      // selected: '1',
      // unchangeablePart:false,
      img:'https://github.com/CgyAlexwong/InfoVerficationSys/blob/uc1/frontend/infoVerificationSys/src/assets/错.png?raw=true',
      msg:'不可修改',
      changeable:false,
      changeableButton:true,
      commitAble:true,

      examNum:'',
      stuName:'',
      sex:'',
      nation:'',
      birthdate:'',
      subject:'',
      email:'',
      phoneNumber:'',
      identityNum:'',

      stuNameValid:true,
      stuNameMessage:'',
      sexValid:true,
      sexMessage:'',
      birthdateValid:true,
      birthdateMessage:'',
      subjectValid:true,
      subjectMessage:'',
      emailValid:true,
      emailMessage:'',
      phoneNumberValid:true,
      phoneNumberMessage:'',
      identityNumValid:true,
      identityNumMessage:'',
    }
  },
  components: {MtField, MtCell, MtTabContainerItem, MtTabContainer, MtTabItem, MtNavbar, MtButton, MtHeader},
  mounted:function(){
    getInfo(
    ).then(response => {
      this.examNum = response.examNum;
      this.stuName = response.stuName;
      this.sex = response.sex === 1 ? '男':'女';
      this.nation = response.nation;
      this.birthdate = response.birthdate;
      if (response.subject === 0){
        this.subject = '文科'
      }else if (response.subject === 1) {
        this.subject = '理科'
      }else{
        this.subject = '不分文理'
      }
      this.email = response.email;
      this.phoneNumber = response.phoneNumber;
      this.identityNum = response.identityNum;
    });

    if(sessionStorage.getItem('examNum') !== null && sessionStorage.getItem('examNum')!==''){
      this.examNum = sessionStorage.getItem('examNum');
    }
    if(sessionStorage.getItem('stuName') !== null && sessionStorage.getItem('stuName')!==''){
      this.stuName = sessionStorage.getItem('stuName');
    }
    if(sessionStorage.getItem('sex') !== null && sessionStorage.getItem('sex')!==''){
      this.sex = sessionStorage.getItem('sex');
    }
    if(sessionStorage.getItem('nation') !== null && sessionStorage.getItem('nation')!==''){
      this.nation = sessionStorage.getItem('nation');
    }
    if(sessionStorage.getItem('birthdate') !== null && sessionStorage.getItem('birthdate')!==''){
      this.birthdate = sessionStorage.getItem('birthdate');
    }
    if(sessionStorage.getItem('subject') !== null && sessionStorage.getItem('subject')!==''){
      this.subject = sessionStorage.getItem('subject');
    }
    if(sessionStorage.getItem('email') !== null && sessionStorage.getItem('email')!==''){
      this.email = sessionStorage.getItem('email');
    }
    if(sessionStorage.getItem('phoneNumber') !== null && sessionStorage.getItem('phoneNumber')!==''){
      this.phoneNumber = sessionStorage.getItem('phoneNumber');
    }
    if(sessionStorage.getItem('identityNum') !== null && sessionStorage.getItem('identityNum')!==''){
      this.identityNum = sessionStorage.getItem('identityNum');
    }
  },
  methods:{
    // warn:function () {
    //   MessageBox.alert('',{
    //     title:"提示",
    //     message:"你已完成前阶段任务，无法返回"
    //   })
    // },
    examNumCheck (){
      sessionStorage.setItem('examNum',this.examNum);
    },
    stuNameCheck () {
      sessionStorage.setItem('stuName',this.stuName);
      let result = checkChinese(this.stuName);
      this.stuNameValid = result.res;
      this.stuNameMessage = result.msg
    },
    sexCheck () {
      sessionStorage.setItem('sex',this.sex);
      this.sexValid = true;
      this.sexMessage = ''
    },
    nationCheck(){
      sessionStorage.setItem('nation',this.nation);
    },
    birthdateCheck(){
      sessionStorage.setItem('birthdate',this.birthdate);
      let result = checkDate(this.birthdate);
      this.birthdateValid = result.res;
      this.birthdateMessage = result.msg
    },
    subjectCheck () {
      sessionStorage.setItem('subject',this.subject);
      this.subjectValid = true;
      this.subjectMessage = ''
    },
    emailCheck () {
      sessionStorage.setItem('email',this.email);
      let result = checkEMail(this.email);
      this.emailValid = result.res;
      this.emailMessage = result.msg
    },
    phoneNumberCheck () {
      sessionStorage.setItem('phoneNumber',this.phoneNumber);
      this.phoneNumberValid = true;
      this.phoneNumberMessage = ''
    },
    identityNumCheck () {
      sessionStorage.setItem('identityNum',this.identityNum);
      let result = checkIdentityNum(this.identityNum);
      this.identityNumValid = result.res;
      this.identityNumMessage = result.msg
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
      if(this.stuName!==''&&this.sex!==''&&this.birthdate!==''&&this.subject!==''&&this.email!==''&&this.phoneNumber!==''&&this.identityNum!==''
        &&this.stuNameValid&&this.emailValid&&this.identityNumValid){
        let sex = this.sex==='男'? 1 : 0;
        let subject = 0;
        if(this.subject === '文科'){
          subject = 0;
        }else if(this.subject === '理科'){
          subject = 1;
        }else{
          subject = 2;
        }
        Indicator.open({text:'基本信息提交中，请稍等……',spinnerType:'fading-circle'});
        setBasicInfo({
          examNum: this.examNum,
          stuName: this.stuName,
          sex:sex,
          nation:this.nation,
          birthdate:this.birthdate,
          subject:subject,
          email:this.email,
          phoneNumber:this.phoneNumber,
          identityNum:this.identityNum
        }).then(response =>{
          Indicator.close();
          if (response.succeed === true){
            sessionStorage.clear();
            MessageBox.alert('', {
              message: '基本信息校验，点击进入下一步！',
              title: '校验成功！',
              confirmButtonText: '下一步'
            }).then(action => {
              if (action === 'confirm') {
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
          }
        })
      }else if(this.stuName===''){
        this.stuNameValid = false;
        this.stuNameMessage = '姓名不能为空！'
      }else if(this.sex===''){
        this.sexValid = false;
        this.sexMessage = '性别不能为空！'
      }else if(this.birthdate===''){
        this.birthdateValid = false;
        this.birthdateMessage = '出生日期不能为空！'
      }else if(this.subject===''){
        this.subjectValid = false;
        this.subjectMessage = '报考科类不能为空！'
      }else if(this.email===''){
        this.emailValid = false;
        this.emailMessage = '电子邮箱不能为空！'
      }else if(this.phoneNumber===''){
        this.phoneNumberValid = false;
        this.phoneNumberMessage = '联系电话不能为空！'
      }else if(this.identityNum===''){
        this.identityNumValid = false;
        this.identityNumMessage = '身份证不能为空！'
      }
    },
    // tab1:function () {
    //   this.selected = '1'
    // },
    // tab2:function () {
    //   this.selected = '2'
    // },
    change:function(){
      this.img = 'https://github.com/CgyAlexwong/InfoVerficationSys/blob/uc1/frontend/infoVerificationSys/src/assets/对.png?raw=true';
      this.msg = '可修改';
      this.changeableButton = false;
      this.changeable = true;
    },
    // change1:function () {
    //   this.unchangeablePart = true;
    //   this.selected = '2';
    //   console.log('不可修改基本信息已确认:'+this.unchangeablePart)
    // },

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
  #feedback{
    border: 1px solid #3023ae;
    background: transparent;
    border-radius: 4px;
    margin-top: 8px;
    padding: 5px 10px;
  }
  #feedback :disabled{
    opacity: 0.4;
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
    margin-bottom: 100px;
  }
  #check:disabled{
    opacity: 0.6;
  }
</style>
