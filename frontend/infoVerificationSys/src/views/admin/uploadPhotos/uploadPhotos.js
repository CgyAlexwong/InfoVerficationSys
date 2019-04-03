export default {
  name: 'UploadPhotos',
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }, {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }]
    }
  },
  methods: {
    beforeUploadPhotos(file){
      let postfix=file.name.split(".")[1]
      if (postfix==='jpg'||postfix==='JPG'||postfix==='jpeg'||postfix==='JPEG'||postfix==='png'||postfix==='PNG'){
        return file
      }else{
        this.$message.error('上传文件只能是 jpg(jpeg)/png 格式')
      }
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handlePreview (file) {
      console.log(file)
    }

  }
}
