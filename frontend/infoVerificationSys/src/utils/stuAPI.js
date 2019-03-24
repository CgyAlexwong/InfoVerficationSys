// stuAPI 定义学生部分接口
import axios from 'axios';
import qs from 'qs';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

let http = axios.create({
  baseURL: 'http://localhost:8080/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  transformRequest: [function (data) {
    let newData = '';
    for (let k in data) {
      if (data.hasOwnProperty(k) === true) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
      }
    }
    return newData;
  }]
});

function apiAxios(method, url, params, response) {
  http({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
  }).then(function (res) {
    response(res);
  }).catch(function (err) {
    response(err);
  })
}

export default {
  get: function (url, params, response) {
    return apiAxios('GET', url, params, response)
  },
  post: function (url, params, response) {
    return apiAxios('POST', url, params, response)
  }
}


// 01身份选择
// 检查通行证号是否存在
export const userJuniorLogin = params => {
  return axios.post('/',  qs.stringify(params)).then(res => res.data)
}

// 04基本信息校验
// 获取基本信息
export const getInfo = params => {
  return axios.get('/', {params:params})
}
// 提交验证的信息
export const setUserInfo = params => {
  return axios.post('/', qs.stringify(params)).then(res => res.data)
}

// 05电子签名
// 提交电子签名
export const sign = params => {
  return axios.post('/', qs.stringify(params)).then(res => res.data)
}
