import {
  getUserStatus,
  handleFeedback,
  changeQuestionableInfo,
  getUserInfo,
  changeUserInfo
} from '../../../utils/adminAPI'

export default {
  name: 'CheckStatus',
  data () {
    return {
      tableData: [
        // {
        //   identityNum: '1234567890',
        //   stuName: 'test1',
        //   basicInfoCheck: 0,
        //   otherInfoCheck: 0
        // },
        // {
        //   identityNum: '1234567890',
        //   stuName: 'test2',
        //   basicInfoCheck: 1,
        //   otherInfoCheck: 0
        // },
        // {
        //   identityNum: '1234567890',
        //   stuName: 'test3',
        //   basicInfoCheck: 2,
        //   otherInfoCheck: 1
        // },
      ],

      stuInfoForm: {
        examNum: '',
        stuName: '',
        foreignName: '',
        sex: 1,
        nation: '',
        birthdate: '',
        originPlace: 1,
        subject: 1,
        graduateDate: '',
        email: '',
        phoneNumber: '',
        mobileNumber: '',
        identityNum: '',
        mtpNumber: '',
        postal: '',
        nativePlace: '',
        address: '',
        graduateSchool: '',
        emergencyContact: {
          emergencyContactPerson: '',
          emergencyContactNumber: '',
          emergencyContactAddress: '',
        },
      },
      ocrPhoto: '',
      currentIdentityNum: '',
      queryInfo: [
        {
          databaseInfo: '',
          studentInfo: '',
          prop: '',
          selectedInfo: ''
        }
      ],

      formLabelWidth: '120px',
      checkWidth: '200px',
      search: '',
      dialogFormVisible: false,
      queryFormVisible: false,
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.getStatus()
    })
  },

  computed: {
    filteredTableData () {
      return this.tableData.filter(data => {
        return !this.search || data.stuName.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },

  methods: {
    //获取学生状态
    getStatus () {
      getUserStatus()
        .then(res => {
          this.tableData = res.data
        })
        .catch(err => {
          this.$message({
            message: err.toString(),
            type: 'error'
          })
        })
    },

    handleDialogClose () {
      let _this = this
      _this.$confirm('确认关闭？')
        .then(() => {
          if (this.dialogFormVisible === true) {
            this.dialogFormVisible = false
          }
          if (this.queryFormVisible === true) {
            this.queryFormVisible = false
          }
        })
        .catch(() => {
        })
    },

    //修改存疑信息
    handleQueryEdit (row) {
      this.queryFormVisible = true
      this.currentIdentityNum = row.identityNum

      // this.ocrPhoto = 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Biometric_Two-way_Permit_%28Front%29.jpg'
      // this.queryInfo = [
      //   {
      //     prop: '性别',
      //     selectedInfo: '',
      //     databaseInfo: '女',
      //     studentInfo: '男'
      //   },
      //   {
      //     prop: '学校',
      //     selectedInfo: '',
      //     databaseInfo: '南开大学',
      //     studentInfo: '南京大学'
      //   }
      // ]

      handleFeedback(row.identityNum)
        .then(res => {
          console.log(res)
          this.ocrPhoto = res.data.ocrPhoto
          this.queryInfo = res.data.queryInfo
        })
        .catch(err => {
            this.$message({
              message: err.toString(),
              type: 'error'
            })
          }
        )

    },

    //提交存疑基本信息
    editQuerySubmit () {
      let flag = true
      this.queryInfo.forEach(info => {
        if (info.selectedInfo === '') {
          flag = false
        }
      })
      if (!flag) {
        this.$message.error('存疑信息未全部处理！')
      } else {
        this.queryFormVisible = false
        let selectInfo = []
        this.queryInfo.forEach(info => {
          let tmpInfo = {}
          tmpInfo.prop = info.prop
          tmpInfo.info = info.selectedInfo
          selectInfo.push(tmpInfo)
        })
        console.log(this.currentIdentityNum)
        console.log(selectInfo)

        changeQuestionableInfo(
          {
            identityNum: this.currentIdentityNum,
            selectInfos: selectInfo
          }
        )
          .then(res => {
            if (res.data.succeed) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.getStatus()
              this.queryFormVisible = false
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          })
      }
    },

    //修改学生状态 index为身份证号码
    // changeFace (row) {
    //   let _this = this
    //   _this.$confirm('确认要把状态改变为已通过吗？一旦更改，不可改回')
    //     .then(() => {
    //       const stuId = row.identityNum
    //       for (let i = 0; i < this.tableData.length; i++) {
    //         if (this.tableData[i].identityNum === stuId) {
    //           this.tableData[i].faceCheck = true
    //           break
    //         }
    //       }
    //       changeUserStatus({
    //           identityNum: row.identityNum,
    //           faceCheck: row.faceCheck,
    //           ocrCheck: row.ocrCheck,
    //           infoCheck: row.infoCheck,
    //           signCheck: row.signCheck
    //         }
    //       ).then(res => {
    //         if (res.data.succeed) {
    //           this.$message({
    //             message: '修改成功',
    //             type: 'success'
    //           })
    //         } else {
    //           this.$message({
    //             message: res.data.msg,
    //             type: 'error'
    //           })
    //         }
    //       })
    //     })
    // },
    // changeOCR (row) {
    //   let _this = this
    //   _this.$confirm('确认要把状态改变为已通过吗？一旦更改，不可改回')
    //     .then(() => {
    //       const stuId = row.identityNum
    //       for (let i = 0; i < this.tableData.length; i++) {
    //         if (this.tableData[i].identityNum === stuId) {
    //           this.tableData[i].ocrCheck = true
    //           break
    //         }
    //       }
    //       changeUserStatus({
    //           identityNum: row.identityNum,
    //           faceCheck: row.faceCheck,
    //           ocrCheck: row.ocrCheck,
    //           infoCheck: row.infoCheck,
    //           signCheck: row.signCheck
    //         }
    //       ).then(res => {
    //         if (res.data.succeed) {
    //           this.$message({
    //             message: '修改成功',
    //             type: 'success'
    //           })
    //         } else {
    //           this.$message({
    //             message: res.data.msg,
    //             type: 'error'
    //           })
    //         }
    //       })
    //     })
    // },
    // changeInfo (row) {
    //   let _this = this
    //   _this.$confirm('确认要把状态改变为已通过吗？一旦更改，不可改回')
    //     .then(() => {
    //       const stuId = row.identityNum
    //       for (let i = 0; i < this.tableData.length; i++) {
    //         if (this.tableData[i].identityNum === stuId) {
    //           this.tableData[i].infoCheck = true
    //           break
    //         }
    //       }
    //       changeUserStatus({
    //           identityNum: row.identityNum,
    //           faceCheck: row.faceCheck,
    //           ocrCheck: row.ocrCheck,
    //           infoCheck: row.infoCheck,
    //           signCheck: row.signCheck
    //         }
    //       ).then(res => {
    //         if (res.data.succeed) {
    //           this.$message({
    //             message: '修改成功',
    //             type: 'success'
    //           })
    //         } else {
    //           this.$message({
    //             message: res.data.msg,
    //             type: 'error'
    //           })
    //         }
    //       })
    //     })
    // },
    // changeSign (row) {
    //   let _this = this
    //   _this.$confirm('确认要把状态改变为已通过吗？一旦更改，不可改回')
    //     .then(() => {
    //       const stuId = row.identityNum
    //       for (let i = 0; i < this.tableData.length; i++) {
    //         if (this.tableData[i].identityNum === stuId) {
    //           this.tableData[i].signCheck = true
    //           break
    //         }
    //       }
    //       changeUserStatus({
    //           identityNum: row.identityNum,
    //           faceCheck: row.faceCheck,
    //           ocrCheck: row.ocrCheck,
    //           infoCheck: row.infoCheck,
    //           signCheck: row.signCheck
    //         }
    //       ).then(res => {
    //         if (res.data.succeed) {
    //           this.$message({
    //             message: '修改成功',
    //             type: 'success'
    //           })
    //         } else {
    //           this.$message({
    //             message: res.data.msg,
    //             type: 'error'
    //           })
    //         }
    //       })
    //     })
    // },
    // totalStatusEdit (row) {
    //   let _this = this
    //   _this.$confirm('确认要把该学生所有状态都改变为已通过吗？一旦更改，不可改回')
    //     .then(() => {
    //       const stuId = row.identityNum
    //       for (let i = 0; i < this.tableData.length; i++) {
    //         if (this.tableData[i].identityNum === stuId) {
    //           this.tableData[i].faceCheck = true
    //           this.tableData[i].ocrCheck = true
    //           this.tableData[i].infoCheck = true
    //           this.tableData[i].signCheck = true
    //           break
    //         }
    //       }
    //       changeUserStatus({
    //           identityNum: row.identityNum,
    //           faceCheck: row.faceCheck,
    //           ocrCheck: row.ocrCheck,
    //           infoCheck: row.infoCheck,
    //           signCheck: row.signCheck
    //         }
    //       ).then(res => {
    //         if (res.data.succeed) {
    //           this.$message({
    //             message: '修改成功',
    //             type: 'success'
    //           })
    //         } else {
    //           this.$message({
    //             message: res.data.msg,
    //             type: 'error'
    //           })
    //         }
    //       })
    //     })
    //
    // },

    //修改学生信息
    handleInfoEdit (row) {
      //编辑
      this.dialogFormVisible = true
      console.log(row.identityNum)
      getUserInfo(row.identityNum)
        .then(res => {
          this.stuInfoForm = res.data
        })
    },

    //提交学生信息修改
    editInfoSubmit () {
      changeUserInfo(
        {
          examNum: this.stuInfoForm.examNum,
          stuName: this.stuInfoForm.stuName,
          foreignName: this.stuInfoForm.foreignName,
          sex: this.stuInfoForm.sex,
          nation: this.stuInfoForm.nation,
          birthdate: this.stuInfoForm.birthdate,
          originPlace: this.stuInfoForm.originPlace,
          subject: this.stuInfoForm.subject,
          graduateDate: this.stuInfoForm.graduateDate,
          email: this.stuInfoForm.email,
          phoneNumber: this.stuInfoForm.phoneNumber,
          mobileNumber: this.stuInfoForm.mobileNumber,
          identityNum: this.stuInfoForm.identityNum,
          mtpNumber: this.stuInfoForm.mtpNumber,
          postal: this.stuInfoForm.postal,
          nativePlace: this.stuInfoForm.nativePlace,
          address: this.stuInfoForm.address,
          graduateSchool: this.stuInfoForm.graduateSchool,
          emergencyContactPerson: this.stuInfoForm.emergencyContact.emergencyContactPerson,
          emergencyContactNumber: this.stuInfoForm.emergencyContact.emergencyContactNumber,
          emergencyContactAddress: this.stuInfoForm.emergencyContact.emergencyContactAddress,
        })
        .then(res => {
          if (res.data.succeed) {
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.editFormVisible = false
            this.getStatus()
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          }
        })
    }
    ,

  },
}
