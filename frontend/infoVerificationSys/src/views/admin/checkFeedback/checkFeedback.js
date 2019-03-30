import {getFeedback, changeIsHandle} from '../../../utils/adminAPI'

export default {
  name: 'checkFeedback',
  data () {
    return {
      feedback: [
        {
          stuIndex: 1,//编号
          stuName: '学生A',//姓名
          contact: '手机：123456789',//联系方式
          remark: '中午没空',//备注
          isHandle: false,//处理状态

        },
        {
          stuIndex: 2,//编号
          stuName: '学生E',//姓名
          contact: '手机：123456789',//联系方式
          remark: '中午没空',//备注
          isHandle: true,//处理状态

        },
        {
          stuIndex: 3,//编号
          stuName: '学生C',//姓名
          contact: '手机：123456789',//联系方式
          remark: '中午没空',//备注
          isHandle: false,//处理状态

        },
        {
          stuIndex: 4,//编号
          stuName: '学生D',//姓名
          contact: '手机：123456789',//联系方式
          remark: '中午没空',//备注
          isHandle: true,//处理状态

        },

      ]

    }
  },
  /*
mounted{
  this.$nextTick(() => {
    this.getFeedback()
  })
}
*/
  method: {
    changeFeedback (row) {
      const stuId = row.stuIndex
      for (let i=0;i<this.feedback.length;i++){
        if(this.feedback[i].stuIndex===stuId){
          this.feedback[i].isHandle.$set(true)
        }
      }
      changeIsHandle({
          stuIndex: row.stuIndex,
          isHandle: row.isHandle
        }
      )
        .then(res => {
          if (res.data.succeed) {
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          }
        })

    }

  }
}
