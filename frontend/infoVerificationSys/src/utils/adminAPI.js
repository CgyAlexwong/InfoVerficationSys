// adminAPI 定义管理员部分接口
import axios from 'axios'

// 登陆
export const adminLogin = (params) => {
  return axios.post('/', params)
}
// 获取学生状态列表
// 获取学生信息
