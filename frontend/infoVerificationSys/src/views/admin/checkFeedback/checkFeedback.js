import {getFeedback, changeIsHandle} from '../../../utils/adminAPI'

export default {
    name: 'checkFeedback',
    data() {
        return {
            feedback: [
                {
                    stuIndex: 1,//编号
                    stuName: '学生A',//姓名
                    contact: '手机：123456789',//联系方式
                    remark: '中午没空',//备注
                    isHandle: false,//处理状态
                },
            ]
        }
    },

  mounted(){
    this.$nextTick(() => {
      getFeedback()
        .then(res => {
            this.feedback=res.data
        })
        .catch(err => {
          this.$message({
            message: err.toString(),
            type: 'error'
          })
        })
    })
  },

    methods: {
        changeFeedback(row) {
            let _this=this;
            _this.$confirm("确认已处理完该学生的反馈吗？一旦确认，不可更改")
              .then(()=>{
                const stuId = row.stuIndex;
                for (let i = 0; i < this.feedback.length; i++) {
                  if (this.feedback[i].stuIndex === stuId) {
                    this.feedback[i].isHandle = true;
                    break;
                  }
                }
                changeIsHandle({
                    stuIndex: row.stuIndex,
                    isHandle: row.isHandle
                  }
                ).then(res => {
                  if (res.data.succeed) {
                    this.$message({
                      message: '修改成功',
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

              )

        }
    }
}
