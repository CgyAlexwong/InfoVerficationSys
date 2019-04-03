import {getUserStatus, changeUserStatus, getUserInfo, changeUserInfo} from '../../../utils/adminAPI'

export default {

  name: 'CheckStatus',
  data () {
    return {

      tableData: [{
        identityNum: '',
        stuName: '',
        faceCheck: false,
        ocrCheck: true,
        infoCheck: false,
        signCheck: false,
      }],

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
      formLabelWidth: '120px',
      checkWidth: '140px',
      search: '',
      dialogFormVisible: false,
      dialogFormVisible2: false,
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
        return !this.search || data.name.toLowerCase().includes(this.search.toLowerCase())
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
    handleDialogClose () {
      let _this = this
      _this.$confirm('确认关闭？')
        .then(() => {
          this.dialogFormVisible = false
        })
        .catch(() => {
        })
    },

    //修改学生状态 index为身份证号码
    changeFace (row) {
      let _this = this
      _this.$confirm('确认要把状态改变为已通过吗？一旦更改，不可改回')
        .then(() => {
          const stuId = row.identityNum
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].identityNum === stuId) {
              this.tableData[i].faceCheck = true
              break
            }
          }
          changeUserStatus({
              identityNum: row.identityNum,
              faceCheck: row.faceCheck,
              ocrCheck: row.ocrCheck,
              infoCheck: row.infoCheck,
              signCheck: row.signCheck
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
        })
    },
    changeOCR (row) {
      let _this = this
      _this.$confirm('确认要把状态改变为已通过吗？一旦更改，不可改回')
        .then(() => {
          const stuId = row.identityNum
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].identityNum === stuId) {
              this.tableData[i].ocrCheck = true
              break
            }
          }
          changeUserStatus({
              identityNum: row.identityNum,
              faceCheck: row.faceCheck,
              ocrCheck: row.ocrCheck,
              infoCheck: row.infoCheck,
              signCheck: row.signCheck
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
        })
    },
    changeInfo (row) {
      let _this = this
      _this.$confirm('确认要把状态改变为已通过吗？一旦更改，不可改回')
        .then(() => {
          const stuId = row.identityNum
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].identityNum === stuId) {
              this.tableData[i].infoCheck = true
              break
            }
          }
          changeUserStatus({
              identityNum: row.identityNum,
              faceCheck: row.faceCheck,
              ocrCheck: row.ocrCheck,
              infoCheck: row.infoCheck,
              signCheck: row.signCheck
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
        })
    },
    changeSign (row) {
      let _this = this
      _this.$confirm('确认要把状态改变为已通过吗？一旦更改，不可改回')
        .then(() => {
          const stuId = row.identityNum
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].identityNum === stuId) {
              this.tableData[i].signCheck = true
              break
            }
          }
          changeUserStatus({
              identityNum: row.identityNum,
              faceCheck: row.faceCheck,
              ocrCheck: row.ocrCheck,
              infoCheck: row.infoCheck,
              signCheck: row.signCheck
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
        })
    },
    totalStatusEdit (row) {
      let _this = this
      _this.$confirm('确认要把该学生所有状态都改变为已通过吗？一旦更改，不可改回')
        .then(() => {
          const stuId = row.identityNum
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].identityNum === stuId) {
              this.tableData[i].faceCheck = true
              this.tableData[i].ocrCheck = true
              this.tableData[i].infoCheck = true
              this.tableData[i].signCheck = true
              break
            }
          }
          changeUserStatus({
              identityNum: row.identityNum,
              faceCheck: row.faceCheck,
              ocrCheck: row.ocrCheck,
              infoCheck: row.infoCheck,
              signCheck: row.signCheck
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
