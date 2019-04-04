// stuAPI 定义学生部分接口
import axios from 'axios'
import Cookies from 'js-cookie'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = process.env.NODE_ENV === 'production'
  ? 'http://120.78.76.9:3142'
  : 'http://localhost:3142'

/*
let http = axios.create({
  baseURL: 'http://localhost:3142/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    identityNum: Cookies.get('id')
  },
  transformRequest: [function (data) {
    let newData = ''
    for (let k in data) {
      if (data.hasOwnProperty(k) === true) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
      }
    }
    return newData
  }]
})
*/

// 00 反馈
// 留下联系信息 stuName String, contact String, remark String
export const feedBack = params => {
  return axios.post('/userBasicFunc/feedback', params, {headers: {identityNum: Cookies.get('id')}}).then(res => res.data)
}

// 01 身份选择
// 检查通行证号是否存在
export const userJuniorLogin = params => {
  return axios.post('/login/userJuniorLogin', params, {headers: {identityNum: Cookies.get('id')}}).then(res => res.data)
}

// 02 人脸识别
// 上传人脸照片文件匹配 File photo, HttpServletRequest request
export const recognize = params => {
  return axios.post('/faceRecognition/recognize', params, {headers: {identityNum: Cookies.get('id')}}).then(res => res.data)
}

// 03 OCR识别
// 上传通行证正面 File identification, HttpServletRequest request
export const doOCR = params => {
  return axios.post('/OCR/doOCR', params, {headers: {identityNum: Cookies.get('id')}}).then(res => res.data)
}
// 上传通行证反面 File identification, HttpServletRequest request
export const doOCRNegative = params => {
  return axios.post('/OCR/doOCRNegative', params, {headers: {identityNum: Cookies.get('id')}}).then(res => res.data)
}

// 04基本信息校验
// 获取基本信息
export const getInfo = () => {
  return axios.get('/userBasicFunc/getInfo', {headers: {identityNum: Cookies.get('id')}}).then(res => res.data)
}
// 提交验证的信息
export const setUserInfo = params => {
  return axios.post('/userBasicFunc/setInfo', params, {headers: {identityNum: Cookies.get('id')}}).then(res => res.data)
}

// 05电子签名
// 提交电子签名
export const setSignature = params => {
  return axios.post('/userBasicFunc/sign', params, {headers: {identityNum: Cookies.get('id')}}).then(res => res.data)
}
