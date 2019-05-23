/* eslint-disable */
import HelloWorld from '../components/HelloWorld'
import OCRVerify from '../views/student/OCRVerify/OCRVerify'
import OldOCRVerify from '../views/student/OCRVerify/oldOCRVerify'
import IdentitySelect from '../views/student/identitySelect/identitySelect'
import FaceVerify from '../views/student/faceVerify/faceVerify'
import BasicInfoVerify from '../views/student/informationVerify/basicInfoVerify'
import OtherInfoVerify from '../views/student/informationVerify/otherInfoVerify'
import ESignature from '../views/student/ESignature/ESignature'
import End from '../components/end'
import Feedback from '../components/feedback'

// 基本路由URL
export default [
  {
    path: '/stu',
    name: 'hello',
    component: HelloWorld,
    meta:{
      num:0,
      title:'欢迎登陆本系统！'
    }
  },
  {
    path: '/',
    redirect: '/stu'
  },
  {
    path:'/stu/identity',
    name:'identity',
    component: IdentitySelect,
    meta:{
      num:1,
      title:'身份选择'
    }
  },
  // {
  //   path:'/stu/faceVerify',
  //   name:'FaceVerify',
  //   component: FaceVerify,
  //   meta:{
  //     num:5,
  //     title:'人脸识别校验'
  //   },
  //   redirect: '/stu'
  // },
  {
    path: '/stu/OCRVerify',
    name: 'OCRVerify',
    component: OCRVerify,
    meta:{
      num:1,
      title:'OCR身份识别'
    }
  },
  {
    path: '/stu/oldOCRVerify',
    name: 'OldOCRVerify',
    component: OldOCRVerify,
    meta:{
      num:1,
      title:'本式台胞证OCR信息校验'
    }
  },
  {
    path:'/stu/basicInfoVerify',
    name:'BasicInfoVerify',
    component: BasicInfoVerify,
    meta:{
      num:2,
      title:'基本信息校验'
    }
  },
  {
    path:'/stu/otherInfoVerify',
    name:'OtherInfoVerify',
    component: OtherInfoVerify,
    meta:{
      num:3,
      title:'其他信息校验'
    }
  },
  // {
  //   path:'/stu/ESignature',
  //   name:'ESignature',
  //   component: ESignature,
  //   meta:{
  //     num:5,
  //     title:'电子签名加密'
  //   },
  //   redirect:'/stu'
  // },
  // {
  //   path:'/feedback',
  //   name:'feedback',
  //   component: Feedback,
  //   meta:{
  //     num:5,
  //     title:'信息反馈'
  //   },
  //   redirect:'/stu'
  // },
  {
    path:'/end',
    name:'end',
    component: End,
    meta:{
      num:4,
      title:'完成啦！'
    }
  }
  ]
