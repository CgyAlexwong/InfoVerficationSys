<template>
    <el-card>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card>
                    <el-button slot="header"
                               style="float: left; padding-top: 0" type="text">上传学生照片提示
                    </el-button>
                    <div class="promptMsg">
                        <ul>
                            <li>只能上传jpg/png文件</li>
                            <li>照片大小不可超过500kb</li>
                        </ul>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="18">
                <el-card>
                    <el-button slot="header"
                               style="float:left;padding-top:0" type="text">请在此处上传学生照片

                    </el-button>
                    <el-upload
                            action="admin/uploadPhotos"
                            multiple
                            list-type="picture-card"
                            :before-upload="beforeUploadPhotos"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-card>
            </el-col>
        </el-row>

    </el-card>
</template>

<script src="./uploadPhotos.js"></script>
<style scoped src="./uploadPhoto.css"></style>
