import {getNoPhotoList, uploadPhoto} from '../../../utils/adminAPI'
import * as lrz from 'lrz'

export default {
  name: 'UploadPhotos',
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      stuPhotosData: new FormData(),
      noUpload: [
        {
          identityNum: '11'
        }
      ],
      failedUpload: [
        {
          identityNum: 'A123456789',
          msg: '图片质量太低!'
        }
      ]

    }

  },
  mounted () {
    this.$nextTick(() => {
      this.getList()
    })
  },
  methods: {
    //获取未上传列表和上传错误列表
    getList () {
      getNoPhotoList()
        .then(res => {
          this.noUpload = res.data
          this.failedUpload = res.data.filter(photo => {
            return photo.msg !== ''
          })

        })
        .catch(err => {
        })
    },

    beforeUploadPhotos (file) {
      //let postfix=file.name.split(".")[1]
      let fileType = file.type === 'image/jpeg' || file.type === 'image/png'
      //let fileType= postfix==='jpg'||postfix==='JPG'||postfix==='jpeg'||postfix==='JPEG'||postfix==='png'||postfix==='PNG'
      let fileSize = file.size / 1024 / 1024 < 2
      if (!fileType) {
        this.$message.error('上传文件只能是 jpg(jpeg)/png 格式')
      }
      // if (!fileSize) {
      //   this.$message.error('上传图片大小不能大于2M')
      // }
      return fileType
    },

    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    uploadStuPhotos () {
      let upload = this.$refs.uploadStuPhotos
      upload.submit()
      let header = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      if (this.stuPhotosData.getAll('file').length === 0) {
        this.$message.error('请按照要求上传学生照片')
      } else {
        uploadPhoto(this.stuPhotosData, header)
          .then(res => {
            if (res.data.succeed) {
              this.$message.success('上傳成功')
              this.stuPhotosData=new FormData()
              this.getList()
            } else {
              this.$message.error(res.data.msg)
            }
          }).catch(err => {
          this.$message.error(err.toString())
        })
      }
    },
    photos (file) {
      const fileSize=file.file.size/1024/1024
      console.log(fileSize)
      if (fileSize>=0.3) {
        const photoName=file.file.name
        console.log(photoName)
        lrz(file.file, {quality: 0.7,filedName:photoName})
          .then(rst => {
            console.log(rst.file.size / 1024 / 1024)
            this.stuPhotosData.append('file', rst.file,photoName )
            console.log(this.stuPhotosData.getAll('file').length)
            const photos = this.stuPhotosData.getAll('file')
            for (let index1 of photos){
              console.log(index1.name)
            }
          }).catch(err => {
          this.$message.error(err.toString())
        })
      }else {
        this.stuPhotosData.append('file', file.file)
      }
    }

  }
}
