import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/views/admin/Admin.vue'
import AdminLogin from '@/views/adminLogin/AdminLogin.vue'
import CheckInfo from '@/views/admin/checkInfo/CheckInfo.vue'
import CheckStatus from '@/views/admin/checkStatus/CheckStatus.vue'
import UploadExcel from '@/views/admin/uploadExcel/UploadExcel.vue'
import UploadPhotos from '@/views/admin/uploadPhotos/UploadPhotos.vue'
import CheckFeedback from '@/views/admin/checkFeedback/CheckFeedback.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '管理员登陆',
      component: AdminLogin,
      iconClass: 'el-icon-info',
      leaf: true,
      meta: {
        icon: '',
        type: '',
        title: '南京大学台港澳学生信息校验系统'
      }
    },
    {
      path: '/admin',
      name: '学生信息上传',
      component: Admin,
      iconClass: 'el-icon-menu',
      children: [
        {path: '/admin/uploadExcel', component: UploadExcel, name: '上传学生信息'},
        {path: '/admin/uploadPhotos', component: UploadPhotos, name: '上传学生照片'},
      ],
      meta: {
        type: 'login',
        icon: '',
        title: '南京大学台港澳学生信息校验系统'
      }
    },
    {
      path: '/admin',
      name: '学生校验状态管理',
      component: Admin,
      iconClass: 'el-icon-edit',
      children: [
        {path: '/admin/checkStudentStatus', component: CheckStatus, name: '学生校验状态查看'},
        {path: '/admin/checkStudentInfo', component: CheckInfo, name: '学生基本资料查看'}
      ],
      meta: {
        type: 'login',
        icon: '',
        title: '南京大学台港澳学生信息校验系统'
      }
    },
    {
      path: '/admin',
      name: '学生反馈查看',
      component: Admin,
      iconClass: 'el-icon-menu',
      children: [
        {path: '/admin/checkFeedback', component: CheckFeedback, name: '学生反馈查看'}
      ],
      meta: {
        type: 'login',
        icon: '',
        title: '南京大学台港澳学生信息校验系统'
      }
    }

  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  const type = to.meta.type
  if (type === 'login') {
    if (window.localStorage.getItem('login')) {
      next('/admin/checkStudentStatus')
    } else {
      next('/')
    }
  } else {
    next()
  }
})

export default router

