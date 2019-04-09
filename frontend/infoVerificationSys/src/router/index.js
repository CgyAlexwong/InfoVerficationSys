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
        isLogin: false,
        icon: '',
        //type: '',
        title: '南京大学台港澳学生信息校验系统'
      }
    },
    {
      path: '/admin',
      name: '学生信息上传',
      component: Admin,
      iconClass: 'el-icon-menu',
      children: [
        {
          path: '/admin/uploadExcel',
          meta: {
            isLogin: true
            //   type: 'login'
          },
          component: UploadExcel, name: '上传学生信息'
        },
        {path: '/admin/uploadPhotos', meta: 'login', component: UploadPhotos, name: '上传学生照片'},
      ],
      meta: {
        isLogin: true,
        // type: 'login',
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
        {
          path: '/admin/checkStudentStatus',
          meta: {
            isLogin: true
            //   type: 'login'
          },
          component: CheckStatus,
          name: '学生校验状态查看'
        },
        {
          path: '/admin/checkStudentInfo',
          meta: {
            isLogin: true
            //   type: 'login'
          },
          component: CheckInfo, name: '学生基本资料查看'
        }
      ],
      meta: {
        isLogin: true,
        //type: 'login',
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
        {
          path: '/admin/checkFeedback',
          meta: {
            isLogin: true
            //   type: 'login'
          },
          component: CheckFeedback, name: '学生反馈查看'
        }
      ],
      meta: {
        isLogin: true,
        //type: 'login',
        icon: '',
        title: '南京大学台港澳学生信息校验系统'
      }
    }

  ]
})
router.beforeEach((to, from, next) => {
  //获取用户登录成功后储存的登录标志
  let getFlag = localStorage.getItem('Flag')

  //如果登录标志存在且为isLogin，即用户已登录
  if (getFlag === 'isLogin') {
    //设置vuex登录状态为已登录
    //store.state.isLogin = true
    next()
    //如果已登录，还想想进入登录注册界面，则定向回首页
    if (!to.meta.isLogin) {
      next({
        path: '/admin/checkStudentStatus'
      })
    }
    //如果登录标志不存在，即未登录
  } else {
    //用户想进入需要登录的页面，则定向回登录界面
    if (to.meta.isLogin) {
      next({
        path: '/',
      })
      //用户进入无需登录的界面，则跳转继续
    } else {
      next()
    }

  }

  // if (to.meta.title) {
  //   document.title = to.meta.title
  // }
  // const type = to.meta.type
  // if (type === 'login') {
  //   if (window.localStorage.getItem('login')) {
  //     next('/admin/checkStudentStatus')
  //   } else {
  //     next('/')
  //   }
  // } else {
  //   next()
  // }
})

export default router

