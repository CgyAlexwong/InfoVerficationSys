import {uploadExcel} from '../../../utils/adminAPI'

export default {
  name: 'UploadExcel',
  data(){
    return {
      stuExcelData: new FormData()
    }
  },

  methods: {
    handleExceed(){
      this.$message.error('一次只允许上传一个Excel文件！')

    },
    beforeUploadExcel (file) {
      let postfix = file.name.split('.')[1]
      if (postfix === 'xls' || postfix === 'xlsx') {
        return file
      } else {
        this.$message.error('上传文件只能是 xls/xlsx 格式')
      }
    },

    uploadStuExcel () {
      let upload = this.$refs.uploadStuExcel
      upload.submit()
      let header = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      if (this.stuExcelData.getAll('file').length === 0) {
        this.$message.error('请按照要求上传Excel表')
      } else {
        uploadExcel(this.stuExcelData,header)
          .then(res =>{
            if(res.data.succeed){
              this.$message.success('上傳成功')
              this.$refs.uploadStuPhotos.clearFiles()
            }else{
              this.$message.error(res.data.msg)
            }
          }).catch(err => {
          this.$message.error(err.toString())
        })
      }
    },
    excel(file) {
      this.stuExcelData.append('file',file.file)
    }
  }
}
