import {getUserStatus, changeUserStatus, getUserInfo, changeUserInfo} from '../../../utils/adminAPI'

export default {

  name: 'CheckStatus',
  data () {
    return {

      tableData: [{
        identityNum: '123456789',
        name: '学生A',
        faceCheck: false,
        ocrCheck: true,
        infoCheck: false,
        signCheck: false,
      }, {
        identityNum: '987654321',
        name: '学生B',
        faceCheck: false,
        ocrCheck: false,
        infoCheck: true,
        signCheck: false,
      }, {
        identityNum: '88888888',
        name: '学生C',
        faceCheck: false,
        ocrCheck: false,
        infoCheck: false,
        signCheck: true,
      }, {
        identityNum: '99999999',
        name: '学生D',
        faceCheck: true,
        ocrCheck: false,
        infoCheck: false,
        signCheck: false,
      }, {
        identityNum: '11111111',
        name: '学生E',
        faceCheck: false,
        ocrCheck: false,
        infoCheck: false,
        signCheck: true,
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
    // this.$nextTick(() => {
    //   this.getStatus()
    // })
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
      getUserInfo(row.identityNum)
        .then(res=>{
          let info=res.data;
          this.stuInfoForm.examNum=info.examNum;
          this.stuInfoForm.stuName=info.stuName;
          this.stuInfoForm.foreignName=info.foreignName;
          this.stuInfoForm.sex=info.sex;
          this.stuInfoForm.nation=info.nation;
          this.stuInfoForm.birthdate=info.birthdate;
          this.stuInfoForm.originPlace=info.originPlace;
          this.stuInfoForm.subject=info.subject;
          this.stuInfoForm.graduateDate=info.graduateDate;
          this.stuInfoForm.email=info.email;
          this.stuInfoForm.phoneNumber=info.phoneNumber;
          this.stuInfoForm.identityNum=info.identityNum;
          this.stuInfoForm.mtpNumber=info.mtpNumber;
          this.stuInfoForm.postal=info.postal;
          this.stuInfoForm.nativePlace=info.nativePlace;
          this.stuInfoForm.graduateSchool=info.graduateSchool;
          this.stuInfoForm.emergencyContact.emergencyContactPerson=info.emergencyContact.emergencyContactPerson;
          this.stuInfoForm.emergencyContact.emergencyContactNumber=info.emergencyContact.emergencyContactNumber;
          this.stuInfoForm.emergencyContact.emergencyContactAddress=info.emergencyContact.emergencyContactAddress;
    })
        .catch((err=>{
          this.$message({
            message: err.toString(),
            type: 'error'
          })
        }))
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
    },
    changeOCR (row) {
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
    },
    changeInfo (row) {
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
    },
    changeSign (row) {
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
    },
    totalStatusEdit (row) {
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
    },

    //提交学生信息修改
    editInfoSubmit () {
      let form = this.stuInfoForm
      changeUserInfo(form)
        .then(res => {
          if (res.data.succeed) {
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.editFormVisible = false
            this.getUserStatus()
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            })
          }
        })
    },

  },
}