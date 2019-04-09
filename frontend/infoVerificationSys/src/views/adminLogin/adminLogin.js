import {adminLogin} from '../../utils/adminAPI'

export default {
  name: 'AdminLogin',
  data () {
    return {
      username: '',
      password: ''

    }
  },
  methods: {
    login () {
      if (this.username === '') {
        this.$message.error('请输入管理员账号')
      } else if (this.password === '') {
        this.$message.error('请输入管理员密码')
      }else{
        adminLogin({
          username:this.username,
          password:this.password
        }).then(res=>{
          if(res.data.succeed){
            localStorage.setItem("Flag", "isLogin");
            this.$message.success('登陆成功')
            setTimeout(function () {
              this.$router.push('/admin/checkStudentStatus')
            }.bind(this), 1000)
          }else{
            this.$message.error(res.data.msg)
          }
          }
        )
      }

    }
  }
}
