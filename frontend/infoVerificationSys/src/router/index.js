/* eslint-disable */
import HelloWorld from '../components/HelloWorld'
import OCRVerify from '../views/student/OCRVerify/OCRVerify'
import IdentitySelect from '../views/student/stuIdentitySelect/stuIdentitySelect'
import FaceVerify from '../views/student/faceVerify/faceVerify'
import InformationVerify from '../views/student/informationVerify/informationVerify'
import ESignature from '../views/student/ESignature/ESignature'
import End from '../components/end'

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
  {
    path:'/stu/faceVerify',
    name:'FaceVerify',
    component: FaceVerify,
    meta:{
      num:2,
      title:'人脸识别校验'
    }
  },
  {
    path: '/stu/OCRVerify',
    name: 'OCRVerify',
    component: OCRVerify,
    meta:{
      num:3,
      title:'OCR信息校验'
    }
  },
  {
    path:'/stu/informationVerify',
    name:'InformationVerify',
    component: InformationVerify,
    meta:{
      num:4,
      title:'基本信息校验'
    }
  },
  {
    path:'/stu/ESignature',
    name:'ESignature',
    component: ESignature,
    meta:{
      num:5,
      title:'电子签名加密'
    }
  },
  {
    path:'/end',
    name:'end',
    component: End,
    meta:{
      num:6,
      title:'完成啦！'
    }
  }
  ]
