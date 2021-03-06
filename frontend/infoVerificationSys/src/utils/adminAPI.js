// adminAPI 定义管理员部分接口
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = process.env.NODE_ENV === 'production'
  ? 'http://47.103.9.254:3142'
  : 'http://localhost:3142'

// 登陆
export const adminLogin = (params) => {
  return axios.post('/login/adminLogin', params)
}
// 上传Excel表
export const uploadExcel = (data, header) => {
  return axios.post('/excel/upload', data, header)
}
// 上传照片
export const uploadPhoto = (data, header) => {
  return axios.post('/photo/upload', data, header)
}

//获取照片不合格学生列表
export const getNoPhotoList = () => {
  return axios.get('/photo/getNoPhotoList')
}
// 获取学生状态列表
export const getUserStatus = () => {
  return axios.get('/adminBasicFunc/getUserStatus')
}

// 修改某个学生审核状态
// export const changeUserStatus = (params) => {
//   return axios.post('/adminBasicFunc/changeUserStatus', params)
// }
// 查看某个学生信息
export const getUserInfo = (params) => {
  return axios.get('/adminBasicFunc/getUserInfo', {headers: {identityNum: params}})
}

// 获取存疑
export const handleFeedback = (identityNum) => {
  return axios.get('/adminBasicFunc/handleFeedback',
    {
      params: {
        identityNum: identityNum
      }
    })
}

// 提交存疑修改
export const changeQuestionableInfo = (params) =>{
  return axios.post('/adminBasicFunc/changeQuestionableInfo',params)
}

// 修改某个学生信息
export const changeUserInfo = (params) => {
  return axios.post('/adminBasicFunc/changeUserInfo', params)
}

// 查看学生反馈
export const getFeedback = () => {
  return axios.get('/adminBasicFunc/check')
}

//修改学生反馈
export const changeIsHandle = (params) => {
  return axios.post('/adminBasicFunc/changeIsHandle', params)
}
